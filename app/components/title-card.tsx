import SocialButtons from "./social-buttons";

export default function TitleCard() {
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div>
                <h1 className="animate-fade my-name text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-2 text-center">
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
