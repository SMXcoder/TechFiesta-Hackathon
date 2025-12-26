import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PublicLayout from '../components/PublicLayout'; // We will create this wrapper next

const ResourcesPage = () => {
  return (
    <PublicLayout>
      <div className="py-20 px-6 bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white">A Library for Your Mind</h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-zinc-400">
              Explore our curated collection of videos and audio exercises designed to help you relax, focus, and grow.
            </p>
          </div>

          {/* Video Resources */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">Video Guides</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ResourceCard 
                img="/mind.jpg" 
                title="Mindfulness & Meditation" 
                desc="Learn to quiet your mind, reduce stress, and improve focus with guided video sessions." 
              />
              <ResourceCard 
                img="/stress.jpg" 
                title="Stress Management" 
                desc="Discover practical techniques to handle academic pressure and daily anxieties effectively." 
              />
              <ResourceCard 
                img="/3.jpg" 
                title="Building Healthy Habits" 
                desc="Watch expert-led videos on creating positive routines for sleep, study, and self-care." 
              />
            </div>
          </div>

          {/* Audio Resources */}
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-8">Audio Exercises</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ResourceCard 
                img="https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=2070&auto=format&fit=crop" 
                title="Guided Sleep Meditation" 
                desc="Drift into a restful sleep with calming audio sessions designed to quiet your mind." 
              />
              <ResourceCard 
                img="/focus.jpg" 
                title="Focus Enhancement" 
                desc="Listen to curated soundscapes and binaural beats to improve concentration while studying." 
              />
              <ResourceCard 
                img="/enzity.jpg" 
                title="Anxiety Relief" 
                desc="Access quick, guided breathing exercises and grounding techniques for moments of high anxiety." 
              />
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

const ResourceCard = ({ img, title, desc }) => (
  <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/50 hover:scale-[1.02] transition-transform duration-300">
    <img src={img} alt={title} className="rounded-lg mb-4 h-48 w-full object-cover shadow-sm" />
    <h3 className="font-bold text-xl text-slate-900">{title}</h3>
    <p className="text-slate-600 mt-2 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default ResourcesPage;