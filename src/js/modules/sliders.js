const sliders = (slides, dir, prev, next) => {
    let slideIndex = 1,
        paused = false;
        // остановка в текущий момент 

    const items = document.querySelectorAll(slides);
    
    function showSlides(n) {
        // показывает слайд который под опред номером
        if (n >  items.length) {
            slideIndex = 1;
        }
        // если меньше то устанавливаем последний слайд
        if (n < 1) {
            slideIndex = items.length;
        }
        // скрываем все слайды
        items.forEach(item => {
            // анимации
            item.classList.add("animated");
            item.style.display = 'none';
        });
        // показывам слайд с нужным номером
        items[slideIndex - 1].style.display = 'block';
    }
    
    showSlides(slideIndex);
// обёртка на один слайд больше
// тут увеличивается счетчик
    function plusSlides(n){
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
    } catch(e){}    


    function activateAnimation(){
        if (dir === 'vertical') {
            // пауза принимет сетинтервалы
            paused = setInterval(function() {
                plusSlides(1);
                items[slideIndex - 1].classList.add('slideInDown');
            }, 4000);
        } else {
            paused = setInterval(function() {
                plusSlides(1);
                items[slideIndex - 1].classList.remove('slideInRight');
                items[slideIndex - 1].classList.add('slideInLeft');
            }, 4000);
    
        }
    }
    // не забываем вызвать 
    activateAnimation();

    // находим родителия например первого слайдера по факту это весь слайдеры (Все)
    items[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(paused);
    });
    items[0].parentNode.addEventListener('mouseleave', () => {
        // когда эта функция будет вызываться переменная paused снова
        // заполнится уникал индетифкатором setInterval котороый у нас будет
        activateAnimation();
    });

};

export default sliders;