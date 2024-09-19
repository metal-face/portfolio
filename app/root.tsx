import clsx from "clsx";
import styles from "~/tailwind.css?url";
import { themeSessionResolver } from "~/sessions.server";
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from "remix-themes";
import { Links, Meta, Outlet, Scripts, useLoaderData } from "@remix-run/react";
import { cssBundleHref } from "@remix-run/css-bundle";
import { ModeToggle } from "../components/mode-toggle";
import { Button } from "~/components/ui/button";
import { Github } from "lucide-react";
import { Link } from "@remix-run/react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
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
                <div className="h-full w-full flex items-center justify-center">
                    <div>
                        <h1 className="animate-fade my-name text-5xl sm:text-6xl md:text-8xl lg:text-9xl mb-2">
                            Bryan Hughes
                        </h1>
                        <h2 className="description text-center text-md sm:text-lg md:text-xl lg:text-2xl ">
                            Full Stack Software Developer
                        </h2>
                        <div className={""}>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Link
                                        target={"_blank"}
                                        to={"https://github.com/metal-face"}
                                        unstable_viewTransition
                                    >
                                        <Button>
                                            <Github />
                                        </Button>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>GitHub</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                <div className="absolute top-5 right-10">
                    <ModeToggle />
                </div>
                <Outlet />
                <Scripts />
            </body>
        </html>
    );
}
