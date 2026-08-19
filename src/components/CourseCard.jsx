import React from 'react';

export default function CourseCard({ course, isFav, onToggleFav, onCopy }) {
  return (
    <div 
      onClick={() => onCopy(course.code)}
      className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-4 rounded-xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 flex justify-between items-center transition-all duration-200 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 cursor-pointer group"
    >
      <div className="flex-1">
        <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm md:text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {course.name}
        </h3>
        
        <p className="text-sm text-indigo-600 dark:text-indigo-400 font-mono mt-1 dir-ltr text-left">
          {course.code} 
          <span className="text-slate-400 dark:text-slate-500 text-[10px] mr-2 font-sans">(کپی)</span>
        </p>

        <span className="text-[10px] bg-slate-100 dark:bg-slate-700/80 text-slate-600 dark:text-slate-300 px-2.5 py-0.5 rounded-full inline-block mt-1.5 font-medium">
          {course.unit > 0 ? `${course.unit} واحد` : 'واحد نامشخص'}
        </span>
      </div>

      <button 
        onClick={(e) => {
          e.stopPropagation();
          onToggleFav(course.id);
        }}
        className={`mr-4 text-2xl transition-transform active:scale-125 min-w-[3rem] h-12 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 cursor-pointer ${
          isFav ? 'text-amber-500' : 'text-slate-300 dark:text-slate-600 hover:text-amber-400'
        }`}
        title={isFav ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
      >
        {isFav ? '⭐' : '☆'}
      </button>
    </div>
  );
}