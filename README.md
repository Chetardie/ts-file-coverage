# ts-file-coverage

[![npm version](https://badge.fury.io/js/ts-file-coverage.svg)](https://badge.fury.io/js/ts-file-coverage)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful CLI tool to analyze TypeScript adoption in your codebase. Get detailed insights into your JavaScript-to-TypeScript migration progress with framework-specific breakdowns and color-coded coverage reports.

## ✨ Features

- **🎯 Smart Framework Detection**: Separate analysis for Vue.js, React, and plain JS/TS files
- **📊 Color-Coded Coverage**: Visual indicators for TypeScript adoption levels
- **🔍 Deep Analysis**: Detects TypeScript syntax in JavaScript files (interfaces, types, etc.)
- **📈 Dual Metrics**: Both file count and line count percentages
- **🎨 Professional Output**: Clean, organized terminal reports with conditional sections
- **⚡ Fast & Efficient**: Quickly scans codebases of any size

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

JavaScript/TypeScript Files Results:
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

- **`.ts`** / **`.tsx`** - TypeScript files and React components
- **`.js`** / **`.jsx`** - JavaScript files (scanned for TypeScript syntax)
- **`.vue`** - Vue.js Single File Components

### Smart Detection Features

- **TypeScript in JS**: Finds interfaces, type annotations, generics in `.js` files
- **Vue TypeScript**: Detects `<script lang="ts">` in Vue components
- **React Components**: Identifies React files by extension and naming patterns
- **Framework Separation**: Groups files by Vue.js, React, or plain JS/TS

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
