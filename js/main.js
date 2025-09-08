document.addEventListener('DOMContentLoaded', function () {
  initLanguageSwitcher();
  initSmoothScrolling();
  initImagePlaceholders();
  initMenuItemHovers();
  initGalleryHovers();
});

function initLanguageSwitcher() {
  const toggleButton = document.getElementById('language-toggle');
  const dropdown = document.getElementById('language-dropdown');
  const currentLanguageSpan = document.querySelector('.current-language');
  const languageOptions = document.querySelectorAll('.language-switcher__option');

  // Toggle dropdown
  toggleButton.addEventListener('click', function (e) {
    e.stopPropagation();
    dropdown.classList.toggle('show');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', function (e) {
    if (!toggleButton.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('show');
    }
  });

  // Handle language selection
  languageOptions.forEach((option) => {
    option.addEventListener('click', function () {
      const selectedLang = this.getAttribute('data-lang');
      const selectedText = this.textContent;
      
      // Update the current language display
      currentLanguageSpan.textContent = selectedText;
      
      // Close dropdown
      dropdown.classList.remove('show');
      
      // Switch language using i18n
      if (window.i18n) {
        window.i18n.setLanguage(selectedLang);
      }
    });
  });

  // Set initial language display
  if (window.i18n) {
    const currentLang = window.i18n.getCurrentLanguage();
    const langMap = { 'zh': '中文', 'ja': '日本語' };
    currentLanguageSpan.textContent = langMap[currentLang] || 'Language';
  }
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
