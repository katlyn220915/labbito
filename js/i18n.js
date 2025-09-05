class I18n {
    constructor() {
        this.currentLang = 'zh';
        this.translations = {};
        this.init();
    }

    async init() {
        try {
            const response = await fetch('./i18n.json');
            this.translations = await response.json();
            
            const savedLang = localStorage.getItem('preferred-language');
            if (savedLang && this.translations[savedLang]) {
                this.currentLang = savedLang;
            }
            
            this.updateContent();
            this.updateActiveLanguageButton();
        } catch (error) {
            console.error('Failed to load translations:', error);
        }
    }

    setLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLang = lang;
            localStorage.setItem('preferred-language', lang);
            this.updateContent();
            this.updateActiveLanguageButton();
            this.updateDocumentLang();
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