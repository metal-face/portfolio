import { ActionFunctionArgs, json } from "@remix-run/node";
import { prisma } from "../../prisma";
import { formatISO, parseISO } from "date-fns";
import { z } from "zod";
import { emailQueue } from "~/queue/emailQueue";
import { sendConfirmationMail } from "~/mail";

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

const SUCCESS = 200;
const BAD_REQUEST = 400;
const CONFLICT = 409;
const SERVER_ERROR = 500;

export const action = async ({ request }: ActionFunctionArgs) => {
    switch (request.method) {
        case "POST": {
            const data: Request = (await request.json()) as Request;

            const validRequest = await serverSideSchema.safeParseAsync(data);

            if (!validRequest.success) {
                return json({ success: false, errors: validRequest.error.errors }, BAD_REQUEST);
            }

            const formattedDate: string = formatISO(parseISO(data.scheduleDate), {
                representation: "complete",
            });
            const formattedTime: string = formatISO(parseISO(data.scheduleTime), {
                representation: "complete",
            });

            const formattedData = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                scheduleDate: formattedDate,
                scheduleTime: formattedTime,
            };

            try {
                const res = await prisma.scheduleRequest.create({
                    data: formattedData,
                });

                if (res) {
                    // await emailQueue.add(
                    //     "sendConfirmationMail",
                    //     {
                    //         to: formattedData.email,
                    //         firstName: formattedData.firstName,
                    //         scheduleDate: formattedData.scheduleDate,
                    //         scheduleTime: formattedData.scheduleTime,
                    //     },
                    //     { attempts: 3, backoff: { type: "exponential", delay: 1000 } },
                    // );

                    await sendConfirmationMail(
                        formattedData.email,
                        formattedData.firstName,
                        formattedData.scheduleDate,
                        formattedData.scheduleTime,
                    );

                    return json({ success: true }, SUCCESS);
                }
            } catch (error: any) {
                if (error.code === "P2002") {
                    return json({ success: false }, CONFLICT);
                }
                return json({ success: false }, SERVER_ERROR);
            }
        }
    }
};
