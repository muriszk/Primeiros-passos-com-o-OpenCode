import React from 'react';
import { useAppViewModel } from '../viewmodels';
import Header from './Header';
import Hero from './Hero';
import Intro from './Intro';
import Benefits from './Benefits';
import Models from './Models';
import Process from './Process';
import QuoteBand from './QuoteBand';
import Reviews from './Reviews';
import Offer from './Offer';
import Faq from './Faq';
import FinalCta from './FinalCta';
import Footer from './Footer';
import RequestModal from './RequestModal';

/**
 * View raiz — composição da aplicação.
 *
 * É responsável por instanciar o ViewModel raiz e conectá-lo às Views
 * filhas, passando estado e ações via props. Não contém regras de negócio.
 */
export default function App() {
  const vm = useAppViewModel();

  // Ponte entre a View e o ViewModel do modal: repassa (ou omite) o modelo.
  const requestAccess = (model) => vm.request.open(model);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="topline"><span className="live-dot" /> STARK INDUSTRIES <span className="topline-divider">/</span> DIVISÃO DE ENGENHARIA AVANÇADA <span className="topline-right">SISTEMAS ONLINE <span className="live-dot" /></span></div>

      <Header viewModel={vm.menu} onRequestAccess={requestAccess} />

      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <Intro />
        <Benefits />
        <Models viewModel={vm.models} onRequestAccess={requestAccess} />
        <Process onRequestAccess={requestAccess} />
        <QuoteBand />
        <Reviews viewModel={vm.reviews} />
        <Offer viewModel={vm.models} onRequestAccess={requestAccess} />
        <Faq viewModel={vm.faq} />
        <FinalCta onRequestAccess={requestAccess} />
      </main>

      <Footer />

      <RequestModal viewModel={vm.request} model={vm.models.activeModel} />
    </div>
  );
}
