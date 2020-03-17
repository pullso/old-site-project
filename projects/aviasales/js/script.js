document.addEventListener('DOMContentLoaded', () => {
  const formSearch = document.querySelector('.form-searh'),
    inputCitiesFrom = document.querySelector('.input__cities-from'),
    inputCitiesTo = document.querySelector('.input__cities-to'),
    dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
    dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
    inputDateDepart = document.querySelector('.input__date-depart');
  const city = [
    'Москва',
    'Санк-Петербург',
    'Екатеринбург',
    'Челябинск',
    'Кемерово',
    'Керчь',
    'Волгоград',
    'Самара',
    'Киев',
    'Севастополь',
    'Одесса',
    'Киев',
    'Ухань',
    'Киров',
    'Нижний Новгород',
    'Калининград',
    'Ростов-на-Дону',
    'Выборг',
    'Нижний Тагил',
    'Караганда'
  ];

  const showCity = (input, list) => {
    list.textContent = '';
    //инпут пустой
    if (input.value === '') return;

    const filterCity = city.filter(item => {
      return item.toLowerCase().includes(input.value.toLowerCase());
    });

    filterCity.forEach(item => {
      const li = document.createElement('li');
      li.classList.add('dropdown__city');
      li.textContent = item;
      list.append(li);
    });
  };
  const choseCity = (input, list) => {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'li') {
      input.value = target.textContent;
      list.textContent = '';
    }
  };

  inputCitiesFrom.addEventListener('input', () => {
    showCity(inputCitiesFrom, dropdownCitiesFrom);
  });

  inputCitiesTo.addEventListener('input', () => {
    showCity(inputCitiesTo, dropdownCitiesTo);
  });

  dropdownCitiesFrom.addEventListener('click', event => {
    choseCity(inputCitiesFrom, dropdownCitiesFrom);
  });

  dropdownCitiesTo.addEventListener('click', () => {
    choseCity(inputCitiesTo, dropdownCitiesTo);
  });

  //--------------
});
