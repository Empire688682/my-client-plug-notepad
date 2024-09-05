import { NextResponse } from "next/server";

export async function middleware(req) {
  try {
    const path = req.nextUrl.pathname;
    const token = req.cookies.get("MWtoken")?.value || "";

    const isPrivate = path === "/note";
    if (isPrivate && !token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } catch (error) {
    console.log("ERROR:", error);
    return NextResponse.json({ success: false, message: "Middleware ERROR" });
  }

  // If everything is okay, continue to the next step
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/",
            "/note"
           ]
};
