import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { useNavigate } from "react-router";
type Venue = {
  id: string;
  name: string;
  description: string;
  city: string;
  images?:string[];
};

export default function MyVenue() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/venues/mine`,
          { withCredentials: true }
        );
        setVenues(res.data);
      } catch (error) {
        alert("Failed to load venues");
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);
    const handleLogout = async () => {
  try {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );

    navigate("/signin");
  } catch (error) {
    alert("Logout failed");
  }
};
  if (loading) return <div className="p-6">Loading...</div>;
  if (venues.length === 0) return <div className="p-6">No venues found</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">My Venues</h2>
      <button className="bg-red-600 text-amber-50 p-2 rounded-lg hover:bg-red-500 hover:text-amber-100 transition" onClick={handleLogout}>Logout</button>
      <Link to={"/venue"}><button className="p-2 m-2 bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition">Create Listing</button></Link>
      <div className="space-y-6">
        {venues.map((venue) => (
          <div key={venue.id} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold">{venue.name}</h3>
            <p className="text-gray-600">{venue.city}</p>
            <p className="mt-2">{venue.description}</p>
            <Link to={`/upload/${venue.id}`}><button className="p-2 bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition">Upload Image</button></Link>
            
            {venue.images && venue.images.length> 0 && (
              <div className="grid grid-cols-2 gap-3 mt-4">
                {venue.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="venue"
                    className=" h-32 rounded"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
