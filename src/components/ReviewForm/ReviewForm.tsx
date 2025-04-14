"use client";

import { useState } from "react";
import StarRating from "../StarRating"; 

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Rating:", rating);
    console.log("Comments:", comments);
    
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white rounded shadow"
    >
      <h2 className="text-xl font-bold mb-4">Submit Review</h2>

      <label className="block text-sm font-medium text-gray-700 mb-2">
        Medical Office Rating
      </label>

      <StarRating defaultRating={rating} onChange={setRating} />

      <label className="block text-sm font-medium text-gray-700 mt-6 mb-2">
        Comments About The Medical Office
      </label>

      <textarea
        className="w-full border rounded p-3 text-sm focus:outline-none focus:ring focus:border-blue-300"
        rows={4}
        placeholder="Write your comments here..."
        value={comments}
        onChange={(e) => setComments(e.target.value)}
      />

      <button
        type="submit"
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}
