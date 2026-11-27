async function loadComponent(elementId, file) {
  const element = document.getElementById(elementId);

  if (!element) {
    console.error(`Elemento #${elementId} não encontrado.`);
    return;
  }

  try {
    const response = await fetch(file);

    if (!response.ok) {
      throw new Error(`Erro ${response.status} ao carregar ${file}`);
    }

    element.innerHTML = await response.text();
  } catch (error) {
    console.error(`Erro ao carregar ${file}:`, error);
  }
}

async function appendComponent(containerId, file) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Container #${containerId} não encontrado.`);
    return;
  }

  if (container.querySelector(`[data-loaded-from="${file}"]`)) {
    console.warn(
      `Componente "${file}" já foi carregado em #${containerId}. Ignorando.`,
    );

    return;
  }

  try {
    const response = await fetch(file);

    if (!response.ok) {
      throw new Error(`Erro ${response.status} ao carregar ${file}`);
    }

    const html = await response.text();

    const wrapper = document.createElement("div");

    wrapper.setAttribute("data-loaded-from", file);

    wrapper.innerHTML = html;

    container.appendChild(wrapper);
  } catch (error) {
    console.error(`Erro ao carregar ${file}:`, error);
  }
}

function getCurrentPage() {
  let page = window.location.pathname.split("/").pop();

  if (!page) {
    page = "inicio.html";
  }

  return page;
}

function updateDesktopSidebar() {
  const currentPage = getCurrentPage();

  document.querySelectorAll(".sidebar-link").forEach((link) => {
    const href = link.getAttribute("href");

    link.classList.remove(
      "bg-[#176da4]",
      "text-white",
      "shadow-sm"
    );

    link.classList.add("text-[#637382]");

    const text = link.querySelector("span:last-child");

    if (text) {
      text.classList.remove("font-semibold");
      text.classList.add("font-medium");
    }

    if (href === currentPage) {
      link.classList.remove("text-[#637382]");

      link.classList.add(
        "bg-[#176da4]",
        "text-white",
        "shadow-sm"
      );

      if (text) {
        text.classList.remove("font-medium");
        text.classList.add("font-semibold");
      }
    }
  });
}

function getMobilePrimaryPages() {
  return new Set(Array.from(document.querySelectorAll(".cityservice-mobile-nav [data-mobile-page]"))
    .map(link => link.dataset.mobilePage)
    .filter(Boolean));
}

function configureMobilePrimaryNavigation() {
  const requestShortcut = document.querySelector('.cityservice-mobile-nav [data-mobile-page="requests.html"]');
  const session = window.CityServiceAccess ? window.CityServiceAccess.getSession() : null;
  if (!requestShortcut || !session) return;

  if (session.role === "atendente") {
    requestShortcut.href = "gestao-solicitacoes.html";
    requestShortcut.dataset.mobilePage = "gestao-solicitacoes.html";
  }
}

function updateMobileSidebar() {
  const currentPage = getCurrentPage();
  const primaryPages = getMobilePrimaryPages();
  let currentPageIsSecondary = false;

  document.querySelectorAll(".mobile-sidebar-link[data-mobile-page]").forEach((link) => {
    const isCurrent = link.dataset.mobilePage === currentPage;
    link.classList.toggle("is-active", isCurrent);
    link.classList.toggle("text-[#0879b8]", isCurrent);
    link.classList.toggle("text-[#637382]", !isCurrent);
    link.setAttribute("aria-current", isCurrent ? "page" : "false");
    const text = link.querySelector("span:last-child");
    if (text) text.classList.toggle("font-bold", isCurrent);
  });

  document.querySelectorAll("[data-mobile-more-page]").forEach((link) => {
    const isCurrent = link.dataset.mobileMorePage === currentPage;
    link.classList.toggle("is-active", isCurrent);
    if (isCurrent) currentPageIsSecondary = true;
    link.setAttribute("aria-current", isCurrent ? "page" : "false");
  });

  const moreButton = document.querySelector("[data-mobile-more-toggle]");
  if (moreButton) {
    moreButton.classList.toggle("is-active", currentPageIsSecondary && !primaryPages.has(currentPage));
    moreButton.setAttribute("aria-current", currentPageIsSecondary ? "page" : "false");
  }
}

