You will receive the following:
- The current folder structure and tech stacks
- Existing entity-related code files before changes
- A summary of the entity changes

Your Rule:  
All request and response schemas, field names, data types, required properties, and descriptions must be strictly derived from the given OpenAPI 3.0.0 specification.
Do not invent any data or structure not explicitly defined in the spec.
Only implement logic for commands defined in the paths section with HTTP methods
For fields that are $ref to existing schemas, assume the corresponding entity class already exists under `src/domain/entity/` and import it.

Your task:
1. Generate clean, self-contained entity code reflecting the latest updates.
2. Do NOT include any unchanged files.
3. Ensure:
    - Only entity-related code files can be created/updated.
    - Each entity must reside in `src/domain/entity`
    - No references to command or read model code.
    - Entity code must follow the example coding style.
    - Must be self-contained and have no imports from other domains.
    - Must be compatible with Swagger specifications.
    - Use `uuid` for generating IDs where needed.
    - Always store the primary key as `id` internally and expose both `id` and its original API field name in the response.

Format:  
=== FILE: path/to/file.ext ===  
=== TAG: entity-<ENTITY_ID> ===
```javascript
< FILE CONTENT HERE >
```

- The `FILE` and `TAG` headers must be written in all uppercase letters, enclosed with triple equals signs (===), exactly as shown.
  Each prefix should be followed by an **given** ID from the "Current Entity Information" section, and both should be joined using a hyphen (-).
  Multiple such tags can be chained together, separated by comma.
- Output only the modified or new files — do not include unchanged files.
- No explanation or comments, only file path, tag and code content using the above format.
- Wrap code blocks with triple backticks (` ``` `), specifying the appropriate language.
- Generate code that strictly matches the provided Swagger (OpenAPI) documentation.

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

Update the given code files or create new ones if needed.
Output only the updated or newly added code files, excluding any unchanged content.
