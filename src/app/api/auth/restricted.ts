
import { getServerSession } from "next-auth/next"
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "./[...nextauth]/route"

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (session) {
    return NextResponse.json({
      content:
        "This is protected content. You can access this content because you are signed in.",
    }, { status: 200 })
  } else {
    return NextResponse.json({
      error: "You must be signed in to view the protected content on this page.",
    }, { status: 401 })
  }
}
// import { getServerSession } from "next-auth/next"
// import { NextRequest, NextResponse } from "next/server"
// import { authOptions } from "./[...nextauth]/route"

// export async function GET(request: NextRequest) {
//   const session = await getServerSession(authOptions)

//   if (session) {
//     return NextResponse.json({
//       content:
//         "This is protected content. You can access this content because you are signed in.",
//     }, { status: 200 })
//   } else {
//     return NextResponse.json({
//       error: "You must be signed in to view the protected content on this page.",
//     }, { status: 401 })
//   }
// }

