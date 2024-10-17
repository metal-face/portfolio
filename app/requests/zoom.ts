import { Axios } from "~/axios";
import * as crypto from "node:crypto";
import { AxiosResponse } from "axios";

export interface MeetingProps {
    firstName: string;
    lastName: string;
    email: string;
    meetingDate: string;
}

export function scheduleMeeting({
    firstName,
    lastName,
    email,
    meetingDate,
}: MeetingProps): Promise<AxiosResponse> {
    return Axios({
        method: "POST",
        url: "https://api.zoom.us/v2/users/me/meetings",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${process.env.ZOOM_SECRET_TOKEN}`,
        },
        data: {
            host_email: "mail@bryanhughes.net",
            agenda: `A meeting with Bryan Hughes and ${firstName} ${lastName}`,
            topic: "Introductions",
            duration: 60,
            password: "test123",
            pre_schedule: true,
            schedule_for: email,
            settings: {
                allow_multiple_devices: false,
            },
            enforce_login: false,
            host_video: true,
            type: 2,
            start_time: meetingDate,
        },
    });
}
