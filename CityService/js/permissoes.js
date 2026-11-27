(function () {
  const sessionKey = "cityservice_sessao_demo";
  const path = window.location.pathname;
  const isProtectedPage = path.includes("/pages/");

  if (isProtectedPage) document.documentElement.style.visibility = "hidden";

  function readSession() {
    try {
      const session = JSON.parse(localStorage.getItem(sessionKey) || "null");
      if (!session || !roles[session.role]) return null;
      return session;
    } catch (error) {
      return null;
    }
  }

  const roles = {
    usuario: {
      label: "Usuário",
      description: "Acesso aos recursos do cidadão",
      pages: ["inicio.html", "services.html", "requests.html", "map.html", "events.html", "news.html", "noticias-destaque.html", "article.html", "transparencia.html"],
      permissions: ["ver_servicos", "criar_solicitacao", "ver_proprias_solicitacoes", "ver_mapa", "ver_eventos", "ver_noticias", "editar_proprio_perfil", "ver_notificacoes"]
    },
    atendente: {
      label: "Atendente",
      description: "Atendimento e atualização de solicitações",
      pages: ["inicio.html", "services.html", "map.html", "events.html", "news.html", "noticias-destaque.html", "article.html", "transparencia.html", "gestao-solicitacoes.html", "dashboard.html"],
      permissions: ["ver_servicos", "ver_mapa", "ver_eventos", "ver_noticias", "ver_solicitacoes", "atualizar_status", "ver_notificacoes"]
    },
    administrador: {
      label: "Administrador",
      description: "Acesso administrativo completo",
      pages: ["inicio.html", "services.html", "requests.html", "map.html", "events.html", "news.html", "noticias-destaque.html", "article.html", "transparencia.html", "gestao-solicitacoes.html", "usuarios.html", "auditoria.html", "dashboard.html"],
      permissions: ["*"]
    }
  };

  const pageLabels = {
    "inicio.html": "Início",
    "dashboard.html": "Dashboard",
    "services.html": "Serviços",
    "requests.html": "Solicitações",
    "map.html": "Mapa de ocorrências",
    "events.html": "Eventos",
    "news.html": "Notícias",
    "noticias-destaque.html": "Destaques",
    "article.html": "Notícia",
    "transparencia.html": "Transparência",
    "gestao-solicitacoes.html": "Gestão de solicitações",
    "usuarios.html": "Usuários e permissões",
    "auditoria.html": "Auditoria"
  };

  const Access = {
    sessionKey,
    roles,
    pageLabels,
    getSession() {
      return readSession();
    },
    getRole() {
      const session = readSession();
      return session ? session.role : null;
    },
    getRoleDetails() {
      const role = this.getRole();
      return role ? roles[role] : null;
    },
    can(permission) {
      const role = this.getRole();
      if (!role || !roles[role]) return false;
      const permissions = roles[role].permissions;
      return permissions.includes("*") || permissions.includes(permission);
    },
    canOpen(page) {
      const role = this.getRole();
      return !!role && !!roles[role] && roles[role].pages.includes(page);
    },
    filterRequests(requests) {
      const role = this.getRole();
      if (role === "administrador" || role === "atendente") return requests;
      const session = readSession();
      if (!session) return [];
      return requests.filter(item => item.usuarioEmail === session.email);
    },
    applyRules(root) {
      const target = root || document;
      target.querySelectorAll("[data-access-page]").forEach(element => {
        if (!this.canOpen(element.dataset.accessPage)) element.remove();
      });
      target.querySelectorAll("[data-access-permission]").forEach(element => {
        if (!this.can(element.dataset.accessPermission)) element.remove();
      });
      target.querySelectorAll("[data-sidebar-page]").forEach(element => {
        if (!this.canOpen(element.dataset.sidebarPage)) element.remove();
      });
      target.querySelectorAll("[data-mobile-page]").forEach(element => {
        if (!element.hasAttribute("data-always-visible") && !this.canOpen(element.dataset.mobilePage)) element.remove();
      });
      target.querySelectorAll("a[href]").forEach(element => {
        const href = element.getAttribute("href");
        if (element.hasAttribute("data-always-visible")) return;
        if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:")) return;
        const page = href.split("/").pop().split("?")[0];
        if (pageLabels[page] && !this.canOpen(page)) element.remove();
      });
      const management = target.querySelector("#managementNavigation");
      if (management && !management.querySelector("a")) management.remove();
    },
    updateIdentity() {
      const session = readSession();
      if (!session) return;
      document.querySelectorAll("[data-role-name]").forEach(element => element.textContent = roles[session.role].label);
      document.querySelectorAll("[data-user-name]").forEach(element => element.textContent = session.name || "Usuário");
      document.querySelectorAll("[data-user-email]").forEach(element => element.textContent = session.email || "");
      document.querySelectorAll("[data-user-initials]").forEach(element => element.textContent = (session.name || "US").split(/\s+/).slice(0, 2).map(part => part[0]).join("").toUpperCase());
      document.querySelectorAll("[data-profile-kind]").forEach(element => element.textContent = roles[session.role].label);
      let registeredUsers = [];
      try { registeredUsers = JSON.parse(localStorage.getItem("cityservice_usuarios_cadastrados") || "[]"); if (!Array.isArray(registeredUsers)) registeredUsers = []; } catch (error) { registeredUsers = []; }
      const registered = registeredUsers.find(item => item.email === session.email);
      document.querySelectorAll("[data-profile-cpf]").forEach(element => element.textContent = registered ? registered.cpf : (session.role === "administrador" || session.role === "atendente" ? "Conta institucional" : "Não informado"));
      document.querySelectorAll("[data-profile-phone]").forEach(element => element.textContent = registered ? registered.telefone : "Não informado");
      const locale = window.CityServiceTranslate ? window.CityServiceTranslate.getLocale() : "pt-BR";
      document.querySelectorAll("[data-profile-birth]").forEach(element => element.textContent = registered && registered.nascimento ? new Date(registered.nascimento + "T12:00:00").toLocaleDateString(locale) : "Data de nascimento não cadastrada");
    },
    showAccessDenied(page) {
      const mains = Array.from(document.querySelectorAll("main"));
      const main = mains[mains.length - 1];
      if (main) {
        const t = value => window.CityServiceTranslate ? window.CityServiceTranslate.t(value) : value;
        const profile = t(roles[this.getRole()].label);
        const pageName = t(pageLabels[page] || "esta página");
        main.innerHTML = `<section class="max-w-2xl mx-auto mt-12 bg-white border border-[#dfe4e8] rounded-2xl p-8 text-center"><div class="mx-auto w-14 h-14 rounded-2xl bg-[#fff3e8] text-[#b96b20] flex items-center justify-center text-2xl">!</div><h1 class="text-2xl font-bold mt-5">${t("Acesso não permitido")}</h1><p class="text-sm text-[#667783] mt-3">${t("Seu perfil")} (${profile}) ${t("não possui permissão para acessar")} ${pageName}.</p><a href="inicio.html" class="inline-flex mt-6 px-5 py-3 rounded-xl bg-[#0879b8] text-white text-sm font-bold">${t("Voltar ao início")}</a></section>`;
      }
      document.documentElement.style.visibility = "visible";
    },
    initialize() {
      if (!isProtectedPage) return;
      const session = readSession();
      if (!session) {
        window.location.replace("../login.html");
        return;
      }
      const page = window.location.pathname.split("/").pop() || "inicio.html";
      this.applyRules(document);
      this.updateIdentity();
      if (!this.canOpen(page)) {
        this.showAccessDenied(page);
        return;
      }
      document.documentElement.style.visibility = "visible";
    },
    logout() {
      localStorage.removeItem(sessionKey);
      localStorage.removeItem("cityservice_perfil_demo");
      window.location.href = "../login.html";
    }
  };

  window.CityServiceAccess = Access;
})();
