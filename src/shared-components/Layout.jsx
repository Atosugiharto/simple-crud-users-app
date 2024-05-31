import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  CollectionIcon,
  DesktopComputerIcon,
  HomeIcon,
  LogoutIcon,
  MenuAlt2Icon,
  MenuIcon,
  UserIcon,
  UsersIcon,
  XIcon,
} from "@heroicons/react/outline";
import {
  SearchIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import { NavLink, Outlet } from "react-router-dom";

const navigation = [
  // { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: false },
  { name: "Users", href: "/users", icon: UsersIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hidesideBar, sethidesideBar] = useState(false);

  return (
    <div>
      <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
        <button
          type="button"
          className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex items-center flex-shrink-0 px-4">
          <HomeIcon className="h-10 w-auto" />
        </div>
        <div className="flex-1 flex justify-end">
          <div className="hidden md:flex-1 px-4 md:flex justify-between">
            <div className="flex-1 flex" />
            <div className="ml-4 flex items-center md:ml-6">
              <div className="text-gray-900 flex justify-center items-center gap-4">
                <div className=" flex flex-row items-center gap-2">
                  <div>
                    <UserCircleIcon className="h-12 text-line-color" />
                  </div>
                  <div className="text-xs">
                    <p className="font-semibold capitalize">username</p>
                    <p>user@mail.com</p>
                  </div>
                </div>
                <div>
                  <button
                    // onClick={() => handleLogout()}
                    className="flex items-center mx-4 text-gray-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-logout-color"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-custom-height flex overflow-hidden bg-white">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4">
                  <HomeIcon className="h-10 w-auto" />
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="mt-5 px-2 space-y-1">
                    {navigation.map((item) =>
                      !item.children ? (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={({ isActive }) =>
                            classNames(
                              isActive
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-900 hover:bg-gray-50",
                              "group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md",
                            )
                          }
                        >
                          <item.icon
                            className="text-gray-400 mr-3 flex-shrink-0 h-6 w-6"
                            aria-hidden="true"
                          />
                          {item.name}
                        </NavLink>
                      ) : (
                        <Disclosure
                          as="div"
                          key={item.name}
                          className="space-y-1"
                        >
                          {({ open }) => (
                            <>
                              <Disclosure.Button
                                className={classNames(
                                  item.current
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-900",
                                  "group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md",
                                )}
                              >
                                <item.icon
                                  className="text-gray-400 mr-3 flex-shrink-0 h-6 w-6"
                                  aria-hidden="true"
                                />
                                <span className="flex-1">{item.name}</span>
                                <svg
                                  className={classNames(
                                    open
                                      ? "text-gray-900 rotate-90"
                                      : "text-gray-900",
                                    "ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-900 transition-colors ease-in-out duration-150",
                                  )}
                                  viewBox="0 0 20 20"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M6 6L14 10L6 14V6Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </Disclosure.Button>
                              <Disclosure.Panel className="space-y-1">
                                {item.children.map((subItem) => (
                                  <NavLink
                                    key={subItem.name}
                                    to={subItem.href}
                                    className={({ isActive }) =>
                                      classNames(
                                        isActive
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-900 hover:bg-gray-50",
                                        "group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium rounded-md",
                                      )
                                    }
                                  >
                                    {subItem.name}
                                  </NavLink>
                                ))}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ),
                    )}
                  </nav>
                </div>
                <div className="flex-shrink-0 flex p-4">
                  <nav className="mt-5 px-2 space-y-1">
                    <div className="text-gray-900">
                      <div className=" flex flex-row items-center gap-2">
                        <div className="text-xs">
                          <p className="font-semibold capitalize">user</p>
                          <p>user@gmail.com</p>
                        </div>
                      </div>
                    </div>
                    <button
                      //   onClick={() => handleLogout()}
                      className="text-gray-900 group flex items-center py-2 text-sm font-medium rounded-md"
                    >
                      <LogoutIcon
                        className="text-gray-400 mr-3 flex-shrink-0 h-6 w-6"
                        aria-hidden="true"
                      />
                      Exit
                    </button>
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <button
          onClick={() => sethidesideBar(false)}
          className={`${hidesideBar ? "hidden md:flex items-center justify-end px-4" : "hidden md:hidden"}}`}
        >
          <MenuAlt2Icon
            className="h-8 w-auto p-2 bg-line-color rounded-full"
            aria-hidden="true"
          />
        </button>
        <div
          className={`${hidesideBar ? "hidden md:hidden" : "hidden md:flex md:flex-shrink-0"}}`}
        >
          <div className="flex flex-col w-64">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto">
              <div className="flex items-center justify-end mb-2 px-4">
                {/* <button className="flex items-center gap-2">
                  <ArrowLeftIcon className="h-4 w-auto font-bold" />
                  <p className="font-semibold text-sm">Back</p>
                </button> */}
                <button
                  onClick={() => sethidesideBar(true)}
                  className="flex items-center"
                >
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="flex-grow flex flex-col">
                {/* place for trigger button */}
                <nav className="flex-1 px-2 bg-white space-y-1">
                  {navigation.map((item) =>
                    !item.children ? (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                          classNames(
                            isActive
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-900 hover:bg-gray-50",
                            "group w-full flex items-center pl-2 py-2 text-sm font-semibold rounded-md",
                          )
                        }
                      >
                        <item.icon
                          className="text-gray-400 mr-3 flex-shrink-0 h-6 w-6"
                          aria-hidden="true"
                        />
                        {item.name}
                      </NavLink>
                    ) : (
                      <Disclosure
                        as="div"
                        key={item.name}
                        className="space-y-1"
                      >
                        {({ open }) => (
                          <>
                            <Disclosure.Button
                              className={classNames(
                                item.current
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-900",
                                "group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-semibold rounded-md",
                              )}
                            >
                              <item.icon
                                className="text-gray-400 mr-3 flex-shrink-0 h-6 w-6"
                                aria-hidden="true"
                              />
                              <span className="flex-1">{item.name}</span>
                              <svg
                                className={classNames(
                                  open
                                    ? "text-gray-900 rotate-90"
                                    : "text-gray-900",
                                  "ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-900 transition-colors ease-in-out duration-150",
                                )}
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                              >
                                <path
                                  d="M6 6L14 10L6 14V6Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </Disclosure.Button>
                            <Disclosure.Panel className="space-y-1">
                              {item.children.map((subItem) => (
                                <NavLink
                                  key={subItem.name}
                                  to={subItem.href}
                                  className={({ isActive }) =>
                                    classNames(
                                      isActive
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-900 hover:bg-gray-50",
                                      "group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium rounded-md",
                                    )
                                  }
                                >
                                  {subItem.name}
                                </NavLink>
                              ))}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ),
                  )}
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl xl:max-w-full mx-auto px-4 sm:px-6">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
