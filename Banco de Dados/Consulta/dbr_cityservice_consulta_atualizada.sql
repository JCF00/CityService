
USE cityservice;

SHOW DATABASES;
SHOW TABLES;

SELECT * FROM usuarios;

SELECT * FROM solicitacoes;

SELECT * FROM noticias;

SELECT * FROM categorias_solicitacao;

SELECT * FROM eventos;

SELECT * FROM servicos;

SELECT nome, email, status
FROM usuarios
WHERE status = 'ativo';

SELECT titulo, status
FROM solicitacoes
WHERE status = 'em_analise';

SELECT titulo, data_publicacao
FROM noticias
WHERE status = 'publicado';

SELECT nome, descricao
FROM servicos
WHERE ativo = 1;

SELECT nome, email, status
FROM usuarios
WHERE status = 'ativo'
AND nivel_id = 1;

SELECT titulo, status
FROM solicitacoes
WHERE status = 'em_analise'
OR status = 'em_andamento';

SELECT nome, nivel_id
FROM usuarios
WHERE nivel_id = 2
OR nivel_id = 3;

SELECT nome, nivel_id
FROM usuarios
WHERE nivel_id BETWEEN 1 AND 2;

SELECT id, titulo, visualizacoes
FROM noticias
WHERE visualizacoes BETWEEN 50 AND 100;

SELECT id, titulo, visualizacoes
FROM noticias
WHERE visualizacoes NOT BETWEEN 50 AND 100;

SELECT nome, status
FROM usuarios
WHERE status IN ('ativo', 'pendente');

SELECT titulo, status
FROM solicitacoes
WHERE status IN ('em_analise', 'concluida');

SELECT nome
FROM categorias_solicitacao
WHERE id NOT IN (
    SELECT categoria_id
    FROM solicitacoes
);

SELECT *
FROM usuarios
WHERE nome LIKE 'A%';

SELECT *
FROM usuarios
WHERE nome LIKE '%a';

SELECT *
FROM usuarios
WHERE nome LIKE '%Silva%';

SELECT *
FROM noticias
WHERE titulo LIKE '%cidade%';

SELECT *
FROM usuarios
WHERE nome LIKE '___a%';

SELECT *
FROM usuarios
ORDER BY nome ASC;

SELECT *
FROM usuarios
ORDER BY nome DESC;

SELECT nome, nivel_id, status
FROM usuarios
ORDER BY nivel_id, nome;

SELECT titulo, visualizacoes
FROM noticias
ORDER BY visualizacoes DESC;

SELECT titulo, data_criacao
FROM solicitacoes
ORDER BY data_criacao DESC;

SELECT CONCAT('City', 'Service') AS nome_sistema;

SELECT nome, CONCAT(nome, ' - ', email) AS dados_usuario
FROM usuarios;

SELECT nome, LENGTH(nome) AS tamanho_nome
FROM usuarios
ORDER BY nome;

SELECT
    nome,
    nivel_id,
    nivel_id * 100 AS valor_calculado
FROM usuarios;

SELECT
    nome,
    CONCAT('Usuario: ', nome) AS identificacao
FROM usuarios
ORDER BY nome;

SELECT
    data_criacao,
    DATEDIFF(CURDATE(), data_criacao) AS dias_desde_criacao
FROM solicitacoes;

SELECT
    data_criacao,
    DATEDIFF(CURDATE(), data_criacao) / 360 AS anos_aproximados
FROM solicitacoes;

SELECT
    data_criacao,
    data_criacao + INTERVAL 15 DAY AS data_futura
FROM solicitacoes;

SELECT
    data_criacao,
    data_criacao + INTERVAL 3 MONTH AS data_futura
FROM solicitacoes;

SELECT
    data_criacao,
    DAY(data_criacao) AS dia,
    MONTH(data_criacao) AS mes,
    YEAR(data_criacao) AS ano,
    DAYNAME(data_criacao) AS nome_dia,
    MONTHNAME(data_criacao) AS nome_mes,
    DAYOFWEEK(data_criacao) AS dia_semana
