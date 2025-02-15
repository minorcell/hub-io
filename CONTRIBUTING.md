# Contributing to Hub-io

Thank you for considering contributing to this project! We appreciate every contribution, whether it's fixing bugs, adding new features, improving documentation, or providing feedback.

Below are some guidelines to help you get started with contributing to the project.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [How to Contribute](#how-to-contribute)
3. [Code Style Guidelines](#code-style-guidelines)
4. [Submitting a Pull Request (PR)](#submitting-a-pull-request-pr)
5. [Reporting Bugs](#reporting-bugs)
6. [Feature Requests](#feature-requests)
7. [Questions and Discussions](#questions-and-discussions)
8. [Acknowledgements](#acknowledgements)

---

## Getting Started

### 1. Fork the Repository
Click the **Fork** button on the top-right corner of this repository to create a copy under your GitHub account.

### 2. Clone the Repository
Clone your forked repository to your local machine:
```bash
git clone https://github.com/minorcell/hub-io.git
cd hub-io
```

### 3. Install Dependencies
Install the required dependencies using npm or yarn:
```bash
npm install   # or yarn install
```

### 4. Start the Development Server
Run the development server using Vite:
```bash
npm run dev   # or yarn dev
```
This will start the development server at `http://localhost:5173` (or another port if 3000 is busy).

### 5. Create a New Branch
Before making changes, create a new branch:
```bash
git checkout -b feature/your-feature-name
```
Branch naming conventions:
- Feature development: `feature/description`
- Bug fixes: `fix/description`
- Documentation updates: `docs/description`

---

## How to Contribute

### 1. Fix Bugs or Implement Features
- Check the [Issues](https://github.com/minorcell/hub-io/issues) page for tasks labeled `help wanted` or `good first issue`.
- If you want to implement a new feature, please open an Issue first to discuss its feasibility with the maintainers.

### 2. Write Tests
Ensure that you write unit tests or integration tests for your code. Test coverage is crucial for maintaining the stability of the project.

### 3. Update Documentation
If you modify the code, make sure to update relevant documentation (e.g., README, API docs).

---

## Code Style Guidelines

To maintain consistency across the codebase, please follow these guidelines:

### TypeScript
- Use [Prettier](https://prettier.io/) to format your code.
- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) for TypeScript.
- Run the linter to ensure your code adheres to the style guide:
  ```bash
  npm run lint   # or yarn lint
  ```

### TailwindCSS
- Follow the [TailwindCSS Best Practices](https://tailwindcss.com/docs/utility-first).
- Avoid writing custom CSS unless absolutely necessary. Use Tailwind's utility classes instead.

### Markdown
- Use clear heading levels (`#`, `##`, `###`).
- Keep lists, links, and code blocks consistent.

---

## Submitting a Pull Request (PR)

### 1. Commit Your Changes
Use clear and descriptive commit messages. We recommend following the [Conventional Commits](https://www.conventionalcommits.org/) standard:
```bash
git add .
git commit -m "feat: add new feature XYZ"
```
Common commit types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code formatting changes (no logic changes)
- `refactor`: Code refactoring
- `test`: Adding or modifying tests
- `chore`: Build process or tooling changes

### 2. Push to Your Fork
Push your changes to your remote repository:
```bash
git push origin feature/your-feature-name
```

### 3. Open a Pull Request
1. Go to your forked repository and click the **Compare & pull request** button.
2. Fill out the PR description with:
   - The purpose of the change.
   - Related Issue numbers (if applicable).
   - Test results.
3. Submit the PR and wait for the maintainers to review it.

---

## Reporting Bugs

If you find a bug, please report it by following these steps:
1. Check if there is already a similar [Issue](https://github.com/minorcell/hub-io/issues).
2. Create a new Issue with a concise title and detailed description of the problem.
3. Provide steps to reproduce the issue, error logs, or screenshots.

---

## Feature Requests

If you have an idea for a new feature:
1. Create a new Issue with the title prefixed by `[Feature Request]`.
2. Describe the feature's purpose, expected behavior, and its value.
3. Discuss with the maintainers before starting implementation.

---

## Questions and Discussions

If you have any questions or want to discuss project-related topics:
- Start a discussion in the [Discussions](https://github.com/minorcell/hub-io/discussions) section.
- Or leave a comment in the relevant Issue.

---

## Acknowledgements

We thank all contributors who have helped improve this project! Your efforts make this project better. Here is the list of contributors (automatically generated):
[![Contributors](https://contrib.rocks/image?repo=minorcell/hub-io)](https://github.com/minorcell/hub-io/graphs/contributors)

---

Thank you again for your support! Let's build something amazing together! 🚀

---

### Customization Notes:
- Replace `PROJECT_NAME` and `OWNER` with your actual project name and GitHub username.
- Adjust the tools and commands based on your project setup (e.g., `npm` vs. `yarn`).
- If your project uses additional tools (e.g., Husky for Git hooks), mention them in the **Getting Started** section.

Hope this helps! 😊
