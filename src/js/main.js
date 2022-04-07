'use strict'
const $ = tag => document.querySelector(tag)

// Make navbar transparent when it is on the top
const navbarHeight = $('#navbar').getBoundingClientRect().height
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) $('#navbar').classList.add('navbar--dark')
  else $('#navbar').classList.remove('navbar--dark')
})
