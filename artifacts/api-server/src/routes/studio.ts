import { Router, type IRouter } from "express";
import { and, asc, desc, eq, sql } from "drizzle-orm";
import { db, articlesTable, commentsTable, moderationReportsTable, monetizationPlansTable, showsTable, studioSettingsTable, studioUsersTable, analyticsDailyTable, videosTable } from "@workspace/db";
import {
  CreateStudioArticleBody,
  CreateStudioArticleResponse,
  CreateStudioShowBody,
  CreateStudioShowResponse,
  CreateStudioVideoBody,
  CreateStudioVideoResponse,
  DeleteStudioArticleParams,
  DeleteStudioShowParams,
  DeleteStudioVideoParams,
  GetStudioAnalyticsResponse,
  GetStudioLiveResponse,
  GetStudioMonetizationResponse,
  GetStudioSettingsResponse,
  GetStudioSummaryResponse,
  InviteStudioUserBody,
  InviteStudioUserResponse,
  ListModerationReportsResponse,
  ListStudioArticlesResponse,
  ListStudioCommentsResponse,
  ListStudioShowsResponse,
  ListStudioUsersResponse,
  ListStudioVideosResponse,
  StatusUpdateInput,
  StudioComment,
  StudioSettings,
  UpdateModerationReportBody,
  UpdateModerationReportParams,
  UpdateModerationReportResponse,
  UpdateStudioArticleBody,
  UpdateStudioArticleParams,
  UpdateStudioArticleResponse,
  UpdateStudioCommentBody,
  UpdateStudioCommentParams,
  UpdateStudioCommentResponse,
  UpdateStudioLiveBody,
  UpdateStudioLiveResponse,
  UpdateStudioSettingsBody,
  UpdateStudioSettingsResponse,
  UpdateStudioShowBody,
  UpdateStudioShowParams,
  UpdateStudioShowResponse,
  UpdateStudioVideoBody,
  UpdateStudioVideoParams,
  UpdateStudioVideoResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

function isoDate(value: Date): string {
  return value.toISOString();
}

function parseDate(value: string): Date | null {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function relativeTime(value: Date): string {
  const minutes = Math.max(0, Math.floor((Date.now() - value.getTime()) / 60000));
  if (minutes < 1) return "À l'instant";
  if (minutes < 60) return `Il y a ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Il y a ${hours} h`;
  return "Hier";
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

function articleInput(data: {
  slug: string;
  title: string;
  excerpt: string;
  content?: string | null;
  category: string;
  authorName: string;
  authorAvatar: string;
  publishedAt: string;
  readTime: number;
  imageUrl: string;
  isBreaking: boolean;
  isTrending: boolean;
}) {
  const publishedAt = parseDate(data.publishedAt);
  if (!publishedAt || data.readTime < 1) return null;
  return {
    slug: data.slug.trim(),
    title: data.title.trim(),
    excerpt: data.excerpt.trim(),
    content: data.content ?? null,
    category: data.category.trim(),
    authorName: data.authorName.trim(),
    authorAvatar: data.authorAvatar.trim(),
    publishedAt,
    readTime: data.readTime,
    imageUrl: data.imageUrl.trim(),
    isBreaking: data.isBreaking,
    isTrending: data.isTrending,
  };
}

function videoInput(data: {
  title: string;
  description: string;
  category: string;
  duration: string;
  thumbnailUrl: string;
  publishedAt: string;
  author: string;
}) {
  const publishedAt = parseDate(data.publishedAt);
  if (!publishedAt) return null;
  return {
    title: data.title.trim(),
    description: data.description.trim(),
    category: data.category.trim(),
    duration: data.duration.trim(),
    thumbnailUrl: data.thumbnailUrl.trim(),
    publishedAt,
    author: data.author.trim(),
  };
}

function showInput(data: {
  title: string;
  host: string;
  schedule: string;
  nextEpisode: string;
  coverUrl: string;
  subscribers: number;
  isLive: boolean;
}) {
  if (data.subscribers < 0) return null;
  return {
    title: data.title.trim(),
    host: data.host.trim(),
    schedule: data.schedule.trim(),
    nextEpisode: data.nextEpisode.trim(),
    coverUrl: data.coverUrl.trim(),
    subscribers: data.subscribers,
    isLive: data.isLive,
  };
}

router.get("/studio/summary", async (_req, res): Promise<void> => {
  const [{ totalViews }] = await db.select({ totalViews: sql<number>`coalesce(sum(${articlesTable.views}), 0)` }).from(articlesTable);
  const [{ publishedArticles }] = await db.select({ publishedArticles: sql<number>`count(*)` }).from(articlesTable);
  const daily = await db.select().from(analyticsDailyTable).orderBy(asc(analyticsDailyTable.day));
  const topArticles = await db.select().from(articlesTable).orderBy(desc(articlesTable.views)).limit(4);
  const [plans] = await db.select({ priceCents: monetizationPlansTable.priceCents }).from(monetizationPlansTable).where(eq(monetizationPlansTable.id, "premium"));
  res.json(GetStudioSummaryResponse.parse({
    totalViews: Number(totalViews),
    premiumSubscribers: 2350,
    publishedArticles: Number(publishedArticles),
    recurringRevenueCents: Number(plans?.priceCents ?? 0) * 2350,
    daily: daily.map((point) => ({ name: point.day, visitors: point.visitors, views: point.views })),
    topArticles: topArticles.map(toArticle),
  }));
});

router.get("/studio/articles", async (_req, res): Promise<void> => {
  const articles = await db.select().from(articlesTable).orderBy(desc(articlesTable.publishedAt));
  res.json(ListStudioArticlesResponse.parse(articles.map(toArticle)));
});

router.post("/studio/articles", async (req, res): Promise<void> => {
  const parsed = CreateStudioArticleBody.safeParse(req.body);
  const input = parsed.success ? articleInput(parsed.data) : null;
  if (!input || !parsed.success || !Object.values(input).every((value) => value !== "")) {
    res.status(400).json({ error: "Les champs de l’article sont invalides." });
    return;
  }
  const [article] = await db.insert(articlesTable).values({
    id: `article-${crypto.randomUUID()}`,
    ...input,
  }).returning();
  res.status(201).json(CreateStudioArticleResponse.parse(toArticle(article)));
});

router.patch("/studio/articles/:id", async (req, res): Promise<void> => {
  const params = UpdateStudioArticleParams.safeParse(req.params);
  const parsed = UpdateStudioArticleBody.safeParse(req.body);
  const input = parsed.success ? articleInput(parsed.data) : null;
  if (!params.success || !input || !parsed.success || !Object.values(input).every((value) => value !== "")) {
    res.status(400).json({ error: "Les champs de l’article sont invalides." });
    return;
  }
  const [article] = await db.update(articlesTable).set(input).where(eq(articlesTable.id, params.data.id)).returning();
  if (!article) {
    res.status(404).json({ error: "Article not found" });
    return;
  }
  res.json(UpdateStudioArticleResponse.parse(toArticle(article)));
});

router.delete("/studio/articles/:id", async (req, res): Promise<void> => {
  const params = DeleteStudioArticleParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [article] = await db.delete(articlesTable).where(eq(articlesTable.id, params.data.id)).returning({ id: articlesTable.id });
  if (!article) {
    res.status(404).json({ error: "Article not found" });
    return;
  }
  res.status(204).send();
});

router.get("/studio/videos", async (_req, res): Promise<void> => {
  const videos = await db.select().from(videosTable).orderBy(desc(videosTable.publishedAt));
  res.json(ListStudioVideosResponse.parse(videos.map((video) => ({ ...video, publishedAt: isoDate(video.publishedAt) }))));
});

router.post("/studio/videos", async (req, res): Promise<void> => {
  const parsed = CreateStudioVideoBody.safeParse(req.body);
  const input = parsed.success ? videoInput(parsed.data) : null;
  if (!input || !parsed.success || !Object.values(input).every((value) => value !== "")) {
    res.status(400).json({ error: "Les champs de la vidéo sont invalides." });
    return;
  }
  const [video] = await db.insert(videosTable).values({ id: `video-${crypto.randomUUID()}`, views: 0, ...input }).returning();
  res.status(201).json(CreateStudioVideoResponse.parse({ ...video, publishedAt: isoDate(video.publishedAt) }));
});

router.patch("/studio/videos/:id", async (req, res): Promise<void> => {
  const params = UpdateStudioVideoParams.safeParse(req.params);
  const parsed = UpdateStudioVideoBody.safeParse(req.body);
  const input = parsed.success ? videoInput(parsed.data) : null;
  if (!params.success || !input || !parsed.success || !Object.values(input).every((value) => value !== "")) {
    res.status(400).json({ error: "Les champs de la vidéo sont invalides." });
    return;
  }
  const [video] = await db.update(videosTable).set(input).where(eq(videosTable.id, params.data.id)).returning();
  if (!video) {
    res.status(404).json({ error: "Video not found" });
    return;
  }
  res.json(UpdateStudioVideoResponse.parse({ ...video, publishedAt: isoDate(video.publishedAt) }));
});

router.delete("/studio/videos/:id", async (req, res): Promise<void> => {
  const params = DeleteStudioVideoParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [video] = await db.delete(videosTable).where(eq(videosTable.id, params.data.id)).returning({ id: videosTable.id });
  if (!video) {
    res.status(404).json({ error: "Video not found" });
    return;
  }
  res.status(204).send();
});

router.get("/studio/shows", async (_req, res): Promise<void> => {
  const shows = await db.select().from(showsTable).orderBy(asc(showsTable.title));
  res.json(ListStudioShowsResponse.parse(shows));
});

router.post("/studio/shows", async (req, res): Promise<void> => {
  const parsed = CreateStudioShowBody.safeParse(req.body);
  const input = parsed.success ? showInput(parsed.data) : null;
  if (!input || !parsed.success || !Object.values(input).every((value) => value !== "")) {
    res.status(400).json({ error: "Les champs de l’émission sont invalides." });
    return;
  }
  const [show] = await db.insert(showsTable).values({ id: `show-${crypto.randomUUID()}`, ...input }).returning();
  res.status(201).json(CreateStudioShowResponse.parse(show));
});

router.patch("/studio/shows/:id", async (req, res): Promise<void> => {
  const params = UpdateStudioShowParams.safeParse(req.params);
  const parsed = UpdateStudioShowBody.safeParse(req.body);
  const input = parsed.success ? showInput(parsed.data) : null;
  if (!params.success || !input || !parsed.success || !Object.values(input).every((value) => value !== "")) {
    res.status(400).json({ error: "Les champs de l’émission sont invalides." });
    return;
  }
  const [show] = await db.update(showsTable).set(input).where(eq(showsTable.id, params.data.id)).returning();
  if (!show) {
    res.status(404).json({ error: "Show not found" });
    return;
  }
  res.json(UpdateStudioShowResponse.parse(show));
});

router.delete("/studio/shows/:id", async (req, res): Promise<void> => {
  const params = DeleteStudioShowParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [show] = await db.delete(showsTable).where(eq(showsTable.id, params.data.id)).returning({ id: showsTable.id });
  if (!show) {
    res.status(404).json({ error: "Show not found" });
    return;
  }
  res.status(204).send();
});

router.get("/studio/comments", async (_req, res): Promise<void> => {
  const comments = await db.select({
    id: commentsTable.id,
    articleId: commentsTable.articleId,
    articleTitle: articlesTable.title,
    user: commentsTable.userName,
    avatar: commentsTable.avatar,
    text: commentsTable.text,
    createdAt: commentsTable.createdAt,
    status: commentsTable.status,
  }).from(commentsTable).innerJoin(articlesTable, eq(commentsTable.articleId, articlesTable.id)).orderBy(desc(commentsTable.createdAt));
  res.json(ListStudioCommentsResponse.parse(comments.map((comment) => ({
    ...comment,
    time: relativeTime(comment.createdAt),
  }))));
});

router.patch("/studio/comments/:id", async (req, res): Promise<void> => {
  const params = UpdateStudioCommentParams.safeParse(req.params);
  const body = UpdateStudioCommentBody.safeParse(req.body);
  if (!params.success || !body.success) {
    res.status(400).json({ error: "Statut de commentaire invalide." });
    return;
  }
  const [comment] = await db.update(commentsTable).set({ status: body.data.status }).where(eq(commentsTable.id, params.data.id)).returning();
  if (!comment) {
    res.status(404).json({ error: "Comment not found" });
    return;
  }
  const [article] = await db.select({ title: articlesTable.title }).from(articlesTable).where(eq(articlesTable.id, comment.articleId));
  res.json(UpdateStudioCommentResponse.parse({
    id: comment.id,
    articleId: comment.articleId,
    articleTitle: article?.title ?? "Article supprimé",
    user: comment.userName,
    avatar: comment.avatar,
    text: comment.text,
    time: relativeTime(comment.createdAt),
    status: comment.status,
  }));
});

router.get("/studio/users", async (_req, res): Promise<void> => {
  const users = await db.select().from(studioUsersTable).orderBy(desc(studioUsersTable.joinedAt));
  res.json(ListStudioUsersResponse.parse(users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    joined: isoDate(user.joinedAt),
  }))));
});

