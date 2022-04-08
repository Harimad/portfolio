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
function scrollIntoViewWithTag(tag) {
  $(tag).scrollIntoView({ behavior: 'smooth' })
}

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
