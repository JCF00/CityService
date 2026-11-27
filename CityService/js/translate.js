

(function () {
  const STORAGE_KEY = "cityservice_idioma";
  const DEFAULT_LANGUAGE = "pt-BR";
  const SUPPORTED_LANGUAGES = ["pt-BR", "en", "es"];

  const translations = {
    en: {
      "CityService - Portal do Cidadão": "CityService - Citizen Portal",
      "CityService - Portal do cidadão": "CityService - Citizen Portal",
      "CityService - Login": "CityService - Sign in",
      "CityService - Cadastro": "CityService - Create account",
      "CityService - Início": "CityService - Home",
      "CityService - Mapa de Ocorrências": "CityService - Incident Map",
      "CityService - Mapa de ocorrências": "CityService - Incident Map",
      "CityService - Minhas Solicitações": "CityService - My Requests",
      "CityService - Serviços Públicos": "CityService - Public Services",
      "CityService - Notícias de Praia Grande": "CityService - Praia Grande News",
      "CityService - Notícias em Destaque": "CityService - Featured News",
      "CityService - Transparência": "CityService - Transparency",
      "CityService - Eventos": "CityService - Events",
      "CityService - Dashboard": "CityService - Dashboard",
      "CityService - Gestão de solicitações": "CityService - Request Management",
      "CityService - Usuários e permissões": "CityService - Users and Permissions",
      "CityService - Auditoria": "CityService - Audit Log",
      "CityService - Leitura de Notícia": "CityService - News Article",
      "Portal do cidadão": "Citizen portal",
      "Portal do Cidadão": "Citizen Portal",
      "Navegação": "Navigation",
      "Gestão": "Management",
      "Início": "Home",
      "Dashboard": "Dashboard",
      "Serviços": "Services",
      "Solicitações": "Requests",
      "Mapa": "Map",
      "Mapa de ocorrências": "Incident map",
      "Mapa de Ocorrências": "Incident Map",
      "Eventos": "Events",
      "Notícias": "News",
      "Destaques": "Highlights",
      "Transparência": "Transparency",
      "Gestão de solicitações": "Request management",
      "Usuários e permissões": "Users and permissions",
      "Auditoria": "Audit log",
      "Configurações": "Settings",
      "Sair": "Sign out",
      "Mais": "More",
      "Mais opções": "More options",
      "Acesse outras áreas do portal.": "Explore other areas of the portal.",
      "Explorar": "Explore",
      "Abrir menu de opções": "Open more options",
      "Fechar menu": "Close menu",
      "Portal do cidadão": "Citizen portal",
      "Usuário": "User",
      "Cidadão": "Citizen",
      "Atendente": "Service agent",
      "Administrador": "Administrator",
      "Tem certeza de que deseja sair?": "Are you sure you want to sign out?",
      "Cancelar": "Cancel",
      "Salvar": "Save",
      "Salvar alterações": "Save changes",
      "Ativa": "Active",
      "Tipo de conta": "Account type",
      "Data de nascimento não cadastrada": "Date of birth not provided",
      "Não informado": "Not provided",
      "Conta institucional": "Institutional account",
      "E-mail": "Email",
      "Telefone": "Phone",
      "CPF": "Brazilian tax ID (CPF)",
      "Abrir notificações": "Open notifications",
      "Abrir perfil": "Open profile",
      "Fechar": "Close",
      "Notificações": "Notifications",
      "Você ainda não possui notificações.": "You do not have any notifications yet.",
      "Marcar todas como lidas": "Mark all as read",
      "Lida": "Read",
      "Solicitação registrada": "Request submitted",
      "Solicitação atualizada": "Request updated",
      'Sua solicitação "{title}" foi enviada e está em análise.': 'Your request “{title}” has been submitted and is under review.',
      'A solicitação "{title}" agora está: {status}.': 'The request “{title}” is now: {status}.', 
      "solicitação": "request",
      "solicitações": "requests",
      "Nova solicitação": "New request",
      "Título": "Title",
      "Categoria": "Category",
      "Selecione…": "Select…",
      "Iluminação pública": "Street lighting",
      "Vias e calçadas": "Roads and sidewalks",
      "Limpeza urbana": "Street cleaning",
      "Outros": "Other",
      "Descrição": "Description",
      "Local da ocorrência": "Incident location",
      "Usar minha localização": "Use my location",
      "Clique no mapa ou arraste o marcador para indicar onde ocorreu o problema.": "Click the map or drag the marker to indicate where the problem occurred.",
      "Local selecionado:": "Selected location:",
      "Nenhum local selecionado": "No location selected",
      "Enviar solicitação": "Submit request",
      "Configurações": "Settings",
      "Idioma": "Language",
      "Tema escuro": "Dark theme",
      "Ative o tema escuro para reduzir o brilho da interface.": "Turn on dark theme to reduce interface brightness.",
      "Ativar tema escuro": "Enable dark theme",
      "Desativar tema escuro": "Disable dark theme",
      "Config.": "Settings",
      "Navegação principal": "Main navigation",
      "Buscar notícias…": "Search news…",
      "Ex.: Nova unidade de saúde é inaugurada no bairro": "E.g.: A new health centre opens in the neighbourhood",
      "Breve resumo que aparece no card e na abertura da matéria…": "Brief summary shown on the card and at the beginning of the article…",
      "Texto completo da notícia…": "Full article text…",
      "Ex.: Saúde": "E.g.: Health",
      "Prefeitura de Praia Grande": "Praia Grande City Hall",
      "Ex.: Buraco na rua": "E.g.: Pothole in the road",
      "Descreva o problema…": "Describe the issue…",
      "Português (Brasil)": "Portuguese (Brazil)",
      "English": "English",
      "Español": "Spanish",
      "Adicionar nova notícia": "Add a news article",
      "Adicionar notícia": "Add news",
      "Editar notícia": "Edit news article",
      "Imagem da notícia": "News image",
      "Escolher imagem do computador": "Choose an image from your device",
      "Formatos aceitos: JPG, PNG ou WEBP.": "Accepted formats: JPG, PNG or WEBP.",
      "Pré-visualização da imagem": "Image preview",
      "Subtítulo / Resumo": "Subtitle / Summary",
      "Conteúdo completo": "Full article",
      "Autor / Fonte": "Author / Source",
      "Data": "Date",
      "Horário": "Time",
      "Colocar como notícia em destaque": "Feature this article",
      "No máximo 3 notícias ficam em destaque ao mesmo tempo. Ao ultrapassar o limite, a mais antiga sai automaticamente do destaque (sem ser excluída).": "Up to 3 articles can be featured at a time. If the limit is exceeded, the oldest featured article is automatically unfeatured, not deleted.",
      "Salvar notícia": "Save article",
      "Formatos aceitos: JPG, PNG ou WEBP.": "Accepted formats: JPG, PNG or WEBP.",
      "Voltar para notícias": "Back to news",
      "Carregando conteúdo da matéria...": "Loading article...",
      "Notícias relacionadas": "Related news",
      "Publicado em": "Published on",
      "Destaque": "Featured",
      "Destaque Principal": "Top story",
      "Continuar lendo →": "Continue reading →",
      "Ler matéria completa →": "Read full article →",
      "Nenhuma notícia encontrada para ": "No news found for ",
      "Nenhuma notícia encontrada": "No news found",
      "Nenhuma notícia cadastrada ainda.": "No news articles have been added yet.",
      "Nenhuma notícia em destaque no momento. Marque uma notícia como destaque ao criá-la ou editá-la.": "There are no featured articles right now. Feature an article when creating or editing it.",
      "Notícia atualizada com sucesso!": "News article updated successfully!",
      "Notícia publicada com sucesso!": "News article published successfully!",
      "Formato de imagem não suportado. Utilize JPG, PNG ou WEBP.": "Unsupported image format. Use JPG, PNG or WEBP.",
      "Excluir notícia": "Delete news article",
      "Voltar ao login": "Back to sign in",
      "Criar cadastro": "Create account",
      "Preencha seus dados para acessar os serviços do CityService.": "Fill in your details to access CityService services.",
      "Nome completo": "Full name",
      "Data de nascimento": "Date of birth",
      "Senha": "Password",
      "Confirmar senha": "Confirm password",
      "Cadastrar": "Create account",
      "Já possui cadastro?": "Already have an account?",
      "Já possui cadastro? Voltar ao login": "Already have an account? Back to sign in",
      "Seu nome completo": "Your full name",
      "Mínimo de 8 caracteres": "At least 8 characters",
      "Digite a senha novamente": "Enter your password again",
      "Digite seu usuário": "Enter your username",
      "Digite sua senha": "Enter your password",
      "Sua cidade mais conectada, seus serviços mais acessíveis.": "A more connected city, with services within easier reach.",
      "Sua cidade mais conectada,": "A more connected city,",
      "seus serviços mais acessíveis.": "with services within easier reach.",
      "Solicite serviços": "Request services",
      "Registre solicitações e acompanhe seus atendimentos.": "Submit requests and follow their progress.",
      "Encontre informações": "Find information",
      "Consulte eventos, notícias e serviços da sua cidade.": "Explore events, news and services in your city.",
      "Acesse informações públicas de forma simples e segura.": "Access public information easily and securely.",
      "Bem-vindo ao Portal": "Welcome to the",
      "CityService!": "CityService portal!",
      "Bem-vindo ao Portal CityService!": "Welcome to the CityService portal!",
      "Entre na sua conta para acessar os serviços da cidade.": "Sign in to access city services.",
      "Usuário ou e-mail": "Username or email",
      "Mostrar ou ocultar senha": "Show or hide password",
      "Entrar": "Sign in",
      "Ainda não possui cadastro?": "Don't have an account yet?",
      "Criar conta": "Create account",
      "Usuário ou senha inválidos. Confira os dados e tente novamente.": "Invalid username or password. Check your details and try again.",
      "Informe um CPF válido.": "Enter a valid Brazilian tax ID (CPF).",
      "Informe um telefone válido com DDD.": "Enter a valid phone number, including area code.",
      "A data de nascimento deve ser anterior à data atual.": "The date of birth must be earlier than today.",
      "A senha deve ter pelo menos 8 caracteres, incluindo letras e números.": "The password must contain at least 8 characters, including letters and numbers.",
      "As senhas não coincidem.": "The passwords do not match.",
      "Este e-mail já está cadastrado.": "This email address is already registered.",
      "Este CPF já está cadastrado.": "This CPF is already registered.",
      "Olá! Como podemos ajudar?": "Hello! How can we help?",
      "Olá! Como podemos": "Hello! How can we",
      "ajudar?": "help?",
      "Consulte serviços, registre solicitações e acompanhe suas demandas de forma simples e rápida.": "Explore services, submit requests and follow their progress quickly and easily.",
      "+ Nova solicitação": "+ New request",
      "Acessar perfil": "View profile",
      "Atendimento digital": "Digital assistance",
      "Prazo de suporte": "Support response time",
      "Acesso rápido": "Quick access",
      "Atalhos rápidos": "Quick links",
      "Acesse os principais recursos do portal.": "Access the portal's main features.",
      "+ Registrar solicitação Informe um problema ou necessidade da sua região. →": "+ Submit a request Report an issue or need in your area. →",
      "Registrar solicitação": "Submit a request",
      "Informe um problema ou necessidade da sua região.": "Report an issue or need in your area.",
      "Acompanhar solicitações": "Track requests",
      "Consulte o andamento dos seus atendimentos.": "Check the progress of your requests.",
      "Visualize problemas registrados pela população.": "View issues reported by residents.",
      "Consulte os serviços oferecidos pela prefeitura.": "Explore services provided by the city government.",
      "Acompanhe as principais notícias da cidade.": "Follow the latest city news.",
      "Consulte informações públicas da cidade.": "Explore public information about the city.",
      "Notícias da Cidade": "City News",
      "Acompanhe comunicados oficiais, investimentos e novidades sobre os serviços públicos municipais.": "Follow official announcements, investments and updates on municipal public services.",
      "Atendimento": "Service desk",
      "Acompanhe suas solicitações": "Track your requests",
      "Consulte o andamento das demandas registradas nos bairros de Praia Grande.": "Check the progress of requests submitted in Praia Grande neighborhoods.",
      "Ver solicitações →": "View requests →",
      "Geolocalização": "Geolocation",
      "Explore os pontos de atendimento e serviços ativos no município.": "Explore service locations and active services in the city.",
      "Abrir mapa →": "Open map →",
      "Seleção da Prefeitura": "City government selection",
      "Notícias em Destaque": "Featured News",
      "Veja as até 3 matérias marcadas como destaque no momento.": "See the up to 3 articles currently featured.",
      "Ver destaques →": "View highlights →",
      "Mais notícias e avisos": "More news and notices",
      "Praia Grande - SP": "Praia Grande, São Paulo",
      "As matérias mais relevantes selecionadas pela Prefeitura. No máximo 3 notícias ficam em destaque ao mesmo tempo — as demais continuam disponíveis na página de notícias.": "The most relevant articles selected by the city government. Up to 3 articles can be featured at once; all others remain available on the news page.",
      "Ver todas as notícias": "View all news",
      "Total": "Total",
      "Em análise": "Under review",
      "Em andamento": "In progress",
      "Concluída": "Completed",
      "Concluídas": "Completed",
      "Todos os status": "All statuses",
      "Resultados": "Results",
      "Carregando solicitações...": "Loading requests...",
      "Minhas Solicitações": "My Requests",
      "Acompanhe suas solicitações e consulte o andamento dos serviços solicitados à prefeitura.": "Track your requests and check the progress of services requested from the city government.",
      "Pesquisar por protocolo ou serviço...": "Search by reference number or service...",
      "0 solicitações": "0 requests",
      "Solicitações": "Requests",
      "Indicadores": "Metrics",
      "Acompanhe os dados reais das solicitações registradas no CityService.": "Monitor actual request data recorded in CityService.",
      "Total de solicitações": "Total requests",
      "Situação das solicitações": "Request status",
      "Distribuição percentual por status": "Percentage breakdown by status",
      "registros": "records",
      "Solicitações por categoria": "Requests by category",
      "Quantidade registrada em cada categoria": "Number of requests in each category",
      "Nenhuma solicitação cadastrada.": "No requests have been submitted.",
      "Solicitações recentes": "Recent requests",
      "Últimos registros enviados": "Latest submissions",
      "Ainda não existem solicitações para apresentar.": "There are no requests to display yet.",
      "Solicitação": "Request",
      "Solicitação sem título": "Untitled request",
      "Sem categoria": "No category",
      "Sem status": "No status",
      "Data não informada": "Date not provided",
      "Gestão de solicitações": "Request management",
      "Consulte solicitações registradas e atualize o andamento do atendimento.": "Review submitted requests and update their progress.",
      "Total de solicitações locais": "Total local requests",
      "Buscar por título": "Search by title",
      "Salvar": "Save",
      "Nenhuma solicitação local encontrada. Registros enviados na página de solicitações aparecerão aqui.": "No local requests found. Requests submitted on the Requests page will appear here.",
      "Nenhuma solicitação encontrada": "No requests found",
      "Tente alterar os termos da pesquisa ou o status selecionado.": "Try changing your search terms or selected status.",
      "Segurança": "Security",
      "Registro local das ações realizadas nas páginas administrativas de demonstração.": "Local log of actions performed on the demonstration administration pages.",
      "Registros locais": "Local records",
      "Limpar registros": "Clear records",
      "Ainda não há ações registradas.": "No actions have been recorded yet.",
      "Administração": "Administration",
      "Consulte os níveis e as permissões configuradas para esta demonstração.": "Review the access levels and permissions configured for this demonstration.",
      "Perfis de acesso configurados": "Configured access profiles",
      "A estrutura SQL enviada define tabelas para níveis, permissões e vínculos, mas ainda não possui registros de permissões. A matriz atual fica em": "The provided SQL structure defines tables for levels, permissions and assignments, but it does not yet contain permission records. The current matrix is located in",
      "páginas liberadas": "pages enabled",
      "Todas as permissões": "All permissions",
      "Informações públicas": "Public information",
      "Área destinada a documentos públicos, legislação municipal e informações sobre a administração da cidade.": "A section for public documents, municipal legislation and information about city administration.",
      "Legislação municipal": "Municipal legislation",
      "Espaço para leis, decretos e normas municipais oficiais.": "Access to official municipal laws, decrees and regulations.",
      "Documentos oficiais pendentes de disponibilização.": "Official documents are not yet available.",
      "Orçamento e despesas": "Budget and expenses",
      "Espaço para demonstrativos de orçamento, receitas e despesas públicas.": "Access to public budget, revenue and expense statements.",
      "Dados oficiais pendentes de disponibilização.": "Official data is not yet available.",
      "Contratos e licitações": "Contracts and tenders",
      "Espaço para editais, contratos e informações de processos públicos.": "Access to public notices, contracts and procurement information.",
      "Esta versão é demonstrativa. Os documentos ainda não estão conectados a um sistema externo ou banco de dados.": "This is a demonstration version. Documents are not yet connected to an external system or database.",
      "Ocorrências": "Incidents",
      "Visualize solicitações registradas pela população em diferentes pontos de Praia Grande.": "View requests submitted by residents at different locations in Praia Grande.",
      "Serviços públicos": "Public services",
      "Consulte informações, orientações e serviços disponíveis através do CityService. Tudo em um só lugar, de forma rápida e transparente.": "Find information, guidance and services available through CityService, all in one place, quickly and transparently.",
      "Disponíveis": "Available",
      "5 serviços": "5 services",
      "Catálogo": "Catalog",
      "Consulta Unificada de Serviços Públicos": "Unified Public Services Directory",
      "Esta funcionalidade disponibiliza ao cidadão um catálogo centralizado com todos os serviços municipais oferecidos pela prefeitura. A plataforma estrutura o acesso de forma simples e intuitiva, organizando os serviços por categorias estratégicas, como saúde, educação, obras e trânsito, e permitindo pesquisas rápidas. O objetivo principal é garantir total transparência e otimizar o tempo da população, evitando que o cidadão precise se deslocar até órgãos públicos físicos apenas para obter informações básicas. As informações são mantidas sempre atualizadas para assegurar a precisão e confiabilidade dos atendimentos.": "This feature provides residents with a centralized directory of all municipal services offered by the city government. The platform organizes services into clear categories such as health, education, public works and traffic, and makes them easy to search. Its goal is to improve transparency and save residents time by reducing unnecessary visits to public offices. Information is kept up to date to support accurate and reliable service.",
      "Agenda": "Appointments",
      "Agendamento On-line de Atendimentos": "Online Service Appointments",
      "Através deste serviço, os moradores podem marcar horários para o atendimento presencial em diversos órgãos e serviços públicos da cidade. A plataforma integrada permite selecionar a data, o horário e o local desejados de forma prática, reduzindo filas e otimizando o fluxo de trabalho dos servidores. O sistema conta com notificações automáticas que confirmam o agendamento e enviam lembretes sobre a data marcada. Esse gerenciamento digital transforma a experiência do usuário, eliminando a espera presencial prolongada e garantindo um atendimento mais pontual e organizado.": "Residents can use this service to book in-person appointments with municipal departments and public services. The integrated platform makes it easy to choose a date, time and location, helping reduce queues and improve staff workflows. Automatic notifications confirm appointments and send reminders. This digital process makes service more punctual and organized while reducing waiting times.",
      "Guia": "Guide",
      "Guia Digital e Orientações Documentais": "Digital Guide and Document Requirements",
      "Para evitar retrabalho e viagens perdidas aos postos de atendimento, o CityService disponibiliza um guia completo e didático contendo todos os requisitos e documentos necessários para a execução de cada serviço público. O cidadão pode consultar previamente quais comprovantes, certidões ou formulários precisará apresentar, além de conferir eventuais taxas ou critérios de elegibilidade. Esse recurso instrui o usuário de maneira clara e transparente antes do atendimento físico, otimizando os processos burocráticos e aumentando a taxa de resolução das demandas no primeiro contato.": "To prevent repeated work and unnecessary trips to service centers, CityService provides a clear guide to the requirements and documents needed for each public service. Residents can check in advance which proofs, certificates or forms they must provide, as well as any fees or eligibility criteria. This helps people prepare before visiting an office, streamlines administrative processes and increases the likelihood of resolving requests on the first visit.",
      "Digital": "Digital",
      "Repositório e Cópias Digitais": "Digital Document Repository and Copies",
      "Com foco na inovação digital e sustentabilidade, este módulo permite o download e a emissão de cópias digitais autorizadas de documentos, certidões e formulários aplicáveis. O cidadão autenticado pode baixar seus arquivos diretamente pelo portal com total praticidade. Todos os documentos digitais disponibilizados são protegidos por mecanismos rigorosos de criptografia e segurança, garantindo a integridade dos dados e o cumprimento das diretrizes da Lei Geral de Proteção de Dados (LGPD).": "Focused on digital innovation and sustainability, this module allows residents to download authorized digital copies of applicable documents, certificates and forms. Signed-in users can retrieve files directly from the portal. Available documents are protected with encryption and security controls to preserve data integrity and comply with Brazil's General Data Protection Law (LGPD).",
      "Presencial": "In person",
      "Locais de Retirada Física": "In-person Collection Locations",
      "Nos casos em que a emissão do documento exige a entrega de vias físicas originais, a plataforma orienta o cidadão detalhadamente sobre o local correto de retirada. O sistema indica os endereços, horários de funcionamento e procedimentos de postos credenciados, tais como Cartórios e unidades do Poupatempo. Além das direções, a funcionalidade fornece informações práticas sobre os requisitos necessários no ato da retirada física, garantindo total previsibilidade, praticidade e comodidade para o usuário.": "When a document must be issued as an original paper copy, the platform guides residents to the correct collection point. It provides addresses, opening hours and procedures for authorized locations such as notary offices and Poupatempo service centers. It also explains what residents need to bring when collecting a document, making the process more predictable and convenient.",
      "Saiba mais": "Learn more",
      "Mostrar menos": "Show less",
      "Eventos": "Events",
      "Área de eventos": "Events area",
      "Eventos atualmente oferecidos pela sua cidade": "Events currently offered in your city",
      "Gerenciar eventos": "Manage events",
      "Cadastre ou remova eventos divulgados no portal.": "Add or remove events published on the portal.",
      "Adicionar evento": "Add event",
      "Eventos adicionados": "Added events",
      "Serviço público": "Public service",
      "Festival de Cultura de Praia Grande": "Praia Grande Culture Festival",
      "Evento cultural com apresentações musicais, atividades artísticas e atrações para moradores e visitantes. A programação está prevista para setembro, com atividades voltadas à valorização da cultura local.": "A cultural event featuring live music, art activities and attractions for residents and visitors. The program is planned for September and will celebrate local culture.",
      "Data do evento": "Event date",
      "Setembro de 2026": "September 2026",
      "Programação cultural prevista para diferentes dias do mês.": "Cultural activities are planned on different days throughout the month.",
      "Local: espaços culturais de Praia Grande. Consulte a programação oficial.": "Location: cultural venues in Praia Grande. Check the official schedule.",
      "Semana do Esporte e Lazer": "Sports and Leisure Week",
      "Atividades esportivas e recreativas para a população, incentivando a prática de exercícios físicos e a convivência comunitária. A programação pode incluir aulas abertas, jogos e atividades ao ar livre durante setembro.": "Sports and recreational activities for the community, encouraging exercise and social interaction. The program may include open classes, games and outdoor activities during September.",
      "Atividades previstas ao longo do mês, conforme a programação municipal.": "Activities are planned throughout the month, subject to the municipal schedule.",
      "Local: espaços esportivos e áreas públicas de Praia Grande.": "Location: sports facilities and public areas in Praia Grande.",
      "Feira de Serviços à Comunidade": "Community Services Fair",
      "Ação voltada aos moradores de Praia Grande, reunindo orientações sobre serviços públicos, atividades educativas e informações úteis para a população. A iniciativa busca aproximar os cidadãos dos serviços oferecidos pelo município.": "An event for Praia Grande residents, bringing together guidance on public services, educational activities and useful information. The initiative aims to connect residents with services provided by the city.",
      "Público": "Audience",
      "Moradores e visitantes": "Residents and visitors",
      "Atividade destinada à comunidade, com orientações e informações sobre serviços municipais.": "An event for the community, with guidance and information about municipal services.",
      "Local e horário: consulte a divulgação oficial da Prefeitura de Praia Grande.": "Location and time: check the official announcement from Praia Grande City Hall.",
      "Nome do evento": "Event name",
      "Local do evento": "Event location",
      "URL da imagem (opcional)": "Image URL (optional)",
      "Descrição do evento": "Event description",
      "Adicionar evento": "Add event",
      "Onde estamos?": "Where are we?",
      "Sobre o portal": "About the portal",
      "Entrar": "Sign in",
      "Sua cidade.": "Your city.",
      "Seus serviços.": "Your services.",
      "Mais perto de você.": "Closer to you.",
      "Acesse serviços públicos, registre solicitações e acompanhe suas demandas de forma simples, rápida e transparente.": "Access public services, submit requests and follow their progress simply, quickly and transparently.",
      "Acessar o portal": "Access the portal",
      "Conheça os serviços": "Explore services",
      "Online": "Online",
      "Registre uma ocorrência": "Report an issue",
      "Nova solicitação": "New request",
      "Acompanhar solicitação": "Track a request",
      "Consulte seus atendimentos": "Check your requests",
      "Informações públicas": "Public information",
      "Acesse informações da cidade": "Access city information",
      "Tudo em um só lugar": "Everything in one place",
      "Encontre os principais serviços e informações da sua cidade em um único portal.": "Find your city's key services and information in one portal.",
      "Registre problemas e acompanhe o andamento das suas solicitações.": "Report issues and track the progress of your requests.",
      "Serviços públicos": "Public services",
      "Consulte serviços oferecidos pela administração pública.": "Explore services provided by the public administration.",
      "Localização": "Location",
      "Onde Estamos?": "Where are we?",
      "Encontre a unidade do Portal CityService em Praia Grande.": "Find the CityService Portal office in Praia Grande.",
      "Uma cidade mais conectada": "A more connected city",
      "O CityService aproxima o cidadão dos serviços públicos, facilitando o acesso a informações, solicitações e atendimentos em um único ambiente.": "CityService brings residents closer to public services by making information, requests and assistance available in one place.",
      "© 2026 CityService. Todos os direitos reservados.": "© 2026 CityService. All rights reserved.",
      "Minha localização": "My location",
      "Você está aqui": "You are here",
      "Distância até o CityService: ": "Distance to CityService: ",
      "Não foi possível obter sua localização.": "Unable to retrieve your location.",
      "Seu navegador não permite obter sua localização.": "Your browser does not allow location access.",
      "Selecione no mapa o local onde ocorreu o problema.": "Select the location of the issue on the map.",
      "Solicitação enviada com sucesso!": "Request submitted successfully!",
      "Seu perfil": "Your profile",
      "Acesso não permitido": "Access denied",
      "não possui permissão para acessar": "does not have permission to access",
      "Excluir serviço": "Delete service",
      "Excluir evento": "Delete event",
      "Cadastro realizado com sucesso! Você será direcionado para o login.": "Account created successfully! You will be redirected to sign in.",
      "Voltar ao início": "Back to home",
      "Nenhum local selecionado": "No location selected",
      "Local a confirmar": "Location to be confirmed",
      "Categoria:": "Category:",
      "Status:": "Status:",
      "Outros": "Other",
      "Atualizado em": "Updated on",
      "Solicitação sem título": "Untitled request",
      "Não informada": "Not provided",
      "Outros": "Other",
      "Esta página": "This page",
      "esta página": "this page",
      'Sua solicitação "{title}" foi enviada e está em análise.': 'Your request “{title}” has been submitted and is under review.',
      'A solicitação "{title}" agora está: {status}.': 'The request “{title}” is now: {status}.', 
      "páginas liberadas": "pages enabled",
      "Solicitações": "Requests",
      "Acessar perfil": "View profile"
    },
    es: {
      "CityService - Portal do Cidadão": "CityService - Portal del ciudadano",
      "CityService - Portal do cidadão": "CityService - Portal del ciudadano",
      "CityService - Login": "CityService - Iniciar sesión",
      "CityService - Cadastro": "CityService - Crear cuenta",
      "CityService - Início": "CityService - Inicio",
      "CityService - Mapa de Ocorrências": "CityService - Mapa de incidencias",
      "CityService - Mapa de ocorrências": "CityService - Mapa de incidencias",
      "CityService - Minhas Solicitações": "CityService - Mis solicitudes",
      "CityService - Serviços Públicos": "CityService - Servicios públicos",
      "CityService - Notícias de Praia Grande": "CityService - Noticias de Praia Grande",
      "CityService - Notícias em Destaque": "CityService - Noticias destacadas",
      "CityService - Transparência": "CityService - Transparencia",
      "CityService - Eventos": "CityService - Eventos",
      "CityService - Dashboard": "CityService - Panel de control",
      "CityService - Gestão de solicitações": "CityService - Gestión de solicitudes",
      "CityService - Usuários e permissões": "CityService - Usuarios y permisos",
      "CityService - Auditoria": "CityService - Auditoría",
      "CityService - Leitura de Notícia": "CityService - Lectura de noticias",
      "Portal do cidadão": "Portal ciudadano",
      "Portal do Cidadão": "Portal del ciudadano",
      "Navegação": "Navegación",
      "Gestão": "Gestión",
      "Início": "Inicio",
      "Dashboard": "Panel",
      "Serviços": "Servicios",
      "Solicitações": "Solicitudes",
      "Mapa": "Mapa",
      "Mapa de ocorrências": "Mapa de incidencias",
      "Mapa de Ocorrências": "Mapa de incidencias",
      "Eventos": "Eventos",
      "Notícias": "Noticias",
      "Destaques": "Destacados",
      "Transparência": "Transparencia",
      "Gestão de solicitações": "Gestión de solicitudes",
      "Usuários e permissões": "Usuarios y permisos",
      "Auditoria": "Auditoría",
      "Configurações": "Configuración",
      "Sair": "Salir",
      "Mais": "Más",
      "Mais opções": "Más opciones",
      "Acesse outras áreas do portal.": "Acceda a otras áreas del portal.",
      "Explorar": "Explorar",
      "Abrir menu de opções": "Abrir más opciones",
      "Fechar menu": "Cerrar menú",
      "Usuário": "Usuario",
      "Cidadão": "Ciudadano",
      "Atendente": "Agente de atención",
      "Administrador": "Administrador",
      "Tem certeza de que deseja sair?": "¿Está seguro de que desea salir?",
      "Cancelar": "Cancelar",
      "Salvar": "Guardar",
      "Salvar alterações": "Guardar cambios",
      "Ativa": "Activa",
      "Tipo de conta": "Tipo de cuenta",
      "Data de nascimento não cadastrada": "Fecha de nacimiento no registrada",
      "Não informado": "No informado",
      "Conta institucional": "Cuenta institucional",
      "E-mail": "Correo electrónico",
      "Telefone": "Teléfono",
      "CPF": "CPF (documento fiscal brasileño)",
      "Abrir notificações": "Abrir notificaciones",
      "Abrir perfil": "Abrir perfil",
      "Fechar": "Cerrar",
      "Notificações": "Notificaciones",
      "Você ainda não possui notificações.": "Todavía no tiene notificaciones.",
      "Marcar todas como lidas": "Marcar todas como leídas",
      "Lida": "Leída",
      "Solicitação registrada": "Solicitud registrada",
      "Solicitação atualizada": "Solicitud actualizada",
      'Sua solicitação "{title}" foi enviada e está em análise.': 'Su solicitud “{title}” se ha enviado y está en revisión.',
      'A solicitação "{title}" agora está: {status}.': 'La solicitud “{title}” ahora está: {status}.' ,
      "solicitação": "solicitud",
      "solicitações": "solicitudes",
      "Nova solicitação": "Nueva solicitud",
      "Título": "Título",
      "Categoria": "Categoría",
      "Selecione…": "Seleccione…",
      "Iluminação pública": "Alumbrado público",
      "Vias e calçadas": "Calles y aceras",
      "Limpeza urbana": "Limpieza urbana",
      "Outros": "Otros",
      "Descrição": "Descripción",
      "Local da ocorrência": "Lugar de la incidencia",
      "Usar minha localização": "Usar mi ubicación",
      "Clique no mapa ou arraste o marcador para indicar onde ocorreu o problema.": "Haga clic en el mapa o arrastre el marcador para indicar dónde ocurrió el problema.",
      "Local selecionado:": "Ubicación seleccionada:",
      "Nenhum local selecionado": "Ninguna ubicación seleccionada",
      "Enviar solicitação": "Enviar solicitud",
      "Idioma": "Idioma",
      "Tema escuro": "Tema oscuro",
      "Ative o tema escuro para reduzir o brilho da interface.": "Active el tema oscuro para reducir el brillo de la interfaz.",
      "Ativar tema escuro": "Activar tema oscuro",
      "Desativar tema escuro": "Desactivar tema oscuro",
      "Config.": "Ajustes",
      "Navegação principal": "Navegación principal",
      "Buscar notícias…": "Buscar noticias…",
      "Ex.: Nova unidade de saúde é inaugurada no bairro": "Ej.: Se inaugura un nuevo centro de salud en el barrio",
      "Breve resumo que aparece no card e na abertura da matéria…": "Breve resumen que aparece en la tarjeta y al inicio del artículo…",
      "Texto completo da notícia…": "Texto completo de la noticia…",
      "Ex.: Saúde": "Ej.: Salud",
      "Prefeitura de Praia Grande": "Ayuntamiento de Praia Grande",
      "Ex.: Buraco na rua": "Ej.: Bache en la calle",
      "Descreva o problema…": "Describa el problema…",
      "Português (Brasil)": "Portugués (Brasil)",
      "English": "Inglés",
      "Español": "Español",
      "Adicionar nova notícia": "Añadir noticia",
      "Adicionar notícia": "Añadir noticia",
      "Editar notícia": "Editar noticia",
      "Imagem da notícia": "Imagen de la noticia",
      "Escolher imagem do computador": "Elegir imagen del dispositivo",
      "Formatos aceitos: JPG, PNG ou WEBP.": "Formatos admitidos: JPG, PNG o WEBP.",
      "Pré-visualização da imagem": "Vista previa de la imagen",
      "Subtítulo / Resumo": "Subtítulo / Resumen",
      "Conteúdo completo": "Contenido completo",
      "Autor / Fonte": "Autor / Fuente",
      "Data": "Fecha",
      "Horário": "Hora",
      "Colocar como notícia em destaque": "Destacar esta noticia",
      "No máximo 3 notícias ficam em destaque ao mesmo tempo. Ao ultrapassar o limite, a mais antiga sai automaticamente do destaque (sem ser excluída).": "Se pueden destacar hasta 3 noticias a la vez. Si se supera el límite, la noticia destacada más antigua deja de estar destacada automáticamente, pero no se elimina.",
      "Salvar notícia": "Guardar noticia",
      "Voltar para notícias": "Volver a noticias",
      "Carregando conteúdo da matéria...": "Cargando la noticia...",
      "Notícias relacionadas": "Noticias relacionadas",
      "Publicado em": "Publicado el",
      "Destaque": "Destacado",
      "Destaque Principal": "Noticia principal",
      "Continuar lendo →": "Seguir leyendo →",
      "Ler matéria completa →": "Leer noticia completa →",
      "Nenhuma notícia cadastrada ainda.": "Todavía no hay noticias publicadas.",
      "Nenhuma notícia em destaque no momento. Marque uma notícia como destaque ao criá-la ou editá-la.": "No hay noticias destacadas en este momento. Destaque una noticia al crearla o editarla.",
      "Notícia atualizada com sucesso!": "¡Noticia actualizada correctamente!",
      "Notícia publicada com sucesso!": "¡Noticia publicada correctamente!",
      "Formato de imagem não suportado. Utilize JPG, PNG ou WEBP.": "Formato de imagen no compatible. Utilice JPG, PNG o WEBP.",
      "Excluir notícia": "Eliminar noticia",
      "Voltar ao login": "Volver al inicio de sesión",
      "Criar cadastro": "Crear cuenta",
      "Preencha seus dados para acessar os serviços do CityService.": "Complete sus datos para acceder a los servicios de CityService.",
      "Nome completo": "Nombre completo",
      "Data de nascimento": "Fecha de nacimiento",
      "Senha": "Contraseña",
      "Confirmar senha": "Confirmar contraseña",
      "Cadastrar": "Registrarse",
      "Já possui cadastro?": "¿Ya tiene una cuenta?",
      "Seu nome completo": "Su nombre completo",
      "Mínimo de 8 caracteres": "Mínimo de 8 caracteres",
      "Digite a senha novamente": "Introduzca la contraseña nuevamente",
      "Digite seu usuário": "Introduzca su usuario",
      "Digite sua senha": "Introduzca su contraseña",
      "Sua cidade mais conectada, seus serviços mais acessíveis.": "Una ciudad más conectada y servicios más accesibles.",
      "Sua cidade mais conectada,": "Una ciudad más conectada,",
      "seus serviços mais acessíveis.": "con servicios más accesibles.",
      "Solicite serviços": "Solicite servicios",
      "Registre solicitações e acompanhe seus atendimentos.": "Registre solicitudes y consulte su progreso.",
      "Encontre informações": "Encuentre información",
      "Consulte eventos, notícias e serviços da sua cidade.": "Consulte eventos, noticias y servicios de su ciudad.",
      "Acesse informações públicas de forma simples e segura.": "Acceda a información pública de forma sencilla y segura.",
      "Bem-vindo ao Portal": "¡Bienvenido al portal",
      "CityService!": "CityService!",
      "Bem-vindo ao Portal CityService!": "¡Bienvenido al portal CityService!",
      "Entre na sua conta para acessar os serviços da cidade.": "Inicie sesión para acceder a los servicios de la ciudad.",
      "Usuário ou e-mail": "Usuario o correo electrónico",
      "Mostrar ou ocultar senha": "Mostrar u ocultar contraseña",
      "Entrar": "Iniciar sesión",
      "Ainda não possui cadastro?": "¿Todavía no tiene una cuenta?",
      "Criar conta": "Crear cuenta",
      "Usuário ou senha inválidos. Confira os dados e tente novamente.": "Usuario o contraseña incorrectos. Revise los datos e inténtelo de nuevo.",
      "Informe um CPF válido.": "Introduzca un CPF válido.",
      "Informe um telefone válido com DDD.": "Introduzca un teléfono válido con código de área.",
      "A data de nascimento deve ser anterior à data atual.": "La fecha de nacimiento debe ser anterior a la fecha actual.",
      "A senha deve ter pelo menos 8 caracteres, incluindo letras e números.": "La contraseña debe tener al menos 8 caracteres e incluir letras y números.",
      "As senhas não coincidem.": "Las contraseñas no coinciden.",
      "Este e-mail já está cadastrado.": "Este correo electrónico ya está registrado.",
      "Este CPF já está cadastrado.": "Este CPF ya está registrado.",
      "Olá! Como podemos ajudar?": "¡Hola! ¿Cómo podemos ayudarle?",
      "Olá! Como podemos": "¡Hola! ¿Cómo podemos",
      "ajudar?": "ayudarle?",
      "Consulte serviços, registre solicitações e acompanhe suas demandas de forma simples e rápida.": "Consulte servicios, registre solicitudes y siga sus trámites de forma sencilla y rápida.",
      "+ Nova solicitação": "+ Nueva solicitud",
      "Acessar perfil": "Ver perfil",
      "Atendimento digital": "Atención digital",
      "Prazo de suporte": "Plazo de atención",
      "Acesso rápido": "Acceso rápido",
      "Atalhos rápidos": "Accesos directos",
      "Acesse os principais recursos do portal.": "Acceda a las principales funciones del portal.",
      "+ Registrar solicitação Informe um problema ou necessidade da sua região. →": "+ Registrar solicitud Informe de un problema o necesidad de su zona. →",
      "Registrar solicitação": "Registrar solicitud",
      "Informe um problema ou necessidade da sua região.": "Informe de un problema o necesidad de su zona.",
      "Acompanhar solicitações": "Consultar solicitudes",
      "Consulte o andamento dos seus atendimentos.": "Consulte el estado de sus solicitudes.",
      "Visualize problemas registrados pela população.": "Consulte los problemas registrados por la población.",
      "Consulte os serviços oferecidos pela prefeitura.": "Consulte los servicios ofrecidos por el ayuntamiento.",
      "Acompanhe as principais notícias da cidade.": "Siga las principales noticias de la ciudad.",
      "Consulte informações públicas da cidade.": "Consulte información pública de la ciudad.",
      "Notícias da Cidade": "Noticias de la ciudad",
      "Acompanhe comunicados oficiais, investimentos e novidades sobre os serviços públicos municipais.": "Consulte comunicados oficiales, inversiones y novedades sobre los servicios públicos municipales.",
      "Atendimento": "Atención",
      "Acompanhe suas solicitações": "Consulte sus solicitudes",
      "Consulte o andamento das demandas registradas nos bairros de Praia Grande.": "Consulte el estado de las solicitudes registradas en los barrios de Praia Grande.",
      "Ver solicitações →": "Ver solicitudes →",
      "Geolocalização": "Geolocalización",
      "Explore os pontos de atendimento e serviços ativos no município.": "Explore los puntos de atención y los servicios activos del municipio.",
      "Abrir mapa →": "Abrir mapa →",
      "Seleção da Prefeitura": "Selección del ayuntamiento",
      "Notícias em Destaque": "Noticias destacadas",
      "Veja as até 3 matérias marcadas como destaque no momento.": "Consulte las hasta 3 noticias destacadas actualmente.",
      "Ver destaques →": "Ver destacadas →",
      "Mais notícias e avisos": "Más noticias y avisos",
      "Praia Grande - SP": "Praia Grande, São Paulo",
      "As matérias mais relevantes selecionadas pela Prefeitura. No máximo 3 notícias ficam em destaque ao mesmo tempo — as demais continuam disponíveis na página de notícias.": "Las noticias más relevantes seleccionadas por el ayuntamiento. Se pueden destacar hasta 3 a la vez; las demás siguen disponibles en la página de noticias.",
      "Ver todas as notícias": "Ver todas las noticias",
      "Total": "Total",
      "Em análise": "En revisión",
      "Em andamento": "En curso",
      "Concluída": "Finalizada",
      "Concluídas": "Finalizadas",
      "Todos os status": "Todos los estados",
      "Resultados": "Resultados",
      "Carregando solicitações...": "Cargando solicitudes...",
      "Minhas Solicitações": "Mis solicitudes",
      "Acompanhe suas solicitações e consulte o andamento dos serviços solicitados à prefeitura.": "Consulte sus solicitudes y el progreso de los servicios solicitados al ayuntamiento.",
      "Pesquisar por protocolo ou serviço...": "Buscar por número de protocolo o servicio...",
      "0 solicitações": "0 solicitudes",
      "Indicadores": "Indicadores",
      "Acompanhe os dados reais das solicitações registradas no CityService.": "Consulte los datos reales de las solicitudes registradas en CityService.",
      "Total de solicitações": "Total de solicitudes",
      "Situação das solicitações": "Estado de las solicitudes",
      "Distribuição percentual por status": "Distribución porcentual por estado",
      "registros": "registros",
      "Solicitações por categoria": "Solicitudes por categoría",
      "Quantidade registrada em cada categoria": "Cantidad registrada en cada categoría",
      "Nenhuma solicitação cadastrada.": "No hay solicitudes registradas.",
      "Solicitações recentes": "Solicitudes recientes",
      "Últimos registros enviados": "Últimos registros enviados",
      "Ainda não existem solicitações para apresentar.": "Todavía no hay solicitudes para mostrar.",
      "Solicitação": "Solicitud",
      "Solicitação sem título": "Solicitud sin título",
      "Sem categoria": "Sin categoría",
      "Sem status": "Sin estado",
      "Data não informada": "Fecha no informada",
      "Gestão de solicitações": "Gestión de solicitudes",
      "Consulte solicitações registradas e atualize o andamento do atendimento.": "Consulte las solicitudes registradas y actualice el estado de atención.",
      "Total de solicitações locais": "Total de solicitudes locales",
      "Buscar por título": "Buscar por título",
      "Nenhuma solicitação local encontrada. Registros enviados na página de solicitações aparecerão aqui.": "No se encontraron solicitudes locales. Las solicitudes enviadas desde la página de solicitudes aparecerán aquí.",
      "Nenhuma solicitação encontrada": "No se encontraron solicitudes",
      "Tente alterar os termos da pesquisa ou o status selecionado.": "Pruebe con otros términos de búsqueda o cambie el estado seleccionado.",
      "Segurança": "Seguridad",
      "Registro local das ações realizadas nas páginas administrativas de demonstração.": "Registro local de las acciones realizadas en las páginas administrativas de demostración.",
      "Registros locais": "Registros locales",
      "Limpar registros": "Borrar registros",
      "Ainda não há ações registradas.": "Todavía no hay acciones registradas.",
      "Administração": "Administración",
      "Consulte os níveis e as permissões configuradas para esta demonstração.": "Consulte los niveles de acceso y permisos configurados para esta demostración.",
      "Perfis de acesso configurados": "Perfiles de acceso configurados",
      "A estrutura SQL enviada define tabelas para níveis, permissões e vínculos, mas ainda não possui registros de permissões. A matriz atual fica em": "La estructura SQL proporcionada define tablas para niveles, permisos y asignaciones, pero todavía no contiene registros de permisos. La matriz actual se encuentra en",
      "páginas liberadas": "páginas habilitadas",
      "Todas as permissões": "Todos los permisos",
      "Informações públicas": "Información pública",
      "Área destinada a documentos públicos, legislação municipal e informações sobre a administração da cidade.": "Sección dedicada a documentos públicos, legislación municipal e información sobre la administración de la ciudad.",
      "Legislação municipal": "Legislación municipal",
      "Espaço para leis, decretos e normas municipais oficiais.": "Espacio para leyes, decretos y normas municipales oficiales.",
      "Documentos oficiais pendentes de disponibilização.": "Documentos oficiales pendientes de publicación.",
      "Orçamento e despesas": "Presupuesto y gastos",
      "Espaço para demonstrativos de orçamento, receitas e despesas públicas.": "Espacio para informes de presupuesto, ingresos y gastos públicos.",
      "Dados oficiais pendentes de disponibilização.": "Datos oficiales pendientes de publicación.",
      "Contratos e licitações": "Contratos y licitaciones",
      "Espaço para editais, contratos e informações de processos públicos.": "Espacio para convocatorias, contratos e información sobre procesos públicos.",
      "Esta versão é demonstrativa. Os documentos ainda não estão conectados a um sistema externo ou banco de dados.": "Esta es una versión de demostración. Los documentos todavía no están conectados a un sistema externo ni a una base de datos.",
      "Ocorrências": "Incidencias",
      "Visualize solicitações registradas pela população em diferentes pontos de Praia Grande.": "Consulte las solicitudes registradas por la población en distintos puntos de Praia Grande.",
      "Serviços públicos": "Servicios públicos",
      "Consulte informações, orientações e serviços disponíveis através do CityService. Tudo em um só lugar, de forma rápida e transparente.": "Consulte información, orientación y servicios disponibles a través de CityService. Todo en un solo lugar, de forma rápida y transparente.",
      "Disponíveis": "Disponibles",
      "5 serviços": "5 servicios",
      "Catálogo": "Catálogo",
      "Consulta Unificada de Serviços Públicos": "Catálogo unificado de servicios públicos",
      "Esta funcionalidade disponibiliza ao cidadão um catálogo centralizado com todos os serviços municipais oferecidos pela prefeitura. A plataforma estrutura o acesso de forma simples e intuitiva, organizando os serviços por categorias estratégicas, como saúde, educação, obras e trânsito, e permitindo pesquisas rápidas. O objetivo principal é garantir total transparência e otimizar o tempo da população, evitando que o cidadão precise se deslocar até órgãos públicos físicos apenas para obter informações básicas. As informações são mantidas sempre atualizadas para assegurar a precisão e confiabilidade dos atendimentos.": "Esta función ofrece a la ciudadanía un catálogo centralizado de todos los servicios municipales. La plataforma organiza el acceso de forma sencilla e intuitiva, clasifica los servicios en categorías como salud, educación, obras y tráfico, y permite búsquedas rápidas. Su objetivo es garantizar la transparencia y ahorrar tiempo, evitando desplazamientos innecesarios a las oficinas públicas. La información se mantiene actualizada para ofrecer una atención precisa y confiable.",
      "Agenda": "Citas",
      "Agendamento On-line de Atendimentos": "Reserva de citas en línea",
      "Através deste serviço, os moradores podem marcar horários para o atendimento presencial em diversos órgãos e serviços públicos da cidade. A plataforma integrada permite selecionar a data, o horário e o local desejados de forma prática, reduzindo filas e otimizando o fluxo de trabalho dos servidores. O sistema conta com notificações automáticas que confirmam o agendamento e enviam lembretes sobre a data marcada. Esse gerenciamento digital transforma a experiência do usuário, eliminando a espera presencial prolongada e garantindo um atendimento mais pontual e organizado.": "Este servicio permite a los residentes reservar citas presenciales en distintas oficinas y servicios públicos de la ciudad. La plataforma facilita la selección de fecha, hora y lugar, reduce las filas y mejora la organización del personal. Las notificaciones automáticas confirman las citas y envían recordatorios. La gestión digital reduce los tiempos de espera y facilita una atención más puntual y organizada.",
      "Guia": "Guía",
      "Guia Digital e Orientações Documentais": "Guía digital y requisitos de documentación",
      "Para evitar retrabalho e viagens perdidas aos postos de atendimento, o CityService disponibiliza um guia completo e didático contendo todos os requisitos e documentos necessários para a execução de cada serviço público. O cidadão pode consultar previamente quais comprovantes, certidões ou formulários precisará apresentar, além de conferir eventuais taxas ou critérios de elegibilidade. Esse recurso instrui o usuário de maneira clara e transparente antes do atendimento físico, otimizando os processos burocráticos e aumentando a taxa de resolução das demandas no primeiro contato.": "Para evitar trámites repetidos y desplazamientos innecesarios, CityService ofrece una guía clara con los requisitos y documentos necesarios para cada servicio público. La ciudadanía puede consultar de antemano qué comprobantes, certificados o formularios debe presentar, así como las tasas o condiciones de elegibilidad. Este recurso permite prepararse antes de acudir a una oficina, agiliza los trámites y aumenta la posibilidad de resolver la solicitud en la primera atención.",
      "Digital": "Digital",
      "Repositório e Cópias Digitais": "Repositorio y copias digitales",
      "Com foco na inovação digital e sustentabilidade, este módulo permite o download e a emissão de cópias digitais autorizadas de documentos, certidões e formulários aplicáveis. O cidadão autenticado pode baixar seus arquivos diretamente pelo portal com total praticidade. Todos os documentos digitais disponibilizados são protegidos por mecanismos rigorosos de criptografia e segurança, garantindo a integridade dos dados e o cumprimento das diretrizes da Lei Geral de Proteção de Dados (LGPD).": "Con un enfoque en la innovación digital y la sostenibilidad, este módulo permite descargar y emitir copias digitales autorizadas de documentos, certificados y formularios. Las personas con sesión iniciada pueden obtener sus archivos directamente desde el portal. Los documentos disponibles cuentan con mecanismos de cifrado y seguridad para proteger la integridad de los datos y cumplir la Ley General de Protección de Datos de Brasil (LGPD).",
      "Presencial": "Presencial",
      "Locais de Retirada Física": "Lugares de recogida presencial",
      "Nos casos em que a emissão do documento exige a entrega de vias físicas originais, a plataforma orienta o cidadão detalhadamente sobre o local correto de retirada. O sistema indica os endereços, horários de funcionamento e procedimentos de postos credenciados, tais como Cartórios e unidades do Poupatempo. Além das direções, a funcionalidade fornece informações práticas sobre os requisitos necessários no ato da retirada física, garantindo total previsibilidade, praticidade e comodidade para o usuário.": "Cuando un documento requiere una copia física original, la plataforma orienta a la ciudadanía sobre el lugar de recogida adecuado. El sistema indica direcciones, horarios y procedimientos de centros autorizados, como notarías y oficinas de Poupatempo. También informa qué requisitos deben cumplirse al retirar el documento, para que el proceso sea previsible y cómodo.",
      "Saiba mais": "Más información",
      "Mostrar menos": "Mostrar menos",
      "Área de eventos": "Área de eventos",
      "Eventos atualmente oferecidos pela sua cidade": "Eventos disponibles actualmente en su ciudad",
      "Gerenciar eventos": "Administrar eventos",
      "Cadastre ou remova eventos divulgados no portal.": "Registre o elimine eventos publicados en el portal.",
      "Adicionar evento": "Añadir evento",
      "Eventos adicionados": "Eventos añadidos",
      "Serviço público": "Servicio público",
      "Festival de Cultura de Praia Grande": "Festival Cultural de Praia Grande",
      "Evento cultural com apresentações musicais, atividades artísticas e atrações para moradores e visitantes. A programação está prevista para setembro, com atividades voltadas à valorização da cultura local.": "Evento cultural con espectáculos musicales, actividades artísticas y propuestas para residentes y visitantes. La programación está prevista para septiembre e incluye actividades para poner en valor la cultura local.",
      "Data do evento": "Fecha del evento",
      "Setembro de 2026": "Septiembre de 2026",
      "Programação cultural prevista para diferentes dias do mês.": "Actividades culturales previstas para distintos días del mes.",
      "Local: espaços culturais de Praia Grande. Consulte a programação oficial.": "Lugar: espacios culturales de Praia Grande. Consulte la programación oficial.",
      "Semana do Esporte e Lazer": "Semana del Deporte y el Ocio",
      "Atividades esportivas e recreativas para a população, incentivando a prática de exercícios físicos e a convivência comunitária. A programação pode incluir aulas abertas, jogos e atividades ao ar livre durante setembro.": "Actividades deportivas y recreativas para la población, que fomentan el ejercicio físico y la convivencia comunitaria. La programación puede incluir clases abiertas, juegos y actividades al aire libre durante septiembre.",
      "Atividades previstas ao longo do mês, conforme a programação municipal.": "Actividades previstas durante el mes, según la programación municipal.",
      "Local: espaços esportivos e áreas públicas de Praia Grande.": "Lugar: instalaciones deportivas y espacios públicos de Praia Grande.",
      "Feira de Serviços à Comunidade": "Feria de Servicios para la Comunidad",
      "Ação voltada aos moradores de Praia Grande, reunindo orientações sobre serviços públicos, atividades educativas e informações úteis para a população. A iniciativa busca aproximar os cidadãos dos serviços oferecidos pelo município.": "Actividad para residentes de Praia Grande que reúne orientación sobre servicios públicos, actividades educativas e información útil. La iniciativa busca acercar a la ciudadanía a los servicios que ofrece el municipio.",
      "Público": "Público",
      "Moradores e visitantes": "Residentes y visitantes",
      "Atividade destinada à comunidade, com orientações e informações sobre serviços municipais.": "Actividad para la comunidad, con orientación e información sobre los servicios municipales.",
      "Local e horário: consulte a divulgação oficial da Prefeitura de Praia Grande.": "Lugar y horario: consulte el anuncio oficial del Ayuntamiento de Praia Grande.",
      "Nome do evento": "Nombre del evento",
      "Local do evento": "Lugar del evento",
      "URL da imagem (opcional)": "URL de la imagen (opcional)",
      "Descrição do evento": "Descripción del evento",
      "Onde estamos?": "¿Dónde estamos?",
      "Sobre o portal": "Acerca del portal",
      "Entrar": "Iniciar sesión",
      "Sua cidade.": "Su ciudad.",
      "Seus serviços.": "Sus servicios.",
      "Mais perto de você.": "Más cerca de usted.",
      "Acesse serviços públicos, registre solicitações e acompanhe suas demandas de forma simples, rápida e transparente.": "Acceda a servicios públicos, registre solicitudes y consulte sus trámites de forma sencilla, rápida y transparente.",
      "Acessar o portal": "Acceder al portal",
      "Conheça os serviços": "Conozca los servicios",
      "Online": "En línea",
      "Registre uma ocorrência": "Registrar una incidencia",
      "Nova solicitação": "Nueva solicitud",
      "Acompanhar solicitação": "Consultar solicitud",
      "Consulte seus atendimentos": "Consulte sus solicitudes",
      "Informações públicas": "Información pública",
      "Acesse informações da cidade": "Acceda a información de la ciudad",
      "Tudo em um só lugar": "Todo en un solo lugar",
      "Encontre os principais serviços e informações da sua cidade em um único portal.": "Encuentre los principales servicios e información de su ciudad en un solo portal.",
      "Registre problemas e acompanhe o andamento das suas solicitações.": "Registre problemas y consulte el estado de sus solicitudes.",
      "Serviços públicos": "Servicios públicos",
      "Consulte serviços oferecidos pela administração pública.": "Consulte los servicios ofrecidos por la administración pública.",
      "Localização": "Ubicación",
      "Onde Estamos?": "¿Dónde estamos?",
      "Encontre a unidade do Portal CityService em Praia Grande.": "Encuentre la sede del Portal CityService en Praia Grande.",
      "Uma cidade mais conectada": "Una ciudad más conectada",
      "O CityService aproxima o cidadão dos serviços públicos, facilitando o acesso a informações, solicitações e atendimentos em um único ambiente.": "CityService acerca a la ciudadanía a los servicios públicos y facilita el acceso a información, solicitudes y atención en un solo entorno.",
      "© 2026 CityService. Todos os direitos reservados.": "© 2026 CityService. Todos los derechos reservados.",
      "Minha localização": "Mi ubicación",
      "Você está aqui": "Usted está aquí",
      "Distância até o CityService: ": "Distancia hasta CityService: ",
      "Não foi possível obter sua localização.": "No se pudo obtener su ubicación.",
      "Seu navegador não permite obter sua localização.": "Su navegador no permite acceder a su ubicación.",
      "Selecione no mapa o local onde ocorreu o problema.": "Seleccione en el mapa el lugar donde ocurrió el problema.",
      "Solicitação enviada com sucesso!": "¡Solicitud enviada correctamente!",
      "Acesso não permitido": "Acceso no permitido",
      "Seu perfil": "Su perfil",
      "não possui permissão para acessar": "no tiene permiso para acceder a",
      "Excluir serviço": "Eliminar servicio",
      "Excluir evento": "Eliminar evento",
      "Cadastro realizado com sucesso! Você será direcionado para o login.": "¡Cuenta creada correctamente! Será redirigido al inicio de sesión.",
      "Voltar ao início": "Volver al inicio",
      "Local a confirmar": "Ubicación por confirmar",
      "Categoria:": "Categoría:",
      "Status:": "Estado:",
      "Outros": "Otros",
      "Atualizado em": "Actualizado el",
      "Não informada": "No informada",
      "esta página": "esta página",
      'Sua solicitação "{title}" foi enviada e está em análise.': 'Su solicitud “{title}” se ha enviado y está en revisión.',
      'A solicitação "{title}" agora está: {status}.': 'La solicitud “{title}” ahora está: {status}.' 
    }
  };

  function normalize(value) {
    return String(value == null ? "" : value).replace(/\s+/g, " ").trim();
  }

  function getLanguage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return SUPPORTED_LANGUAGES.includes(saved) ? saved : DEFAULT_LANGUAGE;
    } catch (error) {
      return DEFAULT_LANGUAGE;
    }
  }

  function getLocale(language) {
    const current = language || getLanguage();
    return current === "en" ? "en-US" : current === "es" ? "es-ES" : "pt-BR";
  }

  function findPortugueseKey(value) {
    const normalized = normalize(value);
    if (!normalized) return null;
    for (const language of SUPPORTED_LANGUAGES) {
      if (language === "pt-BR") continue;
      const dictionary = translations[language] || {};
      for (const [portuguese, translated] of Object.entries(dictionary)) {
        if (normalize(translated) === normalized) return portuguese;
      }
    }
    return null;
  }

  function translateCount(value, language) {
    const normalized = normalize(value);
    const patterns = [
      { regex: /^(\d+)\s+(?:páginas liberadas|pages enabled|páginas habilitadas)$/i, singular: null, plural: { "pt-BR": "páginas liberadas", en: "pages enabled", es: "páginas habilitadas" } },
      { regex: /^(\d+)\s+(?:serviços|services|servicios)$/i, singular: { "pt-BR": "serviço", en: "service", es: "servicio" }, plural: { "pt-BR": "serviços", en: "services", es: "servicios" } },
      { regex: /^(\d+)\s+(?:solicitação|solicitações|request|requests|solicitud|solicitudes)$/i, singular: { "pt-BR": "solicitação", en: "request", es: "solicitud" }, plural: { "pt-BR": "solicitações", en: "requests", es: "solicitudes" } },
      { regex: /^(\d+)\s+(?:registro|registros|record|records|registro|registros)$/i, singular: { "pt-BR": "registro", en: "record", es: "registro" }, plural: { "pt-BR": "registros", en: "records", es: "registros" } }
    ];
    for (const pattern of patterns) {
      const match = normalized.match(pattern.regex);
      if (!match) continue;
      const count = Number(match[1]);
      const forms = count === 1 && pattern.singular ? pattern.singular : pattern.plural;
      return `${count} ${forms[language]}`;
    }
    return null;
  }

  function translate(value, language) {
    const currentLanguage = language || getLanguage();
    const normalized = normalize(value);
    if (!normalized) return normalized;
    const countTranslation = translateCount(normalized, currentLanguage);
    if (countTranslation !== null) return countTranslation;
    if (currentLanguage === "pt-BR") {
      const portugueseKey = findPortugueseKey(normalized);
      return portugueseKey || normalized;
    }
    const portugueseKey = Object.prototype.hasOwnProperty.call(translations[currentLanguage] || {}, normalized)
      ? normalized
      : findPortugueseKey(normalized);
    if (!portugueseKey) return normalized;
    return (translations[currentLanguage] || {})[portugueseKey] || portugueseKey;
  }

  function translateTextNode(node, language) {
    if (!node || node.nodeType !== Node.TEXT_NODE) return;
    const currentValue = node.nodeValue;
    if (!currentValue || !normalize(currentValue)) return;

    if (node.__cityServiceLastValue !== undefined && currentValue !== node.__cityServiceLastValue) {
      node.__cityServiceOriginalKey = null;
    }

    if (!node.__cityServiceOriginalKey) {
      const currentText = normalize(currentValue);
      node.__cityServiceOriginalKey = Object.prototype.hasOwnProperty.call(translations.en, currentText) ||
        Object.prototype.hasOwnProperty.call(translations.es, currentText)
        ? currentText
        : findPortugueseKey(currentText) || currentText;
    }

    const key = node.__cityServiceOriginalKey;
    const translated = translate(key, language);
    const prefix = currentValue.match(/^\s*/)[0];
    const suffix = currentValue.match(/\s*$/)[0];
    const nextValue = prefix + translated + suffix;

    if (node.nodeValue !== nextValue) node.nodeValue = nextValue;
    node.__cityServiceLastValue = nextValue;
  }

  function translateAttribute(element, name, language) {
    const currentValue = element.getAttribute(name);
    if (currentValue == null || !normalize(currentValue)) return;

    element.__cityServiceOriginalAttributes = element.__cityServiceOriginalAttributes || {};
    element.__cityServiceLastAttributes = element.__cityServiceLastAttributes || {};

    if (element.__cityServiceLastAttributes[name] !== undefined && currentValue !== element.__cityServiceLastAttributes[name]) {
      delete element.__cityServiceOriginalAttributes[name];
    }

    if (!element.__cityServiceOriginalAttributes[name]) {
      const normalized = normalize(currentValue);
      element.__cityServiceOriginalAttributes[name] = findPortugueseKey(normalized) || normalized;
    }

    const key = element.__cityServiceOriginalAttributes[name];
    const translated = translate(key, language);
    if (currentValue !== translated) element.setAttribute(name, translated);
    element.__cityServiceLastAttributes[name] = translated;
  }

  function applyTranslations(root, language) {
    const target = root || document;
    const currentLanguage = language || getLanguage();
    if (target.nodeType === Node.ELEMENT_NODE) {
      ["placeholder", "aria-label", "title", "alt"].forEach(name => translateAttribute(target, name, currentLanguage));
    }

    const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) translateTextNode(node, currentLanguage);

    if (target.querySelectorAll) {
      target.querySelectorAll("[placeholder], [aria-label], [title], [alt]").forEach(element => {
        ["placeholder", "aria-label", "title", "alt"].forEach(name => translateAttribute(element, name, currentLanguage));
      });
    }

    if (target === document || target === document.documentElement) {
      document.documentElement.lang = currentLanguage;
    }
  }

  function setLanguage(language) {
    if (!SUPPORTED_LANGUAGES.includes(language)) return false;
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch (error) {
      console.warn("Não foi possível salvar a preferência de idioma.", error);
    }
    document.documentElement.lang = language;
    applyTranslations(document, language);
    document.dispatchEvent(new CustomEvent("cityservice:languagechange", { detail: { language } }));
    return true;
  }

  window.CityServiceTranslate = {
    defaultLanguage: DEFAULT_LANGUAGE,
    supportedLanguages: SUPPORTED_LANGUAGES.slice(),
    getLanguage,
    getLocale,
    setLanguage,
    t: translate,
    apply: applyTranslations
  };

  const observer = new MutationObserver(records => {
    const language = getLanguage();
    records.forEach(record => {
      if (record.type === "characterData") {
        translateTextNode(record.target, language);
        return;
      }
      record.addedNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) translateTextNode(node, language);
        else if (node.nodeType === Node.ELEMENT_NODE) applyTranslations(node, language);
      });
      if (record.type === "attributes" && record.target.nodeType === Node.ELEMENT_NODE) {
        translateAttribute(record.target, record.attributeName, language);
      }
    });
  });

  function initialize() {
    const language = getLanguage();
    document.documentElement.lang = language;
    applyTranslations(document, language);
    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["placeholder", "aria-label", "title", "alt"]
    });

    window.addEventListener("storage", event => {
      if (event.key === STORAGE_KEY && SUPPORTED_LANGUAGES.includes(event.newValue)) {
        document.documentElement.lang = event.newValue;
        applyTranslations(document, event.newValue);
        document.dispatchEvent(new CustomEvent("cityservice:languagechange", { detail: { language: event.newValue } }));
      }
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize, { once: true });
  else initialize();
})();
