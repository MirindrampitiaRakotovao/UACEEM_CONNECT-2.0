import React from "react";
import { UserRound } from "lucide-react";

interface AvatarProps {
  src?: string;
  alt?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => {
    return (
      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
        {src ? (
          <img
            src={src}
            alt={alt || "Avatar"}
            className="w-full h-full object-cover"
          />
        ) : (
          <UserRound className="w-8 h-8 text-gray-500" /> 
        )}
      </div>
    );
  };
  
  export default Avatar;
  