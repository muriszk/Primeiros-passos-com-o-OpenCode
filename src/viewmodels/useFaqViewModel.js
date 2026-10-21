import { useState, useCallback } from 'react';
import { faqs, DEFAULT_FAQ_INDEX } from '../models/content';

/**
 * ViewModel — FAQ expansível.
 */
export function useFaqViewModel() {
  const [items] = useState(faqs);
  const [openIndex, setOpenIndex] = useState(DEFAULT_FAQ_INDEX);

  const toggle = useCallback(
    (index) => setOpenIndex(current => (current === index ? -1 : index)),
    []
  );
  const isOpen = useCallback(i => i === openIndex, [openIndex]);

  return { items, openIndex, toggle, isOpen };
}
