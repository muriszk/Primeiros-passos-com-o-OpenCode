import { useState, useCallback } from 'react';
import { reviews } from '../models/content';

/**
 * ViewModel — carrossel de avaliações.
 */
export function useReviewsViewModel() {
  const [items] = useState(reviews);
  const [index, setIndex] = useState(0);

  const goToNext = useCallback(
    () => setIndex(current => (current + 1) % items.length),
    [items.length]
  );
  const goToPrevious = useCallback(
    () => setIndex(current => (current + items.length - 1) % items.length),
    [items.length]
  );
  const isActive = useCallback(i => i === index, [index]);

  return { items, index, goToNext, goToPrevious, isActive };
}
