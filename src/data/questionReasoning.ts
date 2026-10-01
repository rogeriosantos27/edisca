import { Question } from '../types';

/**
 * Generates an educational explanation of the thought process and reasoning (raciocínio)
 * required to solve the question, WITHOUT revealing which option is the correct answer.
 * This guides the educando to think independently, learn the underlying concept,
 * and try again with confidence!
 */
export function getQuestionReasoning(q: Question, roomKey?: string): string {
  // If the question has a specific hint/reasoning guide defined, prioritize it
  if (q.hint && q.hint.trim().length > 0) {
    return q.hint.trim();
  }

  const text = q.q.toLowerCase();

  // 1. Division / Distribution / Grouping problems
  if (
    text.includes("dividir") ||
    text.includes("distribuir") ||
    text.includes("grupos iguais") ||
    text.includes("cada grupo") ||
    text.includes("cestas") ||
    text.includes("por dia") && text.includes("quantos") ||
    text.includes("por gaveta") ||
    text.includes("em partes iguais")
  ) {
    return (
      "Para resolver este desafio, analise o total inicial informado no enunciado e a quantidade de grupos ou partes em que ele deve ser repartido. " +
      "Pense na operação de divisão (Total ÷ Grupos) ou pergunte-se: 'qual número, multiplicado pelo número de grupos, resulta exatamente no total informado?'. " +
      "Faça essa conta com calma antes de escolher a sua resposta!"
    );
  }

  // 2. Chronological sequence / Arrival order / Portão
  if (
    text.includes("passou antes") ||
    text.includes("entrou antes") ||
    text.includes("chegou antes") ||
    text.includes("depois de") ||
    text.includes("terceiro") ||
    text.includes("primeiro a") ||
    text.includes("ordem cronológica") ||
    text.includes("posição exata") ||
    text.includes("fila do portão") ||
    text.includes("portão de entrada") ||
    text.includes("acolhida")
  ) {
    return (
      "Neste tipo de enigma lógico, o segredo é organizar a linha do tempo passo a passo: " +
      "1º) Identifique quem o enunciado garante que veio antes ou depois; " +
      "2º) Monte a ordem mentalmente ou anote a sequência de quem chegou em 1º, 2º, 3º e 4º lugar; " +
      "3º) Observe a posição exata que a pergunta está pedindo. Veja quem se encaixa perfeitamente nela!"
    );
  }

  // 3. Time, Schedules, Clock and Lead times
  if (
    text.includes("a que horas") ||
    text.includes("quantos minutos") ||
    text.includes("horário") ||
    text.includes("horas e") ||
    text.includes("duração") ||
    text.includes("minutos antes")
  ) {
    return (
      "Para calcular o tempo corretamente: " +
      "Lembre-se de que 1 hora inteira tem exatamente 60 minutos. " +
      "Se o objetivo é saber o horário de início para aprontar tudo antes da chegada, faça uma contagem regressiva subtraindo os minutos necessários do horário final. " +
      "Se a questão pede a conversão de horas para minutos, converta cada hora em 60 e some os minutos restantes!"
    );
  }

  // 4. Fractions and Portions (Páginas de leitura, partes de tarefas)
  if (
    text.includes("fração") ||
    text.includes("/4") ||
    text.includes("/3") ||
    text.includes("um quarto") ||
    text.includes("metade") ||
    text.includes("restam") ||
    text.includes("faltam para")
  ) {
    return (
      "Para trabalhar com frações de uma quantidade total: " +
      "1º) Divida o valor total pelo denominador (o número de baixo da fração) para descobrir quanto vale uma única parte. " +
      "2º) Multiplique essa parte pela quantidade que já foi realizada. " +
      "3º) Por fim, preste muita atenção ao enunciado: ele pede a quantidade já feita ou o que AINDA FALTA para completar o todo? Subtraia do total se necessário!"
    );
  }

  // 5. Percentages and Attendance (Presença, descontos, orçamentos)
  if (
    text.includes("%") ||
    text.includes("porcentagem") ||
    text.includes("presença") ||
    text.includes("faltas") ||
    text.includes("desconto")
  ) {
    return (
      "Para resolver cálculos de porcentagem: " +
      "Lembre-se de que a porcentagem representa partes de 100. " +
      "Por exemplo, para calcular uma taxa sobre o total de aulas ou valores, multiplique o total pela porcentagem e divida por 100. " +
      "Se a questão perguntar o número MÁXIMO de faltas, descubra a presença mínima obrigatória e subtraia esse valor do total de aulas disponíveis no período!"
    );
  }

  // 6. Multiplication and Recipe Proportions / Food quantities
  if (
    text.includes("receita") ||
    text.includes("para 50 educandos") ||
    text.includes("para 150") ||
    text.includes("triplo") ||
    text.includes("dobro") ||
    text.includes("quantos quilos") ||
    text.includes("kg de")
  ) {
    return (
      "Em problemas de proporção e dimensionamento de receitas: " +
      "Descubra primeiro quantas vezes o número de pessoas aumentou em comparação com a quantidade original da receita base (por exemplo: se dobrou, triplicou, etc.). " +
      "Depois, basta multiplicar a quantidade de ingredientes por esse mesmo fator de proporção para manter o sabor e o valor nutricional perfeitos!"
    );
  }

  // 7. Geometry, Perimeters and Measurements
  if (
    text.includes("perímetro") ||
    text.includes("largura") && text.includes("comprimento") ||
    text.includes("metros") ||
    text.includes("área")
  ) {
    return (
      "Para calcular o perímetro de um espaço retangular (como uma sala de aula ou palco de dança): " +
      "Lembre-se de que o retângulo possui 4 lados (dois lados de largura e dois lados de comprimento). " +
      "O perímetro é a soma total de todos esses lados: (Largura + Comprimento) × 2. Some com atenção!"
    );
  }

  // 8. Number Sequences and Patterns
  if (
    text.includes("sequência") ||
    text.includes("próximo termo") ||
    text.includes("padrão") ||
    text.includes("a cada três")
  ) {
    return (
      "Para desvendar o segredo de uma sequência numérica ou de itens: " +
      "Compare os primeiros elementos e identifique qual é a regra de repetição ou de crescimento: " +
      "Os números estão aumentando de quanto em quanto? Ou os itens estão se repetindo em ciclos (A, B, C)? " +
      "Aplicando essa mesma regra ao último termo mostrado, você encontrará com segurança o próximo valor da sequência!"
    );
  }

  // 9. Alphabetical Order and Archives
  if (
    text.includes("ordem alfabética") ||
    text.includes("pastas") ||
    text.includes("sobrenome") ||
    text.includes("arquivar")
  ) {
    return (
      "Para organizar itens em ordem alfabética: " +
      "Compare a primeira letra de cada palavra de A até Z. Se as primeiras letras forem iguais, passe para a segunda letra, depois a terceira, e assim por diante. " +
      "Veja qual palavra deve vir antes ou entre as outras na estante ou gaveta de arquivos!"
    );
  }

  // 10. Financial calculations (Troco, saldo, economia)
  if (
    text.includes("troco") ||
    text.includes("saldo") ||
    text.includes("pago com uma cédula") ||
    text.includes("despesas")
  ) {
    return (
      "No raciocínio financeiro de troco e saldos: " +
      "Identifique o valor total que foi entregue ou arrecadado e subtraia o custo exato do produto ou serviço adquirido. " +
      "A diferença entre o valor pago e o preço da mercadoria é o valor exato que deve ser devolvido ou mantido em caixa!"
    );
  }

  // 11. Sector Specific Thematic Reasoning
  if (roomKey === 'cozinha' || roomKey === 'refeitorio') {
    return (
      "Na rotina da alimentação saudável e higiene da EDISCA: " +
      "Lembre-se de que a segurança biológica dos educandos vem sempre em primeiro lugar. " +
      "Alimentos quentes devem ser mantidos bem aquecidos (acima de 60°C) para impedir bactérias, " +
      "alimentos perecíveis sob refrigeração fria, e a higienização das mãos e ingredientes deve ser rigorosa antes de qualquer preparo ou consumo!"
    );
  }

  if (roomKey === 'danca' || roomKey === 'saude') {
    return (
      "Nos cuidados com o corpo do bailarino e a saúde integral: " +
      "Pense no alinhamento anatômico e na prevenção de lesões. O aquecimento prepara os músculos e articulações, " +
      "o descanso e o sono regeneram os tecidos, e a hidratação diária com água pura mantém a elasticidade e energia. " +
      "Reflita sobre qual atitude protege a saúde e o desenvolvimento harmonioso do jovem!"
    );
  }

  if (roomKey === 'teatro') {
    return (
      "Na arte teatral e expressão cênica: " +
      "Lembre-se dos ensinamentos sobre presença corporal, respiração diafragmática para projetar a voz sem esforço na garganta, " +
      "a importância do trabalho coletivo com os colegas e o respeito à escuta atenta no palco. Pense no propósito da cena!"
    );
  }

  if (roomKey === 'artes') {
    return (
      "No universo das artes visuais e teoria das cores: " +
      "Lembre-se de como o círculo cromático funciona: misturar duas cores primárias puras resulta em uma cor secundária. " +
      "Observe também os cuidados com as ferramentas (como secar pincéis sem amassar as cerdas e sovar argila sem bolhas de ar). " +
      "Pense na técnica correta que valoriza a criação artística!"
    );
  }

  if (roomKey === 'ti') {
    return (
      "No laboratório de informática e segurança digital: " +
      "Hardware é tudo o que podemos tocar fisicamente (peças, telas, circuitos); software são os programas e códigos. " +
      "Para segurança, desconfie de links suspeitos, use senhas fortes com números e símbolos, e mantenha cópias de segurança (backup). " +
      "Avalie qual alternativa prioriza o cuidado com os equipamentos e a proteção dos seus dados!"
    );
  }

  if (roomKey === 'jardim') {
    return (
      "No cultivo sustentável do jardim e horta ecológica: " +
      "Pense no ciclo vital das plantas: as regas devem ocorrer nos horários de sol ameno para não evaporar a água rapidamente, " +
      "a matéria seca na compostagem equilibra a umidade e o oxigênio, e plantas nativas do semiárido armazenam água internamente para resistir à seca. " +
      "Qual opção melhor respeita a harmonia da natureza?"
    );
  }

  if (roomKey === 'biblioteca') {
    return (
      "Na conservação dos livros e no amor à literatura: " +
      "A biblioteca é um espaço coletivo de pesquisa e acolhimento. " +
      "Pense em como os livros são catalogados, na importância de manusear as páginas com mãos limpas sem dobrar as folhas, " +
      "e na riqueza dos gêneros textuais (como poesia, contos e cordéis). Analise com calma o objetivo de preservação do acervo!"
    );
  }

  if (roomKey === 'diretoria' || roomKey === 'secretaria' || roomKey === 'financeiro' || roomKey === 'portaria' || roomKey === 'brecho' || roomKey === 'comunicacao') {
    return (
      "Para resolver esta situação institucional: " +
      "Considere a missão transformadora da EDISCA: ética, transparência pública, cuidado irrestrito com cada educando e organização rigorosa dos processos. " +
      "Pense em qual caminho garante a segurança coletiva, o respeito às normas e a sustentabilidade das atividades para toda a comunidade!"
    );
  }

  // Fallback general reasoning guidance
  return (
    "Para acertar esta questão, releia com atenção o que o enunciado está pedindo exatamente. " +
    "Identifique as informações principais, elimine as opções que não combinam com a rotina segura e educativa da escola, " +
    "e pense na lógica que melhor resolve essa situação com responsabilidade e cuidado!"
  );
}
