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
  const status = table.rows[0].querySelectorAll('td');

  //функция преобразования даты в количество секунд с 1970
  const parseDate = date => {
    date = date.replace(/\//g, '.');
    date = date.replace(' марта ', '.03.');
    let newDate = new Date(date.replace(/(\d+)\.(\d+)\.(\d+)/, '$3/$2/$1'));
    return newDate.getTime();
  };

  const sortTable = (arr, index) => {
    //флаг обратной сортировки
    let back = false;

    let target = status[index];
    //удаление флагов активности с невыбранных ячеек
    status.forEach(item => {
      if (item !== target) item.classList.remove('active', 'back');
    });
    //возращение несортированной таблицы если на наименовании столбца есть флаг обратной сортировки
    if (target.classList.contains('back')) {
      target.classList.remove('back', 'active');
      table.tBodies[0].append(...unsortedRows);

      return;
    }
    //включение флага обратной сортировки
    if (target.classList.contains('active')) {
      target.classList.remove('active');
      target.classList.add('back');
      back = true;
    }
    //сортировка массива с зависимости от выбранной ячейки
    arr.sort((a, b) => {
      switch (index) {
        case 0:
        case 3:
          a = parseInt(a.cells[index].innerHTML);
          b = parseInt(b.cells[index].innerHTML);
          break;
        case 2:
          a = parseDate(a.cells[index].innerHTML);
          b = parseDate(b.cells[index].innerHTML);
          break;
        default:
          a = a.cells[index].innerHTML;
          b = b.cells[index].innerHTML;
          if (!back) {
            if (a > b) return 1;
            else return -1;
          } else {
            if (a < b) return 1;
            else return -1;
          }
      }
      if (back) {
        return b - a;
      }
      return a - b;
    });

    //вывод отсортированной таблицы
    table.tBodies[0].append(...arr);
    if (!back) target.classList.add('active');
  };

  table.rows[0].addEventListener('click', e => {
    sortTable(sortedRows, e.target.cellIndex);
  });
});
