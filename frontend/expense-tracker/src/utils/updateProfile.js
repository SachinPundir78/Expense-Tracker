import axiosInstance from "./axiosInstance";
import { API_PATHS } from "./apiPath";

export const updateProfile = async (formData) => {
  try {
    const response = await axiosInstance.put(
      API_PATHS.IMAGE.UPDATE_PROFILE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Profile update failed:", err);
    throw err;
  }
};
