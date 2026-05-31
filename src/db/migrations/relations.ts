import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
	apiKeys: {
		user: r.one.users({
			from: r.apiKeys.userId,
			to: r.users.id
		}),
	},
	users: {
		apiKeys: r.many.apiKeys(),
		authors: r.many.authors({
			from: r.users.id.through(r.books.addedBy),
			to: r.authors.id.through(r.books.authorId)
		}),
	},
	authors: {
		users: r.many.users(),
	},
}))