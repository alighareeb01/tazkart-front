import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../Card/Card";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TokenContext } from "../Context/TokenContext";
import Errorfetching from "../Errorfetching/Errorfetching";
import Loadingdata from "../Loadingdata/Loadingdata";
import { useSelector } from "react-redux";

const seatSchema = z.object({
  seats: z.coerce.number().min(1, "minimum number of seats is 1"),
});

export default function Event() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const { token } = useContext(TokenContext);
  const [message, setMessage] = useState("");
  const nav = useNavigate();
  const role = useSelector((state) => state.logged.role);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(seatSchema) });

  console.log(id);

  useEffect(() => {
    async function getEvent() {
      try {
        const res = await fetch(
          `https://tazkarti-backend-rho.vercel.app/api/events/${id}`,
        );
        console.log("line 16", res);

        if (!res.ok) {
          console.log("SOMETHING WRNT WRONG");
          setErr(res.message);
          throw new Error();
        }
        // console.log("line 22", res);
        const result = await res.json();
        // console.log("24");

        // console.log("26", result);

        setData(result.event);
      } catch (error) {
        serErr(error.message);
      } finally {
        setLoading(false);
      }
    }
    getEvent();
  }, [id]);

  async function handleSeatSubmit(data) {
    console.log("token", token);

    console.log("clicked");

    if (!token) {
      setErr("you are not logged in, please go log in first");
      setTimeout(() => {
        nav("/login");
      }, 2000);
      return;
    }

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
        throw new Error();
      }

      const result = await res.json();
      if (result.status === "fail" || result.status === "error") {
        //   console.log("asdasd",result.);

        setErr(result.message);
        return;
      }

      console.log(result);

      //   console.log("line76", result.error.name);
      setErr("");
      setMessage(result.status);
      nav("/bookings");
    } catch (error) {
      setErr(error);
      //   console.log("eeee", error);
    } finally {
      setLoading(false);
    }
  }
  function handleTermsModal() {
    console.log("clicked");

    setOpen((prev) => !prev);
  }

  return loading ? (
    <Loadingdata />
  ) : err ? (
    <Errorfetching />
  ) : (
    <div className="mt-20 bg-gray-800 grid grid-cols-1 gap-3 sm:grid-cols-2 ">
      <Card
        event={data}
        showButton={false}
        showDeleteButton={role === "admin"}
      />

      {role !== "admin" && (
        <div className="text-center text-indigo-400">
          <form className="space-y-6" onSubmit={handleSubmit(handleSeatSubmit)}>
            <div>
              <label
                htmlFor="seats"
                className="block text-sm font-medium text-gray-100"
              >
                seats
              </label>

              <div className="mt-2">
                <input
                  id="seats"
                  type="number"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white"
                  {...register("seats")}
                />

                {errors.seats && (
                  <p className="text-red-500 text-sm">{errors.seats.message}</p>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="mt-5 w-3/4 rounded-md bg-white px-3 py-1.5 font-semibold text-black hover:bg-indigo-400"
                >
                  Book Event
                </button>
              </div>
            </div>
          </form>

          <div className="border rounded-lg p-5 mt-5 bg-gray-900">
            <button
              type="button"
              className="cursor-pointer text-white"
              onClick={handleTermsModal}
            >
              ➡️ terms of entry
            </button>
          </div>

          {open && (
            <div className="border rounded-lg mt-1 p-5 text-white bg-gray-900">
              <ul>
                <li>- Please Attend on Time</li>
                <li>- Recording is Not Allowed</li>
                <li>- Camera Is Not Allowed</li>
                <li>
                  - The ticket guarantees entry for the three days of the
                  training
                </li>
              </ul>
            </div>
          )}

          {err && <p className="text-red-600">{err}</p>}

          {message && <p className="text-green-600">{message}: booked</p>}
        </div>
      )}
    </div>
  );
}
