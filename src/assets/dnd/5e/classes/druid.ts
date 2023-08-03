import type { DnD5eFeature, DnD5eClass, DnD5eSubClass } from "./interfaces"

const features: DnD5eFeature[] = [
  {
    name: "Druídico",
    level: 1,
    description:
      "Você conhece o Druídico, a linguagem secreta dos druidas. Você pode falar a língua e usá-la para deixar mensagens ocultas. Você e outros que conhecem essa linguagem detectam automaticamente tal mensagem. Outros detectam a presença da mensagem com um teste bem-sucedido de Sabedoria (Percepção) CD 15, mas não conseguem decifrá-la sem magia.",
  },
  {
    name: "Magia",
    level: 1,
    description:
      "Através da essência divina da própria natureza, você pode lançar feitiços para moldar essa essência à sua vontade.",
  },
  {
    name: "Truques",
    level: 1,
    description:
      "No 1º nível, você conhece dois truques de sua escolha da lista de magias de druida. Você aprende truques adicionais de druida de sua escolha em níveis mais altos, conforme mostrado na coluna Truques Conhecidos da tabela de druida.",
  },
  {
    name: "Preparando e Lançando Magias",
    level: 1,
    description:
      "A tabela de druida mostra quantos espaços de magia você tem para lançar suas magias de 1º nível e superiores. Para lançar uma dessas magias de druida, você deve gastar um espaço de nível da magia ou superior. Você recupera todos os espaços de magia gastos quando termina um descanso longo. Você prepara a lista de magias druídicas que estão disponíveis para você lançar, escolhendo da lista de magias de druida. Ao fazê-lo, escolha um número de magias druídicas igual ao seu modificador de Sabedoria + seu nível de druida (mínimo de uma magia). As magias devem ser de um nível para o qual você tenha espaços de magia. Por exemplo, se você é um druida de 3º nível, possui quatro espaços de magia de 1º nível e dois espaços de magia de 2º nível. Com uma Sabedoria de 16, sua lista de magias preparadas pode incluir seis magias de 1º ou 2º nível, em qualquer combinação. Se você preparar a magia de 1º nível cura ferimentos, poderá lançá-la usando um espaço de 1º ou 2º nível. Lançar a magia não a remove de sua lista de magias preparadas. Você também pode mudar sua lista de magias preparadas quando terminar um descanso longo. Preparar uma nova lista de magias druídicas requer tempo gasto em oração e meditação: pelo menos 1 minuto por nível de magia para cada magia em sua lista.",
  },
  {
    name: "Habilidade de Lançamento de Magia",
    level: 1,
    description:
      "A habilidade de conjuração de magias do Druida é baseada em Sabedoria, uma vez que sua magia é baseada em sua devoção e sintonia com a natureza. Sempre que uma magia se referir à habilidade de conjuração de magias, será utilizada a Sabedoria. Além disso, o modificador de Sabedoria é utilizado para definir a CD de resistência quando conjurando uma magia de druida e quando realizando um ataque com uma magia.",
  },
  {
    name: "Conjuração de Ritual",
    level: 1,
    description:
      "Você pode conjurar uma magia de druida como um ritual se essa magia tiver a marcação de ritual e você tiver a magia preparada.",
  },
  {
    name: "Foco de conjuração",
    level: 1,
    description:
      "Você pode utilizar um foco druídico (veja 'Equipamento') como foco de conjuração para suas magias de druida.",
  },
  {
    name: "Forma Selvagem",
    level: 2,
    description: `
    A partir do 2º nível, você pode usar sua ação para assumir magicamente a forma de uma besta que você já viu antes. Você pode usar esse recurso duas vezes. Você recupera os usos gastos quando termina um descanso curto ou longo. Seu nível de druida determina as bestas em que você pode se transformar, conforme mostrado na tabela Formas Selvagens. No 2º nível, por exemplo, você pode se transformar em qualquer besta que tenha um nível de desafio de 1/4 ou menor que não tenha deslocamento de voo ou natação. 
    | Nível | Máx. DC | Limitações                       | Exemplo       |
    | ------|---------|----------------------------------|---------------|
    | 2º    | 1/4     | Sem velocidade de voo ou natação | Lobo          |
    | 4º    | 1/2     | Sem velocidade de vôo            | Crocodilo     |
    | 8º    | 1       | —                                | Águia gigante |
    
    Você pode permanecer na forma de besta por um número de horas igual à metade do seu nível de druida (arredondado para baixo). Você então volta à sua forma normal, a menos que gaste outro uso dessa característica. Você pode voltar à sua forma normal antes usando uma ação bônus no seu turno. Você reverte automaticamente se ficar inconsciente, cair a 0 pontos de vida ou morrer. Enquanto você está transformado, as seguintes regras se aplicam:
    • Suas estatísticas de jogo são substituídas pelas estatísticas da besta, mas você mantém seu alinhamento, personalidade e pontuações de Inteligência, Sabedoria e Carisma. Você também retém todas as suas perícias e proficiências em testes de resistência, além de ganhar as da criatura. Se a criatura tiver a mesma proficiência que você e o bônus em seu bloco de estatísticas for maior que o seu, use o bônus da criatura em vez do seu. Se a criatura tiver alguma ação lendária ou de covil, você não poderá usá-la.
    • Ao se transformar, você assume os pontos de vida e Dados de Vida da besta. Quando você volta à sua forma normal, você retorna ao número de pontos de vida que tinha antes de se transformar. No entanto, se você reverter como resultado de cair para 0 pontos de vida, qualquer excesso de dano será transferido para sua forma normal. Por exemplo, se você sofrer 10 de dano na forma animal e tiver apenas 1 ponto de vida sobrando, você reverte e recebe 9 de dano. Contanto que o excesso de dano não reduza sua forma normal a 0 pontos de vida, você não fica inconsciente.
    • Você não pode lançar feitiços, e sua habilidade de falar ou realizar qualquer ação que exija as mãos é limitada às capacidades de sua forma de besta. Transformar não quebra sua concentração em um feitiço que você já lançou, entretanto, ou o impede de realizar ações que fazem parte de um feitiço, como chamar um raio, que você já lançou.
    • Você retém o benefício de quaisquer recursos de sua classe, raça ou outra fonte e pode usá-los se a nova forma for fisicamente capaz de fazê-lo. No entanto, você não pode usar nenhum de seus sentidos especiais, como visão no escuro, a menos que sua nova forma também tenha esse sentido.
    • Você escolhe se seu equipamento cai no chão em seu espaço, se funde em sua nova forma ou é usado por ela. O equipamento usado funciona normalmente, mas o Mestre decide se é prático para a nova forma usar uma peça de equipamento, com base na forma e tamanho da criatura. Seu equipamento não muda de tamanho ou forma para combinar com a nova forma, e qualquer equipamento que a nova forma não possa usar deve cair no chão ou se fundir a ele. O equipamento que se funde com o formulário não tem efeito até que você saia do formulário.
    `,
  },
  {
    name: "Círculo Druídico",
    level: 2,
    description:
      "Ao chegar ao 2º nível, você escolhe se identificar com um círculo druídico, como o Círculo da Terra. Sua escolha concede recursos a você no 2º nível e novamente no 6º, 10º e 14º nível.",
  },
  {
    name: "Aumento no valor de atributo",
    level: 4,
    description:
      "Quando você chegar ao 4º nível e novamente no 8º, 12º, 16º e 19º nível, você pode aumentar um atributo de sua escolha em 2, ou pode aumentar dois atributos de sua escolha em 1. Como normal, você não pode aumentar um atributo acima de 20 usando este recurso.",
  },
  {
    name: "Corpo Eterno",
    level: 18,
    description:
      "Ao chegar ao 18º nível, a magia primordial que você manipula faz com que você envelheça mais lentamente. A cada 10 anos que passam, seu corpo envelhece apenas 1 ano.",
  },
  {
    name: "Magias de Feras",
    level: 18,
    description:
      "A partir do 18º nível, você pode conjurar muitas de suas magias de druida em qualquer forma que assumir usando Forma Selvagem. Você pode executar os componentes somáticos e verbais de uma magia de druida enquanto estiver em forma de fera, mas não poderá fornecer componentes materiais.",
  },
  {
    name: "Arquidruida",
    level: 20,
    description:
      "A partir do 20º nível, você pode usar sua Forma Selvagem um número ilimitado de vezes. Além disso, você pode ignorar os componentes verbais e somáticos de seus feitiços druídicos, bem como quaisquer componentes materiais que não tenham custo e não sejam consumidos por um feitiço. Você obtém esse benefício tanto em sua forma normal quanto em sua forma de besta da Forma Selvagem.",
  },
  {
    name: "Plantas Sagradas e Madeira",
    level: 1,
    description:
      "Um druida considera certas plantas como sagradas, especialmente o freixo, a cinza, o vidoeiro, o sabugueiro, o avelã, o azevinho, o zimbro, o visco, o carvalho, o freixo comprido ou azevinho em raminhos. Druidas frequentemente usam essas plantas como parte do foco de feitiçaria, incorporando comprimentos de carvalho ou freixo ou raminhos de visco. Da mesma forma, um druida usa essas madeiras para fazer outros objetos, como armas e escudos. O freixo comprido está associado à morte e renascimento, então alças de armas para cimitarras ou foices podem ser feitas a partir dele. A cinza está associada à vida e o carvalho à força. Essas madeiras fazem excelentes cabos ou armas inteiras, como clavas ou bastões, bem como escudos. O freixo está associado ao ar e pode ser usado para armas de arremesso, como dardos ou lanças. Druidas de regiões que não possuem as plantas descritas aqui escolheram outras plantas para assumir usos semelhantes. Por exemplo, um druida de uma região desértica pode valorizar a árvore de yucca e plantas de cacto.",
  },
  {
    name: "Druidas e os Deuses",
    level: 1,
    description:
      "Alguns druidas veneram as forças da natureza em si, mas a maioria dos druidas é devota a um dos muitos deuses da natureza adorados no multiverso (as listas de deuses no Apêndice do Livro do Jogador incluem muitos desses deuses). A adoração dessas divindades é frequentemente considerada uma tradição mais antiga do que as fé dos clérigos e povos urbanizados.",
  },
]

