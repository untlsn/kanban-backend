function getErrorName(code: number) {
  switch (code) {
    case 403: return 'Forbidden';
    case 404: return 'Not Found';
    case 409: return 'Conflict';
    default: return 'Error';
  }
}

export default function createError(statusCode: number, message, spread?) {
  return {
    statusCode,
    error: getErrorName(statusCode),
    message,
    ...spread,
  };
}
