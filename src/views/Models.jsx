import React from 'react';
import { ArrowUpRight, CircleHelp } from 'lucide-react';

/**
 * View — catálogo de modelos.
 * Renderiza o estado do ViewModel e delega seleções/solicitações a ações.
 */
export default function Models({ viewModel, onRequestAccess }) {
  const { models, isSelected, selectModel } = viewModel;

  return (
    <section className="models section-pad" id="armaduras">
      <div className="section-heading">
        <div><div className="section-kicker">03 / COLEÇÃO CONCEITUAL</div><h2>ESCOLHA SEU <span>MODELO.</span></h2></div>
        <div className="section-side-note">SÉRIE LIMITADA <span>—</span> 03 MODELOS</div>
      </div>
      <div className="model-grid">
        {models.map((model, i) => <article className={'model-card ' + (isSelected(model) ? 'model-selected' : '')} key={model.id}>
          <div className="model-image-wrap"><img src={model.image} alt={`Imagem conceitual para ${model.name}`} loading="lazy" /><span className="model-number">0{i + 1}</span><span className="model-tag">{model.tag}</span><button className="image-arrow" aria-label={`Selecionar ${model.name}`} onClick={() => selectModel(model)}><ArrowUpRight size={18} /></button></div>
          <div className="model-info"><div className="model-label">{model.label}</div><h3>{model.name}</h3><p>{model.description}</p><div className="model-bottom"><span>CONCEITO STARK</span><button onClick={() => onRequestAccess(model)}>Ver modelo <ArrowUpRight size={15} /></button></div></div>
        </article>)}
      </div>
      <div className="model-disclaimer"><CircleHelp size={15} /> Imagens e especificações são ilustrativas. Produto e valores fictícios para demonstração.</div>
    </section>
  );
}
