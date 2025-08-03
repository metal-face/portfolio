import { useMutation } from "@tanstack/react-query";
import { Axios } from "~/axios";

interface Request {
    firstName: string;
    lastName: string;
    email: string;
    scheduleDate: Date;
    scheduleTime: string;
}

export default function useCreateAppointment() {
    return useMutation({
        mutationKey: ["create-appointment"],
        mutationFn: async ({ firstName, lastName, email, scheduleDate, scheduleTime }: Request) => {
            return await Axios({
                method: "POST",
                url: "/schedule",
                data: {
                    firstName,
                    lastName,
                    email,
                    scheduleDate,
                    scheduleTime,
                },
            });
        },
    });
}
