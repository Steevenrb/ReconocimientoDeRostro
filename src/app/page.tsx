import Link from "next/link";
import { Camera, MapPin, Fingerprint, UserCheck } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Camera,
      title: "Detect Faces",
      href: "/detect-faces",
      color: "bg-blue-100 hover:bg-blue-200",
    },
    {
      icon: MapPin,
      title: "Detect Landmarks",
      href: "/detect-landmarks",
      color: "bg-green-100 hover:bg-green-200",
    },
    {
      icon: Fingerprint,
      title: "Compute Descriptors",
      href: "/compute-descriptors",
      color: "bg-purple-100 hover:bg-purple-200",
    },
    {
      icon: UserCheck,
      title: "Face Authentication",
      href: "/face-auth",
      color: "bg-red-100 hover:bg-red-200",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 p-4 h-[calc(100dvh-4rem)]">
      {features.map((feature) => (
        <Link
          key={feature.href}
          href={feature.href}
          className={`
            ${feature.color}
            flex flex-col items-center justify-center
            rounded-lg shadow-md
            transition-all duration-300
            hover:scale-105
            active:scale-95
          `}
        >
          <feature.icon size={48} className="mb-2" />
          <span className="text-center font-semibold">{feature.title}</span>
        </Link>
      ))}
    </div>
  );
}
