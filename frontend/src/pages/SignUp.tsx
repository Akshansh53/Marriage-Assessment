import axios from "axios";
import AuthForm from "../components/AuthForm"
import { useNavigate } from "react-router";
import.meta.env.VITE_BACKEND_URL

export default function SignUp() {
  const navigate=useNavigate();
  return <div>
    <AuthForm title="SignUp" buttonText="Register" onSubmit={async (data) => {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL
}/auth/register`, data, { withCredentials: true });
        navigate('/signin');
      }}></AuthForm>
  </div>
}