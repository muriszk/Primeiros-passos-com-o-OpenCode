import { useState, useMemo, useCallback } from 'react';
import { armors, DEFAULT_ARMOR_INDEX } from '../models/armors';

/**
 * ViewModel — seleção e catálogo de modelos.
 *
 * Centraliza qual modelo está ativo e expõe ações/derivados para a View.
 */
export function useModelsViewModel() {
  const [models] = useState(armors);
  const [activeId, setActiveId] = useState(models[DEFAULT_ARMOR_INDEX].id);

  const activeModel = useMemo(
    () => models.find(model => model.id === activeId) ?? models[0],
    [models, activeId]
  );

  const selectModel = useCallback((model) => {
    if (model) setActiveId(model.id);
  }, []);

  const isSelected = useCallback(
    (model) => model.id === activeId,
    [activeId]
  );

  return { models, activeModel, selectModel, isSelected };
}
