# LocoJson

LocoJson is a CLI tool designed for developers to automate the translation of internationalization files projects. Utilizing the power of AI through the OpenAI API, LocoJson simplifies the process of translating text strings from one language to multiple target languages, enhancing the development workflow for multilingual applications.

## Features

- **AI-Powered Translations**: Leverages OpenAI's advanced language models for accurate and context-aware translations.
- **Customizable**: Supports translation to multiple languages, easily configurable via CLI parameters.

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher recommended)
- An OpenAI API key

### Configuration

Create a `.env` file in the root directory of your project and add your OpenAI API key:

```
OPENAI_API_KEY=your_openai_api_key_here
```

### Usage

To translate your i18n files, run the following command from the root of your project:

```bash
node dist/cli.js -d <directory> -s <source> -t <target1,target2,...>
```

Where:

- `<directory>` is the directory containing your i18n files.
- `<source>` is the filename of your source language file (without `.json` extension).
- `<target1,target2,...>` are the target languages separated by commas.

## Contributing

We welcome contributions! Please read our contributing guidelines to get started.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
