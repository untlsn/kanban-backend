import fastify from '../../init';

export default function GET() {
  // Title, desc, status and all subtasks
  fastify.get('/task', (req, rep) => {

  });

  // Only title, status and subtasks counts
  fastify.get('/task/mini', (req, rep) => {

  });
}
