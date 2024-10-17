import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded";

export default function App() {
    const client = ZoomMtgEmbedded.createClient();

    const authEndpoint = ""; // http://localhost:4000
    const sdkKey = (process.env.ZOOM_SECRET_KEY as string) || "";
    const meetingNumber = "";
    const passWord = "";
    const role = 0;
    const userName = "React";
    const userEmail = "";
    const registrantToken = "";
    const zakToken = "";

    const getSignature: () => Promise<void> = async () => {
        try {
            const req = await fetch(authEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    method: meetingNumber,
                    role: role,
                }),
            });

            const res = await req.json();
            const signature = res.signature as string;
            await startMeeting(signature);
        } catch (e) {
            console.error(e);
        }
    };

    async function startMeeting(signature: string) {
        const meetingSDKElement: HTMLElement | undefined =
            document.getElementById("meetingSDKElement") || undefined;

        try {
            await client.init({
                zoomAppRoot: meetingSDKElement,
                language: "en-US",
                patchJsMedia: true,
                leaveOnPageUnload: true,
            });

            await client.join({
                signature: signature,
                sdkKey: sdkKey,
                meetingNumber: meetingNumber,
                password: passWord,
                userName: userName,
                userEmail: userEmail,
                tk: registrantToken,
                zak: zakToken,
            });

            console.log("Joined Successfully");
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <div id="meetingSDKElement">{/* Zoom Meeting SDK Component View Rendered Here */}</div>
            <button onClick={getSignature}>Join Meeting</button>
        </div>
    );
}
