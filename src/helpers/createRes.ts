import { FastifyReply } from 'fastify';

const errorNames = {
  200: 'OK',
  201: 'Created',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
};

type Code = keyof typeof errorNames;

export default function createRes(rep: FastifyReply, statusCode: Code, message, data?, spread?) {
  rep.status(statusCode);

  return {
    statusCode,
    error: errorNames[statusCode],
    message,
    data,
    ...spread,
  };
}

export function createResCreator(rep: FastifyReply) {
  return (statusCode: Code, message, data?, spread?) => (
    createRes(rep, statusCode, message, data, spread)
  );
}
