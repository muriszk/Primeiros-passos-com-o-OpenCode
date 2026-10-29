import React from 'react';
import { X, Check, ArrowUpRight, LockKeyhole } from 'lucide-react';

/**
 * View — modal de solicitação de acesso.
 * Liga-se ao estado e às ações do ViewModel do modal; não contém lógica própria.
 */
export default function RequestModal({ viewModel, model }) {
  const { isOpen, isSubmitted, form, dialogRef, titleRef, close, updateField, submit } = viewModel;

  if (!isOpen) return null;

  const handleBackdrop = (event) => {
    if (event.target === event.currentTarget) close();
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={handleBackdrop}>
      <div ref={dialogRef} className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description">
        <button type="button" className="modal-close" onClick={close} aria-label="Fechar janela"><X aria-hidden="true" /></button>
        {!isSubmitted ? <>
          <div className="section-kicker">STARK INDUSTRIES / ACESSO</div><h2 id="modal-title" ref={titleRef} tabIndex={-1}>ENTRE PARA<br /><span>O PROJETO.</span></h2><p id="modal-description" className="muted">Preencha os campos para simular sua solicitação de interesse. Nenhum dado será enviado a um servidor.</p>
          <div className="selected-model"><img src={model.image} alt="" /><div><small>MODELO SELECIONADO</small><b>{model.name}</b><span>{model.price}</span></div></div>
          <form onSubmit={submit}>
            <label><span>Seu nome (obrigatório) <span aria-hidden="true">*</span></span><input required autoComplete="name" name="name" value={form.name} onChange={event => updateField('name', event.target.value)} placeholder="Como podemos chamar você?" /></label>
            <label><span>Seu e-mail (obrigatório) <span aria-hidden="true">*</span></span><input required autoComplete="email" type="email" name="email" value={form.email} onChange={event => updateField('email', event.target.value)} placeholder="voce@email.com" /></label>
            <label>O que mais te interessa?<select name="interest" value={form.interest} onChange={event => updateField('interest', event.target.value)}><option value="design">Design e engenharia</option><option value="modelos">Conhecer os modelos</option><option value="personalizacao">Personalização conceitual</option></select></label>
            <button className="button button-wide" type="submit">Enviar solicitação simulada <ArrowUpRight size={17} /></button>
          </form>
          <div className="secure-note"><LockKeyhole size={14} /> Demonstração acadêmica. Sem compra ou envio real.</div>
        </> : <div className="success-state"><div className="success-icon"><Check size={30} aria-hidden="true" /></div><div className="section-kicker">SOLICITAÇÃO REGISTRADA</div><h2 id="modal-title" ref={titleRef} tabIndex={-1}>MISSÃO<br /><span>INICIADA.</span></h2><p id="modal-description">Esta é uma confirmação demonstrativa. Sua solicitação não foi enviada a um servidor.</p><button type="button" className="button button-wide" onClick={close}>Voltar ao site <ArrowUpRight size={16} aria-hidden="true" /></button></div>}
      </div>
    </div>
  );
}
