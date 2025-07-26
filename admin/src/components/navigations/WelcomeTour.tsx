import { ArrowRight, HelpCircle } from 'lucide-react';
import React, { useState } from 'react';

interface WelcomeTourProps { }

const WelcomeTour: React.FC<WelcomeTourProps> = ({ }) => {
  const [showWelcome, setShowWelcome] = useState(localStorage.getItem('welcomeTourComplete') !== 'true');
  const [tourStep, setTourStep] = useState(0);

  const tourSteps = [
    {
      title: 'Welcome to Image Processing Platform!',
      content: 'Transform your images into CAD files and Excel data in just a few clicks.',
      highlight: null,
    },
    {
      title: 'Step 1: Upload Your Images',
      content: "Click 'Upload Folder' to add your images. You can upload entire folders at once.",
      highlight: 'upload-button',
    },
    {
      title: 'Step 2: Process Your Files',
      content: "Once uploaded, click 'Process' to convert your images to DXF and Excel formats.",
      highlight: 'process-section',
    },
    {
      title: 'Step 3: Download Results',
      content: 'When processing is complete, download your converted files.',
      highlight: 'download-section',
    },
  ];

  if (!showWelcome) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {tourSteps[tourStep].title}
          </h3>
          <p className="text-gray-600">{tourSteps[tourStep].content}</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {tourSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${index === tourStep ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setShowWelcome(false);
                localStorage.setItem('welcomeTourComplete', 'true');
              }}
              className="px-4 py-2 text-gray-500 hover:text-gray-700"
            >
              Skip
            </button>
            {tourStep < tourSteps.length - 1 ? (
              <button
                onClick={() => setTourStep(tourStep + 1)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowWelcome(false);
                  localStorage.setItem('welcomeTourComplete', 'true');
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeTour;
