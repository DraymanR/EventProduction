
import Login  from "@/app/component/users/register/login"

export default function NewUserError() {
  return (
    <div>
      <h1>Access Denied</h1>
      <p>You are not registered in our system. Please sign in with your username and password first.</p>
      <button onClick={Login}>
        Go to Login
      </button>
    </div>
  )
}