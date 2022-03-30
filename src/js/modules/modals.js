import calcScroll from "./calcScroll";

const modals = () => {
    let btnPressed = false;

    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),
              scroll = calcScroll();
        
        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if(e.target) {
                    e.preventDefault();

                    btnPressed = true;

                    if (destroy){
                        item.remove();
                    }

                    windows.forEach(item => {
                       item.style.display = 'none';
                    //    анимация через библиотеку animate.css
                       item.classList.add('animated', 'fadeIn');

                    });

                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                    // document.body.classList.add('modal-open'); bootstrap
                    document.body.style.marginRight = `${scroll}px`;
                }
            }); 
            
            // if (item.classList.contains('popup_calc_button') || item.classList.contains('popup_calc_profile_button')) {
            //     item.disabled = true;
            // }
        });


        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = 'none';
            document.body.style.overflow = '';
            // document.body.classList.remove('modal-open');
            document.body.style.marginRight = `0px`;
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = 'none';
                document.body.style.overflow = '';
                // document.body.classList.remove('modal-open');
                document.body.style.marginRight = `0px`;
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(function() {
            let display;

            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = 'block';
                }
            });

            if (!display) {
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = 'hidden';
                // Замыкание
                let scroll = calcScroll();
                document.body.style.marginRight = `${scroll}px`;
            }
        }, time);
    }

    function openByScroll(selector){
        window.addEventListener('scroll', () => {
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

            if (!btnPressed && 
                (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)){
                document.querySelector(selector).click();
            }
        });
    }
    

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation','.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    openByScroll('.fixed-gift');
    // showModalByTime('.popup-consultation', 60000);

}; 


export default modals;