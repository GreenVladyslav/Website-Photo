const pictureSize = (imgSelector) => {
    const blocks = document.querySelectorAll(imgSelector);
        
    // блок котороый передетася внутрь функции
    function showImg (block) {
        const img = block.querySelector('img');
        // something.png => something-1.png
        img.src = img.src.slice(0, -4) + '-1.png';
        // not(позволяет выбрать все параграфы кроме этого класса)
        block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
            p.style.display = 'none';
        });
    }

    function hideImg (block) {
        const img = block.querySelector('img');
        // something-1.png => something.png
        img.src = img.src.slice(0, -6) + '.png';
        // not(позволяет выбрать все параграфы кроме этого класса)
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

export default pictureSize;