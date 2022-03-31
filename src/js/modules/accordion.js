const accordion = (triggersSelector) => {
    const btns = document.querySelectorAll(triggersSelector);

    btns.forEach(btn => {
        btn.addEventListener('click', function() {
            // подсвечивается розовым вообщем стили

            if (!this.classList.contains('active-style')){
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

export default accordion;












// const accordion = (triggersSelector, itemsSelector) => {
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