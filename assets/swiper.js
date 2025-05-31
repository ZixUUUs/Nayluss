const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,

  // ✅ Pour centrer le slide actif
  centeredSlides: true,

  // ✅ Pour que chaque slide occupe tout l'espace
  slidesPerView: 1,

  // ✅ Espace entre les slides
  spaceBetween: 150,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});
