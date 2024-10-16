import nodemailer, { Transporter } from "nodemailer";
import { format } from "date-fns";
import { template } from "~/mail/template";
import { myTemplate } from "~/mail/my-template";
import XOAuth2 from "nodemailer/lib/xoauth2";

export const transporter: Transporter = nodemailer.createTransport({
    host: "bryanhughes.net",
    priority: "high",
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

transporter.on("error", (err: Error) => {
    console.log("❌ NODE MAILER ERROR: ", err);
});

transporter.on("token", (token: XOAuth2.Token) => {
    console.log(`Node Mailer Token: ${token}`);
});

transporter.on("idle", () => {
    console.log("Node Mailer IDLE");
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
        const confirmation = await transporter.sendMail({
            from: '"Bryan Hughes" <noreply@bryanhughes.net>',
            to: email,
            subject: "Meeting Confirmation",
            html: template(firstName, formattedDate, formattedTime),
        });

        const myConfirmation = await transporter.sendMail({
            from: '"Bryan Hughes" <noreply@bryanhughes.net>',
            to: "mail@bryanhughes.net",
            subject: "New Meeting Booked!",
            html: myTemplate("Bryan Hughes", firstName, email, date, time),
        });

        if (confirmation.accepted && myConfirmation.accepted) {
            return true;
        }
    } catch (error) {
        console.error(error);
        return false;
    }

    return false;
}
