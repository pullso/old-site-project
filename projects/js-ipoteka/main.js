//input
document.addEventListener('DOMContentLoaded', () => {
  //значения инпутов
  const totalCost = document.querySelector('#total-cost'),
    anInitialFee = document.querySelector('#an-initial-fee'),
    creditTerm = document.querySelector('#credit-term');
  //значения из range инпутов
  const totalCostRange = document.querySelector('#total-cost-range'),
    anInitialFeeRange = document.querySelector('#an-initial-fee-range'),
    creditTermRange = document.querySelector('#credit-term-range');

  //Все RANGE
  const inputsRange = document.querySelectorAll('.input-range');
  const inputs = document.querySelectorAll('input[type="number"]');

  //Итог расчетов
  const totalAmountOfCredit = document.querySelector('#amount-of-credit'),
    totalMounthlyPayment = document.querySelector('#monthly-payment'),
    totalRecomendedIncome = document.querySelector('#recommended-income');

  //Все кнопки с процентной ставкой
  const bankBtns = document.querySelectorAll('.bank');

  const banks = [
    {
      name: 'alfa',
      percent: 8.7,
    },
    {
      name: 'sberbank',
      percent: 8.4,
    },
    {
      name: 'pochta',
      percent: 7.9,
    },
    {
      name: 'tinkoff',
      percent: 9.2,
    },
  ];

  const assignValue = () => {
    totalCost.value = totalCostRange.value;
    anInitialFee.value = anInitialFeeRange.value;
    creditTerm.value = creditTermRange.value;
  };

  const assignValueInput = () => {
    totalCostRange.value = totalCost.value;
    anInitialFeeRange.value = anInitialFee.value;
    creditTermRange.value = creditTerm.value;
  };

  assignValue();

  let currentPercent = banks[0].percent;

  for (let bank of bankBtns) {
    bank.addEventListener('click', () => {
      bankBtns.forEach(key => {
        key.classList.remove('active');
      });
      bank.classList.add('active');
      takeActiveBank(bank);
    });
  }

  const takeActiveBank = currentActive => {
    const dataAttrValue = currentActive.dataset.name;
    const currentBank = banks.find(bank => bank.name === dataAttrValue);
    currentPercent = currentBank.percent;
    console.log(currentPercent);
    calculation(totalCost.value, anInitialFee.value, creditTerm.value);
  };

  for (let input of inputsRange) {
    input.addEventListener('input', () => {
      assignValue();
      calculation(totalCost.value, anInitialFee.value, creditTerm.value);
    });
  }

  for (let input of inputs) {
    input.addEventListener('input', () => {
      assignValueInput();
      calculation(totalCost.value, anInitialFee.value, creditTerm.value);
    });
  }

  const calculation = (totalCost = 0, anInitialFee = 100000, creditTerm = 1) => {
    let mountlyPayment; //Ежемесячный платеж
    let lounAmount = totalCost - anInitialFee; //Размер кредита
    let interestRate = currentPercent; //Процентная ставка
    let numberOfYears = creditTerm; //Количество лет
    let numberOfMounths = 12 * numberOfYears; //Количество месяцев

    mountlyPayment =
      (((lounAmount + (lounAmount / 100) * interestRate) / 12) * numberOfMounths) / numberOfMounths;
    const mounthlyPaymentArounded = Math.round(mountlyPayment);
    if (mounthlyPaymentArounded < 0) {
      return false;
    } else {
      totalAmountOfCredit.innerHTML = `${lounAmount} ₽`;
      totalMounthlyPayment.innerHTML = `${mounthlyPaymentArounded} ₽`;
      totalRecomendedIncome.innerHTML = `${Math.round(
        mounthlyPaymentArounded + mounthlyPaymentArounded * 0.35,
      )} ₽`;
    }
  };
});
