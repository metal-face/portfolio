import clsx from "clsx";
import styles from "~/tailwind.css?url";
import { themeSessionResolver } from "~/sessions.server";
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from "remix-themes";
import { Links, Meta, Outlet, Scripts, useLoaderData } from "@remix-run/react";
import { cssBundleHref } from "@remix-run/css-bundle";
import { ModeToggle } from "./components/mode-toggle";
import { TooltipProvider } from "~/components/ui/tooltip";
import TitleCard from "~/components/title-card";
import AboutMe from "~/components/about-me";
import MySkills from "~/components/my-skills";
import ScheduleMe from "~/components/schedule-me";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Toaster } from "~/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/remix";
import { Analytics } from "@vercel/analytics/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export async function loader({ request }: LoaderFunctionArgs) {
    const { getTheme } = await themeSessionResolver(request);

    return { theme: getTheme() };
}

const queryClient: QueryClient = new QueryClient();

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
        <QueryClientProvider client={queryClient}>
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
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

                    <title>Bryan Hughes' Portfolio</title>
                    <meta
                        name="description"
                        content="Learn more about me, how to connect and even schedule a meeting."
                    />

                    <meta property="og:url" content="https://bryan-hughes.com" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="Bryan Hughes' Portfolio" />
                    <meta
                        property="og:description"
                        content="Learn more about me, how to connect and even schedule a meeting."
                    />
                    <meta
                        property="og:image"
                        content="https://opengraph.b-cdn.net/production/images/6cf2891f-53e1-4a01-8918-3a0920455be1.png?token=H-oiAqs3yVlqEj-szApePkOe1gxivGeJqcoQdfMN5YQ&height=512&width=512&expires=33265086947"
                    />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta property="twitter:domain" content="bryan-hughes.com" />
                    <meta property="twitter:url" content="https://bryan-hughes.com" />
                    <meta name="twitter:title" content="Bryan Hughes' Portfolio" />
                    <meta
                        name="twitter:description"
                        content="Learn more about me, how to connect and even schedule a meeting."
                    />
                    <meta
                        name="twitter:image"
                        content="https://opengraph.b-cdn.net/production/images/6cf2891f-53e1-4a01-8918-3a0920455be1.png?token=H-oiAqs3yVlqEj-szApePkOe1gxivGeJqcoQdfMN5YQ&height=512&width=512&expires=33265086947"
                    />

                    <Meta />
                    <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
                    <Links />
                </head>
                <body>
                    <main className={"overflow-x-hidden"}>
                        <TitleCard />
                        <AboutMe />
                        <MySkills />
                        <ScheduleMe />
                    </main>
                    <Toaster />
                    <ModeToggle />
                    <Outlet />
                    <Scripts />
                    <SpeedInsights />
                    <Analytics />
                    <ReactQueryDevtools initialIsOpen={false} />
                </body>
            </html>
        </QueryClientProvider>
    );
}
