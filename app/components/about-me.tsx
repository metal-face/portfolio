import { ReactElement } from "react";

export default function AboutMe(): ReactElement {
    return (
        <div
            className={
                "h-screen w-screen grid grid-cols-3 gap-5 justify-items-center place-content-center items-center"
            }
        >
            <div className={"col-span-2 w-2/3 space-y-3"}>
                <span className={"about-me-title text-7xl"}>About Me</span>
                <p className={"about-me sm:text-lg"}>
                    My name is Bryan Hughes, although, some know me as{" "}
                    <pre className={"inline"}>metalface</pre>. I was born and raised in Toronto,
                    Canada. I am 32 years old and have been working as a Software Developer for 5
                    years.
                </p>
                <p className={"about-me sm:text-lg"}>
                    I am self taught, and constantly continuing my education by building personal
                    projects, contributing to open source, and diving into new technologies.
                </p>
                <p className={"about-me sm:text-lg"}>
                    Before becoming a software developer, I was a carpenter. I spent many years
                    working as a renovator throughout the Greater Toronto Area. I even ran my own
                    small renovation company. This taught me how to not only work independently
                    under pressure, but it taught me the value of planning, coordinating,
                </p>
            </div>
            <div className={"w-fit h-fit"}>
                <img src="/Me.jpeg" alt="A photo of myself" height={"200"} width={"400"} />
            </div>
        </div>
    );
}
