
function calculateBudget() {
  const meters2 = document.getElementById('meters2').value
  const details = document.getElementById('total-details');
  const profit = document.getElementById('cash').value;
  if (meters2 === null || meters2 === '' || meters2 === 0) {
    document.getElementById('meters2').classList.add('error-input');
    document.getElementById('cash').classList.add('error-input');

    setTimeout(() => {
      document.getElementById('meters2').classList.remove('error-input');
      document.getElementById('cash').classList.remove('error-input');
    }, 2000);

  } else {

    // PRICES R$
    const priceArduino = 50;
    const priceSensor = 20.50;
    const esp8266 = 20;

    const areaDelimitation = 90;

    let numSections = Math.round(meters2 / areaDelimitation);

    let price = (numSections * (priceArduino + priceSensor + esp8266))

    let labour = (price * 0.3);
    let total = (price + labour);

    let labourFormatted = labour.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let totalFormatted = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    let priceFormatted = price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    document.getElementById('total').value = `Total: ${totalFormatted}`;

    details.innerHTML = `Para uma região de ${meters2}m² será utilizado ${numSections} sensores, arduinos e ESP8266 resultando em ${priceFormatted} mais ${labourFormatted} de mão de obra.`;

    let loss = profit * 12 * 10;

    let lossFormatted = loss.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let profitFormatted = profit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    img_orcamento.src = "img/money.svg"

    document.getElementById('img_orcamento').classList.add('img_profit');

    details_financial.innerHTML = `Sem nossa solução você perderá mais de R$${profitFormatted} em um incêndio.
    <br><br> Com a solução ENVSAFE, você economizará cerca de R$${lossFormatted}.
    <br> Dependendo da intensidade do incêndio, a fertilidade de sua terra pode demorar até 10 anos para se recuperar`
  }

}

