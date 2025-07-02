"use client";

import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FaceDetection() {
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [detections, setDetections] = useState<faceapi.FaceDetection[]>([]);
  const [labeledDescriptors, setLabeledDescriptors] = useState<faceapi.LabeledFaceDescriptors[]>([]);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cargar modelos y descriptores al iniciar
  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      ]);
      await loadLabeledImages();
    };
    loadModels();
  }, []);

  // Cargar imágenes conocidas (dataset)
  const loadLabeledImages = async () => {
    const labels = ["steeven", "maria", "richard"]; // cambia según tus archivos en /public/train/
    const descriptors: faceapi.LabeledFaceDescriptors[] = [];

    for (const label of labels) {
      const imgUrl = `/train/${label}.jpg`;
      const img = await faceapi.fetchImage(imgUrl);
      const detection = await faceapi
        .detectSingleFace(img)
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (detection) {
        descriptors.push(
          new faceapi.LabeledFaceDescriptors(label, [detection.descriptor])
        );
      } else {
        console.warn(`No se detectó rostro en ${label}`);
      }
    }

    setLabeledDescriptors(descriptors);
  };

  // Detectar rostro en imagen cargada y reconocerlo
  const handleDetect = async () => {
    if (imageRef.current && canvasRef.current) {
      const detections = await faceapi
        .detectAllFaces(imageRef.current)
        .withFaceLandmarks()
        .withFaceDescriptors();

      setDetections(detections);

      const displaySize = {
        width: imageRef.current.width,
        height: imageRef.current.height,
      };
      faceapi.matchDimensions(canvasRef.current, displaySize);
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvasRef.current
        .getContext("2d")
        ?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      if (labeledDescriptors.length > 0) {
        const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);

        resizedDetections.forEach((detection) => {
          const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
          const box = detection.detection.box;
          const drawBox = new faceapi.draw.DrawBox(box, {
            label: bestMatch.toString(),
          });
          drawBox.draw(canvasRef.current!);
        });
      } else {
        faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
      }
    }
  };

  // Cambiar imagen por archivo local
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Cambiar imagen por URL
  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
    setImageFile(null);
  };

  const handleTabChange = (value: string) => {
    setImageUrl("");
    setImageFile(null);
    setDetections([]);
    if (canvasRef.current) {
      canvasRef.current
        .getContext("2d")
        ?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  return (
    <Card>
      <CardContent className="space-y-4">
        <Tabs defaultValue="url" className="w-full mt-6" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="url">Image URL</TabsTrigger>
            <TabsTrigger value="upload">Upload Image</TabsTrigger>
          </TabsList>
          <TabsContent value="url">
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                type="text"
                placeholder="Enter image URL"
                value={imageUrl}
                onChange={handleUrlChange}
              />
            </div>
          </TabsContent>
          <TabsContent value="upload">
            <div className="space-y-2">
              <Label htmlFor="imageFile">Upload Image</Label>
              <Input
                id="imageFile"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
            </div>
          </TabsContent>
        </Tabs>
        <Button onClick={handleDetect}>Detectar Rostros</Button>
        <div className="relative max-w-full overflow-hidden">
          {imageUrl && (
            <>
              <img
                ref={imageRef}
                src={imageUrl}
                alt="Face detection"
                className="max-w-full h-auto"
                crossOrigin="anonymous"
                onError={() => setImageUrl("")}
              />
              <canvas ref={canvasRef} className="absolute top-0 left-0" />
            </>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold">Rostros Detectados: {detections.length}</h3>
        </div>
      </CardContent>
    </Card>
  );
}
