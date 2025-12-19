import { useState, type ChangeEvent } from "react";
import { BiChevronRight } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { HiMiniIdentification } from "react-icons/hi2";
import { IoMdLock } from "react-icons/io";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <section className="space-y-4 p-4">
      <header>
        <p className="text-3xl font-bold">Welcome Back!</p>
      </header>

      <form className="space-y-6">
        {/* NAME */}
        <div className="flex items-center gap-2 rounded-full bg-white p-2">
          <HiMiniIdentification size={24} />

          <input
            className="flex-1 bg-transparent outline-none"
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={onChange}
          />
        </div>

        {/* EMAIL */}
        <div className="flex items-center gap-2 rounded-full bg-white p-2">
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

        {/* PASSWORD */}
        <div className="flex items-center gap-2 rounded-full bg-white p-2">
          <IoMdLock size={24} />

          <input
            className="flex-1 bg-transparent text-sm outline-none"
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Password"
            value={password}
            onChange={onChange}
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="cursor-pointer text-gray-500 hover:text-gray-700"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <IoEyeOff /> : <IoEye />}
          </button>
        </div>

        {/* FORGOT PASSWORD */}
        <Link
          className="flex justify-end text-gray-500 hover:text-gray-700"
          to="/forgot-password"
        >
          Forgot Password
        </Link>

        {/* SIGN IN */}
        <div className="flex items-center justify-between gap-2">
          <p className="text-xl font-medium">Sign Up</p>

          <button className="rounded-full bg-gray-300 p-2">
            <BiChevronRight size={24} />
          </button>
        </div>
      </form>

      {/* GOOGLE OAuth */}
      <Link
        to="/sign-in"
        className="flex justify-center font-bold text-green-500"
      >
        Sign In Instead
      </Link>
    </section>
  );
}