const earth: DnD5eSubClass = {
  name: "Círculo da Terra",
  description:
    "O Círculo da Terra é composto de místicos e sábios que protegem o conhecimento e os ritos antigos por meio de uma vasta tradição oral. Esses druidas se reúnem dentro de círculos sagrados de árvores ou pedras em pé para sussurrar segredos primais em Druida. Os membros mais sábios do círculo presidem como os sacerdotes-chefes das comunidades que mantêm a Velha Fé e servem como conselheiros dos governantes desses povos. Como membro deste círculo, sua magia é influenciada pela terra onde você foi iniciado nos ritos misteriosos.",
  features: [
    {
      name: "Truque Adicional",
      level: 2,
      description:
        "Quando você escolhe este círculo no 2º nível, aprende um truque adicional de druida de sua escolha.",
    },
    {
      name: "Recuperação Natural",
      level: 2,
      description:
        "A partir do 2º nível, você pode recuperar parte de sua energia mágica sentando em meditação e comungando com a natureza. Durante um descanso curto, você escolhe quais espaços de magia expirados deseja recuperar. Os espaços de magia podem ter um nível combinado igual ou inferior à metade do seu nível de druida (arredondado para cima) e nenhum dos espaços pode ser de 6º nível ou superior. Você não pode usar esta característica novamente até terminar um descanso longo. Por exemplo, quando você é um druida de 4º nível, pode recuperar até dois níveis de espaços de magia. Você pode recuperar um espaço de 2º nível ou dois espaços de 1º nível.",
    },
    {
      name: "Feitiços de Círculo",
      level: [2, 5, 7, 8],
      description: `
      Sua conexão mística com a terra o infunde com a capacidade de lançar certos feitiços. Nos níveis 3, 5, 7 e 9, você ganha acesso a feitiços de círculo conectados à terra onde se tornou um druida. Escolha essa terra - ártica, costa, deserto, floresta, pastagem, montanha ou pântano - e consulte a lista associada de feitiços.

Assim que você ganhar acesso a um feitiço de círculo, sempre terá ele preparado, e ele não contará contra o número de feitiços que pode preparar a cada dia. Se você ganhar acesso a um feitiço que não aparece na lista de feitiços de druida, o feitiço ainda é um feitiço de druida para você.

Ártico
| Druid Level | Circle Spells                |
|-------------|------------------------------|
| 3rd         | hold person, spike growth    |
| 5th         | sleet	storm, slow |
| 7th         | freedom of movement, ice storm |
| 9th         | commune with nature, cone of cold |


Costa:
| Druid Level | Circle Spells                |
|-------------|------------------------------|
| 3rd         | hold person, spike growth    |
| 5th         | sleet storm, slow            |
| 7th         | freedom of movement, ice storm|
| 9th         | commune with nature, cone of cold|

Deserto:
| Druid Level | Circle Spells                       |
|-------------|-------------------------------------|
| 3rd         | blur, silence                       |
| 5th         | create food and water, protection from energy|
| 7th         | blight, hallucinatory terrain        |
| 9th         | insect plague, wall of stone         |

Floresta:
| Druid Level | Circle Spells              |
|-------------|----------------------------|
| 3rd         | barkskin, spider climb     |
| 5th         | call lightning, plant growth|
| 7th         | divination, freedom of movement|
| 9th         | commune with nature, tree stride|

Pastagem:
| Druid Level | Circle Spells           |
|-------------|-------------------------|
| 3rd         | invisibility, pass without trace|
| 5th         | daylight, haste          |
| 7th         | divination, freedom of movement|
| 9th         | dream, insect plague     |

Montanha:
| Druid Level | Circle Spells                |
|-------------|------------------------------|
| 3rd         | spider climb, spike growth   |
| 5th         | lightning bolt, meld into stone|
| 7th         | stone shape, stoneskin       |
| 9th         | passwall, wall of stone      |

Pantano:
| Druid Level | Circle Spells                |
|-------------|------------------------------|
| 3rd         | acid arrow, darkness         |
| 5th         | water walk, stinking cloud   |
| 7th         | freedom of movement, locate creature|
| 9th         | insect plague, scrying        |
      `,
    },
    {
      name: "Passos da Terra",
      level: 6,
      description:
        "Mover-se através de terrenos difíceis não mágicos não custa movimento extra. Você também pode passar por plantas não mágicas sem ser retardado por elas e sem sofrer danos delas se tiverem espinhos, pontas ou riscos semelhantes. Além disso, você tem vantagem em testes de resistência contra plantas criadas ou manipuladas magicamente para impedir o movimento, como as criadas pelo feitiço emaranhar.",
    },
    {
      name: "Guardião da Natureza",
      level: 10,
      description:
        "Você não pode ser encantado ou amedrontado por elementais ou fadas e é imune a veneno e doença.",
    },
    {
      name: "Santuário da Natureza",
      level: 14,
      description:
        "Quando uma criatura besta ou planta ataca você, essa criatura deve fazer um teste de resistência de Sabedoria contra a CD da magia do druida. Se falhar, a criatura deve escolher um alvo diferente ou o ataque erra automaticamente. Se passar, a criatura é imune a este efeito por 24 horas. A criatura está ciente deste efeito antes de fazer o ataque contra você.",
    },
  ],
}

