import React, { ChangeEvent, useState } from "react";

const UploadImageInput = ({
  image,
  setImage,
}: {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [imageUploading, setImageUploading] = useState(false);
  const [showImageUploadFailed, setShowImageUploadFailed] = useState(false);
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    setImageUploading(true);
    if (e.target.files?.length) {
      try {
        const imageUrl = await uploadImage(e.target.files[0]);
        setImage(imageUrl);
      } catch (error) {
        console.log(error);
        setShowImageUploadFailed(true);
        setTimeout(() => {
          setShowImageUploadFailed(false);
        }, 1000);
      }
    }

    setImageUploading(false);
  };

  return (
    <>
      <label
        className={`transition-all border-[1px] border-gray-500 rounded-md p-2 w-full block cursor-pointer mb-2 text-center ${
          imageUploading
            ? "bg-transparent"
            : image
            ? "bg-green-500"
            : "bg-transparent"
        }`}
      >
        <input
          onChange={handleImageUpload}
          accept=".jpg,.jpeg,.png"
          className="hidden"
          type="file"
        />
        {imageUploading
          ? "Uploading..."
          : image
          ? "Uploaded"
          : "Upload Thumbnail"}
      </label>

      <div
        className={`relative h-[2px] w-full bg-green-500 overflow-hidden mb-3 ${
          imageUploading ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute top-0 left-0 h-full w-full bg-white animate-progress-bar"></div>
      </div>

      {showImageUploadFailed && (
        <div className="text-red-500">Image upload failed</div>
      )}
    </>
  );
};

export default UploadImageInput;

export async function uploadImage(image: File) {
  const formData = new FormData();
  console.log(import.meta.env.VITE_IMGBB_API_KEY);
  formData.append("key", import.meta.env.VITE_IMGBB_API_KEY as string);
  formData.append("image", image);

  const response = await fetch("https://api.imgbb.com/1/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    console.log();
    throw new Error("Image upload failed");
  }

  const data = await response.json();
  return data.data.display_url;
}
