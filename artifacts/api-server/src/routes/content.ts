import { Router, type IRouter } from "express";
import { and, asc, desc, eq, sql } from "drizzle-orm";
import { db, articlesTable, commentsTable, showsTable, videosTable } from "@workspace/db";
import {
  CreateCommentBody,
  CreateCommentResponse,
  GetArticleParams,
  GetArticleResponse,
  ListArticlesResponse,
  ListCommentsQueryParams,
  ListCommentsResponse,
  ListShowsResponse,
  ListVideosResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

function isoDate(value: Date): string {
  return value.toISOString();
}

function relativeTime(value: Date): string {
  const minutes = Math.max(0, Math.floor((Date.now() - value.getTime()) / 60000));
  if (minutes < 1) return "À l'instant";
  if (minutes < 60) return `Il y a ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Il y a ${hours} h`;
  return `Hier`;
}

function toArticle(article: typeof articlesTable.$inferSelect) {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    category: article.category,
    author: { name: article.authorName, avatar: article.authorAvatar },
    publishedAt: isoDate(article.publishedAt),
    readTime: article.readTime,
    imageUrl: article.imageUrl,
    isBreaking: article.isBreaking,
    isTrending: article.isTrending,
    views: article.views,
    likes: article.likes,
    commentsCount: article.commentsCount,
  };
}

function toComment(comment: typeof commentsTable.$inferSelect) {
  return {
    id: comment.id,
    articleId: comment.articleId,
    user: comment.userName,
    avatar: comment.avatar,
    text: comment.text,
    time: relativeTime(comment.createdAt),
  };
}

router.get("/content/articles", async (_req, res): Promise<void> => {
  const articles = await db.select().from(articlesTable).orderBy(desc(articlesTable.publishedAt));
  res.json(ListArticlesResponse.parse(articles.map(toArticle)));
});

router.get("/content/articles/:slug", async (req, res): Promise<void> => {
  const params = GetArticleParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [article] = await db.select().from(articlesTable).where(eq(articlesTable.slug, params.data.slug));
  if (!article) {
    res.status(404).json({ error: "Article not found" });
    return;
  }

  res.json(GetArticleResponse.parse(toArticle(article)));
});

router.get("/content/videos", async (_req, res): Promise<void> => {
  const videos = await db.select().from(videosTable).orderBy(desc(videosTable.publishedAt));
  res.json(ListVideosResponse.parse(videos.map((video) => ({ ...video, publishedAt: isoDate(video.publishedAt) }))));
});

router.get("/content/shows", async (_req, res): Promise<void> => {
  const shows = await db.select().from(showsTable).orderBy(asc(showsTable.title));
  res.json(ListShowsResponse.parse(shows));
});

router.get("/content/comments", async (req, res): Promise<void> => {
  const parsed = ListCommentsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const comments = await db.select().from(commentsTable)
    .where(and(eq(commentsTable.articleId, parsed.data.articleId), eq(commentsTable.status, "approved")))
    .orderBy(desc(commentsTable.createdAt));
  res.json(ListCommentsResponse.parse(comments.map(toComment)));
});

router.post("/content/comments", async (req, res): Promise<void> => {
  const parsed = CreateCommentBody.safeParse(req.body);
  if (!parsed.success || !parsed.data.text.trim() || !parsed.data.user.trim()) {
    res.status(400).json({ error: parsed.success ? "Comment text and user are required" : parsed.error.message });
    return;
  }

  const [article] = await db.select({ id: articlesTable.id }).from(articlesTable).where(eq(articlesTable.id, parsed.data.articleId));
  if (!article) {
    res.status(404).json({ error: "Article not found" });
    return;
  }

  const [comment] = await db.insert(commentsTable).values({
    id: `comment-${crypto.randomUUID()}`,
    articleId: parsed.data.articleId,
    userName: parsed.data.user.trim(),
    avatar: parsed.data.avatar ?? null,
    text: parsed.data.text.trim(),
    status: "approved",
  }).returning();

  await db.update(articlesTable)
    .set({ commentsCount: sql<number>`${articlesTable.commentsCount} + 1` })
    .where(eq(articlesTable.id, parsed.data.articleId));

  res.status(201).json(CreateCommentResponse.parse(toComment(comment)));
});

export default router;