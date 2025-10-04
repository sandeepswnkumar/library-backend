import fs from 'fs';
import path from 'path';

const basePath = './prisma/schema.base';
const modelsPath = './prisma/models';
const outputPath = './prisma/schema.prisma';

const base = fs.readFileSync(basePath, 'utf-8');

const modelFiles = fs.readdirSync(modelsPath)
  .filter(file => file.endsWith('.model'))
  .map(file => fs.readFileSync(path.join(modelsPath, file), 'utf-8'));

fs.writeFileSync(outputPath, base + '\n\n' + modelFiles.join('\n\n'));
console.log(`✅ schema.prisma generated with ${modelFiles.length} model files.`);
