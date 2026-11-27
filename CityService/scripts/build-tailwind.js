const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const projectDir = path.resolve(__dirname, '..');
const inputFile = path.join(projectDir, 'src', 'tailwind.css');
const rawFile = path.join(projectDir, 'css', 'tailwind.raw.css');
const outputFile = path.join(projectDir, 'css', 'tailwind.css');
const cliFile = path.join(projectDir, 'node_modules', '@tailwindcss', 'cli', 'dist', 'index.mjs');
const watchMode = process.argv.includes('--watch');
let timer;

function findBlockEnd(css, openIndex) {
  let depth = 1;
  let quote = null;
  let inComment = false;

  for (let i = openIndex + 1; i < css.length; i++) {
    const current = css[i];
    const next = css[i + 1];

    if (inComment) {
      if (current === '*' && next === '/') {
        inComment = false;
        i++;
      }
      continue;
    }

    if (quote) {
      if (current === '\\') i++;
      else if (current === quote) quote = null;
      continue;
    }

    if (current === '/' && next === '*') {
      inComment = true;
      i++;
    } else if (current === '"' || current === "'") {
      quote = current;
    } else if (current === '{') {
      depth++;
    } else if (current === '}' && --depth === 0) {
      return i;
    }
  }

  throw new Error('Bloco CSS não foi fechado corretamente.');
}

function removeLayerWrappers(css) {
  let result = '';
  let i = 0;

  while (i < css.length) {
    if (css.startsWith('/*', i)) {
      const end = css.indexOf('*/', i + 2);
      const safeEnd = end === -1 ? css.length : end + 2;
      result += css.slice(i, safeEnd);
      i = safeEnd;
      continue;
    }

    if (css[i] === '"' || css[i] === "'") {
      const quote = css[i];
      const start = i++;
      while (i < css.length) {
        if (css[i] === '\\') i += 2;
        else if (css[i++] === quote) break;
      }
      result += css.slice(start, i);
      continue;
    }

    if (css.startsWith('@layer', i) && !/[\w-]/.test(css[i + 6] || '')) {
      let j = i + 6;
      let quote = null;
      let parentheses = 0;

      while (j < css.length) {
        const current = css[j];
        if (quote) {
          if (current === '\\') j++;
          else if (current === quote) quote = null;
        } else if (current === '"' || current === "'") {
          quote = current;
        } else if (current === '(') {
          parentheses++;
        } else if (current === ')') {
          parentheses--;
        } else if (parentheses === 0 && (current === ';' || current === '{')) {
          break;
        }
        j++;
      }

      if (css[j] === ';') {
        i = j + 1;
        continue;
      }

      if (css[j] === '{') {
        const end = findBlockEnd(css, j);
        result += removeLayerWrappers(css.slice(j + 1, end));
        i = end + 1;
        continue;
      }
    }

    result += css[i];
    i++;
  }

  return result;
}

function writeLocalCss() {
  if (!fs.existsSync(rawFile)) return;
  const rawCss = fs.readFileSync(rawFile, 'utf8');
  const localCss = removeLayerWrappers(rawCss);
  fs.writeFileSync(outputFile, localCss, 'utf8');
}

if (process.argv.includes('--flatten-only')) {
  writeLocalCss();
  process.exit(0);
}

if (!fs.existsSync(cliFile)) {
  console.error('Tailwind CLI não encontrado. Execute npm install na pasta do projeto.');
  process.exit(1);
}

if (watchMode) {
  let lastContent = '';

  fs.watchFile(rawFile, { interval: 400 }, () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (!fs.existsSync(rawFile)) return;
      const content = fs.readFileSync(rawFile, 'utf8');
      if (content !== lastContent) {
        lastContent = content;
        writeLocalCss();
        console.log('CSS local atualizado.');
      }
    }, 250);
  });
}

const args = [cliFile, '-i', inputFile, '-o', rawFile];
if (watchMode) args.push('--watch');
else args.push('--minify');

const compiler = spawn(process.execPath, args, { cwd: projectDir, stdio: 'inherit' });
compiler.on('close', (code) => {
  if (watchMode) {
    fs.unwatchFile(rawFile);
    clearTimeout(timer);
  } else if (code === 0) {
    try {
      writeLocalCss();
      fs.unlinkSync(rawFile);
      console.log('CSS local compilado com sucesso.');
    } catch (error) {
      console.error(error.message);
      process.exitCode = 1;
    }
  }
  if (code !== 0) process.exitCode = code || 1;
});
