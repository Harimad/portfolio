'use strict'
const $ = tag => document.querySelector(tag)
const $$ = tag => document.querySelectorAll(tag)

// Make navbar transparent when it is on the top
const navbarHeight = $('#navbar').getBoundingClientRect().height
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) $('#navbar').classList.add('navbar--dark')
  else $('#navbar').classList.remove('navbar--dark')
})

// Handle scrolling when tapping on the navbar menu
$('.navbar__menu').addEventListener('click', e => {
  const dataSetLink = e.target.dataset.link
  if (dataSetLink) scrollIntoViewWithTag(dataSetLink)

  // nav 토글 버튼 안의 li 버튼 누르면 nav 토글 버튼 끄기
  $('.navbar__menu').classList.toggle('open')
})
// Handle click on "contact me" button on home
$('.home__contact').addEventListener('click', e => {
  scrollIntoViewWithTag('#contact')
})

// Navbar toggle button for small screen
$('.navbar__toggle-btn').addEventListener('click', e => {
  $('.navbar__menu').classList.toggle('open')
})

// Make home slowly fade to transparent as the window scrolls down
const homeHeight = $('#home').getBoundingClientRect().height
document.addEventListener('scroll', () => {
  $('.home__container').style.opacity = 1 - window.scrollY / homeHeight

  // Show "arrow up" button when scrolling down
  if (window.scrollY > homeHeight / 2) $('.arrow-up').classList.add('visible')
  else $('.arrow-up').classList.remove('visible')
})

// Handle click on the "arrow up" button
let arrowStop = true
$('.arrow-up').addEventListener('click', () => {
  if (!arrowStop) return

  scrollIntoViewWithTag('#home')
  arrowStop = false

  setTimeout(() => {
    arrowStop = true
  }, 2000)
})

// Projects
$('.work__categories').addEventListener('click', e => {
  const dataFilter =
    e.target.dataset.filter || e.target.parentNode.dataset.filter
  if (!dataFilter) return

  // Remove selection from the previous item and select the new one
  if ($('.category__btn.selected')) {
    $('.category__btn.selected').classList.remove('selected')
  }
  e.target.classList.add('selected')

  $('.work__projects').classList.add('anim-out')
  setTimeout(() => {
    $$('.work__projects a').forEach(item => {
      item.classList.add('invisible')
      if (item.dataset.type === dataFilter || dataFilter === '*') {
        item.classList.remove('invisible')
      }
    })
    $('.work__projects').classList.remove('anim-out')
  }, 300)
})

// 스크롤시 메뉴 활성화 시키기

// 비효율
// window.addEventListener('scroll', () => {
//   let prevHeight = 0
//   $$('section').forEach((v, i) => {
//     let rect = v.getBoundingClientRect().height
//     if (window.scrollY > prevHeight) {
//       $$('.navbar__menu__item').forEach(item => {
//         item.classList.remove('active')
//       })
//       $$('.navbar__menu__item')[i].classList.add('active')
//     }
//     prevHeight += rect
//     console.log(rect)
//   })
// })

//효율
// 1. 모든 섹션 요소들과 메뉴아이템들을 가지고 온다
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다
const sectionIds = [
  '#home',
  '#about',
  '#skills',
  '#work',
  '#testimonials',
  '#contact',
]

const sections = sectionIds.map(id => $(id))
const navItems = sectionIds.map(id => $(`[data-link="${id}"]`))

let selectedNavIndex = 0
let selectedNavItem = navItems[0]

const selectNavItem = selected => {
  selectedNavItem.classList.remove('active')
  selectedNavItem = selected
  selectedNavItem.classList.add('active')
}

function scrollIntoViewWithTag(tag) {
  $(tag).scrollIntoView({ behavior: 'smooth' })
  selectNavItem(navItems[sectionIds.indexOf(tag)])
}

const observerOptions = {
  root: null,
  rootMatgin: '0px',
  threshold: 0.3,
}

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    //어떤 요소가 화면 밖 나갈때 다음 섹션 활성화
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`)
      // 스크롤링이 아래로 되어서 페이지가 올라옴
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1
      } else {
        selectedNavIndex = index - 1
      }
    }
  })
}

const observer = new IntersectionObserver(observerCallback, observerOptions)

sections.forEach(section => observer.observe(section))
window.addEventListener('wheel', () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0
  } else if (
    Math.floor(window.scrollY + window.innerHeight) ===
    document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1
  }
  selectNavItem(navItems[selectedNavIndex])
})
