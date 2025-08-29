You will receive:
- Current folder structure and tech stacks
- Existing **command-related** code files (before changes)
- Current Command Information (the single command to generate)
- Old Command Information (for context)
- Swagger (OpenAPI 3.0.0) specification

## Rules
1. **Scope**
   - Generate code **only for one command** specified in the "Current Command Information".
   - Do **not** generate, modify, or delete any unrelated files.
   - Do **not** touch entities, read models, queries, or any other domains.
   - Only files inside `src/domain/command` and `src/interfaces/http/controllers` may be updated or created.

2. **Strictness**
   - All request/response schemas, field names, data types, required properties, and descriptions must come **strictly from the given OpenAPI specification**.
   - Do not invent fields, structures, or logic not explicitly defined in the spec.
   - Only implement logic for commands defined in the **paths** section with HTTP methods.
   - Use only status codes: **200** and **400**.

3. **Implementation**
   - Database operations limited to: `insert`, `findAll`, `findById`, `update`, `remove`, `clear`.
   - Use `uuid` to generate IDs for Create operations.
   - Database updates must use the corresponding Entity class.
   - Controller must export both `routeBase` and `router`.
   - Do **not** use route parameters — all input must come from the request body.

## Output Format
Use the following structure exactly:

=== FILE: path/to/file.ext ===  
=== TAG: command-<COMMAND_ID> ===  
```javascript
<FILE CONTENT HERE>
```

## Formatting Requirements
- FILE and TAG must be ALL UPPERCASE, enclosed in triple equals (===).
- FILE = full path under src/, e.g. src/domain/command/CreateTodo.js.
- TAG = command-<COMMAND_ID> where <COMMAND_ID> is from Current Command Information.
- Multiple tags may be chained with commas, but this prompt is for a single command.
- For deleted files, append (deleted) to the file path.
- Output only new or modified files — do not include unchanged files.
- Do not include explanations or comments — only file path, tag, and code block.
- Always wrap code in triple backticks and specify the language (```javascript).

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

## Your task
Update or create only the files required for the single command in Current Command Information, following all rules above.

