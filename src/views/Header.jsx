import React from 'react';
import { Zap, Menu, X, ArrowUpRight } from 'lucide-react';

/**
 * View — cabeçalho com navegação e menu responsivo.
 * Consome o ViewModel do menu e recebe o callback de solicitação.
 */
export default function Header({ viewModel, onRequestAccess }) {
  const { isOpen, toggle, close } = viewModel;

  return (
    <header className="header">
      <a href="#inicio" className="brand" aria-label="Stark Industries início">
        <span className="brand-mark"><Zap size={19} fill="currentColor" /></span>
        <span>STARK<span className="brand-light">INDUSTRIES</span><small>ENGINEERED FOR TOMORROW</small></span>
      </a>
      <button className="mobile-menu" onClick={toggle} aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}>{isOpen ? <X /> : <Menu />}</button>
      <nav className={isOpen ? 'nav nav-open' : 'nav'}>
        <a href="#inicio" onClick={close}>Início</a>
        <a href="#armaduras" onClick={close}>Armaduras</a>
        <a href="#tecnologia" onClick={close}>Tecnologia</a>
        <a href="#avaliacoes" onClick={close}>Experiências</a>
        <a href="#faq" onClick={close}>FAQ</a>
        <button className="button button-small" onClick={() => onRequestAccess()}>Solicitar acesso <ArrowUpRight size={15} /></button>
      </nav>
    </header>
  );
}
