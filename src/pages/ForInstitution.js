import React from 'react';
import { ShieldCheck, BarChart, Users, BookMarked } from 'lucide-react';
import PublicLayout from '../components/PublicLayout';

const ForInstitutions = () => {
  return (
    <PublicLayout>
      <div className="py-20 px-6 bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800">Partner with MindEase</h1>
            <p className="mt-4 text-lg text-slate-600">
              Empower your students with accessible, modern, and confidential mental health support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/50">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Our Commitment</h2>
              <ul className="space-y-6">
                <ListItem 
                  icon={<ShieldCheck className="text-indigo-600 w-6 h-6" />} 
                  title="Data Privacy & Anonymity" 
                  desc="All student data is anonymized. Institutions receive aggregated wellness reports, never individual data." 
                />
                <ListItem 
                  icon={<BarChart className="text-indigo-600 w-6 h-6" />} 
                  title="Actionable Insights" 
                  desc="Our analytics dashboard helps you identify stress trends during exam periods or among specific departments." 
                />
                <ListItem 
                  icon={<Users className="text-indigo-600 w-6 h-6" />} 
                  title="Seamless Integration" 
                  desc="MindEase can be integrated with your existing student portal, providing easy access and encouraging adoption." 
                />
                <ListItem 
                  icon={<BookMarked className="text-indigo-600 w-6 h-6" />} 
                  title="Resource Augmentation" 
                  desc="Complements your existing counseling services by providing 24/7 first-line support and self-help resources." 
                />
              </ul>
            </div>
            <div className="h-full">
              <img src="/institution.jpg" alt="Institution Meeting" className="rounded-2xl shadow-2xl w-full h-full object-cover min-h-[400px]" />
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

const ListItem = ({ icon, title, desc }) => (
  <li className="flex items-start gap-4">
    <div className="bg-indigo-100 p-2 rounded-lg">{icon}</div>
    <div>
      <strong className="block text-slate-900 mb-1">{title}</strong>
      <span className="text-slate-600 text-sm leading-relaxed">{desc}</span>
    </div>
  </li>
);

export default ForInstitutions;