router.post("/studio/users", async (req, res): Promise<void> => {
  const parsed = InviteStudioUserBody.safeParse(req.body);
  if (!parsed.success || !parsed.data.name.trim() || !parsed.data.email.trim()) {
    res.status(400).json({ error: "Nom, email et rôle sont requis." });
    return;
  }
  const [user] = await db.insert(studioUsersTable).values({
    id: `user-${crypto.randomUUID()}`,
    name: parsed.data.name.trim(),
    email: parsed.data.email.trim().toLowerCase(),
    role: parsed.data.role.trim(),
    status: "Invitation en attente",
  }).returning();
  res.status(201).json(InviteStudioUserResponse.parse({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    joined: isoDate(user.joinedAt),
  }));
});

router.get("/studio/moderation/reports", async (_req, res): Promise<void> => {
  const reports = await db.select().from(moderationReportsTable).orderBy(desc(moderationReportsTable.createdAt));
  res.json(ListModerationReportsResponse.parse(reports.map((report) => ({ ...report, createdAt: isoDate(report.createdAt) }))));
});

router.patch("/studio/moderation/reports/:id", async (req, res): Promise<void> => {
  const params = UpdateModerationReportParams.safeParse(req.params);
  const body = UpdateModerationReportBody.safeParse(req.body);
  if (!params.success || !body.success) {
    res.status(400).json({ error: "Statut de signalement invalide." });
    return;
  }
  const [report] = await db.update(moderationReportsTable).set({ status: body.data.status }).where(eq(moderationReportsTable.id, params.data.id)).returning();
  if (!report) {
    res.status(404).json({ error: "Report not found" });
    return;
  }
  res.json(UpdateModerationReportResponse.parse({ ...report, createdAt: isoDate(report.createdAt) }));
});

