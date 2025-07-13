import { pgTable, text, timestamp, uuid, vector } from 'drizzle-orm/pg-core'
import { rooms } from './rooms.ts'

export const audioChunks = pgTable('audio_chunks', {
    id: uuid().primaryKey().defaultRandom(),
    roomId: uuid()
        .references(() => rooms.id)
        .notNull(),
    transcription: text().notNull(),
    //dimension = seria as caracteristicas de um audio em um array, nesse caso, Busca semantica por vetor
    embeddings: vector({ dimensions: 768 }).notNull(),
    createdAt: timestamp().defaultNow().notNull(),
})