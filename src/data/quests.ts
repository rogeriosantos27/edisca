import { QuestRoom } from '../types';

export const questsData: Record<string, QuestRoom> = {
  portaria: {
    room: "Portaria",
    npcs: ["Prof. Junior", "Prof. Cris"],
    icon: "🚪",
    intro: "Bem-vindos à portaria da EDISCA! Somos o Professor Junior e o Professor Cris. Nosso trabalho é garantir a segurança e o acesso correto de todos. Vamos testar sua lógica de organização?",
    questions: [
      {
        q: "Na entrada da EDISCA, quatro educandos chegaram à portaria. Sofia entrou antes de Miguel. Ana entrou depois de Miguel, mas antes de Lucas. Quem foi o terceiro a passar pela catraca?",
        opts: ["Sofia", "Miguel", "Ana", "Lucas"],
        ans: 2,
        exp: "A ordem correta é: Sofia → Miguel → Ana → Lucas. Portanto, a terceira pessoa a passar pela catraca foi Ana."
      },
      {
        q: "A equipe da portaria precisa localizar um educando. Eles sabem apenas que ele não está na recepção, nem na biblioteca, e que ainda não foi para o refeitório. Em qual lugar ele provavelmente está?",
        opts: ["Sala de aula", "Recepção", "Biblioteca", "Refeitório"],
        ans: 0,
        exp: "Como os outros locais já foram descartados, a única possibilidade restante é que ele esteja na sala de aula."
      },
      {
        q: "O ensaio termina às 17h30. Os pais começam a chegar 15 minutos antes. A que horas a portaria deve organizar a área de espera?",
        opts: ["17h00", "17h15", "17h30", "17h45"],
        ans: 1,
        exp: "Se eles chegam 15 minutos antes das 17h30, a recepção deve estar pronta às 17h15."
      },
      {
        q: "Por que não podemos deixar as portas principais totalmente abertas sem monitoramento durante as aulas?",
        opts: ["Para o ar condicionado não vazar", "Por medidas rigorosas de proteção aos educandos", "Para não entrar poeira", "Porque a porta quebra"],
        ans: 1,
        exp: "A prioridade número um da portaria é a segurança física de todos os alunos e funcionários."
      },
      {
        q: "Na entrada da EDISCA há quatro mochilas esquecidas. Uma é azul, uma verde, uma vermelha e uma amarela. Sabe-se que: a mochila azul não é de quem chegou primeiro; a vermelha pertence a alguém que chegou antes do dono da verde; a amarela foi a última a ser identificada. Qual mochila certamente não foi a primeira a chegar?",
        opts: ["Azul", "Verde", "Vermelha", "Amarela"],
        ans: 0,
        exp: "O enunciado informa diretamente que a mochila azul não pertence a quem chegou primeiro."
      }
    ]
  },
  secretaria: {
    room: "Secretaria",
    npcs: ["Profª Gesliane"],
    icon: "🗂️",
    intro: "Oi, aqui é a Professora Gesliane! Cuidamos de toda a documentação, presenças e matrículas para que vocês possam estudar em paz. Me ajude com a rotina administrativa!",
    questions: [
      {
        q: "Temos 100 pastas de alunos e precisamos organizá-las em ordem alfabética. A pasta da 'Ana' e do 'Bruno' já estão no lugar. Onde entra a pasta da 'Beatriz'?",
        opts: ["Antes da Ana", "Depois do Bruno", "Entre Ana e Bruno", "No final"],
        ans: 2,
        exp: "Na ordem alfabética, 'Beatriz' (Be) vem depois de 'Ana' (An) e antes de 'Bruno' (Br)."
      },
      {
        q: "Para manter a bolsa, o aluno precisa de 75% de presença. Se o mês tem 20 aulas, qual é o número MÁXIMO de faltas que ele pode ter?",
        opts: ["3 faltas", "5 faltas", "7 faltas", "10 faltas"],
        ans: 1,
        exp: "75% de 20 é 15 aulas. Portanto, ele pode faltar no máximo 5 vezes (20 - 15 = 5)."
      },
      {
        q: "Um edital exige RG, CPF e Comprovante de Residência de cada aluno. Se vamos matricular 30 novos educandos, quantos documentos, no total, a secretaria precisará arquivar?",
        opts: ["30", "60", "90", "120"],
        ans: 2,
        exp: "São 3 documentos por aluno. 30 alunos x 3 = 90 documentos processados com muito cuidado!"
      },
      {
        q: "Se um pai liga perguntando sobre o calendário de férias, qual documento a secretaria consulta para dar a informação exata?",
        opts: ["Livro de presenças", "Calendário letivo institucional", "Lista de materiais", "O cardápio da cozinha"],
        ans: 1,
        exp: "O calendário letivo é o documento oficial que rege todas as datas da instituição."
      },
      {
        q: "A atualização de dados cadastrais ocorre a cada semestre. Se estamos em fevereiro, a próxima atualização será em:",
        opts: ["Março", "Agosto", "Dezembro", "Outubro"],
        ans: 1,
        exp: "Um semestre tem 6 meses. Fevereiro (mês 2) + 6 meses = Agosto (mês 8)."
      }
    ]
  },
  diretoria: {
    room: "Diretoria",
    npcs: ["Profª Andrea", "Profª Claudia", "Dirª Dora", "Profª Amanda"],
    icon: "🏢",
    intro: "Olá! Somos Andrea, Claudia, Dora e Amanda. Como líderes da instituição, planejamos o futuro da EDISCA, buscamos parcerias e mantemos nossos projetos vivos. Vamos testar sua visão estratégica?",
    questions: [
      {
        q: "A EDISCA precisa planejar um novo espetáculo. Qual a sequência lógica de planejamento?",
        opts: ["Ensaiar > Apresentar > Captar Recursos", "Captar Recursos > Criar > Ensaiar > Apresentar", "Apresentar > Criar > Captar Recursos", "Criar > Apresentar > Ensaiar"],
        ans: 1,
        exp: "Sem recursos e sem criação, não há ensaio. E o espetáculo é a etapa final de todo esse esforço."
      },
      {
        q: "Para garantir que a escola continue funcionando por anos, a diretoria prioriza:",
        opts: ["Gastar todo o recurso em um único evento", "Sustentabilidade financeira e planejamento a longo prazo", "Fazer apenas reuniões sem ação", "Não ter parceiros"],
        ans: 1,
        exp: "A sustentabilidade garante que as futuras gerações de alunos também tenham as mesmas oportunidades."
      },
      {
        q: "Temos uma reunião com 3 possíveis patrocinadores. Cada um exige um relatório de impacto social diferente. Quantos relatórios precisamos preparar?",
        opts: ["1 geral", "Nenhum", "3 personalizados", "10"],
        ans: 2,
        exp: "Se cada um exige um formato diferente, devemos honrar o compromisso preparando 3 relatórios específicos."
      },
      {
        q: "A missão da EDISCA envolve arte e educação. Se tivermos que cortar custos, qual área NÃO pode ser comprometida?",
        opts: ["O desenvolvimento e bem-estar dos educandos", "A pintura externa do muro", "Decorações de escritório", "Troca de móveis da diretoria"],
        ans: 0,
        exp: "Vocês, educandos, são o coração do nosso projeto. O investimento no bem-estar de vocês é intocável."
      },
      {
        q: "Se um projeto social dura 2 anos e é avaliado trimestralmente. Quantas avaliações a diretoria fará até o fim do projeto?",
        opts: ["4", "6", "8", "12"],
        ans: 2,
        exp: "Cada ano tem 4 trimestres. Em 2 anos, são 8 avaliações para garantir o sucesso do projeto."
      }
    ]
  },
  cozinha: {
    room: "Cozinha",
    npcs: ["Profª Aurea", "Prof. Galeno"],
    icon: "🍳",
    intro: "Cheirinho de comida boa! Somos a Professora Aurea e o Professor Galeno. Preparamos a alimentação nutritiva que dá energia para vocês dançarem. Vamos calcular nossa rotina?",
    questions: [
      {
        q: "Na cozinha, as bandejas recebem etiquetas nesta sequência: A, B, C, A, B, C, A... Qual letra aparecerá na 11ª bandeja?",
        opts: ["A", "B", "C", "D"],
        ans: 1,
        exp: "A sequência se repete a cada três bandejas. A 11ª posição corresponde à letra B."
      },
      {
        q: "A distribuição da refeição exige higiene rigorosa. Qual a ordem correta antes de servir?",
        opts: ["Servir > Lavar as mãos > Cozinhar", "Lavar as mãos > Colocar touca > Cozinhar > Servir", "Cozinhar > Comer > Servir", "Lavar os alimentos depois de picar"],
        ans: 1,
        exp: "A higienização (mãos e cabelo) é o primeiro passo para garantir a segurança alimentar de todos."
      },
      {
        q: "As frutas precisam ser organizadas em ordem alfabética. Qual sequência está correta?",
        opts: [
          "Banana → Maçã → Melancia → Pera",
          "Maçã → Banana → Melancia → Pera",
          "Banana → Melancia → Maçã → Pera",
          "Melancia → Banana → Maçã → Pera"
        ],
        ans: 0,
        exp: "Em ordem alfabética: Banana, Maçã, Melancia e Pera."
      },
      {
        q: "Na cozinha, quatro recipientes estão identificados como Açúcar, Sal, Farinha e Arroz. Sabe-se que apenas um rótulo está correto. Ao abrir o recipiente escrito 'Sal', você encontra farinha. Qual rótulo certamente está errado?",
        opts: ["Açúcar", "Sal", "Farinha", "Arroz"],
        ans: 1,
        exp: "Como o recipiente identificado como 'Sal' contém farinha, esse rótulo certamente está errado."
      },
      {
        q: "Por que o cardápio da EDISCA é planejado semanas antes?",
        opts: ["Para comprar os ingredientes com antecedência e garantir o valor nutricional", "Porque é mais fácil cozinhar qualquer coisa na hora", "Para esconder a comida", "Para fazer sempre a mesma comida"],
        ans: 0,
        exp: "Planejamento garante economia na compra e refeições balanceadas para a saúde de vocês."
      }
    ]
  },
  financeiro: {
    room: "Financeiro",
    npcs: ["Profª Clecia", "Profª Vanessa", "Profª Flaviane", "Profª Cândida"],
    icon: "💰",
    intro: "Bem-vindos ao coração financeiro da escola! Somos as Professoras Clecia, Vanessa, Flaviane e Cândida. Cuidamos para que o dinheiro doado se transforme em arte e estrutura. Calcule conosco:",
    questions: [
      {
        q: "Recebemos uma doação de R$ 1.000,00. Precisamos comprar 10 figurinos que custam R$ 80,00 cada. Quanto sobrará no caixa da escola?",
        opts: ["R$ 100,00", "R$ 200,00", "R$ 300,00", "Não sobra nada"],
        ans: 1,
        exp: "10 x 80 = 800. 1000 - 800 = R$ 200,00 de saldo positivo para a instituição!"
      },
      {
        q: "O pagamento da conta de luz vence dia 10. Hoje é dia 5 e o banco demora 2 dias úteis para compensar. Qual o raciocínio financeiro correto?",
        opts: ["Pagar no dia 15", "Pagar hoje para garantir que compense antes do vencimento", "Ignorar o vencimento", "Pagar no dia 10 e arriscar juros"],
        ans: 1,
        exp: "Pagamentos antecipados evitam multas por atraso e protegem os recursos da ONG."
      },
      {
        q: "Precisamos cotar preços de tecidos. O Fornecedor A vende por 50,00 e frete 20,00. O Fornecedor B vende por 60,00 com frete grátis. Qual é o mais barato no total?",
        opts: ["Fornecedor A", "Fornecedor B", "São iguais", "Depende do tecido"],
        ans: 1,
        exp: "Fornecedor A (50+20 = 70). Fornecedor B (60+0 = 60). Logo, o B é mais econômico para a escola."
      },
      {
        q: "A manutenção da escola custa dinheiro. Se um aluno deixa a torneira aberta, o que acontece com os recursos?",
        opts: ["Nada", "A água é de graça", "Aumenta a conta, tirando dinheiro que poderia ir para o lanche ou figurinos", "O financeiro não paga água"],
        ans: 2,
        exp: "Todos os custos são conectados. Desperdiçar recursos físicos é jogar fora recursos financeiros que beneficiariam vocês mesmos."
      },
      {
        q: "Para aprovar uma despesa, precisamos de 3 assinaturas da diretoria. Se já temos a da Profª Andrea e da Profª Claudia, o que falta?",
        opts: ["Aprovação do porteiro", "A assinatura da Dirª Dora", "Comprar e assinar depois", "Nenhuma"],
        ans: 1,
        exp: "O processo exige a aprovação do trio de diretoria para total transparência institucional."
      }
    ]
  },
  reforco: {
    room: "Reforço Escolar",
    npcs: ["Prof. Rogério", "Profª Clara", "Profª Raquel"],
    icon: "📐",
    intro: "Olá! Somos a equipe do Reforço Escolar: Prof. Rogério, Profª Clara e Profª Raquel! Sem estudo não há arte completa. Nosso reforço garante que vocês brilhem na escola regular também. Vamos aos desafios!",
    questions: [
      {
        q: "Na sala de reforço com o Prof. Rogério, a Profª Clara e a Profª Raquel, quatro alunos fizeram atividades diferentes: leitura, escrita, cálculo e lógica. Sabe-se que Ana Luiza não fez cálculo, Hellen fez lógica e Anny Naomy fez leitura. Qual atividade sobrou para Giovana?",
        opts: ["Escrita", "Leitura", "Cálculo", "Lógica"],
        ans: 2,
        exp: "Como Hellen fez lógica, Anny Naomy fez leitura e Ana Luiza não fez cálculo, a única atividade restante para Giovana é cálculo."
      },
      {
        q: "Durante a oficina de raciocínio, a Profª Clara propôs o seguinte enigma no quadro: A1, B2, C3, D4. Se a mesma lógica continuar, qual código representa a letra F?",
        opts: ["F5", "F6", "E6", "G6"],
        ans: 1,
        exp: "Cada letra corresponde à sua posição no alfabeto: A=1, B=2, C=3... Portanto, F corresponde ao número 6."
      },
      {
        q: "No projeto de leitura da Profª Raquel, se Ketlein lê 5 páginas de um livro por dia, quantas páginas ela terá lido em uma semana completa (7 dias)?",
        opts: ["25", "30", "35", "40"],
        ans: 2,
        exp: "5 páginas x 7 dias = 35 páginas lidas e muito vocabulário novo adquirido!"
      },
      {
        q: "O Prof. Rogério apresentou 4 sequências lógicas. Qual alternativa não segue o mesmo padrão das demais?",
        opts: ["ABAB", "CDCD", "EFEF", "GHHI"],
        ans: 3,
        exp: "As três primeiras repetem um bloco de duas letras. 'GHHI' quebra esse padrão."
      },
      {
        q: "Os professores Rogério, Clara e Raquel escreveram no mural: 'Leia todas as alternativas antes de responder.' Qual é a atitude mais lógica?",
        opts: ["Marcar a primeira resposta", "Responder sem ler", "Ler todas as alternativas antes de escolher", "Perguntar ao colega"],
        ans: 2,
        exp: "Seguir a instrução evita erros por falta de atenção e aumenta as chances de escolher a resposta correta."
      }
    ]
  },
  artes: {
    room: "Ateliê de Artes e Desenhos",
    npcs: ["Profª Gislene"],
    icon: "🎨",
    intro: "Bem-vindos ao ateliê de artes! Sou a Professora Gislene. Aqui transformamos papel, tintas e criatividade em lindos desenhos, pinturas e cenários para os nossos espetáculos. Preparados?",
    questions: [
      {
        q: "Um artista desenhou um quadrado, depois um pentágono, em seguida um hexágono. Mantendo o mesmo padrão, qual será a próxima figura?",
        opts: ["Triângulo", "Hexágono", "Heptágono", "Octógono"],
        ans: 2,
        exp: "O número de lados aumenta de um em um: 4, 5, 6... Portanto, a próxima figura tem 7 lados: um heptágono."
      },
      {
        q: "O cenário do espetáculo representa uma floresta viva. Misturando as tintas azul e amarela em nossa paleta, qual cor secundária obteremos para pintar as folhagens?",
        opts: ["Roxo", "Laranja", "Verde", "Marrom"],
        ans: 2,
        exp: "A mistura das cores primárias azul e amarelo gera a cor secundária verde, perfeita para os elementos da natureza!"
      },
      {
        q: "Um educando desenhou metade de uma borboleta no papel dobrado ao meio. Para completar o desenho corretamente, o outro lado deve ser:",
        opts: ["Maior que o primeiro lado", "Uma imagem espelhada do primeiro lado", "Um desenho diferente", "Com cores aleatórias"],
        ans: 1,
        exp: "A simetria acontece quando um lado é o reflexo do outro, como em uma imagem no espelho."
      },
      {
        q: "Estamos desenhando uma máscara teatral simétrica. O que significa garantir a simetria no desenho?",
        opts: ["Fazer um lado completamente diferente do outro", "Garantir que os dois lados divididos ao meio sejam correspondentes e equilibrados", "Pintar tudo com uma única cor", "Desenhar sem usar linhas"],
        ans: 1,
        exp: "A simetria em artes visuais cria um equilíbrio perfeito, onde o lado esquerdo espelha o lado direito harmoniosamente."
      },
      {
        q: "Para pintar um cenário que transmita energia, calor e alegria, a professora Gislene sugere usar cores quentes. Quais são as principais cores desse grupo?",
        opts: ["Azul, verde e roxo", "Preto, branco e cinza", "Vermelho, laranja e amarelo", "Rosa, lilás e prata"],
        ans: 2,
        exp: "Vermelho, laranja e amarelo são cores quentes, associadas ao fogo e ao sol, excelentes para transmitir vibração e energia em uma obra de arte."
      }
    ]
  },
  danca: {
    room: "Sala de Dança",
    npcs: ["Prof. Anderson", "Prof. Jessy", "Prof. Vitor", "Prof. Daniel"],
    icon: "🩰",
    intro: "Fala, artistas! Somos os Professores Anderson, Jessy, Vitor e Daniel. Na sala de dança usamos não só o corpo, mas muita matemática, contagem e ritmo espacial. Vamos aquecer a mente!",
    questions: [
      {
        q: "Em uma coreografia, Yasmin levanta o braço direito e Heloisa deve fazer o movimento como se fosse seu reflexo no espelho. Qual braço Heloisa deve levantar?",
        opts: ["Direito", "Esquerdo", "Os dois braços", "Nenhum braço"],
        ans: 1,
        exp: "Quando uma pessoa imita outra como um espelho, os lados ficam invertidos. O braço direito de um corresponde ao esquerdo do outro."
      },
      {
        q: "Para uma apresentação, Tio Jessy precisa escolher 3 bailarinas entre Vitória, Rayla, Cecilia e Emilly. Vitória só pode participar se Rayla também participar. Se Cecilia já foi escolhida, qual grupo pode subir ao palco?",
        opts: ["Vitória, Rayla e Emilly", "Vitória, Rayla e Cecilia", "Rayla, Cecilia e Emilly", "Vitória, Cecilia e Emilly"],
        ans: 1,
        exp: "Vitória só pode participar junto com Rayla. Como Cecilia já está no grupo, a única opção possível com Vitória é Vitória, Rayla e Cecilia."
      },
      {
        q: "Durante uma atividade na sala de dança da EDISCA, quatro bailarinas ocupam posições diferentes no espaço. Viviam está no centro da sala. Isabelly está à frente de Viviam. Flora está atrás de Viviam. Laissy está ao lado direito de Viviam. Quem está mais distante da frente da sala?",
        opts: ["Viviam", "Isabelly", "Flora", "Laissy"],
        ans: 2,
        exp: "Isabelly está à frente de Viviam e Flora está atrás dela. Portanto, Flora é quem está mais distante da frente da sala."
      },
      {
        q: "Na coreografia da EDISCA, cada sequência de movimentos segue um padrão: P = passo, G = giro e S = salto. Tio Anderson escreveu: P - G - S - G - P - G - S - G - P - G - __. Qual movimento completa a sequência?",
        opts: ["Passo", "Giro", "Salto", "Parada"],
        ans: 2,
        exp: "O bloco que se repete é P - G - S - G. Depois de P - G, o próximo movimento é S."
      },
      {
        q: "Se um *plié* exige que o joelho siga a linha da ponta do pé, o que acontece se o bailarino fechar o joelho para dentro?",
        opts: ["Fica mais bonito", "Ele ganha velocidade", "Risco de lesão no joelho e desalinhamento", "Nada acontece"],
        ans: 2,
        exp: "A anatomia humana exige alinhamento ósseo. Dançar com técnica é cuidar da própria saúde física."
      }
    ]
  },
  teatro: {
    room: "Teatro",
    npcs: ["Profª Mayra", "Profª Hariane", "Profª Adrielly", "Profª Gabrielle", "Profª Beatriz"],
    icon: "🎭",
    intro: "Bem-vindos ao Teatro! Somos as Professoras Mayra, Hariane, Adrielly, Gabrielle e Beatriz. Na EDISCA, o ápice do nosso trabalho são os grandes espetáculos de dança. Preparados para a lógica dos bastidores?",
    questions: [
      {
        q: "Na apresentação de ballet, Tia Adrielly combinou três regras: as bailarinas entram pelo lado esquerdo, a música começa antes da entrada e a iluminação muda durante a coreografia. Qual situação quebra uma dessas regras?",
        opts: ["A música começa antes da entrada", "A luz muda no meio da dança", "As bailarinas entram pelo lado direito", "A coreografia termina com a música"],
        ans: 2,
        exp: "A única regra quebrada é a entrada pelo lado direito, pois foi combinado que a entrada seria pelo lado esquerdo."
      },
      {
        q: "No teatro, as laterais do palco de onde os bailarinos entram escondidos do público chamam-se 'Coxias'. Se um bailarino entra pela coxia da Esquerda e tem que sair pelo lado oposto, por onde ele sai?",
        opts: ["Pelo teto", "Pela coxia Direita", "Pelo fundo do palco", "Pela plateia"],
        ans: 1,
        exp: "O lado oposto da Esquerda do palco é sempre a coxia da Direita."
      },
      {
        q: "Na coxia do teatro, a equipe recebeu três avisos: 'A bailarina azul entra antes da vermelha'. 'A bailarina verde entra depois da azul'. 'A bailarina vermelha entra depois da verde'. Qual é a ordem correta de entrada?",
        opts: ["Azul → Verde → Vermelha", "Vermelha → Azul → Verde", "Verde → Azul → Vermelha", "Azul → Vermelha → Verde"],
        ans: 0,
        exp: "A azul deve vir antes da verde, e a verde antes da vermelha. Portanto, a ordem correta é Azul → Verde → Vermelha."
      },
      {
        q: "Na marcação de palco, a numeração vai do centro (0) para as laterais (1, 2, 3...). Se a coreógrafa pede para todos se concentrarem no 'Ponto Zero', para onde o elenco vai?",
        opts: ["Para o canto direito", "Para o fundo do palco", "Para o centro exato do palco", "Para a coxia"],
        ans: 2,
        exp: "O 'Ponto 0' (ou centro) é a referência de alinhamento simétrico para a dança."
      },
      {
        q: "Durante o espetáculo 'Periferia' da EDISCA, a música parou acidentalmente. Como o elenco bem ensaiado deve reagir logicamente?",
        opts: ["Parar e olhar para a coxia", "Sair do palco chorando", "Continuar dançando no silêncio mantendo a contagem mental em grupo", "Sentar no chão"],
        ans: 2,
        exp: "O show não pode parar. O profissionalismo exige manter a contagem interna até o som voltar."
      }
    ]
  },
  biblioteca: {
    room: "Biblioteca",
    npcs: ["Profª Neile", "Profª Thafilla"],
    icon: "📚",
    intro: "Silêncio e respeito ao conhecimento! Somos as Professoras Neile e Thafilla. Aqui guardamos o precioso acervo literário e de pesquisa da instituição. Prontos para os desafios?",
    questions: [
      {
        q: "A biblioteca divide os livros por seção. Se temos: Artes, História e Ciências. Em qual prateleira guardamos um livro sobre a 'História do Ballet Moderno'?",
        opts: ["Apenas em História", "Na lixeira", "Na seção de Artes, subcategoria Dança", "Em Ciências"],
        ans: 2,
        exp: "Sendo um tema técnico de dança, ele pertence fundamentalmente ao acervo de Artes/Dança."
      },
      {
        q: "Um livro foi retirado por um aluno que tem prazo de 7 dias para devolver. Ele pegou o livro numa terça-feira. Qual o dia de devolução?",
        opts: ["Domingo", "Próxima terça-feira", "Sexta-feira", "Próxima quarta-feira"],
        ans: 1,
        exp: "Contando 7 dias exatos, o ciclo se fecha no mesmo dia da semana seguinte."
      },
      {
        q: "A ordem correta nas prateleiras segue as letras do alfabeto. Qual sequência está correta?",
        opts: ["Almeida, Costa, Silva, Barros", "Almeida, Barros, Costa, Silva", "Silva, Costa, Barros, Almeida", "Barros, Almeida, Silva, Costa"],
        ans: 1,
        exp: "A-B-C-S é a sequência alfabética correta para facilitar a localização das obras."
      },
      {
        q: "Por que não podemos comer lanches ou beber água perto dos livros do acervo da EDISCA?",
        opts: ["Para a biblioteca não ficar suja", "Livros não sentem fome", "Farelos atraem insetos que comem papel e líquidos podem manchar e destruir as páginas", "Para o bibliotecário não ver"],
        ans: 2,
        exp: "Preservação patrimonial. Livros são frágeis e os resíduos orgânicos os destroem rapidamente."
      },
      {
        q: "Você precisa pesquisar sobre a biografia de Pina Bausch para um trabalho do reforço. Qual a atitude mais eficiente?",
        opts: ["Ler todos os livros da biblioteca até achar", "Procurar a bibliotecária e pedir orientação para o catálogo de dança contemporânea", "Desistir da pesquisa", "Pegar um livro de matemática"],
        ans: 1,
        exp: "A bibliotecária tem o mapa lógico de todo o conhecimento armazenado no local. Sempre peça ajuda!"
      }
    ]
  },
  jardim: {
    room: "Manutenção e Zelo",
    npcs: ["Profª Fátima", "Prof. João", "Prof. Igor", "Prof. Clemilson"],
    icon: "🌱",
    intro: "Bom dia! Nós somos a Fátima, o João, o Igor e o Clemilson. Mantemos a EDISCA limpa, segura e impecável para todos vocês. Cuidar do espaço é responsabilidade coletiva. Vamos organizar?",
    questions: [
      {
        q: "Para lavar o pátio externo, a equipe utiliza baldes no lugar da mangueira aberta. Qual é a lógica sustentável dessa atitude?",
        opts: ["Para demorar mais o serviço", "Evitar o desperdício de água, preservando um recurso natural e economizando dinheiro da ONG", "Porque a mangueira quebrou", "Apenas por costume"],
        ans: 1,
        exp: "A mangueira aberta gasta centenas de litros. O uso consciente de água é um pilar da responsabilidade social."
      },
      {
        q: "A coleta seletiva na escola tem as cores: Azul (Papel), Vermelho (Plástico) e Orgânico (Marrom). Onde você joga o copinho de água vazio e a casca de banana, respectivamente?",
        opts: ["Vermelho e Azul", "Azul e Marrom", "Vermelho e Marrom", "Tudo no Azul"],
        ans: 2,
        exp: "Plástico (copinho) vai no vermelho. Restos de comida (casca) vão no marrom (orgânico)."
      },
      {
        q: "Varremos a escola de cima para baixo (do último andar para o térreo). Por que usar essa lógica na faxina?",
        opts: ["Porque é mais fácil descer escadas", "Para a sujeira dos andares de cima não cair nas áreas inferiores já limpas", "Para não cansar as pernas", "Por estética"],
        ans: 1,
        exp: "A gravidade faz com que a poeira sempre desça. Começar de cima garante que o trabalho não tenha que ser refeito."
      },
      {
        q: "O que acontece logicamente se os educandos deixam papeis picados no chão da sala de dança antes de saírem?",
        opts: ["O papel some magicamente", "A equipe de limpeza é sobrecarregada, atrasando a liberação da sala para a próxima turma", "Nada, é a função deles", "O chão fica mais bonito"],
        ans: 1,
        exp: "Manter a limpeza é dever de todos. Se cada turma sujar sem recolher, o cronograma da escola inteira atrasa."
      },
      {
        q: "Um produto de limpeza precisa ser diluído: 1 tampa de produto para 10 litros de água. Se vamos preparar 20 litros, quantas tampas usamos?",
        opts: ["1 tampa", "2 tampas", "3 tampas", "5 tampas"],
        ans: 1,
        exp: "Mantendo a proporção, se dobramos a quantidade de água, dobramos o produto: 2 tampas."
      }
    ]
  },
  saude: {
    room: "Social e Saúde",
    npcs: ["Profª Lorena", "Profª Livia", "Prof. Rubens", "Prof. Gabriel"],
    icon: "❤️",
    intro: "Saúde física, social e mental em primeiro lugar! Somos as Professoras Lorena e Livia e os Professores Rubens e Gabriel. Cuidamos do acompanhamento social, das lesões e do bem-estar psicológico de nossos talentos. Resolvam esses casos clínicos!",
    questions: [
      {
        q: "Um bailarino torceu o tornozelo na aula. Para estancar o inchaço nos primeiros 15 minutos, a fisioterapia aplica:",
        opts: ["Bolsa de água quente", "Gelo (crioterapia)", "Massagear com força", "Mandar ele voltar a dançar"],
        ans: 1,
        exp: "O gelo contrai os vasos sanguíneos, diminuindo imediatamente a inflamação e a dor no momento do trauma."
      },
      {
        q: "No setor Social e Saúde, a equipe acompanha quatro educandas. Sabe-se que: Kamilla está com dor no pé; Nikaelly precisa descansar; Isadora está aguardando uma avaliação; e Valentina já foi liberada. Quem deve ser atendida primeiro pela equipe?",
        opts: ["Valentina", "Isadora", "Kamilla", "Nikaelly"],
        ans: 2,
        exp: "Entre as situações apresentadas, Kamilla possui uma queixa física que precisa ser avaliada antes de uma liberação ou orientação."
      },
      {
        q: "O ensaio do espetáculo é intenso e dura 4 horas. A sala é quente. O que deve ser feito logisticamente para evitar desidratação e cãibras?",
        opts: ["Beber apenas no final das 4h", "Paradas curtas e programadas para ingestão de água", "Beber 3 litros de uma vez", "Comer salgado"],
        ans: 1,
        exp: "A hidratação constante mantém os músculos oxigenados e previne lesões durante o esforço extremo."
      },
      {
        q: "Qual postura corporal é ensinada na fisioterapia para proteger a coluna de uma costureira ou funcionário que trabalha muito tempo sentado?",
        opts: ["Sentar na ponta da cadeira com os ombros curvados", "Apoiar a lombar no encosto e manter os pés no chão", "Cruzar as pernas o dia todo", "Sentar no chão"],
        ans: 1,
        exp: "A ergonomia (pés apoiados e coluna reta) distribui o peso do corpo e evita compressões na coluna vertebral."
      },
      {
        q: "Se a psicologia foca na mente e a fisioterapia no corpo, o que significa a expressão 'cuidado integral' praticada na EDISCA?",
        opts: ["Cuidar de um de cada vez em anos diferentes", "Entender que o sofrimento mental pode gerar dor física, e tratar o educando como um todo", "Apenas focar na dança", "Apenas medicar"],
        ans: 1,
        exp: "Corpo e mente estão interligados. A ansiedade pode tencionar o corpo e causar lesões físicas, por isso o cuidado é integrado."
      }
    ]
  },
  ti: {
    room: "Sala de TI",
    npcs: ["Prof. Vinicius"],
    icon: "💻",
    intro: "Olá! Sou o Professor Vinicius, responsável pelo setor de TI da EDISCA. Eu cuido da rede de internet, segurança cibernética e de todos os computadores que ajudam a nossa instituição a voar alto. Vamos arrumar a rede?",
    questions: [
      {
        q: "Um computador da secretaria perdeu a conexão com a internet, enquanto o restante da escola navega normalmente. Qual o primeiro passo de suporte lógico?",
        opts: ["Reinstalar o sistema operacional", "Verificar se o cabo de rede está firmemente conectado atrás do computador", "Ligar para a provedora reclamando de queda total", "Comprar uma máquina nova"],
        ans: 1,
        exp: "A verificação das conexões físicas de cabo e Wi-Fi locais deve anteceder qualquer formatação ou análise complexa."
      },
      {
        q: "Para garantir a integridade dos dados dos alunos contra ataques e vírus invasores na rede da EDISCA, qual ferramenta deve ser mantida ativa?",
        opts: ["Calculadora", "Navegador em modo privado", "Antivírus e Firewall atualizados", "Software de edição de imagem"],
        ans: 2,
        exp: "O Antivírus combinado ao Firewall ativo previne, detecta e bloqueia ameaças digitais que tentam infectar os computadores."
      },
      {
        q: "O setor financeiro precisa garantir que as planilhas e relatórios vitais da EDISCA não sejam perdidos em caso de falha do computador. O que recomenda?",
        opts: ["Salvar tudo na lixeira para ocultar", "Configurar backups automáticos diários em nuvem protegida", "Anotar tudo em guardanapos", "Deixar o computador ligado para sempre"],
        ans: 1,
        exp: "Backups frequentes e automáticos na nuvem garantem que os dados históricos da ONG estejam seguros de acidentes técnicos."
      },
      {
        q: "A secretaria recebe um e-mail com o título 'Urgente: Altere sua senha clicando neste link' enviado por um endereço desconhecido. O que fazer?",
        opts: ["Clicar correndo e digitar a senha de administrador", "Não clicar, alertar o Prof. Vinicius de TI e marcar como spam/phishing", "Encaminhar para o grupo de pais", "Excluir o computador"],
        ans: 1,
        exp: "Ataques de Phishing tentam enganar usuários com urgências falsas. Desconfie, não clique e acione o suporte de TI."
      },
      {
        q: "Se temos um plano de banda de internet de 600 Megas e precisamos distribuí-la igualmente entre 6 salas com computadores de aula. Quanto cada sala recebe?",
        opts: ["50 Megas", "100 Megas", "150 Megas", "600 Megas"],
        ans: 1,
        exp: "Dividindo 600 Megas de banda por 6 setores, obtemos 100 Megas por setor para garantir conectividade estável para todos."
      }
    ]
  },
  brecho: {
    room: "Brechó Segundo Ato",
    npcs: ["Profª Marina", "Prof. Pedro"],
    icon: "🛍️",
    intro: "Seja muito bem-vindo ao Brechó Segundo Ato! Somos Marina e Pedro. Aqui damos uma nova vida a roupas e calçados doados. Os lucros de nossas vendas sustentam diretamente nossos espetáculos. Vamos ao caixa?",
    questions: [
      {
        q: "Ao receber uma sacola cheia de doações no Brechó Segundo Ato, qual é o fluxo lógico inicial de processamento?",
        opts: ["Vender na calçada imediatamente", "Fazer a triagem (verificar estado, higienizar, definir preço justo e etiquetar)", "Guardar em caixas sem abrir", "Devolver ao doador"],
        ans: 1,
        exp: "A triagem profissional garante que apenas roupas excelentes e limpas fiquem nas araras, valorizando o brechó."
      },
      {
        q: "Um cliente compra uma jaqueta de R$ 35,00 e um cinto de R$ 15,00. Ele paga com uma nota de R$ 100,00. Quanto você deve devolver de troco?",
        opts: ["R$ 30,00", "R$ 40,00", "R$ 50,00", "R$ 60,00"],
        ans: 2,
        exp: "O total da compra é R$ 50,00 (35 + 15). Portanto, o troco exato a ser devolvido é de R$ 50,00."
      },
      {
        q: "No controle do Brechó Segundo Ato, Marina registrou: 'Todas as peças da arara azul são vestidos'. Ao verificar a arara, encontrou uma camisa azul. O que podemos concluir?",
        opts: ["O registro está incorreto", "A camisa não existe", "Todos os vestidos sumiram", "A arara azul está vazia"],
        ans: 0,
        exp: "Se uma camisa foi encontrada na arara azul, então a informação de que todas as peças eram vestidos não pode estar correta."
      },
      {
        q: "A filosofia do nosso Brechó Segundo Ato é fortemente focada em moda sustentável. Ela se apoia em quais conceitos fundamentais?",
        opts: ["Acumular, ostentar e descartar", "Reduzir o consumo desenfreado, Reutilizar peças e Reciclar materiais", "Copiar, costurar e raspar", "Esquecer, perder e comprar"],
        ans: 1,
        exp: "Reduzir, Reutilizar e Reciclar formam a base da economia circular e sustentável praticada em nosso brechó."
      },
      {
        q: "Todo o dinheiro arrecadado com as vendas diárias das peças do Brechó Segundo Ato é revertido para:",
        opts: ["Comprar itens de luxo para a secretaria", "Financiar passagens, adereços, figurinos e lanches para as apresentações de vocês", "A conta pessoal da gerência", "Dividir igualmente entre marcas famosas"],
        ans: 1,
        exp: "O brechó é uma iniciativa social. Todo o lucro alimenta diretamente o sonho e o desenvolvimento dos nossos educandos."
      }
    ]
  },
  comunicacao: {
    room: "Comunicação e Marketing",
    npcs: ["Profª Isabelle"],
    icon: "📢",
    intro: "Olá! Sou a Professora Isabelle. Eu cuido da imagem, das redes sociais, do marketing e da assessoria de imprensa da EDISCA. Meu papel é fazer com que a nossa arte toque o coração de cada vez mais pessoas. Vamos comunicar?",
    questions: [
      {
        q: "Temos um post marcado para lançar a venda de ingressos do novo espetáculo. Que elementos visuais e textuais são obrigatórios?",
        opts: ["Apenas uma foto desfocada dos bastidores", "Texto claro informando Local, Data, Horário, Valores e Link de compra", "O signo de todos os bailarinos", "Uma mensagem misteriosa sem explicação"],
        ans: 1,
        exp: "Toda postagem informativa precisa de clareza, facilitando o acesso direto e tirando todas as dúvidas do público rapidamente."
      },
      {
        q: "Um internauta faz um comentário agressivo nas redes sociais oficiais da EDISCA. Qual a diretriz de resposta institucional?",
        opts: ["Bater boca e responder no mesmo tom", "Excluir sem ler e fingir que não viu", "Responder com cordialidade, mantendo o tom pacífico e focado na verdade educativa da escola", "Expor os dados pessoais dele"],
        ans: 2,
        exp: "Manter o profissionalismo e a educação, mesmo diante de críticas agressivas, protege a reputação integradora da EDISCA."
      },
      {
        q: "Queremos filmar os ensaios de dança para divulgar nossa rotina no Instagram. Juridicamente, o que a Comunicação deve assegurar?",
        opts: ["Que todos usem câmeras importadas", "Ter as assinaturas válidas de Autorização de Uso de Imagem e Voz dos responsáveis", "Que as salas estejam pintadas de dourado", "Não há qualquer restrição para postar menores"],
        ans: 1,
        exp: "O uso de imagem de crianças e adolescentes deve ser sempre documentado e autorizado previamente pelos responsáveis legais."
      },
      {
        q: "Um vídeo nosso sobre superação alcançou 5.000 visualizações e 50 compartilhamentos. Uma foto teve 4.000 curtidas. O que indica maior engajamento ativo?",
        opts: ["A foto", "O vídeo, pois o compartilhamento multiplica a mensagem organicamente", "Empate técnico passivo", "Nenhum valorizou a marca"],
        ans: 1,
        exp: "O ato de compartilhar expande a rede e espalha a mensagem institucional de forma ativa, multiplicando o impacto social."
      },
      {
        q: "Qual o foco das nossas campanhas de Marketing de Causa elaboradas na EDISCA?",
        opts: ["Vender serviços comerciais", "Sensibilizar e atrair doadores mostrando as vidas transformadas através da nossa arte-educação", "Desmerecer projetos concorrentes", "Aumentar os lucros de grandes marcas privadas"],
        ans: 1,
        exp: "O marketing social atua para ligar investidores que acreditam no potencial humano aos nossos projetos de inclusão social."
      }
    ]
  },
  refeitorio: {
    room: "Refeitório",
    npcs: ["Profª Jaqueline"],
    icon: "🍽️",
    intro: "Olá, pessoal! Sou a Professora Jaqueline. Eu sou responsável pela burocracia do refeitório, controle de estoque de alimentos e compras da EDISCA. Garanto que a nossa dispensa esteja sempre farta e bem gerida. Vamos calcular?",
    questions: [
      {
        q: "Nosso estoque de feijão tem previsão de durar 10 dias. O processo de compra e entrega do fornecedor leva 14 dias. O que fazer de forma planejada?",
        opts: ["Aguardar acabar e deixar os alunos sem feijão por 4 dias", "Iniciar o processo de compra imediatamente ou antecipar o pedido no fornecedor", "Mudar o cardápio para doce", "Pedir doação de emergência no dia 10"],
        ans: 1,
        exp: "A boa gestão prevê o ponto de pedido mínimo baseado no tempo de entrega (Lead Time), impedindo desabastecimento."
      },
      {
        q: "Temos caixas de leite que vencem em julho e outras que vencem em setembro. Como a Jaqueline deve organizar a entrada e saída da dispensa?",
        opts: ["Colocar as de setembro na frente das de julho", "O sistema PVPS: Primeiro que Vence, Primeiro que Sai (julho na frente)", "Deixar os cozinheiros escolherem por cor", "Empilhar na ordem de recebimento sem olhar a validade"],
        ans: 1,
        exp: "O PVPS garante o uso racional dos insumos, minimizando perdas financeiras e de suprimentos por prazo de validade expirado."
      },
      {
        q: "Comprei 10 caixas de óleo por um custo total de R$ 120,00. Qual o valor individual de custo que será lançado na contabilidade por caixa?",
        opts: ["R$ 10,00", "R$ 12,00", "R$ 15,00", "R$ 20,00"],
        ans: 1,
        exp: "Custo total dividido pela quantidade de caixas: R$ 120,00 / 10 = R$ 12,00 por caixa lançada no controle."
      },
      {
        q: "A Jaqueline precisa manter todas as notas fiscais e relatórios de compra organizados. Qual o propósito disso?",
        opts: ["Usar de rascunho nas oficinas", "Prestar contas de forma transparente aos patrocinadores e auditores fiscais da ONG", "Nenhum, ela guarda por apego", "Criar volume na gaveta"],
        ans: 1,
        exp: "A EDISCA depende de repasses sociais e auditorias rígidas. A organização fiscal é sinônimo de transparência institucional."
      },
      {
        q: "Para o preparo diário do almoço, sabemos que cada aluno consome 200g de alimento. Temos 150 alunos confirmados para o almoço. Quantos quilos devemos preparar para evitar desperdícios?",
        opts: ["15 kg", "30 kg", "45 kg", "150 kg"],
        ans: 1,
        exp: "150 alunos x 200g = 30.000g de comida total, o que equivale a 30 kg exatos de alimentação de qualidade."
      }
    ]
  }
};
