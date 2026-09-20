document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const button = form.querySelector('button');
      const originalText = button.textContent;

      button.textContent = 'Inquiry Sent';
      button.disabled = true;

      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        form.reset();
      }, 1800);
    });
  }

  const heroSlides = document.querySelectorAll('.services-hero-slide');
  let activeSlide = 0;

  if (heroSlides.length > 1) {
    setInterval(() => {
      heroSlides[activeSlide].classList.remove('is-active');
      activeSlide = (activeSlide + 1) % heroSlides.length;
      heroSlides[activeSlide].classList.add('is-active');
    }, 4000);
  }
});
