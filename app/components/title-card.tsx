import SocialButtons from "./social-buttons";

export default function TitleCard() {
    return (
        <div className="h-full w-full flex items-center justify-center border-b">
            <div>
                <h1 className="animate-fade my-name text-5xl sm:text-6xl md:text-8xl lg:text-9xl mb-2">
                    Bryan Hughes
                </h1>
                <h2 className="description text-center text-md sm:text-lg md:text-xl lg:text-2xl ">
                    Full Stack Software Developer
                </h2>
                <SocialButtons />
            </div>
        </div>
    );
}
