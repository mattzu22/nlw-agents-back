import { fastifyCors } from '@fastify/cors';
import { fastifyMultipart } from '@fastify/multipart';
import { fastify } from 'fastify';
import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { createQuestionRoute } from './http/routes/create-question.ts';
import { createRoomRoute } from './http/routes/create-rooms.ts';
import { getRoomsQuestionsRoute } from './http/routes/get-room-questions.ts';
import { getRoomsRoute } from './http/routes/get-rooms.ts';
import { uploadAudioRoute } from './http/routes/upload-audio.ts';
import { env } from './utils/env.ts';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
    origin: '*',
});

app.register(fastifyMultipart);

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get('/helth', () => {
    return 'ok';
});

app.register(getRoomsRoute);
app.register(createRoomRoute);
app.register(getRoomsQuestionsRoute);
app.register(createQuestionRoute);
app.register(uploadAudioRoute);

app.listen({ port: env.PORT }).then(() => {
    // biome-ignore lint/suspicious/noConsole: react
    console.log('Server is running');
});
