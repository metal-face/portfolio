import { ReactElement } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
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

const now: number = Date.now();

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
});

export default function qScheduleMe(): ReactElement {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            scheduleDate: new Date(now + 86400),
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);

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
                <div className={"shadow-2xl rounded-xl p-8"}>
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
                                                    "dark:border-neutral-400 dark:text-neutral-400"
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
                                                    "dark:border-neutral-400 dark:text-neutral-400"
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
                                                    "dark:border-neutral-400 dark:text-neutral-400"
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
                                        <FormLabel>Meeting Time</FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[280px] justify-start text-left font-normal dark:bg-[#1a1a1a] dark:border-neutral-400 dark:text-neutral-400",
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
                            <div className={"flex justify-end"}>
                                <Button type={"submit"}>Submit</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}
