function atualizarTerrenos() {
  fetch(`/clientes/atualizar/${sessionStorage.getItem("idCliente")}`)
      .then((resposta) => {
        if (resposta.ok) {
          resposta.json().then(function (resposta) {
            console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

            for(let i = 0; i < resposta.length; i++) {
              console.log(resposta[i].nomeTerreno)
              id_box_graficos.innerHTML += `
              <span onclick="guardarIdTerreno(${i+1}, '${resposta[i].nomeTerreno}')">
                <div class="container">
                  <h2>${resposta[i].nomeTerreno}</h2>
                  <div class="data" id="div_temperatura${i+1}">Temperatura sendo obtida...</div>
                  <div class="data" id="div_umidade${i+1}">Umidade sendo obtida...</div>
                  <img id="img_alerta${i+1}" alt="icon"/>
                </div>
              </span>`
            }
          });
        } else {
          console.error("Nenhum terreno encontrado ou erro na API");
          console.log(resposta);
        }
      })
      .catch(function (error) {
        console.error(
          `Erro na obtenção dos dados dos terrenos: ${error.message}`
        );
      });
}
function atualizarTerrenosAnual() {
  fetch(`/clientes/atualizar/${sessionStorage.getItem("idCliente")}`)
      .then((resposta) => {
        if (resposta.ok) {
          resposta.json().then(function (resposta) {
            console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

            for(let i = 0; i < resposta.length; i++) {
              console.log(resposta[i].nomeTerreno)
              id_box_graficos.innerHTML += `
              <span onclick="guardarIdTerreno(${i+1}, '${resposta[i].nomeTerreno}')">
                <div class="container">
                  <h2>${resposta[i].nomeTerreno}</h2>
                </div>
              </span>`
            }
          });
        } else {
          console.error("Nenhum terreno encontrado ou erro na API");
          console.log(resposta);
        }
      })
      .catch(function (error) {
        console.error(
          `Erro na obtenção dos dados dos terrenos: ${error.message}`
        );
      });
}

function guardarIdTerreno(id_params, nome_params) {
  sessionStorage.removeItem("idTerreno");
  sessionStorage.removeItem("nomeTerreno");

  sessionStorage.getItem("idTerreno")

  sessionStorage.setItem("idTerreno", id_params)
  sessionStorage.setItem("nomeTerreno", nome_params)

  window.location.href = "grafico-diario.html"
}

function atualizarDados() {
  span_nome_terreno.innerHTML = sessionStorage.getItem("nomeTerreno")

  var data = sessionStorage.getItem("Dia")
  
  var data_final = new Date(data)

  span_dia.innerHTML = data_final.toLocaleDateString('pt-BR')
}