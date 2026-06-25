import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import z from "zod";

const resetPasswordScehema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
});

export default function ResetPassword() {
  const { token } = useParams();
  const [formData, setFormData] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const nav = useNavigate();

  console.log(token);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(resetPasswordScehema) });

  async function submitForm(data) {
    setLoading(true);
    setErr("");

    try {
      const res = await fetch(
        `https://tazkarti-backend-rho.vercel.app/api/users/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      console.log("line41", res);

      //   if (!res.ok) {
      //     console.log("SOMETHING WENT WRONG");
      //     setErr(res.message);
      //     //   return;
      //   }

      const result = await res.json();
      console.log(result);

      if (result.status === "fail" || result.status === "error") {
        setErr(result.message);
      }
      setFormData(result.mesage);
    } catch (err) {
      setErr(err.message);
      console.log("ERROR:", err.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8  bg-gray-800">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          Login
        </h2>
        {err && <p className="text-red-600">{err}</p>}
        {formData && (
          <p className="text-green-700">
            {formData}
            <Link
              to="/login"
              className="text-green mt-5 block  text-white  rounded text-center bg-white/5 px-3 py-1.5 outline-1 -outline-offset-1 outline-white/10"
            >
              Password Reset successflly, now you can login
            </Link>
          </p>
        )}
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border rounded p-5 border-gray-500">
        <form className="space-y-6" onSubmit={handleSubmit(submitForm)}>
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

          {/* confirm Password */}
          <div>
            <div className="flex items-center">
              <label
                htmlFor="confirmPassword"
                className="block text-sm/6 font-medium text-gray-100"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                required
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
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
              {loading ? "Resetting..." : " Reset Your Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
