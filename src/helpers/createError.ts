function getErrorName(code: number) {
  switch (code) {
    case 403: return 'Forbidden';
    case 404: return 'Not Found';
    default: return 'Error';
  }
}

export default function createError(statusCode: number, message) {
  return {
    statusCode,
    error: getErrorName(statusCode),
    message,
  };
}
