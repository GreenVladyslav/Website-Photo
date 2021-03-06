/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/accordion.js":
/*!*************************************!*\
  !*** ./src/js/modules/accordion.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const accordion = triggersSelector => {
  const btns = document.querySelectorAll(triggersSelector);
  btns.forEach(btn => {
    btn.addEventListener('click', function () {
      // подсвечивается розовым вообщем стили
      if (!this.classList.contains('active-style')) {
        btns.forEach(btn => {
          btn.classList.remove('active-style');
          btn.nextElementSibling.classList.remove('active-content');
          btn.nextElementSibling.style.maxHeight = '0px';
        });
      }

      this.classList.toggle('active-style');
      this.nextElementSibling.classList.toggle('active-content');

      if (this.classList.contains('active-style')) {
        // = должен занимать элемент плюс padding в пикселях то элемент будет плавно разварачиватся засчет transition в css
        this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + "px";
      } else {
        this.nextElementSibling.style.maxHeight = '0px';
      }
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (accordion); // const accordion = (triggersSelector, itemsSelector) => {
//     const btns = document.querySelectorAll(triggersSelector),
//           blocks = document.querySelectorAll(itemsSelector);
//           через css 906-916
//         blocks.forEach(block => {
//             block.classList.add('animated', 'fadeInDown');
//         });
//         btns.forEach(btn => {
//             btn.addEventListener('click', function() {
//                 // я обращаюсь к элементу на которыой кликнули(в действии)
//                 if (!this.classList.contains('active')) {
//                     // если у элемента на котороый нажал польщователь нету класса активности то мы ему добавим
//                     // а у всех остальных котороые не подходят под описание мы уберем
//                     btns.forEach(btn => {
//                         btn.classList.remove('active', 'active-style');
//                     });
//                     // если у этого элемента нету класса активности то мы берем всех остальные кнопки которыое подходят 
//                     // под этот триггер мы их переберем и каждой кнопки 
//                     this.classList.add('active', 'active-style');
//                 }
//             });
//         });
// };
// export default accordion;
// const accordion = (triggerSelector) => {
//     const heading = document.querySelectorAll(triggerSelector);
//     const { marginBottom } = window.getComputedStyle(heading[0]);
//     function changeClasses(selector, state1, state2) {
//       selector.classList[state1]('fadeInDown');
//       selector.classList[state2]('fadeOutUp');
//     }
//     heading.forEach((item) => {
//       const next = item.nextElementSibling;
//       next.classList.add('animated');
//       next.style.display = 'none';
//       item.addEventListener('click', () => {
//         next.classList.toggle('active');
//         if (!next.classList.contains('active')) {
//           changeClasses(next, 'remove', 'add');
//           item.classList.remove('ui-accordion-header-active');
//           setTimeout(() => {
//             next.style.display = 'none';
//           }, 500);
//         } else {
//           changeClasses(next, 'add', 'remove');
//           next.style.display = 'block';
//           item.style.marginBottom = marginBottom;
//           item.classList.add('ui-accordion-header-active');
//         }
//       });
//     });
//   };
//   export default accordion;

/***/ }),

/***/ "./src/js/modules/burger.js":
/*!**********************************!*\
  !*** ./src/js/modules/burger.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const burger = (menuSelector, burgerSelector) => {
  const menuElem = document.querySelector(menuSelector),
        burgerElem = document.querySelector(burgerSelector);
  menuElem.style.display = 'none';
  burgerElem.addEventListener('click', () => {
    if (menuElem.style.display == 'none' && window.screen.availWidth < 993) {
      menuElem.style.display = 'block';
    } else {
      menuElem.style.display = 'none';
    }
  });
  window.addEventListener('resize', () => {
    if (window.screen.availWidth > 992) {
      menuElem.style.display = 'none';
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (burger);

/***/ }),

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_requests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/requests */ "./src/js/services/requests.js");
 // когда данные берем из БД

const calc = (size, material, options, promocode, result) => {
  const sizeBlock = document.querySelector(size),
        materialBlock = document.querySelector(material),
        optionsBlock = document.querySelector(options),
        promocodeBlock = document.querySelector(promocode),
        resultBlock = document.querySelector(result);
  let sum = 0,
      sizeValue = "",
      materialValue = "0",
      optionsValue = "0";
  let state;
  (0,_services_requests__WEBPACK_IMPORTED_MODULE_0__.getResource)('assets/calcPrice.json').then(res => {
    state = res;
  }).catch(e => console.log(e));

  function changePrice(event, elem) {
    elem.addEventListener(event, e => {
      const target = e.target,
            select = target.id;

      function calcFunc(state) {
        for (let key in state[select]) {
          if (elem.value === key) {
            switch (select) {
              case "size":
                sizeValue = state[select][key];
                break;

              case "material":
                materialValue = state[select][key];
                break;

              case "options":
                optionsValue = state[select][key];
                break;
            }
          } // console.log(state[select][key]);

        }

        sum = Math.round(+sizeValue * +materialValue + +optionsValue);

        if (sizeBlock.value == '' || materialBlock.value == '') {
          resultBlock.value = "Пожалуйста, выберите размер и материал картины";
        } else if (promocodeBlock.value === 'IWANTPOPART') {
          resultBlock.value = Math.round(sum * 0.7);
        } else {
          resultBlock.value = sum;
        } // console.log(resultBlock.value);

      }

      calcFunc(state);
    });
  }

  changePrice('change', sizeBlock);
  changePrice('change', materialBlock);
  changePrice('change', optionsBlock);
  changePrice('input', promocodeBlock);
};

