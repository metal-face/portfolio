import { Moon, Sun } from "lucide-react";
import { Theme, useTheme } from "remix-themes";
import { Button } from "~/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
    DropdownMenuSeparator,
} from "~/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";

export function ModeToggle() {
    const [theme, setTheme] = useTheme();
    return (
        <div
            className={
                "h-fit w-fit sticky bottom-[92%] left-[85%] sm:left-[90%] md:left-[92%] lg:left-[94%] focus-visible:ring-0"
            }
        >
            <DropdownMenu>
                <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                        <DropdownMenuTrigger>
                            <Button
                                variant="link"
                                className={
                                    "bg-[#e3e3e3] dark:bg-[#383838] focus-visible:ring-0 rounded-full h-14 w-14 border-none"
                                }
                            >
                                {theme === "light" ? (
                                    <Sun className="h-8 w-8 transition-all hover:rotate-[360deg] transform-gpu duration-500" />
                                ) : (
                                    <Moon
                                        size={48}
                                        color={"white"}
                                        className="h-8 w-8 transition-all hover:rotate-45 duration-500 transform-gpu"
                                    />
                                )}
                            </Button>
                            <TooltipContent className={"bg-neutral-600"}>
                                <p className={"dark:text-neutral-300"}>Theme Toggle</p>
                            </TooltipContent>
                        </DropdownMenuTrigger>
                    </TooltipTrigger>
                </Tooltip>
                <DropdownMenuContent align="end" className={"dark:bg-neutral-700"}>
                    <DropdownMenuLabel>Theme Toggle</DropdownMenuLabel>
                    <DropdownMenuSeparator className={"dark:bg-neutral-800"} />
                    <DropdownMenuCheckboxItem
                        className={"dark:data-[highlighted]:bg-neutral-500"}
                        checked={theme === Theme.LIGHT}
                        onCheckedChange={() => setTheme(Theme.LIGHT)}
                    >
                        Light
                        <div className={"ml-auto"}>
                            <Sun className={"h-4 w-4"} />
                        </div>
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        className={"dark:data-[highlighted]:bg-neutral-500"}
                        checked={theme === Theme.DARK}
                        onCheckedChange={() => setTheme(Theme.DARK)}
                    >
                        Dark
                        <div className={"ml-auto"}>
                            <Moon className={"h-4 w-4"} />
                        </div>
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
