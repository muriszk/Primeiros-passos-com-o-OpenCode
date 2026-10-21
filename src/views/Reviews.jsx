import React from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

/**
 * View — carrossel de avaliações.
 * Apenas apresenta os dados do ViewModel e aciona as ações de navegação.
 */
export default function Reviews({ viewModel }) {
  const { items, index, goToNext, goToPrevious, isActive } = viewModel;

  return (
    <section className="reviews section-pad" id="avaliacoes">
      <div className="section-heading">
        <div><div className="section-kicker">05 / O QUE DIZEM</div><h2>IMPRESSÕES <span>DO UNIVERSO.</span></h2></div>
        <div className="review-controls"><button aria-label="Avaliação anterior" onClick={goToPrevious}><ChevronLeft /></button><span>0{index + 1} <i>/</i> 0{items.length}</span><button aria-label="Próxima avaliação" onClick={goToNext}><ChevronRight /></button></div>
      </div>
      <div className="review-grid">
        {items.map((review, i) => <article className={'review-card ' + (isActive(i) ? 'review-active' : '')} key={review.name}><div className="review-top"><div className="review-avatar">{review.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</div><div><h3>{review.name}</h3><small>{review.role}</small></div><span className="review-index">0{i + 1}</span></div><div className="stars">{review.rating}</div><p>“{review.text}”</p><div className="review-foot"><span>AVALIAÇÃO DEMONSTRATIVA</span><Check size={14} /></div></article>)}
      </div>
      <p className="fiction-note">* Depoimentos fictícios criados exclusivamente para este protótipo.</p>
    </section>
  );
}
