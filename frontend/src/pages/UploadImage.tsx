import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useParams } from "react-router-dom";
import { useNavigate} from "react-router";
import axios from "axios";

const MAX_FILES = 3;
const MAX_SIZE = 4 * 1024 * 1024; // 4 MB

export default function UploadImage() {
  const { id } = useParams();
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > MAX_FILES) {
      alert("You can upload maximum 3 images");
      return;
    }

    const oversized = acceptedFiles.find(
      (file) => file.size > MAX_SIZE
    );

    if (oversized) {
      alert("Each image must be less than 4 MB");
      return;
    }

    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
    maxFiles: MAX_FILES,
    maxSize: MAX_SIZE,
  });

  const uploadImages = async () => {
    if (files.length === 0) {
      alert("Please select images");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    try {
      setUploading(true);
      setProgress(0);

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/venues/${id}/images`,
        formData,
        {
          withCredentials: true,
          onUploadProgress: (e) => {
            if (e.total) {
              setProgress(Math.round((e.loaded * 100) / e.total));
            }
          },
        }
      );

      alert("Images uploaded successfully");
      navigate(`/myvenue`);
      setFiles([]);
      setUploading(false);
    } catch {
      alert("Upload failed");
        setUploading(false);
    } 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow w-96">
        <h2 className="text-xl font-semibold mb-4">
          Upload Venue Images
        </h2>

        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-400 p-6 text-center cursor-pointer mb-4"
        >
          <input {...getInputProps()} />
          <p className="text-gray-600">
            Drag & drop images or click
          </p>
          <p className="text-sm text-gray-400">
            Max 3 images • Max 4 MB each
          </p>
        </div>

        {files.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {files.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                className="h-20 w-full object-cover rounded"
              />
            ))}
          </div>
        )}

        {uploading && (
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded h-2">
              <div
                className="bg-indigo-500 h-2 rounded"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-center mt-1">
              {progress}%
            </p>
          </div>
        )}

        <button
          onClick={uploadImages}
          disabled={uploading}
          className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload Images"}
        </button>
      </div>
    </div>
  );
}
