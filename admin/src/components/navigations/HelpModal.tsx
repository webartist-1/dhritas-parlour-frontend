import { HelpCircle, X } from 'lucide-react';
import React from 'react';

interface HelpModalProps {
  showHelp: boolean;
  setShowHelp: (value: boolean) => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ showHelp, setShowHelp }) => {
  if (!showHelp) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">How to Use ImageProcessor</h3>
          <button
            onClick={() => setShowHelp(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {[
            {
              step: 1,
              title: 'Upload Your Images',
              desc: 'Click "Upload Folder" and select a folder containing your images. We support JPG, PNG, TIFF, and BMP formats.',
            },
            {
              step: 2,
              title: 'Process Your Files',
              desc: 'Once uploaded, click "Process" on any folder to convert your images to DXF and Excel formats. Processing may take a few minutes depending on file size.',
            },
            {
              step: 3,
              title: 'Download Results',
              desc: 'When processing is complete, download your converted DXF files and Excel spreadsheets. You can download individual files or entire folders.',
            },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-semibold">{step}</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
                <p className="text-gray-600">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Need More Help?
          </h4>
          <p className="text-blue-800 text-sm">
            If you encounter any issues or have questions, please contact our support team at{' '}
            <a href="mailto:support@imageprocessor.com" className="underline">
              support@imageprocessor.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
