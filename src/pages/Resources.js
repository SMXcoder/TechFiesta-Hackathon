import React from 'react';
import { Play } from 'lucide-react';

const Resources = () => {
  // Mock Data (since backend might not be running)
  const videos = [
    { title: "Mindfulness 101", duration: "10 min", img: "/mind.jpg" },
    { title: "Managing Exam Stress", duration: "15 min", img: "/stress.jpg" },
    { title: "Better Sleep Habits", duration: "8 min", img: "/image_stress.jpg" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Resource Library</h1>
      
      {/* Featured Player Placeholder */}
      <div className="bg-black rounded-3xl overflow-hidden aspect-video shadow-2xl mb-12 relative group">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer group-hover:scale-110 transition">
            <Play className="text-white fill-current ml-1" />
          </div>
        </div>
        <img src="/index1.jpg" alt="Featured" className="w-full h-full object-cover opacity-60" />
        <div className="absolute bottom-0 left-0 p-8">
          <h2 className="text-white text-3xl font-bold">Guided Meditation for Beginners</h2>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Recommended Videos</h2>
      <div className="flex gap-6 overflow-x-auto pb-8 resource-strip">
        {videos.map((vid, i) => (
          <div key={i} className="min-w-[280px] bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="h-40 bg-gray-200">
              <img src={vid.img} alt={vid.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-slate-800">{vid.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{vid.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;