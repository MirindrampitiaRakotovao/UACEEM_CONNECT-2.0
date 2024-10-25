import React from 'react';
import InputBox from './FeedContain/InputBox';
import Posts from './FeedContain/Posts';

const Feed = () => {
  return (
    <div className="flex flex-grow h-screen pb-44 pt-6 overflow-y-auto" id="feed-scrollbar-hide">
      <div className="mx-auto w-full max-w-md md:max-w-lg lg:max-w-2xl">
        <InputBox />
        <Posts />
      </div>
    </div>
  );
};

export default Feed;

