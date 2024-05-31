import React from "react";

const NoDataCondition = ({ datas, isloading = true }) => {
  return (
    <>
      {datas.length < 1 && isloading === "succeeded" && (
        <div className="my-10 flex items-center justify-center">
          <p className="font-medium text-sm">No Data Found</p>
        </div>
      )}
    </>
  );
};

export default NoDataCondition;
