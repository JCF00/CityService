USE cityservice;

INSERT INTO niveis_permissao (id, nome, descricao, nivel_hierarquia) VALUES
(1, 'Usuário', 'Cidadão que utiliza os serviços e acompanha suas solicitações', 1),
(2, 'Atendente', 'Consulta solicitações e atualiza seus status', 2),
(3, 'Administrador', 'Acesso administrativo completo ao sistema', 3);

INSERT INTO permissoes (id, nome, descricao) VALUES
(1, 'ver_servicos', 'Consultar os serviços públicos'),
(2, 'criar_solicitacao', 'Registrar uma solicitação'),
(3, 'ver_proprias_solicitacoes', 'Consultar as próprias solicitações'),
(4, 'ver_mapa', 'Consultar o mapa de ocorrências'),
(5, 'ver_eventos', 'Consultar eventos públicos'),
(6, 'ver_noticias', 'Consultar notícias e destaques'),
(7, 'editar_proprio_perfil', 'Consultar e atualizar o próprio perfil'),
(8, 'ver_notificacoes', 'Consultar e marcar notificações como lidas'),
(9, 'ver_solicitacoes', 'Consultar solicitações para atendimento'),
(10, 'atualizar_status', 'Atualizar o status de solicitações'),
(11, 'acessar_dashboard', 'Consultar indicadores e relatórios do painel'),
(12, 'gerenciar_usuarios', 'Consultar e administrar usuários'),
(13, 'acessar_auditoria', 'Consultar registros de auditoria'),
(14, 'gerenciar_noticias', 'Administrar notícias'),
(15, 'gerenciar_eventos', 'Administrar eventos'),
(16, 'gerenciar_servicos', 'Administrar serviços públicos'),
(17, 'gerenciar_permissoes', 'Administrar níveis e permissões'),
(18, 'ver_transparencia', 'Consultar informações de transparência'),
(19, 'acessar_inicio', 'Acessar a página inicial');

INSERT INTO niveis_permissoes (nivel_id, permissao_id) VALUES
-- Usuário: recursos públicos e suas próprias solicitações
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 18), (1, 19),
-- Atendente: páginas públicas, gestão de solicitações e dashboard
(2, 1), (2, 4), (2, 5), (2, 6), (2, 8), (2, 9), (2, 10), (2, 11), (2, 18), (2, 19),
-- Administrador: permissões completas e explicitadas para facilitar a leitura
(3, 1), (3, 2), (3, 3), (3, 4), (3, 5), (3, 6), (3, 7), (3, 8), (3, 9), (3, 10),
(3, 11), (3, 12), (3, 13), (3, 14), (3, 15), (3, 16), (3, 17), (3, 18), (3, 19);

INSERT INTO usuarios
(id, nome, email, senha_hash, cpf, data_nascimento, telefone, nivel_id, status, avatar_url, ultimo_login, data_cadastro)
VALUES
(1, 'Ana Martins', 'ana.martins@example.com', 'HASH_DEMO_001', '00000000001', '1990-04-12', '11900001001', 1, 'ativo', NULL, '2026-10-20 09:30:00', '2026-01-10 10:00:00'),
(2, 'Bruno Almeida', 'bruno.almeida@example.com', 'HASH_DEMO_002', '00000000002', '1985-08-23', '11900001002', 1, 'ativo', NULL, '2026-10-21 14:20:00', '2026-01-11 11:00:00'),
(3, 'Carla Ferreira', 'carla.ferreira@example.com', 'HASH_DEMO_003', '00000000003', '1994-02-17', '11900001003', 1, 'ativo', NULL, NULL, '2026-02-01 08:00:00'),
(4, 'Diego Santos', 'diego.santos@example.com', 'HASH_DEMO_004', '00000000004', '1988-11-05', '11900001004', 2, 'ativo', NULL, '2026-10-22 08:15:00', '2026-01-12 09:00:00'),
(5, 'Elisa Costa', 'elisa.costa@example.com', 'HASH_DEMO_005', '00000000005', '1992-06-30', '11900001005', 2, 'ativo', NULL, '2026-10-22 10:00:00', '2026-01-13 09:00:00'),
(6, 'Fabio Ribeiro', 'fabio.ribeiro@example.com', 'HASH_DEMO_006', '00000000006', '1980-01-19', '11900001006', 3, 'ativo', NULL, '2026-10-23 16:00:00', '2026-01-14 09:00:00'),
(7, 'Gabriela Lima', 'gabriela.lima@example.com', 'HASH_DEMO_007', '00000000007', '1997-09-14', '11900001007', 1, 'pendente', NULL, NULL, '2026-10-01 12:00:00'),
(8, 'Henrique Souza', 'henrique.souza@example.com', 'HASH_DEMO_008', '00000000008', '1987-03-08', '11900001008', 1, 'inativo', NULL, NULL, '2026-03-01 15:00:00');

