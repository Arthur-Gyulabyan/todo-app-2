You will receive the following:
- The current folder structure and tech stacks
- Existing command-related code files before changes
- A summary of the command changes

Your Rule:  
All request and response schemas, field names, data types, required properties, and descriptions must be strictly derived from the given OpenAPI 3.0.3 specification. Do not invent any data or structure not explicitly defined in the spec. Only implement logic for commands defined in the paths section with HTTP methods
Use only 200 and 400 as response status code.

Your task:
1. Generate clean, self-contained command code reflecting the latest updates.
2. Do NOT include any unchanged files.
3. Ensure:
    - Only command-related code files can be created/updated/deleted.
    - Place code in: `src/domain/command`, `src/interfaces/http/controllers`
    - Do not touch entity or read model code.
    - Must be self-contained and have no cross-domain dependencies.
    - Use only database functions: insert, findAll, findById, update, remove and clear.
    - Use `uuid` to generate IDs for Create operations.
    - Controller must export both `routeBase` and `router`.
    - Do not use route parameters — only body-based data allowed.
    - When updating the database, you must use entity class.

Format:  
=== FILE: path/to/file.ext ===  
=== TAG: command-<COMMAND_ID> ===  
```javascript
< FILE CONTENT HERE >
```

- The `FILE` and `TAG` headers must be written in all uppercase letters, enclosed with triple equals signs (===), exactly as shown.
- Each prefix should be followed by an **given** ID from the "Current Command Information" section, and both should be joined using a hyphen (-).
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

Old Command Information:  
{{ LEGACY_INFO }}

Current Command Information:  
{{ LATEST_INFO }}

Swagger Documentation:  
{{ SWAGGER_DOCUMENT }}

Update the given code files or create new ones if needed.
Output only the updated or newly added code files, excluding any unchanged content.
