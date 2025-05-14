// import { getRouterMetaTitle } from 'src/router'
import { IPostMicrosoftCallbackResponseData } from "../store/apiSlice";

export const isString = (value: unknown): value is string =>
  typeof value === "string";

// export const isGetTitleFunction = (
//   value: unknown
// ): value is typeof getRouterMetaTitle => value === getRouterMetaTitle

export const isPostMicrosoftCallbackResponseData = (
  value: unknown
): value is IPostMicrosoftCallbackResponseData =>
  value instanceof Object &&
  Object.prototype.hasOwnProperty.call(value, "access_token");
