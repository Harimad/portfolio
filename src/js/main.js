'use strict'
const $ = tag => document.querySelector(tag)

// Make navbar transparent when it is on the top
const navbarHeight = $('#navbar').getBoundingClientRect().height
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) $('#navbar').classList.add('navbar--dark')
  else $('#navbar').classList.remove('navbar--dark')
})

// Handle scrolling when tapping on the navbar menu
$('.navbar__menu').addEventListener('click', e => {
  const dataSetLink = e.target.dataset.link
  if (dataSetLink) {
    $(`${dataSetLink}`).scrollIntoView({ behavior: 'smooth' })
  }
})

$('.home__contact').addEventListener('click', e => {
  $(`#contact`).scrollIntoView({ behavior: 'smooth' })
})

// Navbar toggle button for small screen

// Handle click on "contact me" button on home

// Make home slowly fade to transparent as the window scrolls down

// Show "arrow up" button when scrolling down

// Handle click on the "arrow up" button

// Projects

// Remove selection from the previous item and select the new one
