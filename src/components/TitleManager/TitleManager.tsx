import { useEffect } from "react";
import { useLocation, useMatches } from "react-router-dom";
import {
  isString,
  isGetTitleFunction,
  getRouterMetaTitle,
} from "../../utils/routerMeta";

type RouteHandle = {
  title?: string | ((location: Location) => string);
  name?: string;
};

export function TitleManager() {
  const location = useLocation();
  const matches = useMatches() as {
    handle: RouteHandle;
    params: Record<string, string>;
  }[];

  useEffect(() => {
    const reversed = [...matches].reverse();

    const last = reversed.find((m) => m.handle?.title || m.handle?.name);
    let title = "Default Title";

    if (last) {
      const t = last.handle.title;
      const routeName = last.handle.name;
      const nameParam = location.pathname.startsWith("/servers/")
        ? location.pathname.split("/")[2]
        : undefined;

      if (isString(t)) {
        title = t;
      } else if (isGetTitleFunction(t)) {
        title = t(location);
      } else {
        title = getRouterMetaTitle(location, routeName, nameParam);
      }
    }

    document.title = `FRESHCRAFT | ${title}`;
  }, [location, matches]);

  return null;
}
