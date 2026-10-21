import React from 'react';
import { Shield, Crosshair, Gauge, ArrowUpRight } from 'lucide-react';

/**
 * View — seção hero (conteúdo estático).
 */
export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-image" role="img" aria-label="Visual conceitual de tecnologia e armadura futurista" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="eyebrow"><span className="eyebrow-line" /> O FUTURO VESTE VOCÊ</div>
        <h1>ENGENHARIA<br />SEM <span>LIMITES.</span></h1>
        <p className="hero-copy">Conheça uma nova geração de armaduras. Tecnologia de ponta, design de precisão e uma experiência criada para ir além.</p>
        <div className="hero-actions">
          <a className="button" href="#armaduras">Explorar armaduras <ArrowUpRight size={17} /></a>
          <a className="text-link" href="#tecnologia"><span className="play-icon">▶</span> Conheça a tecnologia</a>
        </div>
        <div className="hero-meta">
          <div><span className="meta-icon"><Shield size={17} /></span><span><b>PROJETO STARK</b><small>Engenharia conceitual</small></span></div>
          <div><span className="meta-icon"><Crosshair size={17} /></span><span><b>PRECISÃO TOTAL</b><small>Detalhes em cada camada</small></span></div>
          <div><span className="meta-icon"><Gauge size={17} /></span><span><b>NOVA GERAÇÃO</b><small>Design adaptativo</small></span></div>
        </div>
      </div>
      <div className="hero-index"><span>01</span><i /> 04</div>
      <div className="hero-stamp"><span>SI</span><div>STARK<br />INDUSTRIES</div></div>
    </section>
  );
}
