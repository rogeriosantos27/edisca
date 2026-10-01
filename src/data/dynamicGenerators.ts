import { Question } from '../types';

// Helper to pick random element from an array
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Student names for EDISCA community scenarios
const STUDENT_NAMES = [
  "Sofia", "Miguel", "Yasmin", "Enzo", "Cauã", "Brenda", "Ícaro", "Lara",
  "Beatriz", "Davi", "Luísa", "Theo", "Rebeca", "Caio", "Letícia", "Bernardo",
  "Clara", "Guilherme", "Alice", "Mateus", "Emanuelle", "Gabriel", "Isabela", "Samuel"
];

function pickDistinctStudents(count: number): string[] {
  const shuffled = [...STUDENT_NAMES].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Helper to build 4 unique options with 1 correct answer and 3 distinct plausible distractors
function makeNumericOptions(correct: number, unit = "", step = 1): { opts: string[]; ans: number } {
  const set = new Set<number>();
  set.add(correct);
  
  const offsets = [-step * 2, -step, step, step * 2, step * 3, -step * 3].sort(() => 0.5 - Math.random());
  for (const off of offsets) {
    const val = correct + off;
    if (val > 0 && val !== correct) {
      set.add(val);
    }
    if (set.size === 4) break;
  }

  let extra = 1;
  while (set.size < 4) {
    set.add(correct + extra * step);
    extra++;
  }

  const sorted = Array.from(set).sort((a, b) => a - b);
  const opts = sorted.map(v => `${v}${unit ? ' ' + unit : ''}`);
  const ans = sorted.indexOf(correct);
  return { opts, ans };
}

// -------------------------------------------------------------
// AGE-ADAPTIVE DYNAMIC GENERATORS PER ROOM
// -------------------------------------------------------------

export const dynamicGenerators: Record<string, ((age?: number) => Question)[]> = {
  portaria: [
    // Template 1: Guias Informativos / Recepção
    (age = 10) => {
      if (age <= 9) {
        // Criança de 7 a 9 anos: soma simples e direta
        const n1 = pick([2, 3, 4]);
        const n2 = pick([2, 3, 4, 5]);
        const total = n1 + n2;
        const { opts, ans } = makeNumericOptions(total, "guias", 1);
        return {
          q: `Na portaria da EDISCA, o Prof. Junior tem ${n1} guias informativos da escola e o Prof. Cris trouxe mais ${n2} guias para entregar aos visitantes. Quantos guias eles têm juntos ao todo?`,
          opts,
          ans,
          exp: `Somando ${n1} guias com mais ${n2} guias (${n1} + ${n2}), eles têm exatamente ${total} guias organizados para a acolhida.`,
          hint: `Dica infantil: Junte os números nos dedinhos! Faça a continha de soma: ${n1} + ${n2}.`,
          difficulty: 'facil',
          minAge: 7,
          maxAge: 9
        };
      }
      // Educando de 10+ anos: divisão em grupos
      const groups = age >= 13 ? pick([4, 5, 6]) : pick([3, 4]);
      const perGroup = age >= 13 ? pick([4, 5, 6, 7]) : pick([3, 4, 5]);
      const total = groups * perGroup;
      const { opts, ans } = makeNumericOptions(perGroup, "guias", 1);
      return {
        q: `Os professores Junior e Cris precisam distribuir ${total} guias informativos da instituição para ${groups} grupos iguais de visitantes. Quantos guias cada grupo receberá?`,
        opts,
        ans,
        exp: `Dividindo o total de ${total} guias por ${groups} grupos (${total} ÷ ${groups}), cada grupo recebe exatamente ${perGroup} guias.`,
        hint: `Dica de raciocínio: Divida o total de ${total} guias pela quantidade de grupos (${groups}).`,
        difficulty: age >= 13 ? 'avancado' : 'medio',
        minAge: age >= 13 ? 13 : 10,
        maxAge: age >= 13 ? 18 : 12
      };
    },

    // Template 2: Horários / Rotina de Chegada
    (age = 10) => {
      if (age <= 9) {
        // Criança: cuidados simples de entrada e gentileza
        return {
          q: "Ao chegar na portaria da EDISCA para a aula de dança, qual é a atitude mais bonita e correta que o educando deve ter?",
          opts: [
            "Entrar com calma pelo portão e dar um 'Bom dia!' com um sorriso para os porteiros",
            "Entrar correndo empurrando os colegas",
            "Passar correndo sem falar com ninguém",
            "Ficar do lado de fora sem entrar"
          ],
          ans: 0,
          exp: "Cumprimentar com carinho e entrar pelo portão com calma demonstra respeito e mantém a segurança e a alegria de todos na escola.",
          hint: "Dica: Pense em como o carinho, a educação e a tranquilidade deixam o dia de todos mais feliz na recepção!",
          difficulty: 'facil',
          minAge: 7,
          maxAge: 9
        };
      }
      // Educando maior: cálculo de minutos antes do evento
      const startHour = pick([15, 16, 17]);
      const prepMinutes = age >= 13 ? pick([20, 25, 30]) : pick([15, 30]);
      const leadTime = 60 - prepMinutes;
      const displayHour = `${startHour}:00`;
      const correctTime = `${startHour - 1}:${leadTime}`;
      const wrongTimes = [
        `${startHour - 1}:${(leadTime + 10) % 60}`,
        `${startHour - 1}:${Math.max(0, leadTime - 15)}`,
        `${startHour}:${prepMinutes}`
      ].filter(t => t !== correctTime);
      const allOpts = Array.from(new Set([correctTime, ...wrongTimes])).slice(0, 4).sort();
      return {
        q: `Uma delegação cultural tem chegada prevista na portaria para as ${displayHour}. O Prof. Junior precisa de ${prepMinutes} minutos para inspecionar os acessos. A que horas ele deve iniciar para terminar pontualmente?`,
        opts: allOpts,
        ans: allOpts.indexOf(correctTime),
        exp: `Subtraindo ${prepMinutes} minutos de ${displayHour}, a equipe da portaria deve começar exatamente às ${correctTime}.`,
        hint: `Dica de raciocínio: Lembre-se que 1 hora tem 60 minutos. Subtraia ${prepMinutes} minutos de ${displayHour}!`,
        difficulty: age >= 13 ? 'avancado' : 'medio',
        minAge: age >= 13 ? 13 : 10,
        maxAge: age >= 13 ? 18 : 12
      };
    },

    // Template 3: Ordem de chegada e acolhida no portão
    (age = 10) => {
      if (age <= 9) {
        const [p1, p2, p3] = pickDistinctStudents(3);
        return {
          q: `Três amiguinhos chegaram juntos na portaria: ${p1} foi a 1ª a ser recebida e ${p2} foi o 2º. Quem entrou logo depois, ficando em 3º lugar na acolhida?`,
          opts: [p1, p2, p3, "Ninguém"],
          ans: 2,
          exp: `Como ${p1} foi a 1ª e ${p2} o 2º, a terceira pessoa a ser recebida foi ${p3}.`,
          hint: `Dica infantil: Veja quem sobrou dos três amiguinhos para ficar na 3ª posição da acolhida!`,
          difficulty: 'facil',
          minAge: 7,
          maxAge: 9
        };
      }
      const [p1, p2, p3, p4] = pickDistinctStudents(4);
      return {
        q: `No portão de entrada da EDISCA, ${p1} chegou antes de ${p2}. Já ${p3} foi recebido depois de ${p2}, mas antes de ${p4}. Quem foi a terceira pessoa a ser acolhida na portaria?`,
        opts: [p1, p2, p3, p4],
        ans: 2,
        exp: `A ordem cronológica correta de chegada foi: 1º ${p1} → 2º ${p2} → 3º ${p3} → 4º ${p4}. Logo, a 3ª pessoa recebida foi ${p3}.`,
        hint: "Dica de raciocínio: Ordene a sequência de chegada passo a passo: 1º, 2º, 3º e 4º lugar.",
        difficulty: age >= 13 ? 'avancado' : 'medio',
        minAge: age >= 13 ? 13 : 10,
        maxAge: age >= 13 ? 18 : 12
      };
    }
  ],

  secretaria: [
    // Template 1: Presença / Faltas / Cuidados de Matrícula
    (age = 10) => {
      if (age <= 9) {
        return {
          q: "Para não perder os passos novos da coreografia e aprender bastante na EDISCA, o educando deve vir às aulas:",
          opts: [
            "Todos os dias marcados, com alegria e pontualidade",
            "Apenas uma vez por mês",
            "Somente quando não tiver desenho animado na TV",
            "Nunca comparecer"
          ],
          ans: 0,
          exp: "A presença constante e a pontualidade ajudam o educando a se desenvolver na dança e nos estudos com segurança.",
          hint: "Dica: Dançar é maravilhoso! Estar presente nas aulas garante que você aprenda tudinho com a turma.",
          difficulty: 'facil',
          minAge: 7,
          maxAge: 9
        };
      }
      const totalClasses = age >= 13 ? pick([24, 28, 32, 40]) : pick([20, 24]);
      const reqPercent = age >= 13 ? pick([75, 80]) : 75;
      const minPresent = Math.ceil((totalClasses * reqPercent) / 100);
      const maxAbsences = totalClasses - minPresent;
      const { opts, ans } = makeNumericOptions(maxAbsences, "faltas", 1);
      return {
        q: `Para manter regular sua matrícula na EDISCA, o educando precisa de pelo menos ${reqPercent}% de presença. Se o período conta com ${totalClasses} aulas, qual é o número MÁXIMO de faltas permitidas?`,
        opts,
        ans,
        exp: `${reqPercent}% de ${totalClasses} aulas é ${minPresent} aulas presentes. Logo, o limite máximo de faltas é ${totalClasses} - ${minPresent} = ${maxAbsences} faltas.`,
        hint: `Dica de raciocínio: Calcule ${reqPercent}% de ${totalClasses} para achar a presença mínima, e subtraia do total de aulas!`,
        difficulty: age >= 13 ? 'avancado' : 'medio',
        minAge: age >= 13 ? 13 : 10,
        maxAge: age >= 13 ? 18 : 12
      };
    },

    // Template 2: Organização de Pastas / Letras do Alfabeto
    (age = 10) => {
      if (age <= 9) {
        const letters = ["A", "B", "C", "D"];
        return {
          q: "Na secretaria, as pastas dos educandos são guardadas seguindo a ordem do alfabeto: A, B, C, D... Se a pasta da 'Ana' começa com A e do 'Bruno' com B, qual letra vem logo a seguir para o próximo amigo?",
          opts: ["C", "Z", "X", "W"],
          ans: 0,
          exp: "Na ordem do alfabeto, após as letras A e B vem a letra C (como em Clara, Caio ou Carlos).",
          hint: "Dica infantil: Cante o comecinho do alfabeto: A, B, ... qual letrinha vem agora?",
          difficulty: 'facil',
          minAge: 7,
          maxAge: 9
        };
      }
      const candidates = ["Almeida", "Barbosa", "Cardoso", "Duarte", "Esteves", "Ferreira", "Gomes", "Henrique"];
      const shuffled = [...candidates].sort(() => 0.5 - Math.random()).slice(0, 4).sort();
      const first = shuffled[0];
      const displayOpts = [...shuffled].sort(() => 0.5 - Math.random());
      return {
        q: `A Profª Gesliane precisa arquivar quatro pastas de educandos por sobrenome em ordem alfabética: ${shuffled.join(", ")}. Qual pasta deve ser a primeira a ser colocada na gaveta?`,
        opts: displayOpts,
        ans: displayOpts.indexOf(first),
        exp: `Na ordem alfabética de A a Z, o sobrenome '${first}' precede os demais no arquivo da secretaria.`,
        hint: "Dica de raciocínio: Olhe a primeira letra de cada sobrenome e veja qual vem primeiro no alfabeto de A a Z!",
        difficulty: age >= 13 ? 'avancado' : 'medio',
        minAge: age >= 13 ? 13 : 10,
        maxAge: age >= 13 ? 18 : 12
      };
    }
  ],

  diretoria: [
    (age = 10) => {
      if (age <= 9) {
        return {
          q: "A diretoria da EDISCA cuida de toda a escola para que os alunos tenham dança, alimentação gostosa e livros. O que é mais valioso e importante para a diretora?",
          opts: [
            "O sorriso, a saúde e o aprendizado de cada educando",
            "Comprar brinquedos só para os adultos",
            "Deixar a escola vazia",
            "Fazer coisas sem pensar nas crianças"
          ],
          ans: 0,
          exp: "Os educandos são o coração da EDISCA! Todo o trabalho da diretoria existe para garantir a felicidade e o futuro brilhante de vocês.",
          hint: "Dica: Pense no motivo da EDISCA existir: cuidar e transformar a vida dos alunos com muito carinho e arte!",
          difficulty: 'facil',
          minAge: 7,
          maxAge: 9
        };
      }
      const years = age >= 13 ? pick([3, 4]) : 2;
      const totalEvals = years * 4;
      const { opts, ans } = makeNumericOptions(totalEvals, "avaliações", 2);
      return {
        q: `Um projeto cultural estratégico da diretoria tem duração total de ${years} anos e suas metas são avaliadas trimestralmente (4 vezes por ano). Quantas reuniões de avaliação a diretoria realizará ao todo?`,
        opts,
        ans,
        exp: `Em cada ano ocorrem 4 avaliações trimestrais. Em ${years} anos serão: ${years} × 4 = ${totalEvals} avaliações institucionais.`,
        hint: `Dica de raciocínio: Multiplique os ${years} anos pelas 4 avaliações trimestrais de cada ano (${years} × 4).`,
        difficulty: age >= 13 ? 'avancado' : 'medio',
        minAge: age >= 13 ? 13 : 10,
        maxAge: age >= 13 ? 18 : 12
      };
    }
  ],

  cozinha: [
    // Template 1: Receitas e Proporções
    (age = 10) => {
      if (age <= 9) {
        const apples = pick([3, 4, 5]);
        const bananas = pick([3, 4, 5]);
        const total = apples + bananas;
        const { opts, ans } = makeNumericOptions(total, "frutinhas", 1);
        return {
          q: `A Profª Aurea e o Prof. Galeno lavaram ${apples} maçãs vermelhas e ${bananas} bananas amarelas para o lanche da turminha. Quantas frutas saudáveis eles prepararam ao todo?`,
          opts,
          ans,
          exp: `Somando ${apples} maçãs com ${bananas} bananas (${apples} + ${bananas}), temos ${total} frutas deliciosas e cheias de vitaminas.`,
          hint: `Dica infantil: Faça uma continha de somar: ${apples} + ${bananas}!`,
          difficulty: 'facil',
          minAge: 7,
          maxAge: 9
        };
      }
      const baseKids = 50;
      const multiplier = age >= 13 ? pick([3, 4]) : 2;
      const targetKids = baseKids * multiplier;
      const baseIng = pick([2, 3]);
      const ingName = pick(["abóbora", "cenoura", "batata-doce"]);
      const totalIng = baseIng * multiplier;
      const { opts, ans } = makeNumericOptions(totalIng, "kg", baseIng);
      return {
        q: `Para alimentar 50 educandos, a Profª Aurea e o Prof. Galeno utilizam ${baseIng} kg de ${ingName}. Se hoje há ${targetKids} educandos presentes, quantos quilos de ${ingName} serão necessários?`,
        opts,
        ans,
        exp: `${targetKids} educandos é ${multiplier} vezes a quantidade base de 50. Logo, multiplicamos: ${baseIng} kg × ${multiplier} = ${totalIng} kg.`,
        hint: `Dica de raciocínio: Veja quantas vezes o número de alunos aumentou (${targetKids} ÷ 50) e multiplique os ${baseIng} kg por esse valor!`,
        difficulty: age >= 13 ? 'avancado' : 'medio',
        minAge: age >= 13 ? 13 : 10,
        maxAge: age >= 13 ? 18 : 12
      };
    },

    // Template 2: Higiene e Segurança dos Alimentos
    (age = 10) => {
      if (age <= 9) {
        return {
          q: "Antes de sentar à mesa para comer aquele lanche delicioso feito com carinho pelo Prof. Galeno, o que toda criança deve fazer?",
          opts: [
            "Lavar bem as mãozinhas com água e sabão",
            "Comer com a mão cheia de terra do pátio",
            "Limpar a mão na roupa do colega",
            "Não lavar as mãos"
          ],
          ans: 0,
          exp: "Lavar as mãozinhas com água e sabão remove a sujeira e os germes, protegendo nossa barriguinha contra dores e doenças.",
          hint: "Dica: A água e o sabão deixam nossas mãos limpinhas e prontas para segurar os alimentos!",
          difficulty: 'facil',
          minAge: 7,
          maxAge: 9
        };
      }
      return {
        q: "Para garantir que os alimentos cozidos no balcão térmico fiquem livres da proliferação bacteriana, o Prof. Galeno monitora a temperatura. Qual deve ser a temperatura mínima dos pratos quentes?",
        opts: ["20°C", "40°C", "60°C", "100°C"],
        ans: 2,
        exp: "Alimentos quentes devem ser mantidos a 60°C ou mais para impedir que bactérias se multipliquem nos pratos dos educandos.",
        hint: "Dica de raciocínio: As normas de vigilância sanitária exigem que comidas quentes fiquem bem aquecidas, acima de 60°C.",
        difficulty: age >= 13 ? 'avancado' : 'medio',
        minAge: age >= 13 ? 13 : 10,
        maxAge: age >= 13 ? 18 : 12
      };
    }
  ],

  financeiro: [
    (age = 10) => {
      if (age <= 9) {
        const itemPrice = pick([2, 3, 4]);
        const count = pick([2, 3]);
        const total = itemPrice * count;
        const { opts, ans } = makeNumericOptions(total, "reais", 1);
        return {
          q: `A Profª Patricia comprou ${count} laços de cabelo coloridos para a dança. Cada laço custou R$ ${itemPrice},00. Quanto ela pagou no total?`,
          opts,
          ans,
          exp: `${count} laços × R$ ${itemPrice},00 cada = R$ ${total},00 pagos com responsabilidade.`,
          hint: `Dica infantil: Some R$ ${itemPrice} + R$ ${itemPrice}... para achar o total!`,
          difficulty: 'facil',
          minAge: 7,
          maxAge: 9
        };
      }
      const original = age >= 13 ? pick([300, 400, 500]) : pick([100, 200]);
      const discountPercent = age >= 13 ? pick([15, 20, 25]) : 10;
      const savedAmount = (original * discountPercent) / 100;
      const finalPrice = original - savedAmount;
      const { opts, ans } = makeNumericOptions(finalPrice, "reais", 10);
      return {
        q: `A Profª Patricia está adquirindo sapatilhas por R$ ${original},00. Por ser uma compra comunitária à vista, a loja deu ${discountPercent}% de desconto. Quanto o setor financeiro pagará?`,
        opts,
        ans,
        exp: `${discountPercent}% de R$ ${original} = R$ ${savedAmount}. Valor final: R$ ${original} - R$ ${savedAmount} = R$ ${finalPrice},00.`,
        hint: `Dica de raciocínio: Calcule o desconto (${discountPercent}% de ${original}) e subtraia do valor inicial de ${original}!`,
        difficulty: age >= 13 ? 'avancado' : 'medio',
        minAge: age >= 13 ? 13 : 10,
        maxAge: age >= 13 ? 18 : 12
      };
    }
  ],

  reforco: [
    (age = 10) => {
      if (age <= 9) {
        const a = pick([4, 5, 6]);
        const b = pick([3, 4, 5]);
        const sum = a + b;
        const { opts, ans } = makeNumericOptions(sum, "", 1);
        return {
          q: `Na aulinha de reforço com a Profª Clara, o Prof. Rogério e a Profª Raquel, Mariana tinha ${a} lápis de cor no estojo e ganhou mais ${b} lápis da professora. Com quantos lápis ela ficou?`,
          opts,
          ans,
          exp: `${a} lápis mais ${b} lápis (${a} + ${b}) é igual a ${sum} lápis para colorir desenhos lindos!`,
          hint: `Dica infantil: Conte nos dedinhos: comece com ${a} e junte mais ${b}!`,
          difficulty: 'facil',
          minAge: 7,
          maxAge: 9
        };
      }
      if (age <= 12) {
        const width = pick([6, 7, 8]);
        const length = pick([9, 10, 11]);
        const perimeter = 2 * (width + length);
        const { opts, ans } = makeNumericOptions(perimeter, "metros", 2);
        return {
          q: `A Profª Raquel e o Prof. Rogério estão calculando o perímetro da sala de reforço retangular (${width} metros de largura por ${length} metros de comprimento). Qual é o perímetro total?`,
          opts,
          ans,
          exp: `O perímetro é 2 × (largura + comprimento): 2 × (${width} + ${length}) = ${perimeter} metros.`,
          hint: "Dica de raciocínio: Some todos os 4 lados do retângulo: largura + largura + comprimento + comprimento!",
          difficulty: 'medio',
          minAge: 10,
          maxAge: 12
        };
      }
      // Idade 13+: Fração de páginas e restante
      const totalPages = pick([80, 100, 120]);
      const frac = pick([3]); // 3/4
      const pagesRead = (totalPages * frac) / 4;
      const pagesLeft = totalPages - pagesRead;
      const { opts, ans } = makeNumericOptions(pagesLeft, "páginas", 5);
      return {
        q: `Na aula com a Profª Clara, um educando pegou um livro de ${totalPages} páginas e já leu exatamente 3/4 dele. Quantas páginas ainda faltam para ele concluir a leitura?`,
        opts,
        ans,
        exp: `1/4 de ${totalPages} é ${totalPages / 4}. Como leu 3 partes (${pagesRead} páginas), restam: ${totalPages} - ${pagesRead} = ${pagesLeft} páginas.`,
        hint: `Dica de raciocínio: Divida ${totalPages} por 4 para saber quanto vale 1/4. Como leu 3/4, ainda resta 1/4 para ler!`,
        difficulty: 'avancado',
        minAge: 13,
        maxAge: 18
      };
    }
  ],

  artes: [
    (age = 10) => {
      if (age <= 9) {
        return {
          q: "No ateliê de arte com a Profª Andrea, Profª Talita e Prof. Robson, se misturarmos a tinta azul com a tinta amarela no potinho, que cor mágica vai aparecer?",
          opts: ["Verde", "Preto", "Rosa", "Marrom"],
          ans: 0,
          exp: "A mágica das cores primárias: juntando azul com amarelo, nós criamos a cor verde da natureza!",
          hint: "Dica: Pense na cor das folhinhas das árvores e do gramado!",
          difficulty: 'facil',
          minAge: 7,
          maxAge: 9
        };
      }
      const combos = [
        { c1: "Azul", c2: "Amarelo", res: "Verde" },
        { c1: "Vermelho", c2: "Amarelo", res: "Laranja" },
        { c1: "Azul", c2: "Vermelho", res: "Roxo (ou Violeta)" }
      ];
      const chosen = pick(combos);
      const wrong = ["Marrom", "Cinza", "Preto", "Rosa"].filter(c => c !== chosen.res);
      const displayOpts = [chosen.res, ...wrong.slice(0, 3)].sort(() => 0.5 - Math.random());
      return {
        q: `No ateliê de artes plásticas, ao misturar as cores primárias ${chosen.c1} e ${chosen.c2} em proporções iguais, qual cor secundária é obtida no círculo cromático?`,
        opts: displayOpts,
        ans: displayOpts.indexOf(chosen.res),
        exp: `A combinação física das cores primárias ${chosen.c1} e ${chosen.c2} resulta na cor secundária ${chosen.res}.`,
        hint: `Dica de raciocínio: Lembre-se da teoria das cores: a mistura de ${chosen.c1} com ${chosen.c2} gera uma cor secundária conhecida.`,
        difficulty: age >= 13 ? 'avancado' : 'medio',
        minAge: age >= 13 ? 13 : 10,
        maxAge: age >= 13 ? 18 : 12
      };
    }
  ],

  danca: [
    (age = 10) => {
      if (age <= 9) {
        return {
          q: "Na aula com a Profª Gil e o Prof. Allyson, o que os bailarinos fazem logo no início da aula para acordar o corpo e não machucar os músculos?",
          opts: [
            "Um aquecimento e alongamento bem gostoso",
            "Sentar no chão e comer doce",
            "Dormir no cantinho da sala",
            "Dar cambalhotas perigosas sem avisar"
          ],
          ans: 0,
          exp: "O aquecimento avisa aos músculos e articulações que o corpo vai se movimentar, prevenindo dores e machucados.",
          hint: "Dica: Aquecer e esticar os bracinhos e perninhas prepara o corpo para dançar com alegria!",
          difficulty: 'facil',
          minAge: 7,
          maxAge: 9
        };
      }
      const phrases = age >= 13 ? pick([6, 8, 10]) : pick([4, 6]);
      const totalBeats = phrases * 8;
      const { opts, ans } = makeNumericOptions(totalBeats, "tempos", 8);
      return {
        q: `Na aula de dança contemporânea com a Profª Gil e o Prof. Allyson, uma sequência tem ${phrases} frases musicais de 8 tempos cada (compasso quaternário). Quantos tempos rítmicos tem essa coreografia ao todo?`,
        opts,
        ans,
        exp: `${phrases} frases × 8 tempos = ${totalBeats} tempos musicais contados no compasso.`,
        hint: `Dica de raciocínio: Multiplique o número de frases (${phrases}) pelos 8 tempos de cada frase (${phrases} × 8)!`,
        difficulty: age >= 13 ? 'avancado' : 'medio',
        minAge: age >= 13 ? 13 : 10,
        maxAge: age >= 13 ? 18 : 12
      };
    }
  ],

  teatro: [
    (age = 10) => {
      if (age <= 9) {
        return {
          q: "No teatro com a Profª Francis, quando estamos no palco e a professora pede para fazermos cara de surpresa alegre, o que nós fazemos?",
          opts: [
            "Abrimos bem os olhos e a boca com uma expressão divertida de 'UAU!'",
            "Fechamos os olhos e viramos de costas para o público",
            "Choramos sem motivo",
            "Saímos correndo do teatro"
          ],
          ans: 0,
          exp: "A expressão facial e corporal no teatro ajuda a contar a história e a emocionar quem está assistindo.",
          hint: "Dica: O corpo e o rostinho do ator mostram o que o personagem está sentindo na cena!",
          difficulty: 'facil',
          minAge: 7,
          maxAge: 9
        };
      }
      return {
        q: "Nas aulas de teatro com a Profª Francis, qual termo técnico designa a parte frontal do palco mais próxima da plateia?",
        opts: ["Proscênio", "Coxias", "Rotunda", "Urupema"],
        ans: 0,
        exp: "O proscênio é a área cênica situada à frente da linha do arco de cena, logo à frente dos olhos da plateia.",
        hint: "Dica de raciocínio: Lembre-se da arquitetura do palco italiano: a frente é o proscênio; os lados são as coxias.",
        difficulty: age >= 13 ? 'avancado' : 'medio',
        minAge: age >= 13 ? 13 : 10,
        maxAge: age >= 13 ? 18 : 12
      };
    }
  ],

  biblioteca: [
    (age = 10) => {
      if (age <= 9) {
        return {
          q: "Na biblioteca com a Profª Mary, como devemos virar as páginas de um livro ilustrado para que ele dure bastante tempo?",
          opts: [
            "Com as mãozinhas limpas e secas, virando suavemente pela pontinha da folha",
            "Puxando com força até rasgar o papel",
            "Passando a mão cheia de gordura do lanche",
            "Dobrando o livro ao meio"
          ],
          ans: 0,
          exp: "Os livros são tesouros de historinhas! Cuidar com delicadeza garante que outros amiguinhos também possam ler.",
          hint: "Dica: O papel é macio e merece todo o nosso carinho e cuidado ao folhear!",
          difficulty: 'facil',
          minAge: 7,
          maxAge: 9
        };
      }
      const loanDays = age >= 13 ? 14 : 7;
      const startDay = pick([3, 5, 8]);
      const endDay = startDay + loanDays;
      const { opts, ans } = makeNumericOptions(endDay, "de Maio", 2);
      return {
        q: `A Profª Mary emprestou um livro no dia ${startDay} de Maio. O prazo de empréstimo regular da biblioteca é de ${loanDays} dias. Em qual dia de Maio o livro deve retornar?`,
        opts,
        ans,
        exp: `Somando ${loanDays} dias ao dia inicial (${startDay} de Maio), o livro deve ser devolvido no dia ${endDay} de Maio.`,
        hint: `Dica de raciocínio: Some o dia de início (${startDay}) com os ${loanDays} dias de prazo (${startDay} + ${loanDays})!`,
        difficulty: age >= 13 ? 'avancado' : 'medio',
        minAge: age >= 13 ? 13 : 10,
        maxAge: age >= 13 ? 18 : 12
      };
    }
  ],

  jardim: [
    (age = 10) => {
      if (age <= 9) {
        return {
          q: "Para uma plantinha do jardim do Prof. Silva crescer bonita, verde e cheia de flores, do que ela precisa todos os dias?",
          opts: [
            "Água fresca com carinho, terra com nutrientes e a luz gostosa do sol",
            "Ficar trancada no escuro sem água",
            "Refrigerante e doces",
            "Pisar em cima dela"
          ],
          ans: 0,
          exp: "As plantinhas são seres vivos que precisam de água, sol e terra fértil para respirar e crescer felizes.",
          hint: "Dica: A natureza precisa de água pura e da luz do sol para florescer!",
          difficulty: 'facil',
          minAge: 7,
          maxAge: 9
        };
      }
      const meters = age >= 13 ? pick([6, 8, 10]) : pick([4, 5]);
      const perMeter = age >= 13 ? pick([3, 4]) : 2;
      const total = meters * perMeter;
      const { opts, ans } = makeNumericOptions(total, "mudas", perMeter);
      return {
        q: `O Prof. Silva está organizando um canteiro de ${meters} metros e plantará ${perMeter} mudas medicinais por metro linear. Quantas mudas ele plantará no total?`,
        opts,
        ans,
        exp: `${meters} metros × ${perMeter} mudas por metro = ${total} mudas no canteiro sustentável.`,
        hint: `Dica de raciocínio: Multiplique o comprimento (${meters} metros) pelas ${perMeter} mudas em cada metro!`,
        difficulty: age >= 13 ? 'avancado' : 'medio',
        minAge: age >= 13 ? 13 : 10,
        maxAge: age >= 13 ? 18 : 12
      };
    }
  ],

  saude: [
    (age = 10) => {
      if (age <= 9) {
        return {
          q: "Por que beber água pura e fresquinha ao longo do dia é tão importante para o corpinho do bailarino na EDISCA?",
          opts: [
            "Mantém o corpo hidratado, com energia e saudável para brincar e dançar",
            "Apenas para perder tempo",
            "Porque água substitui o almoço",
            "Para não precisar dormir"
          ],
          ans: 0,
          exp: "Nosso corpinho precisa de bastante água para que os músculos funcionem sem cãibras e o coração bata forte e feliz.",
          hint: "Dica: A água é o combustível da nossa saúde e da nossa energia para dançar!",
          difficulty: 'facil',
          minAge: 7,
          maxAge: 9
        };
      }
      const weight = age >= 13 ? pick([50, 60, 70]) : 40;
      const ml = weight * 35;
      const { opts, ans } = makeNumericOptions(ml, "ml", 200);
      return {
        q: `No setor Social e Saúde, os professores Lorena, Livia, Rubens e Gabriel ensinam que a meta diária de água é de 35 ml por quilo de peso corporal. Para um educando de ${weight} kg, qual é a quantidade recomendada?`,
        opts,
        ans,
        exp: `${weight} kg × 35 ml/kg = ${ml} ml de água por dia para manter os tecidos e músculos hidratados.`,
        hint: `Dica de raciocínio: Multiplique o peso (${weight}) pelos 35 ml (${weight} × 35)!`,
        difficulty: age >= 13 ? 'avancado' : 'medio',
        minAge: age >= 13 ? 13 : 10,
        maxAge: age >= 13 ? 18 : 12
      };
    }
  ],

  ti: [
    (age = 10) => {
      if (age <= 9) {
        return {
          q: "Na aulinha de informática com a Profª Luana, qual pecinha do computador nós seguramos com a mão para clicar nos desenhos da tela?",
          opts: ["O mouse", "O cabo de força", "A tomada da parede", "A vassoura"],
          ans: 0,
          exp: "O mouse (que significa ratinho em inglês) é o acessório que deslizamos sobre o tapetinho para apontar e clicar na tela.",
          hint: "Dica infantil: É um aparelhinho pequeno que parece um ratinho com botões para dar 'clique'!",
          difficulty: 'facil',
          minAge: 7,
          maxAge: 9
        };
      }
      return {
        q: "No laboratório de informática com a Profª Luana, qual das seguintes senhas é considerada a mais forte e segura para proteger arquivos?",
        opts: ["123456", "nomeDoAluno", "Ed!sc@2026#Arte", "senha123"],
        ans: 2,
        exp: "Senhas fortes combinam letras maiúsculas, minúsculas, números e caracteres especiais, evitando sequências óbvias.",
        hint: "Dica de raciocínio: Uma senha segura deve misturar maiúsculas, minúsculas, números e símbolos especiais!",
        difficulty: age >= 13 ? 'avancado' : 'medio',
        minAge: age >= 13 ? 13 : 10,
        maxAge: age >= 13 ? 18 : 12
      };
    }
  ],

  brecho: [
    (age = 10) => {
      if (age <= 9) {
        return {
          q: "No Brechó Solidário da Profª Gorete, quando uma roupinha bonita que não cabe mais em você é doada para outra criança, o que acontece?",
          opts: [
            "Outro coleguinha fica muito feliz vestindo a peça, e evitamos jogar roupas boas no lixo",
            "A roupa desaparece no ar",
            "Ninguém mais usa roupas",
            "A roupa é queimada"
          ],
          ans: 0,
          exp: "Doar e reutilizar roupas é um ato de amor e sustentabilidade: protege o meio ambiente e veste quem precisa com dignidade.",
          hint: "Dica: Reutilizar roupas é bom para o planeta e faz outros amigos felizes!",
          difficulty: 'facil',
          minAge: 7,
          maxAge: 9
        };
      }
      const price = age >= 13 ? pick([18, 22, 25]) : pick([12, 15]);
      const paid = 50;
      const change = paid - price;
      const { opts, ans } = makeNumericOptions(change, "reais", 2);
      return {
        q: `No Brechó Solidário, a Profª Gorete vendeu uma peça por R$ ${price},00. O apoiador pagou com uma cédula de R$ 50,00. Qual é o valor exato do troco?`,
        opts,
        ans,
        exp: `R$ 50,00 menos o custo da peça (R$ ${price},00) resulta em R$ ${change},00 de troco.`,
        hint: `Dica de raciocínio: Subtraia o valor da peça (${price}) dos R$ 50 pagos (50 - ${price})!`,
        difficulty: age >= 13 ? 'avancado' : 'medio',
        minAge: age >= 13 ? 13 : 10,
        maxAge: age >= 13 ? 18 : 12
      };
    }
  ],

  comunicacao: [
    (age = 10) => {
      if (age <= 9) {
        return {
          q: "A Profª Rafaela tira fotos lindas dos bailarinos da EDISCA dançando no palco. O que os alunos mostram nas fotos que emociona todo mundo?",
          opts: [
            "A alegria de dançar, a união com os colegas e o talento no palco",
            "Cara de bravo e briga",
            "Ficar de costas sem querer aparecer",
            "Chorar sem dançar"
          ],
          ans: 0,
          exp: "A fotografia da EDISCA celebra a beleza, o esforço e o brilho nos olhos de cada jovem artista.",
          hint: "Dica: A arte e a dança mostram a alegria e a amizade de todos no palco!",
          difficulty: 'facil',
          minAge: 7,
          maxAge: 9
        };
      }
      return {
        q: "Nas oficinas de fotojornalismo com a Profª Rafaela, qual princípio clássico de composição divide a tela em nove partes para posicionar o bailarino nos pontos de maior força visual?",
        opts: [
          "Regra dos Terços (grid 3x3)",
          "Foto torta no escuro",
          "Cortar a cabeça do bailarino",
          "Fotografar apenas o chão"
        ],
        ans: 0,
        exp: "A regra dos terços cria harmonia e equilíbrio estético ao posicionar o motivo principal nos pontos de intersecção.",
        hint: "Dica de raciocínio: Lembre-se da grade de três linhas e três colunas usada pelos fotógrafos!",
        difficulty: age >= 13 ? 'avancado' : 'medio',
        minAge: age >= 13 ? 13 : 10,
        maxAge: age >= 13 ? 18 : 12
      };
    }
  ],

  refeitorio: [
    (age = 10) => {
      if (age <= 9) {
        return {
          q: "Na hora do almoço com a Profª Amanda e a Profª Liduina, como nós devemos montar nosso pratinho de comida para ter bastante saúde?",
          opts: [
            "Um pratinho bem colorido, com arroz, feijão, saladinha fresca e legumes",
            "Apenas doces e balas",
            "Comer só batata frita com refrigerante",
            "Deixar o prato vazio"
          ],
          ans: 0,
          exp: "Quanto mais colorido for o nosso prato, mais vitaminas, minerais e energia teremos para aprender e dançar!",
          hint: "Dica: Cores no prato significam muitas vitaminas e força para o corpo!",
          difficulty: 'facil',
          minAge: 7,
          maxAge: 9
        };
      }
      const students = age >= 13 ? pick([100, 120, 150]) : 80;
      const savedPerStudent = 80; // gramas
      const totalSavedKg = (students * savedPerStudent) / 1000;
      const { opts, ans } = makeNumericOptions(totalSavedKg, "kg", 2);
      return {
        q: `No refeitório, as professoras Amanda e Liduina lançaram uma campanha contra o desperdício. Se cada um dos ${students} educandos economizar 80g de comida no prato, quantos quilos de alimento serão poupados?`,
        opts,
        ans,
        exp: `${students} educandos × 80g = ${students * 80}g = ${totalSavedKg} kg poupados contra o desperdício.`,
        hint: `Dica de raciocínio: Multiplique ${students} por 80 gramas e divida por 1.000 para converter em quilos!`,
        difficulty: age >= 13 ? 'avancado' : 'medio',
        minAge: age >= 13 ? 13 : 10,
        maxAge: age >= 13 ? 18 : 12
      };
    }
  ]
};
