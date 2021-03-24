
function calculateBudget() {
  const meters2 = document.getElementById('meters2').value
  const details = document.getElementById('total-details');
  if (meters2 === null || meters2 === '' || meters2 === 0) {
    document.getElementById('meters2').classList.add('error-input');

    setTimeout(() => {
      document.getElementById('meters2').classList.remove('error-input');
    }, 2000);

  } else {

    // PRICES R$
    const priceArduino = 50
    const priceSensor = 20.50
    const priceRepeater = 300.79
    const areaDelimitation = 500

    let numSections = meters2 / areaDelimitation;
    let numSensors = Math.round(numSections * 4);

    let preco = (numSensors * (priceSensor + priceArduino)) + (numSections * priceRepeater);
    let percent = preco * 0.3;
    let total = preco + percent;

    let numRepeater = Math.round(numSections) > 1 ? Math.round(numSections) + ' repetidores de sinal' : Math.round(numSections) + ' repetidor de sinal';

    document.getElementById('total').value = `Total: R$ ${total.toFixed(2).replace(".", ",")}`;

    details.innerHTML = `Para uma região de ${meters2}M² será utilizado um total de ${numSensors} sensores e arduinos, somados a ${numRepeater}, resultando em R$ ${preco.toFixed(2).replace('.', ',')} mais R$ ${percent.toFixed(2).replace('.', ',')} de mão de obra.`;
  }

}

