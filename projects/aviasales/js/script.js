document.addEventListener('DOMContentLoaded', () => {
  //получаем элеменеты страницы
  const formSearch = document.querySelector('.form-search'),
    inputCitiesFrom = document.querySelector('.input__cities-from'),
    inputCitiesTo = document.querySelector('.input__cities-to'),
    dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
    dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
    inputDateDepart = document.querySelector('.input__date-depart'),
    cheapestTicket = document.getElementById('cheapest-ticket'),
    otherCheapTickets = document.getElementById('other-cheap-tickets');

  //данные
  const citiesApi = 'database/cities.json',
    proxy = 'https://cors-anywhere.herokuapp.com/',
    API_KEY = 'f205fa4f7039f66a778eeb17d13449cd',
    calendar = 'https://min-prices.aviasales.ru/calendar_preload',
    MAX_COUNT = 10;
  let city = [];
  //функции
  const getData = (url, callback, reject = console.error) => {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('readystatechange', e => {
      if (request.readyState !== 4) return;

      if (request.status === 200) {
        callback(request.response);
      } else {
        reject(request.status);
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
      return fixItem.startsWith(input.value.toLowerCase());
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
  const getDate = date => {
    return new Date(date).toLocaleString('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getNameCity = code => {
    const objCity = city.find(item => item.code === code);
    //body
    return objCity.name;
  };
  const getChanges = num => {
    if (num) {
      return num === 1 ? 'С 1 пересадкой' : 'С 2 пересадками';
    }
    return 'Без пересадок';
  };
  const getLinkAviaSales = data => {
    let link = 'https://www.aviasales.ru/search/' + data.origin;
    const date = new Date(data.depart_date);
    const day = date.getDay();
    const month = date.getMonth() + 1;
    link += day < 10 ? '0' + day : day;
    link += month < 10 ? '0' + day : day;
    link += data.destination + '1';
    console.log(link);
    return link;
  };
  const createCart = data => {
    let ticket = document.createElement('article');
    let deep;
    ticket.classList.add('ticket');
    if (data) {
      deep = `
        <h3 class="agent">${data.gate}</h3>
        <div class="ticket__wrapper">
          <div class="left-side">
            <a
              href="${getLinkAviaSales(data)}"
              class="button button__buy" target="_blank"
              >Купить за ${data.value}₽</a
            >
          </div>
          <div class="right-side">
            <div class="block-left">
              <div class="city__from">
                Вылет из города
                <span class="city__name">${getNameCity(data.origin)}</span>
              </div>
              <div class="date">${getDate(data.depart_date)}</div>
            </div>

            <div class="block-right">
              <div class="changes">${getChanges(data.number_of_changes)}</div>
              <div class="city__to">
                Город назначения:
                <span class="city__name">${getNameCity(data.destination)}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      deep = '<h3>К сожаланию билетов на выбранную дату не нашлось</h3>';
    }

    ticket.insertAdjacentHTML('afterbegin', deep);
    return ticket;
  };

  const renderCheapDay = cheapTicket => {
    cheapestTicket.style.display = 'block';
    cheapestTicket.innerHTML = '<h2>Самый дешевый билет на выбранную дату</h2>';
    console.log('cheapTicketDay: ', cheapTicket);
    const ticket = createCart(cheapTicket[0]);
    console.log('ticket: ', ticket);
    cheapestTicket.append(ticket);
    return;
  };

  const renderCheapYear = cheapTicketYear => {
    otherCheapTickets.style.display = 'block';
    otherCheapTickets.innerHTML =
      '<h2>Самые дешевые билеты на другие даты</h2>';
    cheapTicketYear.sort((prev, next) => prev.value - next.value);
    console.log('cheapTicketYear: ', cheapTicketYear);
    for (let i = 0; i < cheapTicketYear.length && i <= MAX_COUNT; i++) {
      const ticket = createCart(cheapTicketYear[i]);
      otherCheapTickets.append(ticket);
    }
  };

  const renderCheap = (data, date) => {
    const cheapTicketYear = JSON.parse(data).best_prices;

    const cheapTicketDay = cheapTicketYear.filter(
      item => item.depart_date === date
    );

    renderCheapDay(cheapTicketDay);
    renderCheapYear(cheapTicketYear);
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
  formSearch.addEventListener('submit', e => {
    e.preventDefault();

    const cityFrom = city.find(item => inputCitiesFrom.value === item.name);
    const cityTo = city.find(item => inputCitiesTo.value === item.name);
    const formData = {
      from: cityFrom,
      to: cityTo,
      when: inputDateDepart.value
    };

    if (formData.from && formData.to) {
      const requestData = `?depart_date=${formData.when}&origin=${formData.from.code}&destination=${formData.to.code}&one_way=true&token=${API_KEY}`;
      console.log(formData, requestData);
      getData(
        calendar + requestData,
        response => {
          renderCheap(response, formData.when);
        },
        e => {
          alert('В этом направлении нет рейсов');
        }
      );
    } else {
      alert('Введите корректное название города');
    }
  });
  //

  getData(citiesApi, data => {
    city = JSON.parse(data).filter(item => item.name);
    city.sort((prev, next) => {
      if (prev.name > next.name) {
        return 1;
      }
      if (prev.name < next.name) {
        return -1;
      }
      return 0;
    });
    console.log(city);
  });

  //--------------
});
