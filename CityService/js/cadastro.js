(function () {
  const key = "cityservice_usuarios_cadastrados";
  const form = document.getElementById("registerForm");
  const message = document.getElementById("registerMessage");
  const cpf = document.getElementById("cpf");
  const telefone = document.getElementById("telefone");
  const nascimento = document.getElementById("nascimento");

  function readUsers() {
    try { const users = JSON.parse(localStorage.getItem(key) || "[]"); return Array.isArray(users) ? users : []; }
    catch (error) { return []; }
  }
  function digits(value) { return value.replace(/\D/g, ""); }
  function validCPF(value) {
    const n = digits(value);
    if (n.length !== 11 || /^(\d)\1+$/.test(n)) return false;
    let sum = 0;
    for (let i = 0; i < 9; i++) sum += Number(n[i]) * (10 - i);
    let digit = (sum * 10) % 11; if (digit === 10) digit = 0;
    if (digit !== Number(n[9])) return false;
    sum = 0;
    for (let i = 0; i < 10; i++) sum += Number(n[i]) * (11 - i);
    digit = (sum * 10) % 11; if (digit === 10) digit = 0;
    return digit === Number(n[10]);
  }
  function show(text, success) {
    message.textContent = text;
    message.className = "sm:col-span-2 rounded-lg px-4 py-3 text-sm " + (success ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200");
  }
  cpf.addEventListener("input", () => {
    let v = digits(cpf.value).slice(0, 11);
    if (v.length > 9) v = v.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2}).*/, "$1.$2.$3-$4");
    else if (v.length > 6) v = v.replace(/^(\d{3})(\d{3})(\d{0,3}).*/, "$1.$2.$3");
    else if (v.length > 3) v = v.replace(/^(\d{3})(\d{0,3}).*/, "$1.$2");
    cpf.value = v;
  });
  telefone.addEventListener("input", () => {
    let v = digits(telefone.value).slice(0, 11);
    if (v.length > 10) v = v.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
    else if (v.length > 6) v = v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    else if (v.length > 2) v = v.replace(/^(\d{2})(\d{0,5}).*/, "($1) $2");
    telefone.value = v;
  });
  const hoje = new Date(); nascimento.max = new Date(hoje.getTime() - 86400000).toISOString().split("T")[0];

  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = {
      nome: document.getElementById("nome").value.trim().replace(/\s+/g, " "),
      cpf: cpf.value,
      telefone: telefone.value,
      email: document.getElementById("email").value.trim().toLowerCase(),
      nascimento: nascimento.value,
      senha: document.getElementById("senha").value
    };
    if (!validCPF(data.cpf)) return show("Informe um CPF válido.", false);
    if (digits(data.telefone).length < 10) return show("Informe um telefone válido com DDD.", false);
    if (data.nascimento >= new Date().toISOString().split("T")[0]) return show("A data de nascimento deve ser anterior à data atual.", false);
    if (data.senha.length < 8 || !/[A-Za-z]/.test(data.senha) || !/\d/.test(data.senha)) return show("A senha deve ter pelo menos 8 caracteres, incluindo letras e números.", false);
    if (data.senha !== document.getElementById("confirmarSenha").value) return show("As senhas não coincidem.", false);
    const users = readUsers();
    if (users.some(user => user.email === data.email)) return show("Este e-mail já está cadastrado.", false);
    if (users.some(user => digits(user.cpf) === digits(data.cpf))) return show("Este CPF já está cadastrado.", false);
    data.usuario = data.email;
    data.role = "usuario";
    data.criadoEm = new Date().toISOString();
    users.push(data);
    localStorage.setItem(key, JSON.stringify(users));
    show("Cadastro realizado com sucesso! Você será direcionado para o login.", true);
    form.reset();
    setTimeout(() => window.location.href = "login.html", 1300);
  });
})();
