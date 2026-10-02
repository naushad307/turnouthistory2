import fs from 'fs';
const url = (process.env.BACKEND_URL || '').trim().replace(/\/$/, '');
const value = JSON.stringify(url);
fs.writeFileSync('public/config.js', `window.APP_CONFIG = { BACKEND_URL: ${value} };\n`);
console.log(`Generated public/config.js with BACKEND_URL=${url || '(same-origin)'}`);
