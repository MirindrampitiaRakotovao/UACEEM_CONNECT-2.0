import React from 'react';

import InputBox from './FeedContain/InputBox.tsx';
import Posts from './FeedContain/Posts.tsx';


const Feed = () => {
   return (
     <div className="flex justify-center items-start w-full">
       <div className="w-full max-w-full px-4 sm:px-6 lg:px-8">
         <div className="space-y-6">
           <div className="w-full">
             <InputBox />
           </div>
           <div className="w-full">
             <Posts />
           </div>
         </div>
       </div>
     </div>
   );
};
export default Feed;