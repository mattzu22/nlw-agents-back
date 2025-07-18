import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/index.ts';
import { limitIp } from '../../middleware/limit-ip.ts';

export const createRoomRoute: FastifyPluginCallbackZod = (
    app
) => {
    app.post(
        '/rooms',
        {
            preHandler: [limitIp],

            schema: {
                body: z.object({
                    name: z.string().min(1),
                    description: z.string().optional(),
                }),
            },
        },
        async (request, reply) => {
            const { name, description } = request.body;
            // const { ip } = request;

            // await db.insert(schema.limitIp).values({
            //     ip_address: ip,
            //     roomCount: String(1),
            // });

            //dentro do postgres ele vai retorna para operaçôes de insert, select um array<never>, pois por padrão ele nao retorna os dados da tabela, ele retorna uma contagem de linhas inseridas, seu quiser retorna oa dados eu preciso colocar um returning
            const result = await db
                .insert(schema.rooms)
                .values({
                    name,
                    description,
                })
                .returning();

            const insertedRoom = result[0];

            if (!insertedRoom) {
                throw new Error('Failed to create room');
            }

            reply.code(201).send({ roomId: insertedRoom.id });
        }
    );
};
