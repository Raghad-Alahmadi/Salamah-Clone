// filepath: esbuild.js
const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['src/main.ts'],
    bundle: true,
    outfile: 'dist/main.js',
    platform: 'browser',
    sourcemap: true,
}).catch(() => process.exit(1));