router.get("/studio/analytics", async (_req, res): Promise<void> => {
  const daily = await db.select().from(analyticsDailyTable).orderBy(asc(analyticsDailyTable.day));
  res.json(GetStudioAnalyticsResponse.parse({
    visitors: daily.reduce((sum, point) => sum + point.visitors, 0),
    views: daily.reduce((sum, point) => sum + point.views, 0),
    averageDuration: "04:32",
    activeCountries: 42,
    daily: daily.map((point) => ({ name: point.day, visitors: point.visitors, views: point.views })),
    trafficSources: [
      { label: "Recherche organique", value: 42 },
      { label: "Réseaux sociaux", value: 28 },
      { label: "Accès direct", value: 19 },
      { label: "Newsletter", value: 11 },
    ],
    geography: [
      { label: "Nigeria", value: 31 },
      { label: "RDC", value: 19 },
      { label: "Kenya", value: 16 },
      { label: "Sénégal", value: 14 },
      { label: "Autres", value: 20 },
    ],
  }));
});

router.get("/studio/monetization", async (_req, res): Promise<void> => {
  const plans = await db.select().from(monetizationPlansTable).orderBy(asc(monetizationPlansTable.priceCents));
  res.json(GetStudioMonetizationResponse.parse({
    recurringRevenueCents: 699 * 2350,
    premiumSubscribers: 2350,
    conversionRate: 6.8,
    plans: plans.map((plan) => ({
      id: plan.id,
      name: plan.name,
      priceCents: plan.priceCents,
      currency: plan.currency,
      description: plan.description,
      features: JSON.parse(plan.features) as string[],
      isActive: plan.isActive === 1,
    })),
  }));
});

