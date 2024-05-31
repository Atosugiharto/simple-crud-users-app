import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "./usersSlice";
import AddUser from "./AddUser";
import CommonDialog from "../../shared-components/CommonDialog";
import { PlusCircleIcon } from "@heroicons/react/outline";
import UsersTable from "./UsersTable";

const UsersList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const isloading = useSelector((state) => state.users.status);
  const [openAdd, setopenAdd] = useState(false);
  const closeDialog = () => {
    setopenAdd(false);
  };

  useEffect(() => {
    if (isloading === "idle") {
      dispatch(fetchUsers());
    }
  }, [isloading, dispatch]);

  return (
    <div>
      <CommonDialog
        openDialog={openAdd}
        closeDialog={closeDialog}
        title={"Add New User"}
        childComponent={<AddUser closeDialog={closeDialog} />}
      />
      <div className="md:flex items-center justify-between mb-4">
        <div className="font-bold mb-2 md:mb-0">List of Users</div>
        <div className="flex items-center gap-4">
          <div>
            <button
              onClick={() => setopenAdd(true)}
              className="flex items-center gap-2 py-2 px-2 bg-blue-500 text-white hover:bg-blue-600 rounded-md"
            >
              <PlusCircleIcon
                className="h-5 w-5 text-wihte"
                aria-hidden="true"
              />
              <span className="text-sm hidden sm:flex">Add New User</span>
            </button>
          </div>
        </div>
      </div>
      <div>
        <UsersTable datas={users} isloading={isloading} />
      </div>
    </div>
  );
};

export default UsersList;
