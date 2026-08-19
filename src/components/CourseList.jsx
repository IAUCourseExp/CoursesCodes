import React, { useState } from 'react';
import CourseCard from './CourseCard';

export default function CourseList({ 
  courses, 
  favorites, 
  onToggleFav, 
  currentCategory, 
  showOnlyFavs 
}) {
  const [toastVisible, setToastVisible] = useState(false);

  const handleCopy = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      triggerToast();
    } catch (err) {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = code;
        textArea.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0;';
        document.body.appendChild(textArea);
        textArea.select();
        textArea.setSelectionRange(0, 99999);
        document.execCommand('copy');
        document.body.removeChild(textArea);
        triggerToast();
      } catch (e) {
        console.error('Copy failed:', e);
        alert(`کد درس: ${code}`);
      }
    }
  };

  const triggerToast = () => {
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 1500);
  };

  return (
    <div className="relative">
      <div className="mt-6 columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">

        {currentCategory !== 'none' && courses.length === 0 && (
          <div className="col-span-full column-span-full text-center text-slate-400 dark:text-slate-400 mt-10 text-base font-medium">
            درسی با این مشخصات پیدا نشد!
          </div>
        )}

        {courses.map((course) => {
          const isFav = favorites.includes(course.id);
          return (
            <div key={course.id} className="break-inside-avoid mb-4 w-full">
              <CourseCard 
                course={course} 
                isFav={isFav} 
                onToggleFav={onToggleFav} 
                onCopy={handleCopy} 
              />
            </div>
          );
        })}

      </div>

      <div 
        className={`fixed bottom-24 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-2.5 rounded-full shadow-xl text-sm font-bold transition-all duration-300 pointer-events-none z-[60] backdrop-blur-md ${
          toastVisible ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-4'
        }`}
        style={{ opacity: toastVisible ? 1 : 0 }}
      >
        کپی شد ✅
      </div>
    </div>
  );
}