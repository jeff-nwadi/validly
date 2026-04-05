import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/auth";

import { aj } from "@/lib/arcjet";

export default async function middleware(request: NextRequest) {
    // Arcjet Rate Limiting
    const decision = await aj.protect(request);
    
    if (decision.isDenied()) {
        if (decision.reason.isRateLimit()) {
            return NextResponse.json({ error: "Too many requests" }, { status: 429 });
        }
        if (decision.reason.isBot()) {
            return NextResponse.json({ error: "Bot detected" }, { status: 403 });
        }
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const session = await auth.api.getSession({
        headers: request.headers,
    });

    if (!session) {
        if (request.nextUrl.pathname.startsWith("/dashboard") || request.nextUrl.pathname.startsWith("/validate")) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/validate/:path*"],
};
