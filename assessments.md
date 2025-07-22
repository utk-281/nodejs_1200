# Node.js Assessment Answers

## 1. What is Node.js, and what JavaScript runtime does it use?

**Node.js** is an open-source, cross-platform runtime environment that allows you to run JavaScript code outside a web browser. It is primarily used for building fast and scalable server-side and networking applications. Node.js uses the **V8 JavaScript runtime engine**, which is the same engine that powers Google Chrome. The V8 engine compiles JavaScript directly to native machine code for fast execution.

## 2. Difference between User-Defined Modules and Built-in Modules in Node.js

- **User-Defined Modules**

  - These are modules you create yourself to organize and reuse code in your Node.js applications.
  - You can include them using `require("./moduleName")`.
  - **Example**:
    Suppose you have a file named `mathUtils.js`:
    ```js
    // mathUtils.js
    function add(a, b) {
      return a + b;
    }
    module.exports = add;
    ```
    Use in another file:
    ```js
    const add = require("./mathUtils");
    console.log(add(2, 3)); // 5
    ```

- **Built-in Modules**
  - These are modules provided by Node.js out-of-the-box, such as `fs`, `http`, `path`, etc.
  - You can include them using `require("moduleName")`.
  - **Example**:
    ```js
    const fs = require("fs");
    fs.writeFileSync("example.txt", "Hello, Node.js!");
    ```

## 3. Script: Read a File and Log Its Contents (Sync)

```js
const fs = require("fs");
const data = fs.readFileSync("filename.txt", "utf8");
console.log(data);
```

- Replace `'filename.txt'` with the file you want to read.
- The content will be printed to the console.

## 4. What is the Role of the Event Loop in Node.js?

The **event loop** is a core feature in Node.js that allows handling of asynchronous, non-blocking operations. It enables Node.js to perform I/O operations (like reading files, handling network requests) without blocking the main thread. The event loop listens for events and executes callback functions when those events are triggered. This makes Node.js highly efficient for building scalable applications.

## 5. Callback Queue and Event Loop in Asynchronous Operations

When an asynchronous operation (such as reading a file) completes, its callback function is placed in the **callback queue** (or task queue). The event loop continuously checks the call stack and, if it is empty, takes the first callback from the queue and pushes it onto the stack, allowing it to be executed. This mechanism enables Node.js to process multiple I/O operations efficiently without waiting for each to finish before moving to the next.

## 6. Function: Read Two Files, Concatenate, and Write to a New File (Sync)

```js
const fs = require("fs");

function concatenateFiles(file1, file2, outputFile) {
  try {
    const data1 = fs.readFileSync(file1, "utf8");
    const data2 = fs.readFileSync(file2, "utf8");
    const result = data1 + data2;
    fs.writeFileSync(outputFile, result);
    console.log("Files concatenated and written successfully.");
  } catch (err) {
    console.error("Error:", err.message);
  }
}

// Usage example:
// concatenateFiles('file1.txt', 'file2.txt', 'output.txt');
```

## 7. Difference Between `require()` (CommonJS) and `import` (ESM)

| Feature        | `require()` (CommonJS)       | `import` (ESM)                                     |
| -------------- | ---------------------------- | -------------------------------------------------- |
| Syntax         | `const fs = require('fs')`   | `import fs from 'fs'`                              |
| Loading        | Synchronously at runtime     | Statically at compile time                         |
| File Extension | `.js` by default             | Uses `.mjs` or `"type":"module"` in `package.json` |
| Usage          | Used in most older codebases | Modern ES6+ modules                                |
| Exports        | `module.exports`             | `export` / `export default`                        |

- `require()` is the traditional way Node.js included modules (CommonJS).
- `import` is based on ES Module syntax, now supported in Node.js with some configuration.

## 8. Handling Errors in Synchronous fs Operations

To prevent your process from crashing due to errors with synchronous file system operations (like `readFileSync`), wrap the code in a **try-catch block**:

```js
const fs = require("fs");

try {
  const data = fs.readFileSync("file.txt", "utf8");
  console.log(data);
} catch (err) {
  console.error("File read error:", err.message);
  // Handle or log the error gracefully
}
```

This way, if an error occurs (such as file not found), it can be handled gracefully without crashing the application.

## 9. Node.js Script: Arithmetic Operations and Write Results to File

```js
const fs = require("fs");

const a = 10;
const b = 5;

const results = [];
results.push(`Addition: ${a + b}`);
results.push(`Subtraction: ${a - b}`);
results.push(`Multiplication: ${a * b}`);

if (b === 0) {
  results.push("Division: Error: Division by zero");
} else {
  results.push(`Division: ${a / b}`);
}

try {
  fs.writeFileSync("results.txt", results.join("\n"));
  console.log("Results written to results.txt");
} catch (err) {
  console.error("Error writing file:", err.message);
}
```

- This code performs the arithmetic, handles division by zero, and writes the results to `results.txt` as required.
