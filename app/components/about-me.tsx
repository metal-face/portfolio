import { ReactElement, useState } from "react";
import { Button } from "~/components/ui/button";
import { Image } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import ResponsiveDialog from "~/components/responsive-dialog";

export default function AboutMe(): ReactElement {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <div className={"h-screen w-screen"}>
            <ResponsiveDialog open={open} setOpen={setOpen}>
                <img src={"/Me.jpeg"} alt={"A picture of me"} />
            </ResponsiveDialog>
            <div className={"w-full h-3/4 flex flex-col items-center justify-center"}>
                <div className={"flex items-center space-x-4"}>
                    <span className={"about-me-title text-4xl sm:text-6xl md:text-7xl "}>
                        About Me
                    </span>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                size={"icon"}
                                onClick={() => setOpen(true)}
                                className={
                                    "h-8 w-8 md:w-12 md:h-12 rounded-full bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400"
                                }
                            >
                                <Image className={"h-4 w-4 text-black dark:text-white"} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent className={"bg-neutral-300 dark:bg-neutral-600"}>
                            <span>My picture 🙂</span>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <div
                    className={
                        "p-7 h-full overflow-y-scroll bg-neutral-100 dark:bg-neutral-800 rounded-2xl shadow-inner sm:w-2/3 space-y-3 m-4"
                    }
                >
                    <p className={"about-me text-md sm:text-lg"}>
                        My name is Bryan Hughes. I was born and raised in Toronto, Canada. I am 32
                        years old and have been working as a Software Developer for 5 years.
                    </p>
                    <p className={"about-me text-md sm:text-lg"}>
                        I am self taught, and constantly continuing my education by building
                        personal projects, contributing to open source, and diving into new
                        technologies. I am very passionate about our industry and the work we do.
                    </p>
                    <p className={"about-me text-md sm:text-lg"}>
                        I specialize in writing both <strong>clients and servers</strong>. My
                        strongest language is <strong>JavaScript</strong> and{" "}
                        <strong>TypeScript</strong>, but I am proficient in using other general
                        purpose programming languages, such as
                        <strong>Java, Rust, Go, and Python</strong>. I have an advanced
                        understanding of both <strong>Object Oriented Programming</strong> and{" "}
                        <strong>Functional programming</strong>. I also have an advanced
                        understanding of{" "}
                        <strong>Async I/O using Single Threaded Event Loops</strong> and{" "}
                        <strong>concurrency using Threads</strong>. While building servers, I often
                        use CLEAN architecture to build out the multiple layers that make up the
                        application. Lastly, I have an advanced understanding of database languages
                        such as <strong>MySQL, Postgresql, SQLite, MongoDB, and GraphQL</strong> .
                    </p>
                    <p className={"about-me text-md sm:text-lg"}>
                        Before becoming a software developer, I was a carpenter doing renovations
                        all over Ontario, Canada. I even ran my own small renovation company. This
                        taught me how to not only work independently under pressure, but also the
                        importance of establishing detailed plans. It also taught me how to
                        effectively communicate with customers. Often times, when working in a
                        skilled, technical trade, it can become easy to lose sight of what's
                        valuable to trades people and what's valuable to customers. I became highly
                        skilled at effectively communicating value to customers, while also keeping
                        them updated on timelines and budget. Having the ability to do so has proven
                        to be highly valuable in Software Development. It's not uncommon that other
                        parts of the company who are reliant on the work we do, require updates on
                        timeline, or changes, but are less interested in the fine grain
                        technicalities that make up our problems, and are more interested in how
                        these things affect their needs, or what's important to their work.
                    </p>
                </div>
            </div>
        </div>
    );
}
