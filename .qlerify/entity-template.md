You will receive:
- Current folder structure and tech stacks
- Existing **entity-related** code files (before changes)
- Current Entity Information (the single entity to generate)
- Old Entity Information (for context)
- Swagger (OpenAPI 3.0.0) specification

## Rules
- Generate code for **one entity only** (from "Current Entity Information").
- All field names, types, required properties, and descriptions must come strictly from the provided OpenAPI spec.
- Do not invent or include any data, methods, or files not in the spec.
- Implement only entity logic; no commands, controllers, or read models.
- Each entity must reside in `src/domain/entity`.
- Do not output unchanged files.
- Entities must be self-contained and must not import from other domains.
- Use `uuid` for generating IDs where required.
- Always store the internal primary key as `id` and also expose the API field name (e.g., `todoID`) in the response.
- Match the provided example coding style.
- Code must be compatible with Swagger (OpenAPI) schemas.

## Output Format
Use the following structure exactly:

=== FILE: path/to/file.ext ===  
=== TAG: entity-<ENTITY_ID> ===
```javascript
<FILE CONTENT HERE>
```

## Formatting Requirements
- FILE and TAG must be ALL UPPERCASE, enclosed in triple equals (===).
- FILE = full path under src/, e.g. src/domain/entity/Todo.js.
- TAG = entity-<ENTITY_ID> where <ENTITY_ID> is from Current Entity Information.
- Multiple tags may be chained with commas, but this prompt is for a single entity.
- For deleted files, append (deleted) to the file path.
- Output only new or modified files — do not include unchanged files.
- Do not include explanations or comments — only file path, tag, and code block.
- Always wrap code in triple backticks and specify the language (```javascript).

Tech Stacks:  
{{ TECH_STACKS }}

Folder Structure:  
{{ FOLDER_STRUCTURE }}

Example Code:  
{{ EXAMPLE_CODE }}

Old Files:  
{{ ORIGINAL_FILES }}

Old Entity Information:  
{{ LEGACY_INFO }}

Current Entity Information:  
{{ LATEST_INFO }}

Swagger Documentation:  
{{ SWAGGER_DOCUMENT }}

## Your task
Update or create only the files required for the single entity in Current Entity Information, following all rules above.

