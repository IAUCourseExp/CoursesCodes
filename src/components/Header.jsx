import React from 'react';

export default function Header({ isDarkMode, toggleDarkMode }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-white/20 dark:border-white/5 shadow-sm transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-2 md:py-3">
        <div className="flex items-center justify-between gap-2">
          
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-500/25">
              <span className="text-white font-black text-xs md:text-base">کد</span>
            </div>
            <div>
              <h1 className="text-sm md:text-xl font-black tracking-tight text-slate-800 dark:text-white leading-tight">
                کد دروس
              </h1>
              <p className="text-[7px] md:text-[10px] font-medium text-slate-400 dark:text-slate-500 leading-tight hidden sm:block">
                آزاد شیراز
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-0.5 sm:gap-1 bg-slate-100/50 dark:bg-slate-800/50 p-0.5 sm:p-1 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm overflow-x-auto no-scrollbar flex-shrink">
            
            <a
              href="https://iaucourseexp.github.io/CoursesList/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-2 sm:px-4 py-1 sm:py-1.5 rounded-xl text-[10px] sm:text-xs md:text-sm font-bold transition-all duration-200 shadow-md shadow-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/40 active:scale-95 whitespace-nowrap"
            >
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>لیست دروس</span>
            </a>

            <div className="w-px h-4 sm:h-5 bg-slate-300 dark:bg-slate-600"></div>

            {[
              { href: "https://t.me/IAUCourseExp", label: "تجربیات" },
              { href: "https://t.me/JozveIAU", label: "جزوه" },
              { href: "https://t.me/computeriaushz", label: "کامپیوتر" },
              { href: "https://t.me/DevLeap", label: "DevLeap" },
            ].map((link, index) => (
              <React.Fragment key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-[9px] sm:text-xs md:text-sm px-1.5 sm:px-3 py-1 rounded-xl transition-all duration-200 group whitespace-nowrap"
                >
                  {link.label}
                  <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-indigo-500 dark:bg-indigo-400 transition-all duration-300 group-hover:w-full rounded-full"></span>
                </a>
                {index < 3 && <div className="w-px h-3 sm:h-4 bg-slate-300 dark:bg-slate-600"></div>}
              </React.Fragment>
            ))}

          </nav>

          <button
            onClick={toggleDarkMode}
            className="p-1.5 sm:p-2 rounded-xl hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors cursor-pointer text-slate-600 dark:text-slate-300 text-sm md:text-base flex-shrink-0"
            title="حالت تاریک/روشن"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

        </div>
      </div>
    </header>
  );
}