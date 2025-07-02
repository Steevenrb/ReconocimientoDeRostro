"use client";

import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertTriangle } from "lucide-react";

export default function FaceAuth() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recognizedNames, setRecognizedNames] = useState<string[]>([]);
  const [unrecognizedCount, setUnrecognizedCount] = useState(0);
  const [labeledDescriptors, setLabeledDescriptors] = useState<faceapi.LabeledFaceDescriptors[]>([]);

  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = "/models";
        setIsLoading(true);
        setError(null);

        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        ]);

        await loadLabeledImages();
        setIsModelLoaded(true);
      } catch (err) {
        setError("Error loading face recognition models. Ensure files are in /public/models.");
        console.error("Error loading models:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadModels();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const loadLabeledImages = async () => {
    const labels = ["steeven", "maria", "richard"]; // Nombres = archivos train/steeven.jpg, etc.
    const descriptors: faceapi.LabeledFaceDescriptors[] = [];

    for (const label of labels) {
      const img = await faceapi.fetchImage(`/train/${label}.jpg`);
      const detection = await faceapi
        .detectSingleFace(img)
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (detection) {
        descriptors.push(new faceapi.LabeledFaceDescriptors(label, [detection.descriptor]));
      } else {
        console.warn(`No se detectó rostro en ${label}`);
      }
    }

    setLabeledDescriptors(descriptors);
  };

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 720 },
          height: { ideal: 480 },
          facingMode: "user",
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError("Error de cámara. Verifica permisos o conexión segura (HTTPS).");
      console.error(err);
    }
  };

  const handleVideoOnPlay = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (!canvas || !video) return;

    const displaySize = { width: 720, height: 480 };
    faceapi.matchDimensions(canvas, displaySize);

    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);

    const interval = setInterval(async () => {
      try {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptors();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        const ctx = canvas.getContext("2d");
        ctx?.clearRect(0, 0, canvas.width, canvas.height);

        const recognized: string[] = [];
        let unrecognized = 0;

        resizedDetections.forEach((detection) => {
          const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
          const label = bestMatch.label !== "unknown" ? bestMatch.label : "Desconocido";
          const drawBox = new faceapi.draw.DrawBox(detection.detection.box, { label });
          drawBox.draw(canvas);

          if (bestMatch.label !== "unknown") {
            recognized.push(bestMatch.label);
          } else {
            unrecognized++;
          }
        });

        setRecognizedNames(recognized);
        setUnrecognizedCount(unrecognized);
      } catch (err) {
        console.error("Error durante detección:", err);
      }
    }, 400);

    return () => clearInterval(interval);
  };

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4 mr-2" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="relative w-full max-w-[720px] h-[480px] mx-auto bg-muted rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          onPlay={handleVideoOnPlay}
          width="720"
          height="480"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Loader2 className="w-8 h-8 animate-spin text-white" />
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <Button
          onClick={startVideo}
          disabled={!isModelLoaded || isLoading}
          className="w-full max-w-xs"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Cargando...
            </>
          ) : (
            "Iniciar Cámara"
          )}
        </Button>
      </div>

      {recognizedNames.length > 0 && (
        <Alert className="bg-green-500/15 text-green-500 border-green-500/50">
          <AlertDescription>
            ✅ Rostros reconocidos:
            <ul className="ml-4 list-disc">
              {recognizedNames.map((name, i) => (
                <li key={i}>{name}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {unrecognizedCount > 0 && (
        <Alert className="bg-yellow-200/20 text-yellow-700 border-yellow-400/40">
          <AlertDescription>
            ⚠️ No se reconocieron a {unrecognizedCount}{" "}
            {unrecognizedCount === 1 ? "persona" : "personas"}.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
