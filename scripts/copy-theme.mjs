import { copyFile, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const distThemesDir = path.join(distDir, 'themes');
const distColorsDir = path.join(distDir, 'colors');
const sourceThemesDir = path.join(rootDir, 'src', 'themes');
const sourceStylesDir = path.join(rootDir, 'src', 'styles');

await mkdir(distThemesDir, { recursive: true });
await mkdir(distColorsDir, { recursive: true });

const themeFiles = await readdir(sourceThemesDir);

await Promise.all(
  themeFiles
    .filter(file => file.endsWith('.css'))
    .map(file =>
      copyFile(
        path.join(sourceThemesDir, file),
        path.join(distThemesDir, file),
      ),
    ),
);

await copyFile(
  path.join(sourceStylesDir, 'colors', 'base.css'),
  path.join(distColorsDir, 'base.css'),
);
await copyFile(
  path.join(sourceStylesDir, 'animation.css'),
  path.join(distDir, 'animation.css'),
);

const globalsCss = await readFile(
  path.join(sourceStylesDir, 'globals.css'),
  'utf8',
);
const animationCss = await readFile(
  path.join(sourceStylesDir, 'animation.css'),
  'utf8',
);

const packagedGlobalsCss = globalsCss
  .replace("@import './animation.css';\n", '')
  .replace("@import '../themes/indigo.css';", "@import './themes/indigo.css';");

await writeFile(
  path.join(distDir, 'globals.css'),
  `${packagedGlobalsCss.trimEnd()}\n\n${animationCss.trimEnd()}\n`,
);
