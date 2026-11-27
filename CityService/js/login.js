function togglePassword(fieldId, iconId) {
  const field = document.getElementById(fieldId);
  const icon = document.getElementById(iconId);
  if (!field || !icon) return;
  field.type = field.type === "password" ? "text" : "password";
  icon.textContent = field.type === "password" ? "visibility" : "visibility_off";
}

const contasDemo = [
  { usuario: "usuario", email: "usuario@cityservice.local", senha: "Usuario123!", role: "usuario", nome: "Usuário" },
  { usuario: "atendente", email: "atendente@cityservice.local", senha: "Atendente123!", role: "atendente", nome: "Atendente" },
  { usuario: "administrador", email: "administrador@cityservice.local", senha: "Admin123!", role: "administrador", nome: "Administrador" }
];

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  const inputUsuario = document.getElementById("loginEmail");
  const inputSenha = document.getElementById("loginPassword");
  if (!form || !inputUsuario || !inputSenha) return;

  let mensagem = document.getElementById("loginError");
  if (!mensagem) {
    mensagem = document.createElement("p");
    mensagem.id = "loginError";
    mensagem.className = "hidden rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700";
    form.insertBefore(mensagem, form.querySelector('button[type="submit"]'));
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const login = inputUsuario.value.trim().toLowerCase();
    const senha = inputSenha.value;
    const contaDemo = contasDemo.find(item => (item.usuario === login || item.email === login) && item.senha === senha);
    let usuariosCadastrados = [];
    try { usuariosCadastrados = JSON.parse(localStorage.getItem("cityservice_usuarios_cadastrados") || "[]"); if (!Array.isArray(usuariosCadastrados)) usuariosCadastrados = []; } catch (error) { usuariosCadastrados = []; }
    const contaCadastro = usuariosCadastrados.find(item => item.email === login && item.senha === senha);
    const conta = contaDemo || (contaCadastro ? { usuario: contaCadastro.email, email: contaCadastro.email, senha: contaCadastro.senha, role: "usuario", nome: contaCadastro.nome } : null);

    if (!conta) {
      mensagem.textContent = "Usuário ou senha inválidos. Confira os dados e tente novamente.";
      mensagem.classList.remove("hidden");
      inputSenha.value = "";
      inputSenha.focus();
      return;
    }

    localStorage.setItem("cityservice_sessao_demo", JSON.stringify({
      usuario: conta.usuario,
      email: conta.email,
      name: conta.nome,
      role: conta.role,
      loginEm: new Date().toISOString()
    }));
    window.location.href = "pages/inicio.html";
  });
});