/* harmony default export */ __webpack_exports__["default"] = (calc); // БЕЗ БД
// const calc = (size, material, options, promocode, result) => {
//     const sizeBlock = document.querySelector(size),
//           materialBlock = document.querySelector(material),
//           optionsBlock = document.querySelector(options),
//           promocodeBlock = document.querySelector(promocode),
//           resultBlock = document.querySelector(result);
//     let sum = 0;
//     // сумма которую я буду подсчитывать 
//     const calcFunc = () => {
//         // получаем строку
//         sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));
//         if (sizeBlock.value == '' || materialBlock.value == '') {
//             resultBlock.textContent = "Пожалуйста, выберите размер и материал картины";
//         } else if (promocodeBlock.value === 'IWANTPOPART') {
//             resultBlock.textContent = Math.round(sum * 0.7);
//         } else {
//             resultBlock.textContent = sum;
//         }
//     };
//     sizeBlock.addEventListener('change', calcFunc);
//     materialBlock.addEventListener('change', calcFunc);
//     optionsBlock.addEventListener('change', calcFunc);
//     promocodeBlock.addEventListener('input', calcFunc);
// };
// export default calc;

/***/ }),

/***/ "./src/js/modules/calcScroll.js":
/*!**************************************!*\
  !*** ./src/js/modules/calcScroll.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const calcScroll = () => {
  let div = document.createElement('div');
  div.style.width = '50px';
  div.style.height = '50px';
  div.style.overflowY = 'scroll';
  div.style.visibility = 'hidden';
  document.body.appendChild(div);
  let scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();
  return scrollWidth;
};

/* harmony default export */ __webpack_exports__["default"] = (calcScroll);

/***/ }),

/***/ "./src/js/modules/checkTextInputs.js":
/*!*******************************************!*\
  !*** ./src/js/modules/checkTextInputs.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const checkTextInputs = selector => {
  const textInputs = document.querySelectorAll(selector);
  textInputs.forEach(item => {
    // keypress когда пользователь нажал на определеную клавишу
    item.addEventListener('keypress', function (e) {
      if (e.key.match(/[^а-яё 0-9]/ig)) {
        e.preventDefault();
      }
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (checkTextInputs);

/***/ }),

/***/ "./src/js/modules/drop.js":
/*!********************************!*\
  !*** ./src/js/modules/drop.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_requests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/requests */ "./src/js/services/requests.js");


