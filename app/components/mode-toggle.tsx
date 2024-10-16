import { Moon, Sun } from "lucide-react";
import { Theme, useTheme } from "remix-themes";
import { Button } from "~/components/ui/button";

export function ModeToggle() {
    const [theme, setTheme] = useTheme();

    function handleThemeChange() {
        theme === "light" ? setTheme(Theme.DARK) : setTheme(Theme.LIGHT);
    }
    return (
        <div className={"h-fit w-fit fixed top-5 right-8 focus-visible:ring-0"}>
            <Button
                variant="link"
                className={
                    "bg-[#e3e3e3] dark:bg-[#383838] focus-visible:ring-0 rounded-full h-14 w-14 border-none"
                }
                onClick={handleThemeChange}
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
        </div>
    );
}
