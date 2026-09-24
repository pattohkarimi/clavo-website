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

  const zoomableImages = document.querySelectorAll('.work-gallery img, .project-card img, .service-card-image, .about-image img, .hero-installation');

  if (zoomableImages.length) {
    const lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.innerHTML = `
      <div class="image-lightbox-backdrop"></div>
      <button class="image-lightbox-close" type="button" aria-label="Close image">×</button>
      <img class="image-lightbox-image" src="" alt="" />
    `;
    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector('.image-lightbox-image');
    const closeButton = lightbox.querySelector('.image-lightbox-close');

    const openLightbox = (image) => {
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt || 'Enlarged project image';
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    zoomableImages.forEach((image) => {
      image.classList.add('zoomable-image');
      image.setAttribute('tabindex', '0');
      image.addEventListener('click', () => openLightbox(image));
      image.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openLightbox(image);
        }
      });
    });

    closeButton.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox || event.target.classList.contains('image-lightbox-backdrop')) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
        closeLightbox();
      }
    });
  }
});
