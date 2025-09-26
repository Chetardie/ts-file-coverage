# ts-file-coverage

[![npm version](https://badge.fury.io/js/ts-file-coverage.svg)](https://badge.fury.io/js/ts-file-coverage)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful CLI tool to analyze TypeScript adoption in your codebase. Get detailed insights into your JavaScript-to-TypeScript migration progress with framework-specific breakdowns and color-coded coverage reports.

> **📋 File Classification Disclaimer**: This tool classifies files based on their file extensions and specific patterns. `.js` and `.jsx` files are treated as JavaScript, `.ts` and `.tsx` files as TypeScript, and `.vue` files are classified based on the presence of `lang="ts"` in their `<script>` tags. Test files (containing `.test.` or `.spec.` in their names) are automatically excluded from analysis.

## ✨ Features

- **🎯 Smart Framework Detection**: Separate analysis for Vue.js, React, and plain JS/TS files
- **📊 Color-Coded Coverage**: Visual indicators for TypeScript adoption levels
- **🔍 Extension-Based Classification**: Files are classified by their extensions for consistent results
- **📈 Dual Metrics**: Both file count and line count percentages
- **🎨 Professional Output**: Clean, organized terminal reports with conditional sections
- **⚡ Fast & Efficient**: Quickly scans codebases of any size
- **🧪 Test File Exclusion**: Automatically excludes test files from analysis

## 📦 Installation

### Global Installation (Recommended)

```bash
npm install -g ts-file-coverage
```

### Local Installation

```bash
npm install --save-dev ts-file-coverage
```

### Run Without Installing

```bash
npx ts-file-coverage
```

## 🛠️ Usage

### Basic Usage

```bash
# Analyze current directory's src folder (default)
ts-file-coverage

# Analyze specific directory
ts-file-coverage --dir my-project/src

# Analyze from project root
ts-file-coverage --dir .
```

### Command Line Options

```bash
ts-file-coverage [options]

Options:
  -V, --version          output the version number
  -d, --dir <directory>  Target directory to analyze (default: "src")
  -h, --help             display help for command
```

## 📊 Example Output

```
TypeScript File Analysis
========================
Directory: /path/to/your/project/src
File types: .ts, .tsx, .js, .jsx, .vue

Results:
- Total files: 45
- TypeScript files: 32 (71.1%)
- JavaScript files: 13 (28.9%)
- Total lines: 3,247
- TypeScript lines: 2,156 (66.4%)
- JavaScript lines: 1,091 (33.6%)
📊 Overall Files Coverage: 71.1%
📊 Overall Lines Coverage: 66.4%

Plain JavaScript/TypeScript Files:
- Total Plain JS/TS files: 28 (62.2% of all files)
- Plain JS/TS with TypeScript: 20 (71.4%)
- Total Plain JS/TS lines: 2,145 (66.1% of all lines)
📊 Plain JS/TS Files Coverage: 71.4%
📊 Plain JS/TS Lines Coverage: 68.2%

Framework Breakdown:

Vue.js Files:
- Total Vue files: 8 (17.8% of all files)
- Vue with TypeScript: 6 (75.0%)
- Total Vue lines: 567 (17.5% of all lines)
📊 Vue Files Coverage: 75.0%
📊 Vue Lines Coverage: 73.2%

React Files:
- Total React files: 9 (20.0% of all files)
- React with TypeScript: 6 (66.7%)
- Total React lines: 535 (16.5% of all lines)
📊 React Files Coverage: 66.7%
📊 React Lines Coverage: 61.1%
```

## 🎯 Use Cases

- **Migration Planning**: Assess the current state of TypeScript adoption
- **Progress Tracking**: Monitor migration progress over time
- **Team Reporting**: Generate statistics for stakeholders
- **CI/CD Integration**: Track TypeScript coverage in automated pipelines
- **Codebase Analysis**: Understand the composition of large projects

## 🔍 What Gets Analyzed

### Supported File Types

- **`.ts`** - TypeScript files (always treated as TypeScript)
- **`.tsx`** - TypeScript React components (always treated as TypeScript)
- **`.js`** - JavaScript files (always treated as JavaScript)
- **`.jsx`** - JavaScript React components (always treated as JavaScript)
- **`.vue`** - Vue.js Single File Components (classified by `lang="ts"` attribute)

### File Classification Rules

- **Extension-Based**: Files are classified primarily by their file extension
- **Vue Special Case**: `.vue` files are analyzed for `<script lang="ts">` to determine TypeScript vs JavaScript
- **React Detection**: Only `.jsx` and `.tsx` files are considered React components
- **Test File Exclusion**: Files containing `.test.` or `.spec.` in their names are automatically ignored
- **Framework Separation**: Groups files by Vue.js, React, or plain JS/TS

### What Gets Excluded

- Files in `node_modules/`, `dist/`, `build/`, `.git/`, `coverage/` directories
- Test files: `*.test.*` and `*.spec.*` (e.g., `component.test.ts`, `utils.spec.js`)
- Any files matching custom ignore patterns

## 📏 Counting Methodology

### File Classification Logic

1. **`.ts` files**: Always classified as TypeScript files
2. **`.tsx` files**: Always classified as TypeScript files (React + TypeScript)
3. **`.js` files**: Always classified as JavaScript files
4. **`.jsx` files**: Always classified as JavaScript files (React + JavaScript)
5. **`.vue` files**: Classified by checking for `<script lang="ts">` or `<script setup lang="ts">` patterns

### Line Counting

- **All non-empty, non-comment lines** are counted in each file
- **TypeScript files**: All lines counted as TypeScript lines
- **JavaScript files**: All lines counted as JavaScript lines
- **Vue files**: All lines counted as TypeScript or JavaScript based on the `lang` attribute

### Important Notes

- **No syntax analysis**: The tool does NOT analyze JavaScript files for TypeScript syntax
- **Extension-based**: Classification is purely based on file extensions (except Vue files)
- **Consistent results**: This approach ensures predictable and consistent analysis across different codebases
- **Migration tracking**: Perfect for tracking progress as you rename `.js` → `.ts` and `.jsx` → `.tsx` files

### Coverage Indicators

- 🟢 **Green (≥80%)**: Excellent TypeScript adoption
- 🟡 **Yellow (60-79%)**: Good TypeScript adoption
- 🟣 **Magenta (40-59%)**: Moderate TypeScript adoption
- 🔴 **Red (<40%)**: Low TypeScript adoption

## 💻 Programmatic Usage

```javascript
const { TSFileCoverageAnalyzer, createConfig } = require('ts-file-coverage');

const config = createConfig({ directory: './src' });
const analyzer = new TSFileCoverageAnalyzer(config);

analyzer.analyze().then(results => {
  console.log(`TypeScript files: ${results.summary.typeScriptFiles}`);
  console.log(`Vue files: ${results.summary.vue.totalFiles}`);
  console.log(`React files: ${results.summary.react.totalFiles}`);
});
```

## ❓ Frequently Asked Questions

### Why doesn't the tool detect TypeScript syntax in `.js` files?

This tool uses an **extension-based approach** for consistent and predictable results. A `.js` file is always treated as JavaScript, regardless of its content. This design choice:

- Ensures consistent results across different runs
- Reflects the actual file type as understood by TypeScript compiler
- Makes migration tracking straightforward (rename `.js` → `.ts` to see progress)

### How are Vue files handled?

Vue files are special-cased to check for the `lang="ts"` attribute in `<script>` tags:

- `<script lang="ts">` → Classified as TypeScript
- `<script setup lang="ts">` → Classified as TypeScript
- `<script>` (no lang attribute) → Classified as JavaScript

### What files are excluded from analysis?

- Test files: Any file containing `.test.` or `.spec.` in the filename
- Build directories: `node_modules/`, `dist/`, `build/`, `coverage/`
- Version control: `.git/` directory
- Custom patterns: Any additional ignore patterns you specify

### Can I include test files in the analysis?

Currently, test files are automatically excluded. This is by design to focus on production code analysis. If you need to analyze test files, you can modify the ignore patterns in the configuration.

## 🛠️ Development

```bash
git clone https://github.com/yourusername/ts-file-coverage.git
cd ts-file-coverage
npm install
npm test
npm run build
```

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 📈 Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and feature updates.
