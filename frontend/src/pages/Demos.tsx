import React, { useState } from 'react';
import { Brain, Upload, Send, Loader, CheckCircle, AlertCircle } from 'lucide-react';

const Demos: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState('sentiment');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const demos = [
    {
      id: 'sentiment',
      title: 'Sentiment Analysis',
      description: 'Analyze the sentiment of text using advanced NLP models',
      icon: Brain,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'visualization',
      title: 'Data Visualization',
      description: 'Create interactive charts and graphs from your data',
      icon: Brain,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'classification',
      title: 'Image Classification',
      description: 'Classify images using deep learning models',
      icon: Brain,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const handleDemoSubmit = async (demoType: string, data: any) => {
    setLoading(true);
    setResults(null);

    try {
      const response = await fetch(`http://localhost:8000/api/demos/${demoType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Demo request failed');
      }

      const result = await response.json();
      setResults(result);
      console.log('Demo completed successfully!');
    } catch (error) {
      console.error('Demo error:', error);
      console.error('Demo failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const SentimentDemo = () => {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!text.trim()) {
        console.error('Please enter some text');
        return;
      }
      handleDemoSubmit('sentiment', { text });
    };

    return (
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter text to analyze
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your text here..."
              className="textarea-field h-32"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading || !text.trim()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Analyze Sentiment
              </>
            )}
          </button>
        </form>

        {results && (
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Results</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Sentiment:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  results.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                  results.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {results.sentiment}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Confidence:</span>
                <span className="text-gray-700">{(results.confidence * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const VisualizationDemo = () => {
    const [data, setData] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!data.trim()) {
        console.error('Please enter some data');
        return;
      }
      handleDemoSubmit('visualization', { data });
    };

    return (
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter CSV data or JSON
            </label>
            <textarea
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder="Enter your data here (CSV or JSON format)..."
              className="textarea-field h-32 font-mono text-sm"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading || !data.trim()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5 mr-2" />
                Generate Visualization
              </>
            )}
          </button>
        </form>

        {results && (
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Generated Chart</h3>
            <div className="bg-gray-100 rounded-lg p-4 text-center">
              <p className="text-gray-600">Chart visualization would appear here</p>
              <p className="text-sm text-gray-500 mt-2">
                Chart type: {results.chart_type || 'Bar Chart'}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const ClassificationDemo = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files && e.target.files[0];
      if (selectedFile) {
        setFile(selectedFile);
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!file) {
        console.error('Please select an image');
        return;
      }

      const formData = new FormData();
      formData.append('image', file);
      
      setLoading(true);
      setResults(null);

      try {
        const response = await fetch('http://localhost:8000/api/demos/classification', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Classification failed');
        }

        const result = await response.json();
        setResults(result);
        console.log('Image classified successfully!');
      } catch (error) {
        console.error('Classification error:', error);
        console.error('Classification failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload an image to classify
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="image-upload"
                disabled={loading}
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer text-primary-600 hover:text-primary-700 font-medium"
              >
                {file ? file.name : 'Choose an image file'}
              </label>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading || !file}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                Classifying...
              </>
            ) : (
              <>
                <Brain className="w-5 h-5 mr-2" />
                Classify Image
              </>
            )}
          </button>
        </form>

        {results && (
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Classification Results</h3>
            <div className="space-y-3">
              {results.predictions?.map((pred: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-medium">{pred.label}:</span>
                  <span className="text-gray-700">{(pred.confidence * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderDemoContent = () => {
    switch (activeDemo) {
      case 'sentiment':
        return <SentimentDemo />;
      case 'visualization':
        return <VisualizationDemo />;
      case 'classification':
        return <ClassificationDemo />;
      default:
        return <SentimentDemo />;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">AI Demos</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Interactive demonstrations of AI and machine learning capabilities. 
            Try out these demos to see AI in action!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Demo Navigation */}
          <div className="lg:col-span-1">
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">Available Demos</h3>
              <div className="space-y-2">
                {demos.map((demo) => {
                  const Icon = demo.icon;
                  return (
                    <button
                      key={demo.id}
                      onClick={() => setActiveDemo(demo.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                        activeDemo === demo.id
                          ? 'bg-primary-100 text-primary-700 border border-primary-200'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 bg-gradient-to-r ${demo.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium">{demo.title}</div>
                          <div className="text-sm opacity-75">{demo.description}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Demo Content */}
          <div className="lg:col-span-3">
            <div className="card p-8">
              {renderDemoContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demos; 