-- Contas ilustrativas das três funções da versão atual.
-- O site ainda usa localStorage; estes registros são exemplos para o banco, não logins ativos.
INSERT INTO usuarios
(id, nome, email, senha_hash, cpf, data_nascimento, telefone, nivel_id, status, avatar_url, ultimo_login, data_cadastro)
VALUES
(9, 'Usuário Demonstração', 'usuario@cityservice.local', 'HASH_DEMO_USUARIO', '00000000009', NULL, NULL, 1, 'ativo', NULL, NULL, CURRENT_TIMESTAMP),
(10, 'Atendente Demonstração', 'atendente@cityservice.local', 'HASH_DEMO_ATENDENTE', '00000000010', NULL, NULL, 2, 'ativo', NULL, NULL, CURRENT_TIMESTAMP),
(11, 'Administrador Demonstração', 'administrador@cityservice.local', 'HASH_DEMO_ADMIN', '00000000011', NULL, NULL, 3, 'ativo', NULL, NULL, CURRENT_TIMESTAMP);

INSERT INTO categorias_solicitacao
(id, nome, descricao, icone, ativo)
VALUES
(1, 'Iluminação pública', 'Problemas com postes e lâmpadas', 'lightbulb', 1),
(2, 'Limpeza urbana', 'Coleta de resíduos e limpeza de ruas', 'trash', 1),
(3, 'Pavimentação', 'Buracos e problemas nas vias públicas', 'road', 1),
(4, 'Saneamento', 'Problemas de esgoto e drenagem', 'droplets', 1),
(5, 'Áreas verdes', 'Praças, árvores e jardins públicos', 'trees', 1),
(6, 'Trânsito', 'Sinalização e problemas viários', 'traffic-cone', 1);

INSERT INTO solicitacoes
(id, protocolo, usuario_id, categoria_id, atendente_id, titulo, descricao, latitude, longitude, endereco, status, data_criacao, data_atualizacao, data_conclusao)
VALUES
(1, 'CS-2026-000001', 1, 1, 4, 'Poste com lâmpada apagada', 'Lâmpada apagada em poste de iluminação da rua.', -23.5505200, -46.6333080, 'Rua das Flores, 100', 'concluida', '2026-02-10 09:00:00', '2026-02-12 15:00:00', '2026-02-12 15:00:00'),
(2, 'CS-2026-000002', 2, 2, 4, 'Acúmulo de resíduos', 'Há resíduos acumulados próximo à calçada.', -23.5614140, -46.6558810, 'Avenida Central, 250', 'em_andamento', '2026-03-05 10:30:00', '2026-03-06 11:00:00', NULL),
(3, 'CS-2026-000003', 3, 3, 5, 'Buraco na via', 'Buraco na pista que dificulta a passagem de veículos.', -23.5700000, -46.6400000, 'Rua do Parque, 45', 'em_analise', '2026-04-02 14:00:00', '2026-04-02 14:00:00', NULL),
(4, 'CS-2026-000004', 1, 4, 5, 'Bueiro com retorno de água', 'Água acumulada próxima ao bueiro após chuva.', -23.5450000, -46.6200000, 'Rua do Lago, 80', 'em_andamento', '2026-05-12 08:20:00', '2026-05-13 09:00:00', NULL),
(5, 'CS-2026-000005', 2, 5, NULL, 'Árvore caída na praça', 'Galho grande caído em área de circulação.', -23.5350000, -46.6150000, 'Praça das Palmeiras', 'em_analise', '2026-06-18 16:45:00', '2026-06-18 16:45:00', NULL),
(6, 'CS-2026-000006', 3, 6, 4, 'Placa de trânsito danificada', 'Placa de sinalização está danificada.', -23.5800000, -46.6500000, 'Avenida Norte, 400', 'concluida', '2026-07-01 07:30:00', '2026-07-04 13:00:00', '2026-07-04 13:00:00'),
(7, 'CS-2026-000007', 7, 2, NULL, 'Lixeira pública cheia', 'Lixeira pública necessita de recolhimento.', NULL, NULL, 'Rua do Mercado, 20', 'em_analise', '2026-08-10 11:00:00', '2026-08-10 11:00:00', NULL),
(8, 'CS-2026-000008', 8, 3, 5, 'Desnível na calçada', 'Calçada com desnível que dificulta a circulação.', NULL, NULL, 'Rua das Acácias, 70', 'cancelada', '2026-09-03 12:00:00', '2026-09-04 09:00:00', NULL);

