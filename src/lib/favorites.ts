
// Utility functions for handling favorite gyms

export interface SavedItem {
  id: number;
  type: 'gym' | 'club' | 'trail';
  name: string;
  address?: string;
  savedAt: string;
}

export const toggleFavorite = (item: SavedItem): boolean => {
  const currentFavorites = getFavorites();
  const existingIndex = currentFavorites.findIndex(
    (fav) => fav.id === item.id && fav.type === item.type
  );
  
  if (existingIndex >= 0) {
    // Remove from favorites
    currentFavorites.splice(existingIndex, 1);
    localStorage.setItem('facefit-favorites', JSON.stringify(currentFavorites));
    return false;
  } else {
    // Add to favorites
    const newFavorites = [...currentFavorites, {...item, savedAt: new Date().toISOString()}];
    localStorage.setItem('facefit-favorites', JSON.stringify(newFavorites));
    return true;
  }
};

export const getFavorites = (): SavedItem[] => {
  const stored = localStorage.getItem('facefit-favorites');
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error parsing favorites:', error);
    return [];
  }
};

export const isFavorite = (id: number, type: 'gym' | 'club' | 'trail'): boolean => {
  const favorites = getFavorites();
  return favorites.some((fav) => fav.id === id && fav.type === type);
};
