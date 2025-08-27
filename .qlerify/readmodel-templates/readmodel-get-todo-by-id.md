You will receive the following:
- The current folder structure and tech stacks
- Existing read model-related code files before changes
- A summary of the read model changes

Your Rule:  
All request and response schemas, field names, data types, required properties, and descriptions must be strictly derived from the given OpenAPI 3.0.3 specification. Do not invent any data or structure not explicitly defined in the spec. Only implement logic for commands defined in the paths section with HTTP methods

Your task:  
1. Generate clean, self-contained read model code reflecting the latest changes.
2. Do NOT include any unchanged files.
3. Ensure:
    - Only read model-related code files can be created/updated/deleted.
    - Place code in: `src/domain/readmodel`, `src/interfaces/http/controllers`
    - Do not touch command or entity code.
    - Must be self-contained and have no cross-domain dependencies.
    - Use only database functions: insert, findAll, findById, update, remove.
    - Controller must export both `routeBase` and `router`.
    - Route must match read model name in lowercase and kebab-case (e.g., '/get-all-todos').
4. Must align with Swagger documentation.

Format:  
=== FILE: path/to/file.ext ===  
=== TAG: readmodel-<READMODEL_ID> ===
```javascript
< FILE CONTENT HERE >
```

- The `FILE` and `TAG` headers must be written in all uppercase letters, enclosed with triple equals signs (===), exactly as shown.
- Each prefix should be followed by an **given** ID from the "Current ReadModel Information" section, and both should be joined using a hyphen (-).
  Multiple such tags can be chained together, separated by comma.
- For only deleted code files, add `(deleted)` string at the end of the file path after space.
- Output only the modified or new files — do not include unchanged files.
- No explanation or comments, only file path, tag and code content using the above format.
- Wrap code blocks with triple backticks (` ``` `), specifying the appropriate language.
- Entity name is PascalCased.
- Generate code that strictly matches the provided Swagger (OpenAPI) documentation.

Tech Stacks:  
{{ TECH_STACKS }}

Folder Structure:  
{{ FOLDER_STRUCTURE }}

Route Code:  
=== FILE: root/src/routes/index.js ===
```javascript
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const controllersPath = path.join(__dirname, '../interfaces/http/controllers');

const files = fs.readdirSync(controllersPath);

for (const file of files) {
  if (!file.endsWith('.js')) continue;

  const modulePath = pathToFileURL(path.join(controllersPath, file)).href;
  const controller = await import(modulePath);

  if (controller.default?.router && controller.default?.routeBase) {
    router.use(controller.default.routeBase, controller.default.router);
  }
}

export default router;
```

Example Code:  
{{ EXAMPLE_CODE }}

Old Files:  
{{ ORIGINAL_FILES }}

Old ReadModel Information:  
{{ LEGACY_INFO }}

Current ReadModel Information:  
{{ LATEST_INFO }}

Swagger Documentation:  
{{ SWAGGER_DOCUMENT }}

Update the given code files or create new ones if needed.
Output only the updated or newly added code files, excluding any unchanged content.
