import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { File, Github, Pen } from "lucide-react";

export default function SocialButtons() {
    return (
        <div className={"flex justify-center space-x-2 mt-2"}>
            <Tooltip>
                <TooltipTrigger>
                    <Link
                        target={"_blank"}
                        to={"https://github.com/metal-face"}
                        unstable_viewTransition
                    >
                        <Button className={"dark:bg-white bg-black"}>
                            <Github className={"dark:text-black"} />
                        </Button>
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                    <p>GitHub</p>
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger>
                    <Link to={"/BRYAN_HUGHES_RESUME_2024.pdf"} target={"_blank"}>
                        <Button className={"dark:bg-white bg-black"}>
                            <File className={"dark:text-black"} />
                        </Button>
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Download Resume</p>
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger>
                    <Link to={"https://blog-builder.com"} target={"_blank"}>
                        <Button className={"dark:bg-white bg-black"}>
                            <Pen className={"dark:text-black"} />
                        </Button>
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Blog Builder</p>
                </TooltipContent>
            </Tooltip>
        </div>
    );
}
