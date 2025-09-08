class I18n {
    constructor() {
        this.currentLang = 'zh';
        this.translations = {};
        this.isInitialized = false;
        this.init();
    }

    async init() {
        try {
            const response = await fetch('./i18n.json');
            this.translations = await response.json();
            
            // Check URL parameter first, then localStorage
            const urlLang = this.getLanguageFromURL();
            const savedLang = localStorage.getItem('preferred-language');
            
            if (urlLang && this.translations[urlLang]) {
                this.currentLang = urlLang;
            } else if (savedLang && this.translations[savedLang]) {
                this.currentLang = savedLang;
            }
            
            // Update URL to reflect current language
            this.updateURL();
            
            this.updateContent();
            this.updateActiveLanguageButton();
            
            // Listen for browser back/forward button
            this.setupPopstateListener();
        } catch (error) {
            console.error('Failed to load translations:', error);
        }
    }

    setupPopstateListener() {
        window.addEventListener('popstate', () => {
            const urlLang = this.getLanguageFromURL();
            if (urlLang && this.translations[urlLang] && urlLang !== this.currentLang) {
                this.currentLang = urlLang;
                localStorage.setItem('preferred-language', urlLang);
                this.updateContent();
                this.updateActiveLanguageButton();
                this.updateDocumentLang();
                
                // Update language switcher options
                if (window.updateLanguageOptions) {
                    window.updateLanguageOptions();
                }
            }
        });
    }

    setLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLang = lang;
            localStorage.setItem('preferred-language', lang);
            this.updateURL();
            this.updateContent();
            this.updateActiveLanguageButton();
            this.updateDocumentLang();
            
            // Update language switcher options
            if (window.updateLanguageOptions) {
                window.updateLanguageOptions();
            }
        }
    }

    getLanguageFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('lang');
    }

    updateURL() {
        const url = new URL(window.location);
        url.searchParams.set('lang', this.currentLang);
        // Use pushState for language changes, replaceState for initial load
        if (this.isInitialized) {
            window.history.pushState({}, '', url);
        } else {
            window.history.replaceState({}, '', url);
            this.isInitialized = true;
        }
    }

    updateDocumentLang() {
        document.documentElement.setAttribute('lang', this.currentLang);
    }

    updateContent() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            if (translation) {
                if (translation.includes('<br>')) {
                    element.innerHTML = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
    }

    getTranslation(key) {
        const keys = key.split('.');
        let translation = this.translations[this.currentLang];
        
        for (const k of keys) {
            if (translation && translation[k]) {
                translation = translation[k];
            } else {
                console.warn(`Translation not found for key: ${key}`);
                return null;
            }
        }
        
        return translation;
    }

    updateActiveLanguageButton() {
        const buttons = document.querySelectorAll('.language-switcher__btn');
        buttons.forEach(button => {
            const lang = button.getAttribute('data-lang');
            if (lang === this.currentLang) {
                button.classList.add('language-switcher__btn--active');
            } else {
                button.classList.remove('language-switcher__btn--active');
            }
        });
    }

    getCurrentLanguage() {
        return this.currentLang;
    }
}

window.i18n = new I18n();