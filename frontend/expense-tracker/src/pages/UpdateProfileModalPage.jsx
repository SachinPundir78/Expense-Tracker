// src/pages/UpdateProfileModalPage.jsx
import React from "react";
import UpdateProfileModal from "../components/UpdateProfileModal";
import { useNavigate } from "react-router-dom";

const UpdateProfileModalPage = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <UpdateProfileModal closeModal={() => navigate(-1)} />
    </div>
  );
};

export default UpdateProfileModalPage;
