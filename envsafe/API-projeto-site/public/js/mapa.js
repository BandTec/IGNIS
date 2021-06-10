
  verificarAutenticacao();

  var baseLayer = L.tileLayer(
    "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution: "...",
      maxZoom: 18,
    }
  );

  var cfg = {
    radius: 3,
    maxOpacity: 0.9,
    scaleRadius: true,
    useLocalExtrema: true,
    latField: "latitude",
    lngField: "longitude",
    valueField: "count",
  };

  var heatmapLayer = new HeatmapOverlay(cfg);

  var mymap = L.map("mapid", {
    center: new L.LatLng(-14.1999346, -60.679193),
    zoom: 4,
    layers: [baseLayer, heatmapLayer],
  });

  var dados;

  function getData() {
    fetch(`/dadosSensor/dadosMapa`)
      .then((resposta) => {
        if (resposta.ok) {
          resposta.json().then(function (resposta) {
            console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

            dados = {
              max: 100,
              min: 10,
              data: resposta
            };

            verificarDados();
          });
        } else {
          console.error("Nenhum dado encontrado ou erro na API");
          console.log(resposta);
        }
      })
      .catch(function (error) {
        console.error(
          `Erro na obtenção dos dados dos terrenos: ${error.message}`
        );
      });
  }

  function verificarDados() {
    var limites = {
      max_temperatura: 36,
      media_temperatura: 35,
      ideal_temperatura: 28,
      min_umidade: 20,
      media_umidade: 25,
      ideal_umidade: 37,
    };

    var value = 10;

    for (let i = 0; i < dados.data.length; i++) {
      if (
        dados.data[i].temperatura >= limites.max_temperatura &&
        dados.data[i].umidade <= limites.min_umidade
      )
        value = 100;
      else if (
        dados.data[i].temperatura > limites.ideal_temperatura &&
        dados.data[i].umidade <= limites.media_umidade
      )
        value = 30;
      else if (
        dados.data[i].temperatura <= limites.ideal_temperatura &&
        dados.data[i].umidade >= limites.ideal_umidade
      )
        value = 10;

      dados.data[i].count = value
    }

    console.log(dados)

    heatmapLayer.setData(dados);
  }

  getData();

  setInterval(() => {
    getData();
  }, 6000)