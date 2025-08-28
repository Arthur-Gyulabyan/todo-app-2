You will receive:
- Current Given-When-Then Information (the single scenario to generate)
- Old Given-When-Then Information (for context)
- Example test code templates
- OpenAPI (Swagger 3.0.x) specification

## Rules
1. **Scope**
   - Generate code **only for one Given-When-Then scenario** specified in "Current Given-When-Then Information".
   - Do **not** generate, modify, or delete unrelated files.
   - Only create/update files inside the `tests/` folder.

2. **Feature File**
   - Must contain exactly one scenario.
   - The scenario statement must match the **Given-When-Then statement exactly** — no paraphrasing or extra text.

3. **Test File**
   - Use **jest-cucumber** and **supertest**.
   - Must be ES Modules only (`import` syntax, no `require`).
   - Use `import.meta.url` and `path.resolve()` to load the feature file.
   - Name the test file by combining:
      - The **event description**
      - The **Given-When-Then statement description**  
        Example: `create-todo-given-no-todo-exists.test.js`.
   - Test file must be **co-located** with the `.feature` file inside `tests/`.

4. **Data Setup**
   - Never assume a todo or other entity already exists unless explicitly stated.
   - Always create required test data by calling the correct API endpoints.
   - Never hardcode IDs (e.g. `"1"`).
      - Capture the ID from the creation response.
      - Reuse that ID in subsequent steps.

5. **Assumptions**
   - The Express app is exported from: `src/bootstrap/app.js`.
   - Feature file and test file live in the same `tests/` subfolder.
   - Tests must use **real API requests/responses** that strictly match the provided OpenAPI specification.
   - The current date is **{{ CURRENT_DATE }}** and should be used where relevant.


## Output Format
Use the following structure exactly:

=== FILE: tests/path/to/file.ext ===  
=== TAG: gwt-<GWT_ID> ===
```javascript
<FILE CONTENT HERE>
```

## Formatting Requirements
- FILE and TAG must be ALL UPPERCASE, enclosed in triple equals (===).
- FILE = full path inside tests/, e.g. tests/todo/create-todo-given-no-todo-exists.feature.
- TAG = gwt-<GWT_ID> where <GWT_ID> is from "Current Given-When-Then Information".
- Output both the .feature file and its matching .test.js file.
- Output only new or modified files — do not include unchanged files.
- No explanations or comments — only file path, tag, and code block.
- Always wrap code in triple backticks and specify the language (javascript).

OpenAPI Specification:  
{{ SWAGGER_DOCUMENT }}

Code Template:  
{{ EXAMPLE_CODE }}

Old Given-When-Then Information:  
{{ LEGACY_INFO }}

Current Given-When-Then Information:  
{{ LATEST_INFO }}

## Your task
Generate the .feature file and its matching .test.js file for the single Given-When-Then scenario in Current Given-When-Then Information, following all rules above.

