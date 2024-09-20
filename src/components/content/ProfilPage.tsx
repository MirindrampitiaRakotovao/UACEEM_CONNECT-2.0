import Avatar from '../avatar';

const UserProfile: React.FC = () => {

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-4 p-6">
      {/* Header with Avatar and username */}
      <div className="flex space-x-5 items-center">
        <Avatar />
        <div>
          <h1 className="text-3xl font-bold">lorem</h1>
          <p className="text-gray-600">lorem</p>
        </div>
      </div>

      {/* Education and location */}
      <div className="mt-6">
        <h2 className="text-xl font-bold">Education</h2>
        <ul className="mt-2">
          
            <li  className="text-gray-700">lorem</li>
         
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold">Location</h2>
        <p className="text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, explicabo. Ratione, inventore veritatis quis rem, numquam, ab tempore modi doloremque temporibus aliquid deleniti consequuntur incidunt facere. Nihil officia animi suscipit.</p>
      </div>

      {/* Add more sections like friends, posts, etc. based on your data structure */}
    </div>
  );
};

export default UserProfile;
