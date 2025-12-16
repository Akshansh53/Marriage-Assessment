import { useState } from "react";
import { Link } from "react-router";
type AuthFormProps = {
  title: string;
  buttonText: string;
  onSubmit: (data: { email: string; password: string }) => void;
};

export default function AuthForm({
  title,
  buttonText,
  onSubmit,
}: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          {title}
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition"
        >
          {buttonText}
        </button>
      <p className="text-center text-sm mt-4">
  {title === "SignUp" ? (
    <>
      Already have an account?{" "}
      <Link to="/signin" className="text-indigo-600 font-medium hover:underline">
        Login
      </Link>
    </>
  ) : (
    <>
      Don’t have an account?{" "}
      <Link to="/signup" className="text-indigo-600 font-medium hover:underline">
        Register
      </Link>
    </>
  )}
</p>
      </form>
      
    </div>
  );
}
