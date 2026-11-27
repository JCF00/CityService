

var CS_NOTICIAS_CHAVE = "cityservice_noticias";

var CS_MAX_EM_DESTAQUE = 3;

function escapeHtml(texto) {
  var div = document.createElement("div");
  div.textContent = texto || "";
  return div.innerHTML;
}

function gerarIdUnicoNoticia(titulo) {
  var base = (titulo || "noticia")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");

  var sufixo = Date.now().toString(36);

  return (base || "noticia") + "-" + sufixo;
}

function obterDataHoraOrdenavel(noticia) {
  var dataISO = (noticia && noticia.data) || "1970-01-01";
  var horario = (noticia && noticia.horario) || "00:00";

  if (!/^\d{4}-\d{2}-\d{2}$/.test(dataISO)) {
    dataISO = "1970-01-01";
  }
  if (!/^\d{2}:\d{2}$/.test(horario)) {
    horario = "00:00";
  }

  var timestamp = new Date(dataISO + "T" + horario + ":00").getTime();
  return isNaN(timestamp) ? 0 : timestamp;
}

function formatarDataExibicao(noticia) {
  var iso = (noticia && noticia.data) || "";
  var texto = iso;

  if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) {
    var partes = iso.split("-");
    var dataObj = new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]));
    var locale = window.CityServiceTranslate ? window.CityServiceTranslate.getLocale() : "pt-BR";
    texto = dataObj.toLocaleDateString(locale, {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  }

  if (noticia && noticia.horario) {
    var currentLocale = window.CityServiceTranslate ? window.CityServiceTranslate.getLocale() : "pt-BR";
    var connector = currentLocale === "en-US" ? " at " : currentLocale === "es-ES" ? " a las " : " às ";
    texto += connector + noticia.horario;
  }

  return texto;
}

function obterImagemOuPlaceholder(noticia, alturaClasses) {
  if (noticia && noticia.imagem) {
    return (
      '<img src="' + noticia.imagem + '" alt="' + escapeHtml(noticia.titulo) + '" ' +
      'class="w-full ' + alturaClasses + ' object-cover" />'
    );
  }
  return (
    '<div class="w-full ' + alturaClasses + ' bg-gradient-to-br from-[#0879b8] via-[#168eaa] to-[#20a883]"></div>'
  );
}

function obterNoticiasSeed() {
  return [
    {
      id: "fatec-praia-grande",
      categoria: "Educação & Inovação",
      titulo: "Praia Grande ganha nova unidade da FATEC com cursos inéditos na região",
      resumo: "Expansão do ensino superior gratuito traz graduações tecnológicas focadas no mercado atual.",
      conteudo: "A Prefeitura de Praia Grande deu mais um passo importante no setor educacional ao viabilizar a implantação de uma nova unidade da Fatec no município. A iniciativa visa atender à crescente demanda por capacitação profissional de nível superior na Baixada Santista, oferecendo cursos superiores de tecnologia totalmente gratuitos. A expectativa é de que a nova estrutura atraia jovens de toda a região, impulsionando a inovação tecnológica e o desenvolvimento econômico local.",
      imagem: null,
      data: "2026-09-21",
      horario: "",
      autor: "Prefeitura de Praia Grande",
      emDestaque: true,
      emDestaqueDesde: new Date("2026-09-21T09:00:00").getTime()
    },
    {
      id: "pier-turistico",
      categoria: "Turismo & Infraestrutura",
      titulo: "Projeto do moderno píer turístico de Praia Grande é aprovado pela Câmara",
      resumo: "Nova estrutura promete transformar a paisagem da orla e fomentar ainda mais o turismo municipal.",
      conteudo: "O projeto de lei que autoriza a construção do moderno píer turístico de Praia Grande foi oficialmente aprovado pela Câmara Municipal. A obra tem como objetivo criar um novo cartão-postal na cidade, oferecendo opções de lazer integradas à natureza, além de estimular o comércio e a rede hoteleira local com a chegada de visitantes de várias cidades do estado.",
      imagem: null,
      data: "2026-09-08",
      horario: "",
      autor: "Prefeitura de Praia Grande",
      emDestaque: true,
      emDestaqueDesde: new Date("2026-09-08T09:00:00").getTime()
    },
    {
      id: "mutirao-atendimento",
      categoria: "Cidadania",
      titulo: "Prefeitura de PG oferece serviços públicos gratuitos em mutirões nos bairros",
      resumo: "Ações integradas levam emissão de documentos, orientações sociais e atendimentos rápidos à população.",
      conteudo: "Com foco em descentralizar os serviços municipais e aproximar a prefeitura dos moradores, os mutirões de atendimento e ações de cidadania têm percorrido diversos bairros de Praia Grande. Os mutirões reúnem frentes de assistência social, emissão de orientações e serviços de utilidade pública em um só lugar, facilitando a rotina de quem precisa de atendimento ágil.",
      imagem: null,
      data: "2026-09-18",
      horario: "",
      autor: "Prefeitura de Praia Grande",
      emDestaque: true,
      emDestaqueDesde: new Date("2026-09-18T09:00:00").getTime()
    }
  ];
}

