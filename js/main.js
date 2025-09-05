document.addEventListener('DOMContentLoaded', function () {
  initLanguageSwitcher();
  initSmoothScrolling();
  initImagePlaceholders();
  initMenuItemHovers();
  initGalleryHovers();
});

function initLanguageSwitcher() {
  const languageButtons = document.querySelectorAll('.language-switcher__btn');

  languageButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const lang = this.getAttribute('data-lang');
      if (window.i18n) {
        window.i18n.setLanguage(lang);
      }
    });
  });
}

function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
}

function initImagePlaceholders() {
  const placeholders = document.querySelectorAll('.image-placeholder');

  placeholders.forEach((placeholder) => {
    placeholder.addEventListener('click', function () {
      const text = this.querySelector('.image-placeholder__text');
      if (text) {
        text.style.opacity = text.style.opacity === '0' ? '0.7' : '0';
        setTimeout(() => {
          text.style.opacity = '0.7';
        }, 2000);
      }
    });
  });
}

function initMenuItemHovers() {
  const menuItems = document.querySelectorAll('.menu__item');

  menuItems.forEach((item) => {
    item.addEventListener('mouseenter', function () {
      this.style.backgroundColor = 'rgba(103, 123, 70, 0.1)';
      this.style.transform = 'translateX(5px)';
      this.style.transition = 'all 0.3s ease';
    });

    item.addEventListener('mouseleave', function () {
      this.style.backgroundColor = 'transparent';
      this.style.transform = 'translateX(0)';
    });
  });
}

function initGalleryHovers() {
  const galleryItems = document.querySelectorAll('.gallery__item');

  galleryItems.forEach((item) => {
    item.addEventListener('mouseenter', function () {
      this.style.filter = 'brightness(1.1) saturate(1.2)';
      this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
    });

    item.addEventListener('mouseleave', function () {
      this.style.filter = 'none';
      this.style.boxShadow = 'none';
    });
  });
}

function handleContactIconClick(type) {
  if (type === 'phone') {
    window.location.href = 'tel:03-1234-5678';
  } else if (type === 'email') {
    window.location.href = 'mailto:info@rabbito.com';
  }
}

// window.addEventListener('scroll', function() {
//     const header = document.querySelector('.header');
//     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

//     if (scrollTop > 100) {
//         header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
//         header.style.backdropFilter = 'blur(10px)';
//         header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
//     } else {
//         header.style.backgroundColor = '#ffffff';
//         header.style.backdropFilter = 'none';
//         header.style.boxShadow = 'none';
//     }
// });

function observeElementsInView() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  const animatedElements = document.querySelectorAll(
    '.menu__category, .about__content, .story__content, .location__info'
  );
  animatedElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

setTimeout(observeElementsInView, 1000);
