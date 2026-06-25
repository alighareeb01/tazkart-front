import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { TokenContext } from "../Context/TokenContext";

const signupSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function Login() {
  const [formData, setFormData] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const nav = useNavigate();
  const { saveToken } = useContext(TokenContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  async function submitForm(data) {
    setLoading(true);
    setErr("");

    try {
      const res = await fetch(
        "https://tazkarti-backend-rho.vercel.app/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      console.log("line41", res);

     

      const result = await res.json();
      if (!res.ok) {
        setErr(result.message);
        return;
      }

      console.log("asd");

      console.log("asd", result);
      
      setFormData(result.message);

      saveToken(result.token);

      setTimeout(() => {
        nav("/");
        setLoading(false);
      }, 2000);
    } catch (err) {
      setErr(err.message);
      console.log("ERROR:", err.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8  bg-gray-800">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
            Login
          </h2>
          {err && <p className="text-red-600">{err}</p>}
          {formData && <p className="text-green-700">{formData}</p>}
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border rounded p-5 border-gray-500">
          <form className="space-y-6" onSubmit={handleSubmit(submitForm)}>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-100"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex  justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-100"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                disabled={loading}
                type="submit"
                className="disabled:hover:cursor-not-allowed disabled:opacity-50 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                {loading ? "loading" : " Login"}
              </button>
            </div>
            <div className="text-white - underline">
              <a href="/forget-password">Forget Your Password?</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
