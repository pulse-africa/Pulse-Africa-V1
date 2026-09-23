import { createInsertSchema } from "drizzle-zod";
import { boolean, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod/v4";

export const articlesTable = pgTable("content_articles", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content"),
  category: text("category").notNull(),
  authorName: text("author_name").notNull(),
  authorAvatar: text("author_avatar").notNull(),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull(),
  readTime: integer("read_time").notNull(),
  imageUrl: text("image_url").notNull(),
  isBreaking: boolean("is_breaking").notNull().default(false),
  isTrending: boolean("is_trending").notNull().default(false),
  views: integer("views").notNull().default(0),
  likes: integer("likes").notNull().default(0),
  commentsCount: integer("comments_count").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const videosTable = pgTable("content_videos", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  duration: text("duration").notNull(),
  views: integer("views").notNull().default(0),
  thumbnailUrl: text("thumbnail_url").notNull(),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull(),
  author: text("author").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const showsTable = pgTable("content_shows", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  host: text("host").notNull(),
  schedule: text("schedule").notNull(),
  nextEpisode: text("next_episode").notNull(),
  coverUrl: text("cover_url").notNull(),
  subscribers: integer("subscribers").notNull().default(0),
  isLive: boolean("is_live").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const commentsTable = pgTable("content_comments", {
  id: text("id").primaryKey(),
  articleId: text("article_id").notNull().references(() => articlesTable.id, { onDelete: "cascade" }),
  userName: text("user_name").notNull(),
  avatar: text("avatar"),
  text: text("text").notNull(),
  status: text("status").notNull().default("approved"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertArticleSchema = createInsertSchema(articlesTable).omit({ createdAt: true, updatedAt: true });
export const insertVideoSchema = createInsertSchema(videosTable).omit({ createdAt: true });
export const insertShowSchema = createInsertSchema(showsTable).omit({ createdAt: true });
export const insertCommentSchema = createInsertSchema(commentsTable).omit({ createdAt: true });

export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type Article = typeof articlesTable.$inferSelect;
export type InsertVideo = z.infer<typeof insertVideoSchema>;
export type Video = typeof videosTable.$inferSelect;
export type InsertShow = z.infer<typeof insertShowSchema>;
export type Show = typeof showsTable.$inferSelect;
export type InsertComment = z.infer<typeof insertCommentSchema>;
export type Comment = typeof commentsTable.$inferSelect;