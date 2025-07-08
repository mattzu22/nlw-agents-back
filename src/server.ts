import { fastifyCors } from '@fastify/cors';
import { fastify } from 'fastify';
import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { getRoomsRoute } from './http/routes/get-rooms.ts';
import { env } from './utils/env.ts';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
    origin: '*',
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get('/helth', () => {
    return 'ok';
});

app.register(getRoomsRoute);

app.listen({ port: env.PORT }).then(() => {
    console.log('Server is running');
});
