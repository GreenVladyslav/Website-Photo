import { getResource } from "../services/requests";

const showMoreStyles = (trigger, wrapper) => {
    // 2)способ

    const btn = document.querySelector(trigger);

    btn.addEventListener('click', function() {
        getResource('assets/db.json')
        // нужно обратится к styles потому что в Json файле есть styles[...]
            .then(res => createCards(res.styles))
            .catch(error => console.error(error));

        this.remove();
        // чтобы испольщовать this нужна классчиеская функция (стрелочная не имеет)
    });
// сервер возвращает нам массив и этот массив мы передаем в функцию createCards
// Удалим в html эти файлы

    function createCards(resposne){
        // импрптируем диструктивыне данные чтобы не писать item
        resposne.forEach(({src, title, link}) => {
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

export default showMoreStyles;  



















// 3 способ просто подставляем 

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
