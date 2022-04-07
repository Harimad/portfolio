'use strict'
const $ = tag => document.querySelector(tag)

// Make navbar transparent when it is on the top
const navbarHeight = $('#navbar').getBoundingClientRect().height
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) $('#navbar').classList.add('navbar--dark')
  else $('#navbar').classList.remove('navbar--dark')
})

// Handle scrolling when tapping on the navbar menu
function scrollIntoView(tag) {
  $(tag).scrollIntoView({ behavior: 'smooth' })
}

$('.navbar__menu').addEventListener('click', e => {
  const dataSetLink = e.target.dataset.link
  if (dataSetLink) scrollIntoView(dataSetLink)
})
// Handle click on "contact me" button on home
$('.home__contact').addEventListener('click', e => {
  scrollIntoView('#contact')
})

// Navbar toggle button for small screen

// Make home slowly fade to transparent as the window scrolls down
const homeHeight = $('#home').getBoundingClientRect().height
document.addEventListener('scroll', () => {
  console.log(1 - window.scrollY / homeHeight)
  $('.home__container').style.opacity = 1 - window.scrollY / homeHeight
})

// Show "arrow up" button when scrolling down

// Handle click on the "arrow up" button

// Projects

// Remove selection from the previous item and select the new one
