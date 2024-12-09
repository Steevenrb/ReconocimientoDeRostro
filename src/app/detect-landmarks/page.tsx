import FaceLandmarks from "@/components/FaceLandmarks";

export default function DetectLandmarksPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Detect Face Landmarks</h1>
      <FaceLandmarks />
    </div>
  );
}
