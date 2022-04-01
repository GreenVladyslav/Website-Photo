const scrolling = (upSelector) => {
    const upElem = document.querySelector(upSelector);
    // функционал по кнопке up
    window.addEventListener('scroll', () => {
        // scrollTop - отвечает за расстояние которое мы уже пролистали и мы его не видим
        if (document.documentElement.scrollTop > 1650) {
            upElem.classList.add('animated', 'fadeIn');
            upElem.classList.remove('fadeOut');
        } else {
            upElem.classList.add('fadeOut');
            upElem.classList.remove('fadeIn');
        }
    });

    // // Scrolling with requestAnimationFrame
    // // window.requestAnimationFrame указывает браузеру на то, что вы хотите произвести анимацию,
    // //и просит его запланировать перерисовку на следующем кадре анимации.

    // // [href^="#"] я ишу все ссылки котороые начинаются с шарпа #
    // let links = document.querySelectorAll('[href^="#"]'),
    //     speed = 0.3;

    //     links.forEach(link => {
    //         link.addEventListener('click', function(event) {
    //             event.preventDefault();

    //             let widthTop = document.documentElement.scrollTop,
    //                 hash = this.hash,
    //                 toBlock = document.querySelector(this.hash).getBoundingClientRect().top,
    //                 start = null;
    //                 // getBoundingClientRect это метод которыой позволет получить доступ
    //                 //  к свойствам например к свойству top

    //             requestAnimationFrame(step);

    //             function step(time) {
    //                 if (start === null) {
    //                     start = time;
    //                 }
    //                 // первый ли раз у меня запускается анимаия 
    //                 let progress = time - start,
    //                 // r - Отвечает за количество пикселей на которое нам необходимо пролистать в течение этой операции
    //                     r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock)
    //                     : Math.min(widthTop + progress/speed, widthTop + toBlock));

    //                     document.documentElement.scrollTo(0, r);

    //                     // когда наша анимация должна остановится
    //                     if (r != widthTop + toBlock) {
    //                         requestAnimationFrame(step);
    //                     } else {
    //                         location.hash = hash; 
    //                     }
    //                     // теперь функция step будет сама себя запускать пока не выполнится 
    //                     // это условие и пока собственно не остановится анимация
    //             }
    //         });
    //     });







    //  Pure js scrolling
    // Реализация плавного скролла
    const element = document.documentElement,
          body = document.body;
    // функция подсчета сколько нужно пролистать и как это сделать
    const calcScroll = () => {
        // этот элемент ссылка 
        upElem.addEventListener('click', function(event) {
            // что (из этого будет существовать то и поподет в scrollTop)
            // scrollTop - мы узнали какое расстояние было пролистано вниз пользователем 
            let scrollTop = Math.round(body.scrollTop || element.scrollTop);

            if (this.hash !== '') {
                event.preventDefault();
                // substring мы от hash получим без решокти #up > up
                // let hashElement = document.getElementById(this.hash.substring(1));
                let hashElement = document.querySelector(this.hash),
                // this.hash для того чтобы узнать к кому элементу мы все это листаем
                // обозначет сколько мне езе нужно будет пролистать пикселей до родителя этого Hash элемента
                    hashElementTop = 0;
                // offsetParent - это свой-во обозначает тот элемент относительно
                //которого будет позироватся hashElement то есть родитель его
                while (hashElement.offsetParent) {
                    // offsetTop - позволяет нам определить а сколько пикселей осталось
                    //до верхней границы родительского элемента от hashElement
                    hashElementTop += hashElement.offsetTop;
                    hashElement = hashElement.offsetParent;
                    // цикл позволит перебрать всех родителей элемента и узнать сколько пикселей нам нужно отлистать 
                }
                
                hashElementTop = Math.round(hashElementTop);
                // hashElementTop - сколько пикселей у нас он стоит от родительского элемента 
                smoothScroll(scrollTop, hashElementTop, this.hash);
            }
        });
    };

    // (от куда идет, куда, сам hash)
    const smoothScroll = (from, to, hash) => {
        let timeInterval = 1,
            prevScrollTop,
            speed;

        if (to > from) {
            speed = 30;
        } else {
            speed = -30;
        }

        let move = setInterval(function() {
            let scrollTop = Math.round(body.scrollTop || element.scrollTop);

            if (
                prevScrollTop === scrollTop ||
                (to > from && scrollTop >= to) ||
                (to < from && scrollTop <= to)
            ) {
                clearInterval(move);
                history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
            } else {
                body.scrollTop += speed;
                element.scrollTop += speed;
                prevScrollTop = scrollTop;
            }
        }, timeInterval);
    };

    calcScroll();
};

export default scrolling;