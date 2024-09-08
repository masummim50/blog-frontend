import React, { ChangeEvent } from "react";
import { uploadImage } from "../createPostPage/UploadImage";

const UserAvatarImage = ({
  avatarImage,
  setAvatarImage,
  setFormChanged,
}: {
  avatarImage: string;
  setAvatarImage: React.Dispatch<React.SetStateAction<string>>;
  setFormChanged: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [uploadingImage, setUploadingImage] = React.useState(false);
  const handleAvatarImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setUploadingImage(true);
      const imageurl = await uploadImage(e.target.files[0]);
      setUploadingImage(false);
      setAvatarImage(imageurl);
      setFormChanged(true);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <label
        className={`transition-all border border-black   rounded-full p-2 w-[100px] h-[100px]  cursor-pointer mb-2 text-center flex items-center justify-center relative ${
          avatarImage ? `  bg-cover w-[100px] h-full` : ""
        }`}
        style={{
          backgroundImage: avatarImage ? `url(${avatarImage})` : "none",
        }}
      >
        <div className={`absolute h-full w-full bg-black/30 top-0 left-0 rounded-full  z-0 ${uploadingImage && "border-2 border-t-transparent animate-spin"}`}></div>
        <input
          onChange={handleAvatarImageUpload}
          accept=".jpg,.jpeg,.png"
          className="hidden"
          type="file"
        />
        <span className="absolute z-10 text-white">Upload Avatar</span>
      </label>
    </div>
  );
};

export default UserAvatarImage;
