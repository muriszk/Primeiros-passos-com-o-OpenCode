import { useState, useCallback } from 'react';

/**
 * ViewModel — estado do menu responsivo.
 *
 * A View apenas lê `isOpen` e invoca `toggle`/`close`; toda a lógica de
 * abertura/fechamento vive aqui, na camada intermediária do MVVM.
 */
export function useMenuViewModel() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => setIsOpen(open => !open), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, toggle, close };
}
