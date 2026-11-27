(function () {
  const servicesKey = "cityservice_servicos_demo";
  const eventsKey = "cityservice_eventos_demo";
  const auditKey = "cityservice_auditoria_demo";

  function readList(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(value) ? value : [];
    } catch (error) {
      return [];
    }
  }

  function saveList(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  function audit(action) {
    const session = window.CityServiceAccess ? window.CityServiceAccess.getSession() : null;
    const entries = readList(auditKey);
    entries.unshift({
      acao: action,
      data: new Date().toLocaleString("pt-BR"),
      perfil: session ? session.name : "Sessão de demonstração"
    });
    saveList(auditKey, entries.slice(0, 100));
  }

  function initializeServices() {
    const list = document.getElementById("servicosExtras");
    const section = document.getElementById("servicosExtrasSection");
    const form = document.getElementById("formServicoDemo");
    if (!list || !section) return;

    function render() {
      const items = readList(servicesKey);
      section.classList.toggle("hidden", items.length === 0);
      list.innerHTML = items.map((item, index) => `<article class="bg-white border border-[#dfe4e8] rounded-2xl p-5"><p class="text-[10px] uppercase tracking-wider font-bold text-[#20a883]">${escapeHtml(item.categoria || "Serviço público")}</p><h3 class="font-bold text-lg mt-2">${escapeHtml(item.nome)}</h3><p class="text-sm text-[#667783] mt-2">${escapeHtml(item.resumo)}</p><details class="mt-3"><summary class="text-sm font-semibold text-[#0879b8] cursor-pointer">Saiba mais</summary><p class="text-sm text-[#667783] mt-2 whitespace-pre-line">${escapeHtml(item.descricao)}</p></details>${window.CityServiceAccess && window.CityServiceAccess.can("gerenciar_servicos") ? `<button type="button" data-remove-service="${index}" class="mt-4 text-sm font-semibold text-red-600">Excluir serviço</button>` : ""}</article>`).join("");
      list.querySelectorAll("[data-remove-service]").forEach(button => button.addEventListener("click", function () {
        if (!window.CityServiceAccess || !window.CityServiceAccess.can("gerenciar_servicos")) return;
        const current = readList(servicesKey);
        const removed = current.splice(Number(button.dataset.removeService), 1)[0];
        saveList(servicesKey, current);
        audit("Removeu serviço: " + removed.nome);
        render();
      }));
    }

    if (form) form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!window.CityServiceAccess || !window.CityServiceAccess.can("gerenciar_servicos")) return;
      const item = {
        nome: document.getElementById("servicoNomeDemo").value.trim(),
        categoria: document.getElementById("servicoCategoriaDemo").value.trim(),
        resumo: document.getElementById("servicoResumoDemo").value.trim(),
        descricao: document.getElementById("servicoDescricaoDemo").value.trim()
      };
      if (!item.nome || !item.resumo || !item.descricao) return;
      const items = readList(servicesKey);
      items.unshift(item);
      saveList(servicesKey, items);
      audit("Cadastrou serviço: " + item.nome);
      form.reset();
      render();
    });

    render();
  }

  function initializeEvents() {
    const list = document.getElementById("eventosExtras");
    const section = document.getElementById("eventosExtrasSection");
    const form = document.getElementById("formEventoDemo");
    if (!list || !section) return;

    function render() {
      const items = readList(eventsKey);
      section.classList.toggle("hidden", items.length === 0);
      list.innerHTML = items.map((item, index) => `<article class="bg-white border border-[#dfe4e8] rounded-2xl p-5"><p class="text-[10px] uppercase tracking-wider font-bold text-[#20a883]">${escapeHtml(item.data)}</p><h3 class="font-bold text-xl mt-2">${escapeHtml(item.titulo)}</h3><p class="text-xs text-[#667783] mt-1">${escapeHtml(item.local || "Local a confirmar")}</p>${item.imagem ? `<img src="${escapeHtml(item.imagem)}" alt="${escapeHtml(item.titulo)}" class="w-full h-40 object-cover rounded-xl mt-4" loading="lazy">` : ""}<p class="text-sm text-[#667783] mt-3 whitespace-pre-line">${escapeHtml(item.descricao)}</p>${window.CityServiceAccess && window.CityServiceAccess.can("gerenciar_eventos") ? `<button type="button" data-remove-event="${index}" class="mt-4 text-sm font-semibold text-red-600">Excluir evento</button>` : ""}</article>`).join("");
      list.querySelectorAll("[data-remove-event]").forEach(button => button.addEventListener("click", function () {
        if (!window.CityServiceAccess || !window.CityServiceAccess.can("gerenciar_eventos")) return;
        const current = readList(eventsKey);
        const removed = current.splice(Number(button.dataset.removeEvent), 1)[0];
        saveList(eventsKey, current);
        audit("Removeu evento: " + removed.titulo);
        render();
      }));
    }

    if (form) form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!window.CityServiceAccess || !window.CityServiceAccess.can("gerenciar_eventos")) return;
      const item = {
        titulo: document.getElementById("eventoTituloDemo").value.trim(),
        local: document.getElementById("eventoLocalDemo").value.trim(),
        data: document.getElementById("eventoDataDemo").value,
        imagem: document.getElementById("eventoImagemDemo").value.trim(),
        descricao: document.getElementById("eventoDescricaoDemo").value.trim()
      };
      if (!item.titulo || !item.data || !item.descricao) return;
      const items = readList(eventsKey);
      items.unshift(item);
      saveList(eventsKey, items);
      audit("Cadastrou evento: " + item.titulo);
      form.reset();
      render();
    });

    render();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initializeServices();
    initializeEvents();
  });
})();
