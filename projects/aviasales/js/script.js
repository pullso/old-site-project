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
    'Ростов-на-Дону'
  ];

  inputCitiesFrom.addEventListener('input', () => {
    console.log('sobutie');
  });
});
