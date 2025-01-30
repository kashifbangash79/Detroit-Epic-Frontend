/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function BlogPostCard({ post }) {
  return (
    <div className="border rounded overflow-hidden shadow group transition-transform duration-200 hover:scale-105">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold">{post.title}</h2>
        <p className="text-sm text-gray-500">{post.category}</p>
        <p className="text-sm mt-2">{post.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[15px] text-gray-500">
            {new Date(post.date).toLocaleDateString()}
          </span>
          <Link
            to={`/blogs/${post._id}`}
            className="no-underline bg-gray-700 text-white text-sm font-medium shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out border border-gray-600 px-4 py-2 rounded-md"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}
