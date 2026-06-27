import React, { useEffect, useState } from "react";
import Errorfetching from "../Errorfetching/Errorfetching";
import Loadingdata from "../Loadingdata/Loadingdata";
import { useNavigate } from "react-router-dom";

export default function HotEvents() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [data, setData] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    async function getMostBookings() {
      setErr("");
      setLoading(true);
      try {
        const res = await fetch(
          "https://tazkarti-backend-rho.vercel.app/api/bookings/most-bookings",
        );
        const result = await res.json();
        setData(result.data);
        console.log("RESULT", result.data);
      } catch (error) {
        setErr(error.message);
        console.log("ERROR", error);
      } finally {
        setLoading(false);
      }
    }

    getMostBookings();
  }, []);

  return (
    <div className="mt-20">
      {loading ? (
        <Loadingdata />
      ) : err ? (
        <Errorfetching />
      ) : (
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((el, index) => (
            <div
              key={index}
              className="bg-gray-900 border border-gray-700 rounded-xl p-5 text-white"
            >
              <h2 className="text-xl font-bold">{el.event.title}</h2>
              <img
                src={el.event.image}
                className="w-full h-48 object-cover rounded-lg mt-3"
              />
              <p className="text-sm font-semibold mt-2">
                Total Bookings : {el.totalBookings}
              </p>
              <button
                type="submit"
                onClick={() => nav(`/events/${el.event._id}`)}
                className="mt-1 rounded-md border w-full px-3 py-1.5 text-sm/6 font-semibold bg-white text-black hover:bg-indigo-400 hover:transition "
              >
                check Event
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
