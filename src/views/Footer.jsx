import React from 'react';
import { Zap } from 'lucide-react';

/**
 * View — rodapé (conteúdo estático).
 */
export default function Footer() {
  return (
    <footer className="footer">
      <a href="#inicio" className="brand footer-brand"><span className="brand-mark"><Zap size={19} fill="currentColor" /></span><span>STARK<span className="brand-light">INDUSTRIES</span><small>ENGINEERED FOR TOMORROW</small></span></a>
      <p>TECNOLOGIA É A ARTE DE TORNAR O IMPOSSÍVEL VISÍVEL.</p>
      <div className="footer-links"><a href="#armaduras">Armaduras</a><a href="#tecnologia">Tecnologia</a><a href="#faq">FAQ</a></div>
      <div className="footer-bottom"><span>© 2026 STARK INDUSTRIES — PROJETO FICTÍCIO.</span><a href="#inicio">VOLTAR AO TOPO ↑</a></div>
    </footer>
  );
}
