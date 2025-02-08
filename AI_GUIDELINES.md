# AI Coding Assistant Compliance Rules
1. Always reference `process.env.PORT` for port management.
2. Do NOT auto-modify `.env`, `.gitignore`, or backend configurations.
3. Enforce modular coding practices and maintain architecture integrity.

# 🚀 Jarvice AI Compliance & Governance

## 🎯 Objective:
Windsurf must consolidate all compliance rules into a single structured prompt sheet that enforces AI governance, security, modularity, and best practices across the Jarvice project.

## 🔥 Execution Task
1. **Port Management**:
   - DO NOT modify, introduce, or auto-change ports unless explicitly instructed.
   - Always reference `process.env.PORT`, with `4000` as the default unless overridden via `.env`.

2. **Security Best Practices**:
   - DO NOT hardcode API keys, database credentials, or sensitive tokens. Ensure these are only stored in `.env` files.
   - Check for any hardcoded secrets, credentials, or API keys in the codebase. If found, halt execution and flag them.
   - Ensure HTTPS is enforced in any AI-generated backend configurations.
   - If modifying authentication flows, enforce industry-standard security measures (OAuth, JWT, hashed passwords).
   - Ensure all API endpoints use proper input validation and sanitize user inputs to prevent injection attacks.

3. **Repository Structure & Best Practices**:
   - AI-generated code must follow modular architecture—no monolithic, unstructured code blocks.
   - Ensure every function has proper JSDoc comments and explanations.
   - AI should NEVER generate duplicate functions, redundant logic, or conflicting implementations.
   - If generating a new feature, create an appropriate test file (`.test.js` or equivalent) to validate behavior.
   - Check that AI-generated documentation aligns with existing project conventions.

4. **Documentation Enforcement**:
   - README.md must always include up-to-date developer setup instructions.
   - Ensure AI-generated updates do not overwrite existing contributor documentation.
   - If new API routes or features are introduced, automatically update `API_DOCS.md`.

## 🚀 Execution Order
1. Compile all existing compliance rules into one structured sheet.
2. Ensure all AI-driven changes follow this compliance sheet.
3. If AI-generated changes violate the rules, halt execution and flag the issue.
4. Maintain continuous enforcement across all AI-assisted modifications.