import React, { useState, useRef, useEffect } from 'react';
import { categories, sortOptions } from '../data/constants';

export default function DropdownFilters({ 
  currentCategory, 
  setCurrentCategory, 
  currentSort, 
  setCurrentSort 
}) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const categoryRef = useRef(null);
  const sortRef = useRef(null);

  const selectedCategoryLabel = categories.find(c => c.id === currentCategory)?.label || '📚 انتخاب رشته';
  const selectedSortLabel = sortOptions.find(s => s.id === currentSort)?.label || '🔀 ترتیب پیش‌فرض';

  useEffect(() => {
    function handleClickOutside(event) {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-2">
      
      <div className="relative" ref={sortRef}>
        <button 
          onClick={() => setIsSortOpen(!isSortOpen)} 
          className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 text-sm text-right flex items-center justify-between cursor-pointer backdrop-blur-sm shadow-sm transition-all"
        >
          <span>{selectedSortLabel}</span>
          <svg className={`w-4 h-4 transition-transform duration-200 ${isSortOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>

        {isSortOpen && (
          <div className="absolute right-0 left-0 top-full mt-1 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 z-50 overflow-hidden animate-in fade-in duration-150">
            {sortOptions.map((option) => (
              <div 
                key={option.id}
                onClick={() => {
                  setCurrentSort(option.id);
                  setIsSortOpen(false);
                }} 
                className={`px-3 py-2.5 cursor-pointer text-sm transition-colors border-b last:border-b-0 border-slate-100 dark:border-slate-700/60 ${
                  currentSort === option.id 
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 font-semibold' 
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="relative" ref={categoryRef}>
        <button 
          onClick={() => setIsCategoryOpen(!isCategoryOpen)} 
          className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 text-sm text-right flex items-center justify-between cursor-pointer backdrop-blur-sm shadow-sm transition-all"
        >
          <span>{selectedCategoryLabel}</span>
          <svg className={`w-4 h-4 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>

        {isCategoryOpen && (
          <div className="absolute right-0 left-0 top-full mt-1 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 z-50 max-h-60 overflow-y-auto no-scrollbar animate-in fade-in duration-150">
            {categories.map((cat) => (
              <div 
                key={cat.id}
                onClick={() => {
                  setCurrentCategory(cat.id);
                  setIsCategoryOpen(false);
                }} 
                className={`px-3 py-2.5 cursor-pointer text-sm transition-colors border-b last:border-b-0 border-slate-100 dark:border-slate-700/60 ${
                  currentCategory === cat.id 
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 font-semibold' 
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
              >
                {cat.label}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}