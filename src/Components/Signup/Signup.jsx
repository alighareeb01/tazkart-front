import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";

const signupSchema = z
  .object({
    firstName: z.string().min(2, "First name is too short"),
    lastName: z.string().min(2, "Last name is too short"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),

    city: z.string().min(2, "City is required"),
    nationality: z.string().min(2, "Nationality is required"),
    datOfBirth: z.string().min(1, "Date of birth is required"),
    gender: z.enum(["male", "female"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords not matached",
    path: ["confirmPassword"],
  });

export default function Signup() {
  const [formData, setFormData] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const nav = useNavigate();
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
        "https://tazkarti-backend-rho.vercel.app/api/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await res.json();

      if (!res.ok) {
        setErr(result.message);
        return;
      }

      setFormData(result.message);
      console.log("noo", formData);
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
          <h2 className="text-center text-2xl/9 font-bold tracking-tight text-white">
            Sign up
          </h2>
          <div>{err && <p className="text-red-600">{err}</p>}</div>
          <div>
            {
              formData && (
                // (
                <p className="mb-5 text-green-700">
                  {formData}
                  <Link
                    to="/login"
                    className="text-green mt-5 block  text-white  rounded text-center bg-white/5 px-3 py-1.5 outline-1 -outline-offset-1 outline-white/10"
                  >
                    go to login
                  </Link>
                </p>
              )
              // ) &&
              // (
              //   <Link
              //     to="/login"
              //     className="text-green mt-5 block  text-white  rounded text-center bg-white/5 px-3 py-1.5 outline-1 -outline-offset-1 outline-white/10"
              //   >
              //     Please verfiy your account and go to login
              //   </Link>
              // )
            }
          </div>
        </div>
        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm border rounded p-5 border-white/5 outline-1 -outline-offset-1  outline-white/10 ">
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

            <div className="flex gap-2 ">
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
            </div>

            <div className="flex gap-2  justify-center">
              {/* firrst name */}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="firstName"
                    className="block text-sm/6 font-medium text-gray-100"
                  >
                    First Name
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    required
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* last Name  */}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="lastName"
                    className="block text-sm/6 font-medium text-gray-100"
                  >
                    Last Name
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    required
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* city */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="city"
                  className="block text-sm/6 font-medium text-gray-100"
                >
                  City
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="city"
                  type="text"
                  name="city"
                  required
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  {...register("city")}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city.message}</p>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              {/* nationality */}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="nationality"
                    className="block text-sm/6 font-medium text-gray-100"
                  >
                    Nationality
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="Nationality"
                    type="text"
                    name="Nationality"
                    required
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    {...register("nationality")}
                  />
                  {errors.nationality && (
                    <p className="text-red-500 text-sm">
                      {errors.nationality.message}
                    </p>
                  )}
                </div>
              </div>

              {/* gender */}
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <label className="block text-sm/6 font-medium text-gray-100">
                    Gender
                  </label>
                </div>

                <div className="mt-2">
                  <select
                    {...register("gender")}
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  >
                    <option value="" className="bg-gray-800">
                      Select gender
                    </option>
                    <option value="male" className="bg-gray-800">
                      Male
                    </option>
                    <option value="female" className="bg-gray-800">
                      Female
                    </option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-sm">
                      {errors.gender.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* date of birth */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="datOfBirth"
                  className="block text-sm/6 font-medium text-gray-100"
                >
                  Date of birth
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="datOfBirth"
                  type="date"
                  name="datOfBirth"
                  required
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  {...register("datOfBirth")}
                />
                {errors.datOfBirth && (
                  <p className="text-red-500 text-sm">
                    {errors.datOfBirth.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                disabled={loading}
                type="submit"
                className="disabled:hover:cursor-not-allowed flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                {loading ? "loading " : "signup"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
