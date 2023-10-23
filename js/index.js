// 
const animation = {
    // 메인 contents의 투명도 애니메이션
    topContentsMain: {
        opacity_in: [1, 0, { start: 0, end: 0.2 }],
        opacity_out: [1, 0, { start: 0, end: 0 }],

    },
    // 비디오 이미지의 크기 변화 애니메이션
    topContentsVideoImg: {
        transform_in: [1, 2, { start: 0, end: 1 }],
        transform_out: [2, 1, { start: 1, end: 0 }],
    },
    // 배경 이미지의 투명도 애니메이션
    topContentsBack: {
        opacity_in: [0, 0.4, { start: 0, end: 0.15 }],
        opacity_out: [0, 0.4, { start: 0, end: 0 }],

    },
    // 전체 contents의 투명도 애니메이션
    topContents: {
        opacity_in: [0.5, 1, { start: 0.9, end: 1 }],
        opacity_out: [1, 0.5, { start: 1, end: 0.9 }],
    },

    // 서브 contents  (desc) 애니메이션
    desc1: {
        opacity_in: [0, 1, { start: 0.25, end: 0.4 }],
        opacity_out: [0, 1, { start: 0.4, end: 0.25 }],
        transform_in: [40, 0, { start: 0.25, end: 0.35 }],
        transform_out: [0, 0, { start: 0.35, end: 0.25 }],
    },

    desc2: {
        opacity_in: [0, 1, { start: 0.45, end: 0.55 }],
        opacity_out: [0, 1, { start: 0.55, end: 0.45 }],
        transform_in: [40, 0, { start: 0.45, end: 0.55 }],
        transform_out: [0, 0, { start: 0.55, end: 0.45 }],
    },

    desc3: {
        opacity_in: [0, 1, { start: 0.65, end: 0.75 }],
        opacity_out: [0, 1, { start: 0.75, end: 0.65 }],
        transform_in: [40, 0, { start: 0.65, end: 0.75 }],
        transform_out: [0, 0, { start: 0.75, end: 0.65 }],
    },
}

// DOMContentLoaded 이벤트가 발생했을 때 실행되는 코드
document.addEventListener("DOMContentLoaded", () => {

    // 현재 스크롤 위치
    let scrollY = 0; //Y축 값

    // DOM 요소들
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

    // 브라우저의 높이 넓이 (창 크기)
    let height = window.innerHeight
    // let width = window.innerWidth

    //1번 섹션의 높이
    let scrollHeight = height * 4.5

    // 스크롤 크기를 조절하는 함수
    const setLayout = () => {
        mainVisual.style.height = `${scrollHeight}px`
    }

    // 값 계산 함수
    const calcValues = (values) => {
        let rv;

        // 현재 섹션의 시작 지점과 끝 지점을 픽셀 단위로 계산
        const partScrollStart = values[2].start * scrollHeight
        const partScrollEnd = values[2].end * scrollHeight

        // 현재 섹션의 스크롤 가능한 범위 (픽셀 단위)
        const partScrollY = partScrollEnd - partScrollStart

        // 현재 스크롤 위치가 섹션 범위 내에 있을 경우
        if (scrollY >= partScrollStart && scrollY <= partScrollEnd) {
            // 섹션 범위 내에서의 스크롤 진행도를 계산하여 해당 범위에서의 값을 보간
            rv = (scrollY - partScrollStart) / partScrollY * (values[1] - values[0]) + values[0]

            // 현재 스크롤 위치가 섹션 시작 지점보다 작을 경우
        } else if (scrollY < partScrollStart) {
            // 시작 지점에서의 값을 유지
            rv = values[0]
            // 현재 스크롤 위치가 섹션 끝 지점보다 클 경우
        } else if (scrollY > partScrollEnd) {
            // 끝 지점에서의 값을 유지
            rv = values[1]
        }
        // 계산된 값을 반환
        return rv
    }

    // 애니메이션을 처리하는 함수
    const playAnimation = () => {

        //현재 스크롤 진행도
        const scrollRatio = scrollY / scrollHeight

        const imagePath1 = "../images/image1.png"; // 첫 번째 이미지 경로
        const imagePath2 = "../images/image2.png"; // 두 번째 이미지 경로

        // 1번 섹션에서의 애니메이션
        if (scrollRatio >= 0.2) {
            // 메인 콘텐츠의 투명도를 계산된 값으로 설정 (사라짐)
            topContentsMain.style.opacity = calcValues(animation.topContentsMain.opacity_out)
            // 배경의 투명도를 계산된 값으로 설정 (사라짐)
            topContentsBack.style.background = `rgba(0,0,0, ${calcValues(animation.topContentsBack.opacity_out)})`
            // 이미지 경로 설정 (첫 번째 이미지)
            topContentsBack.style.backgroundImage = `url('${imagePath2}')`;
            topContentsBack.style.backgroundSize = "cover";
            topContentsBack.style.backgroundRepeat = "no-repeat";
        } else {
            // 메인 콘텐츠의 투명도를 계산된 값으로 설정 (나타남)
            topContentsMain.style.opacity = calcValues(animation.topContentsMain.opacity_in)
            // 배경의 투명도를 계산된 값으로 설정 (나타남)
            topContentsBack.style.background = `rgba(0,0,0, ${calcValues(animation.topContentsBack.opacity_in)})`
            // 비디오 이미지의 크기를 계산된 값으로 조절 (확대/축소)
            let scale = calcValues(animation.topContentsVideoImg.transform_in)
            topContentsVideoImg.style.transform = `scale3d(${scale},${scale},${scale})`
            // 이미지 경로 설정 (두 번째 이미지)
            topContentsBack.style.backgroundImage = `url('${imagePath1}')`;
            topContentsBack.style.backgroundSize = "cover";
            topContentsBack.style.backgroundRepeat = "no-repeat";
        }

        // 2번 섹션에서의 애니메이션 (desc1, desc2, desc3)
        if (scrollRatio >= 0.25) {
            desc1.style.opacity = calcValues(animation.desc1.opacity_in)
            desc1.style.transform = `translate3d(0, ${calcValues(animation.desc1.transform_in)}%, 0)`;
        } else {
            desc1.style.opacity = calcValues(animation.desc1.opacity_out)
            desc1.style.transform = `translate3d(0, ${calcValues(animation.desc1.transform_out)}%, 0)`;
        }

        if (scrollRatio >= 0.45) {
            desc2.style.opacity = calcValues(animation.desc2.opacity_in)
            desc2.style.transform = `translate3d(0, ${calcValues(animation.desc2.transform_in)}%, 0)`;
        } else {
            desc2.style.opacity = calcValues(animation.desc2.opacity_out)
            desc2.style.transform = `translate3d(0, ${calcValues(animation.desc2.transform_out)}%, 0)`;
        }

        if (scrollRatio >= 0.65) {
            desc3.style.opacity = calcValues(animation.desc3.opacity_in)
            desc3.style.transform = `translate3d(0, ${calcValues(animation.desc3.transform_in)}%, 0)`;
        } else {
            desc3.style.opacity = calcValues(animation.desc3.opacity_out)
            desc3.style.transform = `translate3d(0, ${calcValues(animation.desc3.transform_out)}%, 0)`;
        }

        // 3번 섹션에서의 애니메이션 (topContents)
        if (scrollRatio >= 0.85) {
            topContents.style.opacity = calcValues(animation.topContents.opacity_in)

        } else {
            topContents.style.opacity = calcValues(animation.topContents.opacity_out)
        }

        // 4번 섹션에서의 애니메이션 (header)
        if (scrollRatio >= 0.9) {
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

});