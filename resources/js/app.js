import '../css/app.css'

$(document).ready(function () {
  $('.open-menu-profile').on('click', function () {})
  $('.hamburger-menu-open').on('click', function (e) {
    e.preventDefault()
    $('.hamburger-menu-wrapper').fadeIn()
    $('.hamburger-menu-container').animate({ left: '0' })
  })
  $('.hamburger-menu-close').on('click', function () {
    $('.hamburger-menu-container').animate({ left: '-100%' })
    $('.hamburger-menu-wrapper').fadeOut()
  })
  $('.menu-profile-toggle').on('click', function () {
    $('.menu-profile').toggleClass('active')
  })

  ClassicEditor.create(document.querySelector('.input-editor')).catch((error) => {
    console.error(error)
  })
})
