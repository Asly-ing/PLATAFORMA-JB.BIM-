import { useState } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';
import {
  Upload,
  FileText,
  X,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  Calendar,
  BookOpen,
} from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
}

export default function AssignmentSubmission() {
  const { isDark } = useTheme();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [comments, setComments] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'draft' | 'submitted' | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
    }));
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleSubmit = () => {
    setSubmissionStatus('submitted');
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-neutral-900' : 'bg-neutral-50'}`}>
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <button className={`text-sm ${isDark ? 'text-neutral-400 hover:text-neutral-300' : 'text-neutral-600 hover:text-neutral-900'}`}>
              Courses
            </button>
            <span className={isDark ? 'text-neutral-600' : 'text-neutral-400'}>/</span>
            <button className={`text-sm ${isDark ? 'text-neutral-400 hover:text-neutral-300' : 'text-neutral-600 hover:text-neutral-900'}`}>
              BIM Professional Certification
            </button>
            <span className={isDark ? 'text-neutral-600' : 'text-neutral-400'}>/</span>
            <span className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>Assignment</span>
          </div>
          <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            BIM Coordination Project - Assignment 3
          </h1>
          <p className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>
            Submit your clash detection report and coordination models
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Assignment Details */}
            <div className={`rounded-lg p-6 ${isDark ? 'bg-neutral-800' : 'bg-white'} shadow-lg`}>
              <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Assignment Instructions
              </h2>
              <div className={`space-y-4 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                <p>
                  In this assignment, you will demonstrate your understanding of BIM coordination and clash detection 
                  by working with a real-world construction project scenario.
                </p>
                <div>
                  <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                    Requirements:
                  </h3>
                  <ul className="space-y-2 ml-5">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Complete clash detection analysis using Navisworks or equivalent BIM software</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Prepare a detailed report documenting all identified clashes (minimum 10 clashes)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Provide resolution strategies for each clash with priority classification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Submit coordinated model files (.rvt or .nwd format)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Include screenshots of critical clashes and coordination process</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                    Deliverables:
                  </h3>
                  <ul className="space-y-1 ml-5 list-disc">
                    <li>Clash detection report (PDF)</li>
                    <li>Coordinated model files</li>
                    <li>Screenshots and visual documentation</li>
                    <li>Resolution summary document</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* File Upload Area */}
            <div className={`rounded-lg p-6 ${isDark ? 'bg-neutral-800' : 'bg-white'} shadow-lg`}>
              <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Upload Your Work
              </h2>

              {/* Drag & Drop Area */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                  dragActive
                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                    : isDark
                    ? 'border-neutral-700 bg-neutral-750'
                    : 'border-neutral-300 bg-neutral-50'
                }`}
              >
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  onChange={handleChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className={`w-12 h-12 mx-auto mb-4 ${
                  dragActive ? 'text-orange-500' : isDark ? 'text-neutral-500' : 'text-neutral-400'
                }`} />
                <p className={`text-lg mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  {dragActive ? 'Drop your files here' : 'Drag and drop files here'}
                </p>
                <p className={`text-sm mb-4 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  or click to browse
                </p>
                <p className={`text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
                  Supported formats: PDF, RVT, NWD, DWG, ZIP (Max size: 100MB per file)
                </p>
              </div>

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                    Uploaded Files ({uploadedFiles.length})
                  </h3>
                  {uploadedFiles.map((file) => (
                    <div
                      key={file.id}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        isDark ? 'bg-neutral-700 border-neutral-600' : 'bg-neutral-50 border-neutral-200'
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <FileText className={`w-8 h-8 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`} />
                        <div className="flex-1">
                          <p className={`font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                            {file.name}
                          </p>
                          <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(file.id)}
                        className="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Comments Section */}
            <div className={`rounded-lg p-6 ${isDark ? 'bg-neutral-800' : 'bg-white'} shadow-lg`}>
              <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Additional Comments
              </h2>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Add any additional notes or comments about your submission..."
                rows={6}
                className={`w-full px-4 py-3 rounded-lg border resize-none ${
                  isDark
                    ? 'bg-neutral-700 border-neutral-600 text-white placeholder-neutral-500'
                    : 'bg-neutral-50 border-neutral-300 text-neutral-900 placeholder-neutral-400'
                } focus:outline-none focus:ring-2 focus:ring-orange-500`}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className={`flex-1 py-3 rounded-lg border transition-colors ${
                isDark
                  ? 'border-neutral-700 text-neutral-300 hover:bg-neutral-800'
                  : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'
              }`}>
                Save as Draft
              </button>
              <button
                onClick={handleSubmit}
                disabled={uploadedFiles.length === 0}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                  uploadedFiles.length === 0
                    ? 'bg-neutral-400 text-neutral-300 cursor-not-allowed'
                    : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}
              >
                Submit Assignment
              </button>
            </div>

            {/* Success Message */}
            {submissionStatus === 'submitted' && (
              <div className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-900 dark:text-green-200 mb-1">
                    Assignment Submitted Successfully!
                  </h4>
                  <p className="text-sm text-green-800 dark:text-green-300">
                    Your assignment has been submitted and is awaiting instructor review. 
                    You will receive feedback within 5-7 business days.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Assignment Info */}
            <div className={`rounded-lg p-6 ${isDark ? 'bg-neutral-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Assignment Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <BookOpen className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`} />
                  <div>
                    <p className={`text-sm font-medium ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      Course
                    </p>
                    <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      BIM Professional Certification
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`} />
                  <div>
                    <p className={`text-sm font-medium ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      Due Date
                    </p>
                    <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      February 15, 2026
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`} />
                  <div>
                    <p className={`text-sm font-medium ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      Time Remaining
                    </p>
                    <p className="text-sm text-orange-500 font-semibold">
                      15 days, 6 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Grading Rubric */}
            <div className={`rounded-lg p-6 ${isDark ? 'bg-neutral-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Grading Rubric
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                    Clash Detection
                  </span>
                  <span className={`text-sm font-semibold ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                    30%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                    Report Quality
                  </span>
                  <span className={`text-sm font-semibold ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                    25%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                    Resolution Strategies
                  </span>
                  <span className={`text-sm font-semibold ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                    25%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                    Model Quality
                  </span>
                  <span className={`text-sm font-semibold ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                    20%
                  </span>
                </div>
                <div className="pt-3 border-t border-neutral-200 dark:border-neutral-700">
                  <div className="flex justify-between items-center">
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                      Total Points
                    </span>
                    <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                      100
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Resources */}
            <div className={`rounded-lg p-6 ${isDark ? 'bg-neutral-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Resources
              </h3>
              <div className="space-y-3">
                <button className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                  isDark
                    ? 'border-neutral-700 hover:bg-neutral-700'
                    : 'border-neutral-200 hover:bg-neutral-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <FileText className={`w-5 h-5 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`} />
                    <span className={`text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      Project Files
                    </span>
                  </div>
                  <Download className={`w-4 h-4 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`} />
                </button>
                <button className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                  isDark
                    ? 'border-neutral-700 hover:bg-neutral-700'
                    : 'border-neutral-200 hover:bg-neutral-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <FileText className={`w-5 h-5 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`} />
                    <span className={`text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      Template Report
                    </span>
                  </div>
                  <Download className={`w-4 h-4 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`} />
                </button>
                <button className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                  isDark
                    ? 'border-neutral-700 hover:bg-neutral-700'
                    : 'border-neutral-200 hover:bg-neutral-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <FileText className={`w-5 h-5 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`} />
                    <span className={`text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      Guidelines PDF
                    </span>
                  </div>
                  <Download className={`w-4 h-4 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`} />
                </button>
              </div>
            </div>

            {/* Help */}
            <div className={`rounded-lg p-6 ${isDark ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'} border`}>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className={`font-semibold mb-2 ${isDark ? 'text-blue-300' : 'text-blue-900'}`}>
                    Need Help?
                  </h4>
                  <p className={`text-sm mb-3 ${isDark ? 'text-blue-200' : 'text-blue-800'}`}>
                    If you have questions about the assignment, contact your instructor or visit the course forum.
                  </p>
                  <button className="text-sm text-blue-500 hover:text-blue-600 font-semibold">
                    Contact Instructor →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