const drop = () => {
  // drag *
  // dragend *
  // dragenter - обьект над dropArea
  // dropArea - это может быть любой элемент котороый воспринимает это событие
  // dragexit *
  // dragleave - обьект за пределами dropArea
  // dragover - обьект зависает над dropArea 
  // dragstart *
  // drop - обьект отправлен в dropAre 
  // * - затрагивать мы будем не все! такие как отмеченные срабатывают на элементе котороые мы перетскиваем
  // и это не наш случай потомучто мы будем перетаскивать файлы из нашей файловой системы вместо того чтобы работать
  // с какими-то DOM элементами прямо на странице то есть обозначенные элементы никога не сработают в нашей задаче 
  // [name="upload" на всю страницу input ??
  const fileInputs = document.querySelectorAll('[name="upload"]'); // массив событий (сам написал)

  ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
    fileInputs.forEach(input => {
      input.addEventListener(eventName, preventDefaults, false);
    });
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation(); // stopPropagation() - который останавливает всплытие (bubbling) события “клик” к родительским элементам.
  } // индикатор который даст понять пользователю что он перетаскивает над нужной областью
  // передаем элемент которыой нам нужно подстветить 


  function hightlight(item) {
    item.closest('.file_upload').style.border = "5px solid yellow";
    item.closest('.file_upload').style.backgroundColor = "rgba(0,0,0, .7)"; // у этого элемента находим ближайший класс
  }

  function unhightlight(item) {
    item.closest('.file_upload').style.border = "none";

    if (item.closest('.calc_form')) {
      item.closest('.file_upload').style.backgroundColor = "#fff";
    } else if (item.closest('.col-md-3')) {
      item.closest('.file_upload').style.backgroundColor = "#f7e7e6";
    } else {
      item.closest('.file_upload').style.backgroundColor = "#ededed";
    } // цвет модальноого окна вернуть popup_content
    // item.closest('.file_upload').style.backgroundColor = "inherit"; наследовать
    // item.closest('.file_upload').style.backgroundColor = "initial"; начальный

  }

  ['dragenter', 'dragover'].forEach(eventName => {
    fileInputs.forEach(input => {
      input.addEventListener(eventName, () => hightlight(input), false);
    });
  }); // Мы берем два события. Перебераем все файловые инпуты с которыми будем рабоать.
  // И на каждый инпут навешиваем это событие. И ставим вот такой вот обработчки.
  // И обратная ситуация Когда мы опутсили файл или ушли мышкой то у нас выполнится

  ['dragleave', 'drop'].forEach(eventName => {
    fileInputs.forEach(input => {
      input.addEventListener(eventName, () => unhightlight(input), false);
    });
  }); // будем обрабатывать то когда пользователь скинет картинку вниз

  fileInputs.forEach(input => {
    input.addEventListener('drop', e => {
      // В files лежат файлы которые пользователь загрузил и их можно модифицировать
      input.files = e.dataTransfer.files; // то есть берем те файлы которые мы drag and drop -пим сейчас и просто засовываем
      //  их в инпут котороый есть на странице 
      //dataTransfer - это тот обьект с файлом котороый мы с вами перета- ваем и с файловой структуры
      // есть свои методы

      let dots;
      const arr = input.files[0].name.split('.');
      arr[0].length > 6 ? dots = "..." : dots = '.';
      const name = arr[0].substring(0, 6) + dots + arr[1];
      input.previousElementSibling.textContent = name;

      if (input.closest('.main')) {
        preventDefaults(e);
        let formData = new FormData();
        [...input.files].forEach(files => {
          formData.append('image', files);
          (0,_services_requests__WEBPACK_IMPORTED_MODULE_0__.postData)('assets/server.php', formData).then(res => {
            console.log(res);
          }).catch(() => {
            console.log('Error');
          });
        });
      }
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (drop); // 1. Во первых элементов может быть несколько мы можем выделять несколько картинках и претаскивать их в input Для этого в определнный input нам необходимо установить атрибут multiple для того чтобы он поддерживал несколько файлов ну и конечно это могу тбыть не только изображения но т любые файлы
// 2. Для того чтобы мы могли кидать только картинки нужно для input установить multiple accept="image/*" * - значит что мы можем заргужать любые типы картинок jpg и так далее 
// {/* <div class=file_upload>
// <button type=button>Загрузить фотографию</button>
// <div>Файл не выбран</div>
// <input type=file name=upload multiple accept="image/*">
// </div> */}
// 3. В старых браузерах такая реализация с drag and drop элементом работать не будет именно поэтмоу всего нужно оставлять в ручную ввод файлов то есть по старинке с какой папки загрузить файл
// 4. Мы можем отправить файл на сервер только тогда когда мы дропнули этот элемент 
// иногда это нужно например перетащили аву профиля и даже не нажали сабмит она установилась в профель в зависимости от веб ресура это очень полезная фича и сделать это не сложно

/***/ }),

/***/ "./src/js/modules/filter.js":
/*!**********************************!*\
  !*** ./src/js/modules/filter.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const filter = () => {
  const menu = document.querySelector('.portfolio-menu'),
        items = menu.querySelectorAll('li'),
        //   btnAll = menu.querySelector('.all'),
  //   btnLovers = menu.querySelector('.lovers'),
  //   btnChef = menu.querySelector('.chef'),
  //   btnGirl = menu.querySelector('.girl'),
  //   btnGuy = menu.querySelector('.guy'),
  //   btnGrandmother = menu.querySelector('.grandmother'),
  //   btnGranddad = menu.querySelector('.granddad'),
  wrapper = document.querySelector('.portfolio-wrapper'),
        markAll = wrapper.querySelectorAll('.all'),
        //   markGirl = wrapper.querySelectorAll('.girl'),
  //   markLovers = wrapper.querySelectorAll('.lovers'),
  //   markChef = wrapper.querySelectorAll('.chef'),
  //   markGuy = wrapper.querySelectorAll('.guy'),
  no = document.querySelector('.portfolio-no');

  const typeFilter = markType => {
    markAll.forEach(mark => {
      mark.style.display = 'none';
      mark.classList.remove('animated', 'fadeIn');
    });
    no.style.display = 'none';
    no.classList.remove('animated', 'fadeIn'); // markType !== undefiend

    if (markType) {
      markType.forEach(mark => {
        mark.style.display = 'block';
        mark.classList.add('animated', 'fadeIn');
      });
    }

    if (markType.length == 0) {
      no.style.display = 'block';
      no.classList.add('animated', 'fadeIn');
    }
  }; // btnAll.addEventListener('click', () => {
  //     typeFilter(markAll);
  // });
  // btnLovers.addEventListener('click', () => {
  //     typeFilter(markLovers);
  // });
  // btnChef.addEventListener('click', () => {
  //     typeFilter(markChef);
  // });
  // btnGirl.addEventListener('click', () => {
  //     typeFilter(markGirl);
  // });
  // btnGuy.addEventListener('click', () => {
  //     typeFilter(markGuy);
  // });
  // btnGrandmother.addEventListener('click', () => {
  //     typeFilter();
  // });
  // btnGranddad.addEventListener('click', () => {
  //     typeFilter();
  // });
  // сокращаем скрипт 


  menu.addEventListener('click', e => {
    let classSelect = e.target.classList[0];
    let allElements = wrapper.querySelectorAll(`.${classSelect}`);
    typeFilter(allElements);
  });
  menu.addEventListener('click', e => {
    let target = e.target; // Обязательно пишем в верхнем регистре
    // если пользовалтель кликнул в определенный элемент меню то мы должны убрать
    // все классы активности у всех остальных элементов меню и добавить тому на которыой 
    // кликнул пользователь

    if (target && target.tagName == "LI") {
      items.forEach(btn => btn.classList.remove('active'));
      target.classList.add('active');
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (filter);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_requests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/requests */ "./src/js/services/requests.js");


const forms = state => {
  const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        upload = document.querySelectorAll('[name="upload"]');
  const message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжимся',
    failure: 'Что-то пошло не так...',
    spinner: 'assets/img/spinner.gif',
    ok: 'assets/img/ok.png',
    fail: 'assets/img/fail.png'
  };
  const path = {
    designer: 'assets/server.php',
    question: 'assets/question.php'
  };

  const clearInputs = () => {
    inputs.forEach(item => {
      item.value = '';
    });
    upload.forEach(item => {
      item.previousElementSibling.textContent = "Файл не выбран";
    });
  };

  upload.forEach(item => {
    item.addEventListener('input', () => {
      // обращаемся к первому файлку который был туда загружен
      console.log(item.files[0]);
      let dots;
      const arr = item.files[0].name.split('.');
      arr[0].length > 6 ? dots = "..." : dots = '.'; // // 'afawefwefowakfewfe.jpg' => ['redsfaadw', 'jpg']
      // // вместо этого 
      // // item.files[0].name.split('.')[0].length > 6 ? dots = "..." : dots = '.';

      const name = arr[0].substring(0, 6) + dots + arr[1];
      item.previousElementSibling.textContent = name;
    });
  });
  form.forEach(item => {
    item.addEventListener('submit', e => {
      e.preventDefault();
      let statusMessage = document.createElement('div'); // в статусе выстроить по центру можно еще добавить 

      statusMessage.classList.add('status');
      item.parentNode.appendChild(statusMessage); // item.insertAdjacentElement('afterend', statusMessage);
      // анимация скрытия вверх

      item.classList.add('animated', 'fadeOutUp');
      setTimeout(() => {
        item.style.display = 'none';
      }, 400);
      let statusImg = document.createElement('img');
      statusImg.setAttribute('src', message.spinner); // statusImg.src = message.spinner;
      // анимация появления снизу

      statusImg.classList.add('animated', 'fadeInUp');
      statusMessage.appendChild(statusImg);
      const textMessage = document.createElement('div');
      textMessage.textContent = message.loading;
      statusMessage.appendChild(textMessage);
      const formData = new FormData(item); // Д.З калькулятор БД

      if (item.getAttribute('data-calc') === "calc") {
        for (let key in state) {
          formData.append(key, state[key]);
        }
      } // нужна для того чтобы сформировать динамический путь куда мы будем все это отправлять


      let api; // если этот блок будет действительно существовать у каких там там родителей то тогда мы получим этот блок
      // если этого блока просто не будет его наш скрипт не найдет то мы получим false по факту null
      //  если у формы есть родитель этот класс то все ок

      item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;
      console.log(api);
      (0,_services_requests__WEBPACK_IMPORTED_MODULE_0__.postData)(api, formData).then(res => {
        console.log(res);
        statusImg.setAttribute('src', message.ok);
        textMessage.textContent = message.success;
      }).catch(() => {
        statusImg.setAttribute('src', message.fail);
        textMessage.textContent = message.failure;
      }).finally(() => {
        clearInputs();

        for (let key in state) {
          delete state[key];
        }

        setTimeout(() => {
          statusMessage.remove(); // стосит none

          item.style.display = 'block'; // скрытие формы

          item.classList.remove('fadeOutUp'); // красивое появление формы

          item.classList.add('fadeInUp');
        }, 5000);
      });
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./src/js/modules/mask.js":
/*!********************************!*\
  !*** ./src/js/modules/mask.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const mask = selector => {
  let setCursorPosition = (pos, elem) => {
    elem.focus(); // Вручную можем устанавливать выделение которое у нас произошло в инпуте
    // если у нас эти два значения будут одинаковые то мы выделим не какой-то участок
    // а мы просто поставим курсор в определенную позицию
    // полифил для старых браузеров 

    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      let range = elem.createTextRange(); // Сворачивает текущую выделенную область в одну точку (первую с последним)

      range.collapse(true); // POS - это количество симвоволов в this.value.length

      range.moveEnd('character', pos);
      range.moveStart('character', pos); // уставноим курсор и выделим то значение котрое сформируется с верхних параметров

      range.select();
    }
  };

  function createMask(event) {
    // матрицу можно так же располложить в каком-то json файле и подтягивать в зависимости от той страны где
    // пользователь возмжно она буддет подтягиватся из базы данных
    let matrix = '+3 (___) ___ __ __',
        i = 0,
        // статичное работает на основе матрицы 
    // \ из матрицы мы получим только те значение котороые не соответсвуют числовым значения
    def = matrix.replace(/\D/g, ''),
        // динамчиное работает на том что ввел пользовалтель 
    val = this.value.replace(/\D/g, ''); // когда пользователь что-то вводит в матрицу если он начинает вдруг удалять
    // 7 или + то мы ему это не дадим

    if (def.length >= val.length) {
      val = def;
    } // вместо переменной (a) будет подставлятся каждый символ котороый будет находится в матрицы


    this.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
    }); // перебераем все символы которыо есть в матрицы и возвращаем в зависимости от отпределенных условий
    // это может быть кусочек маски либо определнный символ которыой ввел пользовалтель вернее это будет цифра
    // на основание этого сформируем новый this.value который будет отображается на страницы

    if (event.type === 'blur') {
      // Событие blur вызывается когда элемент теряет фокус.
      if (this.value.length == 2) {
        this.value = '';
      }
    } else {
      // (количество символов которое сейчас есть в инпуте, ссылка на тот элетмент которыой сейчас в работе)
      setCursorPosition(this.value.length, this);
    }
  }

  let inputs = document.querySelectorAll(selector); //  когда мы сформируем все элементы я повешу на каждое событие обработчкик
  // (формируется новый value, отчищаться value, устанавилватся cursor)

  inputs.forEach(input => {
    input.addEventListener('input', createMask);
    input.addEventListener('focus', createMask);
    input.addEventListener('blur', createMask);
  });
};

/* harmony default export */ __webpack_exports__["default"] = (mask);

/***/ }),

/***/ "./src/js/modules/modals.js":
/*!**********************************!*\
  !*** ./src/js/modules/modals.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _calcScroll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calcScroll */ "./src/js/modules/calcScroll.js");


const modals = () => {
  let btnPressed = false;

  function bindModal(triggerSelector, modalSelector, closeSelector) {
    let destroy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    const trigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector),
          close = document.querySelector(closeSelector),
          windows = document.querySelectorAll('[data-modal]'),
          scroll = (0,_calcScroll__WEBPACK_IMPORTED_MODULE_0__["default"])();
    trigger.forEach(item => {
      item.addEventListener('click', e => {
        if (e.target) {
          e.preventDefault();
          btnPressed = true;

          if (destroy) {
            item.remove();
          }

          windows.forEach(item => {
            item.style.display = 'none'; //    анимация через библиотеку animate.css

            item.classList.add('animated', 'fadeIn');
          });
          modal.style.display = 'block';
          document.body.style.overflow = 'hidden'; // document.body.classList.add('modal-open'); bootstrap

          document.body.style.marginRight = `${scroll}px`;
        }
      }); // if (item.classList.contains('popup_calc_button') || item.classList.contains('popup_calc_profile_button')) {
      //     item.disabled = true;
      // }
    });
    close.addEventListener('click', () => {
      windows.forEach(item => {
        item.style.display = 'none';
      });
      modal.style.display = 'none';
      document.body.style.overflow = ''; // document.body.classList.remove('modal-open');

      document.body.style.marginRight = `0px`;
    });
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        windows.forEach(item => {
          item.style.display = 'none';
        });
        modal.style.display = 'none';
        document.body.style.overflow = ''; // document.body.classList.remove('modal-open');

        document.body.style.marginRight = `0px`;
      }
    });
  }

  function showModalByTime(selector, time) {
    setTimeout(function () {
      let display;
      document.querySelectorAll('[data-modal]').forEach(item => {
        if (getComputedStyle(item).display !== 'none') {
          display = 'block';
        }
      });

      if (!display) {
        document.querySelector(selector).style.display = 'block';
        document.body.style.overflow = 'hidden'; // Замыкание

        let scroll = (0,_calcScroll__WEBPACK_IMPORTED_MODULE_0__["default"])();
        document.body.style.marginRight = `${scroll}px`;
      }
    }, time);
  }

  function openByScroll(selector) {
    window.addEventListener('scroll', () => {
      let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

      if (!btnPressed && window.pageYOffset + document.documentElement.clientHeight >= scrollHeight) {
        document.querySelector(selector).click();
      }
    });
  }

  bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
  bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
  bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
  openByScroll('.fixed-gift'); // showModalByTime('.popup-consultation', 60000);
};