INSERT INTO historico_solicitacoes
(id, solicitacao_id, usuario_id, status_anterior, status_novo, data_alteracao)
VALUES
(1, 1, 4, 'em_analise', 'em_andamento', '2026-02-10 14:00:00'),
(2, 1, 4, 'em_andamento', 'concluida', '2026-02-12 15:00:00'),
(3, 2, 4, 'em_analise', 'em_andamento', '2026-03-06 11:00:00'),
(4, 4, 5, 'em_analise', 'em_andamento', '2026-05-13 09:00:00'),
(5, 6, 4, 'em_analise', 'em_andamento', '2026-07-02 10:00:00'),
(6, 6, 4, 'em_andamento', 'concluida', '2026-07-04 13:00:00'),
(7, 8, 5, 'em_analise', 'cancelada', '2026-09-04 09:00:00');

INSERT INTO anexos
(id, solicitacao_id, nome_arquivo, url, tipo_arquivo, tamanho_bytes, data_envio)
VALUES
(1, 1, 'poste_apagado.jpg', 'https://example.com/anexos/poste_apagado.jpg', 'image/jpeg', 245000, '2026-02-10 09:10:00'),
(2, 2, 'residuos_rua.jpg', 'https://example.com/anexos/residuos_rua.jpg', 'image/jpeg', 312000, '2026-03-05 10:35:00'),
(3, 3, 'buraco_via.jpg', 'https://example.com/anexos/buraco_via.jpg', 'image/jpeg', 287000, '2026-04-02 14:05:00'),
(4, 5, 'arvore_praca.jpg', 'https://example.com/anexos/arvore_praca.jpg', 'image/jpeg', 410000, '2026-06-18 16:50:00');

INSERT INTO categorias_noticia (id, nome, ativo) VALUES
(1, 'Obras públicas', 1),
(2, 'Meio ambiente', 1),
(3, 'Saúde', 1),
(4, 'Educação', 1),
(5, 'Comunicados', 1);

INSERT INTO noticias
(id, autor_id, categoria_id, titulo, subtitulo, conteudo, imagem_url, destaque, status, data_publicacao, horario_publicacao, visualizacoes, data_cadastro, data_atualizacao, data_exclusao)
VALUES
(1, 6, 1, 'Melhorias na pavimentação urbana', 'Programa de manutenção de vias', 'A administração municipal informa que as equipes de manutenção estão atuando em vias que necessitam de reparos. O cronograma será divulgado pelos canais oficiais.', NULL, 1, 'publicado', '2026-02-15', '09:00:00', 120, '2026-02-14 16:00:00', '2026-02-15 09:00:00', NULL),
(2, 4, 2, 'Campanha de limpeza dos bairros', 'Colabore com a conservação dos espaços públicos', 'A campanha busca conscientizar a população sobre o descarte correto de resíduos e a conservação das áreas públicas.', NULL, 1, 'publicado', '2026-04-10', '10:00:00', 85, '2026-04-09 14:00:00', '2026-04-10 10:00:00', NULL),
(3, 5, 5, 'Atualização dos canais de atendimento', 'Novas orientações para solicitações', 'Os cidadãos podem utilizar o sistema para registrar solicitações e acompanhar as atualizações de seus protocolos.', NULL, 0, 'publicado', '2026-06-20', '08:30:00', 63, '2026-06-19 15:00:00', '2026-06-20 08:30:00', NULL),
(4, 6, 4, 'Projeto de atividades educacionais', 'Informações sobre ações comunitárias', 'A programação de atividades educacionais será divulgada nos canais oficiais do município.', NULL, 0, 'rascunho', NULL, NULL, 0, '2026-08-01 10:00:00', '2026-08-01 10:00:00', NULL);

