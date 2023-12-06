import fastify from 'fastify';
import Log from "./log";
import LogRepository from "./log.repository";

const server = fastify({logger: true});

server.post('/', async function handler(request, reply) {
    const requestBody: any = request.body;

    const log = Log.parse(requestBody.log ?? []);

    await LogRepository.persist(log)
})

try {
    server.listen({port: 3000})
} catch (err) {
    server.log.error(err)
    process.exit(1)
}