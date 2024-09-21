import { ReactElement } from "react";
import { Card, CardContent } from "~/components/ui/card";

export default function Git(): ReactElement {
    return (
        <div className={"h-full w-full flex items-center justify-center"}>
            <Card
                className={
                    "h-[300px] w-[300px] flex items-center justify-center shadow-2xl dark:bg-neutral-600 dark:border-neutral-600"
                }
            >
                <CardContent className={"w-[250px] flex items-center p-0"}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="292"
                        height="92pt"
                        viewBox="0 0 219 92"
                    >
                        <defs>
                            <clipPath id="a">
                                <path d="M159 .79h25V69h-25Zm0 0" />
                            </clipPath>
                            <clipPath id="b">
                                <path d="M183 9h35.371v60H183Zm0 0" />
                            </clipPath>
                            <clipPath id="c">
                                <path d="M0 .79h92V92H0Zm0 0" />
                            </clipPath>
                        </defs>
                        <path
                            style={{
                                stroke: "none",
                                fillRule: "nonzero",
                                fill: "#362701",
                                fillOpacity: 1,
                            }}
                            d="M130.871 31.836c-4.785 0-8.351 2.352-8.351 8.008 0 4.261 2.347 7.222 8.093 7.222 4.871 0 8.18-2.867 8.18-7.398 0-5.133-2.961-7.832-7.922-7.832Zm-9.57 39.95c-1.133 1.39-2.262 2.87-2.262 4.612 0 3.48 4.434 4.524 10.527 4.524 5.051 0 11.926-.352 11.926-5.043 0-2.793-3.308-2.965-7.488-3.227Zm25.761-39.688c1.563 2.004 3.22 4.789 3.22 8.793 0 9.656-7.571 15.316-18.536 15.316-2.789 0-5.312-.348-6.879-.785l-2.87 4.613 8.526.52c15.059.96 23.934 1.398 23.934 12.968 0 10.008-8.789 15.665-23.934 15.665-15.75 0-21.757-4.004-21.757-10.88 0-3.917 1.742-6 4.789-8.878-2.875-1.211-3.828-3.387-3.828-5.739 0-1.914.953-3.656 2.523-5.312 1.566-1.652 3.305-3.305 5.395-5.219-4.262-2.09-7.485-6.617-7.485-13.058 0-10.008 6.613-16.88 19.93-16.88 3.742 0 6.004.344 8.008.872h16.972v7.394l-8.007.61"
                        />
                        <g clip-path="url(#a)">
                            <path
                                style={{
                                    stroke: "none",
                                    fillRule: "nonzero",
                                    fill: "#362701",
                                    fillOpacity: 1,
                                }}
                                d="M170.379 16.281c-4.961 0-7.832-2.87-7.832-7.836 0-4.957 2.871-7.656 7.832-7.656 5.05 0 7.922 2.7 7.922 7.656 0 4.965-2.871 7.836-7.922 7.836Zm-11.227 52.305V61.71l4.438-.606c1.219-.175 1.394-.437 1.394-1.746V33.773c0-.953-.261-1.566-1.132-1.824l-4.7-1.656.957-7.047h18.016V59.36c0 1.399.086 1.57 1.395 1.746l4.437.606v6.875h-24.805"
                            />
                        </g>
                        <g clip-path="url(#b)">
                            <path
                                style={{
                                    stroke: "none",
                                    fillRule: "nonzero",
                                    fill: "#362701",
                                    fillOpacity: 1,
                                }}
                                d="M218.371 65.21c-3.742 1.825-9.223 3.481-14.187 3.481-10.356 0-14.27-4.175-14.27-14.015V31.879c0-.524 0-.871-.7-.871h-6.093v-7.746c7.664-.871 10.707-4.703 11.664-14.188h8.27v12.36c0 .609 0 .87.695.87h12.27v8.704h-12.965v20.797c0 5.136 1.218 7.136 5.918 7.136 2.437 0 4.96-.609 7.047-1.39l2.351 7.66"
                            />
                        </g>
                        <g clip-path="url(#c)">
                            <path
                                style={{
                                    stroke: "none",
                                    fillRule: "nonzero",
                                    fill: "#f03c2e",
                                    fillOpacity: 1,
                                }}
                                d="M89.422 42.371 49.629 2.582a5.868 5.868 0 0 0-8.3 0l-8.263 8.262 10.48 10.484a6.965 6.965 0 0 1 7.173 1.668 6.98 6.98 0 0 1 1.656 7.215l10.102 10.105a6.963 6.963 0 0 1 7.214 1.657 6.976 6.976 0 0 1 0 9.875 6.98 6.98 0 0 1-9.879 0 6.987 6.987 0 0 1-1.519-7.594l-9.422-9.422v24.793a6.979 6.979 0 0 1 1.848 1.32 6.988 6.988 0 0 1 0 9.88c-2.73 2.726-7.153 2.726-9.875 0a6.98 6.98 0 0 1 0-9.88 6.893 6.893 0 0 1 2.285-1.523V34.398a6.893 6.893 0 0 1-2.285-1.523 6.988 6.988 0 0 1-1.508-7.637L29.004 14.902 1.719 42.187a5.868 5.868 0 0 0 0 8.301l39.793 39.793a5.868 5.868 0 0 0 8.3 0l39.61-39.605a5.873 5.873 0 0 0 0-8.305"
                            />
                        </g>
                    </svg>
                </CardContent>
            </Card>
        </div>
    );
}
