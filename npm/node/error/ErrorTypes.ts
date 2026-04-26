export type HttpError = {
  message: string;
  statusCode: number;
  [key: string]: any;
};