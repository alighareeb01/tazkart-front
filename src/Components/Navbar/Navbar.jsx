import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { TokenContext } from "../Context/TokenContext";

export default function Navbar() {
  const { token, removeToken } = useContext(TokenContext);
  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-3 bg-gray-900 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <button
                type="button"
                command="--toggle"
                commandfor="mobile-menu"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  data-slot="icon"
                  aria-hidden="true"
                  className="size-6 in-aria-expanded:hidden"
                >
                  <path
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  data-slot="icon"
                  aria-hidden="true"
                  className="size-6 not-in-aria-expanded:hidden"
                >
                  <path
                    d="M6 18 18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <img
                  src="https://images.unsplash.com/photo-1556761175-4b46a572b786"
                  alt="Your Company"
                  className="h-8 w-auto"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {/* Current: "bg-gray-950/50 text-white", Default: "text-white hover:bg-white/5 hover:text-white" */}
                  <NavLink
                    to="/"
                    aria-current="page"
                    className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white/5 hover:text-white"
                  >
                    home
                  </NavLink>
                  {!token && (
                    <NavLink
                      to="/signup"
                      className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white/5 hover:text-white"
                    >
                      signup
                    </NavLink>
                  )}

                  {!token && (
                    <NavLink
                      to="/login"
                      className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white/5 hover:text-white"
                    >
                      login
                    </NavLink>
                  )}
                  <NavLink
                    to="/events"
                    className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white/5 hover:text-white"
                  >
                    events
                  </NavLink>
                  {token && (
                    <NavLink
                      to="/bookings"
                      className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white/5 hover:text-white"
                    >
                      bookings
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Profile dropdown */}
              <el-dropdown className="relative ml-3">
                <button className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    // src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    src="/download.jpeg"
                    alt="profile"
                    className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                  />
                </button>
                <el-menu
                  anchor="bottom end"
                  popover="auto"
                  className="w-48 origin-top-right rounded-md bg-gray-800 py-1 outline -outline-offset-1 outline-white/10 transition transition-discrete [--anchor-gap:--spacing(2)] data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 text-sm text-white focus:bg-white/5 focus:outline-hidden"
                  >
                    profile
                  </NavLink>

                  {token && (
                    <NavLink
                      onClick={() => {
                        removeToken();
                      }}
                      to="/"
                      className="block px-4 py-2 text-sm text-white focus:bg-white/5 focus:outline-hidden"
                    >
                      sign out
                    </NavLink>
                  )}
                </el-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
        <el-disclosure id="mobile-menu" hidden className="block sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {/* Current: "bg-gray-950/50 text-white", Default: "text-white hover:bg-white/5 hover:text-white" */}
            <NavLink
              to="/"
              aria-current="page"
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-white/5 hover:text-white"
            >
              Home
            </NavLink>
            {!token && (
              <NavLink
                to="/signup"
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-white/5 hover:text-white"
              >
                signup
              </NavLink>
            )}
            {!token && (
              <NavLink
                to="/login"
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-white/5 hover:text-white"
              >
                login
              </NavLink>
            )}
            <NavLink
              to="/events"
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-white/5 hover:text-white"
            >
              events
            </NavLink>
            {token && (
              <NavLink
                to="/bookings"
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-white/5 hover:text-white"
              >
                bookings
              </NavLink>
            )}
          </div>
        </el-disclosure>
      </nav>
    </>
  );
}
