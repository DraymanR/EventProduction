
'use client'
import { useSession, signIn, signOut } from "next-auth/react"

const LoginBtn = () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md">
        <p className="mb-2 text-lg font-semibold text-gray-800">

          Signed in as <span className="text-blue-600">{session.user.userName || session.user.email}</span>

        </p>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md">
      <p className="mb-2 text-lg font-semibold text-gray-800">
        Not signed in
      </p>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </div>
  )
}

export default LoginBtn
