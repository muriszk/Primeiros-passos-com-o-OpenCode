import React from 'react';
import { ArrowUpRight } from 'lucide-react';

/**
 * View — seção "como funciona" (conteúdo estático + ação de solicitação).
 */
export default function Process({ onRequestAccess }) {
  return (
    <section className="process section-pad">
      <div className="process-image"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdfEZMsIZ-KrfV5tRH9kCLDHUcwY-xnFjd8vbM8mQceg&s=10" alt="Circuito eletrônico em close, representando engenharia avançada" loading="lazy" /><div className="image-caption"><span>FIG. 01</span> SISTEMA DE ENGENHARIA / VISÃO CONCEITUAL</div><div className="image-crosshair">+</div></div>
      <div className="process-content"><div className="section-kicker">04 / COMO FUNCIONA</div><h2>DA IDEIA À<br /><span>EXPERIÊNCIA.</span></h2><p className="muted process-lead">Uma jornada simples para conhecer o conceito e encontrar o modelo que combina com você.</p>
        <div className="steps">
          <div className="step"><span>01</span><div><h3>ESCOLHA SEU MODELO</h3><p>Explore a coleção e descubra os detalhes de cada design.</p></div><ArrowUpRight size={17} /></div>
          <div className="step"><span>02</span><div><h3>PERSONALIZE A EXPERIÊNCIA</h3><p>Indique seu interesse e os recursos que gostaria de conhecer.</p></div><ArrowUpRight size={17} /></div>
          <div className="step"><span>03</span><div><h3>ENTRE NO UNIVERSO STARK</h3><p>Envie sua solicitação na demonstração e veja a confirmação na tela.</p></div><ArrowUpRight size={17} /></div>
        </div>
        <button className="button" onClick={() => onRequestAccess()}>Iniciar experiência <ArrowUpRight size={16} /></button>
      </div>
    </section>
  );
}
