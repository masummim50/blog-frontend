import { useQuery } from "@tanstack/react-query";
import React, { ChangeEvent, ChangeEventHandler, useEffect } from "react";
import { axiosInstance } from "../../axios/axiosInstance";
import useAuthStore from "../../zustand/authStore";
import { uploadImage } from "../createPostPage/UploadImage";
import UserAvatarImage from "./UserAvatarImage";
import UserCoverImage from "./UserCoverImage";

const UserProfilePage = () => {
  const userId = useAuthStore((state) => state.auth.id);
  const { data, isSuccess, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const result = await axiosInstance.get(`/users/${userId}`);
      return result.data;
    },
  });
  const [bio, setBio] = React.useState(data?.data?.info);
  const [avatarImage, setAvatarImage] = React.useState(data?.data?.avatarImage);
  const [coverImage, setCoverImage] = React.useState(data?.data?.coverImage);

  useEffect(() => {
    setBio(data?.data?.info);
    setAvatarImage(data?.data?.avatarImage);
    setCoverImage(data?.data?.coverImage);
  }, [data?.data]);
  const [formChanged, setFormChanged] = React.useState(false);

  const handleInfoChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
    if (e.target.value !== data.data.info) {
      setFormChanged(true);
    } else {
      setFormChanged(false);
    }
  };

  const handleCoverImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const imageurl = await uploadImage(e.target.files[0]);
      setCoverImage(imageurl);
      setFormChanged(true);
    }
  };

  const handleUpdate = () => {
    const update = {
      info: bio,
      avatarImage: avatarImage,
      coverImage: coverImage,
    };
    console.log("changed fields: ", update);
  };

  return (
    <div className="min-h-[100vh]">
      {JSON.stringify(data?.data)}
      {isPending && <p>Loading...</p>}
      {isSuccess && data && (
        <div className="flex flex-col gap-4 p-8 bg-transparent max-w-[700px] m-auto">
          {/* Username Field */}
          <div className="flex flex-col">
            <input
              disabled
              value={data.data.userName}
              type="text"
              className="mt-2 p-1 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-200 dark:bg-gray-500  text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col">
            <input
              disabled
              value={data.data.email}
              type="text"
              className="mt-2 p-1 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-200 dark:bg-gray-500  text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Info Field */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Info
            </label>
            <textarea
              onChange={handleInfoChange}
              value={bio}
              placeholder="Tell us something about you"
              rows={4}
              className="mt-2 p-1 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Avatar Image Field */}

          <UserAvatarImage
            avatarImage={avatarImage}
            setAvatarImage={setAvatarImage}
            setFormChanged={setFormChanged}
          />

          {/* Cover Image Field */}
          <UserCoverImage handleCoverImageUpload={handleCoverImageUpload} />

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              onClick={handleUpdate}
              disabled={!formChanged}
              className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
