/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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







window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  let calcData = {};
  console.log(calcData);
  (0,_modules_modals__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_sliders__WEBPACK_IMPORTED_MODULE_1__["default"])('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');
  (0,_modules_sliders__WEBPACK_IMPORTED_MODULE_1__["default"])('.main-slider-item', 'vertical');
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_mask__WEBPACK_IMPORTED_MODULE_3__["default"])('[name="phone"]');
  (0,_modules_checkTextInputs__WEBPACK_IMPORTED_MODULE_4__["default"])('[name="name"]');
  (0,_modules_checkTextInputs__WEBPACK_IMPORTED_MODULE_4__["default"])('[name="message"]'); // showMoreStyles('.button-styles', '.styles-2'); // с помощю стилей

  (0,_modules_showMoreStyles__WEBPACK_IMPORTED_MODULE_5__["default"])('.button-styles', '#styles .row');
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])('#size', '#material', '#options', '.promocode', '.calc-price');
});
}();
/******/ })()
;
//# sourceMappingURL=script.js.map