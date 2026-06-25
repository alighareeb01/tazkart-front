import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import z from "zod";

const forgetPasswordScehma = z.object({
  email: z.string().email("Invalid email"),
});

export default function ResetPassword() {
  const { token } = useParams();
  // const [formData, setFormData] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [err, setErr] = useState("");
  // const nav = useNavigate();

  console.log(token);
  
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({ resolver: zodResolver(forgetPasswordScehma) });

  // async function submitForm(data) {
  //   setLoading(true);
  //   setErr("");

  //   try {
  //     const res = await fetch(
  //       "https://tazkarti-backend-rho.vercel.app/api/users/forget-password",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(data),
  //       },
  //     );
  //     console.log("line41", res);

  //     //   if (!res.ok) {
  //     //     console.log("SOMETHING WENT WRONG");
  //     //     setErr(res.message);
  //     //     //   return;
  //     //   }

  //     const result = await res.json();
  //     console.log(result);

  //     if (result.status === "fail" || result.status === "error") {
  //       setErr(result.message);
  //     }
  //     setFormData(result.mesage);
  //   } catch (err) {
  //     setErr(err.message);
  //     console.log("ERROR:", err.message);
  //     setLoading(false);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  return <div>asdasd</div>;
  // return (
  //   <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8  bg-gray-800">
  //     <div className="sm:mx-auto sm:w-full sm:max-w-sm">
  //       <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
  //         Login
  //       </h2>
  //       {err && <p className="text-red-600">{err}</p>}
  //       {formData && (
  //         <p className="text-green-700">
  //           {formData}
  //           <Link
  //             to="/reset-password"
  //             className="text-green mt-5 block  text-white  rounded text-center bg-white/5 px-3 py-1.5 outline-1 -outline-offset-1 outline-white/10"
  //           >
  //             please go to reset your password
  //           </Link>
  //         </p>
  //       )}
  //     </div>
  //     <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border rounded p-5 border-gray-500">
  //       <form className="space-y-6" onSubmit={handleSubmit(submitForm)}>
  //         {/* Email */}
  //         <div>
  //           <label
  //             htmlFor="email"
  //             className="block text-sm/6 font-medium text-gray-100"
  //           >
  //             Email address
  //           </label>
  //           <div className="mt-2">
  //             <input
  //               id="email"
  //               type="email"
  //               name="email"
  //               required
  //               className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
  //               {...register("email")}
  //             />
  //             {errors.email && (
  //               <p className="text-red-500 text-sm">{errors.email.message}</p>
  //             )}
  //           </div>
  //         </div>

  //         <div>
  //           <button
  //             //   disabled={loading}
  //             type="submit"
  //             className="disabled:hover:cursor-not-allowed flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
  //           >
  //             {/* {loading ? "loading" : " Login"} */}
  //             Enter Your Email please
  //           </button>
  //         </div>
  //       </form>
  //     </div>
  //   </div>
  // );
}
