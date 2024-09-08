import React, { ChangeEvent } from "react";

const UserCoverImage = ({
  handleCoverImageUpload,
}: {
  handleCoverImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex flex-col">
      {/* <div className="relative w-[100px] h-7 bg-white overflow-hidden rounded-md">
        <div className="h-[40px] w-[110%] bg-orange-600  z-0  absolute  top-[50%] left-[50%] origin-top-left animate-spin"></div>
        <div className="h-[90%] w-[90%] bg-black z-10 rounded-md absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"></div>
      </div> */}
      <label
        className={`transition-all border-[1px] border-gray-500 rounded-md p-2 w-full block cursor-pointer mb-2 text-center `}
      >
        <input
          onChange={handleCoverImageUpload}
          accept=".jpg,.jpeg,.png"
          className="hidden"
          type="file"
        />
        {/* {imageUploading
            ? "Uploading..."
            : image
            ? "Uploaded"
            : "Upload Thumbnail"} */}
        Upload Cover
      </label>
    </div>
  );
};

export default UserCoverImage;
