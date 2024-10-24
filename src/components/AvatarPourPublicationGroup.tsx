import React from "react";
import Couverture from "./couverture";
import Avatar from "./avatar";

interface ProfileBannerProps {
  couvertureSize?: string; // Option to adjust couverture size
  avatarSize?: string; // Option to adjust avatar size
  groupId: number;
  userId: number;
}

const ProfileBanner: React.FC<ProfileBannerProps> = ({
  couvertureSize = "w-32 h-32", // Size of the cover (you can adjust)
  avatarSize = "w-10 h-10", // Size of the avatar
  groupId,
  userId,
}) => {
  return (
    <div className="relative"> 
      {/* Container that wraps both components */}
      <Couverture size={couvertureSize} groupId={groupId} />

      <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2">
        {/* Avatar positioned at the bottom right of the cover */}
        <Avatar size={avatarSize} userId={userId} />
      </div>
    </div>
  );
};

export default ProfileBanner;
