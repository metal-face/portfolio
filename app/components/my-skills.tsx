import { ReactElement } from "react";
import ReactCard from "~/components/skills/react";
import Tailwind from "~/components/skills/tailwind";
import NextJs from "~/components/skills/nextjs";
import Postgresql from "~/components/skills/postgresql";
import TypeScript from "~/components/skills/typescript";
import Git from "~/components/skills/git";
import GitHub from "~/components/skills/github";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "~/components/ui/carousel";
import Prisma from "~/components/skills/prisma";
import Vue from "~/components/skills/vue";
import Bash from "~/components/skills/bash";
import Python from "~/components/skills/python";
import Java from "~/components/skills/java";
import Rust from "~/components/skills/rust";

export default function MySkills(): ReactElement {
    return (
        <div className={"h-screen w-screen"}>
            <div className={"h-full w-full flex flex-col items-center justify-center"}>
                <div className={"mb-4"}>
                    <h1 className={"about-me-title text-6xl"}>My Skills</h1>
                </div>
                <Carousel
                    className={
                        "w-3/4 mx-auto shadow-inner rounded-lg dark:bg-neutral-800 bg-gray-100 p-1"
                    }
                    opts={{ align: "center" }}
                >
                    <CarouselContent className={"h-[500px] w-full mx-2"}>
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                            <TypeScript />
                        </CarouselItem>
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                            <ReactCard />
                        </CarouselItem>
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                            <Tailwind />
                        </CarouselItem>
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                            <NextJs />
                        </CarouselItem>
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                            <Vue />
                        </CarouselItem>
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                            <Postgresql />
                        </CarouselItem>
                        <CarouselItem className={"md:basis-1/2 lg:basis-1/3 xl:basis-1/4"}>
                            <Prisma />
                        </CarouselItem>
                        <CarouselItem className={"md:basis-1/2 lg:basis-1/3 xl:basis-1/4"}>
                            <Bash />
                        </CarouselItem>
                        <CarouselItem className={"md:basis-1/2 lg:basis-1/3 xl:basis-1/4"}>
                            <Python />
                        </CarouselItem>
                        <CarouselItem className={"md:basis-1/2 lg:basis-1/3 xl:basis-1/4"}>
                            <Rust />
                        </CarouselItem>
                        <CarouselItem className={"md:basis-1/2 lg:basis-1/3 xl:basis-1/4"}>
                            <Java />
                        </CarouselItem>
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                            <Git />
                        </CarouselItem>
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                            <GitHub />
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselNext className={"dark:bg-neutral-500"} />
                    <CarouselPrevious className={"dark:bg-neutral-500"} />
                </Carousel>
            </div>
        </div>
    );
}