/* harmony default export */ __webpack_exports__["default"] = (modals);

/***/ }),

/***/ "./src/js/modules/pictureSize.js":
/*!***************************************!*\
  !*** ./src/js/modules/pictureSize.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const pictureSize = imgSelector => {
  const blocks = document.querySelectorAll(imgSelector); // блок котороый передетася внутрь функции

  function showImg(block) {
    const img = block.querySelector('img'); // something.png => something-1.png

    img.src = img.src.slice(0, -4) + '-1.png'; // not(позволяет выбрать все параграфы кроме этого класса)

    block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
      p.style.display = 'none';
    });
  }

  function hideImg(block) {
    const img = block.querySelector('img'); // something-1.png => something.png

    img.src = img.src.slice(0, -6) + '.png'; // not(позволяет выбрать все параграфы кроме этого класса)

    block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
      p.style.display = 'block';
    });
  }

  blocks.forEach(block => {
    block.addEventListener('mouseover', () => {
      showImg(block);
    });
    block.addEventListener('mouseout', () => {
      hideImg(block);
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (pictureSize);

/***/ }),

/***/ "./src/js/modules/scrolling.js":
/*!*************************************!*\
  !*** ./src/js/modules/scrolling.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const scrolling = upSelector => {
  const upElem = document.querySelector(upSelector); // функционал по кнопке up

  window.addEventListener('scroll', () => {
    // scrollTop - отвечает за расстояние которое мы уже пролистали и мы его не видим
    if (document.documentElement.scrollTop > 1650) {
      upElem.classList.add('animated', 'fadeIn');
      upElem.classList.remove('fadeOut');
    } else {
      upElem.classList.add('fadeOut');
      upElem.classList.remove('fadeIn');
    }
  }); // Scrolling with requestAnimationFrame
  // window.requestAnimationFrame указывает браузеру на то, что вы хотите произвести анимацию,
  //и просит его запланировать перерисовку на следующем кадре анимации.
  // [href^="#"] я ишу все ссылки котороые начинаются с шарпа #

  let links = document.querySelectorAll('[href^="#"]'),
      speed = 0.1; // скорость скролла

  links.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault(); // widthTop это и есть scrollTop ))

      let widthTop = document.documentElement.scrollTop,
          hash = this.hash,
          toBlock = document.querySelector(this.hash).getBoundingClientRect().top,
          start = null; // getBoundingClientRect это метод которыой позволет получить доступ
      //  к свойствам например к свойству top

      requestAnimationFrame(step); // time автоматический аргумент, который самостоятельно приходит в функцию

      function step(time) {
        if (start === null) {
          start = time;
        } // первый ли раз у меня запускается анимаия 


        let progress = time - start,
            // r - Отвечает за количество пикселей на которое нам необходимо пролистать в течение этой операции
        r = toBlock < 0 ? Math.max(widthTop - progress / speed, widthTop + toBlock) : Math.min(widthTop + progress / speed, widthTop + toBlock); // анимация может двигатся вверх так : и в  низ

        document.documentElement.scrollTo(0, r); // скролим по определенным координатам (X, Y)
        // когда наша анимация должна остановится

        if (r != widthTop + toBlock) {
          requestAnimationFrame(step);
        } else {
          location.hash = hash;
        } // теперь функция step будет сама себя запускать пока не выполнится 
        // это условие и пока собственно не остановится анимация

      }
    });
  }); // //  Pure js scrolling
  // // Реализация плавного скролла
  // const element = document.documentElement,
  //       body = document.body;
  // // функция подсчета сколько нужно пролистать и как это сделать
  // const calcScroll = () => {
  //     // этот элемент ссылка 
  //     upElem.addEventListener('click', function(event) {
  //         // что (из этого будет существовать то и поподет в scrollTop)
  //         // scrollTop - мы узнали какое расстояние было пролистано вниз пользователем 
  //         let scrollTop = Math.round(body.scrollTop || element.scrollTop);
  //         if (this.hash !== '') {
  //             event.preventDefault();
  //             // substring мы от hash получим без решокти #up > up
  //             // let hashElement = document.getElementById(this.hash.substring(1));
  //             let hashElement = document.querySelector(this.hash),
  //             // this.hash для того чтобы узнать к кому элементу мы все это листаем
  //             // обозначет сколько мне езе нужно будет пролистать пикселей до родителя этого Hash элемента
  //                 hashElementTop = 0;
  //             // offsetParent - это свой-во обозначает тот элемент относительно
  //             //которого будет позироватся hashElement то есть родитель его
  //             while (hashElement.offsetParent) {
  //                 // offsetTop - позволяет нам определить а сколько пикселей осталось
  //                 //до верхней границы родительского элемента от hashElement
  //                 hashElementTop += hashElement.offsetTop;
  //                 hashElement = hashElement.offsetParent;
  //                 // цикл позволит перебрать всех родителей элемента и узнать сколько пикселей нам нужно отлистать 
  //             }
  //             hashElementTop = Math.round(hashElementTop);
  //             // hashElementTop - сколько пикселей у нас он стоит от родительского элемента 
  //             smoothScroll(scrollTop, hashElementTop, this.hash);
  //         }
  //     });
  // };
  // // (от куда идет, куда, сам hash)
  // const smoothScroll = (from, to, hash) => {
  //     let timeInterval = 1,
  //         prevScrollTop,
  //         speed;
  //     if (to > from) {
  //         speed = 30;
  //     } else {
  //         speed = -30;
  //     }
  //     let move = setInterval(function() {
  //         let scrollTop = Math.round(body.scrollTop || element.scrollTop);
  //         if (
  //             prevScrollTop === scrollTop ||
  //             (to > from && scrollTop >= to) ||
  //             (to < from && scrollTop <= to)
  //         ) {
  //             clearInterval(move);
  //             // все знаки шарпа # в конце строки нашего href 
  //             history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
  //         } else {
  //             body.scrollTop += speed;
  //             element.scrollTop += speed;
  //             prevScrollTop = scrollTop;
  //         }
  //     }, timeInterval);
  // };
  // calcScroll();
};

/* harmony default export */ __webpack_exports__["default"] = (scrolling);

