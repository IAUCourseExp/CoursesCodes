import React from 'react';
import { exportToExcel, exportToPDF, shareFavorites } from '../utils/exportUtils';

export default function FooterStats({ favorites, courses }) {
  const favItems = courses.filter(item => favorites.includes(item.id));
  const totalUnits = favItems.reduce((sum, item) => sum + item.unit, 0);

  if (favorites.length === 0 || favItems.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 p-3 rounded-xl bg-slate-900/90 dark:bg-slate-800/90 backdrop-blur-xl text-white border border-slate-700/50 shadow-lg transition-all duration-300">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        
        <div className="text-center md:text-right">
          <span className="text-xs opacity-75 block font-medium">واحدهای انتخاب شده:</span>
          <span className="text-xl font-black text-amber-400 block">{totalUnits}</span>
        </div>

        <div className="grid grid-cols-3 gap-2 w-full md:w-auto">
  
          <button 
            onClick={() => shareFavorites(favItems.map(item => `${item.name} (${item.code}) - ${item.unit} واحد`), totalUnits)} 
            className="bg-indigo-600 hover:bg-indigo-500 px-3 py-2 rounded-full text-sm font-bold transition-colors cursor-pointer shadow-lg shadow-indigo-600/25 text-center"
          >
            اشتراک‌گذاری 📤
          </button>
          
          <button 
            onClick={() => exportToExcel(favItems)} 
            className="bg-emerald-600 hover:bg-emerald-500 px-3 py-2 rounded-full text-sm font-bold transition-colors cursor-pointer shadow-lg shadow-emerald-600/25 text-center"
          >
            اکسل 📊
          </button>
          
          <button 
            onClick={() => exportToPDF(favItems)} 
            className="bg-rose-600 hover:bg-rose-500 px-3 py-2 rounded-full text-sm font-bold transition-colors cursor-pointer shadow-lg shadow-rose-600/25 text-center"
          >
            PDF 📄
          </button>

        </div>

      </div>
    </div>
  );
}