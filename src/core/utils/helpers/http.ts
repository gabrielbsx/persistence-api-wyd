import { type Response } from 'ports/http/response'

export const ok = <T>(body: T): Response<T> => ({
  statusCode: 200,
  body
})

export const created = <T>(body: T): Response<T> => ({
  statusCode: 201,
  body
})

export const noContent = (): Response<null> => ({
  statusCode: 204,
  body: null
})

export const badRequest = <T>(body: T): Response<T> => ({
  statusCode: 400,
  body
})

export const unauthorized = <T>(body: T): Response<T> => ({
  statusCode: 401,
  body
})

export const forbidden = <T>(body: T): Response<T> => ({
  statusCode: 403,
  body
})

export const notFound = <T>(body: T): Response<T> => ({
  statusCode: 404,
  body
})

export const conflict = <T>(body: T): Response<T> => ({
  statusCode: 409,
  body
})

export const internalServerError = <T>(body: T): Response<T> => ({
  statusCode: 500,
  body
})

export const notImplemented = <T>(body: T): Response<T> => ({
  statusCode: 501,
  body
})

export const badGateway = <T>(body: T): Response<T> => ({
  statusCode: 502,
  body
})
