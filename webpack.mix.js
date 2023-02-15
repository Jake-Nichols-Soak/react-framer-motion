const mix = require('laravel-mix');
const path = require('path');
const git = require('git-last-commit');
const {zip} = require('zip-a-folder');

require('laravel-mix-postcss-config');
require('laravel-mix-replace-in-file');

// Config
mix.setPublicPath('dist');
mix.options({manifest: false});

mix.alias({
  '@': path.resolve(__dirname, 'src'),
  '@data': path.resolve(__dirname, 'data'),
});

// Code Splitting
mix.webpackConfig({
  output: {
    chunkFilename: `${process.env.JS_CHUNK_PATH || ''}chunks/[name].js`,
  },
});

// Build
mix.js('src/soak-embed.js', 'dist')
  .react()
  .postCssConfig({
    postcssOptions: {
      plugins: [
        require('tailwindcss'),
        require('postcss-prepend-selector')({selector: '[data-soak-widget] '})
      ]
    }
  });

// Watch
mix.browserSync({
  open: false,
  ui: false,
  server: {
    baseDir: 'dist',
  }
});

mix.copy('assets', 'dist/assets');
mix.copy('data/*.json', 'dist/data/');
mix.copy('index.html', 'dist/');

// Deployment
if (mix.inProduction()) {
  mix.replaceInFile({
    files: ['dist/index.html', 'dist/index-*.html'],
    from: /http:\/\/localhost:8080\//g,
    to: './'
  });

  mix.then(() => {
    if (!process.env.NETLIFY) {
      git.getLastCommit(async (err, commit) => {
        await zip('dist', `bundle-${commit.shortHash}.zip`);
      });
    }
  });
}
