import Fastify, { FastifyInstance } from "fastify";
import type { AppLoadContext, ServerBuild } from "@remix-run/node";
import { get, IncomingHttpHeaders, IncomingMessage, ServerResponse } from "http";

import {
    createRequestHandler as createRemixRequestHandler,
    writeReadableStreamToWritable,
} from "@remix-run/node";

const fastify: FastifyInstance = Fastify({
    logger: true,
});

/**
 * A function that returns the value to use as `context` in route `loader` and
 * `action` functions.
 *
 * You can think of this as an escape hatch that allows you to pass
 * environment/platform-specific values through to your loader/action.
 */
export type GetLoadContextFunction = (req: Request) => AppLoadContext;

export type RequestHandler = (req: IncomingMessage, res: ServerResponse) => Promise<void>;

export function createRequestHandler({
    build,
    getLoadContext,
    mode = process.env.NODE_ENV,
}: {
    build: ServerBuild;
    getLoadContext?: GetLoadContextFunction;
    mode?: string;
}): RequestHandler {
    let handleRequest = createRemixRequestHandler(build, mode);

    return async (req, res) => {
        let request = createRemixRequest(req, res);
        let loadContext = getLoadContext?.(request)

        let response = await handleRequest(request, loadContext);

        await sendRemixResponse(res, response);
    };
}

function createRemixHeaders(requestHeaders: IncomingHttpHeaders): Headers {
    let headers = new Headers();

    for (let key in requestHeaders) {
        let header = requestHeaders[key]!;

        if (Array.isArray(header)) {
            for (let value of header) {
                headers.append(key, value);
            }
        } else {
            headers.append(key, header);
        }
    }

    return headers;
}

function createRemixRequest(req: IncomingMessage, res: ServerResponse): Request {
    let host = req.headers["x-forwarded-host"] || req.headers["host"];
    let protocol = req.headers["x-forwarded-proto"] || "https";
    let url = new URL(`${protocol}://${host}${req.url}`);

    let controller = new AbortController();
    res.on("close", () => controller.abort());

    let init: RequestInit = {
        method: req.method,
        headers: createRemixHeaders(req.headers),
        signal: controller.signal as RequestInit["signal"],
    };

    if (req.method !== "GET" && req.method !== "HEAD") {
        // @ts-expect-error
        init.body = req;
    }

    return new Request(url.href, init);
}

async function sendRemixResponse(res: ServerResponse, nodeResponse: Response): Promise<void> {
    res.statusMessage = nodeResponse.statusText;

    // @ts-expect-error
    let multiValueHeaders = nodeResponse.headers.raw();

    res.writeHead(
        nodeResponse.status,
        nodeResponse.statusText,
        multiValueHeaders
    )

    if (nodeResponse.body) {
        await writeReadableStreamToWritable(nodeResponse.body, res);
    } else {
        res.end();
    }
};

fastify.get("/", async function handler(request, reply) {
    return { hello: "world" };
});

try {
    await fastify.listen({ port: 3000 });
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
}
