

'use client'
import { useSession, signIn, signOut } from "next-auth/react"

const LoginBtn = () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md">
        <p className="mb-2 text-lg font-semibold text-gray-800">
          מחובר לחשבון של <span className="text-blue-600">{session.user.name || session.user.email}</span>
        </p>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
          onClick={() => signOut()}
        >
          יציאה
        </button>
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md">
      <p className="mb-2 text-lg font-semibold text-gray-800">
        אינך מחובר לחשבון משתמש
      </p>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
        onClick={() => signIn()}
      >
        התחברות לחשבון שלך
      </button>
    </div>
  )
}

export default LoginBtn