function normalizarNoticia(noticia) {
  if (typeof noticia.emDestaque !== "boolean") {
    noticia.emDestaque = false;
  }
  if (noticia.emDestaqueDesde === undefined) {
    noticia.emDestaqueDesde = null;
  }
  return noticia;
}

function normalizarListaNoticias(lista) {
  return (lista || []).map(normalizarNoticia);
}

function aplicarLimiteEmDestaque(lista) {
  var destacadas = lista.filter(function (n) {
    return n.emDestaque;
  });

  if (destacadas.length <= CS_MAX_EM_DESTAQUE) return;

  destacadas.sort(function (a, b) {
    return (a.emDestaqueDesde || 0) - (b.emDestaqueDesde || 0);
  });

  var excedentes = destacadas.length - CS_MAX_EM_DESTAQUE;

  for (var i = 0; i < excedentes; i++) {
    destacadas[i].emDestaque = false;
    destacadas[i].emDestaqueDesde = null;
  }
}

function obterNoticiasEmDestaque() {
  var destacadas = obterNoticias().filter(function (n) {
    return n.emDestaque;
  });

  destacadas.sort(function (a, b) {
    return (b.emDestaqueDesde || 0) - (a.emDestaqueDesde || 0);
  });

  return destacadas.slice(0, CS_MAX_EM_DESTAQUE);
}

function inicializarNoticias() {
  var existentes = null;

  try {
    existentes = JSON.parse(localStorage.getItem(CS_NOTICIAS_CHAVE));
  } catch (erro) {
    existentes = null;
  }

  if (!Array.isArray(existentes)) {
    localStorage.setItem(CS_NOTICIAS_CHAVE, JSON.stringify(obterNoticiasSeed()));
  }
}

function obterNoticias() {
  var lista;

  try {
    lista = JSON.parse(localStorage.getItem(CS_NOTICIAS_CHAVE));
  } catch (erro) {
    lista = null;
  }

  if (!Array.isArray(lista)) {
    lista = obterNoticiasSeed();
  }

  return normalizarListaNoticias(lista);
}

function salvarNoticias(lista) {
  localStorage.setItem(CS_NOTICIAS_CHAVE, JSON.stringify(lista));
}

function adicionarNoticia(noticia) {
  if (window.CityServiceAccess && !window.CityServiceAccess.can("gerenciar_noticias")) return false;
  var lista = obterNoticias();

  if (noticia.emDestaque) {
    noticia.emDestaqueDesde = Date.now();
  } else {
    noticia.emDestaque = false;
    noticia.emDestaqueDesde = null;
  }

  lista.push(noticia);
  aplicarLimiteEmDestaque(lista);
  salvarNoticias(lista);
  return true;
}

function editarNoticia(id, dados) {
  if (window.CityServiceAccess && !window.CityServiceAccess.can("gerenciar_noticias")) return false;
  var lista = obterNoticias();
  var indice = lista.findIndex(function (n) {
    return n.id === id;
  });

  if (indice === -1) return false;

  var atual = lista[indice];
  var vaiFicarEmDestaque = !!dados.emDestaque;

  var atualizada = {
    id: atual.id,
    titulo: dados.titulo,
    resumo: dados.resumo,
    conteudo: dados.conteudo,
    imagem: dados.imagem !== undefined ? dados.imagem : atual.imagem,
    data: dados.data,
    horario: dados.horario,
    categoria: dados.categoria,
    autor: dados.autor || atual.autor,
    emDestaque: atual.emDestaque,
    emDestaqueDesde: atual.emDestaqueDesde
  };

  if (vaiFicarEmDestaque && !atual.emDestaque) {
    atualizada.emDestaque = true;
    atualizada.emDestaqueDesde = Date.now();
  } else if (!vaiFicarEmDestaque) {
    atualizada.emDestaque = false;
    atualizada.emDestaqueDesde = null;
  }

  lista[indice] = atualizada;
  aplicarLimiteEmDestaque(lista);
  salvarNoticias(lista);
  return true;
}

