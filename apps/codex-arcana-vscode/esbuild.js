const copyPlugin = require('esbuild-plugin-copy');
const esbuild = require('esbuild');

const production = process.argv.includes('--production');
const watch = process.argv.includes('--watch');

async function main() {
  const ctx = await esbuild.context({
    entryPoints: ['src/extension.ts'],
    bundle: true,
    format: 'cjs',
    minify: production,
    sourcemap: !production,
    sourcesContent: false,
    platform: 'node',
    outfile: '../../dist/apps/codex-arcana-vscode/extension.js',
    external: ['vscode'],
    logLevel: 'silent',
    plugins: [
      copyPlugin.copy({
        // this is equal to process.cwd(), which means we use cwd path as base path to resolve `to` path
        // if not specified, this plugin uses ESBuild.build outdir/outfile options as base path.
        resolveFrom: 'cwd',
        assets: [{
          from: ['./package.json',],
          to: ['../../dist/apps/codex-arcana-vscode'],
        },
        {
          from: ['./assets/**/*',],
          to: ['../../dist/apps/codex-arcana-vscode/assets'],
        }
        ],
        watch,
      }),
    ],
  });
  if (watch) {
    await ctx.watch();
  } else {
    await ctx.rebuild();
    await ctx.dispose();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
