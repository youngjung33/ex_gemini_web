const sections = document.querySelectorAll('.section');

/* window.addEventListener('scroll', () => {
    const scrolY = window.scrollY;
    console.log(scrolY);

    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    // if(scrolY >=)
}) */


var opacity1 = 1.00; // background1의 초기 opacity 값
var opacity2 = 0; // background2의 초기 opacity 값

// window.addEventListener('wheel', function(e) {
//     var bg1 = document.getElementById('background1');
//     var bg2 = document.getElementById('background2');
//     console.log(bg1);
//     // 마우스휠 스크롤 방향에 따라 opacity 값을 증가 또는 감소
//     if (e.deltaY > 0) { // 아래로 스크롤 시
//         opacity1 = Math.max(opacity1 - 0.31, 0);
//         opacity2 = Math.min(opacity2 + 0.31, 1);
//     } else { // 위로 스크롤 시
//         opacity1 = Math.min(opacity1 + 0.31, 1);
//         opacity2 = Math.max(opacity2 - 0.31, 0);
//     }

//      // 각 배경이미지의 투명도 변경하여 페이드 인/아웃 효과 적용
//      bg1.style.opacity = opacity1;
//      bg2.style.opacity = opacity2;
// });

document.addEventListener("DOMContentLoaded", () => {
    const background1 = document.getElementById('background1');
    const background2 = document.getElementById('background2');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        // 첫 번째 배경의 투명도 설정
        const opacity1 = Math.max(0, Math.min(1, scrollY / windowHeight));
        background1.style.opacity = opacity1.toFixed(2);

        // 두 번째 배경의 투명도 설정
        const opacity2 = Math.max(0, Math.min(1, (scrollY - windowHeight) / windowHeight));
        background2.style.opacity = opacity2.toFixed(2);
    });
});






/****************************************************/

const animation = {
    topContentsMain: {
        opacity_in: [1, 0, { start: 0, end: 0.2}],
        opacity_out: [1,0, { start: 0, end: 0}],

    },
    topContentsVideoImg : {
        transform_in : [1, 2, {start: 0, end: 1}],
        transform_out : [2, 1, {start: 1, end: 0}],
    },
    topContentsBack : {
        opacity_in: [0, 0.4, { start: 0, end: 0.15}],
        opacity_out: [0, 0.4, { start: 0, end: 0 }],
        
    },
    topContents : {
        opacity_in: [0.5, 1, { start: 0.9, end: 1 }],
        opacity_out: [1, 0.5, { start: 1, end: 0.9 }],
    },

    //서브 contents
    desc1 : {
        opacity_in: [0, 1, { start: 0.25, end: 0.4 }],
        opacity_out: [0, 1, { start: 0.4, end: 0.25 }],
        transform_in : [40, 0, { start: 0.25, end: 0.35}],
        transform_out : [0, 0, { start: 0.35, end: 0.25 }],
    },

    desc2 : {
        opacity_in: [0, 1, { start: 0.45, end: 0.55 }],
        opacity_out: [0, 1, { start: 0.55, end: 0.45 }],
        transform_in : [40, 0, { start: 0.45, end: 0.55}],
        transform_out : [0, 0, { start: 0.55, end: 0.45 }],
    },

    desc3 : {
        opacity_in: [0, 1, { start: 0.65, end: 0.75 }],
        opacity_out: [0, 1, { start: 0.75, end: 0.65 }],
        transform_in : [40, 0, { start: 0.65, end: 0.75}],
        transform_out : [0, 0, { start: 0.75, end: 0.65 }],
    },


}


