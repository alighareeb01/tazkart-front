import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../Card/Card";
import Errorfetching from "../Errorfetching/Errorfetching";
import Loadingdata from "../Loadingdata/Loadingdata";

export default function Events() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    async function getEvents() {
      try {
        const res = await fetch(
          "https://tazkarti-backend-rho.vercel.app/api/events?limit=100",
        );
        // console.log(res);
        // console.log("status:", res.status);
        // console.log("ok:", res.ok);

        // console.log("err", res.message);
        if (!res.ok) {
          setErr(res.message);
          throw new Error("Failed to fetch events");
        }

        const result = await res.json();

        // console.log(result);

        setData(result.events);
      } catch (error) {
        console.log("error here", error);
        setErr(error.message);
      } finally {
        setLoading(false);
      }
    }

    getEvents();
  }, []);
  console.log(data);

  return (
    <>
      {loading ? (
        <Loadingdata />
      ) : err ? (
        <Errorfetching />
      ) : (
        <div className="text-3xl font-bold  bg-gray-800">
          <div className="px-6 pt-6 mt-20">
            <div className="flex items-center justify-between rounded-xl bg-gray-900 border border-gray-700 px-6 py-5 shadow-md">
              <div>
                <h1 className="text-3xl font-bold text-white">Events</h1>

                <p className="mt-1 text-gray-400 text-sm">
                  Discover and book upcoming events
                </p>
              </div>

              <div className="text-right">
                <p className="text-gray-400 text-sm">Available Events</p>

                <p className="text-4xl font-bold text-indigo-400">
                  {data.length}
                </p>
              </div>
            </div>
          </div>
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-4">
            {data.map((event) => (
              <Card key={event._id} event={event} showButton={true} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
