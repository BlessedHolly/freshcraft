import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  createApi,
} from "@reduxjs/toolkit/query/react";

import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_ACCESS_TOKEN_TYPE_KEY,
} from "../assets/const";

import type {
  IGetProfileResponseData,
  IMessageResponse,
  ILoginResponse,
  IGetMicrosoftLinkResponseData,
} from "../types/index";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
    const type = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_TYPE_KEY);

    if (token && type) {
      headers.set("Authorization", `${type} ${token}`);
    }

    headers.set("Accept", "application/json");
    return headers;
  },
  credentials: "include",
});

const PUBLIC_ENDPOINTS = [
  "/oauth/xbox/callback",
  "/oauth/microsoft/callback",
  "/auth/email-verify",
];

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  // Получим путь
  const url = typeof args === "string" ? args : args.url;

  const isPublicEndpoint = PUBLIC_ENDPOINTS.some((endpoint) =>
    url.includes(endpoint)
  );

  // Если публичный – просто выполняем и возвращаем
  if (isPublicEndpoint) {
    return rawBaseQuery(args, api, extraOptions);
  }

  // Выполняем запрос с токеном
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    // Пытаемся обновить токен
    const refreshResult = await rawBaseQuery(
      { url: "/auth/refresh", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult.data && typeof refreshResult.data === "object") {
      const data = refreshResult.data as ILoginResponse;

      if (data.access_token && data.token_type) {
        localStorage.setItem(
          LOCAL_STORAGE_ACCESS_TOKEN_TYPE_KEY,
          data.token_type
        );
        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, data.access_token);

        // Повторяем исходный запрос с обновлённым токеном
        result = await rawBaseQuery(args, api, extraOptions);
      }
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getProfile: builder.query<IGetProfileResponseData, void>({
      query: () => {
        return { url: "/profile", method: "GET" };
      },
      providesTags: ["Profile"],
    }),
    login: builder.mutation<
      ILoginResponse,
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled;
        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, data.access_token);
        localStorage.setItem(
          LOCAL_STORAGE_ACCESS_TOKEN_TYPE_KEY,
          data.token_type
        );
      },
      invalidatesTags: ["Profile"],
    }),
    signUp: builder.mutation<
      ILoginResponse,
      { email: string; password: string; password_confirmation: string }
    >({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...body, terms: 1 },
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled;
        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, data.access_token);
        localStorage.setItem(
          LOCAL_STORAGE_ACCESS_TOKEN_TYPE_KEY,
          data.token_type
        );
      },
      invalidatesTags: ["Profile"],
    }),
    logout: builder.mutation<IMessageResponse, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      async onQueryStarted(_, { queryFulfilled }) {
        await queryFulfilled;
        localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
        localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_TYPE_KEY);
      },
      // invalidatesTags: ["Profile"],
    }),
    emailVerify: builder.mutation<IMessageResponse, { token: string }>({
      query: ({ token }) => ({
        url: "/auth/email-verify",
        method: "POST",
        // если нужно пропускать авторизацию — можно добавить meta:
        // meta: { skipAuth: true },
        body: { token },
      }),
    }),

    // GET /auth/email-verify-resend
    emailVerifyResend: builder.mutation<IMessageResponse, void>({
      query: () => ({ url: "/auth/email-verify-resend", method: "GET" }),
    }),
    resetPassword: builder.mutation<
      IMessageResponse,
      { token: string; password: string; password_confirmation: string }
    >({
      query: (body) => ({ url: "/auth/reset-password", method: "POST", body }),
    }),
    forgotPassword: builder.mutation<IMessageResponse, { email: string }>({
      query: (body) => ({ url: "/auth/forgot-password", method: "POST", body }),
    }),
    getMicrosoftLink: builder.mutation<IGetMicrosoftLinkResponseData, void>({
      query: () => ({ url: "/oauth/xbox/get-link", method: "GET" }),
    }),
    microsoftCallback: builder.mutation<
      ILoginResponse | IMessageResponse,
      { code: string; state?: string }
    >({
      query: (body) => {
        return {
          url: "/oauth/xbox/callback",
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };
      },
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled;
        if ("access_token" in data && "token_type" in data) {
          localStorage.setItem(
            LOCAL_STORAGE_ACCESS_TOKEN_KEY,
            data.access_token
          );
          localStorage.setItem(
            LOCAL_STORAGE_ACCESS_TOKEN_TYPE_KEY,
            data.token_type
          );
        }
      },
      invalidatesTags: ["Profile"],
    }),
    microsoftDisconnect: builder.mutation<IMessageResponse, void>({
      query: () => ({ url: "/profile/xbox/disconnect", method: "GET" }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useLoginMutation,
  useSignUpMutation,
  useLogoutMutation,
  useEmailVerifyMutation,
  useEmailVerifyResendMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
  useGetMicrosoftLinkMutation,
  useMicrosoftCallbackMutation,
  useMicrosoftDisconnectMutation,
} = apiSlice;

export default class FetchError extends Error {
  constructor(message: string, public request: Response) {
    super(message);

    this.name = "FetchError";
  }
}

export interface IPostMicrosoftCallbackResponseData {
  access_token: string;
  token_type: string;
  expires_in: number;
}
