import FaceDetection from "@/components/FaceDetection";

export default function DetectFacesPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Detect Faces</h1>
      <FaceDetection />
    </div>
  );
}
