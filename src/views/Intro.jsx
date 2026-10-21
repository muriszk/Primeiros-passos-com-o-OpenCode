import React from 'react';

/**
 * View — seção introdutória (conteúdo estático).
 */
export default function Intro() {
  return (
    <section className="intro section-pad">
      <div className="section-kicker">01 / UMA NOVA ERA</div>
      <div className="intro-grid">
        <h2>MAIS QUE UMA<br /><span>ARMADURA.</span></h2>
        <div className="intro-copy"><p>Uma visão onde engenharia, inteligência e design trabalham como um só sistema.</p><p className="muted">Explore modelos conceituais desenvolvidos para representar o próximo passo da tecnologia vestível.</p></div>
      </div>
      <div className="metrics">
        <div><strong>360<span>°</span></strong><small>VISÃO DE PROJETO</small></div>
        <div><strong>∞</strong><small>POSSIBILIDADES DE DESIGN</small></div>
        <div><strong>01</strong><small>VISÃO. SEM LIMITES.</small></div>
        <div className="metrics-note"><span className="live-dot" /> CONCEITO DE PRÓXIMA GERAÇÃO</div>
      </div>
    </section>
  );
}
