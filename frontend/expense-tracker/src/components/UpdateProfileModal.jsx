import React, { useState, useContext, useRef } from "react";
import { updateProfile } from "../utils/updateProfile";
import { UserContext } from "../context/UserContext";
import { toast } from "react-hot-toast";

const UpdateProfileModal = ({ closeModal }) => {
  const { user, setUser } = useContext(UserContext);
  const [fullName, setFullName] = useState(user.fullName || "");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(user.profileImage || null);
  const fileInputRef = useRef();

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", fullName);
    if (image) formData.append("profileImage", image);

    try {
      const res = await updateProfile(formData);
      setUser(res.data);
      toast.success("Profile updated");
      closeModal();
    } catch (err) {
      toast.error("Update failed");
      console.error(err);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg w-96">
      <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Clickable Profile Image */}
        <div className="w-24 h-24 rounded-full overflow-hidden cursor-pointer mx-auto">
          {preview ? (
            <img
              src={preview}
              alt="Profile"
              className="w-full h-full object-cover"
              onClick={handleImageClick}
            />
          ) : (
            <div
              onClick={handleImageClick}
              className="w-full h-full bg-gray-200 flex items-center justify-center text-sm text-gray-600"
            >
              Upload
            </div>
          )}
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          className="hidden"
        />

        {/* Full Name Input */}
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
          className="border p-2 rounded"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button type="button" onClick={closeModal} className="btn-cancel">
            Cancel
          </button>
          <button type="submit" className="add-btn add-btn-fill">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfileModal;
