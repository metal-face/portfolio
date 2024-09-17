import { createThemeSessionResolver, ThemeSessionResolver } from "remix-themes";
import { createCookieSessionStorage, SessionData, SessionStorage } from "@remix-run/node";

const isProduction: boolean = process.env.NODE_ENV === "production";

const sessionStorage: SessionStorage<SessionData, SessionData> = createCookieSessionStorage({
    cookie: {
        name: "theme",
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secrets: ["s3cr3t"],
        ...(isProduction ? { domain: "bryanhughes.net", secure: true } : {}),
    },
});

export const themeSessionResolver: ThemeSessionResolver =
    createThemeSessionResolver(sessionStorage);