FROM solicitacoes;

SELECT MIN(visualizacoes) AS menor_visualizacao,
       MAX(visualizacoes) AS maior_visualizacao
FROM noticias;

SELECT SUM(visualizacoes) AS total_visualizacoes
FROM noticias;

SELECT AVG(visualizacoes) AS media_visualizacoes
FROM noticias;

SELECT COUNT(*) AS total_usuarios
FROM usuarios;

SELECT COUNT(*) AS total_solicitacoes
FROM solicitacoes;

SELECT SUM(tamanho_bytes) AS total_bytes
FROM anexos;

SELECT
    status,
    COUNT(*) AS total_usuarios
FROM usuarios
GROUP BY status;

SELECT
    status,
    COUNT(*) AS total_solicitacoes
FROM solicitacoes
GROUP BY status;

SELECT
    categoria_id,
    COUNT(*) AS total_noticias
FROM noticias
GROUP BY categoria_id;

SELECT
    usuario_id,
    COUNT(*) AS total_solicitacoes
FROM solicitacoes
GROUP BY usuario_id;

SELECT
    status,
    COUNT(*) AS total_solicitacoes
FROM solicitacoes
GROUP BY status
HAVING total_solicitacoes >= 2;

SELECT
    usuario_id,
    COUNT(*) AS total_solicitacoes
FROM solicitacoes
GROUP BY usuario_id
HAVING total_solicitacoes >= 2;

SELECT
    categoria_id,
    COUNT(*) AS total_noticias
FROM noticias
GROUP BY categoria_id
HAVING total_noticias >= 2;

SELECT
    u.nome,
    s.protocolo,
    s.titulo,
    s.status
FROM usuarios AS u
INNER JOIN solicitacoes AS s
    ON u.id = s.usuario_id;

SELECT
    s.protocolo,
    s.titulo,
    c.nome AS categoria,
    s.status
FROM solicitacoes AS s
INNER JOIN categorias_solicitacao AS c
    ON s.categoria_id = c.id;

SELECT
    n.titulo,
    u.nome AS autor,
    c.nome AS categoria
FROM noticias AS n
INNER JOIN usuarios AS u
    ON n.autor_id = u.id
INNER JOIN categorias_noticia AS c
    ON n.categoria_id = c.id;

SELECT
    e.titulo,
    e.local,
    e.data_inicio,
    u.nome AS autor
FROM eventos AS e
INNER JOIN usuarios AS u
    ON e.autor_id = u.id;

SELECT
    u.nome,
    s.protocolo,
    s.titulo,
    s.status
FROM usuarios AS u
INNER JOIN solicitacoes AS s
    ON u.id = s.usuario_id
WHERE s.status = 'em_analise';

SELECT
    u.nome,
    s.protocolo,
    s.titulo,
    s.status
FROM usuarios AS u
INNER JOIN solicitacoes AS s
    ON u.id = s.usuario_id
WHERE u.status = 'ativo'
AND s.status = 'concluida';

SELECT
    n.titulo,
    u.nome AS autor,
    n.visualizacoes
FROM noticias AS n
INNER JOIN usuarios AS u
    ON n.autor_id = u.id
WHERE n.status = 'publicado'
ORDER BY n.visualizacoes DESC;

SELECT
    u.nome,
    s.protocolo,
    s.titulo
FROM usuarios AS u
LEFT JOIN solicitacoes AS s
    ON u.id = s.usuario_id;

SELECT
    u.nome
FROM usuarios AS u
LEFT JOIN solicitacoes AS s
    ON u.id = s.usuario_id
WHERE s.id IS NULL;

SELECT
    c.nome
FROM categorias_solicitacao AS c
LEFT JOIN solicitacoes AS s
    ON c.id = s.categoria_id
WHERE s.id IS NULL;

SELECT
    c.nome AS categoria,
    COUNT(s.id) AS total_solicitacoes
