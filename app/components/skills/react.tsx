import { Card, CardContent } from "~/components/ui/card";

export default function ReactCard() {
    return (
        <div className={"h-full w-full flex items-center justify-center"}>
            <Card
                className={
                    "h-[200px] w-[200px] flex items-center justify-center shadow-2xl mb-4 sm:my-0 dark:bg-neutral-600 dark:border-neutral-600"
                }
            >
                <CardContent className={"w-[150px] flex items-center p-0"}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348">
                        <title>React Logo</title>
                        <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
                        <g stroke="#61dafb" strokeWidth="1" fill="none">
                            <ellipse rx="11" ry="4.2" />
                            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                        </g>
                    </svg>
                </CardContent>
            </Card>
        </div>
    );
}
