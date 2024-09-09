import React, { ChangeEvent, useState } from "react";
import { uploadImage } from "../createPostPage/UploadImage";

const UserCoverImage = ({
  coverImage,
  setCoverImage,
  setFormChanged,
}: {
  coverImage: string;
  setCoverImage: React.Dispatch<React.SetStateAction<string>>;
  setFormChanged: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const handleCoverImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setUploadingImage(true);
      const imageurl = await uploadImage(e.target.files[0]);
      setCoverImage(imageurl);
      setFormChanged(true);
      setUploadingImage(false);
    }
  };

  return (
    // <div className="flex flex-col">
    //   <label
    //     className={`transition-all border-[1px] border-gray-500 rounded-md p-2 w-full block cursor-pointer mb-2 text-center `}
    //   >
    //     <input
    //       onChange={handleCoverImageUpload}
    //       accept=".jpg,.jpeg,.png"
    //       className="hidden"
    //       type="file"
    //     />
    //     {/* {imageUploading
    //         ? "Uploading..."
    //         : image
    //         ? "Uploaded"
    //         : "Upload Thumbnail"} */}
    //     Upload Cover
    //   </label>

    // </div>
    <div>
      <div className="flex items-center justify-center">
        <label
          className={`transition-all border border-gray-500  h-[100px] w-full rounded-md  cursor-pointer mb-2 text-center flex items-center justify-center relative ${
            coverImage ? `  bg-cover w-[100px] bg-center ` : ""
          }`}
          style={{
            backgroundImage: coverImage ? `url(${coverImage})` : "none",
          }}
        >
          <input
            onChange={handleCoverImageUpload}
            accept=".jpg,.jpeg,.png"
            className="hidden"
            type="file"
          />
          <span className="absolute z-10 text-white">
            {uploadingImage ? "Uploading..." : "Upload Cover"}
          </span>
        </label>
      </div>
      <div
        className={`relative h-[2px] w-full bg-green-500 overflow-hidden mb-3 ${
          uploadingImage ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute top-0 left-0 h-full w-full bg-white animate-progress-bar"></div>
      </div>
    </div>
  );
};

export default UserCoverImage;