function excluirNoticia(id) {
  if (window.CityServiceAccess && !window.CityServiceAccess.can("gerenciar_noticias")) return false;
  var lista = obterNoticias().filter(function (n) {
    return n.id !== id;
  });
  salvarNoticias(lista);
}

function criarCardNoticia(noticia, comAcoes) {
  if (comAcoes === undefined) comAcoes = true;
  if (window.CityServiceAccess && !window.CityServiceAccess.can("gerenciar_noticias")) comAcoes = false;

  var card = document.createElement("a");
  card.href = "article.html?id=" + encodeURIComponent(noticia.id);
  card.className = "cs-card overflow-hidden block group relative transition-transform duration-200 hover:scale-[1.02]";

  var badgeDestaque = noticia.emDestaque
    ? '<span class="absolute top-3 left-3 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur text-[9px] font-bold uppercase tracking-wider text-[#0879b8] shadow">' +
        '<svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.6L22 9.3l-5 4.6L18.2 21 12 17.3 5.8 21 7 13.9l-5-4.6 7.1-.7L12 2z"/></svg>Destaque</span>'
    : "";

  var acoesHtml = comAcoes
    ? '<div class="flex items-center gap-1 -mt-1 -mr-1 shrink-0">' +
        '<button type="button" data-action="editar-noticia" data-id="' + escapeHtml(noticia.id) + '" title="Editar notícia" ' +
          'class="w-7 h-7 flex items-center justify-center rounded-lg text-[#9aa5ad] hover:text-[#0879b8] hover:bg-[#edf7fc] transition">' +
          '<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>' +
        '</button>' +
        '<button type="button" data-action="excluir-noticia" data-id="' + escapeHtml(noticia.id) + '" title="Excluir notícia" ' +
          'class="w-7 h-7 flex items-center justify-center rounded-lg text-[#9aa5ad] hover:text-[#c34a4a] hover:bg-[#fff5f5] transition">' +
          '<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg>' +
        '</button>' +
      '</div>'
    : "";

  card.innerHTML =
    '<div class="h-36 overflow-hidden relative">' +
      badgeDestaque +
      obterImagemOuPlaceholder(noticia, "h-36") +
    '</div>' +
    '<div class="p-5">' +
      '<div class="flex items-start justify-between gap-2">' +
        '<span class="block text-[10px] uppercase tracking-wider font-bold text-[#0879b8]">' + escapeHtml(noticia.categoria) + '</span>' +
        acoesHtml +
      '</div>' +
      '<h3 class="font-bold mt-1 text-base group-hover:text-[#0879b8] news-clamp-2">' + escapeHtml(noticia.titulo) + '</h3>' +
      '<p class="text-xs text-[#667783] leading-5 mt-2 news-clamp-3">' + escapeHtml(noticia.resumo) + '</p>' +
      '<div class="flex items-center justify-between mt-4 gap-2">' +
        '<span class="text-[10px] text-[#9aa5ad]">' + escapeHtml(formatarDataExibicao(noticia)) + '</span>' +
        '<span class="text-xs font-bold text-[#0879b8] whitespace-nowrap">Continuar lendo →</span>' +
      '</div>' +
    '</div>';

  return card;
}

