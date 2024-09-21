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

export default function MySkills(): ReactElement {
    return (
        <div className={"h-screen w-screen"}>
            <div className={"h-full w-full flex items-center"}>
                <Carousel
                    className={"w-3/4 mx-auto shadow-inner p-8 rounded-lg"}
                    opts={{ align: "start" }}
                >
                    <div className={"flex justify-center items-center "}>
                        <span className={"about-me-title text-7xl"}>My Skills</span>
                    </div>
                    <CarouselContent className={"h-[500px] mx-2 "}>
                        <CarouselItem className="basis-1/3">
                            <TypeScript />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3">
                            <ReactCard />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3">
                            <Tailwind />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3">
                            <NextJs />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3">
                            <Postgresql />
                        </CarouselItem>

                        <CarouselItem className="basis-1/3">
                            <Git />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3">
                            <GitHub />
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselNext />
                    <CarouselPrevious />
                </Carousel>
            </div>
        </div>
    );
}
