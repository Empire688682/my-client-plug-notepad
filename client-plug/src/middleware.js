import { NextResponse } from "next/server";

export async function middleware(request) {
  try {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get("MWtoken")?.value || "";
    console.log("tokenAfter:", token);

    const isPrivate = path === "/note";
    if (isPrivate && !token) {
      return NextResponse.redirect(new URL("/", request.url));
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
