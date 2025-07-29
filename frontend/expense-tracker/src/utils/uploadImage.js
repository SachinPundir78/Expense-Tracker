import axiosInstance from "./axiosInstance";
import { API_PATHS } from "./apiPath";

export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
      );
      console.log("Upload Response:", response.data);
    return response.data; 
  } catch (err) {
    console.error("Error uploading image:", err);
    throw err;
  }
};

