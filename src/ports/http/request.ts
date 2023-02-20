export interface Request<Body = any, Params = any, Query = any, Headers = any, Files = any> {
  body: Body
  params: Params
  query: Query
  headers: Headers
  files?: Files
}
