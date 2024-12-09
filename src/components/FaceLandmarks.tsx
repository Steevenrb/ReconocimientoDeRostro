"use client";

import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FaceLandmarks() {
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [landmarks, setLandmarks] = useState<faceapi.FaceLandmarks68[]>([]);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
    };
    loadModels();
  }, []);

  const handleDetect = async () => {
    if (imageRef.current && canvasRef.current) {
      const detections = await faceapi.detectAllFaces(imageRef.current).withFaceLandmarks();
      setLandmarks(detections.map((d) => d.landmarks));

      const displaySize = { width: imageRef.current.width, height: imageRef.current.height };
      faceapi.matchDimensions(canvasRef.current, displaySize);
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvasRef.current
        .getContext("2d")
        ?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      console.info(imageFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
    setImageFile(null);
  };

  const handleTabChange = (value: string) => {
    console.info(value);
    setImageUrl("");
    setImageFile(null);
    setLandmarks([]);
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
        <Button onClick={handleDetect}>Detect Landmarks</Button>
        <div className="relative max-w-full overflow-hidden">
          {imageUrl && (
            <>
              <img
                ref={imageRef}
                src={imageUrl}
                alt="Face landmarks"
                className="max-w-full h-auto"
                crossOrigin="anonymous"
                onError={() => setImageUrl("")}
              />
              <canvas ref={canvasRef} className="absolute top-0 left-0" />
            </>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold">Detected Landmarks: {landmarks.length}</h3>
        </div>
      </CardContent>
    </Card>
  );
}