/***/ }),

/***/ "./src/js/modules/showMoreStyles.js":
/*!******************************************!*\
  !*** ./src/js/modules/showMoreStyles.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_requests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/requests */ "./src/js/services/requests.js");


const showMoreStyles = (trigger, wrapper) => {
  // 2)способ
  const btn = document.querySelector(trigger);
  btn.addEventListener('click', function () {
    (0,_services_requests__WEBPACK_IMPORTED_MODULE_0__.getResource)('assets/db.json') // нужно обратится к styles потому что в Json файле есть styles[...]
    .then(res => createCards(res.styles)).catch(error => console.error(error));
    this.remove(); // чтобы испольщовать this нужна классчиеская функция (стрелочная не имеет)
  }); // сервер возвращает нам массив и этот массив мы передаем в функцию createCards
  // Удалим в html эти файлы

  function createCards(resposne) {
    // импрптируем диструктивыне данные чтобы не писать item
    resposne.forEach(_ref => {
      let {
        src,
        title,
        link
      } = _ref;
      let card = document.createElement('div');
      card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
      card.innerHTML = `
                <div class=styles-block>
                    <img src=${src} alt>
                    <h4>${title}</h4>
                    <a href=${link}>Подробнее</a>
                </div>
            `;
      document.querySelector(wrapper).appendChild(card);
    });
  }
};

