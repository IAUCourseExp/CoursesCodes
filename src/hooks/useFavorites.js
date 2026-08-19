import { useState, useEffect } from 'react';

export function useFavorites() {
    const [favorites, setFavorites] = useState(() => {
        const savedFavs = localStorage.getItem('fav_codes');
        return savedFavs ? JSON.parse(savedFavs) : [];
    });

    useEffect(() => {
        localStorage.setItem('fav_codes', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (id) => {
        setFavorites((prevFavs) => {
            if (prevFavs.includes(id)) {
                return prevFavs.filter((favId) => favId !== id);
            } else {
                return [...prevFavs, id];
            }
        });
    };

    return [favorites, toggleFavorite];
}