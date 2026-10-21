/**
 * Model — camada de domínio/dados da aplicação.
 *
 * No padrão MVVM, o Model representa apenas os dados e as regras de domínio,
 * sem nenhuma dependência de componentes React ou de estado de interface.
 */

export const armors = [
  {
    id: 'mk3',
    name: 'MARK III',
    label: 'O CLÁSSICO',
    price: 'R$ 4.999,00',
    description: 'Equilíbrio entre potência, proteção e mobilidade.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJEiomPOA81LAKi-wx96ECQqlJgSSdSwb34AjlpbykUg&s=10',
    tag: 'ÍCONE'
  },
  {
    id: 'mkxlv',
    name: 'MARK XLIV',
    label: 'HULKBUSTER',
    price: 'R$ 8.499,00',
    description: 'Estrutura reforçada para missões de alto impacto.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAsu02u_js_-1-xwxqaBlCC7FwmqC_fBrTOb6Hw88RYA&s=10',
    tag: 'ALTA POTÊNCIA'
  },
  {
    id: 'mklxxxv',
    name: 'MARK LXXXV',
    label: 'NANO TECH',
    price: 'R$ 6.799,00',
    description: 'Engenharia adaptativa em um design de última geração.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGcZqVr_uLGfkNCW9kgAYbJWPDv_7rOFC-YDAgjLcsOA&s=10',
    tag: 'AVANÇADA'
  }
];

/** Modelo exibido por padrão ao carregar a página. */
export const DEFAULT_ARMOR_INDEX = 2;