/* harmony default export */ __webpack_exports__["default"] = (showMoreStyles); // 3 способ просто подставляем 
// class CreateCards {
//     constructor(src, title, link, parentSelector, ...classes){
//         this.src = src;
//         this.title = title;
//         this.link = link;
//         this.classes = classes;
//         this.parent = document.querySelector(parentSelector);
//     }
//     render() {
//         const card = document.createElement('div');
//         if(this.classes.length === 0){
//             card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
//         } else {
//             this.classes.forEach(className => card.classList.add(className));
//         }
//         card.innerHTML = `
//             <div class=styles-block>
//                 <img src=${this.src} alt>
//                 <h4>${this.title}</h4>
//                 <a href=${this.link}>Подробнее</a>
//             </div>
//         `;
//         this.parent.appendChild(card);
//     }
// }
// const btn = document.querySelector('.button-styles');
// btn.addEventListener('click', function() {
//     getResource('http://localhost:3000/styles')
//         .then(data => {
//             data.forEach(({src, title, link}) => {
//                 new CreateCards(src, title, link, '#styles .row').render();
//             });
//         });
//     this.remove();
// });
// 1) простой первый способ
// const cards = document.querySelectorAll(styles),
//       btn = document.querySelector(trigger);
// cards.forEach(card => {
//     card.classList.add('animated', 'fadeInUp');
// });
// btn.addEventListener('click', () => {
//     cards.forEach(card => {
//         card.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
//         card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10','col-xs-offset-1');
//     });
//     // btn.styles.display = 'none';
//     btn.remove();
// });

