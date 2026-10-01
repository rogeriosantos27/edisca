import { Question } from '../types';
import { dynamicGenerators } from './dynamicGenerators';

export const questionBank: Record<string, Question[]> = {
  portaria: [
    {
      q: "Na entrada da EDISCA, quatro educandos chegaram à portaria. Sofia entrou antes de Miguel. Ana entrou depois de Miguel, mas antes de Lucas. Quem foi o terceiro a ser acolhido no portão de entrada?",
      opts: ["Sofia","Miguel","Ana","Lucas"],
      ans: 2,
      exp: "A ordem correta é: Sofia → Miguel → Ana → Lucas. Portanto, a terceira pessoa a ser acolhida no portão foi Ana."
    },
    {
      q: "A equipe da portaria precisa localizar um educando. Eles sabem apenas que ele não está na recepção, nem na biblioteca, e que ainda não foi para o refeitório. Em qual lugar ele provavelmente está?",
      opts: ["Sala de aula","Recepção","Biblioteca","Refeitório"],
      ans: 0,
      exp: "Como os outros locais já foram descartados, a única possibilidade restante é que ele esteja na sala de aula."
    },
    {
      q: "O ensaio termina às 17h30. Os pais começam a chegar 15 minutos antes. A que horas a portaria deve organizar a área de espera?",
      opts: ["17h00","17h15","17h30","17h45"],
      ans: 1,
      exp: "Se eles chegam 15 minutos antes das 17h30, a recepção deve estar pronta às 17h15."
    },
    {
      q: "Por que não podemos deixar as portas principais totalmente abertas sem monitoramento durante as aulas?",
      opts: ["Para o ar condicionado não vazar","Por medidas rigorosas de proteção aos educandos","Para não entrar poeira","Porque a porta quebra"],
      ans: 1,
      exp: "A prioridade número um da portaria é a segurança física de todos os alunos e funcionários."
    },
    {
      q: "Na entrada da EDISCA há quatro mochilas esquecidas. Uma é azul, uma verde, uma vermelha e uma amarela. Sabe-se que: a mochila azul não é de quem chegou primeiro; a vermelha pertence a alguém que chegou antes do dono da verde; a amarela foi a última a ser identificada. Qual mochila certamente não foi a primeira a chegar?",
      opts: ["Azul","Verde","Vermelha","Amarela"],
      ans: 0,
      exp: "O enunciado informa diretamente que a mochila azul não pertence a quem chegou primeiro."
    },
    {
      q: "Os professores Junior e Cris precisam distribuir 12 guias informativos da instituição para 4 grupos iguais de convidados. Quantos guias cada grupo receberá?",
      opts: ["2 guias","3 guias","4 guias","6 guias"],
      ans: 1,
      exp: "Dividindo 12 guias por 4 grupos (12 ÷ 4), temos 3 guias para cada grupo de convidados."
    },
    {
      q: "Na fila do portão, Bárbara está atrás de Diego, mas à frente de Caio. Se Eduardo é o primeiro da fila, qual é a posição exata de Bárbara?",
      opts: ["Primeira","Segunda","Terceira","Quarta"],
      ans: 2,
      exp: "Eduardo é o 1º. Diego está à frente de Bárbara, logo é o 2º. Bárbara é a 3ª e Caio é o 4º."
    },
    {
      q: "Ao final do expediente, o Prof. Junior precisa guardar 5 chaves em um claviculário colorido. A chave da Sala de Dança é vermelha, a do Teatro é azul, a da TI é verde, a da Secretaria é amarela e a da Cozinha é roxa. Se ele guardou primeiro a chave da Dança e por último a da TI, qual chave ficou no meio da sequência?",
      opts: ["A chave verde","Qualquer uma das outras três chaves","A chave vermelha","Nenhuma chave"],
      ans: 1,
      exp: "Sabemos apenas a 1ª (Dança/Vermelha) e a 5ª (TI/Verde). A 3ª chave (do meio) obrigatoriamente será uma das outras três opções (Teatro, Secretaria ou Cozinha)."
    },
    {
      q: "Uma comitiva de visitantes tem chegada prevista para as 14h00. O Prof. Cris leva 20 minutos para inspecionar o portão e 10 minutos para organizar o livro de visitas. A que horas ele deve começar essa preparação para terminar exatamente na hora?",
      opts: ["13h30","13h40","13h45","13h50"],
      ans: 0,
      exp: "O tempo total necessário é de 20 + 10 = 30 minutos. 14h00 menos 30 minutos equivale a 13h30."
    },
    {
      q: "Um casaco preto foi encontrado perto do portão de entrada. Três alunos (Pedro, Lucas e Mateus) passaram por lá. Pedro usava casaco azul, Lucas não usava casaco e Mateus estava de casaco preto. De quem é o casaco?",
      opts: ["Pedro","Lucas","Mateus","De nenhum deles"],
      ans: 2,
      exp: "Como Mateus estava usando um casaco preto antes e os outros usavam azul ou nenhum, o casaco pertence a Mateus."
    },
    {
      q: "Durante um dia de chuva forte, qual é o procedimento prioritário da portaria para garantir a segurança dos alunos na entrada?",
      opts: ["Fechar o portão e não deixar ninguém entrar","Colocar tapetes antiderrapantes, secar o piso e organizar o suporte para guarda-chuvas","Mandar os educandos correrem até a sala de dança","Desligar todas as luzes da entrada"],
      ans: 1,
      exp: "Pisos molhados podem causar quedas e lesões graves em bailarinos. Tapetes e secagem imediata garantem a integridade física de todos."
    },
    {
      q: "Um prestador de serviços chegou à EDISCA para manutenção elétrica. Qual é o primeiro passo obrigatório dos porteiros?",
      opts: ["Permitir o acesso livre sem identificação","Solicitar documento oficial de identificação, registrar no livro de visitas e acompanhar a entrada","Pedir para o visitante esperar na rua até o fim do dia","Mandar o visitante procurar a diretoria sozinho"],
      ans: 1,
      exp: "A segurança institucional exige que toda pessoa externa seja formalmente identificada e registrada no livro de visitas antes de acessar as dependências internas."
    },
    {
      q: "O ônibus que levará os bailarinos para uma apresentação externa sairá às 16h45. Os alunos devem embarcar 20 minutos antes. A que horas todos devem estar reunidos na portaria?",
      opts: ["16h15","16h25","16h30","16h35"],
      ans: 1,
      exp: "16h45 menos 20 minutos resulta em 16h25 para início do embarque ordenado."
    },
    {
      q: "Ao final do dia, a portaria faz a ronda de fechamento. Qual a prioridade dessa verificação?",
      opts: ["Verificar se todas as salas vazias estão trancadas, luzes apagadas e portões principais travados","Apenas conferir se a TV está ligada","Sair correndo sem inspecionar os corredores","Deixar as janelas abertas para ventilar à noite"],
      ans: 0,
      exp: "O fechamento seguro previne acidentes elétricos, invasões e preserva os equipamentos e patrimônio da escola."
    },
    {
      q: "Três visitantes aguardam autorização na recepção. O primeiro chegou há 15 minutos, o segundo há 10 minutos e o terceiro acabou de chegar. Seguindo a ética de atendimento, quem deve ser atendido primeiro?",
      opts: ["O terceiro, porque chegou por último","O primeiro, respeitando a ordem cronológica de chegada","Quem gritar mais alto","Nenhum deles"],
      ans: 1,
      exp: "O princípio de respeito e ordem na portaria determina o atendimento por ordem de chegada, salvo prioridades legais."
    },
    {
      q: "Uma garrafa térmica esquecida na portaria foi identificada como de Luísa. Como os porteiros confirmaram a posse?",
      opts: ["Pela etiqueta com nome legível e turma colocada pelo educando","Adivinhando sem conferir","Entregando para a primeira pessoa que pediu","Jogando fora imediatamente"],
      ans: 0,
      exp: "Identificar pertences pessoais com nome e turma evita perdas e facilita a devolução ágil pela equipe."
    },
    {
      q: "Se 4 voluntários chegam na portaria e cada um precisa de 3 minutos para preencher a ficha de entrada, quanto tempo levará o registro completo dos quatro?",
      opts: ["8 minutos","10 minutos","12 minutos","15 minutos"],
      ans: 2,
      exp: "4 voluntários × 3 minutos cada = 12 minutos para concluir todos os registros com cordialidade."
    },
    {
      q: "Por que os portões de saída da EDISCA nunca podem ser trancados com cadeados durante as aulas regulares?",
      opts: ["Porque as chaves se perdem com facilidade","Porque são rotas de fuga obrigatórias em caso de emergência ou incêndio","Para os alunos saírem quando quiserem","Porque o portão é muito pesado"],
      ans: 1,
      exp: "Normas de segurança contra incêndio e pânico exigem que saídas de emergência estejam desobstruídas e de fácil abertura."
    },
    {
      q: "Uma encomenda endereçada à biblioteca chegou na portaria. Para quem o porteiro deve entregar o pacote com aviso assinado?",
      opts: ["Para a Profª Mary, responsável pela biblioteca","Para qualquer aluno no corredor","Deixar no chão do pátio","Abrir o pacote antes de entregar"],
      ans: 0,
      exp: "Entregas devem ser repassadas diretamente ao responsável pelo setor de destino com protocolo."
    },
    {
      q: "Em caso de toque do alarme de evacuação, qual é a atitude primordial da equipe da portaria?",
      opts: ["Abrir totalmente as saídas de emergência e orientar os grupos até o ponto de encontro seguro","Trancar os portões e esconder as chaves","Ficar em silêncio sem orientar ninguém","Voltar para buscar objetos pessoais esquecidos"],
      ans: 0,
      exp: "A equipe da portaria comanda a desobstrução das saídas e direciona o fluxo calmo para o ponto de encontro externo."
    }
  ],

  secretaria: [
    {
      q: "Temos 100 pastas de alunos e precisamos organizá-las em ordem alfabética. A pasta da 'Ana' e do 'Bruno' já estão no lugar. Onde entra a pasta da 'Beatriz'?",
      opts: ["Antes da Ana","Depois do Bruno","Entre Ana e Bruno","No final"],
      ans: 2,
      exp: "Na ordem alfabética, 'Beatriz' (Be) vem depois de 'Ana' (An) e antes de 'Bruno' (Br)."
    },
    {
      q: "Para manter a bolsa, o aluno precisa de 75% de presença. Se o mês tem 20 aulas, qual é o número MÁXIMO de faltas que ele pode ter?",
      opts: ["3 faltas","5 faltas","7 faltas","10 faltas"],
      ans: 1,
      exp: "75% de 20 é 15 aulas. Portanto, ele pode faltar no máximo 5 vezes (20 - 15 = 5)."
    },
    {
      q: "Um edital exige RG, CPF e Comprovante de Residência de cada aluno. Se vamos matricular 30 novos educandos, quantos documentos, no total, a secretaria precisará arquivar?",
      opts: ["30","60","90","120"],
      ans: 2,
      exp: "São 3 documentos por aluno. 30 alunos x 3 = 90 documentos processados com muito cuidado!"
    },
    {
      q: "Se um pai liga perguntando sobre o calendário de férias, qual documento a secretaria consulta para dar a informação exata?",
      opts: ["Livro de presenças","Calendário letivo institucional","Lista de materiais","O cardápio da cozinha"],
      ans: 1,
      exp: "O calendário letivo é o documento oficial que rege todas as datas da instituição."
    },
    {
      q: "A atualização de dados cadastrais ocorre a cada semestre. Se estamos em fevereiro, a próxima atualização será em:",
      opts: ["Março","Agosto","Dezembro","Outubro"],
      ans: 1,
      exp: "Um semestre tem 6 meses. Fevereiro (mês 2) + 6 meses = Agosto (mês 8)."
    },
    {
      q: "A Profª Gesliane está gerando as matrículas do ano 2026. A sequência dos códigos de matrícula é: 2026-01, 2026-02, 2026-03... Qual será o código do 15º aluno matriculado?",
      opts: ["2026-10","2026-12","2026-15","2026-20"],
      ans: 2,
      exp: "Seguindo o padrão lógico numérico, o 15º aluno receberá o código 2026-15."
    },
    {
      q: "Quatro fichas de inscritos precisam ser arquivadas por sobrenome: Silva, Almeida, Costa e Barbosa. Qual é a primeira ficha a ser colocada na gaveta?",
      opts: ["Silva","Almeida","Costa","Barbosa"],
      ans: 1,
      exp: "Na ordem alfabética de A a Z: Almeida vem antes de Barbosa, Costa e Silva."
    },
    {
      q: "Um atestado médico entregue na secretaria tem validade de 30 dias a partir do dia 10 de Março. Em qual dia de Abril ele deixará de ter validade?",
      opts: ["5 de Abril","9 de Abril","10 de Abril","15 de Abril"],
      ans: 2,
      exp: "Março tem 31 dias. Somando 30 dias a partir do dia 10 de Março, o prazo encerra no dia 9/10 de Abril."
    },
    {
      q: "Na secretaria há 5 alunos aguardando atendimento. Se a Profª Gesliane leva exatamente 4 minutos para atender cada um, quanto tempo o 5º aluno esperará no total?",
      opts: ["12 minutos","16 minutos","20 minutos","24 minutos"],
      ans: 1,
      exp: "O 5º aluno espera os 4 primeiros serem atendidos: 4 alunos × 4 minutos = 16 minutos de espera."
    },
    {
      q: "A secretaria enviou 10 formulários para os responsáveis. Todos retornaram, mas 2 estavam sem a assinatura do responsável. Quantos formulários estão 100% válidos?",
      opts: ["6 formulários","7 formulários","8 formulários","10 formulários"],
      ans: 2,
      exp: "10 formulários totais minus 2 sem assinatura = 8 formulários válidos e completos."
    },
    {
      q: "A Profª Gesliane precisa emitir uma Declaração de Matrícula para um aluno apresentar na escola regular. Qual dado é essencial constar no documento?",
      opts: ["Apenas a cor favorita do aluno","Nome completo, número de matrícula, turno e confirmação de frequência ativa na instituição","O cardápio do almoço","A lista de amigos do aluno"],
      ans: 1,
      exp: "A declaração formal comprova o vínculo institucional oficial e deve conter dados de identificação e frequência."
    },
    {
      q: "As pastas dos alunos de dança são identificadas por cores: Verde para iniciantes, Azul para intermediários e Roxa para avançados. Onde deve ser guardada a ficha de um educando novato?",
      opts: ["Na pasta Roxa","Na pasta Verde","Na pasta Azul","Em nenhuma pasta"],
      ans: 1,
      exp: "De acordo com o código de organização por cores da secretaria, os iniciantes ficam nas pastas verdes."
    },
    {
      q: "Para organizar 48 fichas cadastrais em gavetas com capacidade para no máximo 12 fichas cada, de quantas gavetas a secretaria precisará?",
      opts: ["3 gavetas","4 gavetas","5 gavetas","6 gavetas"],
      ans: 1,
      exp: "48 fichas ÷ 12 fichas por gaveta = exatamente 4 gavetas organizadas."
    },
    {
      q: "Um educando precisou faltar por motivo de saúde durante 4 dias consecutivos. O que a família deve apresentar na secretaria para justificar as faltas?",
      opts: ["Apenas uma mensagem informal de voz","Atestado médico formal assinado pelo profissional de saúde","Nenhum documento","Uma foto do remédio"],
      ans: 1,
      exp: "O atestado médico legalmente justifica a ausência e permite o abono e a reposição das atividades pedagógicas."
    },
    {
      q: "A Lei Geral de Proteção de Dados (LGPD) orienta a secretaria a tratar os dados pessoais dos educandos com:",
      opts: ["Divulgação livre para qualquer pessoa na internet","Sigilo absoluto, privacidade e guarda segura dos arquivos","Descarte em lixeiras comuns sem triturar","Compartilhamento público em murais"],
      ans: 1,
      exp: "Dados de crianças e adolescentes são sensíveis e devem ser rigorosamente protegidos contra vazamentos."
    },
    {
      q: "O prazo para rematrícula encerra dia 20 de janeiro. Uma família solicita atendimento no dia 15 de janeiro. Quantos dias de antecedência essa família teve?",
      opts: ["3 dias","5 dias","7 dias","10 dias"],
      ans: 1,
      exp: "20 de janeiro menos 15 de janeiro = 5 dias antes do encerramento do prazo."
    },
    {
      q: "Se cada página de formulário demora 30 segundos para ser digitalizada no scanner, quanto tempo levará a digitalização de 10 páginas completas?",
      opts: ["3 minutos","5 minutos","8 minutos","10 minutos"],
      ans: 1,
      exp: "10 páginas × 30 segundos = 300 segundos. Dividindo por 60 segundos por minuto: 300 ÷ 60 = 5 minutos."
    },
    {
      q: "Ao receber uma ligação de um responsável solicitando informações confidenciais do boletim escolar, o que a secretária faz?",
      opts: ["Passa todos os dados sem conferir quem está ligando","Confirma a identidade do responsável cadastrado antes de fornecer qualquer informação confidencial","Desliga o telefone sem responder","Pede para outra criança atender"],
      ans: 1,
      exp: "A verificação prévia de identidade assegura que informações acadêmicas e pessoais sejam repassadas somente aos responsáveis legais."
    },
    {
      q: "Quatro caixas de arquivos mortos estão empilhadas: Caixa 2022 na base, 2023 em cima dela, 2024 acima e 2025 no topo. Qual caixa está na terceira posição contando de baixo para cima?",
      opts: ["2022","2023","2024","2025"],
      ans: 2,
      exp: "1ª (base) = 2022; 2ª = 2023; 3ª = 2024; 4ª (topo) = 2025."
    },
    {
      q: "A secretaria enviou 50 comunicados por e-mail e 40% foram abertos na primeira hora. Quantos e-mails foram visualizados de imediato?",
      opts: ["10 e-mails","15 e-mails","20 e-mails","25 e-mails"],
      ans: 2,
      exp: "40% de 50 = (40 × 50) ÷ 100 = 20 e-mails abertos rapidamente."
    }
  ],

  diretoria: [
    {
      q: "A EDISCA precisa planejar um novo espetáculo. Qual a sequência lógica de planejamento?",
      opts: ["Ensaiar > Apresentar > Captar Recursos","Captar Recursos > Criar > Ensaiar > Apresentar","Apresentar > Criar > Captar Recursos","Criar > Apresentar > Ensaiar"],
      ans: 1,
      exp: "Sem recursos e sem criação, não há ensaio. E o espetáculo é a etapa final de todo esse esforço."
    },
    {
      q: "Para garantir que a escola continue funcionando por anos, a diretoria prioriza:",
      opts: ["Gastar todo o recurso em um único evento","Sustentabilidade financeira e planejamento a longo prazo","Fazer apenas reuniões sem ação","Não ter parceiros"],
      ans: 1,
      exp: "A sustentabilidade garante que as futuras gerações de alunos também tenham as mesmas oportunidades."
    },
    {
      q: "Temos uma reunião com 3 possíveis patrocinadores. Cada um exige um relatório de impacto social diferente. Quantos relatórios precisamos preparar?",
      opts: ["1 geral","Nenhum","3 personalizados","10"],
      ans: 2,
      exp: "Se cada um exige um formato diferente, devemos honrar o compromisso preparando 3 relatórios específicos."
    },
    {
      q: "A missão da EDISCA envolve arte e educação. Se tivermos que cortar custos, qual área NÃO pode ser comprometida?",
      opts: ["O desenvolvimento e bem-estar dos educandos","A pintura externa do muro","Decorações de escritório","Troca de móveis da diretoria"],
      ans: 0,
      exp: "Vocês, educandos, são o coração do nosso projeto. O investimento no bem-estar de vocês é intocável."
    },
    {
      q: "Se um projeto social dura 2 anos e é avaliado trimestralmente. Quantas avaliações a diretoria fará até o fim do projeto?",
      opts: ["4","6","8","12"],
      ans: 2,
      exp: "Cada ano tem 4 trimestres. Em 2 anos, são 8 avaliações para garantir o sucesso do projeto."
    },
    {
      q: "A Diretoria está analisando 4 propostas de expansão cultural. Para aprovar uma parceria, ela precisa atender a 3 critérios: Impacto Social, Viabilidade Financeira e Alinhamento Ético. Uma proposta atende ao impacto e à ética, mas estoura o orçamento. O que a diretoria faz?",
      opts: ["Aprova imediatamente","Solicita readequação do orçamento antes de aprovar","Cancela todas as outras propostas","Ignora a viabilidade financeira"],
      ans: 1,
      exp: "Responsabilidade estratégica exige readequar os custos para atender aos 3 critérios indispensáveis."
    },
    {
      q: "As diretoras Andrea, Claudia, Dora e Amanda vão realizar uma reunião com parceiros internacionais. Se a reunião dura 1 hora e meia, quantos minutos ela durará?",
      opts: ["60 minutos","75 minutos","90 minutos","120 minutos"],
      ans: 2,
      exp: "1 hora tem 60 minutos. Meia hora tem 30 minutos. 60 + 30 = 90 minutos."
    },
    {
      q: "Ao elaborar o relatório anual da EDISCA, a diretoria deve organizar as informações em qual ordem lógica para os investidores?",
      opts: ["Conclusão → Resultados → Dados Financeiros → Introdução","Introdução → Ações Realizadas → Resultados e Impacto → Demonstrativo Financeiro","Fotos → Agradecimentos → Introdução","Apenas o saldo bancário final"],
      ans: 1,
      exp: "Um relatório institucional de impacto apresenta o contexto, as atividades, os resultados alcançados e a prestação de contas."
    },
    {
      q: "Um edital de financiamento público encerra as inscrições em 5 dias. A equipe precisa de 2 dias para escrever o projeto e 1 dia para juntar as certidões. Quantos dias de folga a diretoria terá de margem de segurança?",
      opts: ["1 dia","2 dias","3 dias","Nenhum dia"],
      ans: 1,
      exp: "Tempo necessário: 2 + 1 = 3 dias. Como o prazo é de 5 dias, sobram 2 dias de margem de segurança."
    },
    {
      q: "A EDISCA recebeu convite para apresentar seus bailarinos em dois festivais no mesmo final de semana. O Festival A fica a 10 km e atende 500 jovens da comunidade. O Festival B fica a 500 km e não possui ajuda de custo. Qual decisão é estrategicamente mais sustentável?",
      opts: ["Ir ao Festival B pagando tudo","Priorizar o Festival A, que possui grande impacto local e custo viável","Não ir a nenhum dos dois","Dividir os alunos sem ensaio"],
      ans: 1,
      exp: "A diretoria avalia o alcance do impacto social e a responsabilidade com o uso dos recursos da instituição."
    },
    {
      q: "Qual é a missão central e inegociável que guia todas as decisões da diretoria da EDISCA?",
      opts: ["Apenas produzir grandes lucros comerciais","Promover o desenvolvimento humano, a educação integral e a cidadania de crianças e jovens por meio da arte e da dança","Fazer apresentações sem ligação com a comunidade","Substituir as escolas públicas"],
      ans: 1,
      exp: "A EDISCA é uma organização social cuja missão é a transformação cidadã pela arte, afeto e educação de excelência."
    },
    {
      q: "A diretoria precisa escolher entre investir em um ar-condicionado de luxo para a sala de reuniões ou consertar o piso flutuante da sala de dança. Qual é a escolha prioritária?",
      opts: ["O ar-condicionado de luxo","O piso flutuante da sala de dança, pois impacta diretamente a segurança e integridade física dos bailarinos","Não fazer nenhum dos dois","Comprar quadros caros"],
      ans: 1,
      exp: "A segurança e as condições adequadas de formação dos educandos são sempre a prioridade máxima institucional."
    },
    {
      q: "Para prestar contas de um projeto cultural financiado pela Lei de Incentivo à Cultura, a diretoria deve apresentar:",
      opts: ["Apenas um bilhete de agradecimento","Relatório técnico de atividades, listas de presenças, fotografias e notas fiscais com extratos bancários conciliados","Nenhum relatório","Apenas posts de redes sociais"],
      ans: 1,
      exp: "A transparência e a conformidade legal exigem comprovação detalhada de cada atividade e de cada recurso financeiro investido."
    },
    {
      q: "Se um patrocinador doou R$ 60.000 para ser distribuído igualmente ao longo de 12 meses para o programa de alimentação, quanto será investido por mês?",
      opts: ["R$ 3.000","R$ 4.000","R$ 5.000","R$ 6.000"],
      ans: 2,
      exp: "R$ 60.000 ÷ 12 meses = R$ 5.000 investidos por mês com planejamento rigoroso."
    },
    {
      q: "A diretoria realiza assembleias anuais comunitárias. Qual é a principal importância desse momento?",
      opts: ["Apenas cumprir horário","Ouvir as famílias dos educandos, dialogar com a comunidade e construir caminhos democráticos e participativos","Decidir tudo sem consultar ninguém","Vender produtos comerciais"],
      ans: 1,
      exp: "A gestão participativa aproxima a comunidade da instituição e fortalece a confiança mútua e o compromisso social."
    },
    {
      q: "Um novo convênio exige que 30% das vagas sejam destinadas a novos estudantes residentes no bairro. Se há 60 novas vagas, quantas são reservadas para o entorno?",
      opts: ["12 vagas","15 vagas","18 vagas","20 vagas"],
      ans: 2,
      exp: "30% de 60 vagas = (30 × 60) ÷ 100 = 18 vagas garantidas para a comunidade local."
    },
    {
      q: "Ao analisar a proposta de um festival internacional, a diretoria confere se o alojamento dos alunos é seguro e confortável. Por que essa preocupação é fundamental?",
      opts: ["Porque o bem-estar e a proteção dos educandos estão acima de qualquer prestígio de palco","Porque não importa onde eles dormem","Apenas para gastar mais dinheiro","Para não ensaiar"],
      ans: 0,
      exp: "O cuidado ético e o dever de guarda dos educandos é primordial em todas as viagens institucionais."
    },
    {
      q: "A equipe de coordenação é composta por 6 coordenadores. Se cada um apresenta um relatório de 5 páginas na reunião de planejamento, quantas páginas a diretoria analisará ao todo?",
      opts: ["20 páginas","25 páginas","30 páginas","35 páginas"],
      ans: 2,
      exp: "6 coordenadores × 5 páginas cada = 30 páginas de dados estratégicos e pedagógicos."
    },
    {
      q: "Qual documento institucional consolida os valores éticos, direitos e deveres de todos que convivem na EDISCA?",
      opts: ["O Manual de Convivência e Código de Conduta","Um bilhete aleatório de geladeira","Apenas as leis de trânsito","O cardápio da semana"],
      ans: 0,
      exp: "O Manual de Convivência estabelece acordos coletivos baseados em empatia, respeito e justiça restaurativa."
    },
    {
      q: "Uma comissão de avaliadores externos visitará a instituição. A diretora Claudia organiza a agenda para que os visitantes vejam:",
      opts: ["Apenas as salas de escritório","O cotidiano real: ensaios de dança, aulas de reforço, alimentação saudável e diálogo com educandos","A escola vazia no final de semana","Somente a portaria"],
      ans: 1,
      exp: "A força da EDISCA está na vivência viva e pulsante dos seus educandos e educadores no dia a dia."
    }
  ],

  cozinha: [
    {
      q: "Na cozinha, as bandejas recebem etiquetas nesta sequência: A, B, C, A, B, C, A... Qual letra aparecerá na 11ª bandeja?",
      opts: ["A","B","C","D"],
      ans: 1,
      exp: "A sequência se repete a cada três bandejas. A 11ª posição corresponde à letra B."
    },
    {
      q: "A distribuição da refeição exige higiene rigorosa. Qual a ordem correta antes de servir?",
      opts: ["Servir > Lavar as mãos > Cozinhar","Lavar as mãos > Colocar touca > Cozinhar > Servir","Cozinhar > Comer > Servir","Lavar os alimentos depois de picar"],
      ans: 1,
      exp: "A higienização (mãos e cabelo) é o primeiro passo para garantir a segurança alimentar de todos."
    },
    {
      q: "As frutas precisam ser organizadas em ordem alfabética. Qual sequência está correta?",
      opts: ["Banana → Maçã → Melancia → Pera","Maçã → Banana → Melancia → Pera","Banana → Melancia → Maçã → Pera","Melancia → Banana → Maçã → Pera"],
      ans: 0,
      exp: "Em ordem alfabética: Banana, Maçã, Melancia e Pera."
    },
    {
      q: "Na cozinha, quatro recipientes estão identificados como Açúcar, Sal, Farinha e Arroz. Sabe-se que apenas um rótulo está correto. Ao abrir o recipiente escrito 'Sal', você encontra farinha. Qual rótulo certamente está errado?",
      opts: ["Açúcar","Sal","Farinha","Arroz"],
      ans: 1,
      exp: "Como o recipiente identificado como 'Sal' contém farinha, esse rótulo certamente está errado."
    },
    {
      q: "Por que o cardápio da EDISCA é planejado semanas antes?",
      opts: ["Para comprar os ingredientes com antecedência e garantir o valor nutricional","Porque é mais fácil cozinhar qualquer coisa na hora","Para esconder a comida","Para fazer sempre a mesma comida"],
      ans: 0,
      exp: "Planejamento garante economia na compra e refeições balanceadas para a saúde de vocês."
    },
    {
      q: "Uma receita de sopa nutritiva para 50 educandos utiliza 2 kg de batata. Se hoje a Profª Aurea precisa preparar a mesma receita para 150 educandos, quantos quilos de batata ela usará?",
      opts: ["4 kg","6 kg","8 kg","10 kg"],
      ans: 1,
      exp: "150 educandos é o triplo de 50 (50 × 3 = 150). Triplicando os ingredientes: 2 kg × 3 = 6 kg de batata."
    },
    {
      q: "Para garantir que os alimentos cozidos fiquem fora da zona de perigo de contaminação bacteriana, o Prof. Galeno monitora a temperatura do balcão térmico. Qual deve ser a temperatura mínima dos pratos quentes?",
      opts: ["20°C","40°C","60°C","100°C"],
      ans: 2,
      exp: "Alimentos quentes devem ser mantidos acima de 60°C para impedir a proliferação de bactérias nocivas à saúde."
    },
    {
      q: "Na dispensa da cozinha há 120 pãezinhos. Eles devem ser divididos em cestas contendo exatamente 15 pãezinhos cada. Quantas cestas serão preparadas?",
      opts: ["6 cestas","8 cestas","10 cestas","12 cestas"],
      ans: 1,
      exp: "Dividindo 120 por 15 (120 ÷ 15), obtemos 8 cestas perfeitamente organizadas."
    },
    {
      q: "A cozinha recebeu verduras frescas. Qual é a sequência correta de higienização das hortaliças antes do preparo?",
      opts: ["Cortar → Guardar → Lavar","Lavar em água corrente → Sanitizar na solução clorada → Enxaguar","Cozinhar sem lavar","Passar detergente de prato"],
      ans: 1,
      exp: "A lavagem em água corrente remove sujeiras grossas, a solução clorada elimina micro-organismos e o enxágue final garante a segurança."
    },
    {
      q: "A equipe da cozinha precisa preparar 200 copos de suco de polpa. Se cada jarra faz 20 copos, quantas jarras de suco precisam ser preparadas?",
      opts: ["5 jarras","8 jarras","10 jarras","20 jarras"],
      ans: 2,
      exp: "200 copos ÷ 20 copos por jarra = 10 jarras de suco preparadas para os educandos."
    },
    {
      q: "Por que as tábuas de corte de carnes cruas nunca devem ser usadas para cortar verduras e frutas sem higienização completa prévia?",
      opts: ["Para não gastar tábuas","Para evitar a contaminação cruzada de micro-organismos nocivos dos alimentos crus para os prontos","Porque as frutas estragam as facas","Apenas por questão de cor"],
      ans: 1,
      exp: "A contaminação cruzada ocorre quando bactérias de alimentos crus são transferidas para alimentos que não passarão por novo cozimento."
    },
    {
      q: "O Prof. Galeno orienta que os educandos façam um lanche leve antes dos ensaios de dança. Qual alimento é mais indicado para fornecer energia sem pesar o estômago?",
      opts: ["Feijoada pesada e refrigerante","Frutas frescas (como banana ou maçã) com aveia e água de coco","Salgadinhos fritos e doces açucarados","Ficar sem comer nada o dia todo"],
      ans: 1,
      exp: "Carboidratos de fácil digestão, fibras e hidratação oferecem energia sustentada para o esforço físico sem causar desconforto gástrico."
    },
    {
      q: "Quantos segundos, no mínimo, deve durar a higienização correta das mãos com água e sabão antes de manipular qualquer alimento na cozinha?",
      opts: ["5 segundos","10 segundos","20 a 30 segundos esfregando dedos, palmas e punhos","Não precisa lavar"],
      ans: 2,
      exp: "A higienização eficaz exige de 20 a 30 segundos com fricção de todas as partes das mãos para remover sujidades e germes."
    },
    {
      q: "A Profª Aurea preparou suco natural para 80 alunos. Se cada jarra serve exatamente 8 copos, quantas jarras cheias foram preparadas?",
      opts: ["8 jarras","10 jarras","12 jarras","15 jarras"],
      ans: 1,
      exp: "80 alunos ÷ 8 copos por jarra = 10 jarras preparadas com frutas frescas."
    },
    {
      q: "Qual é a maneira mais segura e correta de descongelar uma carne para a refeição do dia seguinte?",
      opts: ["Dentro de um balde no sol","Na parte inferior da geladeira com antecedência controlada","Sobre a bancada em temperatura ambiente o dia inteiro","Embaixo de água quente da torneira"],
      ans: 1,
      exp: "O descongelamento sob refrigeração impede que a superfície atinja temperaturas perigosas que favorecem a multiplicação bacteriana."
    },
    {
      q: "Para enriquecer o arroz tradicional da EDISCA com fibras e minerais, o que o Prof. Galeno pode acrescentar no cozimento?",
      opts: ["Açúcar cristal em excesso","Cenoura ralada, brócolis e sementes nutritivas","Óleo de fritura reutilizado","Balas coloridas"],
      ans: 1,
      exp: "Vegetais e sementes adicionam cor, vitaminas e micronutrientes essenciais ao desenvolvimento dos jovens bailarinos."
    },
    {
      q: "Qual é a temperatura de fervura da água ao nível do mar utilizada para esterilizar certos utensílios na cozinha?",
      opts: ["50°C","75°C","100°C","150°C"],
      ans: 2,
      exp: "Ao nível do mar, a água entra em ebulição a 100°C, temperatura capaz de eliminar a grande maioria dos agentes patogênicos."
    },
    {
      q: "Ao lavar os pratos na cozinha, qual é a ordem mais higiênica e lógica para economizar água e sabão?",
      opts: ["Panelas engorduradas primeiro > Copos limpos por último","Copos e talheres mais limpos primeiro > Pratos > Panelas engorduradas por último","Lavar tudo junto sem sabão","Guardar molhado sem lavar"],
      ans: 1,
      exp: "Iniciar pelos itens menos engordurados (copos e talheres) mantém a esponja limpa e economiza água e detergente."
    },
    {
      q: "Um educando tem alergia alimentar severa ao leite de vaca (lactose/proteína do leite). O que a equipe da cozinha deve fazer?",
      opts: ["Ignorar e servir leite mesmo assim","Identificar claramente o prato adaptado sem derivados lácteos e garantir que não haja contato com leite no preparo","Proibir o educando de comer","Dizer que alergia é imaginação"],
      ans: 1,
      exp: "Atenção a restrições e alergias alimentares é um dever de proteção à vida e à saúde de cada educando."
    },
    {
      q: "Se 3 kg de feijão rendem 30 porções bem servidas, quantos quilos de feijão serão necessários para servir 90 educandos?",
      opts: ["6 kg","8 kg","9 kg","12 kg"],
      ans: 2,
      exp: "90 educandos é o triplo de 30 (30 × 3 = 90). Logo: 3 kg × 3 = 9 kg de feijão cozidos com temperos naturais."
    }
  ],

  financeiro: [
    {
      q: "Recebemos uma doação de R$ 1.000,00. Precisamos comprar 10 figurinos que custam R$ 80,00 cada. Quanto sobrará no caixa da escola?",
      opts: ["R$ 100,00","R$ 200,00","R$ 300,00","Não sobra nada"],
      ans: 1,
      exp: "10 x 80 = 800. 1000 - 800 = R$ 200,00 de saldo positivo para a instituição!"
    },
    {
      q: "O pagamento da conta de luz vence dia 10. Hoje é dia 5 e o banco demora 2 dias úteis para compensar. Qual o raciocínio financeiro correto?",
      opts: ["Pagar no dia 15","Pagar hoje para garantir que compense antes do vencimento","Ignorar o vencimento","Pagar no dia 10 e arriscar juros"],
      ans: 1,
      exp: "Pagamentos antecipados evitam multas por atraso e protegem os recursos da ONG."
    },
    {
      q: "Precisamos cotar preços de tecidos. O Fornecedor A vende por 50,00 e frete 20,00. O Fornecedor B vende por 60,00 com frete grátis. Qual é o mais barato no total?",
      opts: ["Fornecedor A","Fornecedor B","São iguais","Depende do tecido"],
      ans: 1,
      exp: "Fornecedor A (50+20 = 70). Fornecedor B (60+0 = 60). Logo, o B é mais econômico para a escola."
    },
    {
      q: "A manutenção da escola custa dinheiro. Se um aluno deixa a torneira aberta, o que acontece com os recursos?",
      opts: ["Nada","A água é de graça","Aumenta a conta, tirando dinheiro que poderia ir para o lanche ou figurinos","O financeiro não paga água"],
      ans: 2,
      exp: "Todos os custos são conectados. Desperdiçar recursos físicos é jogar fora recursos financeiros que beneficiariam vocês mesmos."
    },
    {
      q: "Para aprovar uma despesa, precisamos de 3 assinaturas da diretoria. Se já temos a da Profª Andrea e da Profª Claudia, o que falta?",
      opts: ["Aprovação do porteiro","A assinatura da Dirª Dora","Comprar e assinar depois","Nenhuma"],
      ans: 1,
      exp: "O processo exige a aprovação do trio de diretoria para total transparência institucional."
    },
    {
      q: "O setor financeiro reservou R$ 300,00 para os lanches especiais dos ensaios de sábado durante 5 semanas. Quanto pode ser gasto em média por sábado?",
      opts: ["R$ 50,00","R$ 60,00","R$ 70,00","R$ 100,00"],
      ans: 1,
      exp: "Dividindo o orçamento total de R$ 300,00 por 5 sábados (300 ÷ 5), temos R$ 60,00 por ensaio."
    },
    {
      q: "A Profª Clecia iniciou o dia com R$ 150,00 no caixa pequeno. Pagou R$ 45,00 por fitas de dança e R$ 35,00 por fitas adesivas. Quanto sobrou no caixa?",
      opts: ["R$ 60,00","R$ 70,00","R$ 80,00","R$ 90,00"],
      ans: 1,
      exp: "Gastos totais: R$ 45,00 + R$ 35,00 = R$ 80,00. Saldo restante: R$ 150,00 - R$ 80,00 = R$ 70,00."
    },
    {
      q: "Uma loja de equipamentos oferece 10% de desconto no pagamento à vista de uma caixa de som que custa R$ 500,00. Quanto a EDISCA pagará pagando à vista?",
      opts: ["R$ 400,00","R$ 420,00","R$ 450,00","R$ 480,00"],
      ans: 2,
      exp: "10% de R$ 500,00 é R$ 50,00. Preço com desconto: R$ 500,00 - R$ 50,00 = R$ 450,00."
    },
    {
      q: "A Profª Vanessa recebe 4 notas fiscais de compras de materiais do projeto. Por que ela precisa organizar e guardar cada recibo em pastas numeradas?",
      opts: ["Apenas para ocuparem espaço na gaveta","Para garantir a prestação de contas transparente em auditorias dos patrocinadores","Porque as notas são bonitas","Para dar aos alunos desenharem"],
      ans: 1,
      exp: "A transparência na prestação de contas é fundamental para comprovar a aplicação correta dos recursos doados."
    },
    {
      q: "A compra de 20 sapatilhas de ponta custou R$ 1.600,00. Qual foi o preço unitário de cada sapatilha?",
      opts: ["R$ 60,00","R$ 70,00","R$ 80,00","R$ 90,00"],
      ans: 2,
      exp: "Custo total dividido pela quantidade: R$ 1.600,00 ÷ 20 = R$ 80,00 por sapatilha."
    },
    {
      q: "Qual é a diferença fundamental entre uma Nota Fiscal e um simples cupom não fiscal no controle financeiro de uma instituição social?",
      opts: ["Não há diferença alguma","A Nota Fiscal é um documento fiscal oficial e auditável com recolhimento legal de tributos exigido em prestações de contas","O cupom é sempre melhor","A nota fiscal não tem validade jurídica"],
      ans: 1,
      exp: "Projetos incentivados e auditorias exigem Notas Fiscais eletrônicas nominais para validar a regularidade de cada gasto."
    },
    {
      q: "A Profª Patricia está elaborando o fluxo de caixa do trimestre. O que significa o termo 'saldo conciliado'?",
      opts: ["Apenas somar números sem conferir","O valor dos registros contábeis da instituição confere exatamente com o extrato fornecido pelo banco","Gastar todo o dinheiro até zerar","Ignorar os comprovantes fiscais"],
      ans: 1,
      exp: "A conciliação bancária garante que cada centavo registrado no sistema corresponde a uma movimentação real no banco."
    },
    {
      q: "Uma compra de 20 blocos de papel canson custou R$ 300,00 no total. Qual foi o preço unitário de cada bloco?",
      opts: ["R$ 10,00","R$ 12,00","R$ 15,00","R$ 18,00"],
      ans: 2,
      exp: "R$ 300,00 ÷ 20 blocos = R$ 15,00 por bloco de desenho."
    },
    {
      q: "A EDISCA mantém um Fundo de Reserva Emergencial. Para que serve esse recurso guardado?",
      opts: ["Para festas particulares","Garantir o pagamento de salários e manutenção essencial caso haja atraso no repasse de convênios ou doações","Comprar itens supérfluos","Ficar sem uso permanente"],
      ans: 1,
      exp: "A sustentabilidade e a responsabilidade administrativa exigem reservas para proteger os colaboradores e educandos em imprevistos."
    },
    {
      q: "Se uma oficina de costura gastou R$ 450,00 em tecidos e R$ 150,00 em aviamentos, qual foi o custo total dos materiais daquela semana?",
      opts: ["R$ 500,00","R$ 550,00","R$ 600,00","R$ 650,00"],
      ans: 2,
      exp: "R$ 450,00 + R$ 150,00 = R$ 600,00 investidos nos figurinos dos alunos."
    },
    {
      q: "Qual é o tempo mínimo exigido pela legislação brasileira para que uma instituição sem fins lucrativos guarde seus comprovantes fiscais e contábeis arquivados?",
      opts: ["1 mês","6 meses","1 ano","Pelo menos 5 anos"],
      ans: 3,
      exp: "Documentos fiscais e comprovantes de prestação de contas devem ser guardados por no mínimo 5 anos para fins de fiscalização e auditoria."
    },
    {
      q: "Uma doação de R$ 2.400,00 foi dividida em partes iguais para apoiar 4 setores: Reforço, Dança, Biblioteca e Teatro. Quanto cada setor recebeu?",
      opts: ["R$ 400,00","R$ 500,00","R$ 600,00","R$ 800,00"],
      ans: 2,
      exp: "R$ 2.400,00 ÷ 4 setores = R$ 600,00 para cada um fortalecer suas atividades didáticas."
    },
    {
      q: "Por que todos os pagamentos da EDISCA são efetuados preferencialmente por transferência bancária identificada em vez de dinheiro vivo?",
      opts: ["Para dificultar as compras","Para garantir rastreabilidade, segurança e transparência em todas as operações perante órgãos de controle e doadores","Porque bancos não cobram nada","Apenas por comodidade"],
      ans: 1,
      exp: "A rastreabilidade digital comprova o destino exato de cada recurso público ou privado recebido pela ONG."
    },
    {
      q: "Um fornecedor ofereceu 5% de desconto em uma fatura de R$ 800,00. Qual foi o valor economizado pela instituição?",
      opts: ["R$ 20,00","R$ 30,00","R$ 40,00","R$ 50,00"],
      ans: 2,
      exp: "5% de R$ 800,00 = (5 × 800) ÷ 100 = R$ 40,00 de economia para reinvestir nos alunos."
    },
    {
      q: "O setor financeiro recebe um recibo sem assinatura e sem número de CPF/CNPJ do prestador. O que a Profª Patricia faz?",
      opts: ["Aceita mesmo assim","Solicita a correção e a inclusão dos dados de identificação obrigatórios antes de autorizar o lançamento contábil","Rasga o documento e não paga ninguém","Assina pelo fornecedor"],
      ans: 1,
      exp: "A conformidade documental não permite comprovantes anônimos ou sem respaldo legal nos balanços da entidade."
    }
  ],

  reforco: [
    {
      q: "Na sala de reforço com o Prof. Rogério, a Profª Clara e a Profª Raquel, quatro alunos fizeram atividades diferentes: leitura, escrita, cálculo e lógica. Sabe-se que Ana Luiza não fez cálculo, Hellen fez lógica e Anny Naomy fez leitura. Qual atividade sobrou para Giovana?",
      opts: ["Escrita","Leitura","Cálculo","Lógica"],
      ans: 2,
      exp: "Como Hellen fez lógica, Anny Naomy fez leitura e Ana Luiza não fez cálculo, a única atividade restante para Giovana é cálculo."
    },
    {
      q: "Durante a oficina de raciocínio, a Profª Clara escreveu um código no quadro: A1, B2, C3, D4. Se a mesma lógica continuar, qual código representa a letra F?",
      opts: ["F5","F6","E6","G6"],
      ans: 1,
      exp: "Cada letra corresponde à sua posição no alfabeto: A=1, B=2, C=3... Portanto, F corresponde ao número 6."
    },
    {
      q: "No projeto de leitura da Profª Raquel, se Ketlein lê 5 páginas de um livro por dia, quantas páginas ela terá lido em uma semana (7 dias)?",
      opts: ["25","30","35","40"],
      ans: 2,
      exp: "5 páginas x 7 dias = 35 páginas lidas e muito vocabulário novo adquirido!"
    },
    {
      q: "O Prof. Rogério apresentou o desafio: qual alternativa não segue o mesmo padrão das demais?",
      opts: ["ABAB","CDCD","EFEF","GHHI"],
      ans: 3,
      exp: "As três primeiras repetem um bloco de duas letras. 'GHHI' quebra esse padrão."
    },
    {
      q: "Os professores Rogério, Clara e Raquel escreveram no quadro: 'Leia todas as alternativas antes de responder.' Qual é a atitude mais lógica?",
      opts: ["Marcar a primeira resposta","Responder sem ler","Ler todas as alternativas antes de escolher","Perguntar ao colega"],
      ans: 2,
      exp: "Seguir a instrução evita erros por falta de atenção e aumenta as chances de escolher a resposta correta."
    },
    {
      q: "Considere a sequência numérica no quadro da Profª Clara: 3, 6, 12, 24, __. Qual número vem a seguir?",
      opts: ["30","36","48","60"],
      ans: 2,
      exp: "Cada número é o dobro do anterior (3×2=6, 6×2=12, 12×2=24). Portanto, 24 × 2 = 48."
    },
    {
      q: "Se 'Todo bailarino se dedica aos estudos' e 'Lucas é um bailarino da EDISCA', qual é a conclusão lógica verdadeira?",
      opts: ["Lucas não estuda","Lucas se dedica aos estudos","Lucas não gosta de dança","Nenhuma conclusão é possível"],
      ans: 1,
      exp: "Por dedução lógica direta: se todo bailarino se dedica e Lucas é um bailarino, Lucas se dedica aos estudos."
    },
    {
      q: "Um aluno tem 90 minutos para estudar três matérias com as orientações do reforço escolar (Português, Matemática e História) igualmente. Quantos minutos ele dedicará a cada matéria?",
      opts: ["20 minutos","25 minutos","30 minutos","45 minutos"],
      ans: 2,
      exp: "Dividindo 90 minutos por 3 matérias (90 ÷ 3), ele terá 30 minutos focados para cada disciplina."
    },
    {
      q: "Qual é a relação de analogia correta proposta pela Profª Raquel? 'A dança está para o Palco assim como o Estudo está para a...'",
      opts: ["Cozinha","Escola / Sabedoria","Sapatilha","Música"],
      ans: 1,
      exp: "Assim como a dança se realiza e ganha vida no palco, o estudo se desenvolve no ambiente escolar e no conhecimento."
    },
    {
      q: "O Prof. Rogério pediu para calcular o perímetro de uma mesa retangular de estudos que mede 2 metros de comprimento por 1 metro de largura. Qual o perímetro?",
      opts: ["3 metros","4 metros","6 metros","8 metros"],
      ans: 2,
      exp: "Perímetro é a soma de todos os lados: 2m + 2m + 1m + 1m = 6 metros."
    },
    {
      q: "Na aula com a Profª Clara, os alunos estudam a ordem das operações matemáticas na expressão: 8 + 4 × 2. Qual é o resultado correto?",
      opts: ["16","24","14","12"],
      ans: 0,
      exp: "Pelas regras matemáticas, a multiplicação é resolvida antes da adição: 4 × 2 = 8. Em seguida: 8 + 8 = 16."
    },
    {
      q: "O Prof. Rogério propõe o seguinte problema: 'O dobro da idade de Ana somado a 5 é igual a 25'. Qual é a idade de Ana?",
      opts: ["8 anos","10 anos","12 anos","15 anos"],
      ans: 1,
      exp: "2x + 5 = 25 → 2x = 20 → x = 10 anos. A idade de Ana é 10 anos."
    },
    {
      q: "A Profª Raquel desafia a turma a identificar a palavra com grafia correta em língua portuguesa:",
      opts: ["Exceção","Esceção","Exceçâo","Eceção"],
      ans: 0,
      exp: "'Exceção' se escreve com 'x' e 'ç', significando algo que se desvia da regra geral."
    },
    {
      q: "Um texto lido no reforço escolar fala sobre 'empatia'. Qual é o sinônimo que melhor expressa esse sentimento?",
      opts: ["Egoísmo","Capacidade de se colocar no lugar do outro e compreendê-lo","Indiferença","Competição"],
      ans: 1,
      exp: "Empatia é a virtude humana de acolher, sentir e compreender a perspectiva e as dores do outro com respeito."
    },
    {
      q: "Em geometria plana, um ângulo que mede exatamente 90 graus é classificado como:",
      opts: ["Ângulo agudo","Ângulo obtuso","Ângulo reto","Ângulo raso"],
      ans: 2,
      exp: "O ângulo de 90° é chamado de reto, muito importante na física, na arquitetura das salas e no alinhamento da dança."
    },
    {
      q: "Quantos metros há em uma corrida de 2,5 quilômetros (sabendo que 1 km = 1.000 metros)?",
      opts: ["250 metros","1.500 metros","2.500 metros","25.000 metros"],
      ans: 2,
      exp: "2,5 × 1.000 metros = 2.500 metros percorridos com energia e foco."
    },
    {
      q: "Na língua portuguesa, qual é o substantivo coletivo que designa um conjunto de peixes?",
      opts: ["Alcateia","Cardume","Enxame","Rebanho"],
      ans: 1,
      exp: "Cardume é o coletivo de peixes; alcateia é de lobos; enxame é de abelhas e rebanho é de ovelhas."
    },
    {
      q: "Se um quarto (1/4) dos 36 alunos da sala escolheram participar do grupo de teatro, quantos alunos estão no teatro?",
      opts: ["6 alunos","8 alunos","9 alunos","12 alunos"],
      ans: 2,
      exp: "36 ÷ 4 = 9 alunos dedicando-se com paixão às artes cênicas."
    },
    {
      q: "Ao analisar a pontuação de um texto poético, para que serve o uso de 'reticências (...)'?",
      opts: ["Para indicar que a frase terminou de forma definitiva","Para indicar uma suspensão de pensamento, hesitação ou continuidade do sentido no imaginário","Apenas para enfeitar o papel","Para fazer uma pergunta direta"],
      ans: 1,
      exp: "As reticências indicam pausa expressiva, reflexão ou pensamento não concluído na poesia e na dramaturgia."
    },
    {
      q: "Na sala de reforço, os professores Rogério, Clara e Raquel ensinam que errar uma questão em um exercício serve para:",
      opts: ["Desistir imediatamente do estudo","Analisar o raciocínio, compreender a dúvida e aprender com profundidade para acertar na próxima vez","Esconder a folha de papel","Ter vergonha dos colegas"],
      ans: 1,
      exp: "O erro é uma etapa natural e valiosa do processo de aprendizagem quando acompanhado de reflexão e acolhimento."
    }
  ],

  artes: [
    {
      q: "Um artista desenhou um quadrado, depois um pentágono, em seguida um hexágono. Mantendo o mesmo padrão, qual será a próxima figura?",
      opts: ["Triângulo","Hexágono","Heptágono","Octógono"],
      ans: 2,
      exp: "O número de lados aumenta de um em um: 4, 5, 6... Portanto, a próxima figura tem 7 lados: um heptágono."
    },
    {
      q: "O cenário do espetáculo representa uma floresta viva. Misturando as tintas azul e amarela em nossa paleta, qual cor secundária obteremos para pintar as folhagens?",
      opts: ["Roxo","Laranja","Verde","Marrom"],
      ans: 2,
      exp: "A mistura das cores primárias azul e amarelo gera a cor secundária verde, perfeita para os elementos da natureza!"
    },
    {
      q: "Um educando desenhou metade de uma borboleta no papel dobrado ao meio. Para completar o desenho corretamente, o outro lado deve ser:",
      opts: ["Maior que o primeiro lado","Uma imagem espelhada do primeiro lado","Um desenho diferente","Com cores aleatórias"],
      ans: 1,
      exp: "A simetria acontece quando um lado é o reflexo do outro, como em uma imagem no espelho."
    },
    {
      q: "Estamos desenhando uma máscara teatral simétrica. O que significa garantir a simetria no desenho?",
      opts: ["Fazer um lado completamente diferente do outro","Garantir que os dois lados divididos ao meio sejam correspondentes e equilibrados","Pintar tudo com uma única cor","Desenhar sem usar linhas"],
      ans: 1,
      exp: "A simetria em artes visuais cria um equilíbrio perfeito, onde o lado esquerdo espelha o lado direito harmoniosamente."
    },
    {
      q: "Para pintar um cenário que transmita energia, calor e alegria, a professora Gislene sugere usar cores quentes. Quais são as principais cores desse grupo?",
      opts: ["Azul, verde e roxo","Preto, branco e cinza","Vermelho, laranja e amarelo","Rosa, lilás e prata"],
      ans: 2,
      exp: "Vermelho, laranja e amarelo são cores quentes, associadas ao fogo e ao sol, excelentes para transmitir vibração e energia em uma obra de arte."
    },
    {
      q: "Se quisermos transmitir tranquilidade, paz e serenidade no plano de fundo de um cenário, qual grupo de cores a Profª Gislene recomenda?",
      opts: ["Cores quentes (Vermelho e Laranja)","Cores frias (Azul, Verde e Roxo)","Cores neon fluorescentes","Apenas tinta preta"],
      ans: 1,
      exp: "Cores frias como azul, verde e roxo transmitem calma, serenidade e sensação de profundidade."
    },
    {
      q: "Ao desenhar a anatomia da figura humana para um figurino de dança, qual é a referência clássica de proporção para a altura total do corpo?",
      opts: ["A altura de 2 cabeças","A altura de 7 a 8 cabeças","A altura de 20 cabeças","Não há proporção"],
      ans: 1,
      exp: "No desenho de figura humana e moda, a proporção harmônica padrão utiliza entre 7 e 8 vezes a altura da cabeça do modelo."
    },
    {
      q: "No círculo cromático, cores complementares são aquelas situadas em lados opostos. Qual é a cor complementar do Vermelho que gera alto contraste?",
      opts: ["Amarelo","Laranja","Verde","Roxo"],
      ans: 2,
      exp: "No círculo cromático, o Verde fica exatamente oposto ao Vermelho, criando um contraste vibrante e harmonioso."
    },
    {
      q: "No desenho em perspectiva de uma sala de ensaios, todas as linhas paralelas que se distanciam do observador parecem se encontrar em um ponto chamado:",
      opts: ["Ponto de Fuga","Ponto Cego","Centro da folha","Ponto Zero"],
      ans: 0,
      exp: "O Ponto de Fuga na linha do horizonte é o elemento geométrico essencial para dar ilusão de profundidade 3D no papel."
    },
    {
      q: "A Profª Gislene está organizando materiais recicláveis para a construção dos adereços de um espetáculo. Ela possui papelão, garrafas PET e arames. Qual o primeiro cuidado de segurança no manuseio?",
      opts: ["Pintar tudo antes de cortar","Proteger as pontas cortantes e usar tesouras sem ponta","Colocar tudo no lixo","Queimar os materiais"],
      ans: 1,
      exp: "A segurança no ateliê vem em primeiro lugar: rebarbas e pontas perfurantes devem ser tratadas antes do processo criativo."
    },
    {
      q: "Qual artista brasileira é autora da célebre pintura 'Abaporu' (1928), marco inicial do movimento antropofágico na arte moderna?",
      opts: ["Tarsila do Amaral","Anita Malfatti","Lygia Clark","Tomie Ohtake"],
      ans: 0,
      exp: "Tarsila do Amaral pintou o 'Abaporu', obra monumental da arte moderna brasileira que influenciou gerações de artistas."
    },
    {
      q: "No ateliê de artes plásticas, o Prof. Robson ensina que para criar uma escultura de argila sem rachaduras na secagem, é fundamental:",
      opts: ["Deixar bolhas de ar grandes no interior da peça","Sovar bem a massa para expulsar bolhas de ar e fazer uma secagem lenta e gradual à sombra","Colocar a argila crua direto no fogo forte","Mergulhar em água fervente"],
      ans: 1,
      exp: "Bolhas de ar na argila expandem e quebram a peça. Sovar a massa e secar devagar garante esculturas resistentes."
    },
    {
      q: "Quais são as cores complementares do círculo cromático (aquelas que ficam opostas e geram o maior contraste visual quando colocadas lado a lado)?",
      opts: ["Azul e Laranja / Vermelho e Verde / Amarelo e Roxo","Preto e Cinza","Branco e Bege","Verde e Azul"],
      ans: 0,
      exp: "Cores opostas no círculo cromático, como azul e laranja ou vermelho e verde, criam contraste vibrante e chamam a atenção do público."
    },
    {
      q: "Qual é a principal diferença de comportamento entre a tinta guache e a tinta acrílica sobre a tela?",
      opts: ["A guache nunca seca","A guache é solúvel em água mesmo após seca; a tinta acrílica se torna uma película plástica impermeável e resistente à água depois de seca","A acrílica é transparente como vidro","Não existe nenhuma diferença"],
      ans: 1,
      exp: "A resina polimérica da tinta acrílica fixa os pigmentos de forma permanente após a evaporação da água."
    },
    {
      q: "Na xilogravura nordestina, muito associada à literatura de cordel, qual suporte é talhado pelo artista para criar a matriz de impressão?",
      opts: ["Placa de vidro","Madeira talhada","Bloco de isopor mole","Folha de seda"],
      ans: 1,
      exp: "Xilografia vem do grego (xylon = madeira; graphein = gravar). A madeira é entalhada com goivas e entintada."
    },
    {
      q: "A Profª Talita orienta que, ao desenhar um corpo humano em movimento, a linha que orienta a postura e dinamismo da figura é chamada de:",
      opts: ["Linha de ação (ou curva de movimento)","Régua reta congelada","Ponto cego","Mancha sem sentido"],
      ans: 0,
      exp: "A linha de ação capta o fluxo da coluna vertebral e a energia expressiva do bailarino no papel."
    },
    {
      q: "Ao lavar os pincéis após a aula de pintura com a Profª Andrea, qual é o cuidado correto com as cerdas para que não deformem?",
      opts: ["Deixar o pincel mergulhado com as cerdas amassadas no fundo do copo de água","Lavar suavemente com água e sabão neutro, alinhar as cerdas e secar deitado ou com a ponta para cima","Puxar as cerdas com alicate","Secar no fogo"],
      ans: 1,
      exp: "Guardar o pincel deitado ou na vertical para cima preserva o formato natural das cerdas e prolonga sua vida útil."
    },
    {
      q: "A técnica artística de colar recortes de papéis, fotografias e tecidos sobre uma superfície para formar uma nova composição é chamada de:",
      opts: ["Gravura em metal","Colagem (ou assemblage)","Vitral clássico","Cerâmica esmaltada"],
      ans: 1,
      exp: "A colagem é uma linguagem expressiva rica e acessível que permite recombinar texturas e mensagens visuais."
    },
    {
      q: "Qual cor transmite a sensação psicológica de serenidade, calmaria e profundidade espacial na pintura cenográfica?",
      opts: ["Vermelho vibrante","Azul suave","Amarelo fluorescente","Laranja quente"],
      ans: 1,
      exp: "Tons de azul remetem ao céu, às águas e transmitem tranquilidade, amplitude e introspecção."
    },
    {
      q: "A arte e o artesanato tradicional do barro no Nordeste (como os mestres do Cariri e do Alto do Moura) representam:",
      opts: ["Apenas cópias de arte europeia","A identidade, a memória popular, o cotidiano e a resistência cultural do povo sertanejo","Coisas sem valor histórico","Arte feita exclusivamente por computadores"],
      ans: 1,
      exp: "A arte figurativa em barro é patrimônio cultural vivo que retrata a vida, as festas e a resiliência nordestina."
    }
  ],

  danca: [
    {
      q: "Em uma coreografia, Yasmin levanta o braço direito e Heloisa deve fazer o movimento como se fosse seu reflexo no espelho. Qual braço Heloisa deve levantar?",
      opts: ["Direito","Esquerdo","Os dois braços","Nenhum braço"],
      ans: 1,
      exp: "Quando uma pessoa imita outra como um espelho, os lados ficam invertidos. O braço direito de um corresponde ao esquerdo do outro."
    },
    {
      q: "Para uma apresentação, Tio Jessy precisa escolher 3 bailarinas entre Vitória, Rayla, Cecilia e Emilly. Vitória só pode participar se Rayla também participar. Se Cecilia já foi escolhida, qual grupo pode subir ao palco?",
      opts: ["Vitória, Rayla e Emilly","Vitória, Rayla e Cecilia","Rayla, Cecilia e Emilly","Vitória, Cecilia e Emilly"],
      ans: 1,
      exp: "Vitória só pode participar junto com Rayla. Como Cecilia já está no grupo, a única opção possível com Vitória é Vitória, Rayla e Cecilia."
    },
    {
      q: "Durante uma atividade na sala de dança da EDISCA, quatro bailarinas ocupam posições diferentes no espaço. Viviam está no centro da sala. Isabelly está à frente de Viviam. Flora está atrás de Viviam. Laissy está ao lado direito de Viviam. Quem está mais distante da frente da sala?",
      opts: ["Viviam","Isabelly","Flora","Laissy"],
      ans: 2,
      exp: "Isabelly está à frente de Viviam e Flora está atrás dela. Portanto, Flora é quem está mais distante da frente da sala."
    },
    {
      q: "Na coreografia da EDISCA, cada sequência de movimentos segue um padrão: P = passo, G = giro e S = salto. Tio Anderson escreveu: P - G - S - G - P - G - S - G - P - G - __. Qual movimento completa a sequência?",
      opts: ["Passo","Giro","Salto","Parada"],
      ans: 2,
      exp: "O bloco que se repete é P - G - S - G. Depois de P - G, o próximo movimento é S."
    },
    {
      q: "Se um *plié* exige que o joelho siga a linha da ponta do pé, o que acontece se o bailarino fechar o joelho para dentro?",
      opts: ["Fica mais bonito","Ele ganha velocidade","Risco de lesão no joelho e desalinhamento","Nada acontece"],
      ans: 2,
      exp: "A anatomia humana exige alinhamento ósseo. Dançar com técnica é cuidar da própria saúde física."
    },
    {
      q: "Tio Vitor está marcando a música da dança em compasso quaternário (1, 2, 3, 4). Se uma frase coreográfica dura 3 oitavas (3 blocos de 8 tempos), quantos tempos musicais os bailarinos contaram?",
      opts: ["12 tempos","16 tempos","24 tempos","32 tempos"],
      ans: 2,
      exp: "Cada oitava contém 8 tempos musicais. 3 oitavas × 8 tempos = 24 tempos no total."
    },
    {
      q: "Na formação do grupo, Tio Daniel organiza 16 bailarinos em uma formação 'V'. Se há 1 bailarino na ponta do 'V' (no centro), quantos bailarinos ficam distribuídos em cada uma das duas diagonais?",
      opts: ["6 em cada lado","7 em cada lado","8 em cada lado","15 de um lado"],
      ans: 1,
      exp: "16 bailarinos menos 1 no centro = 15 bailarinos. Dividindo em 2 lados com o centro compartilhado (ou 1 no vértice + 7 em cada braço = 15 + 1 = 16)."
    },
    {
      q: "Na técnica do giro (*pirouette*), o bailarino mantém o olhar fixo em um ponto na parede pelo maior tempo possível. Qual o objetivo biomecânico dessa 'marcação de cabeça'?",
      opts: ["Apenas estética","Evitar tontura e manter o equilíbrio do eixo corporal","Girar mais devagar","Olhar para o público"],
      ans: 1,
      exp: "A marcação de cabeça estabiliza o sistema vestibular no ouvido interno, prevenindo tonturas e mantendo o alinhamento central do giro."
    },
    {
      q: "Em um movimento em *cânone*, o Grupo A faz o salto no tempo 1, o Grupo B faz no tempo 3 e o Grupo C no tempo 5. Em qual tempo o Grupo D saltará se a sequência continuar no mesmo padrão de intervalo?",
      opts: ["Tempo 6","Tempo 7","Tempo 8","Tempo 9"],
      ans: 1,
      exp: "O intervalo de entrada é de 2 em 2 tempos (1, 3, 5). O Grupo D saltará no tempo 7."
    },
    {
      q: "Ao saltar (*grand jeté*), para alcançar maior altura sem impactar agressivamente as articulações na queda, o bailarino deve usar:",
      opts: ["Pés rígidos","O impulso do *plié* na preparação e amortecer rolando o pé do metatarso ao calcanhar","Cair com os joelhos esticados","Saltar sem dobrar os joelhos"],
      ans: 1,
      exp: "A preparação em *plié* acumula energia elástica e o amortecimento gradual absorve a força do impacto com o solo."
    },
    {
      q: "Na técnica de giros clássicos e contemporâneos (como piruetas), o que é a técnica de 'spotting' (manter o foco da cabeça)?",
      opts: ["Girar os olhos sem parar para qualquer lado","Fixar o olhar em um ponto à frente, ser a última parte do corpo a sair e a primeira a retornar no giro, evitando a tontura","Fechar os olhos durante todo o giro","Olhar sempre para o chão"],
      ans: 1,
      exp: "O foco visual com o reflexo cefálico mantém a orientação espacial e previne desequilíbrio e vertigem nos giros."
    },
    {
      q: "Por que o piso das salas de dança da EDISCA possui estrutura amortecida (piso flutuante recoberto com linóleo)?",
      opts: ["Para ficar mais brilhoso nas fotos","Para absorver o impacto das quedas e saltos, protegendo as articulações dos joelhos, quadris e coluna dos bailarinos","Porque era o piso mais barato","Para os alunos escorregarem de meia"],
      ans: 1,
      exp: "O piso amortecido dissipa a energia dos impactos de saltos repetidos, sendo essencial para a carreira e saúde do bailarino."
    },
    {
      q: "Na dança, a posição em que o bailarino se apoia sobre uma perna estendida enquanto a outra é elevada para trás no ar chama-se:",
      opts: ["Plié","Arabesque","Tendu","Passé"],
      ans: 1,
      exp: "O arabesque é uma linha harmônica clássica e contemporânea que expressa projeção corporal e equilíbrio espacial."
    },
    {
      q: "A Profª Gil e o Prof. Allyson enfatizam que a dança contemporânea se diferencia do balé clássico rígido porque:",
      opts: ["Não possui nenhuma técnica ou ensaio","Explora a relação com a gravidade, o trabalho de chão, a expressividade individual e a multiplicidade de corpos e dinâmicas","Usa apenas roupas de festa","Proíbe o uso de música"],
      ans: 1,
      exp: "A dança contemporânea liberta as formas tradicionais, dialogando com o chão, o peso corporal e as realidades sociais."
    },
    {
      q: "Qual é o efeito do cansaço extremo sem descanso suficiente nos ensaios prolongados de dança?",
      opts: ["Aumenta a precisão dos saltos","Reduz os reflexos proprioceptivos e aumenta exponencialmente o risco de entorses e lesões musculares","Deixa o corpo imune a lesões","Não afeta o bailarino"],
      ans: 1,
      exp: "O descanso e o sono são componentes essenciais do treinamento; a fadiga neuromuscular compromete o controle postural."
    },
    {
      q: "Quando um grupo de bailarinos dança exatamente no mesmo tempo, velocidade e movimento, qual dinâmica espacial estão executando?",
      opts: ["Uníssono","Cânone","Solo desconectado","Pausa total"],
      ans: 0,
      exp: "O uníssono exige sintonia coletiva absoluta, respirando e movendo-se como um único organismo cênico no palco."
    },
    {
      q: "Para fortalecer os pés e tornozelos dos bailarinos para saltos seguros, qual exercício básico na barra é indispensável?",
      opts: ["Battement tendu e relevé com articulação metatarsal","Ficar sentado sem se mover","Correr descalço no asfalto quente","Dormir na barra"],
      ans: 0,
      exp: "O tendu e o relevé trabalham a flexão plantar, os arcos dos pés e a estabilidade dos tendões de Aquiles."
    },
    {
      q: "O que significa 'presença cênica' de um bailarino durante a apresentação?",
      opts: ["Apenas estar fisicamente no palco pensando em outra coisa","Conexão total, entrega corporal, intenção expressiva e capacidade de emocionar o público com verdade artística","Usar a maquiagem mais chamativa","Ficar olhando para a coxia procurando o professor"],
      ans: 1,
      exp: "A presença cênica é o carisma e a verdade emocional que transbordam do movimento corporal e tocam o espectador."
    },
    {
      q: "Qual é a postura correta da coluna vertebral durante as sequências coreográficas no centro?",
      opts: ["Coluna curvada sem sustentação do abdômen","Alinhamento neutro e alongado, com ativação do centro de força (core) e ombros relaxados para baixo","Prender a respiração estufando a barriga","Inclinar a cabeça torta para o lado"],
      ans: 1,
      exp: "A ativação do centro (abdômen e assoalho pélvico) sustenta a coluna e proporciona equilíbrio e leveza aos membros."
    },
    {
      q: "Na EDISCA, a dança é vista primordialmente como:",
      opts: ["Um privilégio acessível a poucos","Um instrumento potente de transformação social, emancipação humana, autoconhecimento e arte de excelência","Apenas um passatempo sem compromisso","Uma competição onde um deve derrubar o outro"],
      ans: 1,
      exp: "A dança na EDISCA devolve aos educandos a consciência de sua beleza, dignidade e potência transformadora no mundo."
    }
  ],

  teatro: [
    {
      q: "Na apresentação de ballet, Tia Adrielly combinou três regras: as bailarinas entram pelo lado esquerdo, a música começa antes da entrada e a iluminação muda durante a coreografia. Qual situação quebra uma dessas regras?",
      opts: ["A música começa antes da entrada","A luz muda no meio da dança","As bailarinas entram pelo lado direito","A coreografia termina com a música"],
      ans: 2,
      exp: "A única regra quebrada é a entrada pelo lado direito, pois foi combinado que a entrada seria pelo lado esquerdo."
    },
    {
      q: "No teatro, as laterais do palco de onde os bailarinos entram escondidos do público chamam-se 'Coxias'. Se um bailarino entra pela coxia da Esquerda e tem que sair pelo lado oposto, por onde ele sai?",
      opts: ["Pelo teto","Pela coxia Direita","Pelo fundo do palco","Pela plateia"],
      ans: 1,
      exp: "O lado oposto da Esquerda do palco é sempre a coxia da Direita."
    },
    {
      q: "Na coxia do teatro, a equipe recebeu três avisos: 'A bailarina azul entra antes da vermelha'. 'A bailarina verde entra depois da azul'. 'A bailarina vermelha entra depois da verde'. Qual é a ordem correta de entrada?",
      opts: ["Azul → Verde → Vermelha","Vermelha → Azul → Verde","Verde → Azul → Vermelha","Azul → Vermelha → Verde"],
      ans: 0,
      exp: "A azul deve vir antes da verde, e a verde antes da vermelha. Portanto, a ordem correta é Azul → Verde → Vermelha."
    },
    {
      q: "Na marcação de palco, a numeração vai do centro (0) para as laterais (1, 2, 3...). Se a coreógrafa pede para todos se concentrarem no 'Ponto Zero', para onde o elenco vai?",
      opts: ["Para o canto direito","Para o fundo do palco","Para o centro exato do palco","Para a coxia"],
      ans: 2,
      exp: "O 'Ponto 0' (ou centro) é a referência de alinhamento simétrico para a dança."
    },
    {
      q: "Durante o espetáculo 'Periferia' da EDISCA, a música parou acidentalmente. Como o elenco bem ensaiado deve reagir logicamente?",
      opts: ["Parar e olhar para a coxia","Sair do palco chorando","Continuar dançando no silêncio mantendo a contagem mental em grupo","Sentar no chão"],
      ans: 2,
      exp: "O show não pode parar. O profissionalismo exige manter a contagem interna até o som voltar."
    },
    {
      q: "Antes da cortina abrir, a iluminadora avisa: 'Atencão ao Blackout!'. O que significa este termo técnico no teatro?",
      opts: ["Acender todas as luzes do palco","Apagar completamente todas as luzes do palco","Ligar a luz da plateia","Colocar luz vermelha"],
      ans: 1,
      exp: "'Blackout' é a escuridão total instantânea no palco, usada para trocas de cenários ou final de cenas."
    },
    {
      q: "Na orientação espacial do palco, o termo 'Proscênio' refere-se a qual parte do espaço teatral?",
      opts: ["O fundo do palco","A parte do palco mais próxima da plateia, à frente do urdimento","A coxia esquerda","A cabine de som"],
      ans: 1,
      exp: "Proscênio é a borda frontal do palco, ficando mais perto do público."
    },
    {
      q: "As professoras Mayra e Hariane estão organizando os adereços da cena 1, 2 e 3 na coxia. Onde deve ficar o adereço da cena 1 para facilitar a entrada do elenco?",
      opts: ["No fundo da caixa de transporte","Na frente, ao alcance imediato da mão do bailarino","Guardado no camarim","No teto"],
      ans: 1,
      exp: "A organização de bastidores posiciona os objetos na ordem exata de uso para evitar atrasos nas trocas rápidas de cena."
    },
    {
      q: "Durante o espetáculo, os espectadores devem manter os celulares desligados. Qual o principal motivo técnico para essa orientação?",
      opts: ["Para a bateria do celular não acabar","Evitar luzes e barulhos que distraem os artistas e prejudicam a concentração da iluminação de cena","Porque o teatro não tem tomada","Para o sinal de internet não cair"],
      ans: 1,
      exp: "Telas acesas e toques de celular quebram a atmosfera do espetáculo e desconcentram os bailarinos em cena."
    },
    {
      q: "Ao final da apresentação, a cortina fecha e o público aplaude. Qual é a sequência de agradecimento (curtida/révérence) do elenco?",
      opts: ["Sair correndo antes do sinal","Entrar em grupo, alinhar no proscênio, saudar o público com o torso e agradecer à iluminação/orquestra","Ficar de costas para a plateia","Não retornar ao palco"],
      ans: 1,
      exp: "O agradecimento no palco é o momento solene de respeito mudo e gratidão entre os artistas e o público que os prestigiou."
    },
    {
      q: "Na construção do personagem com a Profª Francis, o que significa o conceito de 'subtexto'?",
      opts: ["O texto que foi apagado com borracha","Os sentimentos, desejos e intenções ocultas que o personagem pensa e sente, mas não diz explicitamente em palavras","Apenas a legenda traduzida","O tamanho da letra no roteiro"],
      ans: 1,
      exp: "O subtexto dá espessura psicológica ao personagem; é o pensamento íntimo que dá vida à voz e ao olhar do ator."
    },
    {
      q: "Qual é o papel fundamental do contra-regra nos bastidores durante o espetáculo teatral?",
      opts: ["Atuar no papel principal","Organizar os objetos de cena nas coxias, auxiliar nas trocas rápidas de adereços e garantir que tudo esteja no lugar exato","Ficar conversando alto no fundo do palco","Vender ingressos na portaria"],
      ans: 1,
      exp: "A equipe de contra-regragem e técnica garante a fluidez invisível e a pontualidade mágica de cada cena teatral."
    },
    {
      q: "Quando as luzes do palco se apagam repentina e completamente para marcar o final de um ato ou troca de cena, esse efeito chama-se:",
      opts: ["Blackout","Fade-in","Spotlight","Refletor difuso"],
      ans: 0,
      exp: "Blackout é a escuridão cênica instantânea que permite a transição dramática ou reposicionamento de elementos cênicos."
    },
    {
      q: "Por que o ator nunca deve cobrir a fala do colega de elenco durante o diálogo em cena?",
      opts: ["Para a plateia poder ouvir e compreender com clareza cada fala, mantendo o ritmo da escuta ativa","Porque o microfone quebra","Para falar sozinho o tempo todo","Não tem problema cobrir a fala"],
      ans: 0,
      exp: "O teatro é a arte da escuta e da contracena; atropelar falas destrói o ritmo e impede o entendimento do público."
    },
    {
      q: "Qual exercício preparatório os atores fazem para destravar a musculatura da boca, língua e mandíbula antes de entrar em cena?",
      opts: ["Trava-línguas rápidos, vibração de lábios ('brrr') e mastigação exagerada (articulação facial)","Gritar sem respirar","Morder gelo","Ficar sem falar durante 3 dias"],
      ans: 0,
      exp: "A ginástica articular aquece os músculos da mímica e garante dicção clara e compreensível até a última fileira do teatro."
    },
    {
      q: "Na improvisação cênica, qual é a famosa regra de ouro que permite à cena evoluir e criar novas situações divertidas e dramáticas?",
      opts: ["Regra do 'Não, nada disso'","Regra do 'Sim, e...' (aceitar a proposta do parceiro de cena e acrescentar um novo elemento à história)","Parar e sair do palco","Esperar alguém soprar a resposta"],
      ans: 1,
      exp: "Ao dizer 'Sim, e...', o ator valida a imaginação do colega e impulsiona a narrativa colaborativa para a frente."
    },
    {
      q: "O que é o 'espaço cênico' no contexto teatral contemporâneo?",
      opts: ["Apenas um palco italiano antigo de madeira","Qualquer lugar onde aconteça o encontro entre o atuante e o espectador (sala, pátio, rua ou palco)","Uma sala sem nenhuma pessoa","Apenas a plateia vazia"],
      ans: 1,
      exp: "O teatro acontece no instante vivo do encontro humano, podendo transformar pátios e praças em espaços poéticos."
    },
    {
      q: "Qual é a atitude de respeito esperada da plateia durante uma apresentação teatral sensível e intimista?",
      opts: ["Manter celulares no modo silencioso, guardar silêncio respeitoso e concentrar-se na narrativa","Ficar tirando fotos com flash nos olhos dos atores","Conversar alto ao telefone","Comer salgadinhos barulhentos no meio da cena"],
      ans: 0,
      exp: "O respeito mútuo e a concentração da plateia sustentam o pacto cênico e a magia da interpretação teatral."
    },
    {
      q: "Em uma peça, a fala em que o personagem expressa seus pensamentos mais profundos falando sozinho em cena chama-se:",
      opts: ["Monólogo (ou solilóquio)","Coral uníssono","Entrevista de rádio","Grito de alarme"],
      ans: 0,
      exp: "O monólogo ou solilóquio revela o íntimo do personagem diretamente aos olhos e corações dos espectadores."
    },
    {
      q: "A Profª Francis ensina que o teatro na formação dos jovens da EDISCA desenvolve sobretudo:",
      opts: ["A timidez e o isolamento","A autoexpressão, a autoconfiança, a empatia e a capacidade de contar as próprias histórias com dignidade","O medo de se expor","A rivalidade cênica"],
      ans: 1,
      exp: "O fazer teatral empodera a voz, o corpo e o pensamento crítico do educando para ser autor da sua própria história."
    }
  ],

  biblioteca: [
    {
      q: "A biblioteca divide os livros por seção. Se temos: Artes, História e Ciências. Em qual prateleira guardamos um livro sobre a 'História do Ballet Moderno'?",
      opts: ["Apenas em História","Na lixeira","Na seção de Artes, subcategoria Dança","Em Ciências"],
      ans: 2,
      exp: "Sendo um tema técnico de dança, ele pertence fundamentalmente ao acervo de Artes/Dança."
    },
    {
      q: "Um livro foi retirado por um aluno que tem prazo de 7 dias para devolver. Ele pegou o livro numa terça-feira. Qual o dia de devolução?",
      opts: ["Domingo","Próxima terça-feira","Sexta-feira","Próxima quarta-feira"],
      ans: 1,
      exp: "Contando 7 dias exatos, o ciclo se fecha no mesmo dia da semana seguinte."
    },
    {
      q: "A ordem correta nas prateleiras segue as letras do alfabeto. Qual sequência está correta?",
      opts: ["Almeida, Costa, Silva, Barros","Almeida, Barros, Costa, Silva","Silva, Costa, Barros, Almeida","Barros, Almeida, Silva, Costa"],
      ans: 1,
      exp: "A-B-C-S é a sequência alfabética correta para facilitar a localização das obras."
    },
    {
      q: "Por que não podemos comer lanches ou beber água perto dos livros do acervo da EDISCA?",
      opts: ["Para a biblioteca não ficar suja","Livros não sentem fome","Farelos atraem insetos que comem papel e líquidos podem manchar e destruir as páginas","Para o bibliotecário não ver"],
      ans: 2,
      exp: "Preservação patrimonial. Livros são frágeis e os resíduos orgânicos os destroem rapidamente."
    },
    {
      q: "Você precisa pesquisar sobre a biografia de Pina Bausch para um trabalho do reforço. Qual a atitude mais eficiente?",
      opts: ["Ler todos os livros da biblioteca até achar","Procurar a bibliotecária e pedir orientação para o catálogo de dança contemporânea","Desistir da pesquisa","Pegar um livro de matemática"],
      ans: 1,
      exp: "A bibliotecária tem o mapa lógico de todo o conhecimento armazenado no local. Sempre peça ajuda!"
    },
    {
      q: "Para encontrar um capítulo específico sobre 'Anatomia do Salto' sem ler o livro inteiro de 300 páginas, qual seção do livro você deve consultar primeiro?",
      opts: ["Capa posterior","Sumário / Índice","Dedicatória","Ficha catalográfica"],
      ans: 1,
      exp: "O Sumário lista os títulos dos capítulos e suas respectivas páginas, economizando tempo de pesquisa."
    },
    {
      q: "Na classificação decimal de bibliotecas, a classe 700 é dedicada às Belas Artes e Recreação. Os livros de Dança ficam na subclassificação 792.8. Onde você procurará uma obra de dança?",
      opts: ["Na prateleira de Matemática (classe 500)","Na prateleira de Artes (classe 700)","Na seção de Culinária","No balcão de recepção"],
      ans: 1,
      exp: "Pelo sistema de catalogação, obras de dança e teatro estão inseridas na grande classe 700 (Artes)."
    },
    {
      q: "A Profª Neile precisa devolver 12 livros organizadamente às estantes. Se ela leva 2 minutos para catalogar e guardar cada livro, em quantos minutos terminará a tarefa?",
      opts: ["12 minutos","20 minutos","24 minutos","30 minutos"],
      ans: 2,
      exp: "12 livros × 2 minutos por livro = 24 minutos para concluir o trabalho."
    },
    {
      q: "Três educandas estão lendo o mesmo livro de 120 páginas para o clube de leitura da EDISCA. Mariana leu a metade, Sophia leu 1/3 e Beatriz leu 1/4. Quem leu mais páginas?",
      opts: ["Mariana (60 pág)","Sophia (40 pág)","Beatriz (30 pág)","Todas leram igual"],
      ans: 0,
      exp: "Mariana leu a metade (120 ÷ 2 = 60 pág). Sophia leu 1/3 (40 pág) e Beatriz leu 1/4 (30 pág). Mariana leu mais."
    },
    {
      q: "Para preservar as obras históricas de dança da biblioteca contra o mofo e o ressecamento, qual o cuidado de conservação recomendado?",
      opts: ["Manter o ambiente arejado, limpo e longe de umidade direta e luz solar forte","Mandar molhar os livros semanalmente","Guardar em sacos plásticos fechados e úmidos","Deixar no chão do pátio"],
      ans: 0,
      exp: "Ventilação adequada, limpeza periódica e controle da luz/umidade preservam as fibras de papel por décadas."
    },
    {
      q: "Na organização da biblioteca, a Profª Mary explica que o 'Sumário' de um livro serve para:",
      opts: ["Listar as palavras difíceis do dicionário","Apresentar a relação dos capítulos ou partes da obra e as respectivas páginas onde se iniciam","Mostrar apenas o preço de venda","Desenhar ilustrações"],
      ans: 1,
      exp: "O sumário é o mapa de navegação do leitor, permitindo localizar rapidamente qualquer seção do livro."
    },
    {
      q: "Qual é a finalidade do marcador de páginas de papel em vez de dobrar a ponta da folha ('orelha de livro')?",
      opts: ["Nenhuma finalidade","Preservar o papel contra vincos permanentes, rasgos e desgastes do acervo público compartilhado","Apenas deixar o livro mais pesado","Apagar o texto escrito"],
      ans: 1,
      exp: "Dobrar as pontas quebra as fibras do papel e degrada os livros; marcadores de fita ou papel conservam o acervo."
    },
    {
      q: "Se a biblioteca da EDISCA conta com 1.200 livros e 25% deles são dedicados às artes, dança e música, quantas obras culturais há no acervo?",
      opts: ["200 livros","250 livros","300 livros","400 livros"],
      ans: 2,
      exp: "25% de 1.200 = 1.200 ÷ 4 = 300 livros dedicados a inspirar os jovens artistas."
    },
    {
      q: "Nas palavras de um dicionário impresso, o que são as 'palavras-guia' localizadas no topo das páginas?",
      opts: ["A primeira e a última palavra daquela página para facilitar a busca rápida em ordem alfabética","Apenas o nome do autor do livro","Palavras que não têm significado","O título do dicionário repetido"],
      ans: 0,
      exp: "As palavras-guia informam o intervalo alfabético coberto pela página aberta, agilizando a consulta."
    },
    {
      q: "Por que é proibido consumir alimentos e bebidas líquidas sobre as mesas de estudo da biblioteca?",
      opts: ["Porque os livros não gostam de cheiro","Para evitar acidentes com derramamento de líquidos e proliferação de insetos (traças e baratas) que devoram o papel","Apenas para incomodar os alunos","Não existe motivo real"],
      ans: 1,
      exp: "Migalhas atraem pragas biológicas e líquidos causam manchas irreversíveis e fungos no papel das obras."
    },
    {
      q: "Quem é o famoso autor cearense de 'O Quinze', clássico da literatura brasileira sobre a seca e a resistência humana?",
      opts: ["Rachel de Queiroz","Clarice Lispector","Monteiro Lobato","Machado de Assis"],
      ans: 0,
      exp: "Rachel de Queiroz publicou 'O Quinze' com apenas 19 anos, sendo a primeira mulher a ingressar na Academia Brasileira de Letras."
    },
    {
      q: "Na catalogação bibliográfica, qual sigla universal designa o número padrão internacional que identifica unicamente cada edição de um livro?",
      opts: ["ISBN (International Standard Book Number)","CPF","RG","CEP"],
      ans: 0,
      exp: "O ISBN é o registro de identidade global de qualquer livro publicado no mundo."
    },
    {
      q: "Ao ler um poema em voz alta, a que o leitor deve prestar atenção para transmitir a musicalidade dos versos?",
      opts: ["Ler o mais rápido possível sem respirar","Ao ritmo das estrofes, às rimas, às pausas poéticas e à entonação expressiva da voz","Gritar todas as palavras","Pular os versos pares"],
      ans: 1,
      exp: "A poesia tem métrica e respiração própria; respeitar as pausas dá sonoridade e emoção aos versos."
    },
    {
      q: "Uma caixa de doação comunitária chegou à biblioteca contendo 45 livros infantojuvenis. Eles foram divididos igualmente em 3 estantes temáticas. Quantos livros foram colocados em cada estante?",
      opts: ["12 livros","15 livros","18 livros","20 livros"],
      ans: 1,
      exp: "45 livros ÷ 3 estantes = 15 obras acolhidas em cada prateleira temática."
    },
    {
      q: "A Profª Mary diz que a leitura é como uma viagem sem sair do lugar porque:",
      opts: ["Faz a pessoa dormir rápido","Expande a imaginação, apresenta novas culturas, amplia o vocabulário e desperta o pensamento crítico","Cansa os olhos sem utilidade","Impede as pessoas de dançar"],
      ans: 1,
      exp: "Livros abrem horizontes e constroem pontes de conhecimento que capacitam o educando para a vida inteira."
    }
  ],

  jardim: [
    {
      q: "Para lavar o pátio externo, a equipe utiliza baldes no lugar da mangueira aberta. Qual é a lógica sustentável dessa atitude?",
      opts: ["Para demorar mais o serviço","Evitar o desperdício de água, preservando um recurso natural e economizando dinheiro da ONG","Porque a mangueira quebrou","Apenas por costume"],
      ans: 1,
      exp: "A mangueira aberta gasta centenas de litros. O uso consciente de água é um pilar da responsabilidade social."
    },
    {
      q: "A coleta seletiva na escola tem as cores: Azul (Papel), Vermelho (Plástico) e Orgânico (Marrom). Onde você joga o copinho de água vazio e a casca de banana, respectivamente?",
      opts: ["Vermelho e Azul","Azul e Marrom","Vermelho e Marrom","Tudo no Azul"],
      ans: 2,
      exp: "Plástico (copinho) vai no vermelho. Restos de comida (casca) vão no marrom (orgânico)."
    },
    {
      q: "Varremos a escola de cima para baixo (do último andar para o térreo). Por que usar essa lógica na faxina?",
      opts: ["Porque é mais fácil descer escadas","Para a sujeira dos andares de cima não cair nas áreas inferiores já limpas","Para não cansar as pernas","Por estética"],
      ans: 1,
      exp: "A gravidade faz com que a poeira sempre desça. Começar de cima garante que o trabalho não tenha que ser refeito."
    },
    {
      q: "O que acontece logicamente se os educandos deixam papeis picados no chão da sala de dança antes de saírem?",
      opts: ["O papel some magicamente","A equipe de limpeza é sobrecarregada, atrasando a liberação da sala para a próxima turma","Nada, é a função deles","O chão fica mais bonito"],
      ans: 1,
      exp: "Manter a limpeza é dever de todos. Se cada turma sujar sem recolher, o cronograma da escola inteira atrasa."
    },
    {
      q: "Um produto de limpeza precisa ser diluído: 1 tampa de produto para 10 litros de água. Se vamos preparar 20 litros, quantas tampas usamos?",
      opts: ["1 tampa","2 tampas","3 tampas","5 tampas"],
      ans: 1,
      exp: "Mantendo a proporção, se dobramos a quantidade de água, dobramos o produto: 2 tampas."
    },
    {
      q: "O Sr. João e o Sr. Clemilson vão organizar as ferramentas no depósito do zelo. Vassouras e rodos devem ser pendurados em suportes de parede em vez de encostados de cabeça para baixo no chão. Por quê?",
      opts: ["Para não deformar as cerdas e aumentar a vida útil do equipamento","Por ser mais bonito","Para esconder dos alunos","Porque o chão é quente"],
      ans: 0,
      exp: "Pendurar vassouras evita o amassamento das cerdas, garantindo eficiência na varrição por muito mais tempo."
    },
    {
      q: "A equipe acabou de passar pano úmido com desinfetante na rampa de acesso. Qual placa de segurança deve ser posicionada no local imediatamente?",
      opts: ["Cuidado: Piso Molhado / Escorregadio","Atenção: Tinta Fresca","Silêncio: Prova em Andamento","Proibido Cães"],
      ans: 0,
      exp: "A sinalização de piso molhado previne quedas e acidentes com alunos e funcionários enquanto o piso seca."
    },
    {
      q: "Dona Fátima e Igor estão podando as plantas do jardim interno da EDISCA. As folhas secas recolhidas devem ter qual destinação ecológica ideal?",
      opts: ["Serem queimadas no pátio","Ir para a composteira para virar adubo orgânico rico em nutrientes","Jogar no esgoto","Guardar na sala de aula"],
      ans: 1,
      exp: "A compostagem transforma resíduos vegetais secos em adubo natural para nutrir as próprias plantas da instituição."
    },
    {
      q: "Ao sair da sala de aula no final da tarde, qual é a atitude sustentável que cada educando deve adotar com os equipamentos?",
      opts: ["Deixar luzes e ar-condicionado ligados","Desligar o ar-condicionado, apagar as luzes e fechar as janelas","Abrir todas as torneiras","Ligar os ventiladores no máximo"],
      ans: 1,
      exp: "A economia de energia elétrica é uma responsabilidade coletiva que preserva recursos financeiros e ambientais."
    },
    {
      q: "Para higienizar 5 salas de aula, a equipe utiliza 1 frasco de desinfetante ecológico. Quantos fracos serão necessários para higienizar todas as 15 salas do complexo?",
      opts: ["2 frascos","3 frascos","4 frascos","5 frascos"],
      ans: 1,
      exp: "15 salas ÷ 5 salas por frasco = 3 frascos necessários para a limpeza completa."
    },
    {
      q: "Qual é o momento do dia mais adequado e sustentável para irrigar as plantas do jardim da EDISCA evitando a evaporação rápida e queimadura das folhas?",
      opts: ["Ao meio-dia sob sol escaldante","No início da manhã ou no final da tarde, quando a temperatura é mais amena e o solo absorve melhor a água","Apenas quando estiver chovendo granizo","Nunca se deve molhar as plantas"],
      ans: 1,
      exp: "Molhar nas horas frescas permite que a água chegue às raízes sem evaporar imediatamente com o calor do sol cearense."
    },
    {
      q: "O Prof. Silva ensina que a cobertura morta (camada de folhas secas ou cascas de árvores sobre a terra do canteiro) serve para:",
      opts: ["Apenas sujar o jardim","Reter a umidade do solo, reduzir a necessidade de regas frequentes e nutrir a terra conforme se decompõe","Impedir que as plantas respirem","Espantar as borboletas"],
      ans: 1,
      exp: "A cobertura morta imita a serapilheira das florestas naturais, protegendo os micro-organismos benéficos da terra."
    },
    {
      q: "Qual inseto polinizador é de vital importância para a fecundação das flores e a frutificação nos jardins e pomares?",
      opts: ["Abelha","Pernilongo","Carrapato","Barata"],
      ans: 0,
      exp: "As abelhas transportam os grãos de pólen de flor em flor, sendo responsáveis pela reprodução de mais de 70% das espécies vegetais."
    },
    {
      q: "Se uma cisterna ecológica do jardim colheu 600 litros de água da chuva e são gastos 50 litros por dia na horta medicinal, para quantos dias de irrigação sustentável essa água será suficiente?",
      opts: ["8 dias","10 dias","12 dias","15 dias"],
      ans: 2,
      exp: "600 litros ÷ 50 litros por dia = 12 dias de rega limpa e sem gastar água potável da rede."
    },
    {
      q: "Qual planta tradicionalmente cultivada em hortas medicinais é conhecida pelo aroma refrescante, propriedades calmantes e uso em chás?",
      opts: ["Hortelã (ou erva-cidreira)","Mamona venenosa","Urtiga brava","Capim seco"],
      ans: 0,
      exp: "A hortelã e a erva-cidreira são plantas aromáticas com comprovadas propriedades digestivas e calmantes."
    },
    {
      q: "Na fotossíntese, as folhas verdes das plantas absorvem gás carbônico e luz solar e liberam para a atmosfera:",
      opts: ["Gás oxigênio puro","Fumaça preta","Monóxido de carbono","Vapor tóxico"],
      ans: 0,
      exp: "A fotossíntese produz o oxigênio que todos os seres vivos respiram, tornando as árvores e jardins pulmões da cidade."
    },
    {
      q: "Um canteiro em formato circular tem 3 metros de raio. O Prof. Silva explica que plantas suculentas (como babosa e cactos) conseguem viver em solos semiáridos porque:",
      opts: ["Não precisam de água nenhuma na vida inteira","Armazenam água em seus caules e folhas carnosas com tecidos adaptados para períodos de estiagem","Têm folhas de plástico","Vivem apenas no escuro"],
      ans: 1,
      exp: "As plantas xerófitas da Caatinga desenvolveram reservas internas de água para prosperar com resiliência."
    },
    {
      q: "Qual é o efeito de misturar adubo orgânico bem curtido da composteira na terra argilosa da horta?",
      opts: ["Envenenar a raiz das mudas","Melhorar a aeração, a drenagem e enriquecer o solo com nutrientes naturais essenciais ao crescimento das hortaliças","Petrificar a terra","Secar as plantas"],
      ans: 1,
      exp: "A matéria orgânica melhora a textura do solo, permitindo que as raízes respirem e absorvam minerais livremente."
    },
    {
      q: "Ao podar galhos secos e folhas amareladas de um arbusto ornamental, o jardineiro está:",
      opts: ["Prejudicando a planta","Estimulando a brotação de novos ramos fortes e direcionando a energia da planta para as partes saudáveis","Destruindo o jardim","Apenas gastando a tesoura"],
      ans: 1,
      exp: "A poda de limpeza remove partes doentes e estimula a circulação de luz e ar entre os ramos."
    },
    {
      q: "O jardim e a horta da EDISCA ensinam aos educandos valores profundos sobre:",
      opts: ["A pressa e o consumo imediato","A paciência de semear, o respeito aos ciclos da natureza, o cuidado coletivo e a sustentabilidade ambiental","O desprezo pela terra","Desperdiçar recursos naturais"],
      ans: 1,
      exp: "Cuidar da terra conecta o ser humano à vida, desenvolvendo paciência, sensibilidade e consciência ecológica planetária."
    }
  ],

  saude: [
    {
      q: "Um bailarino torceu o tornozelo na aula. Para estancar o inchaço nos primeiros 15 minutos, a fisioterapia aplica:",
      opts: ["Bolsa de água quente","Gelo (crioterapia)","Massagear com força","Mandar ele voltar a dançar"],
      ans: 1,
      exp: "O gelo contrai os vasos sanguíneos, diminuindo imediatamente a inflamação e a dor no momento do trauma."
    },
    {
      q: "No setor Social e Saúde, a equipe acompanha quatro educandas. Sabe-se que: Kamilla está com dor no pé; Nikaelly precisa descansar; Isadora está aguardando uma avaliação; e Valentina já foi liberada. Quem deve ser atendida primeiro pela equipe?",
      opts: ["Valentina","Isadora","Kamilla","Nikaelly"],
      ans: 2,
      exp: "Entre as situações apresentadas, Kamilla possui uma queixa física que precisa ser avaliada antes de uma liberação ou orientação."
    },
    {
      q: "O ensaio do espetáculo é intenso e dura 4 horas. A sala é quente. O que deve ser feito logisticamente para evitar desidratação e cãibras?",
      opts: ["Beber apenas no final das 4h","Paradas curtas e programadas para ingestão de água","Beber 3 litros de uma vez","Comer salgado"],
      ans: 1,
      exp: "A hidratação constante mantém os músculos oxigenados e previne lesões durante o esforço extremo."
    },
    {
      q: "Qual postura corporal é ensinada na fisioterapia para proteger a coluna de uma costureira ou funcionário que trabalha muito tempo sentado?",
      opts: ["Sentar na ponta da cadeira com os ombros curvados","Apoiar a lombar no encosto e manter os pés no chão","Cruzar as pernas o dia todo","Sentar no chão"],
      ans: 1,
      exp: "A ergonomia (pés apoiados e coluna reta) distribui o peso do corpo e evita compressões na coluna vertebral."
    },
    {
      q: "Se a psicologia foca na mente e a fisioterapia no corpo, o que significa a expressão 'cuidado integral' praticada na EDISCA?",
      opts: ["Cuidar de um de cada vez em anos diferentes","Entender que o sofrimento mental pode gerar dor física, e tratar o educando como um todo","Apenas focar na dança","Apenas medicar"],
      ans: 1,
      exp: "Corpo e mente estão interligados. A ansiedade pode tencionar o corpo e causar lesões físicas, por isso o cuidado é integrado."
    },
    {
      q: "Um educando sentiu uma cãibra forte na panturrilha durante a aula de dança. O Prof. Rubens orienta qual procedimento de emergência imediato?",
      opts: ["Bater no músculo com força","Alongar suavemente o músculo afetado e hidratar com água","Colocar água quente","Ignorar a dor"],
      ans: 1,
      exp: "O alongamento suave em posição contrária à contração alivia o espasmo muscular, enquanto a água repõe os sais perdidos."
    },
    {
      q: "Antes de subir ao palco para uma apresentação exigente, qual o objetivo principal do aquecimento fisiológico orientado pela Profª Lorena?",
      opts: ["Cansar o corpo dos bailarinos","Elevar a frequência cardíaca, lubrificar as articulações e preparar os músculos para o esforço","Fazer os alunos dormirem","Apenas cumprir horário"],
      ans: 1,
      exp: "O aquecimento aumenta a temperatura muscular e a elasticidade dos tecidos, prevenindo estiramentos e lesões graves."
    },
    {
      q: "Para evitar a fadiga muscular e manter o rendimento acadêmico e artístico, quantas horas de sono por noite são recomendadas pelos profissionais da saúde para jovens em desenvolvimento?",
      opts: ["3 a 4 horas","5 a 6 horas","8 a 9 horas","12 a 14 horas"],
      ans: 2,
      exp: "O sono profundo de 8 a 9 horas é o momento fisiológico indispensável para regeneração celular, consolidação da memória e síntese muscular."
    },
    {
      q: "A Profª Livia está trabalhando técnicas de respiração diafragmática para ansiedade pré-palco. Qual o ritmo respiratório recomendado?",
      opts: ["Inspirar rápido e hiperventilar","Inspirar profundamente pelo nariz expandindo o abdômen, reter 3 segundos e soltar devagar pela boca","Prender a respiração por 2 minutos","Respirar apenas pela boca"],
      ans: 1,
      exp: "A respiração diafragmática lenta estimula o sistema nervoso parassimpático, reduzindo os batimentos cardíacos e acalmando a mente."
    },
    {
      q: "Ao carregar uma mochila pesada com livros ou equipamentos de dança, o Prof. Gabriel da equipe de Social e Saúde ensina qual postura correta evita dores na coluna lombar?",
      opts: ["Usar a mochila pendurada em apenas um ombro","Usar as duas alças bem ajustadas nas costas, distribuindo o peso igualmente nos dois ombros","Segurar a mochila com os dentes","Carregar na ponta dos dedos"],
      ans: 1,
      exp: "Ajustar as duas alças mantém o centro de gravidade alinhado, evitando desvios posturais e escoliose dolorosa."
    },
    {
      q: "Para um jovem bailarino em fase de crescimento e intenso esforço físico, qual é o papel essencial de uma noite regular de sono (8 a 9 horas)?",
      opts: ["Apenas passar o tempo","Regeneração das fibras musculares, liberação do hormônio do crescimento (GH) e consolidação da memória coreográfica e pedagógica","Deixar o corpo preguiçoso","Não tem importância para a saúde"],
      ans: 1,
      exp: "O sono profundo é o momento biológico em que o corpo repara microlesões e o cérebro organiza as aprendizagens do dia."
    },
    {
      q: "Como os educandos devem regular as alças de suas mochilas escolares para prevenir dores e desvios na coluna vertebral?",
      opts: ["Carregar a mochila em um ombro só bem solta até os joelhos","Usar as duas alças ajustadas simetricamente, mantendo o peso próximo às costas e na altura da cintura","Colocar mais de 50% do peso do corpo na mochila","Carregar a mochila na mão com um dedo"],
      ans: 1,
      exp: "Apoiar a mochila em ambos os ombros distribui o peso igualmente sobre a coluna e previne escolioses e dores lombares."
    },
    {
      q: "No setor Social e Saúde, os professores Lorena, Livia, Rubens e Gabriel acolhem educandos que estejam passando por momentos difíceis. Qual é a regra fundamental desse atendimento?",
      opts: ["Fofocar com os colegas de turma","Escuta empática, respeito à singularidade, sigilo profissional e acolhimento afetuoso sem julgamentos","Dizer que a dor do aluno é bobeira","Não dar atenção"],
      ans: 1,
      exp: "A saúde mental e o apoio social exigem um espaço seguro onde cada jovem possa expressar seus sentimentos com dignidade."
    },
    {
      q: "Ao aplicar uma bolsa de gelo em uma contusão muscular recente, por que devemos sempre envolver a bolsa em uma toalha fina?",
      opts: ["Para o gelo não esfriar","Para proteger a pele contra queimaduras térmicas provocadas pelo contato direto e prolongado com o gelo","Para a toalha molhar","Não precisa de toalha"],
      ans: 1,
      exp: "O gelo direto na pele pode causar necrose tecidual e queimaduras pelo frio; a toalha garante uma barreira protetora segura."
    },
    {
      q: "Qual é a postura correta ao escovar os dentes após as refeições oferecidas na escola?",
      opts: ["Escovar com força extrema para sangrar a gengiva","Movimentos suaves e circulares limpando todas as faces dos dentes e da língua, usando fio dental diariamente","Passar a escova em 3 segundos sem pasta","Lavar apenas com refrigerante"],
      ans: 1,
      exp: "A higiene bucal criteriosa evita cáries e gengivites, preservando a mastigação e a saúde integral do organismo."
    },
    {
      q: "Um educando sentiu tontura após um ensaio intenso de salto no calor. Qual é a conduta inicial orientada pela equipe de saúde?",
      opts: ["Mandar o aluno correr mais rápido no sol","Acomodar o educando em local ventilado e à sombra, elevar ligeiramente as pernas e oferecer água fresca em pequenos goles","Dar comida muito pesada e gordurosa","Deixar o aluno sozinho no chão"],
      ans: 1,
      exp: "Elevar as pernas facilita o retorno venoso de sangue para o cérebro e a reidratação gradual restabelece a pressão arterial."
    },
    {
      q: "A equipe de assistência social da EDISCA atua em rede com serviços públicos da cidade. Qual órgão é parceiro na garantia de direitos fundamentais da infância e adolescência?",
      opts: ["O Conselho Tutelar e os Centros de Referência de Assistência Social (CRAS)","Apenas lojas comerciais","Empresas de propaganda","Nenhum órgão público"],
      ans: 0,
      exp: "A articulação com o Conselho Tutelar e o CRAS fortalece a rede de proteção integral das famílias atendidas."
    },
    {
      q: "Por que o aquecimento corporal deve ser sempre acompanhado de um desaquecimento (volta à calma com alongamentos suaves) ao final da aula de dança?",
      opts: ["Para o bailarino não ir embora","Para desacelerar a frequência cardíaca suavemente, relaxar tensões musculares agudas e restabelecer o equilíbrio fisiológico","Porque não há mais o que fazer","Para esfriar o corpo de repente"],
      ans: 1,
      exp: "A volta à calma gradual normaliza a pressão, dissipa o ácido lático e reduz dores musculares no dia seguinte."
    },
    {
      q: "Qual é a atitude correta diante de um colega que esteja triste ou calado durante o intervalo das atividades?",
      opts: ["Apontar o dedo e rir dele","Aproximar-se com delicadeza, oferecer um abraço ou conversa solidária e, se necessário, avisar à equipe do Social e Saúde","Ignorar totalmente","Fazer piadas ofensivas"],
      ans: 1,
      exp: "A solidariedade e o cuidado mútuo entre educandos são valores que constroem uma comunidade protetora e fraterna."
    },
    {
      q: "O que a Organização Mundial da Saúde (OMS) define como 'Saúde'?",
      opts: ["Apenas não estar no hospital","Um estado completo de bem-estar físico, mental e social, e não apenas a mera ausência de doenças ou enfermidades","Ter muitos músculos sem afeto","Comer apenas saladas sem amigos"],
      ans: 1,
      exp: "A saúde é holística e integral: mente, corpo, vínculos comunitários e dignidade social caminhando juntos."
    }
  ],

  ti: [
    {
      q: "Um computador da secretaria perdeu a conexão com a internet, enquanto o restante da escola navega normalmente. Qual o primeiro passo de suporte lógico?",
      opts: ["Reinstalar o sistema operacional","Verificar se o cabo de rede está firmemente conectado atrás do computador","Ligar para a provedora reclamando de queda total","Comprar uma máquina nova"],
      ans: 1,
      exp: "A verificação das conexões físicas de cabo e Wi-Fi locais deve anteceder qualquer formatação ou análise complexa."
    },
    {
      q: "Para garantir a integridade dos dados dos alunos contra ataques e vírus invasores na rede da EDISCA, qual ferramenta deve ser mantida ativa?",
      opts: ["Calculadora","Navegador em modo privado","Antivírus e Firewall atualizados","Software de edição de imagem"],
      ans: 2,
      exp: "O Antivírus combinado ao Firewall ativo previne, detecta e bloqueia ameaças digitais que tentam infectar os computadores."
    },
    {
      q: "O setor financeiro precisa garantir que as planilhas e relatórios vitais da EDISCA não sejam perdidos em caso de falha do computador. O que recomenda?",
      opts: ["Salvar tudo na lixeira para ocultar","Configurar backups automáticos diários em nuvem protegida","Anotar tudo em guardanapos","Deixar o computador ligado para sempre"],
      ans: 1,
      exp: "Backups frequentes e automáticos na nuvem garantem que os dados históricos da ONG estejam seguros de acidentes técnicos."
    },
    {
      q: "A secretaria recebe um e-mail com o título 'Urgente: Altere sua senha clicando neste link' enviado por um endereço desconhecido. O que fazer?",
      opts: ["Clicar correndo e digitar a senha de administrador","Não clicar, alertar o Prof. Vinicius de TI e marcar como spam/phishing","Encaminhar para o grupo de pais","Excluir o computador"],
      ans: 1,
      exp: "Ataques de Phishing tentam enganar usuários com urgências falsas. Desconfie, não clique e acione o suporte de TI."
    },
    {
      q: "Se temos um plano de banda de internet de 600 Megas e precisamos distribuí-la igualmente entre 6 salas com computadores de aula. Quanto cada sala recebe?",
      opts: ["50 Megas","100 Megas","150 Megas","600 Megas"],
      ans: 1,
      exp: "Dividindo 600 Megas de banda por 6 setores, obtemos 100 Megas por setor para garantir conectividade estável para todos."
    },
    {
      q: "O Prof. Vinicius precisa criar uma senha segura para o roteador principal da EDISCA. Qual das opções abaixo representa uma senha forte?",
      opts: ["123456","edisca2026","Ed!sc4#2026$Secure","senha"],
      ans: 2,
      exp: "Senhas fortes combinam letras maiúsculas e minúsculas, números e caracteres especiais, dificultando ataques automatizados."
    },
    {
      q: "Diante de uma tempestade com fortes raios na região, qual a orientação preventiva do setor de TI para proteger os computadores das salas de aula?",
      opts: ["Deixar todos na tomada renderizando vídeos","Desconectar os computadores da tomada e do cabo de rede","Aumentar o brilho da tela","Ligar mais extensões na tomada"],
      ans: 1,
      exp: "Picos de tensão provocados por raios podem queimar placas-mãe. Desconectar os cabos protege o patrimônio contra surtos elétricos."
    },
    {
      q: "A impressora da recepção parou de imprimir os formulários. O painel indica 'Sem Papel', mas a gaveta está cheia de folhas. Qual o diagnóstico lógico do Prof. Vinicius?",
      opts: ["A impressora queimou para sempre","Sensor de presença de papel obstruído ou papel atolado na bandeja","A internet caiu","Falta de tinta no cartucho"],
      ans: 1,
      exp: "Atolamento de papel ou sujeira no sensor ótico são os motivos mais comuns para falsos alertas de falta de papel."
    },
    {
      q: "Para proteger os olhos contra o cansaço visual após horas preparando aulas digitais, o Prof. Vinicius ensina a regra '20-20-20'. Ela orienta a:",
      opts: ["Ficar 20 horas sem piscar","A cada 20 minutos de tela, olhar para algo a 20 pés (6 metros) de distância por 20 segundos","Comprar 20 óculos escuros","Desligar o monitor por 20 dias"],
      ans: 1,
      exp: "Pausar o foco em objetos distantes relaxa a musculatura ciliar dos olhos, reduzindo o ressecamento e a fadiga ocular."
    },
    {
      q: "Em um laboratório com 20 computadores, se 4 máquinas apresentam tela azul de erro de disco ao ligar, qual a porcentagem de computadores funcionando perfeitamente?",
      opts: ["70%","75%","80%","85%"],
      ans: 2,
      exp: "20 máquinas - 4 com erro = 16 operacionais. 16 em 20 equivale a 80% dos computadores funcionando."
    },
    {
      q: "No laboratório de informática, a Profª Luana explica a diferença entre Hardware e Software. Qual das alternativas é um exemplo de Hardware?",
      opts: ["O sistema operacional Windows ou Linux","O teclado, o mouse, a memória RAM e a placa-mãe física do computador","Um jogo de computador digital","Um arquivo de texto .docx"],
      ans: 1,
      exp: "Hardware é a parte física tangível da máquina; Software são os programas, aplicativos e dados digitais."
    },
    {
      q: "Ao receber um e-mail ou mensagem com link estranho prometendo 'prêmios milionários imediatos', qual é a atitude cibernética correta?",
      opts: ["Clicar imediatamente e digitar todas as senhas pessoais","Não clicar no link, desconfiar de tentativa de 'phishing' (golpe digital) e avisar ao responsável de TI","Encaminhar para todos os amigos da escola","Desligar o monitor e achar que sumiu"],
      ans: 1,
      exp: "Links maliciosos de phishing visam roubar dados pessoais e instalar vírus; a desconfiança previne incidentes de segurança."
    },
    {
      q: "Qual é a distância recomendada entre os olhos do educando e a tela do monitor para evitar fadiga visual e dores de cabeça?",
      opts: ["10 centímetros colado na tela","Cerca de 50 a 70 centímetros (aproximadamente a distância de um braço estendido)","5 metros de distância","Olhar no escuro total colado ao vidro"],
      ans: 1,
      exp: "A distância ergonômica de 50 a 70 cm protege a visão e reduz o esforço acomodativo dos músculos oculares."
    },
    {
      q: "Qual atalho clássico de teclado é utilizado em computadores para salvar rapidamente as alterações de um documento sem perder o progresso?",
      opts: ["Ctrl + S (ou Ctrl + B em certos programas)","Alt + F4","Ctrl + Z","Shift + Delete"],
      ans: 0,
      exp: "Salvar frequentemente (Ctrl + S) protege os trabalhos contra desligamentos imprevistos ou falhas de energia."
    },
    {
      q: "Por que nunca devemos jogar água ou borrifar líquidos diretamente sobre as telas e teclados dos computadores?",
      opts: ["Porque os computadores têm medo de água","Porque o líquido penetra nos circuitos eletrônicos internos, causando curto-circuito e queima permanente dos componentes","Para a máquina ficar limpa","Apenas para não molhar a mesa"],
      ans: 1,
      exp: "Equipamentos eletrônicos devem ser higienizados apenas com panos de microfibra secos ou levemente umedecidos com álcool isopropílico apropriado."
    },
    {
      q: "O que é 'Nuvem' (Cloud Storage) no contexto do armazenamento de arquivos digitais institucionais da EDISCA?",
      opts: ["A fumaça que sai do processador quente","Servidores remotos e seguros acessíveis via internet que guardam dados com cópias de segurança","Uma nuvem de chuva no céu","Um pen drive enterrado no chão"],
      ans: 1,
      exp: "O armazenamento em nuvem permite sincronizar arquivos com segurança e acessá-los de qualquer dispositivo autorizado."
    },
    {
      q: "Um arquivo de música MP3 de alta qualidade tem cerca de 8 MB. Se temos um espaço livre de 80 MB, quantas músicas completas desse tamanho podemos armazenar?",
      opts: ["5 músicas","8 músicas","10 músicas","12 músicas"],
      ans: 2,
      exp: "80 MB ÷ 8 MB por faixa musical = 10 músicas completas para inspirar os ensaios."
    },
    {
      q: "Qual comportamento na internet caracteriza o 'Ciberbullying', prática inaceitável combatida na EDISCA?",
      opts: ["Elogiar os colegas em comentários","Usar a internet, grupos ou redes sociais para ofender, intimidar, excluir ou espalhar boatos sobre alguém","Pesquisar livros na biblioteca online","Aprender a programar jogos educativos"],
      ans: 1,
      exp: "O ciberbullying causa sofrimento profundo e deve ser combatido com empatia, denúncia aos coordenadores e respeito digital."
    },
    {
      q: "Qual é a função do processador (CPU - Unidade Central de Processamento) em um computador?",
      opts: ["Apenas apoiar o monitor","Executar instruções lógicas, cálculos matemáticos e coordenar as operações de todo o sistema do computador","Produzir som na caixa acústica","Pintar a carcaça de plástico"],
      ans: 1,
      exp: "A CPU é considerada o cérebro da máquina, processando milhões de instruções por segundo."
    },
    {
      q: "A inclusão digital na EDISCA tem como objetivo central:",
      opts: ["Fazer os alunos ficarem o dia inteiro jogando sem conversar","Democratizar o acesso à tecnologia, capacitar para a pesquisa científica e abrir portas para o futuro profissional e acadêmico dos jovens","Substituir o contato humano","Apenas gastar eletricidade"],
      ans: 1,
      exp: "O domínio da tecnologia é uma ferramenta de cidadania e autonomia no mundo contemporâneo."
    }
  ],

  brecho: [
    {
      q: "Ao receber uma sacola cheia de doações no Brechó Segundo Ato, qual é o fluxo lógico inicial de processamento?",
      opts: ["Vender na calçada imediatamente","Fazer a triagem (verificar estado, higienizar, definir preço justo e etiquetar)","Guardar em caixas sem abrir","Devolver ao doador"],
      ans: 1,
      exp: "A triagem profissional garante que apenas roupas excelentes e limpas fiquem nas araras, valorizando o brechó."
    },
    {
      q: "Um cliente compra uma jaqueta de R$ 35,00 e um cinto de R$ 15,00. Ele paga com uma nota de R$ 100,00. Quanto você deve devolver de troco?",
      opts: ["R$ 30,00","R$ 40,00","R$ 50,00","R$ 60,00"],
      ans: 2,
      exp: "O total da compra é R$ 50,00 (35 + 15). Portanto, o troco exato a ser devolvido é de R$ 50,00."
    },
    {
      q: "No controle do Brechó Segundo Ato, Marina registrou: 'Todas as peças da arara azul são vestidos'. Ao verificar a arara, encontrou uma camisa azul. O que podemos concluir?",
      opts: ["O registro está incorreto","A camisa não existe","Todos os vestidos sumiram","A arara azul está vazia"],
      ans: 0,
      exp: "Se uma camisa foi encontrada na arara azul, então a informação de que todas as peças eram vestidos não pode estar correta."
    },
    {
      q: "A filosofia do nosso Brechó Segundo Ato é fortemente focada em moda sustentável. Ela se apoia em quais conceitos fundamentais?",
      opts: ["Acumular, ostentar e descartar","Reduzir o consumo desenfreado, Reutilizar peças e Reciclar materiais","Copiar, costurar e raspar","Esquecer, perder e comprar"],
      ans: 1,
      exp: "Reduzir, Reutilizar e Reciclar formam a base da economia circular e sustentável praticada em nosso brechó."
    },
    {
      q: "Todo o dinheiro arrecadado com as vendas diárias das peças do Brechó Segundo Ato é revertido para:",
      opts: ["Comprar itens de luxo para a secretaria","Financiar passagens, adereços, figurinos e lanches para as apresentações de vocês","A conta pessoal da gerência","Dividir igualmente entre marcas famosas"],
      ans: 1,
      exp: "O brechó é uma iniciativa social. Todo o lucro alimenta diretamente o sonho e o desenvolvimento dos nossos educandos."
    },
    {
      q: "O Prof. Pedro precisa organizar uma arara com 24 cabides por tamanho de vestuário: PP, P, M, G. Se há exatamente a mesma quantidade de roupas para cada um dos 4 tamanhos, quantas peças há por tamanho?",
      opts: ["4 peças","6 peças","8 peças","12 peças"],
      ans: 1,
      exp: "Dividindo 24 peças por 4 tamanhos (24 ÷ 4), temos 6 peças de cada tamanho perfeitamente alinhadas."
    },
    {
      q: "A Profª Marina precificou 3 saias seminovas por R$ 20,00 cada. Se uma cliente decide levar as 3 saias e recebe um desconto promocional de 10%, qual o valor final pago por ela?",
      opts: ["R$ 50,00","R$ 54,00","R$ 56,00","R$ 60,00"],
      ans: 1,
      exp: "Valor sem desconto: 3 × R$ 20,00 = R$ 60,00. Desconto de 10% (R$ 6,00): R$ 60,00 - R$ 6,00 = R$ 54,00."
    },
    {
      q: "O conceito de 'Upcycling' praticado em oficinas de moda do Brechó Segundo Ato consiste em:",
      opts: ["Queimar roupas velhas","Transformar peças descartadas ou tecidos retalhados em produtos novos com maior valor estético e utilitário","Comprar roupas novas no shopping","Vender tecidos rasgados"],
      ans: 1,
      exp: "Upcycling é a reutilização criativa que dá uma 'segunda vida' e novo valor a materiais que iriam para o lixo."
    },
    {
      q: "No balanço mensal do brechó, foram vendidas 50 peças na primeira semana, 40 na segunda semana, 60 na terceira semana e 50 na quarta semana. Qual a média semanal de vendas?",
      opts: ["45 peças","50 peças","55 peças","60 peças"],
      ans: 1,
      exp: "Soma total: 50 + 40 + 60 + 50 = 200 peças. Média: 200 ÷ 4 semanas = 50 peças por semana."
    },
    {
      q: "Por que separar as roupas doadas por cor e tipo de tecido antes da lavagem e higienização é uma etapa indispensável no Brechó?",
      opts: ["Apenas por estética na lavanderia","Para evitar que tecidos coloridos soltem tinta e manchem peças claras, preservando a qualidade","Porque a máquina de lavar exige","Não faz diferença"],
      ans: 1,
      exp: "A triagem por cor e tecido evita acidentes de tingimento e desgastes desnecessários nas peças doadas."
    },
    {
      q: "A Profª Gorete explica que adquirir roupas no brechó social ajuda a economizar recursos do planeta. Quantos litros de água, aproximadamente, são necessários para fabricar uma única calça jeans nova na indústria?",
      opts: ["10 litros","50 litros","Cerca de 8.000 a 10.000 litros de água","Nenhum litro"],
      ans: 2,
      exp: "A indústria têxtil tradicional consome até 10.000 litros de água para produzir uma única calça jeans desde a plantação do algodão até o tingimento."
    },
    {
      q: "No Brechó Solidário da EDISCA, uma jaqueta customizada custa R$ 30,00 e uma camiseta custa R$ 15,00. Quanto pagará um apoiador que comprar uma peça de cada?",
      opts: ["R$ 35,00","R$ 40,00","R$ 45,00","R$ 50,00"],
      ans: 2,
      exp: "R$ 30,00 + R$ 15,00 = R$ 45,00 que serão integralmente revertidos para os programas da instituição."
    },
    {
      q: "Ao receber caixas de roupas doadas pela comunidade, qual é o primeiro trabalho de triagem feito pela equipe do brechó?",
      opts: ["Colocar na arara sem conferir","Inspecionar o estado de conservação das peças (costuras, botões, zíperes), higienizar com carinho e classificar por tamanho e categoria","Vender as roupas sujas","Descartar todas as doações"],
      ans: 1,
      exp: "A triagem e o carinho na preparação demonstram respeito tanto aos doadores quanto aos novos usuários das peças."
    },
    {
      q: "O conceito de 'Upcycling' (reaproveitamento criativo de tecidos) significa:",
      opts: ["Jogar sobras de pano no lixo comum","Transformar sobras de tecidos e roupas antigas em novos produtos de maior valor estético e utilitário (como bolsas, nécessaires e figurinos)","Comprar mais roupas descartáveis","Queimar tecidos velhos"],
      ans: 1,
      exp: "O upcycling dá nova vida a resíduos têxteis por meio do design inteligente e sustentável."
    },
    {
      q: "Por que as araras de roupas no brechó são organizadas por cores e tamanhos padronizados (P, M, G, Infantil)?",
      opts: ["Para dificultar a busca dos clientes","Facilitar a localização das peças, proporcionando uma experiência de compra agradável, acolhedora e organizada","Porque todas as roupas são iguais","Apenas por passatempo"],
      ans: 1,
      exp: "A organização visual valoriza o espaço social e permite que cada pessoa encontre o que precisa com dignidade e rapidez."
    },
    {
      q: "Qual tecido de fibra natural é conhecido por ser respirável, macio e ideal para as roupas de prática de dança no clima quente de Fortaleza?",
      opts: ["Algodão","Plástico puro","Nylon impermeável pesado","Lã grossa de inverno"],
      ans: 0,
      exp: "O algodão absorve a transpiração e permite a circulação de ar, sendo muito confortável para a movimentação corporal."
    },
    {
      q: "Se um cliente comprou 3 sapatilhas de brechó a R$ 12,00 cada, qual foi o total da compra?",
      opts: ["R$ 24,00","R$ 30,00","R$ 36,00","R$ 42,00"],
      ans: 2,
      exp: "3 sapatilhas × R$ 12,00 = R$ 36,00 arrecadados para sapatilhas e lanches dos alunos."
    },
    {
      q: "A moda sustentável e circular contrapõe-se ao 'Fast Fashion' (moda rápida descartável). Qual é o problema do Fast Fashion no mundo?",
      opts: ["Gera toneladas de poluição, exploração precarizada de trabalho e descarte massivo de roupas após pouquíssimos usos","Não gera nenhum problema","Faz as roupas durarem para sempre","Economiza recursos ambientais"],
      ans: 0,
      exp: "O modelo de consumo descartável polui rios e oceanos; reutilizar roupas em brechós é um ato político e ecológico."
    },
    {
      q: "No fechamento do caixa do brechó, havia 4 notas de R$ 50,00, 3 notas de R$ 20,00 e 2 notas de R$ 10,00. Qual foi o total apurado?",
      opts: ["R$ 250,00","R$ 270,00","R$ 280,00","R$ 300,00"],
      ans: 2,
      exp: "(4 × 50 = 200) + (3 × 20 = 60) + (2 × 10 = 20) = R$ 280,00 em caixa registrado com transparência."
    },
    {
      q: "A Profª Gorete diz que quem compra no Brechó Solidário pratica uma 'Economia do Afeto'. Por quê?",
      opts: ["Porque cada peça comprada financia a educação, os figurinos e o futuro brilhante dos jovens da EDISCA","Porque as roupas vêm sem preço","Porque é uma loja comercial comum","Porque ninguém precisa pagar"],
      ans: 0,
      exp: "Comprar no brechó comunitário une sustentabilidade ecológica à solidariedade humana direta."
    }
  ],

  comunicacao: [
    {
      q: "Temos um post marcado para lançar a venda de ingressos do novo espetáculo. Que elementos visuais e textuais são obrigatórios?",
      opts: ["Apenas uma foto desfocada dos bastidores","Texto claro informando Local, Data, Horário, Valores e Link de compra","O signo de todos os bailarinos","Uma mensagem misteriosa sem explicação"],
      ans: 1,
      exp: "Toda postagem informativa precisa de clareza, facilitando o acesso direto e tirando todas as dúvidas do público rapidamente."
    },
    {
      q: "Um internauta faz um comentário agressivo nas redes sociais oficiais da EDISCA. Qual a diretriz de resposta institucional?",
      opts: ["Bater boca e responder no mesmo tom","Excluir sem ler e fingir que não viu","Responder com cordialidade, mantendo o tom pacífico e focado na verdade educativa da escola","Expor os dados pessoais dele"],
      ans: 2,
      exp: "Manter o profissionalismo e a educação, mesmo diante de críticas agressivas, protege a reputação integradora da EDISCA."
    },
    {
      q: "Queremos filmar os ensaios de dança para divulgar nossa rotina no Instagram. Juridicamente, o que a Comunicação deve assegurar?",
      opts: ["Que todos usem câmeras importadas","Ter as assinaturas válidas de Autorização de Uso de Imagem e Voz dos responsáveis","Que as salas estejam pintadas de dourado","Não há qualquer restrição para postar menores"],
      ans: 1,
      exp: "O uso de imagem de crianças e adolescentes deve ser sempre documentado e autorizado previamente pelos responsáveis legais."
    },
    {
      q: "Um vídeo nosso sobre superação alcançou 5.000 visualizações e 50 compartilhamentos. Uma foto teve 4.000 curtidas. O que indica maior engajamento ativo?",
      opts: ["A foto","O vídeo, pois o compartilhamento multiplica a mensagem organicamente","Empate técnico passivo","Nenhum valorizou a marca"],
      ans: 1,
      exp: "O ato de compartilhar expande a rede e espalha a mensagem institucional de forma ativa, multiplicando o impacto social."
    },
    {
      q: "Qual o foco das nossas campanhas de Marketing de Causa elaboradas na EDISCA?",
      opts: ["Vender serviços comerciais","Sensibilizar e atrair doadores mostrando as vidas transformadas através da nossa arte-educação","Desmerecer projetos concorrentes","Aumentar os lucros de grandes marcas privadas"],
      ans: 1,
      exp: "O marketing social atua para ligar investidores que acreditam no potencial humano aos nossos projetos de inclusão social."
    },
    {
      q: "A Profª Isabelle precisa enviar um Press Release (comunicado de imprensa) aos jornais sobre a estreia da nova temporada de dança. Qual deve ser a estrutura da primeira frase (Lead)?",
      opts: ["Uma poesia sem dados","Responder às perguntas essenciais: Quem, O quê, Quando, Onde e Por quê","Apenas a assinatura do fotógrafo","Contar a história desde a infância dos professores"],
      ans: 1,
      exp: "O Lead jornalístico condensa no primeiro parágrafo as respostas cruciais para captar a atenção imediata da imprensa."
    },
    {
      q: "Ao publicar artes gráficas no Instagram e no site oficial da EDISCA, a equipe de Comunicação deve manter a identidade visual usando:",
      opts: ["Cores aleatórias que mudam a cada post sem padrão","A paleta de cores oficial, logotipo padronizado e tipografia institucional da EDISCA","Apenas imagens em preto e branco sem logo","Desenhos sem relação com a dança"],
      ans: 1,
      exp: "A consistência de paleta, logo e fontes fortalece o reconhecimento da marca institucional pelo público leitor."
    },
    {
      q: "Para garantir acessibilidade digital em postagens com imagens dos espetáculos, a equipe deve incluir nas redes sociais:",
      opts: ["Texto alternativo descritivo da imagem (#PraCegoVer / legenda alt)","Músicas muito altas","Letras piscantes","Nenhum recurso extra"],
      ans: 0,
      exp: "O texto alternativo garante que leitores de tela descrevam o conteúdo visual para pessoas com deficiência visual."
    },
    {
      q: "Uma postagem de convocação de testes para novos bailarinos precisa ser publicada com antecedência. Se a seleção ocorrerá no dia 20 de Maio, qual a data ideal para o lançamento da campanha?",
      opts: ["No dia 20 de Maio, 10 minutos antes","Com 2 a 3 semanas de antecedência, dando tempo para a mensagem circular e as inscrições serem feitas","Três meses após o evento","Não divulgar"],
      ans: 1,
      exp: "A divulgação com antecedência estratégica garante tempo suficiente para que os jovens e famílias tomem conhecimento e se organizem."
    },
    {
      q: "Na análise de métricas digitais da EDISCA, o que significa a taxa de 'Alcance' de uma publicação?",
      opts: ["A quantidade total de dinheiro gasta","O número de contas/pessoas únicas que viram a publicação na tela","O número de vezes que a imagem foi salva no computador","A quantidade de comentários negativos"],
      ans: 1,
      exp: "'Alcance' mede a quantidade de pessoas individuais impactadas diretamente pelo conteúdo divulgado."
    },
    {
      q: "A Profª Rafaela explica que, no jornalismo institucional da EDISCA, a técnica do 'Lead' na primeira frase de uma notícia responde a seis perguntas clássicas. Quais são elas?",
      opts: ["Apenas 'Quem' e 'Quando'","Quem? O quê? Onde? Quando? Por quê? e Como?","Qual o preço? Onde comprar? Quem vendeu?","Nenhuma pergunta"],
      ans: 1,
      exp: "O lead jornalístico resume as informações essenciais logo na abertura para informar com clareza e precisão o leitor."
    },
    {
      q: "Ao fotografar bailarinos em movimento no palco, qual ajuste técnico na câmera ajuda a 'congelar' o salto no ar sem que a foto fique borrada?",
      opts: ["Velocidade de obturador rápida (como 1/500s ou 1/1000s)","Obturador muito lento de 5 segundos","Desligar a lente","Fotografar com a tampa na câmera"],
      ans: 0,
      exp: "Uma alta velocidade de disparo captura frações de segundo velozes, congelando a forma escultórica do salto no ar."
    },
    {
      q: "Qual é o objetivo principal de manter a identidade visual (logos, cores harmônicas e tipografia) consistente em todas as publicações da escola?",
      opts: ["Apenas para gastar tinta","Fortalecer o reconhecimento público, a credibilidade e a memória afetiva da marca institucional EDISCA","Deixar tudo monocromático","Não possui utilidade"],
      ans: 1,
      exp: "A coerência visual transmite profissionalismo e identidade clara em todas as mídias e materiais impressos."
    },
    {
      q: "Se um vídeo de divulgação do espetáculo teve 1.500 visualizações e 20% das pessoas compartilharam em suas redes, quantos compartilhamentos foram feitos?",
      opts: ["150 compartilhamentos","200 compartilhamentos","300 compartilhamentos","450 compartilhamentos"],
      ans: 2,
      exp: "20% de 1.500 = (20 × 1.500) ÷ 100 = 300 compartilhamentos expandindo a arte pelo mundo."
    },
    {
      q: "Em uma entrevista com um jovem educando sobre suas conquistas, como o repórter da comunicação deve se portar?",
      opts: ["Interromper o educando a cada palavra","Ouvir com empatia, demonstrar respeito, fazer perguntas abertas e valorizar a voz autêntica e protagonista do jovem","Inventar respostas que o jovem não disse","Apressar o entrevistado"],
      ans: 1,
      exp: "A comunicação não-violenta e ética coloca o educando como verdadeiro sujeito e protagonista de sua própria fala."
    },
    {
      q: "Qual é o papel da 'Assessoria de Imprensa' na equipe de comunicação da EDISCA?",
      opts: ["Esconder as apresentações do público","Construir pontes com jornais, televisões e portais para divulgar os espetáculos e as histórias de superação dos alunos","Vender anúncios em revistas","Fazer cobranças financeiras"],
      ans: 1,
      exp: "A assessoria de imprensa atrai visibilidade positiva para a causa social da instituição na grande mídia."
    },
    {
      q: "Ao diagramar um cartaz de espetáculo, por que é fundamental manter áreas de 'espaço em branco' (respiro visual)?",
      opts: ["Para não poluir o cartaz, facilitando a leitura hierárquica das informações principais (data, local e horário)","Porque faltou texto para escrever","Para economizar tinta preta","Não se deve deixar espaços em branco"],
      ans: 0,
      exp: "O respiro visual orienta o olhar do leitor sem sobrecarga cognitiva, destacando o que é mais importante."
    },
    {
      q: "Nas redes sociais, o que significa engajamento ético e consciente?",
      opts: ["Comprar seguidores falsos","Construir uma comunidade real de pessoas que dialogam, apoiam e propagam os valores de cidadania e arte da instituição","Publicar ofensas e discórdia","Ignorar os comentários"],
      ans: 1,
      exp: "O engajamento autêntico cria laços duradouros com apoiadores que acreditam na transformação humana pela arte."
    },
    {
      q: "Qual formato de áudio e conteúdo em episódios tem se tornado uma grande ferramenta de debate cultural e reflexão entre jovens?",
      opts: ["Podcast","Telegrama de papel","Fax de escritório","Código Morse"],
      ans: 0,
      exp: "Podcasts em plataformas de áudio permitem aprofundar temas pedagógicos e dar voz aos educadores e estudantes."
    },
    {
      q: "A comunicação da EDISCA busca sempre mostrar os jovens da comunidade sob qual perspectiva?",
      opts: ["Sob a ótica da caridade passiva e do coitadismo","Sob a ótica da potência criativa, da beleza, do talento, do protagonismo e da dignidade humana","Como pessoas sem futuro","Apenas como números estatísticos"],
      ans: 1,
      exp: "A narrativa da EDISCA é de potência e dignidade: o educando é um artista e cidadão pleno de direitos e grandiosidade."
    }
  ],

  refeitorio: [
    {
      q: "Nosso estoque de feijão tem previsão de durar 10 dias. O processo de compra e entrega do fornecedor leva 14 dias. O que fazer de forma planejada?",
      opts: ["Aguardar acabar e deixar os alunos sem feijão por 4 dias","Iniciar o processo de compra imediatamente ou antecipar o pedido no fornecedor","Mudar o cardápio para doce","Pedir doação de emergência no dia 10"],
      ans: 1,
      exp: "A boa gestão prevê o ponto de pedido mínimo baseado no tempo de entrega (Lead Time), impedindo desabastecimento."
    },
    {
      q: "Temos caixas de leite que vencem em julho e outras que vencem em setembro. Como a Jaqueline deve organizar a entrada e saída da dispensa?",
      opts: ["Colocar as de setembro na frente das de julho","O sistema PVPS: Primeiro que Vence, Primeiro que Sai (julho na frente)","Deixar os cozinheiros escolherem por cor","Empilhar na ordem de recebimento sem olhar a validade"],
      ans: 1,
      exp: "O PVPS garante o uso racional dos insumos, minimizando perdas financeiras e de suprimentos por prazo de validade expirado."
    },
    {
      q: "Comprei 10 caixas de óleo por um custo total de R$ 120,00. Qual o valor individual de custo que será lançado na contabilidade por caixa?",
      opts: ["R$ 10,00","R$ 12,00","R$ 15,00","R$ 20,00"],
      ans: 1,
      exp: "Custo total dividido pela quantidade de caixas: R$ 120,00 / 10 = R$ 12,00 por caixa lançada no controle."
    },
    {
      q: "A Jaqueline precisa manter todas as notas fiscais e relatórios de compra organizados. Qual o propósito disso?",
      opts: ["Usar de rascunho nas oficinas","Prestar contas de forma transparente aos patrocinadores e auditores fiscais da ONG","Nenhum, ela guarda por apego","Criar volume na gaveta"],
      ans: 1,
      exp: "A EDISCA depende de repasses sociais e auditorias rígidas. A organização fiscal é sinônimo de transparência institucional."
    },
    {
      q: "Para o preparo diário do almoço, sabemos que cada aluno consome 200g de alimento. Temos 150 alunos confirmados para o almoço. Quantos quilos devemos preparar para evitar desperdícios?",
      opts: ["15 kg","30 kg","45 kg","150 kg"],
      ans: 1,
      exp: "150 alunos x 200g = 30.000g de comida total, o que equivale a 30 kg exatos de alimentação de qualidade."
    },
    {
      q: "A Profª Jaqueline está arrumando a estante de suprimentos secos. Sacos de arroz e feijão não devem ser encostados diretamente no chão de cimento. Por qual exigência sanitária?",
      opts: ["Estética de organização","Evitar a umidade do solo e a contaminação por pragas urbanas (devendo ficar sobre paletes elevados)","Facilitar a contagem","Por falta de espaço"],
      ans: 1,
      exp: "O armazenamento sobre paletes elevados a pelo menos 15 cm do piso impede a transferência de umidade e o acesso de pragas."
    },
    {
      q: "No refeitório, a equipe percebeu que sobravam restos no prato de alguns educandos. Para reduzir o desperdício sem deixar ninguém com fome, qual a estratégia de gestão do refeitório?",
      opts: ["Proibir o almoço","Oferecer porções iniciais adequadas e permitir que o aluno repita se desejar","Obrigá-los a comer tudo em 2 minutos","Reduzir o tempero"],
      ans: 1,
      exp: "Servir porções moderadas com opção de repetição consciente incentiva a autonomia do educando e evita o descarte de comida."
    },
    {
      q: "Ao realizar a cotação de hortifrúti em três fornecedores locais (A, B e C), a Profª Jaqueline observou: Fornecedor A cobra R$ 5,00/kg; Fornecedor B cobra R$ 4,50/kg; Fornecedor C cobra R$ 6,00/kg mas entrega grátis. Para uma compra de 100 kg com frete de R$ 20,00 no Fornecedor B, qual a opção mais vantajosa?",
      opts: ["Fornecedor A","Fornecedor B (450 + 20 = R$ 470,00)","Fornecedor C (R$ 600,00)","Tanto faz"],
      ans: 1,
      exp: "Fornecedor B: (100 kg × 4.50) + 20.00 = R$ 470,00. Fornecedor C: 100 kg × 6.00 = R$ 600,00. O Fornecedor B é o mais econômico."
    },
    {
      q: "A equipe precisa registrar a lista de restrições alimentares (alergias a lactose, glúten ou amendoim). Por que o controle rígido no balcão do refeitório é vital?",
      opts: ["Para economizar pratos","Garantir a segurança física do educando prevenindo reações alérgicas severas","Apenas por burocracia","Para cozinhar apenas para alguns"],
      ans: 1,
      exp: "O mapeamento individual de alergias garante que cada educando receba uma refeição segura e adaptada às suas necessidades biológicas."
    },
    {
      q: "Se 80 kg de alimento suprem o refeitório durante 4 dias de aulas, quantos quilos de alimento serão necessários para suprir 12 dias de aulas mantendo a mesma média?",
      opts: ["160 kg","200 kg","240 kg","300 kg"],
      ans: 2,
      exp: "80 kg ÷ 4 dias = 20 kg por dia. Para 12 dias: 12 dias × 20 kg/dia = 240 kg necessários."
    },
    {
      q: "No refeitório com a Profª Amanda e a Profª Liduina, por que mastigar os alimentos com calma e sem pressa melhora o rendimento dos bailarinos?",
      opts: ["Para perder o horário da aula","Porque a digestão começa na boca com a salivação, permitindo que os nutrientes sejam absorvidos sem sobrecarregar o estômago","Para a comida esfriar completamente","Não faz nenhuma diferença"],
      ans: 1,
      exp: "A mastigação adequada tritura os alimentos e envia sinais de saciedade ao cérebro, evitando sonolência e peso digestivo nos ensaios."
    },
    {
      q: "Qual é a conduta exemplar de respeito e convivência solidária ao término da refeição coletiva no refeitório?",
      opts: ["Empurrar a mesa e sair correndo deixando restos espalhados","Recolher a própria bandeja, destinar os resíduos nas lixeiras identificadas e deixar o assento limpo e organizado para o próximo colega","Jogar restos de comida no chão","Gritar com os colegas da limpeza"],
      ans: 1,
      exp: "A cidadania se pratica nos pequenos gestos cotidianos de respeito ao espaço coletivo e aos trabalhadores do refeitório."
    },
    {
      q: "Se cada jarra de suco de acerola fresca abastece 12 copos e temos 6 jarras cheias na bancada, quantos copos podem ser servidos ao todo?",
      opts: ["60 copos","72 copos","84 copos","96 copos"],
      ans: 1,
      exp: "6 jarras × 12 copos cada = 72 copos cheios de vitamina C para os educandos."
    },
    {
      q: "Qual grupo de alimentos é rico em cálcio, nutriente fundamental para a densidade e resistência dos ossos dos bailarinos?",
      opts: ["Refrigerantes açucarados","Leite, queijos, iogurtes e vegetais verde-escuros (como couve e brócolis)","Balas de goma","Batatas fritas congeladas"],
      ans: 1,
      exp: "O cálcio e a vitamina D fortalecem o esqueleto contra fraturas de estresse em atividades de alto impacto como a dança."
    },
    {
      q: "Por que as lixeiras do refeitório são separadas em 'Orgânicos' e 'Recicláveis'?",
      opts: ["Apenas para ter mais lixeiras","Para que restos de alimentos possam ir para a compostagem do jardim e embalagens secas possam ser recicladas, protegendo o meio ambiente","Porque tanto faz onde jogar","Para gastar sacos plásticos"],
      ans: 1,
      exp: "A segregação correta dos resíduos na fonte viabiliza a reciclagem e a produção de adubo orgânico para a horta da escola."
    },
    {
      q: "Ao se servir no bufê do refeitório, qual atitude responsável evita o desperdício de comida?",
      opts: ["Colocar uma montanha de comida que sabe que não vai aguentar comer","Colocar no prato uma porção equilibrada e consciente, sabendo que pode repetir se ainda tiver fome","Pegar comida apenas para jogar fora","Não comer nada"],
      ans: 1,
      exp: "Servir-se na medida da própria fome é um ato de consciência social e respeito àqueles que prepararam a refeição."
    },
    {
      q: "Qual é o principal perigo de consumir refrigerantes e sucos industrializados ultraprocessados todos os dias?",
      opts: ["Excesso de açúcares refinados, corantes e aditivos que aumentam o risco de cáries, diabetes e cansaço precoce","Eles dão muita saúde","Eles substituem a água","Não existe nenhum perigo"],
      ans: 0,
      exp: "Bebidas ultraprocessadas oferecem calorias vazias sem nutrientes essenciais, prejudicando o desenvolvimento físico e a energia dos jovens."
    },
    {
      q: "Se durante o almoço foram recolhidas 12 bandejas de cada uma das 5 mesas do refeitório, quantas bandejas foram organizadas ao todo?",
      opts: ["50 bandejas","55 bandejas","60 bandejas","65 bandejas"],
      ans: 2,
      exp: "5 mesas × 12 bandejas por mesa = 60 bandejas recolhidas com ordem e cooperação."
    },
    {
      q: "Por que a água pura deve ser a principal fonte de hidratação do corpo ao longo do dia todo na EDISCA?",
      opts: ["Porque nosso organismo é composto por cerca de 60% a 70% de água e todos os órgãos e músculos dependem dela para funcionar perfeitamente","Porque a água não tem cor","Para não ter sabor","Apenas para beber na aula"],
      ans: 0,
      exp: "A água regula a temperatura interna, transporta nutrientes e previne cãibras musculares nos dançarinos."
    },
    {
      q: "A partilha da refeição em mesa com os colegas e professores é considerada um momento pedagógico porque fortalece:",
      opts: ["A pressa e o individualismo","A convivência fraterna, a amizade, o diálogo acolhedor e o sentimento de pertencimento a uma grande família","A disputa de quem come mais rápido","O isolamento"],
      ans: 1,
      exp: "Comer juntos é um ato ancestral de comunhão e fortalecimento dos laços afetivos na comunidade da EDISCA."
    }
  ]

};

