import React from "react";
import { getCurrentUser } from "../services/auth.service";

const Profile: React.FC = () => {
  const currentUser = getCurrentUser();

  return (
    <div className="grid text-center text-gray-200">
      <header className="text-3xl">
        <b>{currentUser.username}</b> Profile
      </header><br />
      <span>
        <b>Token:</b> &nbsp;{currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </span>
      <span><b>Id:</b> &nbsp;{currentUser.id}</span>
      <span><b>Email:</b> &nbsp;{currentUser.email}</span>
      <span><b>Username:</b> &nbsp;{currentUser.username}</span>
    </div>
  );
};

export default Profile;
