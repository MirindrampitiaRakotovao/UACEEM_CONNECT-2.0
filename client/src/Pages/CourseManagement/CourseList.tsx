import React from 'react';
import HeaderProfesseur from '../../components/Acceuil/AcceuilAdmin/Header/HeaderProfesseur';
import CourseLists from '../../components/CourseLists';
import RightSidebar from '../../components/Acceuil/AcceuilAdmin/RightSidebar/RightSidebar';

const CourseList = () => {
  return (
    <div>
      {/* Header */}
      <HeaderProfesseur />

      {/* Main Content */}
      <main className="flex w-[95%] mx-auto gap-4 p-4">
        {/* Course Lists Section */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md mt-6">
          <CourseLists />
        </div>

        {/* Right Sidebar */}
        <div className="w-[20%]">
          <RightSidebar />
        </div>
      </main>
    </div>
  );
};

export default CourseList;
