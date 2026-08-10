#!/usr/bin/env node
var fs = require('fs')
var tailwindcss = require('tailwindcss')
var autoprefixer = require('autoprefixer')
var postcss = require('postcss')

async function main() {
  var config = {
    plugins: [
      tailwindcss({
        content: [
          './index.html',
          './src/**/*.css',
          './src/**/*.js',
          './src/**/*.jsx',
          './src/**/*.jsm',
        ],
        theme: {
          extend: {
            colors: {
              console: {
                50: '#0f172a',
                900: '#020617',
                accent: '#06b6d4',
                accentHover: '#0891b2',
                accentDim: '#0f172a',
                card: '#0e1019',
                cardHover: '#111724',
              },
            },
            fontFamily: {
              monospace: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
              sans: ['"Inter"', 'system-ui', 'sans-serif'],
            },
          },
        },
      }),
      autoprefixer(),
    ],
  }

  var output = await postcss.process(fs.readFileSync('./src/index.css', 'utf8'), config)
  fs.writeFileSync('./dist/styles.css', output.toString())
  var content = output.toString()
  var size = content.length
  console.log('Tailwind compiled! Output: ' + size + ' bytes')
  var count = (content.match(/bg-gray-800/gi) || []).length
  console.log('bg-gray-800 matches: ' + count)
}

main().catch(function(e) {
  console.error('Error:', e.message)
  process.exit(1)
})
