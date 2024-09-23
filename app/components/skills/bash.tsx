import { ReactElement } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Theme, useTheme } from "remix-themes";
import BashLogoDark from "/bash-dark.svg";
import BashLogoLight from "/bash-light.svg";

export default function Bash(): ReactElement {
    const [theme] = useTheme();
    return (
        <div className={"h-full w-full flex items-center justify-center"}>
            <Card
                className={
                    "h-[300px] w-[300px] flex items-center justify-center shadow-2xl dark:bg-neutral-600 dark:border-neutral-600"
                }
            >
                <CardContent className={"w-[250px] flex items-center justify-center p-0"}>
                    {theme === Theme.LIGHT ? (
                        <img src={BashLogoLight} alt={"Bash Logo"} />
                    ) : (
                        <img src={BashLogoDark} alt={"Bash Logo"} />
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
