# Frontend Structure Documentation

This document describes the organized structure of the frontend-new project.

## Directory Structure

```
src/
├── assets/                 # Static assets (images, icons, etc.)
├── components/            # Reusable React components
│   ├── ui/               # UI components (buttons, inputs, etc.)
│   ├── layout/           # Layout components (HeroSection, header, footer, etc.)
│   └── index.js          # Component exports
├── pages/                # Page components
│   ├── ProxyListPage.jsx
│   ├── ToolsPage.jsx
│   ├── AboutPage.jsx
│   ├── ContactPage.jsx
│   └── index.js          # Page exports
├── styles/               # CSS files
│   ├── globals.css       # Global styles
│   ├── App.css          # App-specific styles
│   └── index.css        # Main CSS file
├── utils/                # Utility functions
│   ├── proxyUtils.js    # Proxy-related utilities
│   └── index.js         # Utility exports
├── hooks/                # Custom React hooks
│   └── index.js         # Hook exports
├── App.jsx              # Main application component
└── main.jsx             # Application entry point
```

## Import Guidelines

### Components
```jsx
// Import specific components
import { ThemeToggle, ListComponent } from './components/ui'

// Import all components from a category
import { ProxyListPage, ToolsPage } from './pages'
```

### Utilities
```jsx
import { formatProxyUrl, validateProxy } from './utils'
```

### Styles
```jsx
import './styles/globals.css'
```

## File Naming Conventions

- **Components**: PascalCase (e.g., `ThemeToggle.jsx`)
- **Pages**: PascalCase with "Page" suffix (e.g., `ProxyListPage.jsx`)
- **Utilities**: camelCase (e.g., `proxyUtils.js`)
- **Styles**: lowercase with dashes (e.g., `globals.css`)

## Best Practices

1. **Single Responsibility**: Each component should have a single, well-defined purpose
2. **Consistent Imports**: Use index.js files for cleaner imports
3. **Logical Grouping**: Group related files in appropriate directories
4. **Clear Naming**: Use descriptive names that indicate the file's purpose
5. **Separation of Concerns**: Keep styles, logic, and components separate

## Adding New Files

### New Component
1. Create the component file in the appropriate directory (`components/ui/` or `components/layout/`)
2. Export it from the corresponding `index.js` file
3. Import it where needed using the clean import syntax

### New Page
1. Create the page file in the `pages/` directory
2. Add it to `pages/index.js` exports
3. Import it in `App.jsx` and add routing logic

### New Utility
1. Create the utility file in the `utils/` directory
2. Export functions from `utils/index.js`
3. Import where needed
