import React, { useState } from 'react';
import { coursesData } from './data/courses';
import { useDarkMode } from './hooks/useDarkMode';
import { useFavorites } from './hooks/useFavorites';

import Layout from './components/Layout';
import Header from './components/Header';
import SearchFilter from './components/SearchFilter';
import DropdownFilters from './components/DropdownFilters';
import CourseList from './components/CourseList';
import FooterStats from './components/FooterStats';

export default function App() {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const [favorites, toggleFavorite] = useFavorites();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState('none');
  const [currentSort, setCurrentSort] = useState('default');
  const [showOnlyFavs, setShowOnlyFavs] = useState(false);

  const toggleShowOnlyFavs = () => {
    setShowOnlyFavs(prev => !prev);
  };

  const filteredAndSortedCourses = coursesData.filter(item => {
    const matchesSearch = item.name.includes(searchTerm) || item.code.includes(searchTerm);
    
    if (showOnlyFavs) {
      return favorites.includes(item.id) && matchesSearch;
    } else {
      const itemCats = Array.isArray(item.category) ? item.category : [item.category];
      const isInCategory = itemCats.includes(currentCategory) || itemCats.includes('general');
      return isInCategory && matchesSearch;
    }
  }).sort((a, b) => {
    if (currentSort === 'name') {
      return a.name.localeCompare(b.name, 'fa');
    } else if (currentSort === 'code') {
      return a.code.localeCompare(b.code);
    }
    return 0;
  });

  return (
    <Layout>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="max-w-5xl mx-auto px-4 w-full mt-[76px] md:mt-[96px] pb-32 flex-1 relative">
    
        <div className="sticky top-[64px] md:top-[80px] z-40 p-[2px] rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 shadow-xl shadow-indigo-500/20 dark:shadow-indigo-700/30 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl mb-8">
  
          <div className="bg-white/85 dark:bg-slate-800/85 backdrop-blur-xl rounded-2xl p-3 sm:p-4 shadow-inner border border-white/20 dark:border-slate-700/30 flex flex-col gap-3 sm:gap-4">
            
            <SearchFilter 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              showOnlyFavs={showOnlyFavs} 
              toggleShowOnlyFavs={toggleShowOnlyFavs} 
            />

            <DropdownFilters 
              currentCategory={currentCategory} 
              setCurrentCategory={setCurrentCategory} 
              currentSort={currentSort} 
              setCurrentSort={setCurrentSort} 
            />

            <FooterStats favorites={favorites} courses={coursesData} />

          </div>
        </div>

        <CourseList 
          courses={filteredAndSortedCourses} 
          favorites={favorites} 
          onToggleFav={toggleFavorite} 
          currentCategory={currentCategory} 
          showOnlyFavs={showOnlyFavs} 
        />

      </main>

      <footer className="py-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-t border-slate-200/60 dark:border-slate-800/60 text-center z-10 transition-colors">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-rose-600 dark:text-rose-400 font-bold text-sm md:text-base animate-pulse">
            طراحی شده برای دانشجویان آزاد شیراز
          </div>
        </div>
      </footer>
    </Layout>
  );
}