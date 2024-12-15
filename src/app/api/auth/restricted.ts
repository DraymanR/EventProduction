<<<<<<< HEAD
=======
<<<<<<< HEAD
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
=======
>>>>>>> 2ebe7af3aec6debd6fbbf4f07105abe8a5f0d7dc
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
<<<<<<< HEAD
// }
=======
// }
>>>>>>> feb4b53c36ceefe34479e7431dd7d5b0453e91d4
>>>>>>> 2ebe7af3aec6debd6fbbf4f07105abe8a5f0d7dc