function initializeMobileMoreNavigation() {
  const overlay = document.getElementById("mobileMoreOverlay");
  const linksContainer = document.getElementById("mobileMoreLinks");
  const toggle = document.querySelector("[data-mobile-more-toggle]");
  const sidebar = document.querySelector("#sidebar aside");
  if (!overlay || !linksContainer || !toggle || !sidebar || overlay.dataset.initialized === "true") return;

  const primaryPages = getMobilePrimaryPages();
  const sourceGroups = [
    sidebar.querySelector(".cityservice-sidebar-scroll > div.px-4.pt-7"),
    sidebar.querySelector("#managementNavigation")
  ].filter(Boolean);
  const addedPages = new Set();

  sourceGroups.forEach((sourceGroup) => {
    const sourceLinks = Array.from(sourceGroup.querySelectorAll("a[data-sidebar-page]"));
    const visibleLinks = sourceLinks.filter((sourceLink) => {
      const page = sourceLink.dataset.sidebarPage;
      if (!page || primaryPages.has(page) || addedPages.has(page)) return false;
      addedPages.add(page);
      return true;
    });
    if (!visibleLinks.length) return;

    const group = document.createElement("section");
    group.className = "mobile-more-group";
    const groupTitle = document.createElement("h3");
    groupTitle.className = "mobile-more-group-title";
    const sourceTitle = sourceGroup.querySelector("p");
    groupTitle.textContent = sourceTitle ? sourceTitle.textContent.trim() : "Explorar";
    group.appendChild(groupTitle);

    const items = document.createElement("div");
    items.className = "mobile-more-group-items";
    visibleLinks.forEach((sourceLink) => {
      const page = sourceLink.dataset.sidebarPage;
      const link = document.createElement("a");
      link.href = sourceLink.getAttribute("href");
      link.className = "mobile-more-link";
      link.dataset.mobileMorePage = page;
      link.innerHTML = sourceLink.innerHTML;
      link.addEventListener("click", closeMobileMoreNavigation);
      items.appendChild(link);
    });
    group.appendChild(items);
    linksContainer.appendChild(group);
  });

  toggle.addEventListener("click", () => {
    if (overlay.classList.contains("hidden")) openMobileMoreNavigation();
    else closeMobileMoreNavigation();
  });
  overlay.querySelectorAll("[data-mobile-more-close]").forEach((button) => {
    button.addEventListener("click", closeMobileMoreNavigation);
  });
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeMobileMoreNavigation();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !overlay.classList.contains("hidden")) closeMobileMoreNavigation();
  });
  overlay.dataset.initialized = "true";
  if (window.CityServiceTranslate) window.CityServiceTranslate.apply(overlay);
  updateMobileSidebar();
}

function openMobileMoreNavigation() {
  const overlay = document.getElementById("mobileMoreOverlay");
  const toggle = document.querySelector("[data-mobile-more-toggle]");
  if (!overlay || !toggle) return;
  overlay.classList.remove("hidden");
  overlay.setAttribute("aria-hidden", "false");
  toggle.setAttribute("aria-expanded", "true");
  document.body.classList.add("overflow-hidden");
  const firstLink = overlay.querySelector("a");
  if (firstLink) firstLink.focus();
}

function closeMobileMoreNavigation() {
  const overlay = document.getElementById("mobileMoreOverlay");
  const toggle = document.querySelector("[data-mobile-more-toggle]");
  if (!overlay || overlay.classList.contains("hidden")) return;
  overlay.classList.add("hidden");
  overlay.setAttribute("aria-hidden", "true");
  if (toggle) {
    toggle.setAttribute("aria-expanded", "false");
    toggle.focus();
  }
  document.body.classList.remove("overflow-hidden");
}

function updateNavigation() {
  updateDesktopSidebar();
  updateMobileSidebar();
}

const notificationKey = "cityservice_notificacoes";

