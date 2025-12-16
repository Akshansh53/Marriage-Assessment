import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Venue() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const navigate=useNavigate();

  const createVenue = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || !city) {
      alert("All fields are required");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/venues/createvenue`,
        { name, description, city },
        { withCredentials: true }
      );

      alert("Venue created");
      navigate("/myvenue");
      setName("");
      setDescription("");
      setCity("");
    } catch (error) {
      alert("Failed to create venue");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={createVenue}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Venue
        </h2>

        <input
          type="text"
          placeholder="Venue Name"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          placeholder="City"
          className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition"
        >
          Create Venue
        </button>
      </form>
    </div>
  );
}
