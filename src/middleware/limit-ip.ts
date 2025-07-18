import { eq } from 'drizzle-orm';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { db } from '../db/connection.ts';
import { schema } from '../db/schema/index.ts';

export const limitIp = async (request: FastifyRequest, reply: FastifyReply) => {
    const { ip } = request;

    const existingIpRecord = await db
        .select({ roomCount: schema.limitIp.roomCount })
        .from(schema.limitIp)
        .where(eq(schema.limitIp.ip_address, ip));

    let currentRoomCountValue = 0;
    let isNewIp = false;

    if (existingIpRecord.length > 0) {
        currentRoomCountValue = Number(existingIpRecord[0].roomCount || 0);
    } else {
        isNewIp = true;
    }

    if (currentRoomCountValue >= 3) {
        return reply
            .code(429)
            .send({ message: 'Número máximo de salas atingido para este IP.' });
    }
    if (isNewIp) {
        await db.insert(schema.limitIp).values({
            ip_address: ip,
            roomCount: String(1),
        });
    } else {
        const newRoomCountValue = currentRoomCountValue + 1;
        await db
            .update(schema.limitIp)
            .set({ roomCount: String(newRoomCountValue) })
            .where(eq(schema.limitIp.ip_address, ip));
    }

};
