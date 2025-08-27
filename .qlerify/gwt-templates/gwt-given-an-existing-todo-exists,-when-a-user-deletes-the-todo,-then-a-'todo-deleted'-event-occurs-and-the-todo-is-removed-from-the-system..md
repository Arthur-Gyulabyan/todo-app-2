Generate the following:

1. A .feature file with a scenario based on the Given-When-Then statement
   A scenario statement must be exactly same with Given-When-Then statement
2. A matching .test.js file using jest-cucumber and supertest
3. Use ES Modules only (no require). Use import.meta.url and path.resolve() to load the feature file.
4. Name each test file using a combination of the event description and description of the Given-When-Then statement.
5. The current date is {{ CURRENT_DATE }}.

Rules for data setup:
- Never assume that a todo item already exists in the system unless explicitly stated
- Always create necessary test data by calling the appropriate API endpoints
- Do not hardcode ID values like "1" — instead, store the ID returned from the creation response and reuse it in later steps

Assumptions:
- Express app is exported from src/bootstrap/app.js
- The test file is co-located with the feature file
- The test file and the feature file are located in `tests/` folder
- Use real API requests/responses that match the OpenAPI 3.0.3 spec

OpenAPI Specification:  
{{ SWAGGER_DOCUMENT }}

Code Template:  
{{ EXAMPLE_CODE }}

Old Given-When-Then Information:  
{{ LEGACY_INFO }}

Current Given-When-Then Information:  
{{ LATEST_INFO }}

Format:  
=== FILE: tests/path/to/file.ext ===  
=== TAG: gwt-<Given-When-Then ID> ===
```javascript
< FILE CONTENT HERE >
```
