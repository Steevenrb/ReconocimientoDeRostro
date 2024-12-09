# Face Recognition App

A comprehensive face recognition application built with Next.js and face-api.js that provides multiple facial analysis features.

## Features

- **Face Detection**: Detect and locate faces in images
- **Facial Landmarks**: Identify 68 facial landmark points
- **Face Descriptors**: Generate unique face descriptors for recognition
- **Face Authentication**: Real-time face authentication using webcam
- **Multiple Input Methods**: Support for both URL and file upload
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- face-api.js
- Shadcn UI
- Tailwind CSS

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/LucaPalminteri/face-api.git
```
2.  Install dependencies:

.copy-icon { \* { transition: transform 0.35s cubic-bezier(0.35, 0.2, 0.14, 0.95), d 0.35s cubic-bezier(0.35, 0.2, 0.14, 0.95); } } button:has(.copy-icon):hover, button:has(.copy-icon):focus-visible { .left { d: path("M 2.75 0.5 C 1.7835 0.5 1 1.2835 1 2.25 V 9.75 C 1 10.7165 1.7835 11.5 2.75 11.5 H 3.75 H 6.5 V 10 H 3.75 H 2.75 C 2.6119 10 2.5 9.8881 2.5 9.75 V 2.25 C 2.5 2.1119 2.6119 2 2.75 2 H 8.25 C 8.3881 2 8.5 2.1119 8.5 2.25 V 5 H 10 V 2.25 C 10 1.2835 9.2165 0.5 8.25 0.5 H 2.75 Z"); transform: translate(-1px, -1px); } .right { transform: translate(1px, 1px); } }

`cd face-api npm install`

3.  Run the development server:

.copy-icon { \* { transition: transform 0.35s cubic-bezier(0.35, 0.2, 0.14, 0.95), d 0.35s cubic-bezier(0.35, 0.2, 0.14, 0.95); } } button:has(.copy-icon):hover, button:has(.copy-icon):focus-visible { .left { d: path("M 2.75 0.5 C 1.7835 0.5 1 1.2835 1 2.25 V 9.75 C 1 10.7165 1.7835 11.5 2.75 11.5 H 3.75 H 6.5 V 10 H 3.75 H 2.75 C 2.6119 10 2.5 9.8881 2.5 9.75 V 2.25 C 2.5 2.1119 2.6119 2 2.75 2 H 8.25 C 8.3881 2 8.5 2.1119 8.5 2.25 V 5 H 10 V 2.25 C 10 1.2835 9.2165 0.5 8.25 0.5 H 2.75 Z"); transform: translate(-1px, -1px); } .right { transform: translate(1px, 1px); } }

`npm run dev`

4.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

*   `/app`: Next.js app router pages and layouts
*   `/components`: React components including face detection features
*   `/public/models`: face-api.js model files
*   `/lib`: Utility functions and configurations

## Features in Detail

### Face Detection

Upload an image or provide a URL to detect faces. The app will draw rectangles around detected faces and provide a count.

### Facial Landmarks

Detect and display 68 facial landmark points including eyes, nose, mouth, and jawline.

### Face Descriptors

Generate numerical descriptors that can be used for face recognition and comparison.

### Face Authentication

Use your webcam for real-time face detection and authentication.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Luca Palminteri

*   GitHub: [@LucaPalminteri](https://github.com/LucaPalminteri)

## Acknowledgments

*   [face-api.js](https://github.com/justadudewhohacks/face-api.js) for the face recognition functionality
*   [Shadcn UI](https://ui.shadcn.com/) for the component library
