import React from 'react';
import { Cpu, Settings2, Shield, Globe2 } from 'lucide-react';
import { benefits } from '../models';

const benefitIcons = {
  tech: Cpu,
  custom: Settings2,
  materials: Shield,
  support: Globe2
};

/**
 * View — grade de diferenciais.
 * Os ícones são resolvidos aqui porque são detalhe de apresentação.
 */
export default function Benefits() {
  return (
    <section className="benefits section-pad" id="tecnologia">
      <div className="section-heading">
        <div><div className="section-kicker">02 / DIFERENCIAIS</div><h2>PROJETADA PARA <span>SUPERAR.</span></h2></div>
        <p>Uma combinação de tecnologia, materiais e experiência pensada em cada detalhe.</p>
      </div>
      <div className="benefit-grid">
        {benefits.map((item, i) => {
          const Icon = benefitIcons[item.id] ?? Shield;
          return <article className="benefit-card" key={item.id}><div className="benefit-top"><span>0{i + 1}</span><Icon size={23} strokeWidth={1.5} /></div><h3>{item.title}</h3><p>{item.text}</p><div className="card-rule" /></article>;
        })}
      </div>
    </section>
  );
}
