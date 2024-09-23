import clsx from "clsx";
import styles from "~/tailwind.css?url";
import { themeSessionResolver } from "~/sessions.server";
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from "remix-themes";
import { Links, Meta, Outlet, Scripts, useLoaderData } from "@remix-run/react";
import { cssBundleHref } from "@remix-run/css-bundle";
import { ModeToggle } from "./components/mode-toggle";
import { TooltipProvider } from "~/components/ui/tooltip";
import { LiveReload } from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import TitleCard from "~/components/title-card";
import AboutMe from "~/components/about-me";
import MySkills from "~/components/my-skills";
import ScheduleMe from "~/components/schedule-me";

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
            <TooltipProvider>
                <App />
            </TooltipProvider>
        </ThemeProvider>
    );
}

export function App() {
    const data = useLoaderData<typeof loader>();
    const [theme] = useTheme();

    return (
        <html suppressHydrationWarning className={clsx(theme)}>
            <head>
                <link rel="icon" href="data:image/x-icon;base64,AA" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />
                <title>Bryan Hughes</title>

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
                    rel="stylesheet"
                />

                <Meta />
                <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
                <Links />
            </head>
            <body className="h-screen w-screen">
                <TitleCard />
                <AboutMe />
                <MySkills />
                <ScheduleMe />
                <ModeToggle />
                <Outlet />
                <LiveReload />
                <Scripts />
            </body>
        </html>
    );
}
