import fastify from "fastify";
import cors from "fastify-cors";
import fastifyMultipart from "fastify-multipart";
import { initiateSummary } from "./lib/speech";
import { prisma } from "./prisma";

const server = fastify({ logger: true });

server.register(cors, {
  origin: "*",
});
server.register(fastifyMultipart);

server.get("/", async (request, reply) => {
  return prisma.user.findMany();
});

server.post("/initiate-summary", initiateSummary);

// server.get<{ Querystring: TGetSignedUrlParams }>(
//   "/signed-url",
//   {
//     schema: {
//       querystring: GetSignedUrlParams,
//     },
//   },
//   (request, reply) => {
//     const { fileName, contentType } = request.query;
//     reply.send(generateV4UploadSignedUrl({ fileName, contentType }));
//   }
// );

const start = async () => {
  try {
    await server.listen(4000);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
