import React from "react";

export default function CardData({
  title,
  description,
  thumbnailUrl,
  onClick,
}) {
  return (
    <div className="border border-gray-300 bg-gray-100 text-gray-600 rounded-xl overflow-hidden">
      <div className="flex flex-col gap-2">
        <img
          src={thumbnailUrl}
          alt="thumbnail"
          className="object-cover w-full h-48"
        />
        <div className="p-4">
          <h2 className="mb-2 font-medium text-lg">{title}</h2>
          <p className="line-clamp-2 text-base text-gray-500">{description}</p>
          <button
            onClick={onClick}
            className="mt-3 px-4 py-2 bg-gray-200 text-gray-500 rounded-md hover:text-gray-600 hover:bg-zinc-300 transition-all duration-300"
          >
            See more
          </button>
        </div>
      </div>
    </div>
  );
}
