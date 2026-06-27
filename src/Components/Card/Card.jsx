import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../Context/TokenContext";
import { toast } from "react-toastify";

export function Card({
  event,
  showButton = true,
  cancelButton = false,
  bookingId,
  showDeleteButton = false,
}) {
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const { token } = useContext(TokenContext);

  function getEvent() {
    // console.log(event);
    nav(`/events/${event._id}`);
  }

  function cancelBooking() {
    toast(
      ({ closeToast }) => (
        <div>
          <p className="mb-4 text-white font-semibold">
            Are you sure you want to cancel?
          </p>

          <div className="flex gap-3">
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              onClick={() => {
                closeToast();
                confirmCancel();
              }}
            >
              Yes
            </button>

            <button
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
              onClick={closeToast}
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeButton: false,
      },
    );
  }

  function deleteEvent() {
    toast(
      ({ closeToast }) => (
        <div>
          <p className="mb-4 text-white font-semibold">
            Are you sure you want to cancel?
          </p>

          <div className="flex gap-3">
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              onClick={() => {
                closeToast();
                confirmDelete();
              }}
            >
              Yes
            </button>

            <button
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
              onClick={closeToast}
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeButton: false,
      },
    );
  }
  async function confirmCancel() {
    setErr("");
    setLoading(true);

    try {
      const res = await fetch(
        `https://tazkarti-backend-rho.vercel.app/api/bookings/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await res.json();

      if (result.status === "fail" || result.status === "error") {
        //   console.log("asdasd",result.);

        console.log("SOMETHING WRONG WHILE CANCELLING THE EVENt");
        setErr(result.message);
        return;
      }
      window.location.reload();
    } catch (error) {
      setErr(error.message);
      setLoading(false);
      console.log("ERROR", err.message);
    } finally {
      setLoading(false);
    }
    //   console.log(result);
  }

  async function confirmDelete() {
    setErr("");
    setLoading(true);
    try {
      const res = await fetch(
        `https://tazkarti-backend-rho.vercel.app/api/events/${event._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await res.json();

      if (result.status === "fail" || result.status === "error") {
        //   console.log("asdasd",result.);

        console.log("SOMETHING WRONG WHILE CANCELLING THE EVENt");
        setErr(result.message);
        return;
      }
      nav("/events");
      //   console.log(result);
    } catch (error) {
      setErr(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="hover:-translate-y-2  bg-gray-900 border border-gray-700 rounded-2xl hover:shadow-indigo-500/20 hover:transition duration-300 flex flex-col  ">
      <div className="h-52 w-full overflow-hidden rounded-t-2xl">
        <img className="object-cover h-full w-full p-5" src={event.image} />
      </div>
      <div className="flex-1 p-5">
        <h2>
          <span className="text-xl font-bold text-white mb-3">
            {event.title}
          </span>
        </h2>
        <div className=" text-sm">
          <p className="text-gray-400"> 📍{event.location}</p>

          <p className="text-gray-400">📅 {event.date?.split("T")[0]}</p>

          <p className="text-gray-400">🪑 {event.availableSeats}</p>

          <p className="text-gray-400 ">$ {event.price}</p>
          <p className="text-gray-400 line-clamp-3">{event.description}</p>
        </div>
      </div>
      <div className="p-5 mt-1">
        {showButton && (
          <button
            onClick={getEvent}
            // disabled={loading}
            type="submit"
            className=" w-full  disabled:hover:cursor-not-allowed flex  justify-center rounded-md bg-white px-3 py-1.5 text-sm/6 font-semibold text-black hover:bg-indigo-400 hover:transition"
          >
            Check Event
          </button>
        )}
        {cancelButton && (
          <button
            onClick={cancelBooking}
            disabled={loading}
            type="submit"
            className=" w-full  disabled:hover:cursor-not-allowed flex  justify-center rounded-md bg-white px-3 py-1.5 text-sm/6 font-semibold text-black hover:bg-indigo-400 hover:transition"
          >
            cancel Event
          </button>
        )}
        {showDeleteButton && (
          <button
            onClick={deleteEvent}
            disabled={loading}
            type="submit"
            className=" w-full  disabled:hover:cursor-not-allowed flex  justify-center rounded-md bg-white px-3 py-1.5 text-sm/6 font-semibold text-black hover:bg-indigo-400 hover:transition"
          >
            Delete Event
          </button>
        )}
      </div>
    </div>
  );
}

