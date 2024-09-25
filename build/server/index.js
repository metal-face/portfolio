import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, createCookieSessionStorage, json } from "@remix-run/node";
import { RemixServer, Link, useLoaderData, Meta, Links, Outlet, Scripts } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import clsx$1, { clsx } from "clsx";
import { createThemeSessionResolver, useTheme, Theme, ThemeProvider, PreventFlashOnWrongTheme, createThemeAction } from "remix-themes";
import { cssBundleHref } from "@remix-run/css-bundle";
import { Sun, Moon, Github, File, Pen, Clock, Calendar as Calendar$2, ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react";
import * as React from "react";
import { useImperativeHandle, useRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ChevronRightIcon, CheckIcon, DotFilledIcon, ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, CaretSortIcon, ChevronUpIcon, ChevronDownIcon, Cross2Icon } from "@radix-ui/react-icons";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import useEmblaCarousel from "embla-carousel-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormContext, FormProvider, Controller, useForm } from "react-hook-form";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { format, add } from "date-fns";
import { DayPicker } from "react-day-picker";
import { enUS } from "date-fns/locale";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as ToastPrimitives from "@radix-ui/react-toast";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  let prohibitOutOfOrderStreaming = isBotRequest(request.headers.get("user-agent")) || remixContext.isSpaMode;
  return prohibitOutOfOrderStreaming ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function isBotRequest(userAgent) {
  if (!userAgent) {
    return false;
  }
  if ("isbot" in isbotModule && typeof isbotModule.isbot === "function") {
    return isbotModule.isbot(userAgent);
  }
  if ("default" in isbotModule && typeof isbotModule.default === "function") {
    return isbotModule.default(userAgent);
  }
  return false;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const styles = "/assets/tailwind-89IYSD08.css";
const isProduction = process.env.NODE_ENV === "production";
const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "theme",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: ["s3cr3t"],
    ...isProduction ? { domain: "bryanhughes.net", secure: true } : {}
  }
});
const themeSessionResolver = createThemeSessionResolver(sessionStorage);
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRightIcon, { className: "ml-auto h-4 w-4" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(DotFilledIcon, { className: "h-4 w-4 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
function ModeToggle() {
  const [theme, setTheme] = useTheme();
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "h-fit w-fit sticky bottom-[92%] left-[85%] sm:left-[90%] md:left-[92%] lg:left-[94%] focus-visible:ring-0",
      children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
          Button,
          {
            variant: "link",
            className: "bg-[#e3e3e3] dark:bg-[#383838] focus-visible:ring-0 rounded-full h-14 w-14 border-none",
            children: theme === "light" ? /* @__PURE__ */ jsx(Sun, { className: "h-8 w-8 transition-all hover:rotate-[360deg] transform-gpu duration-500" }) : /* @__PURE__ */ jsx(
              Moon,
              {
                size: 48,
                color: "white",
                className: "h-8 w-8 transition-all hover:rotate-45 duration-500 transform-gpu"
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsxs(
          DropdownMenuContent,
          {
            align: "end",
            className: "dark:bg-neutral-700 dark:border-neutral-600",
            children: [
              /* @__PURE__ */ jsx(DropdownMenuLabel, { className: "dark:text-neutral-300", children: "Theme Toggle" }),
              /* @__PURE__ */ jsx(DropdownMenuSeparator, { className: "dark:bg-neutral-500" }),
              /* @__PURE__ */ jsxs(
                DropdownMenuCheckboxItem,
                {
                  className: "dark:data-[highlighted]:bg-neutral-500 dark:text-neutral-300",
                  checked: theme === Theme.LIGHT,
                  onCheckedChange: () => setTheme(Theme.LIGHT),
                  children: [
                    "Light",
                    /* @__PURE__ */ jsx("div", { className: "ml-auto", children: /* @__PURE__ */ jsx(Sun, { className: "h-4 w-4" }) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                DropdownMenuCheckboxItem,
                {
                  className: "dark:data-[highlighted]:bg-neutral-500 dark:text-neutral-300",
                  checked: theme === Theme.DARK,
                  onCheckedChange: () => setTheme(Theme.DARK),
                  children: [
                    "Dark",
                    /* @__PURE__ */ jsx("div", { className: "ml-auto", children: /* @__PURE__ */ jsx(Moon, { className: "h-4 w-4" }) })
                  ]
                }
              )
            ]
          }
        )
      ] })
    }
  );
}
const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
function SocialButtons() {
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-center space-x-2 mt-2", children: [
    /* @__PURE__ */ jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
        Link,
        {
          target: "_blank",
          to: "https://github.com/metal-face",
          unstable_viewTransition: true,
          children: /* @__PURE__ */ jsx(Button, { size: "lg", className: "dark:bg-white bg-black", children: /* @__PURE__ */ jsx(Github, { className: "dark:text-black" }) })
        }
      ) }),
      /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: "GitHub" }) })
    ] }),
    /* @__PURE__ */ jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/BRYAN_HUGHES_RESUME_2024.pdf", target: "_blank", children: /* @__PURE__ */ jsx(Button, { size: "lg", className: "dark:bg-white bg-black", children: /* @__PURE__ */ jsx(File, { className: "dark:text-black" }) }) }) }),
      /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: "Download Resume" }) })
    ] }),
    /* @__PURE__ */ jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "https://blog-builder.com", target: "_blank", children: /* @__PURE__ */ jsx(Button, { size: "lg", className: "dark:bg-white bg-black", children: /* @__PURE__ */ jsx(Pen, { className: "dark:text-black" }) }) }) }),
      /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: "Blog Builder" }) })
    ] })
  ] });
}
function TitleCard() {
  return /* @__PURE__ */ jsx("div", { className: "h-full w-full flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { className: "animate-fade my-name text-5xl sm:text-6xl md:text-8xl lg:text-9xl mb-2", children: "Bryan Hughes" }),
    /* @__PURE__ */ jsx("h2", { className: "description text-center text-md sm:text-lg md:text-xl lg:text-2xl ", children: "Full Stack Software Developer" }),
    /* @__PURE__ */ jsx(SocialButtons, {})
  ] }) });
}
function AboutMe() {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "h-screen w-screen grid grid-cols-3 gap-5 justify-items-center place-content-center items-center",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "col-span-full sm:col-span-2 sm:w-2/3 space-y-3 mx-4", children: [
          /* @__PURE__ */ jsx("span", { className: "about-me-title text-4xl sm:text-6xl md:text-7xl", children: "About Me" }),
          /* @__PURE__ */ jsx("p", { className: "about-me text-md sm:text-lg", children: "My name is Bryan Hughes. I was born and raised in Toronto, Canada. I am 32 years old and have been working as a Software Developer for 5 years." }),
          /* @__PURE__ */ jsx("p", { className: "about-me text-md sm:text-lg", children: "I am self taught, and constantly continuing my education by building personal projects, contributing to open source, and diving into new technologies." }),
          /* @__PURE__ */ jsx("p", { className: "about-me text-md sm:text-lg", children: "Before becoming a software developer, I was a carpenter. I spent many years working as a renovator throughout the Greater Toronto Area. I even ran my own small renovation company. This taught me how to not only work independently under pressure, but it taught me the value of planning, coordinating," })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "col-span-full sm:col-span-1 h-[100px] w-[200px] mx-4 sm:w-fit sm:h-fit",
            children: /* @__PURE__ */ jsx("img", { src: "/Me.jpeg", alt: "A photo of myself", height: "100%", width: "100%" })
          }
        )
      ]
    }
  );
}
const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
const CardHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h3",
  {
    ref,
    className: cn("font-semibold leading-none tracking-tight", className),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "p",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";
function ReactCard() {
  return /* @__PURE__ */ jsx("div", { className: "h-full w-full flex items-center justify-center", children: /* @__PURE__ */ jsx(
    Card,
    {
      className: "h-[200px] w-[200px] flex items-center justify-center shadow-2xl mb-4 sm:my-0 dark:bg-neutral-600 dark:border-neutral-600",
      children: /* @__PURE__ */ jsx(CardContent, { className: "w-[150px] flex items-center p-0", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "-11.5 -10.23174 23 20.46348", children: [
        /* @__PURE__ */ jsx("title", { children: "React Logo" }),
        /* @__PURE__ */ jsx("circle", { cx: "0", cy: "0", r: "2.05", fill: "#61dafb" }),
        /* @__PURE__ */ jsxs("g", { stroke: "#61dafb", strokeWidth: "1", fill: "none", children: [
          /* @__PURE__ */ jsx("ellipse", { rx: "11", ry: "4.2" }),
          /* @__PURE__ */ jsx("ellipse", { rx: "11", ry: "4.2", transform: "rotate(60)" }),
          /* @__PURE__ */ jsx("ellipse", { rx: "11", ry: "4.2", transform: "rotate(120)" })
        ] })
      ] }) })
    }
  ) });
}
function Tailwind() {
  return /* @__PURE__ */ jsx("div", { className: "h-full w-full flex items-center justify-center", children: /* @__PURE__ */ jsx(
    Card,
    {
      className: "h-[200px] w-[200px] flex items-center justify-center shadow-2xl mb-4 sm:my-0 dark:bg-neutral-600 dark:border-neutral-600",
      children: /* @__PURE__ */ jsx(CardContent, { className: "w-[150px] flex items-center p-0", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 54 33", children: [
        /* @__PURE__ */ jsx("g", { clipPath: "url(#prefix__clip0)", children: /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#38bdf8",
            fillRule: "evenodd",
            d: "M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z",
            clipRule: "evenodd"
          }
        ) }),
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("clipPath", { id: "prefix__clip0", children: /* @__PURE__ */ jsx("path", { fill: "#fff", d: "M0 0h54v32.4H0z" }) }) })
      ] }) })
    }
  ) });
}
function NextJs() {
  const [theme] = useTheme();
  return /* @__PURE__ */ jsx("div", { className: "h-full w-full flex items-center justify-center", children: /* @__PURE__ */ jsx(
    Card,
    {
      className: "h-[200px] w-[200px] flex items-center justify-center shadow-2xl dark:bg-neutral-600 dark:border-neutral-600",
      children: /* @__PURE__ */ jsx(CardContent, { className: "w-[150px] flex items-center p-0", children: /* @__PURE__ */ jsxs(
        "svg",
        {
          width: "394",
          height: "80",
          viewBox: "0 0 394 80",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M261.919 0.0330722H330.547V12.7H303.323V79.339H289.71V12.7H261.919V0.0330722Z",
                fill: theme === Theme.LIGHT ? "black" : "white"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M149.052 0.0330722V12.7H94.0421V33.0772H138.281V45.7441H94.0421V66.6721H149.052V79.339H80.43V12.7H80.4243V0.0330722H149.052Z",
                fill: theme === Theme.LIGHT ? "black" : "white"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M183.32 0.0661486H165.506L229.312 79.3721H247.178L215.271 39.7464L247.127 0.126654L229.312 0.154184L206.352 28.6697L183.32 0.0661486Z",
                fill: theme === Theme.LIGHT ? "black" : "white"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M201.6 56.7148L192.679 45.6229L165.455 79.4326H183.32L201.6 56.7148Z",
                fill: theme === Theme.LIGHT ? "black" : "white"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M80.907 79.339L17.0151 0H0V79.3059H13.6121V16.9516L63.8067 79.339H80.907Z",
                fill: theme === Theme.LIGHT ? "black" : "white"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M333.607 78.8546C332.61 78.8546 331.762 78.5093 331.052 77.8186C330.342 77.1279 329.991 76.2917 330 75.3011C329.991 74.3377 330.342 73.5106 331.052 72.8199C331.762 72.1292 332.61 71.7838 333.607 71.7838C334.566 71.7838 335.405 72.1292 336.115 72.8199C336.835 73.5106 337.194 74.3377 337.204 75.3011C337.194 75.9554 337.028 76.5552 336.696 77.0914C336.355 77.6368 335.922 78.064 335.377 78.373C334.842 78.6911 334.252 78.8546 333.607 78.8546Z",
                fill: theme === Theme.LIGHT ? "black" : "white"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M356.84 45.4453H362.872V68.6846C362.863 70.8204 362.401 72.6472 361.498 74.1832C360.585 75.7191 359.321 76.8914 357.698 77.7185C356.084 78.5364 354.193 78.9546 352.044 78.9546C350.079 78.9546 348.318 78.6001 346.75 77.9094C345.182 77.2187 343.937 76.1826 343.024 74.8193C342.101 73.456 341.649 71.7565 341.649 69.7207H347.691C347.7 70.6114 347.903 71.3838 348.29 72.0291C348.677 72.6744 349.212 73.1651 349.895 73.5105C350.586 73.8559 351.38 74.0286 352.274 74.0286C353.243 74.0286 354.073 73.8286 354.746 73.4196C355.419 73.0197 355.936 72.4199 356.296 71.6201C356.646 70.8295 356.831 69.8479 356.84 68.6846V45.4453Z",
                fill: theme === Theme.LIGHT ? "black" : "white"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M387.691 54.5338C387.544 53.1251 386.898 52.0254 385.773 51.2438C384.638 50.4531 383.172 50.0623 381.373 50.0623C380.11 50.0623 379.022 50.2532 378.118 50.6258C377.214 51.0075 376.513 51.5164 376.033 52.1617C375.554 52.807 375.314 53.5432 375.295 54.3703C375.295 55.061 375.461 55.6608 375.784 56.1607C376.107 56.6696 376.54 57.0968 377.103 57.4422C377.656 57.7966 378.274 58.0874 378.948 58.3237C379.63 58.56 380.313 58.76 380.995 58.9236L384.14 59.6961C385.404 59.9869 386.631 60.3778 387.802 60.8776C388.973 61.3684 390.034 61.9955 390.965 62.7498C391.897 63.5042 392.635 64.413 393.179 65.4764C393.723 66.5397 394 67.7848 394 69.2208C394 71.1566 393.502 72.8562 392.496 74.3285C391.491 75.7917 390.043 76.9369 388.143 77.764C386.252 78.582 383.965 79 381.272 79C378.671 79 376.402 78.6002 374.493 77.8004C372.575 77.0097 371.08 75.8463 370.001 74.3194C368.922 72.7926 368.341 70.9294 368.258 68.7391H374.235C374.318 69.8842 374.687 70.8386 375.314 71.6111C375.95 72.3745 376.78 72.938 377.795 73.3197C378.819 73.6923 379.962 73.8832 381.226 73.8832C382.545 73.8832 383.707 73.6832 384.712 73.2924C385.708 72.9016 386.492 72.3564 387.055 71.6475C387.627 70.9476 387.913 70.1206 387.922 69.1754C387.913 68.312 387.654 67.5939 387.156 67.0304C386.649 66.467 385.948 65.9944 385.053 65.6127C384.15 65.231 383.098 64.8856 381.899 64.5857L378.081 63.6223C375.323 62.9225 373.137 61.8592 371.541 60.4323C369.937 59.0054 369.143 57.115 369.143 54.7429C369.143 52.798 369.678 51.0894 370.758 49.6261C371.827 48.1629 373.294 47.0268 375.148 46.2179C377.011 45.4 379.114 45 381.456 45C383.836 45 385.92 45.4 387.719 46.2179C389.517 47.0268 390.929 48.1538 391.952 49.5897C392.976 51.0257 393.511 52.6707 393.539 54.5338H387.691Z",
                fill: theme === Theme.LIGHT ? "black" : "white"
              }
            )
          ]
        }
      ) })
    }
  ) });
}
function Postgresql() {
  return /* @__PURE__ */ jsx("div", { className: "h-full w-full flex justify-center items-center", children: /* @__PURE__ */ jsx(
    Card,
    {
      className: "h-[200px] w-[200px] flex items-center justify-center shadow-2xl dark:bg-neutral-600 dark:border-neutral-600",
      children: /* @__PURE__ */ jsx(CardContent, { className: "w-[150px] flex items-center p-0", children: /* @__PURE__ */ jsxs(
        "svg",
        {
          width: "432.071pt",
          height: "445.383pt",
          viewBox: "0 0 432.071 445.383",
          xmlSpace: "preserve",
          xmlns: "http://www.w3.org/2000/svg",
          children: [
            /* @__PURE__ */ jsx(
              "g",
              {
                id: "orginal",
                style: {
                  fillRule: "nonzero",
                  clipRule: "nonzero",
                  stroke: "#000000",
                  strokeMiterlimit: 4
                }
              }
            ),
            /* @__PURE__ */ jsxs(
              "g",
              {
                id: "Layer_x0020_3",
                style: {
                  fillRule: "nonzero",
                  clipRule: "nonzero",
                  fill: "none",
                  stroke: "#FFFFFF",
                  strokeWidth: 12.4651,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeMiterlimit: 4
                },
                children: [
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      style: {
                        fill: "#000000",
                        stroke: "#000000",
                        strokeWidth: 37.3953,
                        strokeLinecap: "butt",
                        strokeLinejoin: "miter"
                      },
                      d: "M323.205,324.227c2.833-23.601,1.984-27.062,19.563-23.239l4.463,0.392c13.517,0.615,31.199-2.174,41.587-7c22.362-10.376,35.622-27.7,13.572-23.148c-50.297,10.376-53.755-6.655-53.755-6.655c53.111-78.803,75.313-178.836,56.149-203.322    C352.514-5.534,262.036,26.049,260.522,26.869l-0.482,0.089c-9.938-2.062-21.06-3.294-33.554-3.496c-22.761-0.374-40.032,5.967-53.133,15.904c0,0-161.408-66.498-153.899,83.628c1.597,31.936,45.777,241.655,98.47,178.31    c19.259-23.163,37.871-42.748,37.871-42.748c9.242,6.14,20.307,9.272,31.912,8.147l0.897-0.765c-0.281,2.876-0.157,5.689,0.359,9.019c-13.572,15.167-9.584,17.83-36.723,23.416c-27.457,5.659-11.326,15.734-0.797,18.367c12.768,3.193,42.305,7.716,62.268-20.224    l-0.795,3.188c5.325,4.26,4.965,30.619,5.72,49.452c0.756,18.834,2.017,36.409,5.856,46.771c3.839,10.36,8.369,37.05,44.036,29.406c29.809-6.388,52.6-15.582,54.677-101.107"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      style: { fill: "#336791", stroke: "none" },
                      d: "M402.395,271.23c-50.302,10.376-53.76-6.655-53.76-6.655c53.111-78.808,75.313-178.843,56.153-203.326c-52.27-66.785-142.752-35.2-144.262-34.38l-0.486,0.087c-9.938-2.063-21.06-3.292-33.56-3.496c-22.761-0.373-40.026,5.967-53.127,15.902    c0,0-161.411-66.495-153.904,83.63c1.597,31.938,45.776,241.657,98.471,178.312c19.26-23.163,37.869-42.748,37.869-42.748c9.243,6.14,20.308,9.272,31.908,8.147l0.901-0.765c-0.28,2.876-0.152,5.689,0.361,9.019c-13.575,15.167-9.586,17.83-36.723,23.416    c-27.459,5.659-11.328,15.734-0.796,18.367c12.768,3.193,42.307,7.716,62.266-20.224l-0.796,3.188c5.319,4.26,9.054,27.711,8.428,48.969c-0.626,21.259-1.044,35.854,3.147,47.254c4.191,11.4,8.368,37.05,44.042,29.406c29.809-6.388,45.256-22.942,47.405-50.555    c1.525-19.631,4.976-16.729,5.194-34.28l2.768-8.309c3.192-26.611,0.507-35.196,18.872-31.203l4.463,0.392c13.517,0.615,31.208-2.174,41.591-7c22.358-10.376,35.618-27.7,13.573-23.148z"
                    }
                  ),
                  /* @__PURE__ */ jsx("path", { d: "M215.866,286.484c-1.385,49.516,0.348,99.377,5.193,111.495c4.848,12.118,15.223,35.688,50.9,28.045c29.806-6.39,40.651-18.756,45.357-46.051c3.466-20.082,10.148-75.854,11.005-87.281" }),
                  /* @__PURE__ */ jsx("path", { d: "M173.104,38.256c0,0-161.521-66.016-154.012,84.109c1.597,31.938,45.779,241.664,98.473,178.316c19.256-23.166,36.671-41.335,36.671-41.335" }),
                  /* @__PURE__ */ jsx("path", { d: "M260.349,26.207c-5.591,1.753,89.848-34.889,144.087,34.417c19.159,24.484-3.043,124.519-56.153,203.329" }),
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      style: { strokeLinejoin: "bevel" },
                      d: "M348.282,263.953c0,0,3.461,17.036,53.764,6.653c22.04-4.552,8.776,12.774-13.577,23.155c-18.345,8.514-59.474,10.696-60.146-1.069c-1.729-30.355,21.647-21.133,19.96-28.739c-1.525-6.85-11.979-13.573-18.894-30.338    c-6.037-14.633-82.796-126.849,21.287-110.183c3.813-0.789-27.146-99.002-124.553-100.599c-97.385-1.597-94.19,119.762-94.19,119.762"
                    }
                  ),
                  /* @__PURE__ */ jsx("path", { d: "M188.604,274.334c-13.577,15.166-9.584,17.829-36.723,23.417c-27.459,5.66-11.326,15.733-0.797,18.365c12.768,3.195,42.307,7.718,62.266-20.229c6.078-8.509-0.036-22.086-8.385-25.547c-4.034-1.671-9.428-3.765-16.361,3.994z" }),
                  /* @__PURE__ */ jsx("path", { d: "M187.715,274.069c-1.368-8.917,2.93-19.528,7.536-31.942c6.922-18.626,22.893-37.255,10.117-96.339c-9.523-44.029-73.396-9.163-73.436-3.193c-0.039,5.968,2.889,30.26-1.067,58.548c-5.162,36.913,23.488,68.132,56.479,64.938" }),
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      style: {
                        fill: "#FFFFFF",
                        strokeWidth: 4.155,
                        strokeLinecap: "butt",
                        strokeLinejoin: "miter"
                      },
                      d: "M172.517,141.7c-0.288,2.039,3.733,7.48,8.976,8.207c5.234,0.73,9.714-3.522,9.998-5.559c0.284-2.039-3.732-4.285-8.977-5.015c-5.237-0.731-9.719,0.333-9.996,2.367z"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      style: {
                        fill: "#FFFFFF",
                        strokeWidth: 2.0775,
                        strokeLinecap: "butt",
                        strokeLinejoin: "miter"
                      },
                      d: "M331.941,137.543c0.284,2.039-3.732,7.48-8.976,8.207c-5.238,0.73-9.718-3.522-10.005-5.559c-0.277-2.039,3.74-4.285,8.979-5.015c5.239-0.73,9.718,0.333,10.002,2.368z"
                    }
                  ),
                  /* @__PURE__ */ jsx("path", { d: "M350.676,123.432c0.863,15.994-3.445,26.888-3.988,43.914c-0.804,24.748,11.799,53.074-7.191,81.435" }),
                  /* @__PURE__ */ jsx("path", { style: { strokeWidth: 3 }, d: "M0,60.232" })
                ]
              }
            )
          ]
        }
      ) })
    }
  ) });
}
function TypeScript() {
  return /* @__PURE__ */ jsx("div", { className: "h-full w-full flex items-center justify-center", children: /* @__PURE__ */ jsx(
    Card,
    {
      className: "h-[200px] w-[200px] flex items-center justify-center shadow-2xl dark:bg-neutral-600 dark:border-neutral-600",
      children: /* @__PURE__ */ jsx(CardContent, { className: "w-[150px] flex items-center p-0", children: /* @__PURE__ */ jsxs(
        "svg",
        {
          fill: "none",
          height: "512",
          viewBox: "0 0 512 512",
          width: "512",
          xmlns: "http://www.w3.org/2000/svg",
          children: [
            /* @__PURE__ */ jsx("rect", { fill: "#3178c6", height: "512", rx: "50", width: "512" }),
            /* @__PURE__ */ jsx("rect", { fill: "#3178c6", height: "512", rx: "50", width: "512" }),
            /* @__PURE__ */ jsx(
              "path",
              {
                clipRule: "evenodd",
                d: "m316.939 407.424v50.061c8.138 4.172 17.763 7.3 28.875 9.386s22.823 3.129 35.135 3.129c11.999 0 23.397-1.147 34.196-3.442 10.799-2.294 20.268-6.075 28.406-11.342 8.138-5.266 14.581-12.15 19.328-20.65s7.121-19.007 7.121-31.522c0-9.074-1.356-17.026-4.069-23.857s-6.625-12.906-11.738-18.225c-5.112-5.319-11.242-10.091-18.389-14.315s-15.207-8.213-24.18-11.967c-6.573-2.712-12.468-5.345-17.685-7.9-5.217-2.556-9.651-5.163-13.303-7.822-3.652-2.66-6.469-5.476-8.451-8.448-1.982-2.973-2.974-6.336-2.974-10.091 0-3.441.887-6.544 2.661-9.308s4.278-5.136 7.512-7.118c3.235-1.981 7.199-3.52 11.894-4.615 4.696-1.095 9.912-1.642 15.651-1.642 4.173 0 8.581.313 13.224.938 4.643.626 9.312 1.591 14.008 2.894 4.695 1.304 9.259 2.947 13.694 4.928 4.434 1.982 8.529 4.276 12.285 6.884v-46.776c-7.616-2.92-15.937-5.084-24.962-6.492s-19.381-2.112-31.066-2.112c-11.895 0-23.163 1.278-33.805 3.833s-20.006 6.544-28.093 11.967c-8.086 5.424-14.476 12.333-19.171 20.729-4.695 8.395-7.043 18.433-7.043 30.114 0 14.914 4.304 27.638 12.912 38.172 8.607 10.533 21.675 19.45 39.204 26.751 6.886 2.816 13.303 5.579 19.25 8.291s11.086 5.528 15.415 8.448c4.33 2.92 7.747 6.101 10.252 9.543 2.504 3.441 3.756 7.352 3.756 11.733 0 3.233-.783 6.231-2.348 8.995s-3.939 5.162-7.121 7.196-7.147 3.624-11.894 4.771c-4.748 1.148-10.303 1.721-16.668 1.721-10.851 0-21.597-1.903-32.24-5.71-10.642-3.806-20.502-9.516-29.579-17.13zm-84.159-123.342h64.22v-41.082h-179v41.082h63.906v182.918h50.874z",
                fill: "#fff",
                fillRule: "evenodd"
              }
            )
          ]
        }
      ) })
    }
  ) });
}
function Git() {
  const [theme] = useTheme();
  return /* @__PURE__ */ jsx("div", { className: "h-full w-full flex items-center justify-center", children: theme === Theme.LIGHT ? /* @__PURE__ */ jsx(
    Card,
    {
      className: "h-[200px] w-[200px] flex items-center justify-center shadow-2xl dark:bg-neutral-600 dark:border-neutral-600",
      children: /* @__PURE__ */ jsx(CardContent, { className: "w-[150px] flex items-center p-0", children: /* @__PURE__ */ jsxs(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          width: "292",
          height: "92pt",
          viewBox: "0 0 219 92",
          children: [
            /* @__PURE__ */ jsxs("defs", { children: [
              /* @__PURE__ */ jsx("clipPath", { id: "a", children: /* @__PURE__ */ jsx("path", { d: "M159 .79h25V69h-25Zm0 0" }) }),
              /* @__PURE__ */ jsx("clipPath", { id: "b", children: /* @__PURE__ */ jsx("path", { d: "M183 9h35.371v60H183Zm0 0" }) }),
              /* @__PURE__ */ jsx("clipPath", { id: "c", children: /* @__PURE__ */ jsx("path", { d: "M0 .79h92V92H0Zm0 0" }) })
            ] }),
            /* @__PURE__ */ jsx(
              "path",
              {
                style: {
                  stroke: "none",
                  fillRule: "nonzero",
                  fill: "#100f0d",
                  fillOpacity: 1
                },
                d: "M130.871 31.836c-4.785 0-8.351 2.352-8.351 8.008 0 4.261 2.347 7.222 8.093 7.222 4.871 0 8.18-2.867 8.18-7.398 0-5.133-2.961-7.832-7.922-7.832Zm-9.57 39.95c-1.133 1.39-2.262 2.87-2.262 4.612 0 3.48 4.434 4.524 10.527 4.524 5.051 0 11.926-.352 11.926-5.043 0-2.793-3.308-2.965-7.488-3.227Zm25.761-39.688c1.563 2.004 3.22 4.789 3.22 8.793 0 9.656-7.571 15.316-18.536 15.316-2.789 0-5.312-.348-6.879-.785l-2.87 4.613 8.526.52c15.059.96 23.934 1.398 23.934 12.968 0 10.008-8.789 15.665-23.934 15.665-15.75 0-21.757-4.004-21.757-10.88 0-3.917 1.742-6 4.789-8.878-2.875-1.211-3.828-3.387-3.828-5.739 0-1.914.953-3.656 2.523-5.312 1.566-1.652 3.305-3.305 5.395-5.219-4.262-2.09-7.485-6.617-7.485-13.058 0-10.008 6.613-16.88 19.93-16.88 3.742 0 6.004.344 8.008.872h16.972v7.394l-8.007.61"
              }
            ),
            /* @__PURE__ */ jsx("g", { clipPath: "url(#a)", children: /* @__PURE__ */ jsx(
              "path",
              {
                style: {
                  stroke: "none",
                  fillRule: "nonzero",
                  fill: "#100f0d",
                  fillOpacity: 1
                },
                d: "M170.379 16.281c-4.961 0-7.832-2.87-7.832-7.836 0-4.957 2.871-7.656 7.832-7.656 5.05 0 7.922 2.7 7.922 7.656 0 4.965-2.871 7.836-7.922 7.836Zm-11.227 52.305V61.71l4.438-.606c1.219-.175 1.394-.437 1.394-1.746V33.773c0-.953-.261-1.566-1.132-1.824l-4.7-1.656.957-7.047h18.016V59.36c0 1.399.086 1.57 1.395 1.746l4.437.606v6.875h-24.805"
              }
            ) }),
            /* @__PURE__ */ jsx("g", { clipPath: "url(#b)", children: /* @__PURE__ */ jsx(
              "path",
              {
                style: {
                  stroke: "none",
                  fillRule: "nonzero",
                  fill: "#100f0d",
                  fillOpacity: 1
                },
                d: "M218.371 65.21c-3.742 1.825-9.223 3.481-14.187 3.481-10.356 0-14.27-4.175-14.27-14.015V31.879c0-.524 0-.871-.7-.871h-6.093v-7.746c7.664-.871 10.707-4.703 11.664-14.188h8.27v12.36c0 .609 0 .87.695.87h12.27v8.704h-12.965v20.797c0 5.136 1.218 7.136 5.918 7.136 2.437 0 4.96-.609 7.047-1.39l2.351 7.66"
              }
            ) }),
            /* @__PURE__ */ jsx("g", { clipPath: "url(#c)", children: /* @__PURE__ */ jsx(
              "path",
              {
                style: {
                  stroke: "none",
                  fillRule: "nonzero",
                  fill: "#100f0d",
                  fillOpacity: 1
                },
                d: "M89.422 42.371 49.629 2.582a5.868 5.868 0 0 0-8.3 0l-8.263 8.262 10.48 10.484a6.965 6.965 0 0 1 7.173 1.668 6.98 6.98 0 0 1 1.656 7.215l10.102 10.105a6.963 6.963 0 0 1 7.214 1.657 6.976 6.976 0 0 1 0 9.875 6.98 6.98 0 0 1-9.879 0 6.987 6.987 0 0 1-1.519-7.594l-9.422-9.422v24.793a6.979 6.979 0 0 1 1.848 1.32 6.988 6.988 0 0 1 0 9.88c-2.73 2.726-7.153 2.726-9.875 0a6.98 6.98 0 0 1 0-9.88 6.893 6.893 0 0 1 2.285-1.523V34.398a6.893 6.893 0 0 1-2.285-1.523 6.988 6.988 0 0 1-1.508-7.637L29.004 14.902 1.719 42.187a5.868 5.868 0 0 0 0 8.301l39.793 39.793a5.868 5.868 0 0 0 8.3 0l39.61-39.605a5.873 5.873 0 0 0 0-8.305"
              }
            ) })
          ]
        }
      ) })
    }
  ) : /* @__PURE__ */ jsx(
    Card,
    {
      className: "h-[200px] w-[200px] flex items-center justify-center shadow-2xl dark:bg-neutral-600 dark:border-neutral-600",
      children: /* @__PURE__ */ jsx(CardContent, { className: "w-[150px] flex items-center p-0", children: /* @__PURE__ */ jsxs(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          width: "292",
          height: "92pt",
          viewBox: "0 0 219 92",
          children: [
            /* @__PURE__ */ jsxs("defs", { children: [
              /* @__PURE__ */ jsx("clipPath", { id: "a", children: /* @__PURE__ */ jsx("path", { d: "M159 .79h25V69h-25Zm0 0" }) }),
              /* @__PURE__ */ jsx("clipPath", { id: "b", children: /* @__PURE__ */ jsx("path", { d: "M183 9h35.371v60H183Zm0 0" }) }),
              /* @__PURE__ */ jsx("clipPath", { id: "c", children: /* @__PURE__ */ jsx("path", { d: "M0 .79h92V92H0Zm0 0" }) })
            ] }),
            /* @__PURE__ */ jsx(
              "path",
              {
                style: {
                  stroke: "none",
                  fillRule: "nonzero",
                  fill: "#fff",
                  fillOpacity: 1
                },
                d: "M130.871 31.836c-4.785 0-8.351 2.352-8.351 8.008 0 4.261 2.347 7.222 8.093 7.222 4.871 0 8.18-2.867 8.18-7.398 0-5.133-2.961-7.832-7.922-7.832Zm-9.57 39.95c-1.133 1.39-2.262 2.87-2.262 4.612 0 3.48 4.434 4.524 10.527 4.524 5.051 0 11.926-.352 11.926-5.043 0-2.793-3.308-2.965-7.488-3.227Zm25.761-39.688c1.563 2.004 3.22 4.789 3.22 8.793 0 9.656-7.571 15.316-18.536 15.316-2.789 0-5.312-.348-6.879-.785l-2.87 4.613 8.526.52c15.059.96 23.934 1.398 23.934 12.968 0 10.008-8.789 15.665-23.934 15.665-15.75 0-21.757-4.004-21.757-10.88 0-3.917 1.742-6 4.789-8.878-2.875-1.211-3.828-3.387-3.828-5.739 0-1.914.953-3.656 2.523-5.312 1.566-1.652 3.305-3.305 5.395-5.219-4.262-2.09-7.485-6.617-7.485-13.058 0-10.008 6.613-16.88 19.93-16.88 3.742 0 6.004.344 8.008.872h16.972v7.394l-8.007.61"
              }
            ),
            /* @__PURE__ */ jsx("g", { clipPath: "url(#a)", children: /* @__PURE__ */ jsx(
              "path",
              {
                style: {
                  stroke: "none",
                  fillRule: "nonzero",
                  fill: "#fff",
                  fillOpacity: 1
                },
                d: "M170.379 16.281c-4.961 0-7.832-2.87-7.832-7.836 0-4.957 2.871-7.656 7.832-7.656 5.05 0 7.922 2.7 7.922 7.656 0 4.965-2.871 7.836-7.922 7.836Zm-11.227 52.305V61.71l4.438-.606c1.219-.175 1.394-.437 1.394-1.746V33.773c0-.953-.261-1.566-1.132-1.824l-4.7-1.656.957-7.047h18.016V59.36c0 1.399.086 1.57 1.395 1.746l4.437.606v6.875h-24.805"
              }
            ) }),
            /* @__PURE__ */ jsx("g", { clipPath: "url(#b)", children: /* @__PURE__ */ jsx(
              "path",
              {
                style: {
                  stroke: "none",
                  fillRule: "nonzero",
                  fill: "#fff",
                  fillOpacity: 1
                },
                d: "M218.371 65.21c-3.742 1.825-9.223 3.481-14.187 3.481-10.356 0-14.27-4.175-14.27-14.015V31.879c0-.524 0-.871-.7-.871h-6.093v-7.746c7.664-.871 10.707-4.703 11.664-14.188h8.27v12.36c0 .609 0 .87.695.87h12.27v8.704h-12.965v20.797c0 5.136 1.218 7.136 5.918 7.136 2.437 0 4.96-.609 7.047-1.39l2.351 7.66"
              }
            ) }),
            /* @__PURE__ */ jsx("g", { clipPath: "url(#c)", children: /* @__PURE__ */ jsx(
              "path",
              {
                style: {
                  stroke: "none",
                  fillRule: "nonzero",
                  fill: "#fff",
                  fillOpacity: 1
                },
                d: "M89.422 42.371 49.629 2.582a5.868 5.868 0 0 0-8.3 0l-8.263 8.262 10.48 10.484a6.965 6.965 0 0 1 7.173 1.668 6.98 6.98 0 0 1 1.656 7.215l10.102 10.105a6.963 6.963 0 0 1 7.214 1.657 6.976 6.976 0 0 1 0 9.875 6.98 6.98 0 0 1-9.879 0 6.987 6.987 0 0 1-1.519-7.594l-9.422-9.422v24.793a6.979 6.979 0 0 1 1.848 1.32 6.988 6.988 0 0 1 0 9.88c-2.73 2.726-7.153 2.726-9.875 0a6.98 6.98 0 0 1 0-9.88 6.893 6.893 0 0 1 2.285-1.523V34.398a6.893 6.893 0 0 1-2.285-1.523 6.988 6.988 0 0 1-1.508-7.637L29.004 14.902 1.719 42.187a5.868 5.868 0 0 0 0 8.301l39.793 39.793a5.868 5.868 0 0 0 8.3 0l39.61-39.605a5.873 5.873 0 0 0 0-8.305"
              }
            ) })
          ]
        }
      ) })
    }
  ) });
}
function GitHub() {
  const [theme] = useTheme();
  return /* @__PURE__ */ jsx("div", { className: "h-full w-full flex items-center justify-center", children: /* @__PURE__ */ jsx(
    Card,
    {
      className: "h-[200px] w-[200px] flex items-center justify-center shadow-2xl dark:bg-neutral-600 dark:border-neutral-600",
      children: /* @__PURE__ */ jsx(CardContent, { className: "w-[150px] flex items-center justify-center p-0", children: /* @__PURE__ */ jsx("svg", { width: "98", height: "98", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z",
          fill: theme === "light" ? "#24292f" : "#FFF"
        }
      ) }) })
    }
  ) });
}
const CarouselContext = React.createContext(null);
function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}
const Carousel = React.forwardRef(
  ({
    orientation = "horizontal",
    opts,
    setApi,
    plugins,
    className,
    children,
    ...props
  }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y"
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const onSelect = React.useCallback((api2) => {
      if (!api2) {
        return;
      }
      setCanScrollPrev(api2.canScrollPrev());
      setCanScrollNext(api2.canScrollNext());
    }, []);
    const scrollPrev = React.useCallback(() => {
      api == null ? void 0 : api.scrollPrev();
    }, [api]);
    const scrollNext = React.useCallback(() => {
      api == null ? void 0 : api.scrollNext();
    }, [api]);
    const handleKeyDown = React.useCallback(
      (event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );
    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }
      setApi(api);
    }, [api, setApi]);
    React.useEffect(() => {
      if (!api) {
        return;
      }
      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      return () => {
        api == null ? void 0 : api.off("select", onSelect);
      };
    }, [api, onSelect]);
    return /* @__PURE__ */ jsx(
      CarouselContext.Provider,
      {
        value: {
          carouselRef,
          api,
          opts,
          orientation: orientation || ((opts == null ? void 0 : opts.axis) === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext
        },
        children: /* @__PURE__ */ jsx(
          "div",
          {
            ref,
            onKeyDownCapture: handleKeyDown,
            className: cn("relative", className),
            role: "region",
            "aria-roledescription": "carousel",
            ...props,
            children
          }
        )
      }
    );
  }
);
Carousel.displayName = "Carousel";
const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();
  return /* @__PURE__ */ jsx("div", { ref: carouselRef, className: "overflow-hidden", children: /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn(
        "flex",
        orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
        className
      ),
      ...props
    }
  ) });
});
CarouselContent.displayName = "CarouselContent";
const CarouselItem = React.forwardRef(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "group",
      "aria-roledescription": "slide",
      className: cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      ),
      ...props
    }
  );
});
CarouselItem.displayName = "CarouselItem";
const CarouselPrevious = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  return /* @__PURE__ */ jsxs(
    Button,
    {
      ref,
      variant,
      size,
      className: cn(
        "absolute  h-8 w-8 rounded-full",
        orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      ),
      disabled: !canScrollPrev,
      onClick: scrollPrev,
      ...props,
      children: [
        /* @__PURE__ */ jsx(ArrowLeftIcon, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Previous slide" })
      ]
    }
  );
});
CarouselPrevious.displayName = "CarouselPrevious";
const CarouselNext = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  return /* @__PURE__ */ jsxs(
    Button,
    {
      ref,
      variant,
      size,
      className: cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      ),
      disabled: !canScrollNext,
      onClick: scrollNext,
      ...props,
      children: [
        /* @__PURE__ */ jsx(ArrowRightIcon, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Next slide" })
      ]
    }
  );
});
CarouselNext.displayName = "CarouselNext";
function Prisma() {
  const [theme] = useTheme();
  return /* @__PURE__ */ jsx("div", { className: "h-full w-full flex items-center justify-center", children: theme === Theme.LIGHT ? /* @__PURE__ */ jsx(
    Card,
    {
      className: "h-[200px] w-[200px] flex items-center justify-center shadow-2xl dark:bg-neutral-600 dark:border-neutral-600",
      children: /* @__PURE__ */ jsx(CardContent, { className: "w-[150px] flex items-center justify-center p-0", children: /* @__PURE__ */ jsx(
        "svg",
        {
          fill: "none",
          height: "982",
          viewBox: "1.372 -.18543865 324.553 128.18543865",
          width: "2500",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ jsxs("g", { fill: "#0c344b", children: [
            /* @__PURE__ */ jsx("path", { d: "m199.202 85.75h8.638v-31.662h-8.638zm-.367-39.847c0-2.813 1.567-4.219 4.701-4.219 3.133 0 4.701 1.406 4.701 4.219 0 1.341-.392 2.384-1.175 3.13-.784.746-1.959 1.118-3.526 1.118-3.134 0-4.701-1.416-4.701-4.248z" }),
            /* @__PURE__ */ jsx(
              "path",
              {
                clipRule: "evenodd",
                d: "m164.253 67.483c2.786-2.36 4.178-5.767 4.178-10.223 0-4.286-1.307-7.51-3.922-9.672-2.615-2.16-6.433-3.242-11.456-3.242h-13.225v41.404h8.779v-14.727h3.767c5.135 0 9.095-1.179 11.879-3.54zm-12.757-3.653h-2.889v-12.29h3.993c2.398 0 4.158.49 5.282 1.472 1.123.982 1.685 2.502 1.685 4.56 0 2.038-.67 3.591-2.011 4.658s-3.36 1.6-6.06 1.6z",
                fillRule: "evenodd"
              }
            ),
            /* @__PURE__ */ jsx("path", { d: "m194.62 53.748c-.774-.17-1.746-.255-2.917-.255-1.964 0-3.781.543-5.451 1.628a11.908 11.908 0 0 0 -3.98 4.291h-.424l-1.275-5.324h-6.542v31.662h8.638v-16.114c0-2.549.769-4.532 2.307-5.948 1.54-1.416 3.687-2.124 6.444-2.124 1.001 0 1.85.095 2.549.283zm40.245 30.02c2.257-1.7 3.385-4.172 3.385-7.42 0-1.567-.273-2.917-.821-4.05-.547-1.133-1.398-2.133-2.549-3.002-1.151-.868-2.964-1.802-5.438-2.803-2.775-1.114-4.573-1.955-5.394-2.521s-1.233-1.236-1.233-2.011c0-1.378 1.275-2.067 3.824-2.067 1.434 0 2.841.217 4.219.65 1.378.436 2.861.992 4.447 1.672l2.605-6.23c-3.606-1.661-7.316-2.492-11.13-2.492-4.003 0-7.093.769-9.273 2.308-2.183 1.539-3.273 3.714-3.273 6.527 0 1.643.26 3.026.78 4.149.518 1.124 1.349 2.12 2.493 2.988 1.14.869 2.931 1.813 5.365 2.832 1.699.718 3.059 1.345 4.079 1.883 1.019.539 1.737 1.02 2.153 1.445.415.425.622.977.622 1.657 0 1.812-1.567 2.718-4.702 2.718-1.529 0-3.299-.255-5.309-.764-2.012-.51-3.819-1.142-5.424-1.898v7.137a22.275 22.275 0 0 0 4.56 1.373c1.624.312 3.587.468 5.891.468 4.492 0 7.867-.85 10.123-2.55zm37.604 1.982h-8.638v-18.493c0-2.284-.383-3.998-1.146-5.14-.766-1.142-1.969-1.714-3.612-1.714-2.208 0-3.813.812-4.814 2.436s-1.501 4.295-1.501 8.015v14.896h-8.638v-31.662h6.599l1.161 4.05h.482c.849-1.454 2.077-2.592 3.681-3.413 1.605-.821 3.446-1.232 5.523-1.232 4.739 0 7.948 1.549 9.629 4.645h.764c.85-1.473 2.101-2.615 3.753-3.427s3.516-1.218 5.593-1.218c3.587 0 6.302.921 8.142 2.761 1.841 1.841 2.761 4.791 2.761 8.85v20.646h-8.666v-18.493c0-2.284-.383-3.998-1.146-5.14-.766-1.142-1.969-1.714-3.612-1.714-2.114 0-3.695.756-4.744 2.266-1.047 1.511-1.571 3.908-1.571 7.193z" }),
            /* @__PURE__ */ jsx(
              "path",
              {
                clipRule: "evenodd",
                d: "m318.222 81.445 1.671 4.305h6.032v-21.099c0-3.776-1.133-6.589-3.398-8.439-2.266-1.85-5.523-2.776-9.771-2.776-4.436 0-8.477.954-12.121 2.861l2.86 5.834c3.417-1.53 6.391-2.294 8.921-2.294 3.285 0 4.928 1.605 4.928 4.814v1.388l-5.494.17c-4.739.17-8.283 1.053-10.635 2.648-2.35 1.596-3.525 4.074-3.525 7.434 0 3.21.873 5.683 2.619 7.42 1.747 1.737 4.139 2.605 7.18 2.605 2.473 0 4.479-.354 6.017-1.062 1.539-.708 3.035-1.977 4.489-3.809zm-4.22-10.252 3.342-.113v2.605c0 1.908-.6 3.437-1.799 4.588-1.198 1.152-2.799 1.728-4.8 1.728-2.794 0-4.191-1.218-4.191-3.653 0-1.7.613-2.964 1.841-3.795 1.227-.83 3.096-1.284 5.607-1.36zm-218.269 30.336-57.479 17c-1.756.52-3.439-.999-3.07-2.77l20.534-98.34c.384-1.838 2.926-2.13 3.728-.427l38.02 80.736c.717 1.523-.101 3.319-1.733 3.801zm9.857-4.01-44.022-93.482v-.002a7.062 7.062 0 0 0 -6.019-4.022c-2.679-.156-5.079 1.136-6.433 3.335l-47.744 77.33a7.233 7.233 0 0 0 .084 7.763l23.338 36.152c1.391 2.158 3.801 3.407 6.306 3.407.71 0 1.424-.1 2.126-.308l67.744-20.036a7.424 7.424 0 0 0 4.66-4.028 7.264 7.264 0 0 0 -.04-6.11z",
                fillRule: "evenodd"
              }
            )
          ] })
        }
      ) })
    }
  ) : /* @__PURE__ */ jsx(
    Card,
    {
      className: "h-[200px] w-[200px] flex items-center justify-center shadow-2xl dark:bg-neutral-600 dark:border-neutral-600",
      children: /* @__PURE__ */ jsx(CardContent, { className: "w-[150px] flex items-center justify-center p-0", children: /* @__PURE__ */ jsxs(
        "svg",
        {
          width: "605",
          height: "195",
          viewBox: "0 0 605 195",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [
            /* @__PURE__ */ jsx(
              "path",
              {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M2.20316 123.367C0.281957 126.5 0.311691 130.455 2.2798 133.559L37.902 189.752C40.214 193.399 44.6703 195.062 48.8063 193.821L151.604 162.982C157.214 161.299 160.036 155.041 157.584 149.722L91.5009 6.37265C88.2782 -0.618156 78.563 -1.19199 74.5397 5.37082L2.20316 123.367ZM89.7451 39.1438C88.3406 35.8938 83.5845 36.3944 82.8873 39.8656L57.4457 166.544C56.9092 169.215 59.4101 171.496 62.0207 170.717L133.045 149.515C135.118 148.897 136.186 146.607 135.328 144.621L89.7451 39.1438Z",
                fill: "white"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M220.059 97.1332H226.32C232.172 97.1332 236.547 95.978 239.454 93.6656C242.36 91.3532 243.812 87.9876 243.812 83.5686C243.812 79.1107 242.594 75.8165 240.16 73.6884C237.724 71.5602 233.91 70.4961 228.713 70.4961H220.059V97.1332ZM263.023 82.8945C263.023 92.5516 260.006 99.9352 253.968 105.05C247.935 110.167 239.353 112.722 228.224 112.722H220.06V144.638H201.034V54.9072H229.695C240.581 54.9072 248.856 57.25 254.523 61.9333C260.19 66.6188 263.023 73.6059 263.023 82.8945V82.8945Z",
                fill: "white"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M313.458 74.729C315.996 74.729 318.103 74.9132 319.78 75.2816L318.369 92.8338C316.854 92.4264 315.015 92.2205 312.845 92.2205C306.87 92.2205 302.217 93.7549 298.88 96.8236C295.547 99.8924 293.88 104.19 293.88 109.714V144.637H275.16V76.0185H289.338L292.101 87.5567H293.02C295.148 83.7121 298.021 80.6108 301.645 78.2572C305.264 75.9058 309.202 74.729 313.458 74.729",
                fill: "white"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M329.708 144.637H348.428V76.0191H329.708V144.637ZM328.914 58.2797C328.914 52.1833 332.31 49.1362 339.102 49.1362C345.892 49.1362 349.29 52.1833 349.29 58.2797C349.29 61.1859 348.441 63.4463 346.744 65.063C345.045 66.6797 342.498 67.4859 339.102 67.4859C332.31 67.4859 328.914 64.4172 328.914 58.2797V58.2797Z",
                fill: "white"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M414.336 124.258C414.336 131.297 411.891 136.657 407 140.339C402.11 144.021 394.796 145.863 385.059 145.863C380.066 145.863 375.814 145.525 372.294 144.849C368.775 144.175 365.48 143.182 362.412 141.873V126.406C365.89 128.044 369.806 129.414 374.167 130.519C378.523 131.622 382.359 132.175 385.672 132.175C392.464 132.175 395.862 130.212 395.862 126.285C395.862 124.811 395.412 123.615 394.512 122.694C393.611 121.772 392.057 120.73 389.846 119.562C387.638 118.396 384.69 117.037 381.008 115.481C375.731 113.273 371.852 111.227 369.379 109.344C366.902 107.462 365.101 105.304 363.979 102.868C362.852 100.434 362.288 97.437 362.288 93.8762C362.288 87.7799 364.65 83.0662 369.379 79.7309C374.104 76.3956 380.803 74.729 389.478 74.729C397.744 74.729 405.784 76.53 413.599 80.1297L407.953 93.6314C404.516 92.1577 401.302 90.9527 398.316 90.01C395.329 89.0694 392.28 88.5991 389.172 88.5991C383.648 88.5991 380.885 90.0923 380.885 93.0787C380.885 94.7583 381.778 96.2103 383.555 97.437C385.336 98.6636 389.233 100.486 395.247 102.9C400.609 105.07 404.538 107.094 407.032 108.975C409.527 110.858 411.369 113.026 412.556 115.481C413.744 117.937 414.336 120.862 414.336 124.258",
                fill: "white"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M488.494 144.637H469.774V104.558C469.774 99.6085 468.944 95.8939 467.29 93.419C465.63 90.944 463.023 89.7044 459.462 89.7044C454.677 89.7044 451.199 91.4642 449.029 94.9837C446.86 98.5032 445.776 104.292 445.776 112.354V144.637H427.056V76.0185H441.358L443.874 84.7957H444.918C446.758 81.6446 449.42 79.1783 452.896 77.399C456.374 75.6197 460.364 74.729 464.865 74.729C475.136 74.729 482.09 78.086 485.733 84.7957H487.389C489.231 81.6034 491.942 79.1284 495.522 77.3687C499.103 75.6089 503.142 74.729 507.644 74.729C515.417 74.729 521.301 76.725 525.289 80.7127C529.279 84.7025 531.273 91.0957 531.273 99.8924V144.637H512.492V104.558C512.492 99.6085 511.662 95.8939 510.008 93.419C508.348 90.944 505.741 89.7044 502.18 89.7044C497.599 89.7044 494.172 91.3428 491.899 94.6153C489.63 97.8899 488.494 103.085 488.494 110.204V144.637Z",
                fill: "white"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M585.75 112.844L578.507 113.089C573.065 113.254 569.015 114.235 566.355 116.036C563.694 117.837 562.366 120.577 562.366 124.261C562.366 129.538 565.393 132.178 571.448 132.178C575.785 132.178 579.255 130.929 581.851 128.433C584.449 125.938 585.75 122.625 585.75 118.49V112.844ZM591.273 144.636L587.652 135.306H587.16C584.009 139.277 580.767 142.027 577.431 143.561C574.098 145.095 569.751 145.863 564.391 145.863C557.801 145.863 552.617 143.982 548.831 140.217C545.047 136.453 543.155 131.093 543.155 124.136C543.155 116.855 545.701 111.484 550.794 108.025C555.891 104.569 563.572 102.655 573.842 102.287L585.749 101.918V98.9102C585.749 91.9556 582.188 88.4773 575.069 88.4773C569.586 88.4773 563.141 90.133 555.735 93.4488L549.537 80.8054C557.434 76.6725 566.192 74.605 575.806 74.605C585.012 74.605 592.071 76.6118 596.982 80.6211C601.89 84.6305 604.346 90.7268 604.346 98.9102V144.636H591.273Z",
                fill: "white"
              }
            )
          ]
        }
      ) })
    }
  ) });
}
function Vue() {
  return /* @__PURE__ */ jsx("div", { className: "h-full w-full flex items-center justify-center", children: /* @__PURE__ */ jsx(
    Card,
    {
      className: "h-[200px] w-[200px] flex items-center justify-center shadow-2xl dark:bg-neutral-600 dark:border-neutral-600",
      children: /* @__PURE__ */ jsx(CardContent, { className: "w-[150px] flex items-center justify-center p-0", children: /* @__PURE__ */ jsx(
        "svg",
        {
          version: "1.1",
          viewBox: "0 0 261.76 226.69",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ jsxs("g", { transform: "matrix(1.3333 0 0 -1.3333 -76.311 313.34)", children: [
            /* @__PURE__ */ jsx("g", { transform: "translate(178.06 235.01)", children: /* @__PURE__ */ jsx(
              "path",
              {
                d: "m0 0-22.669-39.264-22.669 39.264h-75.491l98.16-170.02 98.16 170.02z",
                fill: "#41b883"
              }
            ) }),
            /* @__PURE__ */ jsx("g", { transform: "translate(178.06 235.01)", children: /* @__PURE__ */ jsx(
              "path",
              {
                d: "m0 0-22.669-39.264-22.669 39.264h-36.227l58.896-102.01 58.896 102.01z",
                fill: "#34495e"
              }
            ) })
          ] })
        }
      ) })
    }
  ) });
}
const BashLogoDark = "/bash-dark.svg";
const BashLogoLight = "/bash-light.svg";
function Bash() {
  const [theme] = useTheme();
  return /* @__PURE__ */ jsx("div", { className: "h-full w-full flex items-center justify-center", children: /* @__PURE__ */ jsx(
    Card,
    {
      className: "h-[200px] w-[200px] flex items-center justify-center shadow-2xl dark:bg-neutral-600 dark:border-neutral-600",
      children: /* @__PURE__ */ jsx(CardContent, { className: "w-[150px] flex items-center justify-center p-0", children: theme === Theme.LIGHT ? /* @__PURE__ */ jsx("img", { src: BashLogoLight, alt: "Bash Logo" }) : /* @__PURE__ */ jsx("img", { src: BashLogoDark, alt: "Bash Logo" }) })
    }
  ) });
}
function Python() {
  return /* @__PURE__ */ jsx("div", { className: "h-full w-full flex items-center justify-center", children: /* @__PURE__ */ jsx(
    Card,
    {
      className: "h-[200px] w-[200px] flex items-center justify-center shadow-2xl dark:bg-neutral-600 dark:border-neutral-600",
      children: /* @__PURE__ */ jsx(CardContent, { className: "w-[150px] flex items-center justify-center p-0", children: /* @__PURE__ */ jsxs(
        "svg",
        {
          version: "1.0",
          id: "svg2",
          width: "83.371017pt",
          height: "101.00108pt",
          "inkscape:export-filename": "python-logo-only.png",
          "inkscape:export-xdpi": "232.44",
          "inkscape:export-ydpi": "232.44",
          xmlnsXlink: "http://www.w3.org/1999/xlink",
          xmlns: "http://www.w3.org/2000/svg",
          children: [
            /* @__PURE__ */ jsxs("defs", { id: "defs4", children: [
              /* @__PURE__ */ jsxs("linearGradient", { id: "linearGradient2795", children: [
                /* @__PURE__ */ jsx(
                  "stop",
                  {
                    style: { stopColor: "#b8b8b8", stopOpacity: 0.49803922 },
                    offset: "0",
                    id: "stop2797"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "stop",
                  {
                    style: { stopColor: "#7f7f7f", stopOpacity: 0 },
                    offset: "1",
                    id: "stop2799"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("linearGradient", { id: "linearGradient2787", children: [
                /* @__PURE__ */ jsx(
                  "stop",
                  {
                    style: { stopColor: "#7f7f7f", stopOpacity: 0.5 },
                    offset: "0",
                    id: "stop2789"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "stop",
                  {
                    style: { stopColor: "#7f7f7f", stopOpacity: 0 },
                    offset: "1",
                    id: "stop2791"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("linearGradient", { id: "linearGradient3676", children: [
                /* @__PURE__ */ jsx(
                  "stop",
                  {
                    style: { stopColor: "#b2b2b2", stopOpacity: 0.5 },
                    offset: "0",
                    id: "stop3678"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "stop",
                  {
                    style: { stopColor: "#b3b3b3", stopOpacity: 0 },
                    offset: "1",
                    id: "stop3680"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("linearGradient", { id: "linearGradient3236", children: [
                /* @__PURE__ */ jsx(
                  "stop",
                  {
                    style: { stopColor: "#f4f4f4", stopOpacity: 1 },
                    offset: "0",
                    id: "stop3244"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "stop",
                  {
                    style: { stopColor: "white", stopOpacity: 1 },
                    offset: "1",
                    id: "stop3240"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("linearGradient", { id: "linearGradient4671", children: [
                /* @__PURE__ */ jsx(
                  "stop",
                  {
                    style: { stopColor: "#ffd43b", stopOpacity: 1 },
                    offset: "0",
                    id: "stop4673"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "stop",
                  {
                    style: { stopColor: "#ffe873", stopOpacity: 1 },
                    offset: "1",
                    id: "stop4675"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("linearGradient", { id: "linearGradient4689", children: [
                /* @__PURE__ */ jsx(
                  "stop",
                  {
                    style: { stopColor: "#5a9fd4", stopOpacity: 1 },
                    offset: "0",
                    id: "stop4691"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "stop",
                  {
                    style: { stopColor: "#306998", stopOpacity: 1 },
                    offset: "1",
                    id: "stop4693"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "linearGradient",
                {
                  x1: "224.23996",
                  y1: "144.75717",
                  x2: "-65.308502",
                  y2: "144.75717",
                  id: "linearGradient2987",
                  xlinkHref: "#linearGradient4671",
                  gradientUnits: "userSpaceOnUse",
                  gradientTransform: "translate(100.2702,99.61116)"
                }
              ),
              /* @__PURE__ */ jsx(
                "linearGradient",
                {
                  x1: "172.94208",
                  y1: "77.475983",
                  x2: "26.670298",
                  y2: "76.313133",
                  id: "linearGradient2990",
                  xlinkHref: "#linearGradient4689",
                  gradientUnits: "userSpaceOnUse",
                  gradientTransform: "translate(100.2702,99.61116)"
                }
              ),
              /* @__PURE__ */ jsx(
                "linearGradient",
                {
                  xlinkHref: "#linearGradient4689",
                  id: "linearGradient2587",
                  gradientUnits: "userSpaceOnUse",
                  gradientTransform: "translate(100.2702,99.61116)",
                  x1: "172.94208",
                  y1: "77.475983",
                  x2: "26.670298",
                  y2: "76.313133"
                }
              ),
              /* @__PURE__ */ jsx(
                "linearGradient",
                {
                  xlinkHref: "#linearGradient4671",
                  id: "linearGradient2589",
                  gradientUnits: "userSpaceOnUse",
                  gradientTransform: "translate(100.2702,99.61116)",
                  x1: "224.23996",
                  y1: "144.75717",
                  x2: "-65.308502",
                  y2: "144.75717"
                }
              ),
              /* @__PURE__ */ jsx(
                "linearGradient",
                {
                  xlinkHref: "#linearGradient4689",
                  id: "linearGradient2248",
                  gradientUnits: "userSpaceOnUse",
                  gradientTransform: "translate(100.2702,99.61116)",
                  x1: "172.94208",
                  y1: "77.475983",
                  x2: "26.670298",
                  y2: "76.313133"
                }
              ),
              /* @__PURE__ */ jsx(
                "linearGradient",
                {
                  xlinkHref: "#linearGradient4671",
                  id: "linearGradient2250",
                  gradientUnits: "userSpaceOnUse",
                  gradientTransform: "translate(100.2702,99.61116)",
                  x1: "224.23996",
                  y1: "144.75717",
                  x2: "-65.308502",
                  y2: "144.75717"
                }
              ),
              /* @__PURE__ */ jsx(
                "linearGradient",
                {
                  xlinkHref: "#linearGradient4671",
                  id: "linearGradient2255",
                  gradientUnits: "userSpaceOnUse",
                  gradientTransform: "matrix(0.562541,0,0,0.567972,-11.5974,-7.60954)",
                  x1: "224.23996",
                  y1: "144.75717",
                  x2: "-65.308502",
                  y2: "144.75717"
                }
              ),
              /* @__PURE__ */ jsx(
                "linearGradient",
                {
                  xlinkHref: "#linearGradient4689",
                  id: "linearGradient2258",
                  gradientUnits: "userSpaceOnUse",
                  gradientTransform: "matrix(0.562541,0,0,0.567972,-11.5974,-7.60954)",
                  x1: "172.94208",
                  y1: "76.176224",
                  x2: "26.670298",
                  y2: "76.313133"
                }
              ),
              /* @__PURE__ */ jsx(
                "radialGradient",
                {
                  xlinkHref: "#linearGradient2795",
                  id: "radialGradient2801",
                  cx: "61.518883",
                  cy: "132.28575",
                  fx: "61.518883",
                  fy: "132.28575",
                  r: "29.036913",
                  gradientTransform: "matrix(1,0,0,0.177966,0,108.7434)",
                  gradientUnits: "userSpaceOnUse"
                }
              ),
              /* @__PURE__ */ jsx(
                "linearGradient",
                {
                  xlinkHref: "#linearGradient4671",
                  id: "linearGradient1475",
                  gradientUnits: "userSpaceOnUse",
                  gradientTransform: "matrix(0.562541,0,0,0.567972,-14.99112,-11.702371)",
                  x1: "150.96111",
                  y1: "192.35176",
                  x2: "112.03144",
                  y2: "137.27299"
                }
              ),
              /* @__PURE__ */ jsx(
                "linearGradient",
                {
                  xlinkHref: "#linearGradient4689",
                  id: "linearGradient1478",
                  gradientUnits: "userSpaceOnUse",
                  gradientTransform: "matrix(0.562541,0,0,0.567972,-14.99112,-11.702371)",
                  x1: "26.648937",
                  y1: "20.603781",
                  x2: "135.66525",
                  y2: "114.39767"
                }
              ),
              /* @__PURE__ */ jsx(
                "radialGradient",
                {
                  xlinkHref: "#linearGradient2795",
                  id: "radialGradient1480",
                  gradientUnits: "userSpaceOnUse",
                  gradientTransform: "matrix(1.7490565e-8,-0.23994696,1.054668,3.7915457e-7,-83.7008,142.46201)",
                  cx: "61.518883",
                  cy: "132.28575",
                  fx: "61.518883",
                  fy: "132.28575",
                  r: "29.036913"
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              "path",
              {
                style: { fill: "url(#linearGradient1478)", fillOpacity: 1 },
                d: "M 54.918785,9.1927421e-4 C 50.335132,0.02221727 45.957846,0.41313697 42.106285,1.0946693 30.760069,3.0991731 28.700036,7.2947714 28.700035,15.032169 v 10.21875 h 26.8125 v 3.40625 h -26.8125 -10.0625 c -7.792459,0 -14.6157588,4.683717 -16.7499998,13.59375 -2.46181998,10.212966 -2.57101508,16.586023 0,27.25 1.9059283,7.937852 6.4575432,13.593748 14.2499998,13.59375 h 9.21875 v -12.25 c 0,-8.849902 7.657144,-16.656248 16.75,-16.65625 h 26.78125 c 7.454951,0 13.406253,-6.138164 13.40625,-13.625 v -25.53125 c 0,-7.2663386 -6.12998,-12.7247771 -13.40625,-13.9374997 C 64.281548,0.32794397 59.502438,-0.02037903 54.918785,9.1927421e-4 Z m -14.5,8.21875012579 c 2.769547,0 5.03125,2.2986456 5.03125,5.1249996 -2e-6,2.816336 -2.261703,5.09375 -5.03125,5.09375 -2.779476,-1e-6 -5.03125,-2.277415 -5.03125,-5.09375 -10e-7,-2.826353 2.251774,-5.1249996 5.03125,-5.1249996 z",
                id: "path1948"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                style: { fill: "url(#linearGradient1475)", fillOpacity: 1 },
                d: "m 85.637535,28.657169 v 11.90625 c 0,9.230755 -7.825895,16.999999 -16.75,17 h -26.78125 c -7.335833,0 -13.406249,6.278483 -13.40625,13.625 v 25.531247 c 0,7.266344 6.318588,11.540324 13.40625,13.625004 8.487331,2.49561 16.626237,2.94663 26.78125,0 6.750155,-1.95439 13.406253,-5.88761 13.40625,-13.625004 V 86.500919 h -26.78125 v -3.40625 h 26.78125 13.406254 c 7.792461,0 10.696251,-5.435408 13.406241,-13.59375 2.79933,-8.398886 2.68022,-16.475776 0,-27.25 -1.92578,-7.757441 -5.60387,-13.59375 -13.406241,-13.59375 z m -15.0625,64.65625 c 2.779478,3e-6 5.03125,2.277417 5.03125,5.093747 -2e-6,2.826354 -2.251775,5.125004 -5.03125,5.125004 -2.76955,0 -5.03125,-2.29865 -5.03125,-5.125004 2e-6,-2.81633 2.261697,-5.093747 5.03125,-5.093747 z",
                id: "path1950"
              }
            ),
            /* @__PURE__ */ jsx(
              "ellipse",
              {
                style: {
                  opacity: 0.44382,
                  fill: "url(#radialGradient1480)",
                  fillOpacity: 1,
                  fillRule: "nonzero",
                  stroke: "none",
                  strokeWidth: 15.4174,
                  strokeMiterlimit: 4,
                  strokeDasharray: "none",
                  strokeOpacity: 1
                },
                id: "path1894",
                cx: "55.816761",
                cy: "127.70079",
                rx: "35.930977",
                ry: "6.9673119"
              }
            )
          ]
        }
      ) })
    }
  ) });
}
function Java() {
  return /* @__PURE__ */ jsx("div", { className: "h-full w-full flex items-center justify-center", children: /* @__PURE__ */ jsx(
    Card,
    {
      className: "h-[200px] w-[200px] flex items-center justify-center shadow-2xl dark:bg-neutral-600 dark:border-neutral-600",
      children: /* @__PURE__ */ jsx(CardContent, { className: "w-[150px] flex items-center justify-center p-0", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "55", height: "94", children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M18.932 50.22s-2.246 1.367 1.563 1.758c4.6.586 7.032.488 12.11-.488 0 0 1.367.88 3.223 1.563C24.4 57.936 9.946 52.76 18.932 50.22zm-1.465-6.348s-2.442 1.856 1.367 2.246c4.98.488 8.888.586 15.627-.78 0 0 .88.977 2.344 1.465-13.77 4.102-29.202.39-19.338-2.93zm26.956 11.134s1.66 1.367-1.856 2.442c-6.544 1.953-27.444 2.54-33.304 0-2.05-.88 1.856-2.15 3.125-2.344 1.27-.293 1.953-.293 1.953-.293-2.246-1.563-14.943 3.223-6.446 4.6 23.342 3.81 42.583-1.66 36.527-4.395zM20.006 37.23s-10.646 2.54-3.81 3.418c2.93.39 8.692.293 14.064-.098 4.395-.39 8.8-1.172 8.8-1.172s-1.563.684-2.637 1.367C25.573 43.58 4.77 42.31 10.728 39.38c5.08-2.442 9.278-2.15 9.278-2.15zM39.05 47.876c10.94-5.665 5.86-11.134 2.344-10.45-.88.195-1.27.39-1.27.39s.293-.586.977-.78c6.934-2.442 12.404 7.325-2.246 11.134 0 0 .098-.098.195-.293zm-17.97 15.43c10.548.684 26.663-.39 27.054-5.372 0 0-.78 1.953-8.692 3.418-8.985 1.66-20.12 1.465-26.663.39 0 0 1.367 1.172 8.302 1.563z",
            fill: "#4e7896"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M32.4 5s6.055 6.153-5.762 15.43c-9.474 7.52-2.15 11.818 0 16.7-5.567-4.98-9.57-9.376-6.837-13.478C23.815 17.6 34.85 14.67 32.4 5zm-3.125 28.03c2.832 3.223-.78 6.153-.78 6.153s7.227-3.71 3.907-8.302c-3.028-4.395-5.372-6.544 7.325-13.87 0 0-20.022 4.98-10.45 16.017z",
            fill: "#f58219"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M24.235 84.215v-9.57c0-2.442-1.367-4.102-4.786-4.102-1.953 0-3.614.488-5.08 1.074l.488 1.758c1.074-.39 2.442-.78 3.907-.78 1.856 0 2.735.78 2.735 2.344v1.27h-.977c-4.688 0-6.837 1.758-6.837 4.6 0 2.344 1.465 3.71 4.102 3.71 1.66 0 2.93-.78 4.102-1.758l.195 1.465h2.15zM21.5 81.09c-.977.88-2.05 1.367-3.028 1.367-1.27 0-2.05-.78-2.05-2.15s.78-2.344 3.907-2.344H21.5v3.125zm11.915 3.125h-3.418l-4.102-13.38h2.93l2.54 8.204.586 2.442c1.27-3.516 2.246-7.13 2.637-10.646h2.93c-.78 4.395-2.15 9.18-4.102 13.38zm15.822 0v-9.57c0-2.442-1.367-4.102-4.786-4.102-1.953 0-3.614.488-5.08 1.074l.39 1.758c1.172-.39 2.54-.78 4.004-.78 1.856 0 2.735.78 2.735 2.344v1.27h-.977c-4.688 0-6.837 1.758-6.837 4.6 0 2.344 1.367 3.71 4.004 3.71 1.758 0 3.028-.78 4.2-1.758l.195 1.465h2.15zm-2.735-3.125c-.977.88-2.05 1.367-3.028 1.367-1.27 0-2.05-.78-2.05-2.15s.78-2.344 3.907-2.344h1.172v3.125zM10.66 86.46c-.78 1.172-1.953 2.05-3.418 2.54l-1.27-1.563c.977-.586 1.953-1.465 2.344-2.246.39-.684.488-1.66.488-3.907V66.05h2.93v15.04c0 3.028-.293 4.2-1.074 5.372z",
            fill: "#4e7896"
          }
        )
      ] }) })
    }
  ) });
}
function Rust() {
  useTheme();
  return /* @__PURE__ */ jsx("div", { className: "h-full w-full flex items-center justify-center", children: /* @__PURE__ */ jsx(
    Card,
    {
      className: "h-[200px] w-[200px] flex items-center justify-center shadow-2xl dark:bg-neutral-600 dark:border-neutral-600",
      children: /* @__PURE__ */ jsx(CardContent, { className: "w-[150px] flex items-center justify-center p-0", children: /* @__PURE__ */ jsx(
        "svg",
        {
          version: "1.1",
          height: "106",
          width: "106",
          xmlns: "http://www.w3.org/2000/svg",
          xmlnsXlink: "http://www.w3.org/1999/xlink",
          children: /* @__PURE__ */ jsxs("g", { id: "logo", transform: "translate(53, 53)", children: [
            /* @__PURE__ */ jsx(
              "path",
              {
                id: "r",
                transform: "translate(0.5, 0.5)",
                stroke: "black",
                strokeWidth: "1",
                strokeLinejoin: "round",
                d: "M -9,-15 H 4 C 12,-15 12,-7 4,-7 H -9 Z     M -40,22 H 0 V 11 H -9 V 3 H 1 C 12,3 6,22 15,22 H 40     V 3 H 34 V 5 C 34,13 25,12 24,7 C 23,2 19,-2 18,-2 C 33,-10 24,-26 12,-26 H -35     V -15 H -25 V 11 H -40 Z"
              }
            ),
            /* @__PURE__ */ jsxs("g", { id: "gear", mask: "url(#holes)", children: [
              /* @__PURE__ */ jsx("circle", { r: "43", fill: "none", stroke: "black", strokeWidth: "9" }),
              /* @__PURE__ */ jsxs("g", { id: "cogs", children: [
                /* @__PURE__ */ jsx(
                  "polygon",
                  {
                    id: "cog",
                    stroke: "black",
                    strokeWidth: "3",
                    strokeLinejoin: "round",
                    points: "46,3 51,0 46,-3"
                  }
                ),
                /* @__PURE__ */ jsx("use", { xlinkHref: "#cog", transform: "rotate(11.25)" }),
                /* @__PURE__ */ jsx("use", { xlinkHref: "#cog", transform: "rotate(22.50)" }),
                /* @__PURE__ */ jsx("use", { xlinkHref: "#cog", transform: "rotate(33.75)" }),
                /* @__PURE__ */ jsx("use", { xlinkHref: "#cog", transform: "rotate(45.00)" }),
                /* @__PURE__ */ jsx("use", { xlinkHref: "#cog", transform: "rotate(56.25)" }),
                /* @__PURE__ */ jsx("use", { xlinkHref: "#cog", transform: "rotate(67.50)" }),
                /* @__PURE__ */ jsx("use", { xlinkHref: "#cog", transform: "rotate(78.75)" }),
                /* @__PURE__ */ jsx("use", { xlinkHref: "#cog", transform: "rotate(90.00)" }),
                /* @__PURE__ */ jsx("use", { xlinkHref: "#cog", transform: "rotate(101.25)" }),
                /* @__PURE__ */ jsx("use", { xlinkHref: "#cog", transform: "rotate(112.50)" }),
                /* @__PURE__ */ jsx("use", { xlinkHref: "#cog", transform: "rotate(123.75)" }),
                /* @__PURE__ */ jsx("use", { xlinkHref: "#cog", transform: "rotate(135.00)" }),
                /* @__PURE__ */ jsx("use", { xlinkHref: "#cog", transform: "rotate(146.25)" }),
                /* @__PURE__ */ jsx("use", { xlinkHref: "#cog", transform: "rotate(157.50)" }),
                /* @__PURE__ */ jsx("use", { xlinkHref: "#cog", transform: "rotate(168.75)" }),
                /* @__PURE__ */ jsx("use", { xlinkHref: "#cog", transform: "rotate(180.00)" }),
                /* @__PURE__ */ jsx("use", { xlinkHref: "#cog", transform: "rotate(191.25)" }),
                /* @__PURE__ */ jsx("use", { xlinkHref: "#cog", transform: "rotate(202.50)" }),
                /* @__PURE__ */ jsx("use", { xlinkHref: "#cog", transform: "rotate(213.75)" }),
                /* @__PURE__ */ jsx("use", { xlinkHref: "#cog", transform: "rotate(225.00)" }),
                /* @__PURE__ */ jsx("use", { xlinkHref: "#cog", transform: "rotate(236.25)" }),
                /* @__PURE__ */ jsx("use", { xlinkHref: "#cog", transform: "rotate(247.50)" }),
                /* @__PURE__ */ jsx("use", { xlinkHref: "#cog", transform: "rotate(258.75)" }),
                /* @__PURE__ */ jsx("use", { xlinkHref: "#cog", transform: "rotate(270.00)" }),
                /* @__PURE__ */ jsx("use", { xlinkHref: "#cog", transform: "rotate(281.25)" }),
                /* @__PURE__ */ jsx("use", { xlinkHref: "#cog", transform: "rotate(292.50)" }),
                /* @__PURE__ */ jsx("use", { xlinkHref: "#cog", transform: "rotate(303.75)" }),
                /* @__PURE__ */ jsx("use", { xlinkHref: "#cog", transform: "rotate(315.00)" }),
                /* @__PURE__ */ jsx("use", { xlinkHref: "#cog", transform: "rotate(326.25)" }),
                /* @__PURE__ */ jsx("use", { xlinkHref: "#cog", transform: "rotate(337.50)" }),
                /* @__PURE__ */ jsx("use", { xlinkHref: "#cog", transform: "rotate(348.75)" })
              ] }),
              /* @__PURE__ */ jsxs("g", { id: "mounts", children: [
                /* @__PURE__ */ jsx(
                  "polygon",
                  {
                    id: "mount",
                    stroke: "black",
                    strokeWidth: "6",
                    strokeLinejoin: "round",
                    points: "-7,-42 0,-35 7,-42"
                  }
                ),
                /* @__PURE__ */ jsx("use", { xlinkHref: "#mount", transform: "rotate(72)" }),
                /* @__PURE__ */ jsx("use", { xlinkHref: "#mount", transform: "rotate(144)" }),
                /* @__PURE__ */ jsx("use", { xlinkHref: "#mount", transform: "rotate(216)" }),
                /* @__PURE__ */ jsx("use", { xlinkHref: "#mount", transform: "rotate(288)" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("mask", { id: "holes", children: [
              /* @__PURE__ */ jsx("rect", { x: "-60", y: "-60", width: "120", height: "120", fill: "white" }),
              /* @__PURE__ */ jsx("circle", { id: "hole", cy: "-40", r: "3" }),
              /* @__PURE__ */ jsx("use", { xlinkHref: "#hole", transform: "rotate(72)" }),
              /* @__PURE__ */ jsx("use", { xlinkHref: "#hole", transform: "rotate(144)" }),
              /* @__PURE__ */ jsx("use", { xlinkHref: "#hole", transform: "rotate(216)" }),
              /* @__PURE__ */ jsx("use", { xlinkHref: "#hole", transform: "rotate(288)" })
            ] })
          ] })
        }
      ) })
    }
  ) });
}
function MySkills() {
  return /* @__PURE__ */ jsx("div", { className: "h-screen w-screen", children: /* @__PURE__ */ jsxs("div", { className: "h-full w-full flex flex-col items-center justify-center", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx("h1", { className: "about-me-title text-6xl", children: "My Skills" }) }),
    /* @__PURE__ */ jsxs(
      Carousel,
      {
        className: "w-3/4 mx-auto shadow-inner rounded-lg dark:bg-neutral-800 bg-gray-100 p-1",
        opts: { align: "center" },
        children: [
          /* @__PURE__ */ jsxs(CarouselContent, { className: "h-[500px] w-full mx-2", children: [
            /* @__PURE__ */ jsx(CarouselItem, { className: "md:basis-1/2 lg:basis-1/3 xl:basis-1/4", children: /* @__PURE__ */ jsx(TypeScript, {}) }),
            /* @__PURE__ */ jsx(CarouselItem, { className: "md:basis-1/2 lg:basis-1/3 xl:basis-1/4", children: /* @__PURE__ */ jsx(ReactCard, {}) }),
            /* @__PURE__ */ jsx(CarouselItem, { className: "md:basis-1/2 lg:basis-1/3 xl:basis-1/4", children: /* @__PURE__ */ jsx(Tailwind, {}) }),
            /* @__PURE__ */ jsx(CarouselItem, { className: "md:basis-1/2 lg:basis-1/3 xl:basis-1/4", children: /* @__PURE__ */ jsx(NextJs, {}) }),
            /* @__PURE__ */ jsx(CarouselItem, { className: "md:basis-1/2 lg:basis-1/3 xl:basis-1/4", children: /* @__PURE__ */ jsx(Vue, {}) }),
            /* @__PURE__ */ jsx(CarouselItem, { className: "md:basis-1/2 lg:basis-1/3 xl:basis-1/4", children: /* @__PURE__ */ jsx(Postgresql, {}) }),
            /* @__PURE__ */ jsx(CarouselItem, { className: "md:basis-1/2 lg:basis-1/3 xl:basis-1/4", children: /* @__PURE__ */ jsx(Prisma, {}) }),
            /* @__PURE__ */ jsx(CarouselItem, { className: "md:basis-1/2 lg:basis-1/3 xl:basis-1/4", children: /* @__PURE__ */ jsx(Bash, {}) }),
            /* @__PURE__ */ jsx(CarouselItem, { className: "md:basis-1/2 lg:basis-1/3 xl:basis-1/4", children: /* @__PURE__ */ jsx(Python, {}) }),
            /* @__PURE__ */ jsx(CarouselItem, { className: "md:basis-1/2 lg:basis-1/3 xl:basis-1/4", children: /* @__PURE__ */ jsx(Rust, {}) }),
            /* @__PURE__ */ jsx(CarouselItem, { className: "md:basis-1/2 lg:basis-1/3 xl:basis-1/4", children: /* @__PURE__ */ jsx(Java, {}) }),
            /* @__PURE__ */ jsx(CarouselItem, { className: "md:basis-1/2 lg:basis-1/3 xl:basis-1/4", children: /* @__PURE__ */ jsx(Git, {}) }),
            /* @__PURE__ */ jsx(CarouselItem, { className: "md:basis-1/2 lg:basis-1/3 xl:basis-1/4", children: /* @__PURE__ */ jsx(GitHub, {}) })
          ] }),
          /* @__PURE__ */ jsx(CarouselNext, { className: "dark:bg-neutral-500 dark:border-neutral-500" }),
          /* @__PURE__ */ jsx(CarouselPrevious, { className: "dark:bg-neutral-500 dark:border-neutral-500" })
        ]
      }
    )
  ] }) });
}
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = LabelPrimitive.Root.displayName;
const Form = FormProvider;
const FormFieldContext = React.createContext(
  {}
);
const FormField = ({
  ...props
}) => {
  return /* @__PURE__ */ jsx(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ jsx(Controller, { ...props }) });
};
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();
  const fieldState = getFieldState(fieldContext.name, formState);
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  const { id } = itemContext;
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
};
const FormItemContext = React.createContext(
  {}
);
const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  const id = React.useId();
  return /* @__PURE__ */ jsx(FormItemContext.Provider, { value: { id }, children: /* @__PURE__ */ jsx("div", { ref, className: cn("space-y-2", className), ...props }) });
});
FormItem.displayName = "FormItem";
const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ jsx(
    Label,
    {
      ref,
      className: cn(error && "text-destructive", className),
      htmlFor: formItemId,
      ...props
    }
  );
});
FormLabel.displayName = "FormLabel";
const FormControl = React.forwardRef(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return /* @__PURE__ */ jsx(
    Slot,
    {
      ref,
      id: formItemId,
      "aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
      "aria-invalid": !!error,
      ...props
    }
  );
});
FormControl.displayName = "FormControl";
const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();
  return /* @__PURE__ */ jsx(
    "p",
    {
      ref,
      id: formDescriptionId,
      className: cn("text-[0.8rem] text-muted-foreground", className),
      ...props
    }
  );
});
FormDescription.displayName = "FormDescription";
const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error == null ? void 0 : error.message) : children;
  if (!body) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "p",
    {
      ref,
      id: formMessageId,
      className: cn("text-[0.8rem] font-medium text-destructive", className),
      ...props,
      children: body
    }
  );
});
FormMessage.displayName = "FormMessage";
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverContent = React.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  PopoverPrimitive.Content,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
function Calendar$1({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DayPicker,
    {
      showOutsideDays,
      className: cn("p-3", className),
      classNames: {
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range" ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md" : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames
      },
      components: {
        IconLeft: ({ ...props2 }) => /* @__PURE__ */ jsx(ChevronLeftIcon, { className: "h-4 w-4" }),
        IconRight: ({ ...props2 }) => /* @__PURE__ */ jsx(ChevronRightIcon, { className: "h-4 w-4" })
      },
      ...props
    }
  );
}
Calendar$1.displayName = "Calendar";
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(CaretSortIcon, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUpIcon, {})
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDownIcon, {})
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
function isValidHour(value) {
  return /^(0[0-9]|1[0-9]|2[0-3])$/.test(value);
}
function isValid12Hour(value) {
  return /^(0[1-9]|1[0-2])$/.test(value);
}
function isValidMinuteOrSecond(value) {
  return /^[0-5][0-9]$/.test(value);
}
function getValidNumber(value, { max, min = 0, loop = false }) {
  let numericValue = parseInt(value, 10);
  if (!Number.isNaN(numericValue)) {
    if (!loop) {
      if (numericValue > max) numericValue = max;
      if (numericValue < min) numericValue = min;
    } else {
      if (numericValue > max) numericValue = min;
      if (numericValue < min) numericValue = max;
    }
    return numericValue.toString().padStart(2, "0");
  }
  return "00";
}
function getValidHour(value) {
  if (isValidHour(value)) return value;
  return getValidNumber(value, { max: 23 });
}
function getValid12Hour(value) {
  if (isValid12Hour(value)) return value;
  return getValidNumber(value, { min: 1, max: 12 });
}
function getValidMinuteOrSecond(value) {
  if (isValidMinuteOrSecond(value)) return value;
  return getValidNumber(value, { max: 59 });
}
function getValidArrowNumber(value, { min, max, step }) {
  let numericValue = parseInt(value, 10);
  if (!Number.isNaN(numericValue)) {
    numericValue += step;
    return getValidNumber(String(numericValue), { min, max, loop: true });
  }
  return "00";
}
function getValidArrowHour(value, step) {
  return getValidArrowNumber(value, { min: 0, max: 23, step });
}
function getValidArrow12Hour(value, step) {
  return getValidArrowNumber(value, { min: 1, max: 12, step });
}
function getValidArrowMinuteOrSecond(value, step) {
  return getValidArrowNumber(value, { min: 0, max: 59, step });
}
function setMinutes(date, value) {
  const minutes = getValidMinuteOrSecond(value);
  date.setMinutes(parseInt(minutes, 10));
  return date;
}
function setSeconds(date, value) {
  const seconds = getValidMinuteOrSecond(value);
  date.setSeconds(parseInt(seconds, 10));
  return date;
}
function setHours(date, value) {
  const hours = getValidHour(value);
  date.setHours(parseInt(hours, 10));
  return date;
}
function set12Hours(date, value, period) {
  const hours = parseInt(getValid12Hour(value), 10);
  const convertedHours = convert12HourTo24Hour(hours, period);
  date.setHours(convertedHours);
  return date;
}
function setDateByType(date, value, type, period) {
  switch (type) {
    case "minutes":
      return setMinutes(date, value);
    case "seconds":
      return setSeconds(date, value);
    case "hours":
      return setHours(date, value);
    case "12hours": {
      if (!period) return date;
      return set12Hours(date, value, period);
    }
    default:
      return date;
  }
}
function getDateByType(date, type) {
  if (!date) return "00";
  switch (type) {
    case "minutes":
      return getValidMinuteOrSecond(String(date.getMinutes()));
    case "seconds":
      return getValidMinuteOrSecond(String(date.getSeconds()));
    case "hours":
      return getValidHour(String(date.getHours()));
    case "12hours":
      return getValid12Hour(String(display12HourValue(date.getHours())));
    default:
      return "00";
  }
}
function getArrowByType(value, step, type) {
  switch (type) {
    case "minutes":
      return getValidArrowMinuteOrSecond(value, step);
    case "seconds":
      return getValidArrowMinuteOrSecond(value, step);
    case "hours":
      return getValidArrowHour(value, step);
    case "12hours":
      return getValidArrow12Hour(value, step);
    default:
      return "00";
  }
}
function convert12HourTo24Hour(hour, period) {
  if (period === "PM") {
    if (hour <= 11) {
      return hour + 12;
    }
    return hour;
  }
  if (period === "AM") {
    if (hour === 12) return 0;
    return hour;
  }
  return hour;
}
function display12HourValue(hours) {
  if (hours === 0 || hours === 12) return "12";
  if (hours >= 22) return `${hours - 12}`;
  if (hours % 12 > 9) return `${hours}`;
  return `0${hours % 12}`;
}
function genMonths(locale) {
  return Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: format(new Date(2021, i), "MMMM", { locale })
  }));
}
function genYears(yearRange = 50) {
  const today = /* @__PURE__ */ new Date();
  return Array.from({ length: yearRange * 2 + 1 }, (_, i) => ({
    value: today.getFullYear() - yearRange + i,
    label: (today.getFullYear() - yearRange + i).toString()
  }));
}
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  yearRange = 50,
  ...props
}) {
  const MONTHS = React.useMemo(() => {
    let locale = enUS;
    const { options, localize, formatLong } = props.locale || {};
    if (options && localize && formatLong) {
      locale = {
        options,
        localize,
        formatLong
      };
    }
    return genMonths(locale);
  }, []);
  const YEARS = React.useMemo(() => genYears(yearRange), []);
  return /* @__PURE__ */ jsx(
    DayPicker,
    {
      showOutsideDays,
      className: cn("p-3", className),
      classNames: {
        months: "flex flex-col sm:flex-row space-y-4  sm:space-y-0 justify-center",
        month: "flex flex-col items-center space-y-4",
        month_caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center ",
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-5 top-5"
        ),
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-5 top-5"
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: cn("flex", props.showWeekNumber && "justify-end"),
        weekday: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        week: "flex w-full mt-2",
        day: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 rounded-1",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-l-md rounded-r-md"
        ),
        range_end: "day-range-end",
        selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-l-md rounded-r-md",
        today: "bg-accent text-accent-foreground",
        outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        disabled: "text-muted-foreground opacity-50",
        range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        hidden: "invisible",
        ...classNames
      },
      components: {
        Chevron: ({ ...props2 }) => props2.orientation === "left" ? /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" }),
        MonthCaption: ({ calendarMonth }) => {
          return /* @__PURE__ */ jsxs("div", { className: "inline-flex gap-2", children: [
            /* @__PURE__ */ jsxs(
              Select,
              {
                defaultValue: calendarMonth.date.getMonth().toString(),
                onValueChange: (value) => {
                  var _a;
                  const newDate = new Date(calendarMonth.date);
                  newDate.setMonth(Number.parseInt(value, 10));
                  (_a = props.onMonthChange) == null ? void 0 : _a.call(props, newDate);
                },
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { className: "w-fit gap-1 border-none p-0 focus:bg-accent focus:text-accent-foreground", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsx(SelectContent, { children: MONTHS.map((month) => /* @__PURE__ */ jsx(
                    SelectItem,
                    {
                      value: month.value.toString(),
                      children: month.label
                    },
                    month.value
                  )) })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              Select,
              {
                defaultValue: calendarMonth.date.getFullYear().toString(),
                onValueChange: (value) => {
                  var _a;
                  const newDate = new Date(calendarMonth.date);
                  newDate.setFullYear(Number.parseInt(value, 10));
                  (_a = props.onMonthChange) == null ? void 0 : _a.call(props, newDate);
                },
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { className: "w-fit gap-1 border-none p-0 focus:bg-accent focus:text-accent-foreground", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsx(SelectContent, { children: YEARS.map((year) => /* @__PURE__ */ jsx(SelectItem, { value: year.value.toString(), children: year.label }, year.value)) })
                ]
              }
            )
          ] });
        }
      },
      ...props
    }
  );
}
Calendar.displayName = "Calendar";
const TimePeriodSelect = React.forwardRef(
  ({ period, setPeriod, date, onDateChange, onLeftFocus, onRightFocus }, ref) => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") onRightFocus == null ? void 0 : onRightFocus();
      if (e.key === "ArrowLeft") onLeftFocus == null ? void 0 : onLeftFocus();
    };
    const handleValueChange = (value) => {
      setPeriod == null ? void 0 : setPeriod(value);
      if (date) {
        const tempDate = new Date(date);
        const hours = display12HourValue(date.getHours());
        onDateChange == null ? void 0 : onDateChange(
          setDateByType(
            tempDate,
            hours.toString(),
            "12hours",
            period === "AM" ? "PM" : "AM"
          )
        );
      }
    };
    return /* @__PURE__ */ jsx("div", { className: "flex h-10 items-center", children: /* @__PURE__ */ jsxs(
      Select,
      {
        defaultValue: period,
        onValueChange: (value) => handleValueChange(value),
        children: [
          /* @__PURE__ */ jsx(
            SelectTrigger,
            {
              ref,
              className: "w-[65px] focus:bg-accent focus:text-accent-foreground",
              onKeyDown: handleKeyDown,
              children: /* @__PURE__ */ jsx(SelectValue, {})
            }
          ),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "AM", children: "AM" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "PM", children: "PM" })
          ] })
        ]
      }
    ) });
  }
);
TimePeriodSelect.displayName = "TimePeriodSelect";
const TimePickerInput = React.forwardRef(
  ({
    className,
    type = "tel",
    value,
    id,
    name,
    date = new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0)),
    onDateChange,
    onChange,
    onKeyDown,
    picker,
    period,
    onLeftFocus,
    onRightFocus,
    ...props
  }, ref) => {
    const [flag, setFlag] = React.useState(false);
    const [prevIntKey, setPrevIntKey] = React.useState("0");
    React.useEffect(() => {
      if (flag) {
        const timer = setTimeout(() => {
          setFlag(false);
        }, 2e3);
        return () => clearTimeout(timer);
      }
    }, [flag]);
    const calculatedValue = React.useMemo(() => {
      return getDateByType(date, picker);
    }, [date, picker]);
    const calculateNewValue = (key) => {
      if (picker === "12hours") {
        if (flag && calculatedValue.slice(1, 2) === "1" && prevIntKey === "0")
          return `0${key}`;
      }
      return !flag ? `0${key}` : calculatedValue.slice(1, 2) + key;
    };
    const handleKeyDown = (e) => {
      if (e.key === "Tab") return;
      e.preventDefault();
      if (e.key === "ArrowRight") onRightFocus == null ? void 0 : onRightFocus();
      if (e.key === "ArrowLeft") onLeftFocus == null ? void 0 : onLeftFocus();
      if (["ArrowUp", "ArrowDown"].includes(e.key)) {
        const step = e.key === "ArrowUp" ? 1 : -1;
        const newValue = getArrowByType(calculatedValue, step, picker);
        if (flag) setFlag(false);
        const tempDate = date ? new Date(date) : /* @__PURE__ */ new Date();
        onDateChange == null ? void 0 : onDateChange(setDateByType(tempDate, newValue, picker, period));
      }
      if (e.key >= "0" && e.key <= "9") {
        if (picker === "12hours") setPrevIntKey(e.key);
        const newValue = calculateNewValue(e.key);
        if (flag) onRightFocus == null ? void 0 : onRightFocus();
        setFlag((prev) => !prev);
        const tempDate = date ? new Date(date) : /* @__PURE__ */ new Date();
        onDateChange == null ? void 0 : onDateChange(setDateByType(tempDate, newValue, picker, period));
      }
    };
    return /* @__PURE__ */ jsx(
      Input,
      {
        ref,
        id: id || picker,
        name: name || picker,
        className: cn(
          "w-[48px] text-center font-mono text-base tabular-nums caret-transparent focus:bg-accent focus:text-accent-foreground [&::-webkit-inner-spin-button]:appearance-none",
          className
        ),
        value: value || calculatedValue,
        onChange: (e) => {
          e.preventDefault();
          onChange == null ? void 0 : onChange(e);
        },
        type,
        inputMode: "decimal",
        onKeyDown: (e) => {
          onKeyDown == null ? void 0 : onKeyDown(e);
          handleKeyDown(e);
        },
        ...props
      }
    );
  }
);
TimePickerInput.displayName = "TimePickerInput";
const TimePicker = React.forwardRef(
  ({ date, onChange, hourCycle = 24, granularity = "second" }, ref) => {
    const minuteRef = React.useRef(null);
    const hourRef = React.useRef(null);
    const secondRef = React.useRef(null);
    const periodRef = React.useRef(null);
    const [period, setPeriod] = React.useState(
      date && date.getHours() >= 12 ? "PM" : "AM"
    );
    useImperativeHandle(
      ref,
      () => ({
        minuteRef: minuteRef.current,
        hourRef: hourRef.current,
        secondRef: secondRef.current,
        periodRef: periodRef.current
      }),
      [minuteRef, hourRef, secondRef]
    );
    return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "datetime-picker-hour-input", className: "cursor-pointer", children: /* @__PURE__ */ jsx(Clock, { className: "mr-2 h-4 w-4" }) }),
      /* @__PURE__ */ jsx(
        TimePickerInput,
        {
          picker: hourCycle === 24 ? "hours" : "12hours",
          date,
          id: "datetime-picker-hour-input",
          onDateChange: onChange,
          ref: hourRef,
          period,
          onRightFocus: () => {
            var _a;
            return (_a = minuteRef == null ? void 0 : minuteRef.current) == null ? void 0 : _a.focus();
          }
        }
      ),
      (granularity === "minute" || granularity === "second") && /* @__PURE__ */ jsxs(Fragment, { children: [
        ":",
        /* @__PURE__ */ jsx(
          TimePickerInput,
          {
            picker: "minutes",
            date,
            onDateChange: onChange,
            ref: minuteRef,
            onLeftFocus: () => {
              var _a;
              return (_a = hourRef == null ? void 0 : hourRef.current) == null ? void 0 : _a.focus();
            },
            onRightFocus: () => {
              var _a;
              return (_a = secondRef == null ? void 0 : secondRef.current) == null ? void 0 : _a.focus();
            }
          }
        )
      ] }),
      granularity === "second" && /* @__PURE__ */ jsxs(Fragment, { children: [
        ":",
        /* @__PURE__ */ jsx(
          TimePickerInput,
          {
            picker: "seconds",
            date,
            onDateChange: onChange,
            ref: secondRef,
            onLeftFocus: () => {
              var _a;
              return (_a = minuteRef == null ? void 0 : minuteRef.current) == null ? void 0 : _a.focus();
            },
            onRightFocus: () => {
              var _a;
              return (_a = periodRef == null ? void 0 : periodRef.current) == null ? void 0 : _a.focus();
            }
          }
        )
      ] }),
      hourCycle === 12 && /* @__PURE__ */ jsx("div", { className: "grid gap-1 text-center", children: /* @__PURE__ */ jsx(
        TimePeriodSelect,
        {
          period,
          setPeriod,
          date,
          onDateChange: (date2) => {
            onChange == null ? void 0 : onChange(date2);
            if (date2 && (date2 == null ? void 0 : date2.getHours()) >= 12) {
              setPeriod("PM");
            } else {
              setPeriod("AM");
            }
          },
          ref: periodRef,
          onLeftFocus: () => {
            var _a;
            return (_a = secondRef == null ? void 0 : secondRef.current) == null ? void 0 : _a.focus();
          }
        }
      ) })
    ] });
  }
);
TimePicker.displayName = "TimePicker";
const DateTimePicker = React.forwardRef(
  ({
    locale = enUS,
    value,
    onChange,
    hourCycle = 24,
    yearRange = 50,
    disabled = false,
    displayFormat,
    granularity = "second",
    placeholder = "Pick a date",
    className,
    ...props
  }, ref) => {
    const [month, setMonth] = React.useState(value ?? /* @__PURE__ */ new Date());
    const buttonRef = useRef(null);
    const handleSelect = (newDay) => {
      if (!newDay) return;
      if (!value) {
        onChange == null ? void 0 : onChange(newDay);
        setMonth(newDay);
        return;
      }
      const diff = newDay.getTime() - value.getTime();
      const diffInDays = diff / (1e3 * 60 * 60 * 24);
      const newDateFull = add(value, { days: Math.ceil(diffInDays) });
      onChange == null ? void 0 : onChange(newDateFull);
      setMonth(newDateFull);
    };
    useImperativeHandle(
      ref,
      () => ({
        ...buttonRef.current,
        value
      }),
      [value]
    );
    const initHourFormat = {
      hour24: (displayFormat == null ? void 0 : displayFormat.hour24) ?? `PPP HH:mm${!granularity || granularity === "second" ? ":ss" : ""}`,
      hour12: (displayFormat == null ? void 0 : displayFormat.hour12) ?? `PP hh:mm${!granularity || granularity === "second" ? ":ss" : ""} b`
    };
    let loc = enUS;
    const { options, localize, formatLong } = locale;
    if (options && localize && formatLong) {
      loc = {
        ...enUS,
        options,
        localize,
        formatLong
      };
    }
    return /* @__PURE__ */ jsxs(Popover, { children: [
      /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, disabled, children: /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "outline",
          className: cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          ),
          ref: buttonRef,
          children: [
            /* @__PURE__ */ jsx(Calendar$2, { className: "mr-2 h-4 w-4" }),
            value ? format(
              value,
              hourCycle === 24 ? initHourFormat.hour24 : initHourFormat.hour12,
              {
                locale: loc
              }
            ) : /* @__PURE__ */ jsx("span", { children: placeholder })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxs(PopoverContent, { className: "w-auto p-0", children: [
        /* @__PURE__ */ jsx(
          Calendar,
          {
            mode: "single",
            selected: value,
            month,
            onSelect: (d) => handleSelect(d),
            onMonthChange: handleSelect,
            yearRange,
            locale,
            ...props
          }
        ),
        granularity !== "day" && /* @__PURE__ */ jsx("div", { className: "border-t border-border p-3", children: /* @__PURE__ */ jsx(
          TimePicker,
          {
            onChange,
            date: value,
            hourCycle,
            granularity
          }
        ) })
      ] })
    ] });
  }
);
DateTimePicker.displayName = "DateTimePicker";
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action2) => {
  switch (action2.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action2.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === action2.toast.id ? { ...t, ...action2.toast } : t
        )
      };
    case "DISMISS_TOAST": {
      const { toastId } = action2;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action2.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action2.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action2) {
  memoryState = reducer(memoryState, action2);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}
const now = Date.now();
const tomorrow = Date.now() + 86400;
const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  scheduleDate: z.date({
    message: "Please select a date and time",
    required_error: "Please select a date and time.",
    invalid_type_error: "Not a valid date"
  }).min(new Date(now + 86400), { message: "Must be in the future" }),
  scheduleTime: z.date({ message: "Please input a time!" }).min(new Date((/* @__PURE__ */ new Date()).setHours(8, 0, 0, 0)), { message: "Must be after 8:00am!" }).max(new Date((/* @__PURE__ */ new Date()).setHours(20, 0, 0, 0)), { message: "Must be before 8:00pm!" })
});
function ScheduleMe() {
  const { toast: toast2 } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      scheduleDate: new Date(tomorrow),
      scheduleTime: new Date((/* @__PURE__ */ new Date()).setHours(9, 0, 0, 0))
    }
  });
  async function onSubmit(values) {
    console.log("triggered");
    const res = await fetch("/schedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });
    if (res.ok) {
      toast2({
        title: "Success 🎉",
        description: "You have successfully booked an appointment with me!",
        className: "bg-[#4bb543]",
        duration: 2e3
      });
      form.reset();
    }
  }
  return /* @__PURE__ */ jsx("div", { className: "h-screen w-screen", children: /* @__PURE__ */ jsx("div", { className: "h-full w-full flex items-center justify-center", children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: "shadow-2xl rounded-xl p-8 dark:bg-neutral-800 w-11/12 sm:w-2/3 lg:w-2/5 md:w-3/5",
      children: [
        /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx("h1", { className: "about-me-title text-3xl mb-2", children: "Schedule Me" }) }),
        /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-6", children: [
          /* @__PURE__ */ jsx(
            FormField,
            {
              control: form.control,
              name: "firstName",
              render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
                /* @__PURE__ */ jsx(FormLabel, { children: "First Name" }),
                /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    ...field,
                    placeholder: "Bob",
                    className: "dark:border-neutral-600 dark:text-neutral-400"
                  }
                ) }),
                /* @__PURE__ */ jsx(FormMessage, {})
              ] })
            }
          ),
          /* @__PURE__ */ jsx(
            FormField,
            {
              control: form.control,
              name: "lastName",
              render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
                /* @__PURE__ */ jsx(FormLabel, { children: "Last Name" }),
                /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    ...field,
                    placeholder: "Lazar",
                    className: "dark:border-neutral-600 dark:text-neutral-400"
                  }
                ) }),
                /* @__PURE__ */ jsx(FormMessage, {})
              ] })
            }
          ),
          /* @__PURE__ */ jsx(
            FormField,
            {
              control: form.control,
              name: "email",
              render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
                /* @__PURE__ */ jsx(FormLabel, { children: "Email" }),
                /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    ...field,
                    placeholder: "boblazar@losalamos.com",
                    className: "dark:border-neutral-600 dark:text-neutral-400"
                  }
                ) }),
                /* @__PURE__ */ jsx(FormMessage, {})
              ] })
            }
          ),
          /* @__PURE__ */ jsx(
            FormField,
            {
              control: form.control,
              name: "scheduleDate",
              render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { className: "flex flex-col", children: [
                /* @__PURE__ */ jsx(FormLabel, { children: "Meeting Date" }),
                /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsxs(Popover, { children: [
                  /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
                    Button,
                    {
                      variant: "outline",
                      className: cn(
                        "w-full justify-start text-left font-normal dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-400",
                        !field.value && "text-muted-foreground"
                      ),
                      children: [
                        /* @__PURE__ */ jsx(CalendarIcon, { className: "mr-2 h-4 w-4" }),
                        field.value ? format(field.value, "PPP") : /* @__PURE__ */ jsx("span", { children: "Pick a date" })
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsx(PopoverContent, { className: "w-auto p-0", children: /* @__PURE__ */ jsx(
                    Calendar$1,
                    {
                      className: "dark:bg-neutral-700 dark:text-neutral-400",
                      mode: "single",
                      selected: field.value,
                      onSelect: field.onChange,
                      disabled: (date) => date <= /* @__PURE__ */ new Date()
                    }
                  ) })
                ] }) }),
                /* @__PURE__ */ jsx(FormMessage, {})
              ] })
            }
          ),
          /* @__PURE__ */ jsx(
            FormField,
            {
              control: form.control,
              name: "scheduleTime",
              render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
                /* @__PURE__ */ jsx("div", { className: "w-full text-center", children: /* @__PURE__ */ jsx(FormLabel, { children: "Meeting Time" }) }),
                /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                  TimePicker,
                  {
                    date: field.value,
                    granularity: "minute",
                    onChange: field.onChange,
                    hourCycle: 12
                  }
                ) }),
                /* @__PURE__ */ jsx(FormMessage, {})
              ] })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(Button, { className: "dark:bg-white dark:text-black", type: "submit", children: "Submit" }) })
        ] }) })
      ]
    }
  ) }) });
}
const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    ToastPrimitives.Root,
    {
      ref,
      className: cn(toastVariants({ variant }), className),
      ...props
    }
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(Cross2Icon, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Title,
  {
    ref,
    className: cn("text-sm font-semibold [&+div]:text-xs", className),
    ...props
  }
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Description,
  {
    ref,
    className: cn("text-sm opacity-90", className),
    ...props
  }
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;
function Toaster() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action: action2, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action2,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}
async function loader({ request }) {
  const { getTheme } = await themeSessionResolver(request);
  return { theme: getTheme() };
}
const links = () => [
  { rel: "stylesheet", href: styles },
  ...cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []
];
function AppWithProviders() {
  const data = useLoaderData();
  return /* @__PURE__ */ jsx(ThemeProvider, { specifiedTheme: data.theme, themeAction: "/action/set-theme", children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsx(App, {}) }) });
}
function App() {
  const data = useLoaderData();
  const [theme] = useTheme();
  return /* @__PURE__ */ jsxs("html", { suppressHydrationWarning: true, className: clsx$1(theme), children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("link", { rel: "icon", href: "data:image/x-icon;base64,AA" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("title", { children: "Bryan Hughes" }),
      /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://fonts.googleapis.com" }),
      /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://fonts.gstatic.com" }),
      /* @__PURE__ */ jsx(
        "link",
        {
          href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap",
          rel: "stylesheet"
        }
      ),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(PreventFlashOnWrongTheme, { ssrTheme: Boolean(data.theme) }),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsxs("main", { className: "h-screen w-screen", children: [
        /* @__PURE__ */ jsx(TitleCard, {}),
        /* @__PURE__ */ jsx(AboutMe, {}),
        /* @__PURE__ */ jsx(MySkills, {}),
        /* @__PURE__ */ jsx(ScheduleMe, {})
      ] }),
      /* @__PURE__ */ jsx(Toaster, {}),
      /* @__PURE__ */ jsx(ModeToggle, {}),
      /* @__PURE__ */ jsx(Outlet, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  App,
  default: AppWithProviders,
  links,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const action$1 = createThemeAction(themeSessionResolver);
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1
}, Symbol.toStringTag, { value: "Module" }));
const action = async ({ request }) => {
  switch (request.method) {
    case "POST": {
      console.log(await request.json());
      return json({ success: true }, 200);
    }
  }
};
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-jpr-gPnM.js", "imports": ["/assets/components-CWp0n1aF.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-DEICigaU.js", "imports": ["/assets/components-CWp0n1aF.js"], "css": [] }, "routes/action.set-theme": { "id": "routes/action.set-theme", "parentId": "root", "path": "action/set-theme", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/action.set-theme-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/schedule": { "id": "routes/schedule", "parentId": "root", "path": "schedule", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/schedule-l0sNRNKZ.js", "imports": [], "css": [] } }, "url": "/assets/manifest-f7792908.js", "version": "f7792908" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false, "unstable_singleFetch": false, "unstable_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/action.set-theme": {
    id: "routes/action.set-theme",
    parentId: "root",
    path: "action/set-theme",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/schedule": {
    id: "routes/schedule",
    parentId: "root",
    path: "schedule",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
