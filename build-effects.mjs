import { build } from 'esbuild';
await build({entryPoints:['src/effects.jsx'],bundle:true,outfile:'dist/effects.js',format:'iife',minify:true,jsx:'automatic',legalComments:'eof',target:['es2020'],define:{'process.env.NODE_ENV':'"production"'}});
console.log('Galaxy and GlassSurface bundled locally.');
