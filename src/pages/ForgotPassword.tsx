import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { BiChevronRight } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      const auth = getAuth();

      await sendPasswordResetEmail(auth, email);

      toast.success(
        "If an account exists for this email, a reset link has been sent",
      );

      setTimeout(() => navigate("/sign-in"), 1000);
    } catch (error) {
      toast.error("Could not sent reset email");
      console.log(error);
    }
  };

  return (
    <section className="space-y-4 p-4">
      <header>
        <h1 className="text-3xl font-bold">Forgot Password</h1>
      </header>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* EMAIL */}
        <div className="flex items-center gap-2 rounded-full bg-white p-2 focus-within:ring-2 focus-within:ring-green-500">
          <FaUser size={24} />

          <input
            className="flex-1 bg-transparent outline-none"
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={onChange}
          />
        </div>

        {/* SIGN IN */}
        <Link
          className="flex justify-end text-gray-500 hover:text-gray-700"
          to="/sign-in"
        >
          Sign In
        </Link>

        {/* SUBMIT BUTTON */}
        <div className="flex items-center justify-between gap-2">
          <p className="text-xl font-medium">Send Reset Link</p>

          <button
            type="submit"
            className="cursor-pointer rounded-full bg-gray-300 p-2"
          >
            <BiChevronRight size={24} />
          </button>
        </div>
      </form>
    </section>
  );
}