function settingsResponse(values: Record<string, string>) {
  return {
    siteName: values.siteName ?? "Pulse Africa",
    siteLanguage: values.siteLanguage ?? "Français",
    siteDescription: values.siteDescription ?? "",
    editorialEmail: values.editorialEmail ?? "",
    dailyDigest: values.dailyDigest === "true",
    moderationAlerts: values.moderationAlerts === "true",
    weeklyAnalytics: values.weeklyAnalytics === "true",
  };
}

router.get("/studio/settings", async (_req, res): Promise<void> => {
  const settings = await db.select().from(studioSettingsTable);
  const values = Object.fromEntries(settings.map((setting) => [setting.key, setting.value]));
  res.json(GetStudioSettingsResponse.parse(settingsResponse(values)));
});

router.patch("/studio/settings", async (req, res): Promise<void> => {
  const parsed = UpdateStudioSettingsBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Paramètres invalides." });
    return;
  }
  const values = {
    siteName: parsed.data.siteName,
    siteLanguage: parsed.data.siteLanguage,
    siteDescription: parsed.data.siteDescription,
    editorialEmail: parsed.data.editorialEmail,
    dailyDigest: String(parsed.data.dailyDigest),
    moderationAlerts: String(parsed.data.moderationAlerts),
    weeklyAnalytics: String(parsed.data.weeklyAnalytics),
  };
  await db.transaction(async (tx) => {
    for (const [key, value] of Object.entries(values)) {
      await tx.insert(studioSettingsTable).values({ key, value }).onConflictDoUpdate({ target: studioSettingsTable.key, set: { value, updatedAt: new Date() } });
    }
  });
  res.json(UpdateStudioSettingsResponse.parse(parsed.data));
});

