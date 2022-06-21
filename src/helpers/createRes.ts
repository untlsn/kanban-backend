import { FastifyReply } from 'fastify';

const errorNames = {
  200: 'OK',
  201: 'Created',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
};

type Code = keyof typeof errorNames;

export default function createRes(rep: FastifyReply, statusCode: Code, message, spread?) {
  rep.status(statusCode);

  return {
    statusCode,
    error: errorNames[statusCode],
    message,
    ...spread,
  };
}

export function createResCreator(rep: FastifyReply) {
  return (statusCode: Code, message, spread?) => createRes(rep, statusCode, message, spread);
}
