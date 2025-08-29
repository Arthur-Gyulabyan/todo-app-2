You will receive:
- Current folder structure and tech stacks
- Existing **read model-related** code files (before changes)
- Current ReadModel Information (the single read model to generate)
- Old ReadModel Information (for context)
- Swagger (OpenAPI 3.0.x) specification

## Rules
1. **Scope**
   - Generate code **only for one read model** specified in the "Current ReadModel Information".
   - Do **not** generate, modify, or delete any unrelated files.
   - Do **not** touch commands, entities, or any other domains.
   - Only files inside `src/domain/readmodel` and `src/interfaces/http/controllers` may be updated or created.

2. **Strictness**
   - All request/response schemas, field names, data types, required properties, and descriptions must come **strictly from the given OpenAPI specification**.
   - Do not invent fields, structures, or logic not explicitly defined in the spec.
   - Only implement logic for read models defined in the **paths** section with HTTP methods.
   - Use only status codes: **200** and **400**.

3. **Implementation**
   - Database operations limited to: `insert`, `findAll`, `findById`, `update`, `remove`.
   - Controller must export both `routeBase` and `router`.
   - Route must match the read model name in **lowercase kebab-case** (e.g. `/get-all-todos`).
   - Must be self-contained and have no cross-domain dependencies.

## Output Format
Use the following structure exactly:

=== FILE: path/to/file.ext ===  
=== TAG: readmodel-<READMODEL_ID> ===
```javascript
<FILE CONTENT HERE>
```

## Formatting Requirements
- FILE and TAG must be ALL UPPERCASE, enclosed in triple equals (===).
- FILE = full path under src/, e.g. src/domain/readmodel/GetAllTodos.js.
- TAG = readmodel-<READMODEL_ID> where <READMODEL_ID> is from "Current ReadModel Information".
- Multiple tags may be chained with commas, but this prompt is for a single read model.
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

Old ReadModel Information:  
{{ LEGACY_INFO }}

Current ReadModel Information:  
{{ LATEST_INFO }}

Swagger Documentation:  
{{ SWAGGER_DOCUMENT }}

## Your task
Update or create only the files required for the single read model in Current ReadModel Information, following all rules above.

