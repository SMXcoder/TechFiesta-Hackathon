import React from 'react';
import PublicLayout from '../components/PublicLayout';

const About = () => {
  return (
    <PublicLayout>
      <div className="py-20 px-6 bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800">Our Mission</h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              In a world where academic and social pressures are higher than ever, we believe every student deserves immediate and confidential access to mental health support. MindEase was created to break down the barriers of stigma and accessibility, providing a safe first step for students to understand their well-being and find the help they need, right when they need it.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-md p-10 rounded-2xl shadow-lg border border-white/50 mb-16">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Privacy Policy & Terms of Use</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Your privacy is fundamental to our mission. All personal data and assessment responses are encrypted and stored securely. We will never share your identifiable information with your institution or any third party. Anonymized, aggregated data may be used to provide your institution with general wellness trends to help them improve student support services.
              </p>
              <p>
                By using MindEase, you agree that this platform is a supportive tool and not a substitute for professional medical diagnosis or treatment. The resources and AI conversations are designed for informational and supportive purposes only. In case of a crisis, please contact emergency services or a mental health professional immediately.
              </p>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Our Proud Sponsors</h2>
            <p className="text-slate-500 mb-8">We are grateful for the support of organizations that champion student mental health.</p>
            <div className="flex justify-center items-center gap-8 flex-wrap opacity-70 grayscale">
               <img src="https://logodownload.org/wp-content/uploads/2019/08/coursera-logo-0.png" alt="Coursera" className="h-6 hover:grayscale-0 transition-all" />
               <img src="https://logodownload.org/wp-content/uploads/2021/11/headspace-logo-0.png" alt="Headspace" className="h-8 hover:grayscale-0 transition-all" />
               <img src="https://logodownload.org/wp-content/uploads/2022/10/calm-logo-0.png" alt="Calm" className="h-8 hover:grayscale-0 transition-all" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google.org_logo.svg" alt="Google.org" className="h-8 hover:grayscale-0 transition-all" />
            </div>
          </div>

        </div>
      </div>
    </PublicLayout>
  );
};

export default About;