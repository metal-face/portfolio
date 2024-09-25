import { ActionFunctionArgs, json } from "@remix-run/node";
import { prisma } from "../../prisma";
import type { ScheduleSchema } from "~/components/schedule-me";

export const action = async ({ request }: ActionFunctionArgs) => {
    switch (request.method) {
        case "POST": {
            const data = await request.json();
            console.log(data);
            return json({ success: true }, 200);
        }
    }
};
