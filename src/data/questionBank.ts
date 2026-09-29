import { Question } from '../types';

export const questionBank: Record<string, Question[]> = {
  portaria: [
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
    },
    {
      q: "Os professores Junior e Cris precisam distribuir 12 crachás de visitantes para 4 grupos iguais de convidados. Quantos crachás cada grupo receberá?",
      opts: ["2 crachás", "3 crachás", "4 crachás", "6 crachás"],
      ans: 1,
      exp: "Dividindo 12 crachás por 4 grupos (12 ÷ 4), temos 3 crachás para cada grupo."
    },
    {
      q: "Na fila do portão, Bárbara está atrás de Diego, mas à frente de Caio. Se Eduardo é o primeiro da fila, qual é a posição exata de Bárbara?",
      opts: ["Primeira", "Segunda", "Terceira", "Quarta"],
      ans: 2,
      exp: "Eduardo é o 1º. Diego está à frente de Bárbara, logo é o 2º. Bárbara é a 3ª e Caio é o 4º."
    },
    {
      q: "Ao final do expediente, o Prof. Junior precisa guardar 5 chaves em um claviculário colorido. A chave da Sala de Dança é vermelha, a do Teatro é azul, a da TI é verde, a da Secretaria é amarela e a da Cozinha é roxa. Se ele guardou primeiro a chave da Dança e por último a da TI, qual chave ficou no meio da sequência?",
      opts: ["A chave verde", "Qualquer uma das outras três chaves", "A chave vermelha", "Nenhuma chave"],
      ans: 1,
      exp: "Sabemos apenas a 1ª (Dança/Vermelha) e a 5ª (TI/Verde). A 3ª chave (do meio) obrigatoriamente será uma das outras três opções (Teatro, Secretaria ou Cozinha)."
    },
    {
      q: "Uma comitiva de visitantes tem chegada prevista para as 14h00. O Prof. Cris leva 20 minutos para inspecionar o portão e 10 minutos para preparar os crachás. A que horas ele deve começar essa preparação para terminar exatamente na hora?",
      opts: ["13h30", "13h40", "13h45", "13h50"],
      ans: 0,
      exp: "O tempo total necessário é de 20 + 10 = 30 minutos. 14h00 menos 30 minutos equivale a 13h30."
    },
    {
      q: "Um casaco preto foi encontrado perto da catraca. Três alunos (Pedro, Lucas e Mateus) passaram por lá. Pedro usava casaco azul, Lucas não usava casaco e Mateus estava de casaco preto. De quem é o casaco?",
      opts: ["Pedro", "Lucas", "Mateus", "De nenhum deles"],
      ans: 2,
      exp: "Como Mateus estava usando um casaco preto antes e os outros usavam azul ou nenhum, o casaco pertence a Mateus."
    }
  ],

  secretaria: [
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
    },
    {
      q: "A Profª Gesliane está gerando as matrículas do ano 2026. A sequência dos códigos de matrícula é: 2026-01, 2026-02, 2026-03... Qual será o código do 15º aluno matriculado?",
      opts: ["2026-10", "2026-12", "2026-15", "2026-20"],
      ans: 2,
      exp: "Seguindo o padrão lógico numérico, o 15º aluno receberá o código 2026-15."
    },
    {
      q: "Quatro fichas de inscritos precisam ser arquivadas por sobrenome: Silva, Almeida, Costa e Barbosa. Qual é a primeira ficha a ser colocada na gaveta?",
      opts: ["Silva", "Almeida", "Costa", "Barbosa"],
      ans: 1,
      exp: "Na ordem alfabética de A a Z: Almeida vem antes de Barbosa, Costa e Silva."
    },
    {
      q: "Um atestado médico entregue na secretaria tem validade de 30 dias a partir do dia 10 de Março. Em qual dia de Abril ele deixará de ter validade?",
      opts: ["5 de Abril", "9 de Abril", "10 de Abril", "15 de Abril"],
      ans: 2,
      exp: "Março tem 31 dias. Somando 30 dias a partir do dia 10 de Março, o prazo encerra no dia 9/10 de Abril."
    },
    {
      q: "Na secretaria há 5 alunos aguardando atendimento. Se a Profª Gesliane leva exatamente 4 minutos para atender cada um, quanto tempo o 5º aluno esperará no total?",
      opts: ["12 minutos", "16 minutos", "20 minutos", "24 minutos"],
      ans: 1,
      exp: "O 5º aluno espera os 4 primeiros serem atendidos: 4 alunos × 4 minutos = 16 minutos de espera."
    },
    {
      q: "A secretaria enviou 10 formulários para os responsáveis. Todos retornaram, mas 2 estavam sem a assinatura do responsável. Quantos formulários estão 100% válidos?",
      opts: ["6 formulários", "7 formulários", "8 formulários", "10 formulários"],
      ans: 2,
      exp: "10 formulários totais minus 2 sem assinatura = 8 formulários válidos e completos."
    }
  ],

  diretoria: [
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
    },
    {
      q: "A Diretoria está analisando 4 propostas de expansão cultural. Para aprovar uma parceria, ela precisa atender a 3 critérios: Impacto Social, Viabilidade Financeira e Alinhamento Ético. Uma proposta atende ao impacto e à ética, mas estoura o orçamento. O que a diretoria faz?",
      opts: ["Aprova imediatamente", "Solicita readequação do orçamento antes de aprovar", "Cancela todas as outras propostas", "Ignora a viabilidade financeira"],
      ans: 1,
      exp: "Responsabilidade estratégica exige readequar os custos para atender aos 3 critérios indispensáveis."
    },
    {
      q: "As diretoras Andrea, Claudia, Dora e Amanda vão realizar uma reunião com parceiros internacionais. Se a reunião dura 1 hora e meia, quantos minutos ela durará?",
      opts: ["60 minutos", "75 minutos", "90 minutos", "120 minutos"],
      ans: 2,
      exp: "1 hora tem 60 minutos. Meia hora tem 30 minutos. 60 + 30 = 90 minutos."
    },
    {
      q: "Ao elaborar o relatório anual da EDISCA, a diretoria deve organizar as informações em qual ordem lógica para os investidores?",
      opts: ["Conclusão → Resultados → Dados Financeiros → Introdução", "Introdução → Ações Realizadas → Resultados e Impacto → Demonstrativo Financeiro", "Fotos → Agradecimentos → Introdução", "Apenas o saldo bancário final"],
      ans: 1,
      exp: "Um relatório institucional de impacto apresenta o contexto, as atividades, os resultados alcançados e a prestação de contas."
    },
    {
      q: "Um edital de financiamento público encerra as inscrições em 5 dias. A equipe precisa de 2 dias para escrever o projeto e 1 dia para juntar as certidões. Quantos dias de folga a diretoria terá de margem de segurança?",
      opts: ["1 dia", "2 dias", "3 dias", "Nenhum dia"],
      ans: 1,
      exp: "Tempo necessário: 2 + 1 = 3 dias. Como o prazo é de 5 dias, sobram 2 dias de margem de segurança."
    },
    {
      q: "A EDISCA recebeu convite para apresentar seus bailarinos em dois festivais no mesmo final de semana. O Festival A fica a 10 km e atende 500 jovens da comunidade. O Festival B fica a 500 km e não possui ajuda de custo. Qual decisão é estrategicamente mais sustentável?",
      opts: ["Ir ao Festival B pagando tudo", "Priorizar o Festival A, que possui grande impacto local e custo viável", "Não ir a nenhum dos dois", "Dividir os alunos sem ensaio"],
      ans: 1,
      exp: "A diretoria avalia o alcance do impacto social e a responsabilidade com o uso dos recursos da instituição."
    }
  ],

  cozinha: [
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
    },
    {
      q: "Uma receita de sopa nutritiva para 50 educandos utiliza 2 kg de batata. Se hoje a Profª Aurea precisa preparar a mesma receita para 150 educandos, quantos quilos de batata ela usará?",
      opts: ["4 kg", "6 kg", "8 kg", "10 kg"],
      ans: 1,
      exp: "150 educandos é o triplo de 50 (50 × 3 = 150). Triplicando os ingredientes: 2 kg × 3 = 6 kg de batata."
    },
    {
      q: "Para garantir que os alimentos cozidos fiquem fora da zona de perigo de contaminação bacteriana, a Profª Daiane monitora a temperatura do balcão térmico. Qual deve ser a temperatura mínima dos pratos quentes?",
      opts: ["20°C", "40°C", "60°C", "100°C"],
      ans: 2,
      exp: "Alimentos quentes devem ser mantidos acima de 60°C para impedir a proliferação de bactérias nocivas à saúde."
    },
    {
      q: "Na dispensa da cozinha há 120 pãezinhos. Eles devem ser divididos em cestas contendo exatamente 15 pãezinhos cada. Quantas cestas serão preparadas?",
      opts: ["6 cestas", "8 cestas", "10 cestas", "12 cestas"],
      ans: 1,
      exp: "Dividindo 120 por 15 (120 ÷ 15), obtemos 8 cestas perfeitamente organizadas."
    },
    {
      q: "A cozinha recebeu verduras frescas. Qual é a sequência correta de higienização das hortaliças antes do preparo?",
      opts: ["Cortar → Guardar → Lavar", "Lavar em água corrente → Sanitizar na solução clorada → Enxaguar", "Cozinhar sem lavar", "Passar detergente de prato"],
      ans: 1,
      exp: "A lavagem em água corrente remove sujeiras grossas, a solução clorada elimina micro-organismos e o enxágue final garante a segurança."
    },
    {
      q: "A equipe da cozinha precisa preparar 200 copos de suco de polpa. Se cada jarra faz 20 copos, quantas jarras de suco precisam ser preparadas?",
      opts: ["5 jarras", "8 jarras", "10 jarras", "20 jarras"],
      ans: 2,
      exp: "200 copos ÷ 20 copos por jarra = 10 jarras de suco preparadas para os educandos."
    }
  ],

  financeiro: [
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
    },
    {
      q: "O setor financeiro reservou R$ 300,00 para os lanches especiais dos ensaios de sábado durante 5 semanas. Quanto pode ser gasto em média por sábado?",
      opts: ["R$ 50,00", "R$ 60,00", "R$ 70,00", "R$ 100,00"],
      ans: 1,
      exp: "Dividindo o orçamento total de R$ 300,00 por 5 sábados (300 ÷ 5), temos R$ 60,00 por ensaio."
    },
    {
      q: "A Profª Clecia iniciou o dia com R$ 150,00 no caixa pequeno. Pagou R$ 45,00 por fitas de dança e R$ 35,00 por fitas adesivas. Quanto sobrou no caixa?",
      opts: ["R$ 60,00", "R$ 70,00", "R$ 80,00", "R$ 90,00"],
      ans: 1,
      exp: "Gastos totais: R$ 45,00 + R$ 35,00 = R$ 80,00. Saldo restante: R$ 150,00 - R$ 80,00 = R$ 70,00."
    },
    {
      q: "Uma loja de equipamentos oferece 10% de desconto no pagamento à vista de uma caixa de som que custa R$ 500,00. Quanto a EDISCA pagará pagando à vista?",
      opts: ["R$ 400,00", "R$ 420,00", "R$ 450,00", "R$ 480,00"],
      ans: 2,
      exp: "10% de R$ 500,00 é R$ 50,00. Preço com desconto: R$ 500,00 - R$ 50,00 = R$ 450,00."
    },
    {
      q: "A Profª Vanessa recebe 4 notas fiscais de compras de materiais do projeto. Por que ela precisa organizar e guardar cada recibo em pastas numeradas?",
      opts: ["Apenas para ocuparem espaço na gaveta", "Para garantir a prestação de contas transparente em auditorias dos patrocinadores", "Porque as notas são bonitas", "Para dar aos alunos desenharem"],
      ans: 1,
      exp: "A transparência na prestação de contas é fundamental para comprovar a aplicação correta dos recursos doados."
    },
    {
      q: "A compra de 20 sapatilhas de ponta custou R$ 1.600,00. Qual foi o preço unitário de cada sapatilha?",
      opts: ["R$ 60,00", "R$ 70,00", "R$ 80,00", "R$ 90,00"],
      ans: 2,
      exp: "Custo total dividido pela quantidade: R$ 1.600,00 ÷ 20 = R$ 80,00 por sapatilha."
    }
  ],

  reforco: [
    {
      q: "Na sala de reforço com o Prof. Rogério, a Profª Clara e a Profª Raquel, quatro alunos fizeram atividades diferentes: leitura, escrita, cálculo e lógica. Sabe-se que Ana Luiza não fez cálculo, Hellen fez lógica e Anny Naomy fez leitura. Qual atividade sobrou para Giovana?",
      opts: ["Escrita", "Leitura", "Cálculo", "Lógica"],
      ans: 2,
      exp: "Como Hellen fez lógica, Anny Naomy fez leitura e Ana Luiza não fez cálculo, a única atividade restante para Giovana é cálculo."
    },
    {
      q: "Durante a oficina de raciocínio, a Profª Clara escreveu um código no quadro: A1, B2, C3, D4. Se a mesma lógica continuar, qual código representa a letra F?",
      opts: ["F5", "F6", "E6", "G6"],
      ans: 1,
      exp: "Cada letra corresponde à sua posição no alfabeto: A=1, B=2, C=3... Portanto, F corresponde ao número 6."
    },
    {
      q: "No projeto de leitura da Profª Raquel, se Ketlein lê 5 páginas de um livro por dia, quantas páginas ela terá lido em uma semana (7 dias)?",
      opts: ["25", "30", "35", "40"],
      ans: 2,
      exp: "5 páginas x 7 dias = 35 páginas lidas e muito vocabulário novo adquirido!"
    },
    {
      q: "O Prof. Rogério apresentou o desafio: qual alternativa não segue o mesmo padrão das demais?",
      opts: ["ABAB", "CDCD", "EFEF", "GHHI"],
      ans: 3,
      exp: "As três primeiras repetem um bloco de duas letras. 'GHHI' quebra esse padrão."
    },
    {
      q: "Os professores Rogério, Clara e Raquel escreveram no quadro: 'Leia todas as alternativas antes de responder.' Qual é a atitude mais lógica?",
      opts: ["Marcar a primeira resposta", "Responder sem ler", "Ler todas as alternativas antes de escolher", "Perguntar ao colega"],
      ans: 2,
      exp: "Seguir a instrução evita erros por falta de atenção e aumenta as chances de escolher a resposta correta."
    },
    {
      q: "Considere a sequência numérica no quadro da Profª Clara: 3, 6, 12, 24, __. Qual número vem a seguir?",
      opts: ["30", "36", "48", "60"],
      ans: 2,
      exp: "Cada número é o dobro do anterior (3×2=6, 6×2=12, 12×2=24). Portanto, 24 × 2 = 48."
    },
    {
      q: "Se 'Todo bailarino se dedica aos estudos' e 'Lucas é um bailarino da EDISCA', qual é a conclusão lógica verdadeira?",
      opts: ["Lucas não estuda", "Lucas se dedica aos estudos", "Lucas não gosta de dança", "Nenhuma conclusão é possível"],
      ans: 1,
      exp: "Por dedução lógica direta: se todo bailarino se dedica e Lucas é um bailarino, Lucas se dedica aos estudos."
    },
    {
      q: "Um aluno tem 90 minutos para estudar três matérias com as orientações do reforço escolar (Português, Matemática e História) igualmente. Quantos minutos ele dedicará a cada matéria?",
      opts: ["20 minutos", "25 minutos", "30 minutos", "45 minutos"],
      ans: 2,
      exp: "Dividindo 90 minutos por 3 matérias (90 ÷ 3), ele terá 30 minutos focados para cada disciplina."
    },
    {
      q: "Qual é a relação de analogia correta proposta pela Profª Raquel? 'A dança está para o Palco assim como o Estudo está para a...'",
      opts: ["Cozinha", "Escola / Sabedoria", "Sapatilha", "Música"],
      ans: 1,
      exp: "Assim como a dança se realiza e ganha vida no palco, o estudo se desenvolve no ambiente escolar e no conhecimento."
    },
    {
      q: "O Prof. Rogério pediu para calcular o perímetro de uma mesa retangular de estudos que mede 2 metros de comprimento por 1 metro de largura. Qual o perímetro?",
      opts: ["3 metros", "4 metros", "6 metros", "8 metros"],
      ans: 2,
      exp: "Perímetro é a soma de todos os lados: 2m + 2m + 1m + 1m = 6 metros."
    }
  ],

  artes: [
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
    },
    {
      q: "Se quisermos transmitir tranquilidade, paz e serenidade no plano de fundo de um cenário, qual grupo de cores a Profª Gislene recomenda?",
      opts: ["Cores quentes (Vermelho e Laranja)", "Cores frias (Azul, Verde e Roxo)", "Cores neon fluorescentes", "Apenas tinta preta"],
      ans: 1,
      exp: "Cores frias como azul, verde e roxo transmitem calma, serenidade e sensação de profundidade."
    },
    {
      q: "Ao desenhar a anatomia da figura humana para um figurino de dança, qual é a referência clássica de proporção para a altura total do corpo?",
      opts: ["A altura de 2 cabeças", "A altura de 7 a 8 cabeças", "A altura de 20 cabeças", "Não há proporção"],
      ans: 1,
      exp: "No desenho de figura humana e moda, a proporção harmônica padrão utiliza entre 7 e 8 vezes a altura da cabeça do modelo."
    },
    {
      q: "No círculo cromático, cores complementares são aquelas situadas em lados opostos. Qual é a cor complementar do Vermelho que gera alto contraste?",
      opts: ["Amarelo", "Laranja", "Verde", "Roxo"],
      ans: 2,
      exp: "No círculo cromático, o Verde fica exatamente oposto ao Vermelho, criando um contraste vibrante e harmonioso."
    },
    {
      q: "No desenho em perspectiva de uma sala de ensaios, todas as linhas paralelas que se distanciam do observador parecem se encontrar em um ponto chamado:",
      opts: ["Ponto de Fuga", "Ponto Cego", "Centro da folha", "Ponto Zero"],
      ans: 0,
      exp: "O Ponto de Fuga na linha do horizonte é o elemento geométrico essencial para dar ilusão de profundidade 3D no papel."
    },
    {
      q: "A Profª Gislene está organizando materiais recicláveis para a construção dos adereços de um espetáculo. Ela possui papelão, garrafas PET e arames. Qual o primeiro cuidado de segurança no manuseio?",
      opts: ["Pintar tudo antes de cortar", "Proteger as pontas cortantes e usar tesouras sem ponta", "Colocar tudo no lixo", "Queimar os materiais"],
      ans: 1,
      exp: "A segurança no ateliê vem em primeiro lugar: rebarbas e pontas perfurantes devem ser tratadas antes do processo criativo."
    }
  ],

  danca: [
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
    },
    {
      q: "Tio Vitor está marcando a música da dança em compasso quaternário (1, 2, 3, 4). Se uma frase coreográfica dura 3 oitavas (3 blocos de 8 tempos), quantos tempos musicais os bailarinos contaram?",
      opts: ["12 tempos", "16 tempos", "24 tempos", "32 tempos"],
      ans: 2,
      exp: "Cada oitava contém 8 tempos musicais. 3 oitavas × 8 tempos = 24 tempos no total."
    },
    {
      q: "Na formação do grupo, Tio Daniel organiza 16 bailarinos em uma formação 'V'. Se há 1 bailarino na ponta do 'V' (no centro), quantos bailarinos ficam distribuídos em cada uma das duas diagonais?",
      opts: ["6 em cada lado", "7 em cada lado", "8 em cada lado", "15 de um lado"],
      ans: 1,
      exp: "16 bailarinos menos 1 no centro = 15 bailarinos. Dividindo em 2 lados com o centro compartilhado (ou 1 no vértice + 7 em cada braço = 15 + 1 = 16)."
    },
    {
      q: "Na técnica do giro (*pirouette*), o bailarino mantém o olhar fixo em um ponto na parede pelo maior tempo possível. Qual o objetivo biomecânico dessa 'marcação de cabeça'?",
      opts: ["Apenas estética", "Evitar tontura e manter o equilíbrio do eixo corporal", "Girar mais devagar", "Olhar para o público"],
      ans: 1,
      exp: "A marcação de cabeça estabiliza o sistema vestibular no ouvido interno, prevenindo tonturas e mantendo o alinhamento central do giro."
    },
    {
      q: "Em um movimento em *cânone*, o Grupo A faz o salto no tempo 1, o Grupo B faz no tempo 3 e o Grupo C no tempo 5. Em qual tempo o Grupo D saltará se a sequência continuar no mesmo padrão de intervalo?",
      opts: ["Tempo 6", "Tempo 7", "Tempo 8", "Tempo 9"],
      ans: 1,
      exp: "O intervalo de entrada é de 2 em 2 tempos (1, 3, 5). O Grupo D saltará no tempo 7."
    },
    {
      q: "Ao saltar (*grand jeté*), para alcançar maior altura sem impactar agressivamente as articulações na queda, o bailarino deve usar:",
      opts: ["Pés rígidos", "O impulso do *plié* na preparação e amortecer rolando o pé do metatarso ao calcanhar", "Cair com os joelhos esticados", "Saltar sem dobrar os joelhos"],
      ans: 1,
      exp: "A preparação em *plié* acumula energia elástica e o amortecimento gradual absorve a força do impacto com o solo."
    }
  ],

  teatro: [
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
    },
    {
      q: "Antes da cortina abrir, a iluminadora avisa: 'Atencão ao Blackout!'. O que significa este termo técnico no teatro?",
      opts: ["Acender todas as luzes do palco", "Apagar completamente todas as luzes do palco", "Ligar a luz da plateia", "Colocar luz vermelha"],
      ans: 1,
      exp: "'Blackout' é a escuridão total instantânea no palco, usada para trocas de cenários ou final de cenas."
    },
    {
      q: "Na orientação espacial do palco, o termo 'Proscênio' refere-se a qual parte do espaço teatral?",
      opts: ["O fundo do palco", "A parte do palco mais próxima da plateia, à frente do urdimento", "A coxia esquerda", "A cabine de som"],
      ans: 1,
      exp: "Proscênio é a borda frontal do palco, ficando mais perto do público."
    },
    {
      q: "As professoras Mayra e Hariane estão organizando os adereços da cena 1, 2 e 3 na coxia. Onde deve ficar o adereço da cena 1 para facilitar a entrada do elenco?",
      opts: ["No fundo da caixa de transporte", "Na frente, ao alcance imediato da mão do bailarino", "Guardado no camarim", "No teto"],
      ans: 1,
      exp: "A organização de bastidores posiciona os objetos na ordem exata de uso para evitar atrasos nas trocas rápidas de cena."
    },
    {
      q: "Durante o espetáculo, os espectadores devem manter os celulares desligados. Qual o principal motivo técnico para essa orientação?",
      opts: ["Para a bateria do celular não acabar", "Evitar luzes e barulhos que distraem os artistas e prejudicam a concentração da iluminação de cena", "Porque o teatro não tem tomada", "Para o sinal de internet não cair"],
      ans: 1,
      exp: "Telas acesas e toques de celular quebram a atmosfera do espetáculo e desconcentram os bailarinos em cena."
    },
    {
      q: "Ao final da apresentação, a cortina fecha e o público aplaude. Qual é a sequência de agradecimento (curtida/révérence) do elenco?",
      opts: ["Sair correndo antes do sinal", "Entrar em grupo, alinhar no proscênio, saudar o público com o torso e agradecer à iluminação/orquestra", "Ficar de costas para a plateia", "Não retornar ao palco"],
      ans: 1,
      exp: "O agradecimento no palco é o momento solene de respeito mudo e gratidão entre os artistas e o público que os prestigiou."
    }
  ],

  biblioteca: [
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
    },
    {
      q: "Para encontrar um capítulo específico sobre 'Anatomia do Salto' sem ler o livro inteiro de 300 páginas, qual seção do livro você deve consultar primeiro?",
      opts: ["Capa posterior", "Sumário / Índice", "Dedicatória", "Ficha catalográfica"],
      ans: 1,
      exp: "O Sumário lista os títulos dos capítulos e suas respectivas páginas, economizando tempo de pesquisa."
    },
    {
      q: "Na classificação decimal de bibliotecas, a classe 700 é dedicada às Belas Artes e Recreação. Os livros de Dança ficam na subclassificação 792.8. Onde você procurará uma obra de dança?",
      opts: ["Na prateleira de Matemática (classe 500)", "Na prateleira de Artes (classe 700)", "Na seção de Culinária", "No balcão de recepção"],
      ans: 1,
      exp: "Pelo sistema de catalogação, obras de dança e teatro estão inseridas na grande classe 700 (Artes)."
    },
    {
      q: "A Profª Neile precisa devolver 12 livros organizadamente às estantes. Se ela leva 2 minutos para catalogar e guardar cada livro, em quantos minutos terminará a tarefa?",
      opts: ["12 minutos", "20 minutos", "24 minutos", "30 minutos"],
      ans: 2,
      exp: "12 livros × 2 minutos por livro = 24 minutos para concluir o trabalho."
    },
    {
      q: "Três educandas estão lendo o mesmo livro de 120 páginas para o clube de leitura da EDISCA. Mariana leu a metade, Sophia leu 1/3 e Beatriz leu 1/4. Quem leu mais páginas?",
      opts: ["Mariana (60 pág)", "Sophia (40 pág)", "Beatriz (30 pág)", "Todas leram igual"],
      ans: 0,
      exp: "Mariana leu a metade (120 ÷ 2 = 60 pág). Sophia leu 1/3 (40 pág) e Beatriz leu 1/4 (30 pág). Mariana leu mais."
    },
    {
      q: "Para preservar as obras históricas de dança da biblioteca contra o mofo e o ressecamento, qual o cuidado de conservação recomendado?",
      opts: ["Manter o ambiente arejado, limpo e longe de umidade direta e luz solar forte", "Mandar molhar os livros semanalmente", "Guardar em sacos plásticos fechados e úmidos", "Deixar no chão do pátio"],
      ans: 0,
      exp: "Ventilação adequada, limpeza periódica e controle da luz/umidade preservam as fibras de papel por décadas."
    }
  ],

  jardim: [
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
    },
    {
      q: "O Sr. João e o Sr. Clemilson vão organizar as ferramentas no depósito do zelo. Vassouras e rodos devem ser pendurados em suportes de parede em vez de encostados de cabeça para baixo no chão. Por quê?",
      opts: ["Para não deformar as cerdas e aumentar a vida útil do equipamento", "Por ser mais bonito", "Para esconder dos alunos", "Porque o chão é quente"],
      ans: 0,
      exp: "Pendurar vassouras evita o amassamento das cerdas, garantindo eficiência na varrição por muito mais tempo."
    },
    {
      q: "A equipe acabou de passar pano úmido com desinfetante na rampa de acesso. Qual placa de segurança deve ser posicionada no local imediatamente?",
      opts: ["Cuidado: Piso Molhado / Escorregadio", "Atenção: Tinta Fresca", "Silêncio: Prova em Andamento", "Proibido Cães"],
      ans: 0,
      exp: "A sinalização de piso molhado previne quedas e acidentes com alunos e funcionários enquanto o piso seca."
    },
    {
      q: "Dona Fátima e Igor estão podando as plantas do jardim interno da EDISCA. As folhas secas recolhidas devem ter qual destinação ecológica ideal?",
      opts: ["Serem queimadas no pátio", "Ir para a composteira para virar adubo orgânico rico em nutrientes", "Jogar no esgoto", "Guardar na sala de aula"],
      ans: 1,
      exp: "A compostagem transforma resíduos vegetais secos em adubo natural para nutrir as próprias plantas da instituição."
    },
    {
      q: "Ao sair da sala de aula no final da tarde, qual é a atitude sustentável que cada educando deve adotar com os equipamentos?",
      opts: ["Deixar luzes e ar-condicionado ligados", "Desligar o ar-condicionado, apagar as luzes e fechar as janelas", "Abrir todas as torneiras", "Ligar os ventiladores no máximo"],
      ans: 1,
      exp: "A economia de energia elétrica é uma responsabilidade coletiva que preserva recursos financeiros e ambientais."
    },
    {
      q: "Para higienizar 5 salas de aula, a equipe utiliza 1 frasco de desinfetante ecológico. Quantos fracos serão necessários para higienizar todas as 15 salas do complexo?",
      opts: ["2 frascos", "3 frascos", "4 frascos", "5 frascos"],
      ans: 1,
      exp: "15 salas ÷ 5 salas por frasco = 3 frascos necessários para a limpeza completa."
    }
  ],

  saude: [
    {
      q: "Um bailarino torceu o tornozelo na aula. Para estancar o inchaço nos primeiros 15 minutos, a fisioterapia aplica:",
      opts: ["Bolsa de água quente", "Gelo (crioterapia)", "Massagear com força", "Mandar ele voltar a dançar"],
      ans: 1,
      exp: "O gelo contrai os vasos sanguíneos, diminuindo imediatamente a inflamação e a dor no momento do trauma."
    },
    {
      q: "Na sala da saúde, a equipe acompanha quatro educandas. Sabe-se que: Kamilla está com dor no pé; Nikaelly precisa descansar; Isadora está aguardando uma avaliação; e Valentina já foi liberada. Quem deve ser atendida primeiro pela equipe?",
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
    },
    {
      q: "Um educando sentiu uma cãibra forte na panturrilha durante a aula de dança. O Prof. Rubens orienta qual procedimento de emergência imediato?",
      opts: ["Bater no músculo com força", "Alongar suavemente o músculo afetado e hidratar com água", "Colocar água quente", "Ignorar a dor"],
      ans: 1,
      exp: "O alongamento suave em posição contrária à contração alivia o espasmo muscular, enquanto a água repõe os sais perdidos."
    },
    {
      q: "Antes de subir ao palco para uma apresentação exigente, qual o objetivo principal do aquecimento fisiológico orientado pela Profª Lorena?",
      opts: ["Cansar o corpo dos bailarinos", "Elevar a frequência cardíaca, lubrificar as articulações e preparar os músculos para o esforço", "Fazer os alunos dormirem", "Apenas cumprir horário"],
      ans: 1,
      exp: "O aquecimento aumenta a temperatura muscular e a elasticidade dos tecidos, prevenindo estiramentos e lesões graves."
    },
    {
      q: "Para evitar a fadiga muscular e manter o rendimento acadêmico e artístico, quantas horas de sono por noite são recomendadas pelos profissionais da saúde para jovens em desenvolvimento?",
      opts: ["3 a 4 horas", "5 a 6 horas", "8 a 9 horas", "12 a 14 horas"],
      ans: 2,
      exp: "O sono profundo de 8 a 9 horas é o momento fisiológico indispensável para regeneração celular, consolidação da memória e síntese muscular."
    },
    {
      q: "A Profª Livia está trabalhando técnicas de respiração diafragmática para ansiedade pré-palco. Qual o ritmo respiratório recomendado?",
      opts: ["Inspirar rápido e hiperventilar", "Inspirar profundamente pelo nariz expandindo o abdômen, reter 3 segundos e soltar devagar pela boca", "Prender a respiração por 2 minutos", "Respirar apenas pela boca"],
      ans: 1,
      exp: "A respiração diafragmática lenta estimula o sistema nervoso parassimpático, reduzindo os batimentos cardíacos e acalmando a mente."
    },
    {
      q: "Ao carregar uma mochila pesada com livros ou equipamentos de dança, qual postura evita dores na coluna lombar?",
      opts: ["Usar a mochila pendurada em apenas um ombro", "Usar as duas alças bem ajustadas nas costas, distribuindo o peso igualmente nos dois ombros", "Segurar a mochila com os dentes", "Carregar na ponta dos dedos"],
      ans: 1,
      exp: "Ajustar as duas alças mantém o centro de gravidade alinhado, evitando desvios posturais e escoliose dolorosa."
    }
  ],

  ti: [
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
    },
    {
      q: "O Prof. Vinicius precisa criar uma senha segura para o roteador principal da EDISCA. Qual das opções abaixo representa uma senha forte?",
      opts: ["123456", "edisca2026", "Ed!sc4#2026$Secure", "senha"],
      ans: 2,
      exp: "Senhas fortes combinam letras maiúsculas e minúsculas, números e caracteres especiais, dificultando ataques automatizados."
    },
    {
      q: "Diante de uma tempestade com fortes raios na região, qual a orientação preventiva do setor de TI para proteger os computadores das salas de aula?",
      opts: ["Deixar todos na tomada renderizando vídeos", "Desconectar os computadores da tomada e do cabo de rede", "Aumentar o brilho da tela", "Ligar mais extensões na tomada"],
      ans: 1,
      exp: "Picos de tensão provocados por raios podem queimar placas-mãe. Desconectar os cabos protege o patrimônio contra surtos elétricos."
    },
    {
      q: "A impressora da recepção parou de imprimir os formulários. O painel indica 'Sem Papel', mas a gaveta está cheia de folhas. Qual o diagnóstico lógico do Prof. Vinicius?",
      opts: ["A impressora queimou para sempre", "Sensor de presença de papel obstruído ou papel atolado na bandeja", "A internet caiu", "Falta de tinta no cartucho"],
      ans: 1,
      exp: "Atolamento de papel ou sujeira no sensor ótico são os motivos mais comuns para falsos alertas de falta de papel."
    },
    {
      q: "Para proteger os olhos contra o cansaço visual após horas preparando aulas digitais, o Prof. Vinicius ensina a regra '20-20-20'. Ela orienta a:",
      opts: ["Ficar 20 horas sem piscar", "A cada 20 minutos de tela, olhar para algo a 20 pés (6 metros) de distância por 20 segundos", "Comprar 20 óculos escuros", "Desligar o monitor por 20 dias"],
      ans: 1,
      exp: "Pausar o foco em objetos distantes relaxa a musculatura ciliar dos olhos, reduzindo o ressecamento e a fadiga ocular."
    },
    {
      q: "Em um laboratório com 20 computadores, se 4 máquinas apresentam tela azul de erro de disco ao ligar, qual a porcentagem de computadores funcionando perfeitamente?",
      opts: ["70%", "75%", "80%", "85%"],
      ans: 2,
      exp: "20 máquinas - 4 com erro = 16 operacionais. 16 em 20 equivale a 80% dos computadores funcionando."
    }
  ],

  brecho: [
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
    },
    {
      q: "O Prof. Pedro precisa organizar uma arara com 24 cabides por tamanho de vestuário: PP, P, M, G. Se há exatamente a mesma quantidade de roupas para cada um dos 4 tamanhos, quantas peças há por tamanho?",
      opts: ["4 peças", "6 peças", "8 peças", "12 peças"],
      ans: 1,
      exp: "Dividindo 24 peças por 4 tamanhos (24 ÷ 4), temos 6 peças de cada tamanho perfeitamente alinhadas."
    },
    {
      q: "A Profª Marina precificou 3 saias seminovas por R$ 20,00 cada. Se uma cliente decide levar as 3 saias e recebe um desconto promocional de 10%, qual o valor final pago por ela?",
      opts: ["R$ 50,00", "R$ 54,00", "R$ 56,00", "R$ 60,00"],
      ans: 1,
      exp: "Valor sem desconto: 3 × R$ 20,00 = R$ 60,00. Desconto de 10% (R$ 6,00): R$ 60,00 - R$ 6,00 = R$ 54,00."
    },
    {
      q: "O conceito de 'Upcycling' praticado em oficinas de moda do Brechó Segundo Ato consiste em:",
      opts: ["Queimar roupas velhas", "Transformar peças descartadas ou tecidos retalhados em produtos novos com maior valor estético e utilitário", "Comprar roupas novas no shopping", "Vender tecidos rasgados"],
      ans: 1,
      exp: "Upcycling é a reutilização criativa que dá uma 'segunda vida' e novo valor a materiais que iriam para o lixo."
    },
    {
      q: "No balanço mensal do brechó, foram vendidas 50 peças na primeira semana, 40 na segunda semana, 60 na terceira semana e 50 na quarta semana. Qual a média semanal de vendas?",
      opts: ["45 peças", "50 peças", "55 peças", "60 peças"],
      ans: 1,
      exp: "Soma total: 50 + 40 + 60 + 50 = 200 peças. Média: 200 ÷ 4 semanas = 50 peças por semana."
    },
    {
      q: "Por que separar as roupas doadas por cor e tipo de tecido antes da lavagem e higienização é uma etapa indispensável no Brechó?",
      opts: ["Apenas por estética na lavanderia", "Para evitar que tecidos coloridos soltem tinta e manchem peças claras, preservando a qualidade", "Porque a máquina de lavar exige", "Não faz diferença"],
      ans: 1,
      exp: "A triagem por cor e tecido evita acidentes de tingimento e desgastes desnecessários nas peças doadas."
    }
  ],

  comunicacao: [
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
    },
    {
      q: "A Profª Isabelle precisa enviar um Press Release (comunicado de imprensa) aos jornais sobre a estreia da nova temporada de dança. Qual deve ser a estrutura da primeira frase (Lead)?",
      opts: ["Uma poesia sem dados", "Responder às perguntas essenciais: Quem, O quê, Quando, Onde e Por quê", "Apenas a assinatura do fotógrafo", "Contar a história desde a infância dos professores"],
      ans: 1,
      exp: "O Lead jornalístico condensa no primeiro parágrafo as respostas cruciais para captar a atenção imediata da imprensa."
    },
    {
      q: "Ao publicar artes gráficas no Instagram e no site oficial da EDISCA, a equipe de Comunicação deve manter a identidade visual usando:",
      opts: ["Cores aleatórias que mudam a cada post sem padrão", "A paleta de cores oficial, logotipo padronizado e tipografia institucional da EDISCA", "Apenas imagens em preto e branco sem logo", "Desenhos sem relação com a dança"],
      ans: 1,
      exp: "A consistência de paleta, logo e fontes fortalece o reconhecimento da marca institucional pelo público leitor."
    },
    {
      q: "Para garantir acessibilidade digital em postagens com imagens dos espetáculos, a equipe deve incluir nas redes sociais:",
      opts: ["Texto alternativo descritivo da imagem (#PraCegoVer / legenda alt)", "Músicas muito altas", "Letras piscantes", "Nenhum recurso extra"],
      ans: 0,
      exp: "O texto alternativo garante que leitores de tela descrevam o conteúdo visual para pessoas com deficiência visual."
    },
    {
      q: "Uma postagem de convocação de testes para novos bailarinos precisa ser publicada com antecedência. Se a seleção ocorrerá no dia 20 de Maio, qual a data ideal para o lançamento da campanha?",
      opts: ["No dia 20 de Maio, 10 minutos antes", "Com 2 a 3 semanas de antecedência, dando tempo para a mensagem circular e as inscrições serem feitas", "Três meses após o evento", "Não divulgar"],
      ans: 1,
      exp: "A divulgação com antecedência estratégica garante tempo suficiente para que os jovens e famílias tomem conhecimento e se organizem."
    },
    {
      q: "Na análise de métricas digitais da EDISCA, o que significa a taxa de 'Alcance' de uma publicação?",
      opts: ["A quantidade total de dinheiro gasta", "O número de contas/pessoas únicas que viram a publicação na tela", "O número de vezes que a imagem foi salva no computador", "A quantidade de comentários negativos"],
      ans: 1,
      exp: "'Alcance' mede a quantidade de pessoas individuais impactadas diretamente pelo conteúdo divulgado."
    }
  ],

  refeitorio: [
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
    },
    {
      q: "A Profª Jaqueline está arrumando a estante de suprimentos secos. Sacos de arroz e feijão não devem ser encostados diretamente no chão de cimento. Por qual exigência sanitária?",
      opts: ["Estética de organização", "Evitar a umidade do solo e a contaminação por pragas urbanas (devendo ficar sobre paletes elevados)", "Facilitar a contagem", "Por falta de espaço"],
      ans: 1,
      exp: "O armazenamento sobre paletes elevados a pelo menos 15 cm do piso impede a transferência de umidade e o acesso de pragas."
    },
    {
      q: "No refeitório, a equipe percebeu que sobravam restos no prato de alguns educandos. Para reduzir o desperdício sem deixar ninguém com fome, qual a estratégia de gestão do refeitório?",
      opts: ["Proibir o almoço", "Oferecer porções iniciais adequadas e permitir que o aluno repita se desejar", "Obrigá-los a comer tudo em 2 minutos", "Reduzir o tempero"],
      ans: 1,
      exp: "Servir porções moderadas com opção de repetição consciente incentiva a autonomia do educando e evita o descarte de comida."
    },
    {
      q: "Ao realizar a cotação de hortifrúti em três fornecedores locais (A, B e C), a Profª Jaqueline observou: Fornecedor A cobra R$ 5,00/kg; Fornecedor B cobra R$ 4,50/kg; Fornecedor C cobra R$ 6,00/kg mas entrega grátis. Para uma compra de 100 kg com frete de R$ 20,00 no Fornecedor B, qual a opção mais vantajosa?",
      opts: ["Fornecedor A", "Fornecedor B (450 + 20 = R$ 470,00)", "Fornecedor C (R$ 600,00)", "Tanto faz"],
      ans: 1,
      exp: "Fornecedor B: (100 kg × 4.50) + 20.00 = R$ 470,00. Fornecedor C: 100 kg × 6.00 = R$ 600,00. O Fornecedor B é o mais econômico."
    },
    {
      q: "A equipe precisa registrar a lista de restrições alimentares (alergias a lactose, glúten ou amendoim). Por que o controle rígido no balcão do refeitório é vital?",
      opts: ["Para economizar pratos", "Garantir a segurança física do educando prevenindo reações alérgicas severas", "Apenas por burocracia", "Para cozinhar apenas para alguns"],
      ans: 1,
      exp: "O mapeamento individual de alergias garante que cada educando receba uma refeição segura e adaptada às suas necessidades biológicas."
    },
    {
      q: "Se 80 kg de alimento suprem o refeitório durante 4 dias de aulas, quantos quilos de alimento serão necessários para suprir 12 dias de aulas mantendo a mesma média?",
      opts: ["160 kg", "200 kg", "240 kg", "300 kg"],
      ans: 2,
      exp: "80 kg ÷ 4 dias = 20 kg por dia. Para 12 dias: 12 dias × 20 kg/dia = 240 kg necessários."
    }
  ]
};

/**
 * Fisher-Yates shuffle algorithm to randomly pick `count` unique questions
 * from the sector's large question bank pool.
 */
export function getRandomQuestionsForRoom(roomKey: string, count = 5): Question[] {
  const pool = questionBank[roomKey];
  if (!pool || pool.length === 0) return [];

  // Clone array to prevent mutating the original question bank
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
}