FROM solicitacoes AS s
RIGHT JOIN categorias_solicitacao AS c
    ON s.categoria_id = c.id
GROUP BY c.id, c.nome;

SELECT
    c.nome AS categoria,
    sv.nome AS servico
FROM categorias_solicitacao AS c
CROSS JOIN servicos AS sv;

SELECT
    c.nome AS categoria,
    COUNT(s.id) AS total_solicitacoes
FROM categorias_solicitacao AS c
LEFT JOIN solicitacoes AS s
    ON c.id = s.categoria_id
GROUP BY c.id, c.nome
ORDER BY total_solicitacoes DESC;

SELECT
    u.nome,
    COUNT(s.id) AS total_solicitacoes
FROM usuarios AS u
LEFT JOIN solicitacoes AS s
    ON u.id = s.usuario_id
GROUP BY u.id, u.nome
HAVING total_solicitacoes >= 1
ORDER BY total_solicitacoes DESC;

SELECT *
FROM usuarios
WHERE id IN (
    SELECT usuario_id
    FROM solicitacoes
);

SELECT nome
FROM categorias_solicitacao
WHERE id IN (
    SELECT categoria_id
    FROM solicitacoes
    WHERE status = 'concluida'
);

SELECT titulo, visualizacoes
FROM noticias
WHERE visualizacoes > (
    SELECT AVG(visualizacoes)
    FROM noticias
);

SELECT nome
FROM usuarios
WHERE id NOT IN (
    SELECT usuario_id
    FROM solicitacoes
);

SELECT
    titulo,
    visualizacoes
FROM noticias
WHERE visualizacoes > (
    SELECT AVG(visualizacoes)
    FROM noticias
);

SELECT
    s.protocolo,
    s.titulo,
    a.nome_arquivo,
    a.tamanho_bytes
FROM solicitacoes AS s
INNER JOIN anexos AS a
    ON s.id = a.solicitacao_id;

SELECT
    s.protocolo,
    SUM(a.tamanho_bytes) AS total_bytes
FROM solicitacoes AS s
INNER JOIN anexos AS a
    ON s.id = a.solicitacao_id
GROUP BY s.id, s.protocolo
HAVING total_bytes > 300000;

SELECT
    u.nome,
    n.titulo,
    n.tipo,
    n.lida
FROM usuarios AS u
INNER JOIN notificacoes AS n
    ON u.id = n.usuario_id;

SELECT
    u.nome,
    COUNT(n.id) AS total_notificacoes
FROM usuarios AS u
LEFT JOIN notificacoes AS n
    ON u.id = n.usuario_id
GROUP BY u.id, u.nome
HAVING total_notificacoes >= 1;

SELECT
    u.nome,
    l.acao,
    l.data_acesso
FROM logs_acesso AS l
INNER JOIN usuarios AS u
    ON l.usuario_id = u.id;

SELECT
    acao,
    COUNT(*) AS total_acoes
FROM logs_acesso
GROUP BY acao
HAVING total_acoes >= 1;

SELECT
    nome,
    email
FROM usuarios
WHERE id IN (
    SELECT usuario_id
    FROM solicitacoes
    WHERE categoria_id IN (
        SELECT id
        FROM categorias_solicitacao
        WHERE nome = 'Limpeza urbana'
    )
);

SELECT
    u.nome AS usuario,
    s.protocolo,
    c.nome AS categoria,
    s.titulo,
    s.status,
    s.data_criacao
FROM usuarios AS u
INNER JOIN solicitacoes AS s
    ON u.id = s.usuario_id
INNER JOIN categorias_solicitacao AS c
    ON s.categoria_id = c.id
ORDER BY s.data_criacao DESC;


-- =====================================================
-- CONSULTAS ADAPTADAS À VERSÃO ATUAL DO CITYSERVICE
-- =====================================================

-- 1. Consultar os níveis de acesso disponíveis
SELECT id, nome, descricao, nivel_hierarquia
FROM niveis_permissao
ORDER BY nivel_hierarquia;

