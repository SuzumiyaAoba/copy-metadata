# Copy Metadata ![version](https://img.shields.io/badge/version-0.1.0-blue) ![chrome-extension](https://img.shields.io/badge/chrome-extension-brightgreen)

Copy Metadata is a modern browser extension that lets you copy web page metadata
(title, URL, etc.) using fully customizable templates. Designed for
productivity, it features a beautiful popup UI, context menu integration, and a
flexible options page.

---

## ✨ Features

- 🚀 **Copy page metadata** (title, URL, etc.) to clipboard instantly
- 📝 **Customizable templates** for flexible output
- 🖱️ **Context menu** integration for quick access
- ⚙️ **Options page** to manage templates and settings
- 🎨 **Theme customization**
- ⚡ Built with React, TypeScript, Vite, and Tailwind CSS

---

## 📦 Installation

1. Clone this repository:
   ```sh
   git clone https://github.com/SuzumiyaAoba/copy-metadata.git
   cd copy-metadata
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Build the extension:
   ```sh
   npm run build
   ```
4. Load the `dist/` directory as an unpacked extension in your browser (Chrome:
   `chrome://extensions` → Enable Developer Mode → Load unpacked).

---

## 🛠️ Development

- Start development server with hot reload:
  ```sh
  npm run dev
  ```
- Lint and format code:
  ```sh
  npm run lint
  npm run format
  ```

---

## 🧩 Usage

- **Popup**: Click the extension icon to open the popup and copy metadata using
  your templates.
- **Context Menu**: Right-click any page to copy metadata directly.
- **Options Page**: Click "Options" in the extension menu to manage templates,
  settings, and appearance.

---

## 📁 Project Structure

See [`docs/PROJECT_STRUCTURE.md`](docs/PROJECT_STRUCTURE.md) for full details.

```
copy-metadata/
├── src/           # Main source code
├── public/        # Static assets
├── assets/        # Icons and images
├── dist/          # Build output
├── docs/          # Documentation
├── manifest.json  # Extension manifest
└── ...
```

---

## 📚 Documentation

- [Specification](docs/SPECIFICATION.md)
- [Project Structure](docs/PROJECT_STRUCTURE.md)

---

## 📝 License

MIT