/***/ }),

/***/ "./src/js/modules/sliders.js":
/*!***********************************!*\
  !*** ./src/js/modules/sliders.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const sliders = (slides, dir, prev, next) => {
  let slideIndex = 1,
      paused = false; // остановка в текущий момент 

  const items = document.querySelectorAll(slides);

  function showSlides(n) {
    // показывает слайд который под опред номером
    if (n > items.length) {
      slideIndex = 1;
    } // если меньше то устанавливаем последний слайд


    if (n < 1) {
      slideIndex = items.length;
    } // скрываем все слайды


    items.forEach(item => {
      // анимации
      item.classList.add("animated");
      item.style.display = 'none';
    }); // показывам слайд с нужным номером

    items[slideIndex - 1].style.display = 'block';
  }

  showSlides(slideIndex); // обёртка на один слайд больше
  // тут увеличивается счетчик

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  try {
    const prevBtn = document.querySelector(prev),
          nextBtn = document.querySelector(next);
    prevBtn.addEventListener('click', () => {
      plusSlides(-1);
      items[slideIndex - 1].classList.remove('slideInLeft');
      items[slideIndex - 1].classList.add('slideInRight');
    });
    nextBtn.addEventListener('click', () => {
      plusSlides(1);
      items[slideIndex - 1].classList.remove('slideInRight');
      items[slideIndex - 1].classList.add('slideInLeft');
    });
  } catch (e) {}

  function activateAnimation() {
    if (dir === 'vertical') {
      // пауза принимет сетинтервалы
      paused = setInterval(function () {
        plusSlides(1);
        items[slideIndex - 1].classList.add('slideInDown');
      }, 4000);
    } else {
      paused = setInterval(function () {
        plusSlides(1);
        items[slideIndex - 1].classList.remove('slideInRight');
        items[slideIndex - 1].classList.add('slideInLeft');
      }, 4000);
    }
  } // не забываем вызвать 


  activateAnimation(); // находим родителия например первого слайдера по факту это весь слайдеры (Все)

  items[0].parentNode.addEventListener('mouseenter', () => {
    clearInterval(paused);
  });
  items[0].parentNode.addEventListener('mouseleave', () => {
    // когда эта функция будет вызываться переменная paused снова
    // заполнится уникал индетифкатором setInterval котороый у нас будет
    activateAnimation();
  });
};

/* harmony default export */ __webpack_exports__["default"] = (sliders);