function renderizarDestaque(noticia, container) {
  var temImagem = !!noticia.imagem;

  container.innerHTML =
    '<a href="article.html?id=' + encodeURIComponent(noticia.id) + '" class="block group">' +
      '<article class="cs-card overflow-hidden transition-transform duration-200 group-hover:scale-[1.01]">' +
        '<div class="h-56 sm:h-72 relative p-7 flex items-end overflow-hidden ' + (temImagem ? '' : 'bg-gradient-to-br from-[#0879b8] via-[#168eaa] to-[#20a883]') + '">' +
          (temImagem ? '<img src="' + noticia.imagem + '" alt="" class="absolute inset-0 w-full h-full object-cover" />' : '') +
          (temImagem ? '<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent"></div>' : '') +
          '<div class="absolute -right-10 -top-16 w-56 h-56 rounded-full bg-white/10"></div>' +
          '<div class="relative text-white">' +
            '<span class="inline-flex px-2.5 py-1 rounded-full bg-white/15 border border-white/20 text-[10px] font-bold uppercase tracking-wider">Destaque Principal</span>' +
            '<h2 class="text-2xl sm:text-3xl font-bold mt-3 max-w-xl group-hover:underline">' + escapeHtml(noticia.titulo) + '</h2>' +
            '<p class="text-sm text-white/80 mt-2">' + escapeHtml(noticia.resumo) + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="p-6">' +
          '<p class="text-xs text-[#9aa5ad]">Praia Grande • ' + escapeHtml(formatarDataExibicao(noticia)) + '</p>' +
          '<p class="text-sm leading-6 text-[#667783] mt-3 news-clamp-3">' + escapeHtml(noticia.resumo) + '</p>' +
          '<span class="inline-block mt-4 text-xs font-bold text-[#0879b8] group-hover:underline">Ler matéria completa →</span>' +
        '</div>' +
      '</article>' +
    '</a>';
}

function renderizarPaginaListagem(filtro) {
  var containerDestaque = document.getElementById("noticia-destaque-container");
  var listaNoticias = document.getElementById("lista-noticias");

  if (!containerDestaque || !listaNoticias) return;

  var noticias = obterNoticias();
  var termo = (filtro || "").trim().toLowerCase();

  if (termo) {
    var resultados = noticias.filter(function (n) {
      return (
        (n.titulo || "").toLowerCase().indexOf(termo) !== -1 ||
        (n.resumo || "").toLowerCase().indexOf(termo) !== -1 ||
        (n.categoria || "").toLowerCase().indexOf(termo) !== -1
      );
    });

    resultados.sort(function (a, b) {
      return obterDataHoraOrdenavel(b) - obterDataHoraOrdenavel(a);
    });

    containerDestaque.innerHTML = "";
    listaNoticias.innerHTML = "";

    if (resultados.length === 0) {
      listaNoticias.innerHTML =
        '<p class="text-sm text-[#667783] col-span-full">Nenhuma notícia encontrada para "' + escapeHtml(filtro) + '".</p>';
      return;
    }

    resultados.forEach(function (noticia) {
      listaNoticias.appendChild(criarCardNoticia(noticia));
    });
    return;
  }

  if (noticias.length === 0) {
    containerDestaque.innerHTML = '<p class="text-sm text-[#667783]">Nenhuma notícia cadastrada ainda.</p>';
    listaNoticias.innerHTML = "";
    return;
  }

  var ordenadas = noticias.slice().sort(function (a, b) {
    return obterDataHoraOrdenavel(b) - obterDataHoraOrdenavel(a);
  });

  var destaque = ordenadas[0];
  var outras = ordenadas.slice(1);

  renderizarDestaque(destaque, containerDestaque);

  listaNoticias.innerHTML = "";
  outras.forEach(function (noticia) {
    listaNoticias.appendChild(criarCardNoticia(noticia));
  });
}

function inicializarBuscaNoticias() {
  var input = document.getElementById("buscaNoticias");
  if (!input) return;

  input.addEventListener("input", function () {
    renderizarPaginaListagem(input.value);
  });
}

function renderizarPaginaDestaques() {
  var container = document.getElementById("lista-destaques");
  if (!container) return;

  var destacadas = obterNoticiasEmDestaque();

  if (destacadas.length === 0) {
    container.innerHTML =
      '<p class="text-sm text-[#667783] col-span-full">Nenhuma notícia em destaque no momento. Marque uma notícia como destaque ao criá-la ou editá-la.</p>';
    return;
  }

  container.innerHTML = "";
  destacadas.forEach(function (noticia) {
    container.appendChild(criarCardNoticia(noticia, true));
  });
}

function atualizarTodasAsListagens() {
  if (document.getElementById("lista-noticias")) {
    var buscaAtiva = document.getElementById("buscaNoticias");
    renderizarPaginaListagem(buscaAtiva ? buscaAtiva.value : "");
  }

  if (document.getElementById("lista-destaques")) {
    renderizarPaginaDestaques();
  }
}

