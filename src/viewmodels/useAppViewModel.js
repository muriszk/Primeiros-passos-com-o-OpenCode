import { useMenuViewModel } from './useMenuViewModel';
import { useModelsViewModel } from './useModelsViewModel';
import { useReviewsViewModel } from './useReviewsViewModel';
import { useFaqViewModel } from './useFaqViewModel';
import { useRequestModalViewModel } from './useRequestModalViewModel';

/**
 * ViewModel raiz da aplicação.
 *
 * Compõe os ViewModels de cada domínio e entrega à View um único objeto com
 * estado (dados) e ações (comportamento) prontos para serem consumidos.
 */
export function useAppViewModel() {
  const menu = useMenuViewModel();
  const models = useModelsViewModel();
  const reviews = useReviewsViewModel();
  const faq = useFaqViewModel();
  const request = useRequestModalViewModel({
    selectedModel: models.activeModel,
    selectModel: models.selectModel
  });

  return { menu, models, reviews, faq, request };
}
