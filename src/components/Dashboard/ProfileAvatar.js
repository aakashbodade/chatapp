import React from "react";
import { Avatar } from "rsuite";
import { getNameInitials } from "../../misc/helper";

const ProfileAvatar = ({ name, ...avatarProps }) => {
  return (
    <Avatar size="lg" circle {...avatarProps}>
      {getNameInitials(name)}
    </Avatar>
  );
};

export default ProfileAvatar;
