import React, { useState } from 'react';

const TestAssessment = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // Questions based on PHQ-9 (Depression) and GAD-7 (Anxiety)
  const questions = [
    // --- GAD-7 (Anxiety) Items ---
    { 
      text: "1. Feeling nervous, anxious, or on edge?", 
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] 
    },
    { 
      text: "2. Not being able to stop or control worrying?", 
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] 
    },
    { 
      text: "3. Worrying too much about different things?", 
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] 
    },
    { 
      text: "4. Trouble relaxing?", 
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] 
    },
    
    // --- PHQ-9 (Depression) Items ---
    { 
      text: "5. Little interest or pleasure in doing things?", 
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] 
    },
    { 
      text: "6. Feeling down, depressed, or hopeless?", 
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] 
    },
    { 
      text: "7. Trouble falling or staying asleep, or sleeping too much?", 
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] 
    },
    { 
      text: "8. Feeling tired or having little energy?", 
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] 
    },
    { 
      text: "9. Poor appetite or overeating?", 
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] 
    },
    { 
      text: "10. Trouble concentrating on things, such as reading the newspaper or watching television?", 
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] 
    }
  ];

  const handleAnswer = (value) => {
    // Value represents 0, 1, 2, or 3 based on the index chosen
    setScore(prevScore => prevScore + value);
    
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setFinished(true);
    }
  };

  // Helper to interpret the score (0-30 range)
  const getResultFeedback = (totalScore) => {
    if (totalScore <= 4) return { text: "Minimal Anxiety/Depression", color: "text-green-600" };
    if (totalScore <= 9) return { text: "Mild Anxiety/Depression", color: "text-yellow-600" };
    if (totalScore <= 14) return { text: "Moderate Anxiety/Depression", color: "text-orange-600" };
    if (totalScore <= 19) return { text: "Moderately Severe Anxiety/Depression", color: "text-orange-700" };
    return { text: "Severe Anxiety/Depression", color: "text-red-600" };
  };

  const result = getResultFeedback(score);

  return (
    <div className="flex items-center justify-center min-h-[80vh] p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden p-8 md:p-10 text-center animate-fade-in-scale-up">
        
        {!finished ? (
          <>
            {/* Progress Bar */}
            <div className="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
              <span>Question {currentQ + 1} of {questions.length}</span>
              <span>{Math.round(((currentQ + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-slate-700 h-2 rounded-full mb-8">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
              ></div>
            </div>

            {/* Question Text */}
            <h2 className="text-xl md:text-2xl font-bold mb-8 text-slate-800 dark:text-white leading-relaxed">
              {questions[currentQ].text}
            </h2>

            {/* Options */}
            <div className="grid gap-3">
              {questions[currentQ].options.map((opt, idx) => (
                <button 
                  key={idx} 
                  onClick={() => handleAnswer(idx)} 
                  className="p-4 border border-slate-200 dark:border-slate-600 rounded-xl hover:bg-indigo-50 hover:border-indigo-300 dark:hover:bg-slate-700 dark:hover:border-indigo-500 transition-all duration-200 text-left font-medium text-slate-700 dark:text-slate-200 shadow-sm hover:shadow-md"
                >
                  <span className="inline-block w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-600 text-center text-sm leading-6 mr-3 text-slate-500 dark:text-slate-300 font-bold group-hover:bg-white">{idx + 1}</span>
                  {opt}
                </button>
              ))}
            </div>
            
            <p className="mt-8 text-sm text-slate-400 dark:text-slate-500">
              Over the last 2 weeks, how often have you been bothered by the above?
            </p>
          </>
        ) : (
          /* Results Screen */
          <div className="py-6 animate-fade-in-scale-up">
            <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
            </div>
            
            <h2 className="text-3xl font-bold mb-2 text-indigo-900 dark:text-white">Assessment Complete</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8">Here is your preliminary result based on your answers.</p>
            
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-6 mb-8 border border-slate-100 dark:border-slate-700">
                <p className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-2">Your Indicated Level</p>
                <p className={`text-2xl md:text-3xl font-bold ${result.color}`}>
                   {result.text}
                </p>
                <p className="text-xs text-slate-400 mt-2">Score: {score} / 30</p>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900/30 rounded-lg p-4 mb-8 text-left">
                <p className="text-xs text-yellow-800 dark:text-yellow-200 flex items-start">
                    <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                    <strong>Disclaimer:</strong> This screening tool is for informational purposes only and does not constitute a medical diagnosis. Please consult with a mental health professional for a full evaluation.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => window.location.reload()} 
                  className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium"
                >
                  Retake Test
                </button>
                <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none transition-all hover:scale-105 font-medium">
                  Connect with Counselor
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestAssessment;