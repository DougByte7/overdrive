import type { DnD5eFeature, DnD5eClass, DnD5eSubClass } from "./interfaces"

const features: DnD5eFeature[] = [
  {
    name: "Conjuração",
    level: 1,
    description:
      "Como um estudante de magia arcana, você possui um livro de magias contendo feitiços que mostram os primeiros vislumbres do seu verdadeiro poder.",
  },
  {
    name: "Truques",
    level: 1,
    description:
      "No 1º nível, você conhece três truques à sua escolha da lista de magias do mago. Você aprende truques adicionais do mago de sua escolha em níveis mais altos, conforme mostrado na coluna Truques Conhecidos da tabela do Mago.",
  },
  {
    name: "Livro de Magias",
    level: 1,
    description:
      "No 1º nível, você possui um livro de magias contendo seis magias de mago de 1º nível de sua escolha. Seu livro de magias é o repositório das magias do mago que você conhece, exceto seus truques, que estão fixos em sua mente.",
  },
  {
    name: "Preparando e Lançando de Magias",
    level: 1,
    description:
      "A tabela do Mago mostra quantos espaços de magias você tem para lançar suas magias de 1º nível e superiores. Para lançar uma dessas magias, você deve gastar um espaço da magia do nível da magia ou superior. Você recupera todos os espaços de magias gastos quando termina um descanso longo.",
  },
  {
    name: "Preparação de Magias",
    level: 1,
    description:
      "Você prepara a lista de magias de mago que estão disponíveis para lançar. Para isso, escolha um número de magias de mago do seu livro de magias igual ao seu modificador de Inteligência + seu nível de mago (mínimo de uma magia). As magias devem ser de um nível para o qual você possui espaços de magia. Por exemplo, se você é um mago de 3º nível, possui quatro espaços de magia de 1º nível e dois de 2º nível. Com uma Inteligência de 16, sua lista de magias preparadas pode incluir seis magias de 1º ou 2º nível, em qualquer combinação, escolhidas do seu livro de magias. Se você preparar a magia mísseis mágicos de 1º nível, pode lançá-la usando um espaço de magia de 1º ou 2º nível. Lançar a magia não a remove da sua lista de magias preparadas. Você pode alterar sua lista de magias preparadas ao terminar um descanso longo. Preparar uma nova lista de magias de mago requer tempo gasto estudando seu livro de magias e memorizando as invocações e gestos que você deve fazer para lançar a magia: pelo menos 1 minuto por nível de magia para cada magia em sua lista.",
  },
  {
    name: "Habilidade de Conjuração",
    level: 1,
    description:
      "A inteligência é a habilidade de Conjuração para suas magias de mago, pois você aprende suas magias através de estudo dedicado e memorização. Você usa sua Inteligência sempre que uma magia se refere à sua habilidade de Conjuração. Além disso, você usa seu modificador de Inteligência ao definir a CD (Classe de Dificuldade) para um teste de resistência de uma magia de mago que você lança e ao fazer um ataque com uma magia.",
  },
  {
    name: "CD de Magia e Modificador de Ataque",
    level: 1,
    description:
      "CD de magia = 8 + seu bônus de proficiência + seu modificador de Inteligência. Modificador de ataque com magia = seu bônus de proficiência + seu modificador de Inteligência.",
  },
  {
    name: "Conjuração como Ritual",
    level: 1,
    description:
      "Você pode lançar uma magia de mago como um ritual se essa magia tiver a marca de ritual e você tiver a magia em seu livro de magias. Você não precisa ter a magia preparada.",
  },
  {
    name: "Foco de Conjuração",
    level: 1,
    description:
      "Você pode usar um foco arcano como foco de conjuração para suas magias de mago.",
  },
  {
    name: "Aprendendo Magias de 1º Nível ou Superior",
    level: 1,
    description:
      "Cada vez que você ganha um nível de mago, pode adicionar duas magias de mago de sua escolha ao seu livro de magias gratuitamente. Cada uma dessas magias deve ser de um nível para o qual você possui espaços de magia, conforme mostrado na tabela do Mago. Em suas aventuras, você pode encontrar outras magias que pode adicionar ao seu livro de magias (veja a seção 'Seu Livro de Magias').",
  },
  {
    name: "Recuperação Arcana",
    level: 1,
    description:
      "Você aprendeu a recuperar parte de sua energia mágica estudando seu livro de magias. Uma vez por dia, quando termina um descanso curto, você pode escolher espaços de magia gastos para recuperar. Os espaços de magia podem ter um nível combinado igual ou inferior à metade do seu nível de mago (arredondado para cima) e nenhum dos espaços pode ser de 6º nível ou superior. Por exemplo, se você é um mago de 4º nível, pode recuperar até dois níveis de espaços de magia. Você pode recuperar um espaço de magia de 2º nível ou dois espaços de magia de 1º nível.",
  },
  {
    name: "Tradição Arcana",
    level: 2,
    description:
      "Quando você alcança o 2º nível, escolhe uma tradição arcana, moldando sua prática de magia por meio de uma das oito escolas, como Evocação. Sua escolha concede a você características no 2º nível e novamente nos níveis 6º, 10º e 14º.",
  },
  {
    name: "Melhoria de Atributo",
    level: [4, 8, 12, 16, 19],
    description:
      "Quando você alcança o 4º nível, e novamente no 8º, 12º, 16º e 19º nível, você pode aumentar um atributo de sua escolha em 2, ou pode aumentar dois atributos de sua escolha em 1. Como de costume, você não pode aumentar um atributo acima de 20 usando essa característica.",
  },
  {
    name: "Maestria de Magias",
    level: 18,
    description:
      "No 18º nível, você alcançou tal maestria em certas magias que pode lançá-las à vontade. Escolha uma magia de mago de 1º nível e uma magia de mago de 2º nível que estejam em seu livro de magias. Você pode lançar essas magias em seu nível mais baixo sem gastar um espaço de magia quando as tiver preparadas. Se quiser lançar qualquer uma das magias em um nível mais alto, deve gastar um espaço de magia como de costume. Ao passar 8 horas estudando, você pode trocar uma ou ambas as magias que escolheu por magias diferentes dos mesmos níveis.",
  },
  {
    name: "Magias Signatárias",
    level: 20,
    description:
      "Quando você alcança o 20º nível, obtém maestria sobre duas magias poderosas e pode lançá-las com pouco esforço. Escolha duas magias de mago de 3º nível em seu livro de magias como suas magias signatárias. Você sempre tem essas magias preparadas, elas não contam contra o número de magias que você tem preparadas e pode lançar cada uma delas uma vez no 3º nível sem gastar um espaço de magia. Quando fizer isso, não poderá fazê-lo novamente até terminar um descanso curto ou longo. Se quiser lançar qualquer uma das magias signatárias em um nível mais alto, deve gastar um espaço de magia como de costume.",
  },
  {
    name: "Seu Livro de Magias",
    level: 1,
    description:
      "As magias que você adiciona ao seu livro de magias conforme adquire níveis refletem a pesquisa arcana que você conduz por conta própria e as descobertas intelectuais que fez sobre a natureza do multiverso. Você pode encontrar outras magias durante suas aventuras. Você pode descobrir uma magia registrada em um pergaminho no baú de um mago maligno, por exemplo, ou em um tomo empoeirado em uma biblioteca antiga.",
  },
  {
    name: "Copiando uma Magia para o Livro",
    level: 1,
    description:
      "Quando você encontra uma magia de mago de 1º nível ou superior, pode adicioná-la ao seu livro de magias se for de um nível de magia que você pode preparar e se tiver tempo para decifrar e copiá-la. Copiar essa magia no seu livro de magias envolve reproduzir a forma básica da magia e, em seguida, decifrar o sistema único de notação usado pelo mago que a escreveu. Você deve praticar a magia até entender os sons ou gestos necessários e, em seguida, transcrevê-la no seu livro de magias usando sua própria notação. Para cada nível da magia, o processo leva 2 horas e custa 50 peças de ouro (gp). O custo representa os componentes materiais que você gasta enquanto experimenta a magia para dominá-la, bem como as tintas finas necessárias para registrá-la. Depois de gastar esse tempo e dinheiro, você pode preparar a magia como as outras que já possui.",
  },
  {
    name: "Substituindo o Livro",
    level: 1,
    description:
      "Você pode copiar uma magia do seu próprio livro de magias para outro livro - por exemplo, se quiser fazer uma cópia de backup do seu livro de magias. Isso é como copiar uma nova magia no seu livro de magias, mas mais rápido e fácil, já que você entende sua própria notação e já sabe como lançar a magia. Você precisa gastar apenas 1 hora e 10 gp para cada nível da magia copiada. Se você perder o seu livro de magias, pode usar o mesmo procedimento para transcrever as magias que já preparou em um novo livro de magias. Preencher o restante do seu livro de magias exige que você encontre novas magias para fazê-lo, como de costume. Por essa razão, muitos magos mantêm livros de magias reserva em um local seguro.",
  },
  {
    name: "A Aparência do Livro",
    level: 1,
    description:
      "Seu livro de magias é uma compilação única de magias, com seus próprios enfeites decorativos e anotações nas margens. Pode ser um volume de couro simples e funcional que você recebeu como presente do seu mestre, um tomo finamente encadernado com bordas douradas que encontrou em uma biblioteca antiga ou até mesmo uma coleção solta de notas reunidas depois de perder seu livro de magias anterior em um contratempo.",
  },
]

const evocation: DnD5eSubClass = {
  name: "Escola da Evocação",
  description:
    "Você concentra seus estudos na magia que cria efeitos elementais poderosos, como frio intenso, chama abrasadora, trovão retumbante, relâmpagos crepitantes e ácido ardente. Alguns evocadores encontram emprego em forças militares, servindo como artilharia para atacar exércitos inimigos à distância. Outros usam seu poder espetacular para proteger os fracos, enquanto alguns buscam seu próprio ganho como bandidos, aventureiros ou tiranos aspirantes.",
  features: [
    {
      name: "Evocação Avançada",
      level: 2,
      description:
        "A partir do momento em que você seleciona esta escola no 2º nível, o ouro e o tempo que você deve gastar para copiar uma magia de evocação em seu livro de magias são reduzidos pela metade.",
    },
    {
      name: "Esculpir Magias",
      level: 2,
      description:
        "A partir do 2º nível, você pode criar bolsões de segurança relativa dentro dos efeitos de suas magias de evocação. Quando você lança uma magia de evocação que afeta outras criaturas que pode ver, pode escolher um número delas igual a 1 + o nível da magia. As criaturas escolhidas têm sucesso automático nos seus testes de resistência contra a magia e não sofrem dano se normalmente receberiam metade do dano em um teste bem-sucedido.",
    },
    {
      name: "Truque Poderoso",
      level: 6,
      description:
        "A partir do 6º nível, seus truques de dano afetam até mesmo criaturas que evitam a maior parte do efeito. Quando uma criatura tem sucesso em um teste de resistência contra seu truque, a criatura recebe metade do dano do truque (se houver) mas não sofre nenhum efeito adicional do truque.",
    },
    {
      name: "Evocação Aprimorada",
      level: 10,
      description:
        "A partir do 10º nível, você pode adicionar seu modificador de Inteligência a uma rolagem de dano de qualquer magia de evocação de mago que você lançar.",
    },
    {
      name: "Sobrecanalizar",
      level: 14,
      description:
        "A partir do 14º nível, você pode aumentar o poder de suas magias mais simples. Quando você lança uma magia de mago de 1º a 5º nível que causa dano, pode causar dano máximo com essa magia. A primeira vez que você faz isso, não sofre nenhum efeito adverso. Se você usar este recurso novamente antes de terminar um descanso longo, sofre 2d12 de dano necrótico para cada nível da magia, imediatamente após lançá-la. Cada vez que você usa este recurso novamente antes de completar um descanso longo, o dano necrótico por nível de magia aumenta em 1d12. Esse dano ignora resistência e imunidade.",
    },
  ],
}

const wizard: DnD5eClass = {
  name: "Mago",
  description: "HP d6, Habilidade Int, TR Int e Sab",
  features,
  subclasses: [evocation],
  hp: {
    dice: "d6",
    average: 4,
  },
  cantripKnown: [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  spellsKnown: [
    6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42,
    44,
  ],
  spellsSlots: [
    [Infinity, 2],
    [Infinity, 3],
    [Infinity, 4, 2],
    [Infinity, 4, 3],
    [Infinity, 4, 3, 2],
    [Infinity, 4, 3, 3],
    [Infinity, 4, 3, 3, 1],
    [Infinity, 4, 3, 3, 2],
    [Infinity, 4, 3, 3, 3, 1],
    [Infinity, 4, 3, 3, 3, 2],
    [Infinity, 4, 3, 3, 3, 2, 1],
    [Infinity, 4, 3, 3, 3, 2, 1],
    [Infinity, 4, 3, 3, 3, 2, 1, 1],
    [Infinity, 4, 3, 3, 3, 2, 1, 1],
    [Infinity, 4, 3, 3, 3, 2, 1, 1, 1],
    [Infinity, 4, 3, 3, 3, 2, 1, 1, 1],
    [Infinity, 4, 3, 3, 3, 2, 1, 1, 1, 1],
    [Infinity, 4, 3, 3, 3, 3, 1, 1, 1, 1],
    [Infinity, 4, 3, 3, 3, 3, 2, 1, 1, 1],
    [Infinity, 4, 3, 3, 3, 3, 2, 2, 1, 1],
  ],
  proficiencies: {
    weapon: ["simple"],
    savingThrows: ["intelligence", "wisdom"],
    skills: {
      amount: 2,
      options: [
        { label: "Arcana", value: "arcana" },
        { label: "História (History)", value: "history" },
        { label: "Intuição (Insight)", value: "insight" },
        { label: "Investigação (Investigation)", value: "investigation" },
        { label: "Medicina (Medicine)", value: "medicine" },
        { label: "Religião (Religion)", value: "religion" },
      ],
    },
    equipmentOptions: [
      [
        { index: "quarterstaff", amount: 1 },
        { index: "dagger", amount: 1 },
      ],
      [
        { index: "component-pouch", amount: 1 },
        { gear_category: "arcane-foci", amount: 1 },
      ],
      [
        { index: "scholars-pack", amount: 1 },
        { index: "explorers-pack", amount: 1 },
      ],
      [{ index: "spellbook", amount: 1 }],
    ],
  },
}

export default wizard

/*
Analise o texto a seguir e gere um arquivo json para cada paragrafo traduzido seguindo este schema: {
name: string em português;
level: number | number[];
description: string em português;
}

Texto:



*/