function abrirEdicaoNoticia(id) {
  if (window.CityServiceAccess && !window.CityServiceAccess.can("gerenciar_noticias")) return;
  var noticia = obterNoticias().find(function (n) {
    return n.id === id;
  });
  if (!noticia) return;

  var form = document.getElementById("newsForm");
  if (!form) return;

  cs_editandoId = id;
  cs_imagemSelecionadaDataUrl = noticia.imagem || null;

  document.getElementById("newsTitle").value = noticia.titulo || "";
  document.getElementById("newsSummary").value = noticia.resumo || "";
  document.getElementById("newsContent").value = noticia.conteudo || "";
  document.getElementById("newsCategory").value = noticia.categoria || "";
  document.getElementById("newsAuthor").value = noticia.autor || "";
  document.getElementById("newsDate").value = noticia.data || "";
  document.getElementById("newsTime").value = noticia.horario || "";

  var checkboxDestaque = document.getElementById("newsFeatured");
  if (checkboxDestaque) checkboxDestaque.checked = !!noticia.emDestaque;

  var previewWrapper = document.getElementById("newsImagePreviewWrapper");
  var previewImg = document.getElementById("newsImagePreview");
  if (noticia.imagem && previewImg && previewWrapper) {
    previewImg.src = noticia.imagem;
    previewWrapper.classList.remove("hidden");
  } else if (previewWrapper) {
    previewWrapper.classList.add("hidden");
  }

  var tituloModal = document.getElementById("newsFormTitle");
  if (tituloModal) tituloModal.textContent = "Editar notícia";

  var botaoSalvar = document.getElementById("newsSubmitBtn");
  if (botaoSalvar) botaoSalvar.textContent = "Salvar alterações";

  openModal("newsFormModal");
}

function confirmarExclusaoNoticia(id) {
  if (window.CityServiceAccess && !window.CityServiceAccess.can("gerenciar_noticias")) return;
  var mensagemConfirmacao = "Tem certeza que deseja excluir esta notícia? Essa ação não pode ser desfeita.";
  if (window.CityServiceTranslate) mensagemConfirmacao = window.CityServiceTranslate.t(mensagemConfirmacao);
  var confirmado = window.confirm(mensagemConfirmacao);
  if (!confirmado) return;

  excluirNoticia(id);
  atualizarTodasAsListagens();
}

function inicializarAcoesNoticias() {
  document.addEventListener("click", function (evento) {
    var alvo = evento.target.closest("[data-action]");
    if (!alvo) return;

    var id = alvo.getAttribute("data-id");
    var acao = alvo.getAttribute("data-action");
    if (!id || !acao) return;

    evento.preventDefault();
    evento.stopPropagation();

    if (acao === "editar-noticia") {
      abrirEdicaoNoticia(id);
    } else if (acao === "excluir-noticia") {
      confirmarExclusaoNoticia(id);
    }
  });
}