document.addEventListener("DOMContentLoaded", () => {

    let scrollY = 0; //Y축 값

    let header = document.getElementById('header')

    let mainVisual = document.getElementById('main_visual')
    let headerTitle = document.getElementById('header_title')
    let headerBtn = document.getElementById('header_btn')
    let headerInner = document.getElementById('header_inner')
    let headerMenu = document.getElementById('header_menu')
    let topContentsBack = document.getElementById('top_contents_back')

    //메인 글씨
    let topContentsMain = document.getElementById('top_contents_main')

    let topContentsVideoImg = document.getElementById('top_contents_video_img')

    let topContentsInner = document.getElementById('top_contents_inner')
    let topContents = document.getElementById('top_contents')


    //서브 글씨
    let desc1 = document.getElementById('desc1')
    let desc2 = document.getElementById('desc2')
    let desc3 = document.getElementById('desc3')


    // 브라우저의 높이 넓이
    let height = window.innerHeight
    let width = window.innerWidth
    //1번 섹션
    let scrollHeight = height * 4.5

    //스크롤 크기
    const setLayout = () => {   
        mainVisual.style.height = `${scrollHeight}px`
    }
    
    const calcValues = (values) => {

        let rv;
        
        const partScrollStart = values[2].start * scrollHeight
        const partScrollEnd = values[2].end * scrollHeight
        const partScrollY = partScrollEnd - partScrollStart
        
        if(scrollY >= partScrollStart && scrollY <= partScrollEnd ) {
            rv = (scrollY - partScrollStart) / partScrollY * (values[1] - values[0]) + values[0]
            
        } else if(scrollY < partScrollStart) {
            
            rv = values[0]
        } else if (scrollY > partScrollEnd) {
            
            rv = values[1]
        }

        
        return rv
    }



const playAnimation = () => {

    //현재 스크롤 진행도
    const scrollRatio = scrollY / scrollHeight

    if(scrollRatio >= 0.2) {
        topContentsMain.style.opacity = calcValues(animation.topContentsMain.opacity_out)
        topContentsBack.style.background = `rgba(0,0,0, ${calcValues(animation.topContentsBack.opacity_out)})`
        // let scale = calcValues(animation.topContentsVideoImg.transform_out)
        // topContentsVideoImg.style.transform = `scale3d(${scale},${scale},${scale})`
    } else {
        topContentsMain.style.opacity = calcValues(animation.topContentsMain.opacity_in)
        topContentsBack.style.background = `rgba(0,0,0, ${calcValues(animation.topContentsBack.opacity_in)})`
        let scale = calcValues(animation.topContentsVideoImg.transform_in)
        topContentsVideoImg.style.transform = `scale3d(${scale},${scale},${scale})`
    }


    if(scrollRatio >= 0.25) {
        desc1.style.opacity = calcValues(animation.desc1.opacity_in)            
        desc1.style.transform = `translate3d(0, ${calcValues(animation.desc1.transform_in)}%, 0)`;
    } else {
        desc1.style.opacity = calcValues(animation.desc1.opacity_out)
        desc1.style.transform = `translate3d(0, ${calcValues(animation.desc1.transform_out)}%, 0)`;

    }

    if(scrollRatio >= 0.45) {
        desc2.style.opacity = calcValues(animation.desc2.opacity_in)
        desc2.style.transform = `translate3d(0, ${calcValues(animation.desc2.transform_in)}%, 0)`;
    } else {
        desc2.style.opacity = calcValues(animation.desc2.opacity_out)
        desc2.style.transform = `translate3d(0, ${calcValues(animation.desc2.transform_out)}%, 0)`;
    }

    if(scrollRatio >= 0.65) {
        desc3.style.opacity = calcValues(animation.desc3.opacity_in)
        desc3.style.transform = `translate3d(0, ${calcValues(animation.desc3.transform_in)}%, 0)`;
    } else {
        desc3.style.opacity = calcValues(animation.desc3.opacity_out)
        desc3.style.transform = `translate3d(0, ${calcValues(animation.desc3.transform_out)}%, 0)`;
    }

    if(scrollRatio >= 0.85) {
        topContents.style.opacity = calcValues(animation.topContents.opacity_in)
        
    } else {
        topContents.style.opacity = calcValues(animation.topContents.opacity_out)
        
    }

    if(scrollRatio >= 0.9) {
        header.classList.add('header-nomal')
        headerBtn.classList.add('nomal')
        topContentsInner.style.display = 'none'
    } else {
        header.classList.remove('header-nomal')
        headerBtn.classList.remove('nomal')
        topContentsInner.style.display = 'block'
    }
}

setLayout()
//브라우저 사이지 재설정할시 높이 재설정
window.addEventListener('resize', setLayout)

//브라우저 스크롤 할떄
window.addEventListener('scroll', () => {
    scrollY = window.scrollY
    playAnimation()
})
})