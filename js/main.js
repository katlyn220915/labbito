document.addEventListener('DOMContentLoaded', function () {
  initLanguageSwitcher();
  initSmoothScrolling();
  initMobileMenu();
  initScrollAnimations();
  initCarousel();
});

function initLanguageSwitcher() {
  // Mobile language switcher
  const toggleButton = document.getElementById('language-toggle');
  const dropdown = document.getElementById('language-dropdown');

  // Desktop language switcher
  const toggleButtonDesktop = document.getElementById('language-toggle-desktop');
  const dropdownDesktop = document.getElementById('language-dropdown-desktop');

  const currentLanguageSpans = document.querySelectorAll('.current-language');
  const languageOptions = document.querySelectorAll('.language-switcher__option');

  // Helper function to toggle dropdown
  function toggleDropdown(button, dropdown, e) {
    e.stopPropagation();

    // Check if the clicked dropdown is currently open
    const isCurrentlyOpen = dropdown.classList.contains('show');

    // Close all dropdowns first
    if (dropdown) dropdown.classList.remove('show');
    if (dropdownDesktop) dropdownDesktop.classList.remove('show');

    // If it wasn't open, open the clicked one
    if (!isCurrentlyOpen) {
      dropdown.classList.add('show');
    }
  }

  // Toggle mobile dropdown
  if (toggleButton && dropdown) {
    toggleButton.addEventListener('click', function (e) {
      toggleDropdown(toggleButton, dropdown, e);
    });
  }

  // Toggle desktop dropdown
  if (toggleButtonDesktop && dropdownDesktop) {
    toggleButtonDesktop.addEventListener('click', function (e) {
      toggleDropdown(toggleButtonDesktop, dropdownDesktop, e);
    });
  }

  // Close dropdown when clicking outside
  document.addEventListener('click', function (e) {
    const allToggleButtons = [toggleButton, toggleButtonDesktop].filter(Boolean);
    const allDropdowns = [dropdown, dropdownDesktop].filter(Boolean);

    let clickedInside = false;
    allToggleButtons.forEach((btn) => {
      if (btn && btn.contains(e.target)) clickedInside = true;
    });
    allDropdowns.forEach((dd) => {
      if (dd && dd.contains(e.target)) clickedInside = true;
    });

    if (!clickedInside) {
      allDropdowns.forEach((dd) => dd.classList.remove('show'));
    }
  });

  // Handle language selection
  languageOptions.forEach((option) => {
    option.addEventListener('click', function () {
      const selectedLang = this.getAttribute('data-lang');

      // Close all dropdowns
      [dropdown, dropdownDesktop].forEach((dd) => {
        if (dd) dd.classList.remove('show');
      });

      // Switch language using i18n
      if (window.i18n) {
        window.i18n.setLanguage(selectedLang);
        // updateLanguageOptions will be called automatically by i18n system
      }
    });
  });

  // Function to update language options visibility
  function updateLanguageOptions() {
    const currentLang = window.i18n ? window.i18n.getCurrentLanguage() : 'zh';

    // Keep button text as "Language"
    currentLanguageSpans.forEach((span) => {
      span.textContent = 'Language';
    });

    // Show only the opposite language option
    languageOptions.forEach((option) => {
      const optionLang = option.getAttribute('data-lang');
      if (optionLang === currentLang) {
        option.style.display = 'none';
      } else {
        option.style.display = 'block';
      }
    });
  }

  // Expose updateLanguageOptions globally for i18n system
  window.updateLanguageOptions = updateLanguageOptions;
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
  // Check if device supports animations well (not low-end mobile)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth <= 768;
  const isVeryLowEndDevice = window.innerWidth <= 320 && window.innerHeight <= 600;
  
  if (prefersReducedMotion || isVeryLowEndDevice) {
    // Simply show all elements for very low-end devices or users who prefer reduced motion
    document.querySelectorAll('.animate-section, .animate-on-scroll').forEach(el => {
      el.classList.add('fade-in');
    });
    return;
  }

  // Throttle function to reduce callback frequency
  let ticking = false;
  function throttleCallback(callback) {
    return (entries) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          callback(entries);
          ticking = false;
        });
        ticking = true;
      }
    };
  }

  // Create intersection observer for section animations with fade in/out
  const sectionObserver = new IntersectionObserver(
    throttleCallback((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        } else {
          entry.target.classList.remove('fade-in');
        }
      });
    }),
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

  // Only observe individual elements on larger screens for better performance
  if (!isMobile) {
    const elementObserver = new IntersectionObserver(
      throttleCallback((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          } else {
            entry.target.classList.remove('fade-in');
          }
        });
      }),
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
  } else {
    // On mobile, simply show all individual elements to avoid performance issues
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.classList.add('fade-in');
    });
  }
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