function readNotifications() {
  try { const items = JSON.parse(localStorage.getItem(notificationKey) || "[]"); return Array.isArray(items) ? items : []; }
  catch (error) { return []; }
}

function addNotification(email, title, message) {
  if (!email) return;
  const items = readNotifications();
  items.unshift({ id: Date.now() + Math.random(), email, title, message, date: new Date().toISOString(), read: false });
  localStorage.setItem(notificationKey, JSON.stringify(items.slice(0, 150)));
  renderNotifications();
}

function renderNotifications() {
  const list = document.getElementById("notificationsList");
  if (!list) return;
  const session = window.CityServiceAccess ? window.CityServiceAccess.getSession() : null;
  const items = session ? readNotifications().filter(item => item.email === session.email) : [];
  const unread = items.filter(item => !item.read).length;
  const badge = document.querySelector("[data-notification-count]");
  if (badge) { badge.textContent = unread; badge.classList.toggle("hidden", unread === 0); }
  const t = value => window.CityServiceTranslate ? window.CityServiceTranslate.t(value) : value;
  if (!items.length) { list.innerHTML = `<p class="text-sm text-[#637382] text-center py-8">${t("Você ainda não possui notificações.")}</p>`; return; }
  const locale = window.CityServiceTranslate ? window.CityServiceTranslate.getLocale() : "pt-BR";
  list.innerHTML = items.map(item => `<article class="flex gap-3 p-4 rounded-xl border ${item.read ? "border-[#e5eaed] bg-white" : "border-[#b9dce8] bg-[#f3f9fc]"}"><span class="w-9 h-9 shrink-0 rounded-full bg-[#eaf5fa] text-[#0879b8] flex items-center justify-center">${item.read ? "✓" : "•"}</span><div class="min-w-0 flex-1"><p class="text-sm font-semibold text-[#263746]">${escapeNotification(t(item.title))}</p><p class="text-sm text-[#637382] mt-1">${escapeNotification(translateNotificationMessage(item.message))}</p><p class="text-xs text-[#9aa5ad] mt-2">${new Date(item.date).toLocaleString(locale)}</p></div>${item.read ? "" : `<button type="button" data-read-notification="${item.id}" class="text-xs font-semibold text-[#0879b8]">${t("Lida")}</button>`}</article>`).join("");
  list.querySelectorAll("[data-read-notification]").forEach(button => button.addEventListener("click", () => { const all = readNotifications(); const found = all.find(item => String(item.id) === button.dataset.readNotification); if (found) found.read = true; localStorage.setItem(notificationKey, JSON.stringify(all)); renderNotifications(); }));
}

