import { Moon, Sun } from "lucide-react";
import { Theme, useTheme } from "remix-themes";
import { Button } from "~/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export function ModeToggle() {
    const [theme, setTheme] = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="link"
                    className={
                        "sticky bottom-[92%] left-[95%] bg-blue-950 dark:bg-purple-700 rounded-full h-14 w-14"
                    }
                >
                    {theme === "light" ? (
                        <Sun
                            color={"yellow"}
                            className="h-8 w-8 transition-all hover:rotate-[360deg] transform-gpu duration-500"
                        />
                    ) : (
                        <Moon
                            size={48}
                            color={"white"}
                            className="h-8 w-8 transition-all hover:rotate-45 duration-500 transform-gpu"
                        />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme(Theme.LIGHT)}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme(Theme.DARK)}>Dark</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
