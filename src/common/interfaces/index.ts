export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  date?: Date;
  path?: string;
  // takenTime: number;
}