function initCarousel() {
  const carouselTrack = document.querySelector('.carousel__track');
  const prevBtn = document.querySelector('.carousel__nav--prev');
  const nextBtn = document.querySelector('.carousel__nav--next');
  const designerCards = document.querySelectorAll('.designer__card');
  const galleryContainer = document.querySelector('.designer__gallery');

  if (!carouselTrack || !prevBtn || !nextBtn || designerCards.length === 0) {
    return;
  }

  let currentIndex = 0;
  const totalCards = designerCards.length;
  const cardWidth = 100 / totalCards; // Each card is 20% (100% / 5)

  // Designer data with portfolio images
  const designers = [
    {
      folderName: 'fujimori',
      name: 'fujimori',
      portfolioCount: 4,
    },
    {
      folderName: 'flora',
      name: 'Flora',
      portfolioCount: 4,
    },
    {
      folderName: 'haler',
      name: 'Haler',
      portfolioCount: 4,
    },
    {
      folderName: 'nana',
      name: 'nana',
      portfolioCount: 4,
    },
    {
      folderName: 'caleb',
      name: 'Caleb',
      portfolioCount: 4,
    },
  ];

  // Show specific designer card using track transform
  function showCard(index) {
    // Calculate the transform value to show the desired card
    const transformValue = -(index * cardWidth);

    // Apply transform to the track
    carouselTrack.style.transform = `translateX(${transformValue}%)`;

    // Update gallery with current designer's portfolio
    updateGallery(index);

    currentIndex = index;
  }

  // Update gallery with designer's portfolio images
  function updateGallery(designerIndex) {
    if (!galleryContainer) return;

    const designer = designers[designerIndex];

    // Add fade out animation
    galleryContainer.style.opacity = '0';
    galleryContainer.style.transform = 'translateY(20px)';

    // Wait for fade out transition
    setTimeout(() => {
      // Clear existing images
      galleryContainer.innerHTML = '';

      // Generate new portfolio images
      for (let i = 1; i <= designer.portfolioCount; i++) {
        const img = document.createElement('img');
        img.src = `./assets/images/designers/${designer.folderName}/${designer.name}-portfolio-${i}.jpg`;
        img.alt = `${designer.name}作品集${i}`;
        img.className = 'designer__image';
        galleryContainer.appendChild(img);
      }

      // Add fade in animation
      setTimeout(() => {
        galleryContainer.style.opacity = '1';
        galleryContainer.style.transform = 'translateY(0)';
      }, 50);
    }, 300); // Wait for fade out
  }

  // Navigate to previous card (left arrow)
  function prevCard() {
    const newIndex = currentIndex === 0 ? totalCards - 1 : currentIndex - 1;
    console.log('Prev card: going from', currentIndex, 'to', newIndex);
    showCard(newIndex);
  }

  // Navigate to next card (right arrow)
  function nextCard() {
    const newIndex = currentIndex === totalCards - 1 ? 0 : currentIndex + 1;
    console.log('Next card: going from', currentIndex, 'to', newIndex);
    showCard(newIndex);
  }

  // Event listeners
  prevBtn.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('Prev button clicked');
    prevCard();
  });

  nextBtn.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('Next button clicked');
    nextCard();
  });

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
      prevCard();
    } else if (e.key === 'ArrowRight') {
      nextCard();
    }
  });

  // Touch/swipe support
  let startX = 0;
  let endX = 0;

  carouselContent.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
  });

  carouselContent.addEventListener('touchend', function (e) {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextCard(); // Swipe left - next card
      } else {
        prevCard(); // Swipe right - previous card
      }
    }
  }

  // Initialize carousel
  showCard(0);
}
