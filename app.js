const barbearia  = {
    nome = "Barbearia do John",
    endereco = "Rua Coronel Alves, 742 — Centro, Bauru/SP",
    horario = "Seg À Sab, 9h até 18h",
    telefone = "(14) 98765-4321"

}

document.getElementById('app').innerHTML = `
  <nav>
    <h1>${barbearia.nome}</h1>
  </nav>
`