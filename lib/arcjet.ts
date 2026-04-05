import arcjet, { detectBot, fixedWindow, shield } from "@arcjet/next";

export const aj = arcjet({
    key: process.env.ARCJET_KEY!,
    rules: [
        shield({
            mode: "LIVE",
        }),
        detectBot({
            mode: "LIVE",
            allow: [
                "CATEGORY:SEARCH_ENGINE",
            ],
        }),
        fixedWindow({
            mode: "LIVE",
            window: "1m",
            max: 10, // Max 10 requests per minute for protected routes
        }),
    ],
});
