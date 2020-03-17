document.addEventListener('DOMContentLoaded', () => {
  const formSearch = document.querySelector('.form-searh'),
    inputCitiesFrom = document.querySelector('.input__cities-from'),
    dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
    dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
    inputDateDepart = document.querySelector('.input__date-depart');
  const city = [
    'Москва',
    'Санк-Петербург',
    'Екатеринбург',
    'Челябинск',
    'Кемерово',
    'Керч',
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

  inputCitiesFrom.addEventListener('input', () => {
    dropdownCitiesFrom.textContent = '';

    const filterCity = city.filter(item => {
      return item.toLowerCase().includes(inputCitiesFrom.value.toLowerCase());
    });
    filterCity.forEach(item => {
      const li = document.createElement('li');
      li.classList.add('dropdown__city');
      li.textContent = item;
      dropdownCitiesFrom.append(li);
    });
  });
});
