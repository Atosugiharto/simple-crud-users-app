/* eslint-disable prettier/prettier */
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Spinner from "../../shared-components/Spinner";
import NoDataCondition from "../../shared-components/NoDataCondition";
import Pagination from "../../shared-components/Pagination";
import DeleteDialog from "../../shared-components/DeleteDialog";
import { deleteUser } from "./usersSlice";
import CommonDialog from "../../shared-components/CommonDialog";
import EditUser from "./EditUser";

export default function UsersTable({ datas, isloading }) {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDeleteDialog, setopenDeleteDialog] = useState(false);
  const [openEditDialog, setopenEditDialog] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const deleteCondition = confirmDeleteId !== null;
  const dispatch = useDispatch();
  const [dataWithImages, setDataWithImages] = useState([]);

  const closeDialog = () => {
    setConfirmDeleteId(null);
    setopenDeleteDialog(false);
    setopenEditDialog(false);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteUser(id))
      .then((result) => {
        toast.success("Data has been deleted!", {
          duration: 2000,
          position: "top-center",
        });
      })
      .catch((err) => {
        toast.error("Failed to delete data!", {
          duration: 2000,
          position: "top-center",
        });
      });
  };

  useEffect(() => {
    if (confirmDeleteId !== null) {
      setopenDeleteDialog(true);
    }
  }, [confirmDeleteId]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset to the first page when changing items per page.
  };

  // Calculate the range of data to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = dataWithImages.slice(startIndex, endIndex);

  const [dataById, setDataById] = useState([]);

  const handleClickOpens = (data) => {
    setDataById(data);
    setopenEditDialog(true);
  };

  // Fetch random images and add them to the data
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const updatedData = await Promise.all(
        datas.map(async (item) => {
          const response = await fetch("https://picsum.photos/200");
          const url = response.url;
          return { ...item, imageUrl: url };
        })
      );
      setDataWithImages(updatedData);
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchImages();
  }, [datas]);

  return (
    <div>
      <CommonDialog
        openDialog={openEditDialog}
        closeDialog={closeDialog}
        title={"Edit Data User"}
        childComponent={
          <EditUser closeDialog={closeDialog} id={dataById?.id} />
        }
      />
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              {isloading === "loading" || loading ? ( // Show spinner while loading
                <div className="flex justify-center items-center p-10">
                  <Spinner classAddition={"h-10 w-10"} />
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                      >
                        No
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                      >
                        Phone
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                      >
                        Image
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedData.map((data, index) => (
                      <tr key={data?.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {index + 1 + startIndex}
                          </div>
                        </td>
                        <td className="flex items-center gap-2 px-6 py-4 whitespace-nowrap">
                          <img
                            src={data?.imageUrl}
                            alt="Random"
                            className="h-10 w-10 rounded-md object-cover"
                          />
                          <div className="text-sm text-gray-900">
                            {data?.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {data?.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {data?.phone}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex items-center justify-end">
                          <div className="flex justify-end items-center gap-4 mt-2">
                            <button
                              onClick={() => handleClickOpens(data)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <PencilAltIcon className="h-6 w-auto" />
                            </button>
                            <button
                              onClick={() => setConfirmDeleteId(data)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <TrashIcon className="h-6 w-auto" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <NoDataCondition datas={dataWithImages} isloading={isloading} />
          </div>
        </div>
        <Pagination
          startIndex={startIndex}
          paginatedData={paginatedData}
          datas={dataWithImages}
          handleItemsPerPageChange={handleItemsPerPageChange}
          itemsPerPage={itemsPerPage}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
      {deleteCondition && (
        <DeleteDialog
          openDialog={openDeleteDialog}
          setopenDialog={setopenDeleteDialog}
          closeDialog={closeDialog}
          dataWillDelete={confirmDeleteId?.name}
          functionDelete={() => {
            handleDelete(confirmDeleteId?.id);
            closeDialog();
          }}
        />
      )}
    </div>
  );
}