INSERT INTO eventos
(id, autor_id, titulo, descricao, imagem_url, local, data_inicio, data_fim, publico_alvo, status, data_cadastro)
VALUES
(1, 4, 'Mutirão de limpeza', 'Ação comunitária de limpeza e conservação dos espaços públicos.', NULL, 'Praça Central', '2026-11-10', '2026-11-10', 'Moradores', 'ativo', '2026-09-01 09:00:00'),
(2, 5, 'Feira de serviços públicos', 'Evento informativo sobre serviços disponíveis à população.', NULL, 'Centro Comunitário', '2026-11-20', '2026-11-21', 'Todos os cidadãos', 'ativo', '2026-09-05 10:00:00'),
(3, 6, 'Encontro sobre meio ambiente', 'Atividade de conscientização ambiental.', NULL, 'Parque Municipal', '2026-08-15', '2026-08-15', 'Famílias e estudantes', 'encerrado', '2026-07-01 11:00:00'),
(4, 4, 'Reunião comunitária', 'Reunião para apresentação de melhorias previstas.', NULL, 'Auditório Municipal', '2026-12-05', '2026-12-05', 'Moradores', 'ativo', '2026-09-10 14:00:00');

INSERT INTO servicos
(id, nome, categoria, descricao_curta, descricao_completa, icone, ativo)
VALUES
(1, 'Solicitações urbanas', 'Atendimento', 'Registre problemas da cidade', 'Permite registrar e acompanhar solicitações relacionadas aos serviços urbanos.', 'clipboard-list', 1),
(2, 'Coleta de resíduos', 'Meio ambiente', 'Informações sobre coleta', 'Consulte orientações sobre descarte e coleta de resíduos.', 'trash', 1),
(3, 'Iluminação pública', 'Infraestrutura', 'Problemas de iluminação', 'Canal para comunicar problemas em postes e luminárias públicas.', 'lightbulb', 1),
(4, 'Obras e pavimentação', 'Infraestrutura', 'Informações sobre vias', 'Canal para solicitações relacionadas a ruas, calçadas e pavimentação.', 'road', 1),
(5, 'Agenda municipal', 'Eventos', 'Consulte eventos públicos', 'Consulte eventos, campanhas e atividades municipais.', 'calendar', 1),
(6, 'Notícias municipais', 'Comunicação', 'Acompanhe comunicados', 'Consulte notícias e comunicados publicados pela administração.', 'newspaper', 1);

INSERT INTO notificacoes
(id, usuario_id, tipo, titulo, mensagem, referencia_tipo, referencia_id, lida, data_criacao)
VALUES
(1, 1, 'solicitacao_concluida', 'Solicitação concluída', 'Sua solicitação de iluminação pública foi concluída.', 'solicitacao', 1, 1, '2026-02-12 15:05:00'),
(2, 2, 'solicitacao_atualizada', 'Solicitação em andamento', 'Sua solicitação de limpeza urbana está em atendimento.', 'solicitacao', 2, 0, '2026-03-06 11:05:00'),
(3, 3, 'nova_noticia', 'Nova notícia publicada', 'Confira as informações sobre melhorias na pavimentação.', 'noticia', 1, 0, '2026-02-15 09:10:00'),
(4, 1, 'sistema', 'Bem-vindo ao CityService', 'Seu cadastro está ativo no sistema.', NULL, NULL, 1, '2026-01-10 10:05:00'),
(5, 7, 'solicitacao_atualizada', 'Solicitação registrada', 'Sua solicitação foi registrada e aguarda análise.', 'solicitacao', 7, 0, '2026-08-10 11:05:00');

INSERT INTO logs_acesso
(id, usuario_id, acao, ip, user_agent, data_acesso)
VALUES
(1, 1, 'login', '192.0.2.10', 'Navegador de teste', '2026-10-20 09:30:00'),
(2, 2, 'login', '192.0.2.11', 'Navegador de teste', '2026-10-21 14:20:00'),
(3, 4, 'atender_solicitacao', '192.0.2.12', 'Navegador de teste', '2026-10-22 08:15:00'),
(4, 5, 'publicar_noticia', '192.0.2.13', 'Navegador de teste', '2026-10-22 10:00:00'),
(5, 6, 'login', '192.0.2.14', 'Navegador de teste', '2026-10-23 16:00:00'),
(6, NULL, 'tentativa_login', '192.0.2.15', 'Navegador de teste', '2026-10-24 18:00:00');