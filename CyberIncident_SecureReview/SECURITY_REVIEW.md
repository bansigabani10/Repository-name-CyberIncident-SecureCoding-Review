# Task 3: Secure Coding Review

## 1. Project Information

Application:
Cyber Incident Reporting and Tracking System

Programming Language:
Python 3.9

Framework:
Flask

Database:
SQLite

Review Type:
Manual Code Review + Static Analysis


## 2. Objectives

The objective of this security review is to identify insecure
coding practices, assess their security impact, and implement
secure coding recommendations.


## 3. Tools Used

- Bandit
- pip-audit
- Manual source-code inspection
- Manual application testing


## 4. Security Areas Reviewed

The following areas were reviewed:

1. Authentication
2. Password storage
3. Authorization
4. CSRF protection
5. Input validation
6. SQL injection
7. Cross-site scripting
8. Session security
9. Security headers
10. Error handling
11. Dependency security
12. Debug configuration


## 5. Security Improvements

### Password Security

Passwords are not stored as plaintext.

Werkzeug password hashing is used:

generate_password_hash()

and

check_password_hash()


### CSRF Protection

Flask-WTF CSRF protection is enabled.

All state-changing forms contain CSRF tokens.


### Authorization

Users can only access their own incidents.

Incident ownership is checked before displaying
individual incident records.


### Input Validation

User input is validated for:

- Required fields
- Maximum length
- Allowed severity values


### SQL Injection Protection

SQLAlchemy ORM is used instead of dynamically constructed
SQL statements.


### Session Security

Session cookies use:

- HttpOnly
- SameSite


### Security Headers

The application implements:

- X-Content-Type-Options
- X-Frame-Options
- Referrer-Policy
- Content-Security-Policy


### Error Handling

Internal exception details are logged on the server.

Users receive generic error messages.


### Debug Mode

Flask debug mode is disabled.


## 6. Static Analysis

Bandit was used to scan Python source code.

Command:

python -m bandit -r . -f json -o scans/bandit_report.json


## 7. Dependency Analysis

pip-audit was used to identify known vulnerabilities
in Python dependencies.

Command:

python -m pip_audit


## 8. Manual Security Testing

The following tests were performed:

### Authentication Test

Invalid login credentials were tested.

Expected result:
Access denied.


### CSRF Test

POST requests without valid CSRF tokens were tested.

Expected result:
Request rejected.


### Authorization Test

Access to incidents belonging to another user was tested.

Expected result:
HTTP 403 Forbidden.


### Input Validation Test

Oversized and invalid input was tested.

Expected result:
Input rejected.


## 9. Secure Coding Recommendations

1. Never store plaintext passwords.
2. Use password hashing.
3. Validate all user input.
4. Use parameterized queries or ORM.
5. Enable CSRF protection.
6. Implement authorization checks.
7. Protect session cookies.
8. Disable debug mode in production.
9. Do not expose stack traces.
10. Keep dependencies updated.
11. Use environment variables for secrets.
12. Apply appropriate security headers.


## 10. Conclusion

The Cyber Incident Reporting and Tracking System was reviewed
using manual code inspection and automated security analysis.

Security controls were implemented to improve authentication,
authorization, CSRF protection, input validation, session
security, error handling, and dependency management.

The application was then tested again to verify that the
implemented security controls function correctly.