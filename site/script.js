document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const mainNav = document.querySelector('.main-nav');

  if (nav && mainNav) {
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-toggle';
    menuButton.type = 'button';
    menuButton.setAttribute('aria-label', 'Open navigation menu');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.innerHTML = '<span></span><span></span><span></span>';
    mainNav.before(menuButton);

    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('nav-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('nav-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation menu');
      });
    });
  }

  const footerInner = document.querySelector('.footer-inner');
  if (footerInner && !footerInner.querySelector('.footer-quick-links')) {
    const quickLinks = document.createElement('nav');
    quickLinks.className = 'footer-quick-links';
    quickLinks.setAttribute('aria-label', 'Footer quick links');
    quickLinks.innerHTML = '<strong>Quick links</strong><a href="index.html">Home</a><a href="services.html">Services</a><a href="projects.html">Projects</a><a href="contact.html">Contact</a>';
    footerInner.insertBefore(quickLinks, footerInner.lastElementChild);
  }

  const whatsapp = document.createElement('a');
  whatsapp.className = 'whatsapp-float';
  whatsapp.href = 'https://wa.me/254724903463?text=Hello%20CLAVO%20Construction%2C%20I%20found%20you%20through%20your%20website%20and%20would%20like%20to%20discuss%20a%20project%20and%20request%20a%20quote.';
  whatsapp.target = '_blank';
  whatsapp.rel = 'noopener noreferrer';
  whatsapp.setAttribute('aria-label', 'Chat with CLAVO Construction on WhatsApp');
  whatsapp.innerHTML = '<span aria-hidden="true">WA</span><b>WhatsApp</b>';
  document.body.appendChild(whatsapp);

  const quoteLinks = Array.from(document.querySelectorAll('a[href="contact.html"], a[href="index.html#contact"]'))
    .filter((link) => /quote|project|consultation/i.test(link.textContent));

  quoteLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const pageTitle = document.title.split('|')[0].trim();
      const pageUrl = window.location.href;
      const subject = `Quote request from website: ${pageTitle}`;
      const body = [
        'Hello CLAVO Construction Company Limited,',
        '',
        'I found your company through your website and would like to request a quote for the work described on this page.',
        '',
        `Work page: ${pageTitle}`,
        `Page link: ${pageUrl}`,
        '',
        'Please contact me to discuss the scope, site requirements, timeline, and quotation.',
        '',
        'Name:',
        'Phone:',
        'Project location:',
        'Additional details:'
      ].join('\n');

      event.preventDefault();
      window.location.href = `mailto:clavoconstructionsltd@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  });

  const form = document.querySelector('.contact-form');

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const name = form.elements.name.value.trim();
      const email = form.elements.email.value.trim();
      const projectType = form.elements.projectType.value.trim();
      const message = form.elements.message.value.trim();
      const subject = `Website inquiry: ${projectType}`;
      const body = [
        'Hello CLAVO Construction Company Limited,',
        '',
        'I found CLAVO through your website and would like to discuss a project.',
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        `Project type: ${projectType}`,
        '',
        'Project details:',
        message
      ].join('\n');

      window.location.href = `mailto:clavoconstructionsltd@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
