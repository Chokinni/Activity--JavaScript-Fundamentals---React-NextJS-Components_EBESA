"use client";

export default function VideoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-900 to-gray-800 p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-6">THANK YOU FOR VISITING</h1>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              className="w-full h-[500px] rounded-lg"
              src="https://www.youtube.com/embed/WdOO-f6ywdQ"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <a
            href="/"
            className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
} 