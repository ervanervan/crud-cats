import React from "react";

export default function CardDetail({ thumbnailUrl, title, description }) {
  return (
    <div className="md:h-fit border border-gray-300 bg-gray-100 text-gray-600 rounded-xl overflow-hidden">
      <div className="flex flex-col md:flex-row gap-2">
        <img
          src={thumbnailUrl}
          alt="thumbnail"
          className="object-cover w-full md:w-1/2"
        />
        <div className="p-4">
          <h2 className="mb-2 font-medium text-lg">{title}</h2>
          <p className="text-base text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
}
