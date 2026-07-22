import fs from 'fs';
import path from 'path';

const src = path.resolve('frontend/dist');
const dest = path.resolve('dist');

if (fs.existsSync(src)) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  fs.cpSync(src, dest, { recursive: true });
  console.log('Successfully copied frontend/dist to root dist!');
} else {
  console.error('Source frontend/dist does not exist.');
}