function renderizarPaginaArtigo() {
  var container = document.getElementById("artigo-container");
  if (!container) return;

  var relacionadasContainer = document.getElementById("noticias-relacionadas-container");

  var params = new URLSearchParams(window.location.search);
  var idNoticia = params.get("id");

  var noticias = obterNoticias();
  var noticia = noticias.find(function (n) {
    return n.id === idNoticia;
  });

  if (!noticia) {
    container.innerHTML =
      '<h1 class="text-xl font-bold text-red-600">Notícia não encontrada</h1>' +
      '<p class="text-sm text-[#667783] mt-2">A matéria que você está procurando não existe ou foi removida.</p>' +
      '<a href="news.html" class="inline-block mt-4 text-xs font-bold text-[#0879b8]">Voltar para notícias</a>';

    if (relacionadasContainer) relacionadasContainer.innerHTML = "";
    return;
  }

  var imagemPrincipalHtml = noticia.imagem
    ? '<div class="-mx-6 sm:-mx-10 -mt-6 sm:-mt-10 mb-6 h-56 sm:h-80 overflow-hidden rounded-t-[18px]">' +
        '<img src="' + noticia.imagem + '" alt="' + escapeHtml(noticia.titulo) + '" class="w-full h-full object-cover" />' +
      '</div>'
    : "";

  container.innerHTML =
    imagemPrincipalHtml +
    '<div class="border-b border-gray-100 pb-6 mb-6">' +
      '<span class="text-[10px] uppercase tracking-wider font-bold text-[#0879b8] bg-[#edf7fc] px-2.5 py-1 rounded-md">' + escapeHtml(noticia.categoria) + '</span>' +
      '<h1 class="text-2xl sm:text-3xl font-bold mt-3">' + escapeHtml(noticia.titulo) + '</h1>' +
      '<p class="text-xs text-[#9aa5ad] mt-2">Publicado em ' + escapeHtml(formatarDataExibicao(noticia)) + ' • ' + escapeHtml(noticia.autor || "Prefeitura de Praia Grande") + '</p>' +
    '</div>' +
    '<div class="space-y-4 text-sm sm:text-base leading-7 text-[#4a5568]">' +
      '<p class="font-semibold text-[#263746] text-lg">' + escapeHtml(noticia.resumo) + '</p>' +
      '<p class="whitespace-pre-line">' + escapeHtml(noticia.conteudo) + '</p>' +
    '</div>';

  if (!relacionadasContainer) return;

  var relacionadas = noticias.filter(function (n) {
    return n.id !== noticia.id;
  });

  relacionadas.sort(function (a, b) {
    var aMesmaCategoria = a.categoria === noticia.categoria ? 1 : 0;
    var bMesmaCategoria = b.categoria === noticia.categoria ? 1 : 0;

    if (aMesmaCategoria !== bMesmaCategoria) {
      return bMesmaCategoria - aMesmaCategoria;
    }
    return obterDataHoraOrdenavel(b) - obterDataHoraOrdenavel(a);
  });

  relacionadas = relacionadas.slice(0, 3);

  if (relacionadas.length === 0) {
    relacionadasContainer.innerHTML = "";
    return;
  }

  var html =
    '<h2 class="text-lg font-bold mb-4">Notícias relacionadas</h2>' +
    '<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">';

  relacionadas.forEach(function (n) {
    html +=
      '<a href="article.html?id=' + encodeURIComponent(n.id) + '" class="cs-card overflow-hidden block group">' +
        '<div class="h-28 overflow-hidden">' + obterImagemOuPlaceholder(n, "h-28") + '</div>' +
        '<div class="p-4">' +
          '<span class="block text-[9px] uppercase tracking-wider font-bold text-[#0879b8]">' + escapeHtml(n.categoria) + '</span>' +
          '<h3 class="font-bold mt-1 text-sm news-clamp-2 group-hover:text-[#0879b8]">' + escapeHtml(n.titulo) + '</h3>' +
        '</div>' +
      '</a>';
  });

  html += "</div>";
  relacionadasContainer.innerHTML = html;
}

var cs_imagemSelecionadaDataUrl = null;

var cs_editandoId = null;

function inicializarUploadImagemNoticia() {
  var fileInput = document.getElementById("newsImageInput");
  var previewWrapper = document.getElementById("newsImagePreviewWrapper");
  var previewImg = document.getElementById("newsImagePreview");

  if (!fileInput) return;

  fileInput.addEventListener("change", function (evento) {
    var arquivo = evento.target.files && evento.target.files[0];

    if (!arquivo) {
      cs_imagemSelecionadaDataUrl = null;
      if (previewWrapper) previewWrapper.classList.add("hidden");
      return;
    }

    var tiposPermitidos = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (tiposPermitidos.indexOf(arquivo.type) === -1) {
      alert(window.CityServiceTranslate ? window.CityServiceTranslate.t("Formato de imagem não suportado. Utilize JPG, PNG ou WEBP.") : "Formato de imagem não suportado. Utilize JPG, PNG ou WEBP.");
      fileInput.value = "";
      return;
    }

    var leitor = new FileReader();
    leitor.onload = function (evt) {
      cs_imagemSelecionadaDataUrl = evt.target.result;
      if (previewImg) previewImg.src = cs_imagemSelecionadaDataUrl;
      if (previewWrapper) previewWrapper.classList.remove("hidden");
    };
    leitor.readAsDataURL(arquivo);
  });
}

function limparFormularioNoticia(form) {
  form.reset();
  cs_imagemSelecionadaDataUrl = null;
  cs_editandoId = null;

  var previewWrapper = document.getElementById("newsImagePreviewWrapper");
  if (previewWrapper) previewWrapper.classList.add("hidden");

  var tituloModal = document.getElementById("newsFormTitle");
  if (tituloModal) tituloModal.textContent = "Adicionar nova notícia";

  var botaoSalvar = document.getElementById("newsSubmitBtn");
  if (botaoSalvar) botaoSalvar.textContent = "Salvar notícia";
}

