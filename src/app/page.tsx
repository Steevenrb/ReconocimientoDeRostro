import Link from "next/link";
import { Camera, UserCheck } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Camera,
      title: "Detectar Rostros",
      href: "/detect-faces",
      color: "bg-blue-300 hover:bg-blue-400",
    },
    {
      icon: UserCheck,
      title: "Autenticar Rostros",
      href: "/face-auth",
      color: "bg-red-300 hover:bg-red-400",
    },
  ];

  return (
    // Contenedor principal que centra todo
    <div className="flex items-center justify-center min-h-[calc(100dvh-4rem)] p-4">

      <div className="grid grid-cols-2 gap-64">
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
              h-80  // Alto de 80 (20rem = 320px)
              w-80  // Ancho de 80 (20rem = 320px)
              p-3   // Padding interno
            `}
          >
            <feature.icon size={48} className="mb-2" />
            <span className="text-center font-semibold">{feature.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}