import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById, updateUser } from "./usersSlice";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const EditUser = ({ id, closeDialog }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  const detailData = useSelector((state) => state.users.detailUser);
  const status = useSelector((state) => state.users.statusGetId);

  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (status === "succeeded" && detailData) {
      setName(detailData.name || "");
      setEmail(detailData.email || "");
      setPhone(detailData.phone || "");
    }
  }, [detailData, status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUser({ id, user: { name, email, phone } })).unwrap();
      closeDialog();
      Swal.fire({
        title: "Data Successfully Updated!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Failed to update user: ", error);
      toast.error("Failed to update data!", {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  const emptyDataBody = name === "" || phone === "" || email === "";

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 w-full overflow-y-auto space-y-2"
      style={{ maxHeight: 400 }}
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Name
        </label>
        <div className="mt-2">
          <input
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            required
            autoComplete="off"
            className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            autoComplete="off"
            className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Phone
        </label>
        <div className="mt-2">
          <input
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="phone"
            required
            autoComplete="off"
            className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          disabled={emptyDataBody}
          type="submit"
          className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium sm:ml-3 sm:w-auto sm:text-sm text-white ${
            emptyDataBody
              ? "bg-blue-100 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Save
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
          onClick={closeDialog}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditUser;
