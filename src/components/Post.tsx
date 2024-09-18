interface PostProps {
    user: {
      name: string;
      role: string;
      avatar: string;
    };
    content: string;
    images: string[];
  }
  
  const Post: React.FC<PostProps> = ({ user, content, images }) => (
    <div className="bg-white p-4 border rounded-lg shadow-md mb-4">
      <div className="flex items-center mb-4">
        <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover mr-4" />
        <div>
          <h2 className="font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-500">{user.role}</p>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{content}</p>
      <div className="grid grid-cols-2 gap-2">
        {images.map((img, idx) => (
          <img key={idx} src={img} alt="Post" className="w-full h-40 object-cover rounded-md" />
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-2">
          <span className="cursor-pointer">💬</span>
          <span className="cursor-pointer">❤️</span>
        </div>
      </div>
    </div>
  );
  
  export default Post;
  