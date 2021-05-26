function atualizacaoPeriodica() {
    obterDadosporTerreno()
    setTimeout(atualizacaoPeriodica, 5000)
}

function obterDadosporTerreno(idTerreno) {

    fetch(`/dadoSensor/tempo-real/${idTerreno}`)
    .then(resposta => {

        if (resposta.ok) {
            resposta.json().then(function (resposta) {

                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                // aqui, após registro. use os nomes 
                // dos atributos que vem no JSON 
                var dados = {
                    temperatura: resposta.temperatura,
                    umidade: resposta.umidade
                }

                alertar(resposta.temperatura, resposta.umidade, idcaminhao);
                atualizarTela(dados, idcaminhao);
            });
        } else {

            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
            console.error(`Erro na obtenção dos dados do terreno p/ gráfico: ${error.message}`);
        });
}

function alertar(temperatura, umidade, idTerreno) {
    // padrão para meu alerta
    var limites = {
        max_temperatura: 47,
        min_umidade: 20,
    };

    // zerar aviso de mensagem
    var mensagem_temperatura = '';
    var mensagem_umidade = '';
    var classe_temperatura = 'alerta';
    var classe_umidade = 'alerta_umidd';

    // comparando
    if (temperatura > limites.max_temperatura) {
        mensagem_temperatura += 'Temperatura alta demais! <br>';
        classe_temperatura = 'alerta alerta-alto';
    }
    if (umidade < limites.min_umidade) {
        mensagem_umidade = 'Umidade baixa demais! <br>';
        classe_umidade = 'alerta_umidd alerta-baixo';
    }

    // escolhendo qual alterar
    var div_temperatura_alterar
    var div_umidade_alterar

    if (idcaminhao == 1) {
        div_temperatura_alterar = div_alerta_temperatura
        div_umidade_alterar = div_alerta_umidade
    } else if (idcaminhao == 2) {
        div_temperatura_alterar = div_alerta_temperatura2
        div_umidade_alterar = div_alerta_umidade2
    } else if (idcaminhao == 3) {
        div_temperatura_alterar = div_alerta_temperatura3
        div_umidade_alterar = div_alerta_umidade3
    } else if (idcaminhao == 4) {
        div_temperatura_alterar = div_alerta_temperatura4
        div_umidade_alterar = div_alerta_umidade4
    }

    // alterando
    div_temperatura_alterar.innerHTML = mensagem_temperatura;
    div_temperatura_alterar.className = classe_temperatura;

    div_umidade_alterar.innerHTML = mensagem_umidade;
    div_umidade_alterar.className = classe_umidade;
}

// só altere aqui se souber o que está fazendo!
function atualizarTela(dados, idTerreno) {
    console.log('iniciando atualização da tela...');

    // escolhendo qual alterar
    var div_temperatura_alterar
    var div_umidade_alterar

    switch (idTerreno) {
        case 1:
            div_temperatura_alterar = div_temperatura
            div_umidade_alterar = div_umidade
            break;
        case 2:
            div_temperatura_alterar = div_temperatura2
            div_umidade_alterar = div_umidade2
            break;
        case 3:
            div_temperatura_alterar = div_temperatura3
            div_umidade_alterar = div_umidade3
            break;
        case 4:
            div_temperatura_alterar = div_temperatura4
            div_umidade_alterar = div_umidade4
            break;
    }

    div_temperatura_alterar.innerHTML = `Temperatura: ${dados.temperatura}º`;

    div_umidade_alterar.innerHTML = `Umidade: ${dados.umidade}%`;
}

function sendData() {
    var http = new XMLHttpRequest();
    http.open('GET', 'http://localhost:9001/api/sendData', false);
    http.send(null);
}

// Descomente abaixo se quiser inserir dados a cada X segundos  
setInterval(() => {
    sendData();
}, 5000);