// LocalStorage key for tracking questions seen in recent games
const SEEN_QUESTIONS_KEY = 'edisca_seen_question_sigs_v1';
const MAX_SEEN_PER_ROOM = 40;

function getSeenSignatures(): Record<string, string[]> {
  try {
    const raw = localStorage.getItem(SEEN_QUESTIONS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === 'object' && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

function saveSeenSignatures(seen: Record<string, string[]>): void {
  try {
    localStorage.setItem(SEEN_QUESTIONS_KEY, JSON.stringify(seen));
  } catch {}
}

/**
 * Shuffles the 4 options of a question and updates the 'ans' index
 * so that the correct answer is never always at the same position.
 */
export function shuffleQuestionOptions(q: Question): Question {
  const originalAnsText = q.opts[q.ans];
  const shuffledOpts = [...q.opts];
  for (let i = shuffledOpts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledOpts[i], shuffledOpts[j]] = [shuffledOpts[j], shuffledOpts[i]];
  }
  const newAnsIndex = shuffledOpts.indexOf(originalAnsText);
  return {
    q: q.q,
    opts: shuffledOpts,
    ans: newAnsIndex >= 0 ? newAnsIndex : 0,
    exp: q.exp
  };
}

/**
 * Normalizes question text into a signature for tracking repetitions.
 */
function getQuestionSignature(q: Question): string {
  return q.q.trim().slice(0, 60).toLowerCase();
}

/**
 * Intelligent, age-adaptive question generator & selector for an EDISCA sector:
 * 1. Adapts questions dynamically to the player's age:
 *    - 7 a 9 anos: Nível Infantil (perguntas fáceis, diretas, números pequenos, noções visuais).
 *    - 10 a 12 anos: Nível Intermediário (desafios equilibrados, operações simples, medidas e hábitos).
 *    - 13 a 18 anos: Nível Juvenil / Avançado (proporções, porcentagens, conceitos institucionais e técnicos).
 * 2. Combines age-tailored curated questions with fresh procedural variations generated on-the-fly.
 * 3. Checks local history to prioritize unseen questions across playthroughs.
 * 4. Shuffles option positions (A, B, C, D) dynamically.
 */
export function getRandomQuestionsForRoom(roomKey: string, count = 5, playerAge = 10): Question[] {
  const curatedPool = questionBank[roomKey] || [];
  const generators = dynamicGenerators[roomKey] || [];

  // Generate dynamic procedural questions specifically tailored to player's age
  const dynamicGenerated: Question[] = [];
  if (generators.length > 0) {
    for (let i = 0; i < Math.max(generators.length, 5); i++) {
      try {
        const gen = generators[i % generators.length];
        dynamicGenerated.push(gen(playerAge));
      } catch (err) {
        console.warn('Error running dynamic generator:', err);
      }
    }
  }

  // Filter curated questions according to player age:
  // For age <= 9: prefer questions with simpler vocabulary, avoiding heavy technical or multi-step algebra
  let ageFilteredCurated: Question[];
  if (playerAge <= 9) {
    const complexKeywords = ['porcentagem', '%', 'proscênio', 'antropofágico', 'conciliação', 'lgpd', 'tributos', '1.024', 'alíquota', 'amortecimento biomecânico', '2x + 5', 'quadrático', 'isbn', 'lead', 'fast fashion'];
    ageFilteredCurated = curatedPool.filter(q => {
      const lower = q.q.toLowerCase();
      return !complexKeywords.some(kw => lower.includes(kw));
    });
    // Ensure we have candidates; if too filtered, use curatedPool
    if (ageFilteredCurated.length < count) {
      ageFilteredCurated = curatedPool;
    }
  } else {
    ageFilteredCurated = curatedPool;
  }

  // Combine curated + dynamic candidate pool
  const candidatePool: Question[] = [...dynamicGenerated, ...ageFilteredCurated];
  if (candidatePool.length === 0) return [];

  // Load seen question signatures to prevent repetitions across playthroughs
  const allSeen = getSeenSignatures();
  const roomSeen = new Set(allSeen[roomKey] || []);

  // Filter out questions the educando has already experienced recently
  const unseenCandidates = candidatePool.filter(q => !roomSeen.has(getQuestionSignature(q)));

  // If there are enough unseen questions, prioritize them!
  let selectedPool: Question[];
  if (unseenCandidates.length >= count) {
    selectedPool = unseenCandidates;
  } else if (unseenCandidates.length > 0) {
    // If we have some unseen, mix them with the least recently seen
    const seenCandidates = candidatePool.filter(q => roomSeen.has(getQuestionSignature(q)));
    selectedPool = [...unseenCandidates, ...seenCandidates];
  } else {
    // If the educando has already seen almost all questions for this room across multiple runs,
    // reset this room's history so they can re-experience them in a brand new shuffled order!
    allSeen[roomKey] = [];
    saveSeenSignatures(allSeen);
    selectedPool = [...candidatePool];
  }

  // Fisher-Yates shuffle on the selected candidate pool
  const shuffledCandidates = [...selectedPool];
  for (let i = shuffledCandidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCandidates[i], shuffledCandidates[j]] = [shuffledCandidates[j], shuffledCandidates[i]];
  }

  // Slice the desired count
  const picked = shuffledCandidates.slice(0, count);

  // Shuffle options of each chosen question so correct answers vary positions (A/B/C/D)
  const finalQuestions = picked.map(q => shuffleQuestionOptions(q));

  // Record signatures of picked questions into seen list for future games
  const updatedRoomSeen = allSeen[roomKey] || [];
  for (const q of finalQuestions) {
    const sig = getQuestionSignature(q);
    if (!updatedRoomSeen.includes(sig)) {
      updatedRoomSeen.push(sig);
    }
  }
  // Keep room history bounded
  if (updatedRoomSeen.length > MAX_SEEN_PER_ROOM) {
    updatedRoomSeen.splice(0, updatedRoomSeen.length - MAX_SEEN_PER_ROOM);
  }
  allSeen[roomKey] = updatedRoomSeen;
  saveSeenSignatures(allSeen);

  return finalQuestions;
}
