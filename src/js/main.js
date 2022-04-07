'use strict'
const $ = tag => document.querySelector(tag)

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
})
// Handle click on "contact me" button on home
$('.home__contact').addEventListener('click', e => {
  scrollIntoViewWithTag('#contact')
})

// Navbar toggle button for small screen

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

// Remove selection from the previous item and select the new one
