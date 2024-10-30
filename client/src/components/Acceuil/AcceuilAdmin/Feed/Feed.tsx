import React from 'react';
import Posts from './FeedContain/Posts';
import InputBox from './FeedContain/InputBox';

const Feed = () => {
  return (
    <div className="flex justify-center items-start w-full">
      <div className="w-full max-w-[90%] md:max-w-[85%] lg:max-w-[80%] xl:max-w-[75%] p-6">
        <div className="space-y-6"> {/* Ajout d'un conteneur avec espacement vertical */}
          <div className="w-full"> {/* Conteneur pour InputBox */}
            <InputBox />
          </div>
          <div className="w-full"> {/* Conteneur pour Posts */}
            <Posts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;