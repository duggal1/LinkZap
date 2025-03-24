import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
  text,
  primaryKey,
  boolean,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";

// Define user roles enum
export const userRoleEnum = pgEnum("user_role", ["user", "admin"]);

// Define user table
export const user = pgTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
  role: userRoleEnum("role").default("user").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const account = pgTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const session = pgTable("session", {
  sessionToken: varchar("session_token", { length: 255 })
    .notNull()
    .primaryKey(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ]
);

export const urls = pgTable("urls", {
  id: serial("id").primaryKey(),
  originalUrl: varchar("original_url", { length: 2000 }).notNull(),
  shortCode: varchar("short_code", { length: 10 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  clicks: integer("clicks").default(0).notNull(),
  userId: varchar("user_id", { length: 255 }).references(() => user.id, {
    onDelete: "set null",
  }),
  flagged: boolean("flagged").default(false).notNull(),
  flagReason: text("flag_reason"),
});

// Define relations after all tables are defined
export const userRelations = relations(user, ({ many }) => ({
  urls: many(urls),
  accounts: many(account),
  sessions: many(session),
}));

export const urlsRelations = relations(urls, ({ one }) => ({
  user: one(user, {
    fields: [urls.userId],
    references: [user.id],
  }),
}));
