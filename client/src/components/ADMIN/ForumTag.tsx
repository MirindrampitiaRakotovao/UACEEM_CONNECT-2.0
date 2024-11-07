const ForumTag: React.FC<{ text: string }> = ({ text }) => (
    <span className="bg-gradient-to-r from-[#FF6B6B] to-[#ff5147] text-white text-xs py-1 px-2 rounded-full">
        {text}
    </span>
);

export default ForumTag;
