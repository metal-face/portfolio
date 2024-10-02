import nodemailer, { Transporter } from "nodemailer";
import { format } from "date-fns";
import { template } from "~/mail/template";

export const transporter: Transporter = nodemailer.createTransport({
    host: "bryanhughes.net",
    port: 465,
    secure: true,
    logger: true,
    debug: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log(success, "Server is ready to send emails");
    }
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
        const info = await transporter.sendMail({
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
