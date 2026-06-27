import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { TokenContext } from "../Context/TokenContext";
import { useDispatch } from "react-redux";
import { setRole } from "../store/roleSlice";

const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(3, "Location is required"),
  date: z.string().min(1, "Date is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Price must be a number",
    }),

  availableSeats: z
    .string()
    .min(1, "Available seats is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Available seats must be a number",
    }),
  category: z.string().min(2, "Category is required"),

  image: z.any(),
  // .refine((files) => files?.length === 1, "Image is required")
  // .refine(
  //   (files) => files?.[0]?.type.startsWith("image/"),
  //   "Only images are allowed",
  // ),
});

export default function CreateEvent() {
  const [formData, setFormData] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const nav = useNavigate();
  const { token } = useContext(TokenContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(eventSchema) });

  async function submitForm(data) {
    setLoading(true);
    setErr("");

    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("location", data.location);
      formData.append("date", data.date);
      formData.append("price", data.price);
      formData.append("availableSeats", data.availableSeats);
      formData.append("category", data.category);
      formData.append("image", data.image[0]);

      const res = await fetch(
        "https://tazkarti-backend-rho.vercel.app/api/events",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );
      // console.log("line41", res);

      const result = await res.json();
      if (!res.ok) {
        setErr(result.message);
        return;
      }

      console.log("here", result);

      setFormData(result.message);

      nav("/events");
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
            Create An Event
          </h2>
          {err && <p className="text-red-600">{err}</p>}
          {formData && <p className="text-green-700">{formData}</p>}
        </div>
        <div className="bg-gray-900  mt-10 sm:mx-auto sm:w-full sm:max-w-sm border rounded p-5 border-gray-500">
          <form className="space-y-6" onSubmit={handleSubmit(submitForm)}>
            <div className="grid grid-cols-3 gap-2">
              {/* title */}
              <div className="col-span-1">
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-100"
                >
                  Title
                </label>
                <div className="mt-2">
                  <input
                    id="title"
                    type="text"
                    name="title"
                    required
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    {...register("title")}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm">
                      {errors.title.message}
                    </p>
                  )}
                </div>
              </div>

              {/* location */}
              <div className="col-span-2">
                <div className="flex  justify-between">
                  <label
                    htmlFor="location"
                    className="block text-sm/6 font-medium text-gray-100"
                  >
                    Location
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="location"
                    type="text"
                    name="location"
                    required
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    {...register("location")}
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm">
                      {errors.location.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {/* date */}
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm/6 font-medium text-gray-100"
                >
                  Date
                </label>
                <div className="mt-2">
                  <input
                    id="date"
                    type="date"
                    name="date"
                    required
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    {...register("date")}
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm">
                      {errors.date.message}
                    </p>
                  )}
                </div>
              </div>

              {/* price */}
              <div>
                <div className="flex  justify-between">
                  <label
                    htmlFor="price"
                    className="block text-sm/6 font-medium text-gray-100"
                  >
                    price
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="price"
                    type="text"
                    name="price"
                    required
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    {...register("price")}
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm">
                      {errors.price.message}
                    </p>
                  )}
                </div>
              </div>

              {/* location */}
              <div>
                <div className="flex  justify-between">
                  <label
                    htmlFor="availableSeats"
                    className="block text-sm/6 font-medium text-gray-100"
                  >
                    Available Seats
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="availableSeats"
                    type="text"
                    name="availableSeats"
                    required
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    {...register("availableSeats")}
                  />
                  {errors.availableSeats && (
                    <p className="text-red-500 text-sm">
                      {errors.availableSeats.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {/* category */}
              <div className="col-span-1">
                <label className="block text-sm/6 font-medium text-gray-100">
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white"
                  {...register("category")}
                />
              </div>

              {/* image */}
              <div className="col-span-2">
                <label className="block text-sm/6 font-medium text-gray-100">
                  Image
                </label>

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white"
                  {...register("image")}
                />
              </div>
              {/* description */}
            </div>
            <div>
              <div className="flex  justify-between">
                <label
                  htmlFor="description"
                  className="block text-sm/6 font-medium text-gray-100"
                >
                  description
                </label>
              </div>
              <div className="mt-2">
                <textarea
                  rows="4"
                  cols="50"
                  id="description"
                  type="text"
                  name="description"
                  required
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
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
                {loading ? "Creating" : " Create Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
