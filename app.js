const barbearia = {
  nome: "Barbearia do John",
  endereco: "Rua Coronel Alves, 742 — Centro, Bauru/SP",
  horario: "Seg a Sáb: 9h às 19h",
  telefone: "(14) 98765-4321"
}

const servicos = [
  { id: 1, nome: "Corte Simples", preco: "R$ 25,00" },
  { id: 2, nome: "Corte + Barba", preco: "R$ 45,00" },
  { id: 3, nome: "Barba", preco: "R$ 25,00" },
  { id: 4, nome: "Combo Completo", preco: "R$ 60,00" }
]

document.getElementById('navbar').innerHTML = `
  <div class="nav-container">
    <h1>${barbearia.nome}</h1>
    <ul>
      <li><a href="#hero">Início</a></li>
      <li><a href="#servicos">Serviços</a></li>
      <li><a href="#agendamentos">Agendar</a></li>
    </ul>
  </div>
`
document.getElementById('hero').innerHTML = `
  <div class="hero-container">
    <h2>O melhor corte da cidade</h2>
    <p>Estilo, precisão e tradição em cada detalhe.</p>
    <a href="#agendamentos">Agendar agora</a>
  </div>
`
document.getElementById('servicos').innerHTML = `
  <div class="servicos-container">
    <h2>Nossos Serviços</h2>
    <div class="servicos-grid">
      ${servicos.map(s => `
        <div class="servico-card">
          <h3>${s.nome}</h3>
          <p>${s.preco}</p>
        </div>
      `).join('')}
    </div>
  </div>
`
document.getElementById('agendamentos').innerHTML = `
  <div class="agendamentos-container">
    <h2>Agendar Horário</h2>
    <div class="form-group">
      <input type="text" id="nomeCliente" placeholder="Seu nome">
      <select id="servicoEscolhido">
        ${servicos.map(s => `<option value="${s.nome}">${s.nome}</option>`).join('')}
      </select>
      <input type="datetime-local" id="dataHora">
      <button onclick="criarAgendamento()">Agendar</button>
    </div>
    <h3>Agendamentos</h3>
    <table>
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Serviço</th>
          <th>Data/Hora</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody id="listaAgendamentos"></tbody>
    </table>
  </div>
`
let agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || []

function salvar() {
  localStorage.setItem('agendamentos', JSON.stringify(agendamentos))
}

function renderizar() {
  document.getElementById('listaAgendamentos').innerHTML = agendamentos.map((a, i) => `
    <tr>
      <td>${a.nome}</td>
      <td>${a.servico}</td>
      <td>${a.dataHora}</td>
      <td>
        <button onclick="editar(${i})">Editar</button>
        <button onclick="deletar(${i})">Cancelar</button>
      </td>
    </tr>
  `).join('')
}

function criarAgendamento() {
  const nome = document.getElementById('nomeCliente').value
  const servico = document.getElementById('servicoEscolhido').value
  const dataHora = document.getElementById('dataHora').value

  if (!nome || !dataHora) return alert('Preencha todos os campos!')

  agendamentos.push({ nome, servico, dataHora })
  salvar()
  renderizar()
}

function deletar(i) {
  agendamentos.splice(i, 1)
  salvar()
  renderizar()
}

function editar(i) {
  const a = agendamentos[i]
  document.getElementById('nomeCliente').value = a.nome
  document.getElementById('servicoEscolhido').value = a.servico
  document.getElementById('dataHora').value = a.dataHora
  deletar(i)
}

renderizar()
document.getElementById('footer').innerHTML = `
  <div class="footer-container">
    <p>${barbearia.nome}</p>
    <p>${barbearia.endereco}</p>
    <p>${barbearia.horario}</p>
    <p>${barbearia.telefone}</p>
  </div>
`