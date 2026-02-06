export default class HttpResponse {
  static ok(data?: any, message?: string) {
    return {
      statusCode: 200,
      body: {
        ...(message && { message }),
        ...(data && { data }),
      },
    };
  }

  static created(data?: any, message?: string) {
    return {
      statusCode: 201,
      body: {
        ...(message && { message }),
        ...(data && { data }),
      },
    };
  }

  static badRequest(data?: any, message?: string) {
    return {
      statusCode: 400,
      body: {
        ...(message && { message }),
        ...(data && { data }),
      },
    };
  }

  static unauthorized(data?: any, message?: string) {
    return {
      statusCode: 401,
      body: {
        ...(message && { message }),
        ...(data && { data }),
      },
    };
  }

  static notFound(data?: any, message?: string) {
    return {
      statusCode: 404,
      body: {
        ...(message && { message }),
        ...(data && { data }),
      },
    };
  }

  static conflict(data?: any, message?: string) {
    return {
      statusCode: 409,
      body: {
        ...(message && { message }),
        ...(data && { data }),
      },
    };
  }

  static serverError() {
    return {
      statusCode: 500,
      body: { message: "Internal server error" },
    };
  }
}
