import { ActionFunctionArgs, json } from "@remix-run/node";
import { prisma } from "../../prisma";
import { formatISO, parseISO } from "date-fns";
import { z } from "zod";

interface Request {
    firstName: string;
    lastName: string;
    email: string;
    scheduleDate: string;
    scheduleTime: string;
}

const serverSideSchema = z.object({
    firstName: z.string().min(2).max(30),
    lastName: z.string().min(2).max(30),
    email: z.string().email(),
    scheduleDate: z.string(),
    scheduleTime: z.string(),
});

export const action = async ({ request }: ActionFunctionArgs) => {
    switch (request.method) {
        case "POST": {
            const data: Request = (await request.json()) as Request;

            if (
                !data ||
                !data.firstName ||
                !data.lastName ||
                !data.email ||
                !data.scheduleDate ||
                !data.scheduleTime
            ) {
                return json({ success: false, ok: false }, 400);
            }

            const validRequest = await serverSideSchema.safeParseAsync(data);

            if (!validRequest.success) {
                return json({ success: false, ok: false }, 400);
            }

            const alreadyBooked = await prisma.scheduleRequest.findFirst({
                where: {
                    email: data.email,
                },
            });

            if (alreadyBooked) {
                return json({ success: false, ok: false }, 409);
            }

            const parsedISODate = parseISO(data.scheduleDate);
            const formattedDate = formatISO(parsedISODate, { representation: "complete" });

            const parsedISOTime = parseISO(data.scheduleTime);
            const formattedTime = formatISO(parsedISOTime, { representation: "complete" });

            const transformed = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                scheduleDate: formattedDate,
                scheduleTime: formattedTime,
            };

            try {
                const res = await prisma.scheduleRequest.create({
                    data: transformed,
                });

                if (res) {
                    return json({ success: true, ok: true }, 200);
                }
            } catch (error: any) {
                console.error(error);
                return json({ success: false, ok: false }, 500);
            }
        }
    }
};
