import React from 'react';

import CourseLists from '../../../components/PROF/CourseLists';


const CourseList = () => {
  return (
    <div>
      {/* Header */}


      {/* Main Content */}
      <main className="flex w-[95%] mx-auto gap-4 p-4">
        {/* Course Lists Section */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md mt-6">
          <CourseLists />
        </div>

        {/* Right Sidebar */}
        <div className="w-[20%]">

        </div>
      </main>
    </div>
  );
};

export default CourseList;
