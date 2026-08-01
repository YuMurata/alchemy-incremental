#!/usr/bin/env node
const fs = require('fs');

try {
  if (fs.existsSync('docs/design/engine/00_概念設計書.md') && 
      fs.existsSync('docs/design/engine/01_基本設計書.md') && 
      fs.existsSync('docs/design/engine/02_システム設計書.md')) {
    console.log('Design documents found. Validation passed.');
    process.exit(0);
  } else {
    console.error('Design document(s) not found.');
    process.exit(1);
  }
} catch (e) {
  console.error(e);
  process.exit(1);
}
