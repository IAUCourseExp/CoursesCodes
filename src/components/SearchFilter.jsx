import React from 'react';

export default function SearchFilter({ 
  searchTerm, 
  setSearchTerm, 
  showOnlyFavs, 
  toggleShowOnlyFavs 
}) {
  return (
    <div className="flex gap-2 mb-3">
      <input 
        type="text" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="جستجوی نام درس یا کد..." 
        className="flex-1 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 outline-none transition-all shadow-sm text-base backdrop-blur-sm"
      />

      <button 
        onClick={toggleShowOnlyFavs} 
        id="favFilterBtn" 
        className={`border p-3 rounded-lg shadow-sm transition-colors flex items-center justify-center min-w-[3.5rem] cursor-pointer backdrop-blur-sm ${
          showOnlyFavs 
            ? 'bg-amber-100 border-amber-400 text-amber-700 dark:bg-amber-900/40 dark:border-amber-500 dark:text-amber-300' 
            : 'bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-950/30'
        }`}
        title="فقط نمایش ستاره‌دارها"
      >
        ⭐
      </button>
    </div>
  );
}