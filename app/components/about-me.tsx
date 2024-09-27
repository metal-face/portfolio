import { ReactElement } from "react";

export default function AboutMe(): ReactElement {
    return (
        <div
            className={
                "h-screen w-screen grid grid-cols-3 gap-5 justify-items-center place-content-center items-center"
            }
        >
            <div className={"col-span-full sm:col-span-2 sm:w-2/3 space-y-3 mx-4"}>
                <span className={"about-me-title text-4xl sm:text-6xl md:text-7xl"}>About Me</span>
                <p className={"about-me text-sm sm:text-lg"}>
                    My name is Bryan Hughes. I was born and raised in Toronto, Canada. I am 32 years
                    old and have been working as a Software Developer for 5 years.
                </p>
                <p className={"about-me text-sm sm:text-lg"}>
                    I am self taught, and constantly continuing my education by building personal
                    projects, contributing to open source, and diving into new technologies. I am
                    very passionate about our industry and the work we do.
                </p>
                <p className={"about-me text-sm sm:text-lg"}>
                    I specialize in writing both <strong>clients and servers</strong>. My strongest
                    language is <strong>JavaScript</strong> and <strong>TypeScript</strong>, but I
                    am proficient in using other general purpose programming languages, such as
                    <strong>Java, Rust, Go, and Python</strong>. I have an advanced understanding of
                    both <strong>Object Oriented Programming</strong> and{" "}
                    <strong>Functional programming</strong>. I also have an advanced understanding
                    of <strong>Async I/O using Single Threaded Event Loops</strong> and{" "}
                    <strong>concurrency using Threads</strong>. While building servers, I often use
                    CLEAN architecture to build out the multiple layers that make up the
                    application. Lastly, I have an advanced understanding of database languages such
                    as <strong>MySQL, Postgresql, SQLite, MongoDB, and GraphQL</strong> .
                </p>
                <p className={"about-me text-sm sm:text-lg"}>
                    Before becoming a software developer, I was a carpenter doing renovations all
                    over Ontario, Canada. I even ran my own small renovation company. This taught me
                    how to not only work independently under pressure, but also the importance of
                    establishing detailed plans. It also taught me how to effectively communicate
                    with customers. Often times, when working in a skilled, technical trade, it can
                    become easy to lose sight of what's valuable to trades people and what's
                    valuable to customers. I became highly skilled at effectively communicating
                    value to customers, while also keeping them updated on timelines and budget.
                    Having the ability to do so has proven to be highly valuable in Software
                    Development. It's not uncommon that other parts of the company who are reliant
                    on the work we do, require updates on timeline, or changes, but are less
                    interested in the fine grain technicalities that make up our problems, and are
                    more interested in how these things affect their needs, or what's important to
                    their work.
                </p>
            </div>
            <div
                className={"col-span-full sm:col-span-1 h-[100px] w-[200px] mx-4 sm:w-fit sm:h-fit"}
            >
                <img src="/Me.jpeg" alt="A photo of myself" height={"100%"} width={"100%"} />
            </div>
        </div>
    );
}
