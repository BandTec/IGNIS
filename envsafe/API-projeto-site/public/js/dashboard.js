function atualizacaoPeriodica() {
    obterDadosporTerreno(6)
    setTimeout(atualizacaoPeriodica, 5000)
}

function obterDadosporTerreno(idTerreno) {

    fetch(`/dadosSensor/pegardados/${idTerreno}`)
    .then(resposta => {
        console.log(resposta)
        if (resposta.ok) {
            resposta.json().then(function (resposta) {

                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                console.log(resposta)

                // aqui, após registro. use os nomes 
                // dos atributos que vem no JSON 
                var dados = {
                    temperatura: resposta.mediatemperatura,
                    umidade: resposta.mediaumidade
                }

                alertar(resposta.mediatemperatura, resposta.mediaumidade, idTerreno);
                atualizarTela(dados, idTerreno);
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
        max_temperatura: 36,
        media_temperatura: 35,
        ideal_temperatura: 28,
        min_umidade: 20,
        media_umidade: 36,
        ideal_umidade: 37
    };

    // zerar aviso de mensagem
    var imagem_situacao = '';

    // comparando
    if (temperatura > limites.max_temperatura && umidade <= limites.min_umidade) {
        imagem_situacao = '../permissao_total/img/danger.svg';
    }

    if((temperatura <= limites.media_temperatura && temperatura > limites.ideal_temperatura) && (umidade <= limites.media_umidade && umidade > limites.min_umidade)) {
        imagem_situacao = '../permissao_total/img/attention.svg'
    }

    if(temperatura <= limites.ideal_temperatura && umidade >= limites.ideal_umidade) {
        imagem_situacao = '../permissao_total/img/excelente.svg'
    }
    

    // escolhendo qual alterar
    var situacao_alterar

    if (idTerreno == 1) {
        situacao_alterar = img_alerta
    } else if (idTerreno == 2) {
        situacao_alterar = img_alerta2
    } else if (idTerreno == 3) {
        situacao_alterar = img_alerta3
    } else if (idTerreno == 6) {
        situacao_alterar = img_alerta4
    }

    // alterando
    situacao_alterar.src = imagem_situacao;
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
        case 6:
            div_temperatura_alterar = div_temperatura4
            div_umidade_alterar = div_umidade4
            break;
    }

    div_temperatura_alterar.innerHTML = `Média de temperatura: ${dados.temperatura}º`;

    div_umidade_alterar.innerHTML = `Média de umidade: ${dados.umidade}%`;
}
