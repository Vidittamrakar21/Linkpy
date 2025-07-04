import React, { useState, useEffect } from 'react';
import { Clipboard, ClipboardCheck, Plus, Trash2 } from 'lucide-react';

export default function App() {
  const [input, setInput] = useState('');
  const [urls, setUrls] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    // Only read from localStorage, don't reset
    const saved = JSON.parse(localStorage.getItem('saved_urls'));
    if (saved?.length !==0){
      setUrls(saved);
    } 
  }, []);

  useEffect(() => {
    localStorage.setItem('saved_urls', JSON.stringify(urls));
  }, [urls]);

  const addUrl = () => {
    const trimmed = input?.trim();
    if (!trimmed) return;
    setUrls(prev => [...prev, trimmed]);
    setInput('');
  };

  const copyUrl = (url, index) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const deleteUrl = (index) => {
    setUrls(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-start px-4 flex-col">
      <div className="w-full max-w-md border border-gray-200 mt-[50px] rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-medium  text-center mb-6">Linkpy</h1>
        <h5 className="text-small   text-gray-500 text-center mb-6"> <b>Store & Copy</b> your important links easily!</h5>

        {/* Input */}
        <div className="flex items-center gap-2 mb-4">
          <input
            value={input}
            onChange={(e) => setInput(e?.target?.value)}
            placeholder="Paste a URL"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
          />
          <button
            onClick={addUrl}
            className="p-2 border border-gray-300 rounded hover:bg-gray-100"
            title="Add URL"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* URL List */}
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {urls.map((url, index) => (
            <div
              key={index}
              className="flex justify-between items-center border border-gray-200 px-3 py-2 rounded-md"
            >
              <div
                onClick={() => copyUrl(url, index)}
                title="Click to copy"
                className="text-sm truncate max-w-[200px] cursor-pointer"
              >
                {copiedIndex === index ? 'Copied!' : url}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyUrl(url, index)}
                  className="hover:text-black"
                  title="Copy"
                >
                  {copiedIndex === index ? (
                    <ClipboardCheck size={18} />
                  ) : (
                    <Clipboard size={18} />
                  )}
                </button>
                <button
                  onClick={() => deleteUrl(index)}
                  className="hover:text-red-600"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <h1 className=' absolute bottom-5 text-gray-500'>Made with by ❤️ Vidit Tamrakar</h1>
    </div>
  );
}
