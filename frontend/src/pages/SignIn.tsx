import axios from "axios";
import AuthForm from "../components/AuthForm"
import { useNavigate } from "react-router";
import.meta.env.VITE_BACKEND_URL

export default function SignIn() {
  const navigate=useNavigate();
  return <div>
    <AuthForm title="SignIn" buttonText="Login" onSubmit={async (data) => {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL
}/auth/login`, data, { withCredentials: true });
        navigate('/myvenue');
      }}></AuthForm>
  </div>
}