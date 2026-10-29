import { useState, useCallback, useEffect, useRef } from 'react';

const initialForm = { name: '', email: '', interest: 'design' };

/**
 * ViewModel — modal de solicitação de acesso.
 *
 * Recebe o modelo selecionado e a ação de seleção para permitir que a View
 * dispare a abertura do modal já com o modelo correto, mantendo a lógica de
 * negócio (e não a de interface) nesta camada.
 */
export function useRequestModalViewModel({ selectedModel, selectModel }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState(initialForm);
  const dialogRef = useRef(null);
  const titleRef = useRef(null);

  const open = useCallback((model = selectedModel) => {
    selectModel(model);
    setIsSubmitted(false);
    setForm(initialForm);
    setIsOpen(true);
  }, [selectedModel, selectModel]);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;

    const dialog = dialogRef.current;
    const backdrop = dialog.parentElement;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const background = Array.from(backdrop.parentElement.children)
      .filter(element => element !== backdrop)
      .map(element => ({ element, inert: element.inert }));

    (dialog.querySelector('input') || titleRef.current).focus();
    background.forEach(({ element }) => { element.inert = true; });
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = Array.from(dialog.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )).filter(element => element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first) {
        event.preventDefault();
        titleRef.current.focus();
      } else if (!focusable.includes(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      background.forEach(({ element, inert }) => { element.inert = inert; });
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [isOpen, close]);

  useEffect(() => {
    if (isOpen && isSubmitted) titleRef.current?.focus();
  }, [isOpen, isSubmitted]);

  const updateField = useCallback((field, value) => {
    setForm(current => ({ ...current, [field]: value }));
  }, []);

  const submit = useCallback((event) => {
    event.preventDefault();
    setIsSubmitted(true);
  }, []);

  return { isOpen, isSubmitted, form, dialogRef, titleRef, open, close, updateField, submit };
}
