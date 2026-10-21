import React from 'react';
import { Sparkles, Check, ArrowUpRight, LockKeyhole } from 'lucide-react';

/**
 * View — oferta do modelo em destaque.
 * Reflete o modelo ativo vindo do ViewModel de modelos.
 */
export default function Offer({ viewModel, onRequestAccess }) {
  const { activeModel } = viewModel;

  return (
    <section className="offer section-pad" id="oferta">
      <div className="offer-visual"><img src={activeModel.image} alt={`Modelo selecionado ${activeModel.name}`} loading="lazy" /><div className="offer-visual-overlay" /><div className="offer-chip"><Sparkles size={14} /> MODELO EM DESTAQUE</div><div className="offer-visual-title"><small>{activeModel.label}</small><strong>{activeModel.name}</strong></div></div>
      <div className="offer-info"><div className="section-kicker">06 / ACESSO AO PROJETO</div><h2>SEU PRÓXIMO<br />CAPÍTULO <span>COMEÇA AQUI.</span></h2><p className="muted">Conheça a proposta do modelo selecionado e registre seu interesse na experiência Stark.</p>
        <div className="offer-price-label">VALOR CONCEITUAL A PARTIR DE</div><div className="offer-price">{activeModel.price}<span>BRL</span></div><div className="offer-list"><span><Check size={16} /> Apresentação do modelo</span><span><Check size={16} /> Solicitação de interesse simulada</span><span><Check size={16} /> Experiência demonstrativa</span></div>
        <button className="button button-wide" onClick={() => onRequestAccess(activeModel)}>Solicitar acesso <ArrowUpRight size={17} /></button><div className="secure-note"><LockKeyhole size={14} /> Protótipo demonstrativo. Nenhum pagamento é realizado.</div>
      </div>
    </section>
  );
}
