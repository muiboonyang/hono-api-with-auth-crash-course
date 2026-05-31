import { pgEnum, pgTable, uuid, text, timestamp, varchar, integer, foreignKey, primaryKey, unique } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const userRole = pgEnum("user_role", ["user", "admin"])


export const apiKeys = pgTable("api_keys", {
	id: uuid().defaultRandom().primaryKey(),
	userId: uuid().notNull().references(() => users.id, { onDelete: "cascade" } ),
	name: text().notNull(),
	keyHash: text().notNull(),
	keyPrefix: varchar({ length: 8 }).notNull(),
	createdAt: timestamp({ withTimezone: true }).default(sql`now()`).notNull(),
});

export const authors = pgTable("authors", {
	id: uuid().defaultRandom().primaryKey(),
	name: text().notNull(),
	birthday: timestamp({ withTimezone: true }),
	createdAt: timestamp({ withTimezone: true }).default(sql`now()`).notNull(),
});

export const books = pgTable("books", {
	id: uuid().defaultRandom().primaryKey(),
	title: text().notNull(),
	description: text(),
	publishDate: timestamp({ withTimezone: true }),
	pageCount: integer(),
	authorId: uuid().notNull().references(() => authors.id, { onDelete: "restrict" } ),
	addedBy: uuid().notNull().references(() => users.id, { onDelete: "restrict" } ),
	createdAt: timestamp({ withTimezone: true }).default(sql`now()`).notNull(),
});

export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey(),
	email: text().notNull(),
	passwordHash: text().notNull(),
	role: userRole().default("user").notNull(),
	createdAt: timestamp({ withTimezone: true }).default(sql`now()`).notNull(),
}, (table) => [
	unique("users_email_key").on(table.email),]);
