import { numeric, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';


export const limitIp = pgTable('limit_ip', {
    id: uuid().primaryKey().defaultRandom(),
    ip_address: text().notNull(),
    roomCount: numeric(),
    lostcreatedat: timestamp().defaultNow().notNull(),
});
