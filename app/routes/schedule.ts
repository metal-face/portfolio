import { ActionFunctionArgs, json } from "@remix-run/node";
import { prisma } from "../../prisma";
import type { ScheduleSchema } from "~/components/schedule-me";
import { formSchema } from "~/components/schedule-me";
import { toZonedTime } from "date-fns-tz";
import { format } from "date-fns";

export const action = async ({ request }: ActionFunctionArgs) => {
    switch (request.method) {
        case "POST": {
            const data: ScheduleSchema = await request.json();

            console.log(data);

            const localTime = toZonedTime(
                data.scheduleTime,
                Intl.DateTimeFormat().resolvedOptions().timeZone,
            );

            console.log(localTime);

            const formattedTime = format(localTime, "yyyy-MM-dd HH:mm:ss");

            const transformed = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                scheduleDate: new Date(data.scheduleDate),
                scheduleTime: new Date(data.scheduleTime),
            };

            try {
                const isValid = await formSchema.safeParseAsync(transformed);

                // const res = await prisma.scheduleRequest.create({
                //     data: data,
                // });

                if (isValid) {
                    return json({ success: true }, 200);
                }
            } catch (error: any) {
                console.error(error);
                return json({ success: false }, 500);
            }
        }
    }
};
