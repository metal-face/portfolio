import { useMutation } from "@tanstack/react-query";
import { MeetingProps, scheduleMeeting } from "~/requests/zoom";
import { AxiosResponse } from "axios";
import { useToast } from "~/hooks/use-toast";

export default function useZoomMutation() {
    const { toast } = useToast();

    return useMutation({
        mutationKey: ["scheduleMeeting"],
        mutationFn: async ({
            firstName,
            lastName,
            email,
            meetingDate,
        }: MeetingProps): Promise<AxiosResponse> =>
            scheduleMeeting({ firstName, lastName, email, meetingDate }),
        onSuccess: async () => {
            toast({
                title: "Success 🎉",
                description: "You have successfully booked a zoom meeting!",
                className: "bg-green-500",
            });
        },
        onError: async () => {
            toast({
                title: "Oops! 😬",
                description: "Looks like something went wrong booking your meeting!",
                variant: "destructive",
            });
        },
    });
}
