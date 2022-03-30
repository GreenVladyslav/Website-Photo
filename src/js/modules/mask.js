const mask = (selector) => {

    let setCursorPosition = (pos, elem) => {
        elem.focus();
        // Вручную можем устанавливать выделение которое у нас произошло в инпуте
        // если у нас эти два значения будут одинаковые то мы выделим не какой-то участок
        // а мы просто поставим курсор в определенную позицию

        // полифил для старых браузеров 
        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
            let range = elem.createTextRange();


            // Сворачивает текущую выделенную область в одну точку (первую с последним)
            range.collapse(true);
            // POS - это количество симвоволов в this.value.length
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            // уставноим курсор и выделим то значение котрое сформируется с верхних параметров
            range.select();
        }
    };

    function createMask(event){
        // матрицу можно так же располложить в каком-то json файле и подтягивать в зависимости от той страны где
        // пользователь возмжно она буддет подтягиватся из базы данных
        let matrix = '+3 (___) ___ __ __',
            i = 0,
            // статичное работает на основе матрицы 
            // \ из матрицы мы получим только те значение котороые не соответсвуют числовым значения
            def = matrix.replace(/\D/g, ''),
            // динамчиное работает на том что ввел пользовалтель 
            val = this.value.replace(/\D/g, '');

        // когда пользователь что-то вводит в матрицу если он начинает вдруг удалять
        // 7 или + то мы ему это не дадим
        if (def.length >= val.length) {
            val = def;
        }

        // вместо переменной (a) будет подставлятся каждый символ котороый будет находится в матрицы
        this.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });
        // перебераем все символы которыо есть в матрицы и возвращаем в зависимости от отпределенных условий
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

    let inputs = document.querySelectorAll(selector);

    //  когда мы сформируем все элементы я повешу на каждое событие обработчкик
    // (формируется новый value, отчищаться value, устанавилватся cursor)
    inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
    });
};

export default mask;