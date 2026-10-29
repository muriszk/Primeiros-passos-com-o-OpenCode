import React from 'react';
import { Shield, ChevronDown } from 'lucide-react';

/**
 * View — FAQ expansível.
 */
export default function Faq({ viewModel }) {
  const { items, isOpen, toggle } = viewModel;

  return (
    <section className="faq section-pad" id="faq">
      <div className="faq-intro"><div className="section-kicker">07 / CENTRAL DE AJUDA</div><h2>PERGUNTAS<br /><span>FREQUENTES.</span></h2><p className="muted">Tudo o que você precisa saber sobre esta experiência conceitual.</p><div className="faq-mark"><Shield size={26} /><span>STARK INDUSTRIES<br /><small>SUPORTE AO PROJETO</small></span></div></div>
      <div className="faq-list">
        {items.map((faq, i) => (
          <div className={'faq-item ' + (isOpen(i) ? 'faq-expanded' : '')} key={faq.q}>
            <button type="button" id={`faq-question-${i}`} onClick={() => toggle(i)} aria-expanded={isOpen(i)} aria-controls={`faq-answer-${i}`}>
              <span><small aria-hidden="true">0{i + 1}</small>{faq.q}</span>
              <ChevronDown size={18} aria-hidden="true" />
            </button>
            <p id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-question-${i}`} hidden={!isOpen(i)}>{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