router.get("/studio/live", async (_req, res): Promise<void> => {
  const shows = await db.select().from(showsTable).orderBy(asc(showsTable.title));
  const currentShow = shows.find((show) => show.isLive);
  res.json(GetStudioLiveResponse.parse({
    isLive: Boolean(currentShow),
    viewers: currentShow ? 12450 : 0,
    currentShow,
    upcoming: shows.filter((show) => !show.isLive).slice(0, 3),
  }));
});

router.patch("/studio/live", async (req, res): Promise<void> => {
  const parsed = UpdateStudioLiveBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "État Live invalide." });
    return;
  }
  const shows = await db.select().from(showsTable).orderBy(asc(showsTable.title));
  const selectedId = parsed.data.showId ?? shows.find((show) => show.isLive)?.id ?? shows[0]?.id;
  if (parsed.data.isLive && !selectedId) {
    res.status(400).json({ error: "Aucune émission disponible pour démarrer le direct." });
    return;
  }
  await db.update(showsTable).set({ isLive: parsed.data.isLive ? false : false });
  if (parsed.data.isLive && selectedId) {
    await db.update(showsTable).set({ isLive: true }).where(eq(showsTable.id, selectedId));
  }
  const updatedShows = await db.select().from(showsTable).orderBy(asc(showsTable.title));
  const currentShow = updatedShows.find((show) => show.isLive);
  res.json(UpdateStudioLiveResponse.parse({
    isLive: Boolean(currentShow),
    viewers: currentShow ? 12450 : 0,
    currentShow,
    upcoming: updatedShows.filter((show) => !show.isLive).slice(0, 3),
  }));
});

export default router;