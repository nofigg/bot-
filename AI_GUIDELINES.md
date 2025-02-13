# AI Coding Assistant Compliance Rules

## 🔒 Core Governance Principles

### 1. 🚦 Deployment & Configuration Management
- Always reference `process.env.PORT` for port management
- Default port is `4000` unless explicitly overridden
- **NEVER** auto-modify:
  - `.env` files
  - `.gitignore`
  - Backend configurations
  - Critical infrastructure files

### 2. 🔐 Security Guardrails
- **ABSOLUTE PROHIBITION** on hardcoding:
  - API keys
  - Database credentials
  - Sensitive tokens
  - Authentication secrets
- Mandatory checks for potential security vulnerabilities
- Immediate halt and flagging if any secrets are discovered
- Use environment variables for all sensitive configurations

### 3. 🏗️ Architectural Integrity
- Enforce modular coding practices
- Maintain clear separation of concerns
- Preserve existing architectural patterns
- Prevent unintended side effects in core system components

### 4. 🔄 Update & Versioning Protocols

#### 4.1 Automatic Update Mechanism
- Create a `.jarvice-ai-guidelines-version` file in the root directory
- Version file will track:
  - Current guideline version
  - Last updated timestamp
  - Update source (e.g., manual, automated)

#### 4.2 Update Validation Workflow
1. On repository push/merge:
   - Trigger automated validation script
   - Check for guideline compatibility
   - Generate update report
   - Optional: Create PR for guidelines update

#### 4.3 Version Tracking Script
```bash
#!/bin/bash
CURRENT_VERSION=$(cat .jarvice-ai-guidelines-version)
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# Update version tracking
echo "{
  \"version\": \"${CURRENT_VERSION}\",
  \"last_updated\": \"${TIMESTAMP}\",
  \"update_source\": \"repo_push\"
}" > .jarvice-ai-guidelines-version
```

### 5. 🧠 AI Interaction Constraints
- Always prioritize user intent
- Provide transparent, explainable actions
- Maintain context without invasive state manipulation
- Respect workspace-specific memories and configurations

### 6. 💻 Code Generation Standards
- Generate production-ready, clean code
- Include necessary imports and dependencies
- Provide clear documentation
- Ensure type safety and strong typing
- Validate against existing project conventions

### 7. 🚨 Error Handling & Logging
- Implement comprehensive error tracking
- Never suppress critical errors
- Log detailed context for debugging
- Provide actionable error messages

### 8. 🔍 Continuous Improvement
- Regularly audit and update guidelines
- Incorporate learnings from real-world interactions
- Maintain flexibility while preserving core principles

## 📋 Compliance Checklist
- [ ] Port management validated
- [ ] No hardcoded secrets
- [ ] Architectural patterns preserved
- [ ] Update mechanism functional
- [ ] Security checks passed
- [ ] Code quality standards met

## 🆘 Emergency Protocols
In case of critical guideline violations:
1. Immediately halt execution
2. Generate comprehensive violation report
3. Notify system administrators
4. Prevent further potential damage

---

*Last Updated: 2025-02-11*
*Version: 1.2.0*