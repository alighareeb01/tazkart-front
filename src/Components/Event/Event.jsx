import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../Card/Card";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TokenContext } from "../Context/TokenContext";

const seatSchema = z.object({
  seats: z.coerce.number().min(1, "minimum number of seats is 1"),
});

export default function Event() {
  const [err, setErr] = useState("");
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const { token } = useContext(TokenContext);
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(seatSchema) });

  console.log(id);

  useEffect(() => {
    async function getEvent() {
      const res = await fetch(
        `https://tazkarti-backend-rho.vercel.app/api/events/${id}`,
      );
      console.log("line 16", res);

      if (!res.ok) {
        console.log("SOMETHING WRNT WRONG");
        setErr(res.message);
      }
      // console.log("line 22", res);
      const result = await res.json();
      // console.log("24");

      // console.log("26", result);

      setData(result.event);
    }
    getEvent();
  }, [id]);

  async function handleSeatSubmit(data) {
    console.log("token", token);

    console.log("clicked");

    try {
      // console.log(data);
      const res = await fetch(
        "https://tazkarti-backend-rho.vercel.app/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            seats: data.seats,
            event: id,
          }),
        },
      );
      if (!res.ok) {
        setErr(res.message);
      }

      const result = await res.json();
      if (result.status === "fail" || result.status === "error") {
        //   console.log("asdasd",result.);

        setErr(result.message);
        return;
      }

      console.log(result);

      //   console.log("line76", result.error.name);
      setMessage(result.status);
    } catch (error) {
      setErr(error);
      //   console.log("eeee", error);
    }
  }
  function handleTermsModal() {
    console.log("clicked");

    setOpen((prev) => !prev);
  }

  return (
    <div className="bg-gray-800 grid grid-cols-1 gap-3 sm:grid-cols-2 mt-5">
      {/* <Cardd event={data} /> */}
      <Card event={data} showButton={false} />
      <div className="text-center text-indigo-400 ">
        <form className="space-y-6" onSubmit={handleSubmit(handleSeatSubmit)}>
          {/* Seats */}
          <div>
            <label
              htmlFor="seats"
              className="block text-sm/6 font-medium text-gray-100"
            >
              seats
            </label>
            <div className="mt-2">
              <input
                id="seats"
                type="number"
                name="seats"
                required
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                {...register("seats")}
              />
              {errors.seats && (
                <p className="text-red-500 text-sm">{errors.seats.message}</p>
              )}
            </div>
            <button
              // disabled={loading}
              type="submit"
              className="disabled:hover:cursor-not-allowed flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white mt-5 hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Book Event
            </button>
          </div>
        </form>
        <div className=" border rounded-lg p-5 flex flex-start mt-5 ">
          <button
            type="button"
            className="cursor-pointer"
            onClick={handleTermsModal}
          >
            ➡️ terms of entry
          </button>
        </div>
        {open && (
          <div className="border rounded-lg mt-1 p-5 ">
            <ul>
              <li>- Please Attend on Time</li>
              <li>- Recording is Not Allowed</li>
              <li>- Camera Is Not Allowed</li>
              <li>
                - The ticket guarantees entry for the three days of the training
              </li>
            </ul>
          </div>
        )}
        {err && <p className="text-red-600 flex flex-start">{err}</p>}
        {message && (
          <p className="text-green-600 flex flex-start">{message}: booked </p>
        )}
      </div>
    </div>
  );
}
