import clsx from "clsx";
import styles from "./tailwind.css?url";
import { themeSessionResolver } from "./sessions.server";
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from "remix-themes";
import { Links, Meta, Outlet, Scripts, useLoaderData } from "@remix-run/react";
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
    const { getTheme } = await themeSessionResolver(request);

    return { theme: getTheme() };
}

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styles },
    ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function AppWithProviders() {
    const data = useLoaderData<typeof loader>();

    return (
        <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
            <App />
        </ThemeProvider>
    );
}

export function App() {
    const data = useLoaderData<typeof loader>();
    const [theme] = useTheme();

    return (
        <html>
            <head>
                <link rel="icon" href="data:image/x-icon;base64,AA" />
                <Meta />
                <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
                <Links />
            </head>
            <body>
                <h1>Hello world!</h1>
                <Outlet />
                <Scripts />
            </body>
        </html>
    );
}
