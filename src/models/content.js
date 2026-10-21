/**
 * Model — conteúdo estático da experiência (diferenciais, avaliações e FAQ).
 *
 * Os ícones são resolvidos na camada de View; aqui ficam apenas os dados.
 */

export const benefits = [
  { id: 'tech', title: 'TECNOLOGIA DE PONTA', text: 'Sistemas inteligentes de defesa, propulsão e assistência em tempo real.' },
  { id: 'custom', title: 'PERSONALIZAÇÃO', text: 'Configure o visual e os recursos de acordo com o seu estilo.' },
  { id: 'materials', title: 'MATERIAIS AVANÇADOS', text: 'Construção de alta performance com acabamento de precisão.' },
  { id: 'support', title: 'SUPORTE GLOBAL', text: 'Acompanhamento especializado para sua experiência Stark.' }
];

export const reviews = [
  { name: 'Carlos Mendes', role: 'Engenheiro de sistemas', rating: '★★★★★', text: 'O nível de detalhe e a experiência de configuração são impressionantes. Parece estar um passo à frente.' },
  { name: 'Juliana Costa', role: 'Designer industrial', rating: '★★★★★', text: 'Design impecável, interface intuitiva e uma apresentação que faz jus à proposta futurista.' },
  { name: 'Rafael Lima', role: 'Entusiasta de tecnologia', rating: '★★★★★', text: 'Uma experiência de produto diferente de tudo que eu já vi. Cada detalhe parece pensado.' }
];

export const faqs = [
  { q: 'As armaduras são realmente funcionais?', a: 'Este é um projeto demonstrativo fictício. As descrições representam a proposta conceitual da experiência e não uma oferta de equipamento real.' },
  { q: 'Como funciona a personalização?', a: 'Na experiência conceitual, você escolhe um modelo e solicita contato para conversar sobre acabamento e configuração.' },
  { q: 'Quanto tempo leva para receber o produto?', a: 'Como a loja é fictícia, não existe prazo real de fabricação ou entrega. O fluxo de compra é apenas uma simulação.' },
  { q: 'Existe garantia?', a: 'As condições de garantia não estão disponíveis neste protótipo. Nenhuma compra real é realizada.' },
  { q: 'Como posso falar com a equipe?', a: 'Use o botão “Solicitar acesso” para abrir o formulário de demonstração e registrar seu interesse fictício.' }
];

/** Pergunta exibida por padrão ao carregar a página. */
export const DEFAULT_FAQ_INDEX = 0;
