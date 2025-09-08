document.addEventListener('DOMContentLoaded', function () {
  initLanguageSwitcher();
  initSmoothScrolling();
  initMobileMenu();
  initScrollAnimations();
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
    const langMap = { zh: '中文', ja: '日本語' };
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

function initScrollAnimations() {
  // Create intersection observer for section animations with fade in/out
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        } else {
          entry.target.classList.remove('fade-in');
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px',
    }
  );

  // Observe all animate-section elements
  const animatedSections = document.querySelectorAll('.animate-section');
  animatedSections.forEach((section) => {
    sectionObserver.observe(section);
  });

  // Create intersection observer for individual elements with fade in/out
  const elementObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        } else {
          entry.target.classList.remove('fade-in');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  // Observe individual elements within sections
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach((element) => {
    elementObserver.observe(element);
  });
}

function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const header = document.getElementById('header');
  const mobileNavClose = document.getElementById('mobile-nav-close');
  const navLinks = document.querySelectorAll('.header__nav-link');

  function closeMenu() {
    mobileMenuBtn.classList.remove('active');
    header.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  function openMenu() {
    mobileMenuBtn.classList.add('active');
    header.classList.add('active');
    document.body.classList.add('menu-open');
  }

  if (mobileMenuBtn && header) {
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function () {
      if (header.classList.contains('active')) {
        closeMenu();
      } else {
        console.log('openMenu');
        openMenu();
      }
    });

    // Close menu with close button
    if (mobileNavClose) {
      mobileNavClose.addEventListener('click', closeMenu);
    }

    // Close menu when clicking on nav links
    navLinks.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside (but not on menu button)
    document.addEventListener('click', function (e) {
      if (!mobileMenuBtn.contains(e.target) && !headerNav.contains(e.target)) {
        closeMenu();
      }
    });
  }
}
