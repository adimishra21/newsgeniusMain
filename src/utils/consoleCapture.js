/**
 * Utility to capture console.log output in development environment
 * This helps users see the password reset links when actual emails aren't sent
 */

let consoleOutput = [];
const MAX_LOGS = 50;

// Only initialize in development environment
if (process.env.NODE_ENV === 'development') {
  // Store original console methods
  const originalConsoleLog = console.log;
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;
  const originalConsoleInfo = console.info;

  // Override console.log
  console.log = function() {
    // Call original console.log
    originalConsoleLog.apply(console, arguments);
    
    // Store log in our array
    const logText = Array.from(arguments).map(arg => {
      if (typeof arg === 'object') {
        try {
          return JSON.stringify(arg);
        } catch (e) {
          return String(arg);
        }
      }
      return String(arg);
    }).join(' ');
    
    consoleOutput.push({ type: 'log', text: logText });
    
    // Keep array size limited
    if (consoleOutput.length > MAX_LOGS) {
      consoleOutput.shift();
    }
    
    // Update displayed logs if element exists
    updateConsoleDisplay();
  };

  // Override console.error
  console.error = function() {
    // Call original console.error
    originalConsoleError.apply(console, arguments);
    
    // Store error in our array
    const errorText = Array.from(arguments).map(arg => {
      if (typeof arg === 'object') {
        try {
          return JSON.stringify(arg);
        } catch (e) {
          return String(arg);
        }
      }
      return String(arg);
    }).join(' ');
    
    consoleOutput.push({ type: 'error', text: errorText });
    
    // Keep array size limited
    if (consoleOutput.length > MAX_LOGS) {
      consoleOutput.shift();
    }
    
    // Update displayed logs if element exists
    updateConsoleDisplay();
  };
}

// Update console display element if it exists
function updateConsoleDisplay() {
  const consoleDisplayElement = document.querySelector('.console-output');
  if (consoleDisplayElement) {
    // Filter for password reset links
    const resetLinks = consoleOutput
      .filter(log => log.text.includes('Password reset link:'))
      .map(log => log.text)
      .join('\n');
    
    consoleDisplayElement.textContent = resetLinks;
  }
}

// Create a console display element
export function createConsoleDisplay() {
  // Only in development mode
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  
  // Check if element already exists
  if (document.querySelector('.console-output')) {
    return;
  }
  
  // Create hidden console output element
  const consoleDisplayElement = document.createElement('div');
  consoleDisplayElement.className = 'console-output';
  consoleDisplayElement.style.display = 'none';
  document.body.appendChild(consoleDisplayElement);
  
  // Initial update
  updateConsoleDisplay();
}

// Get captured console output
export function getCapturedConsoleOutput() {
  return consoleOutput;
}

// Get password reset links from console output
export function getPasswordResetLinks() {
  return consoleOutput
    .filter(log => log.text.includes('Password reset link:'))
    .map(log => {
      const match = log.text.match(/Password reset link: (http:\/\/[^\s]+)/);
      return match ? match[1] : null;
    })
    .filter(Boolean);
}

export default {
  createConsoleDisplay,
  getCapturedConsoleOutput,
  getPasswordResetLinks
}; 