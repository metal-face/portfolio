import { ActionFunctionArgs, json } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
    switch (request.method) {
        case "POST": {
            console.log(await request.json());
            return json({ success: true }, 200);
        }
    }
};
