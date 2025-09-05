# RABBITO - 咖啡廳靜態網頁

基於設計稿開發的響應式咖啡廳官網，支援中日文雙語言切換。

## 功能特色

- 📱 **響應式設計** - 支援桌面、平板、手機三種設備
- 🌏 **國際化支援** - 中文/日文語言切換
- 🎨 **BEM CSS架構** - 結構化樣式管理
- ♿ **無障礙設計** - 語義化HTML與ARIA標籤
- 🔍 **SEO優化** - 完整meta標籤與語義化結構

## 技術棧

- **HTML5** - 語義化標籤
- **CSS3** - 使用CSS Variables與Grid/Flexbox
- **Vanilla JavaScript** - 純前端實現
- **JSON** - 國際化內容管理

## 文件結構

```
project/
├── index.html          # 主頁面
├── css/
│   ├── style.css      # 主要樣式
│   └── responsive.css # 響應式樣式
├── js/
│   ├── main.js        # 主要功能
│   └── i18n.js        # 國際化功能
├── assets/
│   ├── fonts/         # 字體文件
│   └── images/        # 圖片資源
├── i18n.json          # 翻譯內容
└── README.md          # 專案說明
```

## 安裝與使用

1. 克隆或下載項目文件
2. 使用本地服務器開啟 `index.html`
3. 推薦使用 Live Server 或類似工具以確保 AJAX 請求正常運作

### 開發服務器

```bash
# 使用 Python 簡易服務器
python -m http.server 8000

# 或使用 Node.js serve
npx serve .

# 或使用 Live Server (VSCode擴展)
```

## 國際化

### 語言切換
- 網頁右上角提供中文/日文切換按鈕
- 語言選擇會保存在 localStorage
- 頁面重載時會記住用戶的語言偏好

### 新增語言
1. 在 `i18n.json` 中新增語言對象
2. 在 `js/i18n.js` 中更新語言邏輯
3. 在 HTML 中新增對應的語言切換按鈕

## 樣式架構

### CSS Variables
```css
:root {
    --color-primary-green: #677b46;
    --color-text-primary: #866663;
    --color-white: #ffffff;
    /* 更多變數... */
}
```

### BEM命名規範
- Block: `.header`, `.menu`, `.about`
- Element: `.header__logo`, `.menu__item`
- Modifier: `.language-switcher__btn--active`

## 響應式斷點

- **Desktop**: > 768px
- **Tablet**: ≤ 768px
- **Mobile**: ≤ 480px
- **Small Mobile**: ≤ 320px

## 圖片處理

目前使用佔位div代替實際圖片：
- 所有圖片位置都有對應的CSS類名
- 包含建議的圖片尺寸資訊
- 替換為實際圖片時，移除 `.image-placeholder` 類名即可

## 瀏覽器支援

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 開發注意事項

1. **圖片替換**: 將 `.image-placeholder` div 替換為 `<img>` 標籤
2. **內容更新**: 修改 `i18n.json` 中的文字內容
3. **樣式調整**: 主要樣式在 `style.css`，響應式調整在 `responsive.css`
4. **SEO**: 已包含基本meta標籤，可根據實際需求調整

## 許可證

此專案僅供學習與開發參考使用。