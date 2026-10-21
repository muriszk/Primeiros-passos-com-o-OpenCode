import { useState, useCallback } from 'react';

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

  const open = useCallback((model = selectedModel) => {
    selectModel(model);
    setIsSubmitted(false);
    setForm(initialForm);
    setIsOpen(true);
  }, [selectedModel, selectModel]);

  const close = useCallback(() => setIsOpen(false), []);

  const updateField = useCallback((field, value) => {
    setForm(current => ({ ...current, [field]: value }));
  }, []);

  const submit = useCallback((event) => {
    event.preventDefault();
    setIsSubmitted(true);
  }, []);

  return { isOpen, isSubmitted, form, open, close, updateField, submit };
}
