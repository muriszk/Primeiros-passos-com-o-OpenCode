import React from 'react';
import { ArrowUpRight } from 'lucide-react';

/**
 * View — chamada final para ação.
 */
export default function FinalCta({ onRequestAccess }) {
  return (
    <section className="final-cta"><div className="final-cta-grid" /><div className="section-kicker">STARK INDUSTRIES / NEXT-GEN EXPERIENCE</div><h2>O FUTURO NÃO<br />ESPERA <span>POR NINGUÉM.</span></h2><p>Descubra os modelos. Explore as possibilidades.<br />Entre no universo da engenharia Stark.</p><button className="button" onClick={() => onRequestAccess()}>Começar agora <ArrowUpRight size={17} /></button><div className="cta-orbit orbit-one" /><div className="cta-orbit orbit-two" /></section>
  );
}
