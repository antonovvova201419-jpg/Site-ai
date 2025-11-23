import React, { useState, useCallback } from 'react';
import { fetchExtensionInfo } from './services/geminiService';
import { ExtensionData, FileCategory } from './types';
import QuickSelector from './components/QuickSelector';
import ExtensionDetail from './components/ExtensionDetail';
import Loading from './components/Loading';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FileCategory | 'All'>('All');
  const [currentExtension, setCurrentExtension] = useState<ExtensionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    await loadExtensionData(searchTerm.replace('.', '').toUpperCase());
  }, [searchTerm]);

  const loadExtensionData = async (ext: string) => {
    setLoading(true);
    setError(null);
    setCurrentExtension(null);
    try {
      const data = await fetchExtensionInfo(ext);
      setCurrentExtension(data);
    } catch (err) {
      setError("Не удалось загрузить информацию о расширении. Проверьте подключение или попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  const resetView = () => {
    setCurrentExtension(null);
    setSearchTerm('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-200 selection:bg-orange-500 selection:text-black font-sans">
      {/* Header */}
      <header className="bg-black/90 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={resetView}>
            <div className="w-10 h-10 bg-zinc-100 group-hover:bg-orange-600 rounded flex items-center justify-center font-black text-black group-hover:text-white transition-colors duration-300 shadow-lg shadow-white/5 group-hover:shadow-orange-500/50">
              FX
            </div>
            <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-white group-hover:text-orange-500 transition-colors">FILEXT</span>
                <span className="text-[10px] uppercase tracking-widest text-zinc-500">Galaxy Edition</span>
            </div>
          </div>
          
          <form onSubmit={handleSearch} className="flex-1 max-w-lg ml-6 sm:ml-12">
            <div className="relative group">
              <input
                type="text"
                placeholder="Поиск формата (напр. .vpk)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-lg py-3 pl-5 pr-12 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 placeholder-zinc-600 transition-all font-mono text-sm"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-orange-500 p-2 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </div>
          </form>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {loading && <Loading />}

        {!loading && error && (
          <div className="bg-red-950/30 border border-red-900/50 text-red-400 p-6 rounded-lg text-center mb-8 max-w-2xl mx-auto">
            <p className="font-bold text-lg mb-2">ОШИБКА СИСТЕМЫ</p>
            <p className="font-mono text-sm opacity-80">{error}</p>
            <button onClick={resetView} className="mt-6 px-6 py-2 bg-red-700 hover:bg-red-600 rounded text-white text-xs uppercase font-bold tracking-wider transition-colors">Перезагрузить</button>
          </div>
        )}

        {!loading && !currentExtension && !error && (
          <div className="space-y-12 animate-fade-in">
             <div className="text-center py-12 relative">
                {/* Decorative BG element */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-orange-600/10 to-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>
                
                <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter relative z-10">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-600">ВСЕ ФАЙЛЫ</span>
                  <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">ГАЛАКТИКИ</span>
                </h1>
                <p className="text-zinc-500 max-w-3xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                  Полная база данных форматов. От системных библиотек Windows до игровых архивов Valve. 
                  Интеллектуальный анализ структуры и совместимости.
                </p>
             </div>

             {/* Categories */}
             <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-5xl mx-auto">
               <button
                  onClick={() => setSelectedCategory('All')}
                  className={`px-5 py-2 rounded-sm text-xs uppercase font-bold tracking-wider transition-all border ${selectedCategory === 'All' ? 'bg-white text-black border-white' : 'bg-black text-zinc-500 border-zinc-800 hover:border-zinc-600 hover:text-zinc-300'}`}
               >
                 Все
               </button>
               {Object.values(FileCategory).map((cat) => (
                 <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2 rounded-sm text-xs uppercase font-bold tracking-wider transition-all border ${selectedCategory === cat ? 'bg-white text-black border-white' : 'bg-black text-zinc-500 border-zinc-800 hover:border-zinc-600 hover:text-zinc-300'}`}
                 >
                   {cat}
                 </button>
               ))}
             </div>

             <QuickSelector 
                onSelect={(ext) => loadExtensionData(ext)} 
                filter={selectedCategory} 
             />
          </div>
        )}

        {!loading && currentExtension && (
          <div className="max-w-5xl mx-auto">
            <ExtensionDetail 
                data={currentExtension} 
                onBack={resetView} 
            />
          </div>
        )}
      </main>

      <footer className="border-t border-zinc-900 mt-20 py-10 bg-black">
        <div className="max-w-7xl mx-auto px-4 text-center text-zinc-600 text-xs uppercase tracking-widest">
          <p>© {new Date().getFullYear()} FileExt Encyclopedia Galaxy Edition. Powered by Google Gemini AI.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;