-- 2. Consultar as permissões cadastradas
SELECT id, nome, descricao
FROM permissoes
ORDER BY nome;

-- 3. Ver quais permissões pertencem a cada perfil
SELECT n.nome AS perfil, p.nome AS permissao, p.descricao
FROM niveis_permissao AS n
INNER JOIN niveis_permissoes AS np ON n.id = np.nivel_id
INNER JOIN permissoes AS p ON p.id = np.permissao_id
ORDER BY n.nivel_hierarquia, p.nome;

-- 4. Consultar os usuários cadastrados e seus perfis
SELECT u.id, u.nome, u.email, u.cpf, u.telefone, n.nome AS perfil, u.status
FROM usuarios AS u
INNER JOIN niveis_permissao AS n ON u.nivel_id = n.id
ORDER BY u.nome;

-- 5. Consultar os usuários que possuem perfil de Atendente
SELECT u.nome, u.email, u.status
FROM usuarios AS u
INNER JOIN niveis_permissao AS n ON u.nivel_id = n.id
WHERE n.nome = 'Atendente';

-- 6. Consultar os usuários que possuem perfil de Administrador
SELECT u.nome, u.email, u.status
FROM usuarios AS u
INNER JOIN niveis_permissao AS n ON u.nivel_id = n.id
WHERE n.nome = 'Administrador';

-- 7. Solicitações exibidas na gestão, com o nome do cidadão e do atendente
SELECT s.protocolo, s.titulo, s.status,
       cidadao.nome AS usuario,
       atendente.nome AS atendente,
       s.data_criacao
FROM solicitacoes AS s
INNER JOIN usuarios AS cidadao ON s.usuario_id = cidadao.id
LEFT JOIN usuarios AS atendente ON s.atendente_id = atendente.id
ORDER BY s.data_criacao DESC;

-- 8. Quantidade de solicitações por status para os indicadores do Dashboard
SELECT status, COUNT(*) AS total
FROM solicitacoes
GROUP BY status;

-- 9. Quantidade de solicitações por categoria
SELECT c.nome AS categoria, COUNT(s.id) AS total
FROM categorias_solicitacao AS c
LEFT JOIN solicitacoes AS s ON c.id = s.categoria_id
GROUP BY c.id, c.nome
ORDER BY total DESC;

-- 10. Solicitações de um cidadão específico (substituir o ID)
SELECT protocolo, titulo, descricao, status, data_criacao
FROM solicitacoes
WHERE usuario_id = 1
ORDER BY data_criacao DESC;

-- 11. Notícias em destaque publicadas
SELECT titulo, subtitulo, data_publicacao, visualizacoes
FROM noticias
WHERE destaque = 1 AND status = 'publicado'
ORDER BY data_publicacao DESC;

-- 12. Eventos ativos e futuros
SELECT titulo, descricao, local, data_inicio, data_fim
FROM eventos
WHERE status = 'ativo'
ORDER BY data_inicio;

-- 13. Notificações de um usuário, incluindo as ainda não lidas
SELECT titulo, mensagem, lida, data_criacao
FROM notificacoes
WHERE usuario_id = 1
ORDER BY data_criacao DESC;

-- 14. Ações registradas na auditoria
SELECT u.nome AS usuario, l.acao, l.ip, l.data_acesso
FROM logs_acesso AS l
LEFT JOIN usuarios AS u ON l.usuario_id = u.id
ORDER BY l.data_acesso DESC;

-- 15. Total de usuários por perfil
SELECT n.nome AS perfil, COUNT(u.id) AS total_usuarios
FROM niveis_permissao AS n
LEFT JOIN usuarios AS u ON n.id = u.nivel_id
GROUP BY n.id, n.nome
ORDER BY n.nivel_hierarquia;

-- 16. Solicitações sem atendente atribuído
SELECT protocolo, titulo, status, data_criacao
FROM solicitacoes
WHERE atendente_id IS NULL
ORDER BY data_criacao;
