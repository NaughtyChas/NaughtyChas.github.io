// author by removef
// https://removeif.github.io/

function isNightFun() {
    let isNightTemp = localStorage.getExpire('night');

    // 第一次进来判断是白天还是晚上
    if (isNightTemp === null || isNightTemp === undefined) {
        if (isNightRange('00:58', '00:59') || isNightRange('01:00', '01:01')) {
            isNightTemp = 'true';
        } else {
            isNightTemp = 'false';
        }
        localStorage.setExpire('night', isNightTemp, expireTime1H);
    }
    return isNightTemp;
}

let isNight = isNightFun();
// 参考自 https://www.imaegoo.com/
let nightNav,
    nightIcon,
    divAplayer;

function applyNight(value) {
    divAplayer = document.querySelectorAll('.aplayer');
    if (value === 'true') {
        document.body.className += ' night';
        for (const elem of divAplayer) {
            elem.classList.remove('aplayer-theme-light');
            elem.classList.add('aplayer-theme-dark');
        }
        if (nightIcon) {
            nightIcon.className = nightIcon.className.replace(/ fa-moon/g, '') + ' fa-lightbulb';
        }
    } else {
        document.body.className = document.body.className.replace(/ night/g, '');
        for (const elem of divAplayer) {
            elem.classList.remove('aplayer-theme-dark');
            elem.classList.add('aplayer-theme-light');
        }
        if (nightIcon) {
            nightIcon.className = nightIcon.className.replace(/ fa-lightbulb/g, '') + ' fa-moon';
        }
    }
}

function findNightIcon() {
    nightNav = document.getElementById('night-nav');
    nightIcon = document.getElementById('night-icon');
    if (!nightNav || !nightIcon) {
        setTimeout(findNightIcon, 100);
    } else {
        nightNav.addEventListener('click', switchNight);
        if (isNight) {
            nightIcon.className = nightIcon.className.replace(/ fa-moon/g, '') + ' fa-lightbulb';
        } else {
            nightIcon.className = nightIcon.className.replace(/ fa-lightbulb/g, '') + ' fa-moon';
        }
    }
}

function switchNight() {

    if (isNight === 'false') {
        isNight = 'true';
    } else {
        isNight = 'false';
    }

    applyNight(isNight);
    localStorage.setExpire('night', isNight, expireTime1H);
    if (typeof loadUtterances === 'function') {
        loadUtterances();
    }
}

findNightIcon();
applyNight(isNight); // first process with loaded contents

// then force to process with the rest contents (like APlayer elements)
window.addEventListener('load', event => {
    applyNight(isNight);
});