/***/ }),

/***/ "./src/js/services/requests.js":
/*!*************************************!*\
  !*** ./src/js/services/requests.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": function() { return /* binding */ getResource; },
/* harmony export */   "postData": function() { return /* binding */ postData; }
/* harmony export */ });
const postData = async (url, data) => {
  let res = await fetch(url, {
    method: 'POST',
    body: data
  });
  return await res.text();
};

const getResource = async url => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could nor fetch ${url}, status: ${res.status}`);
  }

  return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_modals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/modals */ "./src/js/modules/modals.js");
/* harmony import */ var _modules_sliders__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/sliders */ "./src/js/modules/sliders.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_mask__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/mask */ "./src/js/modules/mask.js");
/* harmony import */ var _modules_checkTextInputs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/checkTextInputs */ "./src/js/modules/checkTextInputs.js");
/* harmony import */ var _modules_showMoreStyles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/showMoreStyles */ "./src/js/modules/showMoreStyles.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");
/* harmony import */ var _modules_filter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/filter */ "./src/js/modules/filter.js");
/* harmony import */ var _modules_pictureSize__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/pictureSize */ "./src/js/modules/pictureSize.js");
/* harmony import */ var _modules_accordion__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/accordion */ "./src/js/modules/accordion.js");
/* harmony import */ var _modules_burger__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modules/burger */ "./src/js/modules/burger.js");
/* harmony import */ var _modules_scrolling__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./modules/scrolling */ "./src/js/modules/scrolling.js");
/* harmony import */ var _modules_drop__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modules/drop */ "./src/js/modules/drop.js");













window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  let calcData = {};
  (0,_modules_modals__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_sliders__WEBPACK_IMPORTED_MODULE_1__["default"])('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');
  (0,_modules_sliders__WEBPACK_IMPORTED_MODULE_1__["default"])('.main-slider-item', 'vertical');
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_mask__WEBPACK_IMPORTED_MODULE_3__["default"])('[name="phone"]');
  (0,_modules_checkTextInputs__WEBPACK_IMPORTED_MODULE_4__["default"])('[name="name"]');
  (0,_modules_checkTextInputs__WEBPACK_IMPORTED_MODULE_4__["default"])('[name="message"]'); // showMoreStyles('.button-styles', '.styles-2'); // с помощю стилей

  (0,_modules_showMoreStyles__WEBPACK_IMPORTED_MODULE_5__["default"])('.button-styles', '#styles .row');
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])('#size', '#material', '#options', '.promocode', '.calc-price');
  (0,_modules_filter__WEBPACK_IMPORTED_MODULE_7__["default"])();
  (0,_modules_pictureSize__WEBPACK_IMPORTED_MODULE_8__["default"])('.sizes-block'); // accordion('.accordion-heading', '.accordion-block'); через CSS

  (0,_modules_accordion__WEBPACK_IMPORTED_MODULE_9__["default"])('.accordion-heading');
  (0,_modules_burger__WEBPACK_IMPORTED_MODULE_10__["default"])('.burger-menu', '.burger');
  (0,_modules_scrolling__WEBPACK_IMPORTED_MODULE_11__["default"])('.pageup');
  (0,_modules_drop__WEBPACK_IMPORTED_MODULE_12__["default"])();
});
}();
/******/ })()
;
//# sourceMappingURL=script.js.map