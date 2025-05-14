import { Location } from "react-router-dom";

export function isString(v: unknown): v is string {
  return typeof v === "string";
}
export function isGetTitleFunction(
  v: unknown
): v is (route: { pathname: string; search: string }) => string {
  return typeof v === "function";
}
export function capitalizeFirstLetter(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const getMicrosoftCallbackMetaTitle = (loc: Location) =>
  loc.search.includes("state")
    ? "Привязка Microsoft"
    : "Авторизация по Microsoft";

export const getRouterMetaTitle = (
  loc: Location,
  routeName: string | undefined,
  nameParam?: string
): string => {
  if (routeName === "microsoft-callback") {
    return getMicrosoftCallbackMetaTitle(loc);
  }

  if (routeName === "server-item") {
    return nameParam
      ? capitalizeFirstLetter(nameParam.replace(/-/g, " "))
      : "Сервер";
  }

  if (routeName === "server-rules") {
    const seasonParam = loc.pathname.split("/")[2];

    return seasonParam
      ? `${capitalizeFirstLetter(seasonParam.replace(/-/g, " "))} | Правила`
      : "Правила";
  }

  if (routeName === "dlc-item") {
    return nameParam ? capitalizeFirstLetter(nameParam) : "DLC";
  }

  if (!routeName) {
    return "";
  }
  return capitalizeFirstLetter(routeName.replace(/-/g, " "));
};
