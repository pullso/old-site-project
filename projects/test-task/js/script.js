document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.btn'),
    modal = document.querySelector('.modal'),
    modalWindow = document.querySelector('.modal__window');

  btn.addEventListener('click', () => {
    modal.style.display = 'block';
  });
  modal.addEventListener('click', e => {
    if (e.target !== modalWindow) {
      modal.style.display = 'none';
    }
  });

  let data = [
    {
      id: 1,
      name: 'Вася',
      date: '15.06.2018',
      count: 11,
    },
    {
      id: 2,
      name: 'Петя',
      date: '23.11.2018',
      count: 23,
    },
    {
      id: 3,
      name: 'Иван',
      date: '12 марта 2017',
      count: 3,
    },
    {
      id: 4,
      name: 'Александр',
      date: '20/12/2010',
      count: 1,
    },
    {
      id: 5,
      name: 'Евгений',
      date: '12.09.2018',
      count: 112,
    },
    {
      id: 6,
      name: 'Мария',
      date: '01.08.2016',
      count: 122,
    },
    {
      id: 7,
      name: 'Анастасия',
      date: '20.11.2018',
      count: 34,
    },
    {
      id: 8,
      name: 'Степан',
      date: '12.11.2019',
      count: 10,
    },
  ];

  const table = document.querySelector('table');
  let htmlTable = '';
  //заполнение таблицы
  const createTable = () => {
    for (const key in data) {
      htmlTable +=
        '<tr><th>' +
        data[key].id +
        '</th><th>' +
        data[key].name +
        '</th><th>' +
        data[key].date +
        '</th><th>' +
        data[key].count +
        '</th></tr>';
    }

    table.innerHTML += htmlTable;
  };

  createTable();

  //получаем все строки таблицы кроме заголовка
  let sortedRows = Array.from(table.rows).slice(1);
  const unsortedRows = Array.from(table.rows).slice(1);

  //функция преобразования даты в количество секунд с 1970
  const parseDate = date => {
    date = date.replace(/\//g, '.');
    date = date.replace(' марта ', '.03.');
    let newDate = new Date(date.replace(/(\d+)\.(\d+)\.(\d+)/, '$3/$2/$1'));
    return newDate.getTime();
  };

  table.rows[0].addEventListener('click', e => {
    //узнаем параметр сортировки
    let index = e.target.cellIndex;
    //обнуляем сортировку если нажали на другой столбец
    let status = table.rows[0].querySelectorAll('td');
    status.forEach(item => {
      if (item !== e.target) item.classList.remove('active', 'back');
    });
    //возращение несортированной таблицы
    if (e.target.classList.contains('back')) {
      table.tBodies[0].append(...unsortedRows);
      e.target.classList.remove('back');
      return;
    }
    switch (index) {
      //сортировка Date
      case 2:
        if (e.target.classList.contains('active')) {
          sortedRows.sort((rowA, rowB) =>
            parseDate(rowA.cells[index].innerHTML) > parseDate(rowB.cells[index].innerHTML)
              ? -1
              : 1,
          );
          e.target.classList.add('back');
          e.target.classList.remove('active');
          table.tBodies[0].append(...sortedRows);
          break;
        }
        sortedRows.sort((rowA, rowB) =>
          parseDate(rowA.cells[index].innerHTML) > parseDate(rowB.cells[index].innerHTML) ? 1 : -1,
        );
        e.target.classList.add('active');
        table.tBodies[0].append(...sortedRows);
        break;
      //сортировка Count
      case 3:
        if (e.target.classList.contains('active')) {
          sortedRows.sort((rowA, rowB) =>
            parseInt(rowA.cells[index].innerHTML) > parseInt(rowB.cells[index].innerHTML) ? -1 : 1,
          );
          e.target.classList.add('back');
          e.target.classList.remove('active');
          table.tBodies[0].append(...sortedRows);
          break;
        }
        sortedRows.sort((rowA, rowB) =>
          parseInt(rowA.cells[index].innerHTML) > parseInt(rowB.cells[index].innerHTML) ? 1 : -1,
        );
        e.target.classList.add('active');
        table.tBodies[0].append(...sortedRows);
        break;
      //Сортировка Name,Id
      default:
        if (e.target.classList.contains('active')) {
          sortedRows.sort((rowA, rowB) =>
            rowA.cells[index].innerHTML > rowB.cells[index].innerHTML ? -1 : 1,
          );
          e.target.classList.add('back');
          e.target.classList.remove('active');
          table.tBodies[0].append(...sortedRows);
          break;
        }
        sortedRows.sort((rowA, rowB) =>
          rowA.cells[index].innerHTML > rowB.cells[index].innerHTML ? 1 : -1,
        );
        e.target.classList.add('active');
        table.tBodies[0].append(...sortedRows);
    }
  });
});
