import React, { useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { TokenContext } from "../Context/TokenContext";

const editSchema = z.object({
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().min(2, "Last name is too short"),
});

export default function Edit() {
  const [formData, setFormData] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const { token } = useContext(TokenContext);

  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(editSchema) });

  async function submitForm(data) {
    setLoading(true);
    setErr("");

    try {
      const res = await fetch(
        "https://tazkarti-backend-rho.vercel.app/api/users/me",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        },
      );

      const result = await res.json();

      if (!res.ok) {
        setErr(result.message);
        return;
      }

      setFormData("Profile updated successfully ");

      setTimeout(() => {
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
      <div className="mt-20">
        {err && <p className="text-red-600">{err}</p>}
        {formData && (
          <div className="flex justify-center flex-col items-center">
            <p className="text-green-500">{formData}</p>

            <Link
              to="/profile"
              className=" mt-2 block w-50 text-white  rounded text-center bg-white/5 px-3 py-1.5 outline-1 -outline-offset-1 outline-white/10"
            >
              go to profile
            </Link>
          </div>
        )}
      </div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8  bg-gray-800">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
            Update your profile
          </h2>
          <div>{err && <p className="text-red-600">{err}</p>}</div>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border rounded p-5 border-white/5 outline-1 -outline-offset-1  outline-white/10 ">
          <form className="space-y-6" onSubmit={handleSubmit(submitForm)}>
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

            <div>
              <button
                disabled={loading}
                type="submit"
                className="disabled:hover:cursor-not-allowed disabled:opacity-50 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                {loading ? "updating..." : "update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
