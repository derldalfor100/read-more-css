console.log('gsap:', gsap);

function getElemOuterHeight(node) {

    const propsList = [
        // 'margin-top',
        // 'margin-bottom',
        'border-top',
        'border-bottom',
        'padding-top',
        'padding-bottom',
        'height'
    ]

    const style = window.getComputedStyle(node);

    return propsList
        .map(k => parseInt(style.getPropertyValue(k), 10))
        .reduce((prev, cur) => prev + cur);
}

function getElemHeight(node) {

    const style = window.getComputedStyle(node);

    const height = parseInt(style.getPropertyValue('height'), 10);

    return height;
}

document.addEventListener('DOMContentLoaded', ev => {

    const buttons = document.querySelectorAll('.sidebar-box .button');

    const buttonsArr = [...buttons];

    for(let buttonElem of buttonsArr) {

        buttonElem.addEventListener('click', (event) => {

            let totalHeight = 0;

            const targetElem = event.target;

            const elemParent = targetElem.parentNode;

            console.warn('elemParent:', elemParent);

            const elemGrandParent = elemParent.parentNode;

            console.warn('elemGrandParent:', elemGrandParent);

            const grandPaRegularPDescendants = elemGrandParent.querySelectorAll("p:not(.read-more)");

            const descendantsArr = [...grandPaRegularPDescendants];

            console.warn('descendantsArr:', descendantsArr);

            descendantsArr.forEach(p => {

                console.warn('p:', p);

                totalHeight += getElemOuterHeight(p); 
            });

            console.warn('totalHeight:', totalHeight);

            let grandPaHeight = elemGrandParent['initialHeight'];

            if(!grandPaHeight) {
                
                grandPaHeight = getElemHeight(elemGrandParent);

                elemGrandParent['initialHeight'] = grandPaHeight;
            }

            console.warn('initialHeight:', grandPaHeight);

            gsap.set(elemGrandParent, { height: grandPaHeight, 'max-height': 9999 });

            gsap.to(elemGrandParent, { height: totalHeight }); 

            gsap.to(elemParent, { opacity: 0 });

            targetElem.classList.toggle('open');
        });
    }
});