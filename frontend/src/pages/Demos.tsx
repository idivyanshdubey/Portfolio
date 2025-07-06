import React, { useState } from 'react';
import { Brain, Upload, Send, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import Plot from 'react-plotly.js';

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
      handleDemoSubmit('sentiment-analysis', { text });
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
    const [chartType, setChartType] = useState('bar');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!data.trim()) {
        console.error('Please enter some data');
        return;
      }
      
      // Try to parse the data as JSON or CSV
      let parsedData;
      try {
        parsedData = JSON.parse(data);
      } catch {
        // If not JSON, try to parse as CSV
        const lines = data.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        parsedData = lines.slice(1).map(line => {
          const values = line.split(',').map(v => v.trim());
          const obj: any = {};
          headers.forEach((header, index) => {
            obj[header] = values[index] || '';
          });
          return obj;
        });
      }
      
      handleDemoSubmit('data-visualization', { 
        chart_type: chartType,
        data: parsedData,
        title: `${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart`
      });
    };

    return (
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chart Type
              </label>
              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
                className="select-field"
                disabled={loading}
              >
                <option value="bar">Bar Chart</option>
                <option value="line">Line Chart</option>
                <option value="scatter">Scatter Plot</option>
                <option value="histogram">Histogram</option>
                <option value="heatmap">Heatmap</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sample Data
              </label>
              <button
                type="button"
                onClick={() => setData(`Month,Sales,Expenses
Jan,12000,8000
Feb,15000,9000
Mar,18000,11000
Apr,14000,8500
May,22000,13000
Jun,25000,15000`)}
                className="btn-secondary w-full"
                disabled={loading}
              >
                Load Sample Data
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter CSV data or JSON
            </label>
            <textarea
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder={`Sample CSV format:
Month,Sales,Expenses
Jan,12000,8000
Feb,15000,9000

Or JSON format:
[{"month":"Jan","sales":12000},{"month":"Feb","sales":15000}]`}
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
              {results.chart_data?.error ? (
                <div className="text-red-600">
                  <p className="font-medium">Visualization Error</p>
                  <p className="text-sm">{results.chart_data.error}</p>
                </div>
              ) : (
                                  results.chart_data && (
                    <Plot
                      data={results.chart_data.data}
                      layout={results.chart_data.layout}
                      config={{ responsive: true }}
                      style={{ width: '100%', height: '400px' }}
                    />
                  )
              )}
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
        const response = await fetch('http://localhost:8000/api/demos/image-classification', {
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
            <h3 className="text-lg font-semibold mb-4">Image Analysis Results</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Filename:</span>
                <span className="text-gray-700">{results.filename}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Size:</span>
                <span className="text-gray-700">{results.size}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Mode:</span>
                <span className="text-gray-700">{results.mode}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Orientation:</span>
                <span className="text-gray-700">{results.orientation}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Dominant Color:</span>
                <span className="text-gray-700">{results.dominant_color}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">File Size:</span>
                <span className="text-gray-700">{results.file_size_kb?.toFixed(1)} KB</span>
              </div>
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