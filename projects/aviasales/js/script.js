document.addEventListener('DOMContentLoaded', () => {
  //получаем элеменеты страницы
  const formSearch = document.querySelector('.form-searh'),
    inputCitiesFrom = document.querySelector('.input__cities-from'),
    inputCitiesTo = document.querySelector('.input__cities-to'),
    dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
    dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
    inputDateDepart = document.querySelector('.input__date-depart');
  //данные
  const citiesApi = 'database/cities.json',
    proxy = 'https://cors-anywhere.herokuapp.com/',
    API_KEY = 'f205fa4f7039f66a778eeb17d13449cd',
    calendar = 'http://min-prices.aviasales.ru/calendar_preload';
  let city = [];
  //функции
  const getData = (url, callback) => {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('readystatechange', e => {
      if (request.readyState !== 4) return;

      if (request.status === 200) {
        callback(request.response);
      } else {
        console.error('request.status: ', request.status);
      }
    });
    request.send(url);
  };

  const showCity = (event, input, list) => {
    list.textContent = '';
    //инпут пустой
    if (input.value === '') return;

    const filterCity = city.filter(item => {
      const fixItem = item.name.toLowerCase();
      return fixItem.includes(input.value.toLowerCase());
    });

    filterCity.forEach(item => {
      const li = document.createElement('li');
      li.classList.add('dropdown__city');
      li.textContent = item.name;
      list.append(li);
    });
  };
  const selectCity = (event, input, list) => {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'li') {
      input.value = target.textContent;
      list.textContent = '';
    }
  };
  //обработчики страницы
  inputCitiesFrom.addEventListener('input', () => {
    showCity(event, inputCitiesFrom, dropdownCitiesFrom);
  });

  inputCitiesTo.addEventListener('input', () => {
    showCity(event, inputCitiesTo, dropdownCitiesTo);
  });

  dropdownCitiesFrom.addEventListener('click', event => {
    selectCity(event, inputCitiesFrom, dropdownCitiesFrom);
  });

  dropdownCitiesTo.addEventListener('click', event => {
    selectCity(event, inputCitiesTo, dropdownCitiesTo);
  });

  getData(citiesApi, data => {
    city = JSON.parse(data).filter(item => item.name);
  });

  //--------------
});