const druid: DnD5eClass = {
  name: "Druida",
  description: "HP d8, Habilidade Sab, TR Sab e Car",
  features,
  subclasses: [earth],
  hp: {
    dice: "d8",
    average: 5,
  },
  proficiencies: {
    armor: ["light", "medium", "shield"],
    weapon: ["simple"],
    savingThrows: ["wisdom", "charisma"],
    skills: {
      amount: 2,
      options: [
        { label: "História (History)", value: "history" },
        { label: "Intuição (Insight)", value: "insight" },
        { label: "Medicina (Medicine)", value: "medicine" },
        { label: "Persuasão (Persuasion)", value: "persuasion" },
        { label: "Religião (Religion)", value: "religion" },
      ],
    },
    equipmentOptions: [
      [
        { index: "shield", amount: 1 },
        { category_range: "Simple", amount: 1 },
      ],
      [
        { index: "scimitar", amount: 1 },
        { index: "Simple Melee", amount: 1 },
      ],
      [{ index: "leather-armor", amount: 1 }],
      [{ index: "explorers-pack", amount: 1 }],
      [{ gear_category: "druidic-foci", amount: 1 }],
    ],
  },
}

export default druid

/*
Analise o texto a seguir e gere um arquivo json para cada paragrafo traduzido seguindo este schema: {
name: string em português;
level: number;
description: string em português;
}

Texto:
*/
