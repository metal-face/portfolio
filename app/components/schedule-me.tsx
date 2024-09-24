import { ReactElement } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "~/components/ui/calendar";
import { TimePicker } from "~/components/ui/date-time-picker";

const now: number = Date.now();
const tomorrow: number = Date.now() + 86400;

const formSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters."),
    lastName: z.string().min(2, "Last name must be at least 2 characters."),
    email: z.string().email("Invalid email address."),
    scheduleDate: z
        .date({
            message: "Please select a date and time",
            required_error: "Please select a date and time.",
            invalid_type_error: "Not a valid date",
        })
        .min(new Date(now + 86400), { message: "Must be in the future" }),
    scheduleTime: z
        .date({ message: "Please input a time!" })
        .min(new Date(new Date().setHours(8, 0, 0, 0)), { message: "Must be after 8:00am!" })
        .max(new Date(new Date().setHours(20, 0, 0, 0)), { message: "Must be before 8:00pm!" }),
});

export default function ScheduleMe(): ReactElement {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            scheduleDate: new Date(tomorrow),
            scheduleTime: new Date(new Date().setHours(9, 0, 0, 0)),
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res = await fetch("/schedule", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        if (res.ok) {
            console.log("success");
        }
    }

    return (
        <div className={"h-screen w-screen"}>
            <div className={"h-full w-full flex items-center justify-center"}>
                <div className={"shadow-2xl rounded-xl p-8 dark:bg-neutral-800"}>
                    <div className={"text-center"}>
                        <h1 className={"about-me-title text-3xl mb-2"}>Schedule Me</h1>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-6"}>
                            <FormField
                                control={form.control}
                                name={"firstName"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder={"Bob"}
                                                className={
                                                    "dark:border-neutral-600 dark:text-neutral-400"
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={"lastName"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder={"Lazar"}
                                                className={
                                                    "dark:border-neutral-600 dark:text-neutral-400"
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={"email"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder={"boblazar@losalamos.com"}
                                                className={
                                                    "dark:border-neutral-600 dark:text-neutral-400"
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={"scheduleDate"}
                                render={({ field }) => (
                                    <FormItem className={"flex flex-col"}>
                                        <FormLabel>Meeting Date</FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[280px] justify-start text-left font-normal dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-400",
                                                            !field.value && "text-muted-foreground",
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        className={
                                                            "dark:bg-neutral-700 dark:text-neutral-400"
                                                        }
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) => date <= new Date()}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={"scheduleTime"}
                                render={({ field }) => (
                                    <FormItem>
                                        <div className={"w-full text-center"}>
                                            <FormLabel>Meeting Time</FormLabel>
                                        </div>
                                        <FormControl>
                                            <TimePicker
                                                date={field.value}
                                                granularity={"minute"}
                                                onChange={field.onChange}
                                                hourCycle={12}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className={"flex justify-end"}>
                                <Button className={"dark:bg-white dark:text-black"} type={"submit"}>
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}
