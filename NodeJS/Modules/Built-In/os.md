# Node.js OS Module - Complete Tutorial for Students

The **OS module** in Node.js provides powerful utilities for interacting with the operating system. This module gives you access to system information like CPU details, memory usage, platform information, and much more[1][2][3].

## Getting Started

### How to Import the OS Module

The OS module is a **built-in core module** in Node.js, so no installation is required[1][2]. You can import it using either method:

**CommonJS (Traditional Method):**

```javascript
const os = require("os");
```

**ES Modules (Modern Method):**

```javascript
import os from "os";
```

## Essential OS Module Methods

### 1. System Information Methods

**Get CPU Architecture:**

```javascript
const os = require("os");

console.log("CPU Architecture:", os.arch());
// Output: x64, arm, arm64, etc.
```

**Get Operating System Platform:**

```javascript
console.log("Platform:", os.platform());
// Output: win32, darwin, linux, etc.
```

**Get OS Type and Release:**

```javascript
console.log("OS Type:", os.type());
// Output: Windows_NT, Darwin, Linux

console.log("OS Release:", os.release());
// Output: Version information
```

### 2. System Resources Methods

**Memory Information:**

```javascript
// Total system memory in GB
const totalMemGB = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2);
console.log("Total Memory:", totalMemGB + " GB");

// Free system memory in GB
const freeMemGB = (os.freemem() / (1024 * 1024 * 1024)).toFixed(2);
console.log("Free Memory:", freeMemGB + " GB");
```

**System Uptime:**

```javascript
// System uptime in hours
const uptimeHours = (os.uptime() / 3600).toFixed(2);
console.log("System Uptime:", uptimeHours + " hours");
```

### 3. User and Network Information

**User Information:**

```javascript
const userInfo = os.userInfo();
console.log("Current User:", userInfo.username);
console.log("Home Directory:", os.homedir());
```

**Hostname:**

```javascript
console.log("Hostname:", os.hostname());
```

**CPU Information:**

```javascript
const cpus = os.cpus();
console.log("Number of CPU Cores:", cpus.length);
console.log("CPU Model:", cpus[0].model);
console.log("CPU Speed (MHz):", cpus[0].speed);
```

**Network Interfaces:**

```javascript
const networkInterfaces = os.networkInterfaces();
console.log("Available Network Interfaces:", Object.keys(networkInterfaces));
```

## Complete Example for Students

Here's a comprehensive example that demonstrates most OS module methods[1][4][2]:

```javascript
// Import the OS module
const os = require("os");

console.log("=== SYSTEM INFORMATION ===");
console.log("OS Platform:", os.platform());
console.log("OS Type:", os.type());
console.log("OS Release:", os.release());
console.log("CPU Architecture:", os.arch());
console.log("Hostname:", os.hostname());

console.log("\n=== MEMORY INFORMATION ===");
const totalMemGB = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2);
const freeMemGB = (os.freemem() / (1024 * 1024 * 1024)).toFixed(2);
console.log(`Memory: ${freeMemGB}GB free of ${totalMemGB}GB`);

console.log("\n=== USER INFORMATION ===");
const userInfo = os.userInfo();
console.log("Current User:", userInfo.username);
console.log("Home Directory:", os.homedir());

console.log("\n=== SYSTEM PERFORMANCE ===");
const uptimeHours = (os.uptime() / 3600).toFixed(2);
console.log("System Uptime:", uptimeHours + " hours");

console.log("\n=== CPU INFORMATION ===");
const cpus = os.cpus();
console.log("Number of CPU Cores:", cpus.length);
console.log("CPU Model:", cpus[0].model);
console.log("CPU Speed (MHz):", cpus[0].speed);

console.log("\n=== NETWORK INTERFACES ===");
const networkInterfaces = os.networkInterfaces();
console.log("Available Network Interfaces:", Object.keys(networkInterfaces));

console.log("\n=== OTHER USEFUL INFO ===");
console.log("End-of-line marker:", JSON.stringify(os.EOL));
console.log("Temporary directory:", os.tmpdir());
```

## Practical Use Cases for Students

### 1. System Monitoring Application

```javascript
const os = require("os");

function getSystemStats() {
  return {
    platform: os.platform(),
    freeMemory: (os.freemem() / (1024 * 1024 * 1024)).toFixed(2) + " GB",
    totalMemory: (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2) + " GB",
    uptime: (os.uptime() / 3600).toFixed(2) + " hours",
    cpuCount: os.cpus().length,
  };
}

console.log("Current System Stats:", getSystemStats());
```

### 2. Cross-Platform File Paths

```javascript
const os = require("os");
const path = require("path");

// Get user's desktop path in a cross-platform way
const desktopPath = path.join(os.homedir(), "Desktop");
console.log("Desktop Path:", desktopPath);

// Check platform and do platform-specific operations
if (os.platform() === "win32") {
  console.log("Running on Windows");
} else if (os.platform() === "darwin") {
  console.log("Running on macOS");
} else {
  console.log("Running on Linux/Unix");
}
```