function escapeNotification(value) { return String(value || "").replace(/[&<>\"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'\"':"&quot;", "'":"&#39;"}[char])); }
function translateNotificationMessage(value) {
  const message = String(value || "");
  const t = text => window.CityServiceTranslate ? window.CityServiceTranslate.t(text) : text;
  const submitted = message.match(/^Sua solicitação "(.*)" foi enviada e está em análise\.$/);
  if (submitted) return t('Sua solicitação "{title}" foi enviada e está em análise.').replace("{title}", submitted[1]);
  const updated = message.match(/^A solicitação "(.*)" agora está: (Em análise|Em andamento|Concluída)\.$/);
  if (updated) {
    const status = t(updated[2]);
    return t('A solicitação "{title}" agora está: {status}.').replace("{title}", updated[1]).replace("{status}", status);
  }
  return t(message);
}

window.addEventListener("storage", event => { if (event.key === notificationKey) renderNotifications(); });
document.addEventListener("cityservice:languagechange", () => renderNotifications());

const modalActions = {
  markAllAsRead: () => { const session = window.CityServiceAccess ? window.CityServiceAccess.getSession() : null; if (!session) return; const items = readNotifications(); items.forEach(item => { if (item.email === session.email) item.read = true; }); localStorage.setItem(notificationKey, JSON.stringify(items)); renderNotifications(); },
  logout: () => {
    if (window.CityServiceAccess) window.CityServiceAccess.logout();
    else window.location.href = "../login.html";
  },

  saveSettings: () => {
    const selector = document.getElementById("settingsLanguage");
    if (selector && window.CityServiceTranslate) window.CityServiceTranslate.setLanguage(selector.value);
  }
};

function getModal(modalId) {
  return document.getElementById(modalId);
}

function openModal(modalId) {
  const modal = getModal(modalId);

  if (!modal) return;

  modal._lastFocusedElement = document.activeElement;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  modal.dataset.open = "true";
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("overflow-hidden");

  if (modalId === "notificationsModal") renderNotifications();
  if (modalId === "settingsModal") {
    const selector = document.getElementById("settingsLanguage");
    if (selector && window.CityServiceTranslate) selector.value = window.CityServiceTranslate.getLanguage();
    if (window.CityServiceTheme) window.CityServiceTheme.syncControls();
  }

  requestAnimationFrame(() => {
    const focusTarget = modal.querySelector("input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), a[href]");
    if (focusTarget) focusTarget.focus({ preventScroll: true });
  });

  if (modalId === "requestModal") {

    setTimeout(function () {

      initializeRequestMap();

      if (requestMap) {
        requestMap.invalidateSize();
      }

    }, 100);
  }
}

function closeModal(modalId) {
  const modal = getModal(modalId);

  if (!modal) return;

  modal.classList.add("hidden");
  modal.classList.remove("flex");
  modal.setAttribute("aria-hidden", "true");
  delete modal.dataset.open;

  if (!document.querySelector("[data-modal][data-open='true']")) {
    document.body.classList.remove("overflow-hidden");
  }

  if (modal._lastFocusedElement && typeof modal._lastFocusedElement.focus === "function") {
    modal._lastFocusedElement.focus({ preventScroll: true });
  }
  modal._lastFocusedElement = null;
}

function isModalOpen(modalId) {
  const modal = getModal(modalId);

  return modal && modal.dataset.open === "true";
}


var requestMap = null;
var requestMarker = null;

function initializeRequestMap() {
  var mapaElemento = document.getElementById("requestMap");

  if (!mapaElemento) {
    return;
  }

  if (typeof L === "undefined") {
    console.error("Leaflet não foi carregado.");
    return;
  }

  if (requestMap) {
    return;
  }

  requestMap = L.map("requestMap").setView(
    [-24.01785, -46.46461],
    13
  );

  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution: "&copy; OpenStreetMap contributors"
    }
  ).addTo(requestMap);

  requestMap.on("click", function (event) {
    selecionarLocalSolicitacao(
      event.latlng.lat,
      event.latlng.lng
    );
  });

  var botaoLocalizacao = document.getElementById(
    "usarMinhaLocalizacao"
  );

  if (botaoLocalizacao) {
    botaoLocalizacao.addEventListener("click", function () {

      if (!navigator.geolocation) {
        alert(
          window.CityServiceTranslate ? window.CityServiceTranslate.t("Seu navegador não permite obter sua localização.") : "Seu navegador não permite obter sua localização."
        );

        return;
      }

      navigator.geolocation.getCurrentPosition(
        function (position) {

          selecionarLocalSolicitacao(
            position.coords.latitude,
            position.coords.longitude
          );

          requestMap.setView(
            [
              position.coords.latitude,
              position.coords.longitude
            ],
            16
          );

        },

        function () {
          alert(
            window.CityServiceTranslate ? window.CityServiceTranslate.t("Não foi possível obter sua localização.") : "Não foi possível obter sua localização."
          );
        },

        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  }
}

function selecionarLocalSolicitacao(latitude, longitude) {

  if (!requestMap) {
    return;
  }

  if (requestMarker) {
    requestMarker.setLatLng([
      latitude,
      longitude
    ]);
  } else {

    requestMarker = L.marker(
      [
        latitude,
        longitude
      ],
      {
        draggable: true
      }
    ).addTo(requestMap);

    requestMarker.on("dragend", function () {

      var posicao = requestMarker.getLatLng();

      atualizarCoordenadasSolicitacao(
        posicao.lat,
        posicao.lng
      );
    });
  }

  atualizarCoordenadasSolicitacao(
    latitude,
    longitude
  );
}

function atualizarCoordenadasSolicitacao(
  latitude,
  longitude
) {

  var latitudeInput = document.getElementById(
    "requestLatitude"
  );

  var longitudeInput = document.getElementById(
    "requestLongitude"
  );

  var coordenadas = document.getElementById(
    "requestCoordinates"
  );

  if (latitudeInput) {
    latitudeInput.value = latitude;
  }

  if (longitudeInput) {
    longitudeInput.value = longitude;
  }

  if (coordenadas) {
    coordenadas.textContent =
      latitude.toFixed(6) +
      ", " +
      longitude.toFixed(6);
  }
}

function salvarSolicitacao(dados) {
  let solicitacoes = [];

  try {
    solicitacoes = JSON.parse(
      localStorage.getItem("cityservice_solicitacoes")
    );

    if (!Array.isArray(solicitacoes)) {
      solicitacoes = [];
    }
  } catch (error) {
    solicitacoes = [];
  }

  const sessao = window.CityServiceAccess ? window.CityServiceAccess.getSession() : null;
  if (sessao) dados.usuarioEmail = sessao.email;
  solicitacoes.push(dados);

  localStorage.setItem(
    "cityservice_solicitacoes",
    JSON.stringify(solicitacoes)
  );
  if (sessao) addNotification(sessao.email, "Solicitação registrada", `Sua solicitação \"${dados.titulo}\" foi enviada e está em análise.`);
}

function obterSolicitacoes() {
  try {
    const solicitacoes = JSON.parse(
      localStorage.getItem("cityservice_solicitacoes")
    );

    if (Array.isArray(solicitacoes)) {
      return window.CityServiceAccess ? window.CityServiceAccess.filterRequests(solicitacoes) : solicitacoes;
    }

    return [];
  } catch (error) {
    return [];
  }
}

function contarSolicitacoes() {
  const solicitacoes = obterSolicitacoes();

  return {
    total: solicitacoes.length,

    analise: solicitacoes.filter(
      (solicitacao) =>
        solicitacao.status === "Em análise"
    ).length,

    andamento: solicitacoes.filter(
      (solicitacao) =>
        solicitacao.status === "Em andamento"
    ).length,

    concluidas: solicitacoes.filter(
      (solicitacao) =>
        solicitacao.status === "Concluída"
    ).length
  };
}

function atualizarContadoresSolicitacoes() {
  const contadores = contarSolicitacoes();

  const total = document.getElementById(
    "contadorTotal"
  );

  const analise = document.getElementById(
    "contadorAnalise"
  );

  const andamento = document.getElementById(
    "contadorAndamento"
  );

  const concluidas = document.getElementById(
    "contadorConcluidas"
  );

  if (total) {
    total.textContent = contadores.total;
  }

  if (analise) {
    analise.textContent = contadores.analise;
  }

  if (andamento) {
    andamento.textContent = contadores.andamento;
  }

  if (concluidas) {
    concluidas.textContent = contadores.concluidas;
  }
}

function escaparTextoSolicitacao(valor) {
  const elemento = document.createElement("span");
  elemento.textContent = valor == null ? "" : String(valor);
  return elemento.innerHTML;
}

function nomeCategoriaSolicitacao(categoria) {
  const categorias = {
    iluminacao: "Iluminação pública",
    vias: "Vias e calçadas",
    limpeza: "Limpeza urbana",
    outros: "Outros"
  };
  return categorias[categoria] || categoria || "Não informada";
}

function inicializarFiltroSolicitacoes() {
  const campoTexto = document.getElementById("filtroSolicitacoesTexto");
  const campoStatus = document.getElementById("filtroSolicitacoesStatus");
  const lista = document.getElementById("listaSolicitacoesFiltradas");
  const total = document.getElementById("totalResultadosSolicitacoes");
  if (!campoTexto || !campoStatus || !lista) return;

  function renderizar() {
    let solicitacoes = [];
    try {
      const armazenadas = JSON.parse(localStorage.getItem("cityservice_solicitacoes") || "[]");
      if (Array.isArray(armazenadas)) solicitacoes = armazenadas;
    } catch (error) {
      solicitacoes = [];
    }
    if (window.CityServiceAccess) solicitacoes = window.CityServiceAccess.filterRequests(solicitacoes);

    const termo = campoTexto.value.trim().toLocaleLowerCase("pt-BR");
    const statusSelecionado = campoStatus.value;
    const filtradas = solicitacoes.filter((item, index) => {
      const protocolo = item.protocolo || item.id || "";
      const categoria = nomeCategoriaSolicitacao(item.categoria);
      const campos = [protocolo, item.titulo, item.descricao, categoria, item.data]
        .filter(Boolean).join(" ").toLocaleLowerCase("pt-BR");
      const correspondeTexto = !termo || campos.includes(termo);
      const correspondeStatus = !statusSelecionado || item.status === statusSelecionado;
      return correspondeTexto && correspondeStatus;
    });

    if (total) {
      const singular = filtradas.length === 1;
      const noun = singular ? "solicitação" : "solicitações";
      total.textContent = `${filtradas.length} ${window.CityServiceTranslate ? window.CityServiceTranslate.t(noun) : noun}`;
    }
    if (!filtradas.length) {
      lista.innerHTML = '<div class="text-center py-8"><p class="text-sm font-semibold text-[#263746]">Nenhuma solicitação encontrada</p><p class="text-xs text-[#667783] mt-1">Tente alterar os termos da pesquisa ou o status selecionado.</p></div>';
      return;
    }

    lista.innerHTML = filtradas.map((item, index) => {
      const titulo = escaparTextoSolicitacao(item.titulo || "Solicitação sem título");
      const descricao = escaparTextoSolicitacao(item.descricao || "");
      const categoria = escaparTextoSolicitacao(nomeCategoriaSolicitacao(item.categoria));
      const status = escaparTextoSolicitacao(item.status || "Não informado");
      const data = escaparTextoSolicitacao(item.data || "Data não informada");
      const protocoloOriginal = item.protocolo || item.id || "";
      const protocolo = escaparTextoSolicitacao(protocoloOriginal);
      const statusStyle = item.status === "Concluída"
        ? "bg-green-50 text-green-700"
        : item.status === "Em andamento"
          ? "bg-blue-50 text-blue-700"
          : "bg-amber-50 text-amber-700";
      return `<article class="border border-[#e5eaed] rounded-lg p-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div class="min-w-0">
          <div class="flex flex-wrap items-center gap-2 mb-1"><h3 class="font-semibold text-sm text-[#263746]">${titulo}</h3>${protocolo ? `<span class="text-[11px] text-[#89959d]">${protocolo}</span>` : ""}</div>
          <p class="text-xs text-[#667783]">${categoria} · ${data}</p>
          ${descricao ? `<p class="text-sm text-[#667783] mt-2">${descricao}</p>` : ""}
        </div>
        <span class="shrink-0 self-start rounded-full px-3 py-1 text-xs font-semibold ${statusStyle}">${status}</span>
      </article>`;
    }).join("");
  }

  campoTexto.addEventListener("input", renderizar);
  campoStatus.addEventListener("change", renderizar);
  window.addEventListener("storage", event => {
    if (event.key === "cityservice_solicitacoes") renderizar();
  });
  renderizar();
}

function enviarSolicitacao(form, modalId) {

  var titulo = document.getElementById(
    "requestTitle"
  );

  var categoria = document.getElementById(
    "requestCategory"
  );

  var descricao = document.getElementById(
    "requestDescription"
  );

  var latitudeInput = document.getElementById(
    "requestLatitude"
  );

  var longitudeInput = document.getElementById(
    "requestLongitude"
  );

  if (
    !titulo ||
    !categoria ||
    !descricao ||
    !latitudeInput ||
    !longitudeInput
  ) {
    console.error(
      "Campos da solicitação não encontrados."
    );

    return;
  }

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  if (
    latitudeInput.value === "" ||
    longitudeInput.value === ""
  ) {
    alert(
      window.CityServiceTranslate ? window.CityServiceTranslate.t("Selecione no mapa o local onde ocorreu o problema.") : "Selecione no mapa o local onde ocorreu o problema."
    );

    return;
  }

  var dados = {

    titulo: titulo.value.trim(),

    categoria: categoria.value,

    descricao: descricao.value.trim(),

    latitude: Number(latitudeInput.value),

    longitude: Number(longitudeInput.value),

    data: new Date().toLocaleString("pt-BR"),

    status: "Em análise"
  };

  salvarSolicitacao(dados);

  atualizarContadoresSolicitacoes();

  form.reset();

  if (requestMarker) {
    requestMap.removeLayer(requestMarker);
    requestMarker = null;
  }

  var coordenadas = document.getElementById(
    "requestCoordinates"
  );

  if (coordenadas) {
    coordenadas.textContent =
      "Nenhum local selecionado";
  }

  closeModal(modalId);

  alert(
    window.CityServiceTranslate ? window.CityServiceTranslate.t("Solicitação enviada com sucesso!") : "Solicitação enviada com sucesso!"
  );
}

function initializeRequestForm() {
  const form = document.getElementById("requestForm");

  if (!form) {
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    enviarSolicitacao(form, "requestModal");
  });
}


function initializeModals() {
  document.querySelectorAll("[data-modal-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();

      openModal(trigger.dataset.modalTrigger);
    });
  });

  document.querySelectorAll("[data-modal-close]").forEach((closer) => {
    closer.addEventListener("click", () => {
      closeModal(closer.dataset.modalClose);
    });
  });

  document.querySelectorAll("[data-modal-confirm]").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const modalId = btn.dataset.modalConfirm;
      const actionKey = btn.dataset.modalAction;

      const modal = getModal(modalId);

      if (
        modal &&
        modal.querySelector("form") &&
        actionKey === "submitRequest"
      ) {
        return;
      }

      if (
        actionKey &&
        typeof modalActions[actionKey] === "function"
      ) {
        modalActions[actionKey]();
      }

      closeModal(modalId);
    });
  });

  document.querySelectorAll("[data-modal]").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target !== modal) return;

      if (modal.dataset.modalBackdrop === "false") return;

      closeModal(modal.id);
    });
  });

  document.addEventListener("keydown", (e) => {
    const openModals = Array.from(document.querySelectorAll("[data-modal][data-open='true']"));
    const openModalElement = openModals[openModals.length - 1];
    if (!openModalElement) return;

    if (e.key === "Escape") {
      if (openModalElement.dataset.modalEscape !== "false") closeModal(openModalElement.id);
      return;
    }

    if (e.key !== "Tab") return;
    const focusable = Array.from(openModalElement.querySelectorAll(
      "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])"
    )).filter(element => element.getAttribute("aria-hidden") !== "true");
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all([
    loadComponent(
      "sidebar",
      "../components/sidebar.html"
    ),

    loadComponent(
      "header",
      "../components/header.html"
    ),

    appendComponent(
      "modal-container",
      "../components/logout-modal.html"
    ),

    appendComponent(
      "modal-container",
      "../components/profile-modal.html"
    ),

    appendComponent(
      "modal-container",
      "../components/request-modal.html"
    ),

    appendComponent(
      "modal-container",
      "../components/settings-modal.html"
    ),

    appendComponent(
      "modal-container",
      "../components/notifications-modal.html"
    ),
  ]);

  if (window.CityServiceAccess) window.CityServiceAccess.initialize();

  configureMobilePrimaryNavigation();
  updateNavigation();
  initializeMobileMoreNavigation();
  initializeModals();

  const languageSelector = document.getElementById("settingsLanguage");
  if (languageSelector && window.CityServiceTranslate) {
    languageSelector.value = window.CityServiceTranslate.getLanguage();
    languageSelector.addEventListener("change", () => window.CityServiceTranslate.setLanguage(languageSelector.value));
    document.addEventListener("cityservice:languagechange", event => {
      languageSelector.value = event.detail.language;
    });
  }
  if (window.CityServiceTheme) window.CityServiceTheme.syncControls();
  renderNotifications();

  initializeRequestForm();

  atualizarContadoresSolicitacoes();
  inicializarFiltroSolicitacoes();
});