function inicializarFormularioNoticia() {
  var form = document.getElementById("newsForm");
  if (!form) return;

  inicializarUploadImagemNoticia();

  var botaoCancelar = form.querySelector('[data-modal-close="newsFormModal"]');
  if (botaoCancelar) {
    botaoCancelar.addEventListener("click", function (evento) {
      evento.preventDefault();
      limparFormularioNoticia(form);
      closeModal("newsFormModal");
    });
  }

  document.querySelectorAll('[data-modal-trigger="newsFormModal"]').forEach(function (botaoAbrir) {
    botaoAbrir.addEventListener("click", function () {
      limparFormularioNoticia(form);
    });
  });

  form.addEventListener("submit", function (evento) {
    evento.preventDefault();
    if (window.CityServiceAccess && !window.CityServiceAccess.can("gerenciar_noticias")) return;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var titulo = document.getElementById("newsTitle").value.trim();
    var resumo = document.getElementById("newsSummary").value.trim();
    var conteudo = document.getElementById("newsContent").value.trim();
    var categoria = document.getElementById("newsCategory").value.trim();
    var autor = document.getElementById("newsAuthor").value.trim();
    var dataInput = document.getElementById("newsDate").value;
    var horarioInput = document.getElementById("newsTime").value;
    var checkboxDestaque = document.getElementById("newsFeatured");
    var destacar = checkboxDestaque ? checkboxDestaque.checked : false;

    var estavaEditando = !!cs_editandoId;

    if (estavaEditando) {
      editarNoticia(cs_editandoId, {
        titulo: titulo,
        resumo: resumo,
        conteudo: conteudo,
        imagem: cs_imagemSelecionadaDataUrl,
        data: dataInput || new Date().toISOString().slice(0, 10),
        horario: horarioInput || "",
        categoria: categoria,
        autor: autor || "Prefeitura de Praia Grande",
        emDestaque: destacar
      });
    } else {
      var novaNoticia = {
        id: gerarIdUnicoNoticia(titulo),
        titulo: titulo,
        resumo: resumo,
        conteudo: conteudo,
        imagem: cs_imagemSelecionadaDataUrl,
        data: dataInput || new Date().toISOString().slice(0, 10),
        horario: horarioInput || "",
        categoria: categoria,
        autor: autor || "Prefeitura de Praia Grande",
        emDestaque: destacar
      };

      adicionarNoticia(novaNoticia);
    }

    limparFormularioNoticia(form);
    closeModal("newsFormModal");

    atualizarTodasAsListagens();

    var mensagemSucesso = estavaEditando ? "Notícia atualizada com sucesso!" : "Notícia publicada com sucesso!";
    alert(window.CityServiceTranslate ? window.CityServiceTranslate.t(mensagemSucesso) : mensagemSucesso);
  });
}

function inicializarFechamentoModalNoticia() {
  var modal = document.getElementById("newsFormModal");
  if (!modal) return;

  modal.addEventListener("click", function (evento) {
    if (evento.target !== modal) return;

    var form = document.getElementById("newsForm");
    if (form) limparFormularioNoticia(form);

    closeModal("newsFormModal");
  });
}

document.addEventListener("DOMContentLoaded", async function () {
  inicializarNoticias();
  inicializarAcoesNoticias();

  if (document.getElementById("lista-noticias")) {
    renderizarPaginaListagem();
    inicializarBuscaNoticias();
  }

  if (document.getElementById("lista-destaques")) {
    renderizarPaginaDestaques();
  }

  if (document.getElementById("artigo-container")) {
    renderizarPaginaArtigo();
  }

  var modalContainer = document.getElementById("modal-container");
  if (modalContainer && typeof appendComponent === "function") {
    await appendComponent("modal-container", "../components/news-form-modal.html");
    inicializarFormularioNoticia();
    inicializarFechamentoModalNoticia();
  }
});

window.addEventListener("pageshow", function (evento) {
  if (!evento.persisted) return;

  if (document.getElementById("lista-noticias")) {
    var buscaAtiva = document.getElementById("buscaNoticias");
    renderizarPaginaListagem(buscaAtiva ? buscaAtiva.value : "");
  }

  if (document.getElementById("lista-destaques")) {
    renderizarPaginaDestaques();
  }

  if (document.getElementById("artigo-container")) {
    renderizarPaginaArtigo();
  }
});
