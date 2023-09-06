import { AxiosResponse } from "axios";

type Res<T> = Success<T> | Failure;

type Success<T> = {
  success: true;
  code: number;
  data: T;
};

type Failure = {
  success: false;
  code: number;
  error: unknown;
};

type RequestFunction<Args extends unknown[], T> = (...args: Args) => Promise<AxiosResponse<T>>;

export const axiosHandler = <Args extends unknown[], ReturnType>(
  requestFn: RequestFunction<Args, ReturnType>
) => {
  return async (...params: Args): Promise<ReturnType> => {
    const res = await (requestFn(...params) as Promise<AxiosResponse<Res<ReturnType>>>);
    res.data;
    if (!res.data.success) {
      throw res.data.error;
    }
    return res.data.data;
  };
};
