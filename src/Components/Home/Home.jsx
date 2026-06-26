import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gray-800">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
            BOOK YOUR EVENT
          </h1>
          <p className="mt-8 text-lg font-medium text-pretty text-white sm:text-xl/8">
            Welcome to our site, please visit our events →{" "}
            <Link
              to="/events"
              className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-900 hover:text-white"
            >
              events
            </Link>
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <p className="text-white"> Not registerd yet?</p>
            <Link
              to="/signup"
              className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-900 hover:text-white"
            >
              signup
            </Link>
          </div>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <p className="text-white"> you have an account already</p>
            <Link
              to="/login"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-900 hover:text-white"
            >
              login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
