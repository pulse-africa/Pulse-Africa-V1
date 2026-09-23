import { createInsertSchema } from "drizzle-zod";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod/v4";

export const studioUsersTable = pgTable("studio_users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull(),
  status: text("status").notNull().default("Actif"),
  joinedAt: timestamp("joined_at", { withTimezone: true }).notNull().defaultNow(),
});

export const moderationReportsTable = pgTable("studio_moderation_reports", {
  id: text("id").primaryKey(),
  type: text("type").notNull(),
  subject: text("subject").notNull(),
  reason: text("reason").notNull(),
  reporter: text("reporter").notNull(),
  status: text("status").notNull().default("En attente"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const studioSettingsTable = pgTable("studio_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const analyticsDailyTable = pgTable("studio_analytics_daily", {
  day: text("day").primaryKey(),
  visitors: integer("visitors").notNull().default(0),
  views: integer("views").notNull().default(0),
});

export const monetizationPlansTable = pgTable("studio_monetization_plans", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  priceCents: integer("price_cents").notNull().default(0),
  currency: text("currency").notNull().default("EUR"),
  description: text("description").notNull(),
  features: text("features").notNull().default("[]"),
  isActive: integer("is_active").notNull().default(1),
});

export const insertStudioUserSchema = createInsertSchema(studioUsersTable).omit({ joinedAt: true });
export const insertModerationReportSchema = createInsertSchema(moderationReportsTable).omit({ createdAt: true });
export const insertStudioSettingSchema = createInsertSchema(studioSettingsTable).omit({ updatedAt: true });
export const insertAnalyticsDailySchema = createInsertSchema(analyticsDailyTable);
export const insertMonetizationPlanSchema = createInsertSchema(monetizationPlansTable);

export type InsertStudioUser = z.infer<typeof insertStudioUserSchema>;
export type StudioUser = typeof studioUsersTable.$inferSelect;
export type InsertModerationReport = z.infer<typeof insertModerationReportSchema>;
export type ModerationReport = typeof moderationReportsTable.$inferSelect;
export type InsertStudioSetting = z.infer<typeof insertStudioSettingSchema>;
export type StudioSetting = typeof studioSettingsTable.$inferSelect;
export type InsertAnalyticsDaily = z.infer<typeof insertAnalyticsDailySchema>;
export type AnalyticsDaily = typeof analyticsDailyTable.$inferSelect;
export type InsertMonetizationPlan = z.infer<typeof insertMonetizationPlanSchema>;
export type MonetizationPlan = typeof monetizationPlansTable.$inferSelect;