import axios from "axios";

export type ApiResponse<T = unknown> =
  | {
      error: string;
      success: false;
    }
  | {
      data: T;
      success: true;
    };

export function createApi(baseURL: string) {
  const instance = axios.create({ baseURL });

  instance.interceptors.request.use(
    (config) => {
      // change headers ...
      // do smth
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // catch error

      return Promise.reject(error);
    }
  );

  async function get<T = unknown>(url: string, params?: object) {
    return (await instance.get<ApiResponse<T>>(url, { params })).data;
  }

  async function post<T = unknown>(url: string, data?: object) {
    return (await instance.post<ApiResponse<T>>(url, data)).data;
  }

  async function remove<T = unknown>(url: string, params?: object) {
    return (await instance.delete<ApiResponse<T>>(url, { params })).data;
  }

  return {
    get,
    post,
    delete: remove,
    instance,
  };
}
