import { ReactElement } from "react";
import { Card, CardContent } from "~/components/ui/card";

export default function Java(): ReactElement {
    return (
        <div className={"h-full w-full flex items-center justify-center"}>
            <Card
                className={
                    "h-[300px] w-[300px] flex items-center justify-center shadow-2xl dark:bg-neutral-600 dark:border-neutral-600"
                }
            >
                <CardContent className={"w-[250px] flex items-center justify-center p-0"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="55" height="94">
                        <path
                            d="M18.932 50.22s-2.246 1.367 1.563 1.758c4.6.586 7.032.488 12.11-.488 0 0 1.367.88 3.223 1.563C24.4 57.936 9.946 52.76 18.932 50.22zm-1.465-6.348s-2.442 1.856 1.367 2.246c4.98.488 8.888.586 15.627-.78 0 0 .88.977 2.344 1.465-13.77 4.102-29.202.39-19.338-2.93zm26.956 11.134s1.66 1.367-1.856 2.442c-6.544 1.953-27.444 2.54-33.304 0-2.05-.88 1.856-2.15 3.125-2.344 1.27-.293 1.953-.293 1.953-.293-2.246-1.563-14.943 3.223-6.446 4.6 23.342 3.81 42.583-1.66 36.527-4.395zM20.006 37.23s-10.646 2.54-3.81 3.418c2.93.39 8.692.293 14.064-.098 4.395-.39 8.8-1.172 8.8-1.172s-1.563.684-2.637 1.367C25.573 43.58 4.77 42.31 10.728 39.38c5.08-2.442 9.278-2.15 9.278-2.15zM39.05 47.876c10.94-5.665 5.86-11.134 2.344-10.45-.88.195-1.27.39-1.27.39s.293-.586.977-.78c6.934-2.442 12.404 7.325-2.246 11.134 0 0 .098-.098.195-.293zm-17.97 15.43c10.548.684 26.663-.39 27.054-5.372 0 0-.78 1.953-8.692 3.418-8.985 1.66-20.12 1.465-26.663.39 0 0 1.367 1.172 8.302 1.563z"
                            fill="#4e7896"
                        />
                        <path
                            d="M32.4 5s6.055 6.153-5.762 15.43c-9.474 7.52-2.15 11.818 0 16.7-5.567-4.98-9.57-9.376-6.837-13.478C23.815 17.6 34.85 14.67 32.4 5zm-3.125 28.03c2.832 3.223-.78 6.153-.78 6.153s7.227-3.71 3.907-8.302c-3.028-4.395-5.372-6.544 7.325-13.87 0 0-20.022 4.98-10.45 16.017z"
                            fill="#f58219"
                        />
                        <path
                            d="M24.235 84.215v-9.57c0-2.442-1.367-4.102-4.786-4.102-1.953 0-3.614.488-5.08 1.074l.488 1.758c1.074-.39 2.442-.78 3.907-.78 1.856 0 2.735.78 2.735 2.344v1.27h-.977c-4.688 0-6.837 1.758-6.837 4.6 0 2.344 1.465 3.71 4.102 3.71 1.66 0 2.93-.78 4.102-1.758l.195 1.465h2.15zM21.5 81.09c-.977.88-2.05 1.367-3.028 1.367-1.27 0-2.05-.78-2.05-2.15s.78-2.344 3.907-2.344H21.5v3.125zm11.915 3.125h-3.418l-4.102-13.38h2.93l2.54 8.204.586 2.442c1.27-3.516 2.246-7.13 2.637-10.646h2.93c-.78 4.395-2.15 9.18-4.102 13.38zm15.822 0v-9.57c0-2.442-1.367-4.102-4.786-4.102-1.953 0-3.614.488-5.08 1.074l.39 1.758c1.172-.39 2.54-.78 4.004-.78 1.856 0 2.735.78 2.735 2.344v1.27h-.977c-4.688 0-6.837 1.758-6.837 4.6 0 2.344 1.367 3.71 4.004 3.71 1.758 0 3.028-.78 4.2-1.758l.195 1.465h2.15zm-2.735-3.125c-.977.88-2.05 1.367-3.028 1.367-1.27 0-2.05-.78-2.05-2.15s.78-2.344 3.907-2.344h1.172v3.125zM10.66 86.46c-.78 1.172-1.953 2.05-3.418 2.54l-1.27-1.563c.977-.586 1.953-1.465 2.344-2.246.39-.684.488-1.66.488-3.907V66.05h2.93v15.04c0 3.028-.293 4.2-1.074 5.372z"
                            fill="#4e7896"
                        />
                    </svg>
                </CardContent>
            </Card>
        </div>
    );
}
