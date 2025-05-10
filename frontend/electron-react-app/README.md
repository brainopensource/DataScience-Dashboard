# Electron React App

A minimalist desktop application built with:
- React
- Vite
- Electron
- React Query
- Plotly

## Features
- Home Page
- Mock Form Page
- Dashboard with Sin and Cos Plots

## Development Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Run in development mode:
```bash
# Start Vite dev server
npm run dev

# In another terminal, start Electron
npm run electron:dev
```

## Development Builds
```bash
npm run dev           # Start development server
npm run electron:dev  # Start Electron in dev mode
```

## Packaging Executables
### Windows
```bash
# Option 1: Use npm script
npm run package:win

# Option 2: Use build script
.build_win_exe.bat
```

### Other Platforms
```bash
npm run package:mac    # macOS
npm run package:linux  # Linux
```

### Build Output
- Executables are generated in the `dist/` directory
- Includes both installer and portable versions

## Troubleshooting
- Ensure Node.js >= 18.0.0 is installed
- Run `npm install` before building
- Check console for any build errors

## Technologies
- React 19
- TypeScript
- Electron
- React Query
- Plotly.js
- Vite

## License
MIT License

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default {
export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
