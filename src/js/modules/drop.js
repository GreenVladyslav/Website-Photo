import { postData } from "../services/requests";

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
    const fileInputs = document.querySelectorAll('[name="upload"]');
    
    // массив событий (сам написал)
    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
        // stopPropagation() - который останавливает всплытие (bubbling) события “клик” к родительским элементам.
    }

    // индикатор который даст понять пользователю что он перетаскивает над нужной областью
    // передаем элемент которыой нам нужно подстветить 
    function hightlight(item) {
        item.closest('.file_upload').style.border = "5px solid yellow";
        item.closest('.file_upload').style.backgroundColor = "rgba(0,0,0, .7)";
        // у этого элемента находим ближайший класс
    }

    function unhightlight(item) {
        item.closest('.file_upload').style.border = "none";
        if (item.closest('.calc_form')) {
            item.closest('.file_upload').style.backgroundColor = "#fff"; 
        } else if
            (item.closest('.col-md-3')) {
            item.closest('.file_upload').style.backgroundColor = "#f7e7e6";  
        } else {
            item.closest('.file_upload').style.backgroundColor = "#ededed";
        } 
        // цвет модальноого окна вернуть popup_content
        // item.closest('.file_upload').style.backgroundColor = "inherit"; наследовать
        // item.closest('.file_upload').style.backgroundColor = "initial"; начальный

    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => hightlight(input), false);
        });
    });
    // Мы берем два события. Перебераем все файловые инпуты с которыми будем рабоать.
    // И на каждый инпут навешиваем это событие. И ставим вот такой вот обработчки.

    // И обратная ситуация Когда мы опутсили файл или ушли мышкой то у нас выполнится
    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhightlight(input), false);
        });
    });

    
    // будем обрабатывать то когда пользователь скинет картинку вниз
    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            // В files лежат файлы которые пользователь загрузил и их можно модифицировать
            input.files = e.dataTransfer.files;
            // то есть берем те файлы которые мы drag and drop -пим сейчас и просто засовываем
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
                
                    postData('assets/server.php', formData)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(()  => {
                        console.log('Error');
                    });
                });
            }
        });
    });
};

export default drop;

// 1. Во первых элементов может быть несколько мы можем выделять несколько картинках и претаскивать их в input Для этого в определнный input нам необходимо установить атрибут multiple для того чтобы он поддерживал несколько файлов ну и конечно это могу тбыть не только изображения но т любые файлы
// 2. Для того чтобы мы могли кидать только картинки нужно для input установить multiple accept="image/*" * - значит что мы можем заргужать любые типы картинок jpg и так далее 
// {/* <div class=file_upload>
// <button type=button>Загрузить фотографию</button>
// <div>Файл не выбран</div>
// <input type=file name=upload multiple accept="image/*">
// </div> */}

// 3. В старых браузерах такая реализация с drag and drop элементом работать не будет именно поэтмоу всего нужно оставлять в ручную ввод файлов то есть по старинке с какой папки загрузить файл
// 4. Мы можем отправить файл на сервер только тогда когда мы дропнули этот элемент 
// иногда это нужно например перетащили аву профиля и даже не нажали сабмит она установилась в профель в зависимости от веб ресура это очень полезная фича и сделать это не сложно