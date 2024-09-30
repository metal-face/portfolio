import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Github, Hammer, ScrollText } from "lucide-react";

export default function SocialButtons() {
    return (
        <div className={"mt-5 w-full flex items-center justify-center mx-auto"}>
            <div
                className={
                    "space-y-2 md:space-y-0 md:space-x-2  flex flex-col md:flex-row items-center justify-center"
                }
            >
                <div className={"w-full"}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                target={"_blank"}
                                to={"https://github.com/metal-face"}
                                unstable_viewTransition
                            >
                                <Button
                                    size={"lg"}
                                    className={"dark:bg-white bg-black w-[200px] description"}
                                >
                                    <div className={"w-1/4"}>
                                        <Github className={"dark:text-black mr-4"} />
                                    </div>
                                    <div className={"w-3/4"}>GitHub</div>
                                </Button>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>GitHub</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <div className={"w-full"}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link to={"/BRYAN_HUGHES_RESUME_2024.pdf"} target={"_blank"}>
                                <Button
                                    size={"lg"}
                                    className={"dark:bg-white bg-black w-[200px] description"}
                                >
                                    <div className={"w-1/4"}>
                                        <ScrollText className={"dark:text-black mr-4"} />
                                    </div>
                                    <div className={"w-3/4"}>My Resume</div>
                                </Button>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Download Resume</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <div className={"w-full"}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link to={"https://blog-builder.com"} target={"_blank"}>
                                <Button
                                    size={"lg"}
                                    className={"dark:bg-white bg-black w-[200px] description"}
                                >
                                    <div className={"w-1/4"}>
                                        <Hammer className={"dark:text-black mr-4"} />
                                    </div>
                                    <div className={"w-3/4"}>Blog Builder</div>
                                </Button>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Blog Builder</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}
