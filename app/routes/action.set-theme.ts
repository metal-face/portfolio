import { ActionFunction } from "@remix-run/node";
import { createThemeAction } from "remix-themes";
import { themeSessionResolver } from "~/sessions.server";

export const action: ActionFunction = createThemeAction(themeSessionResolver);
