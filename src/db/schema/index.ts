import { audioChunks } from './audio-chunks.ts';
import { limitIp } from './ip-user.ts';
import { questions } from './questions.ts';
import { rooms } from './rooms.ts';

//Bearel file = um arquivo que reexporta todos os arquivos, centralizando tudo
export const schema = {
    rooms,
    questions,
    audioChunks,
    limitIp
};
