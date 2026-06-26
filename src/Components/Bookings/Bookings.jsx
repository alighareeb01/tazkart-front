import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "../Context/TokenContext";
import { Card } from "../Card/Card";
import Errorfetching from "../Errorfetching/Errorfetching";
import Loadingdata from "../Loadingdata/Loadingdata";
import { useNavigate } from "react-router-dom";

export default function Bookings() {
  const { token } = useContext(TokenContext);
  const [err, setErr] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    async function getMe() {
      try {
        const res = await fetch(
          "https://tazkarti-backend-rho.vercel.app/api/users/my-bookings",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
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
        //   console.log(result);
        setData(result.bookings);
      } catch (error) {
        setErr(error.message);
      } finally {
        setLoading(false);
      }
    }
    getMe();
  }, [token]);

  //   console.log("noow", data);

  return loading ? (
    <Loadingdata />
  ) : err ? (
    <Errorfetching />
  ) : (
    <div className="min-h-screen bg-gray-800 mt-20">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5 px-6">
        {data?.length ? (
          data.map((el, index) => (
            <Booking key={el._id} booking={el} index={index} />
          ))
        ) : (
          <div className="min-h-screen flex items-center justify-center bg-gray-800">
            <div className=" bg-gray-900 border border-gray-700 rounded-2xl p-10 text-center shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-2">
                YOU GOT NO BOOKINGS
              </h2>
              <p className=" text-gray-400 mb-6">
                You haven't booked any events yet , Wanna Discover our Events
              </p>
              <button
                onClick={() => {
                  nav("/events");
                }}
                type="submit"
                className=" w-full  disabled:hover:cursor-not-allowed flex  justify-center rounded-md bg-white px-3 py-1.5 text-sm/6 font-semibold text-black hover:bg-indigo-400 hover:transition"
              >
                Check Events
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Booking({ booking, index }) {
  console.log("book", booking._id);

  return (
    <div className="flex flex-col gap-3 h-full  ">
      <div className="flex items-center justify-between rounded-xl bg-gray-900 border border-gray-700 px-6 py-5 shadow-md mb-5">
        <div>
          <h1 className="text-3xl font-bold text-white">Event</h1>
        </div>

        <div className="text-right">
          <p className="text-4xl font-bold text-indigo-400">{index + 1}</p>
        </div>
      </div>
      <Card
        event={booking.event}
        showButton={false}
        cancelButton={true}
        bookingId={booking._id}
      />
    </div>
  );
}
