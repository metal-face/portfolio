import nodemailer, { Transporter } from "nodemailer";
import { format } from "date-fns";
import { template } from "./template";

export const transporter: Transporter = nodemailer.createTransport({
    host: "bryanhughes.net",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export async function sendConfirmationMail(
    email: string,
    firstName: string,
    date: string,
    time: string,
): Promise<boolean> {
    const formattedDate = format(date, "PPPP");
    const formattedTime = format(time, "pp");
    try {
        let info = await transporter.sendMail({
            from: '"Bryan Hughes" <noreply@bryanhughes.net>',
            to: email,
            subject: "Meeting Confirmation",
            html: template(firstName, formattedDate, formattedTime),
        });

        if (info.accepted) {
            return true;
        }
    } catch (error) {
        console.error(error);
        return false;
    }

    return false;
}
