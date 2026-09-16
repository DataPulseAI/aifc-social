import sharp from 'sharp';
import { readdirSync } from 'node:fs';
const dir = process.argv[2], out = process.argv[3], cols = +(process.argv[4]||4);
const files = readdirSync(dir).filter(f=>f.endsWith('.png')).sort();
const W=400,H=500,G=14;
const rows=Math.ceil(files.length/cols);
const tiles=await Promise.all(files.map(f=>sharp(`${dir}/${f}`).resize(W,H).png().toBuffer()));
await sharp({create:{width:cols*W+G*(cols+1),height:rows*H+G*(rows+1),channels:3,background:'#e9e9e9'}})
 .composite(tiles.map((b,i)=>({input:b,left:G+(i%cols)*(W+G),top:G+Math.floor(i/cols)*(H+G)})))
 .png().toFile(out);
console.log(out, files.length, 'tiles');
files.forEach((f,i)=>console.log(`  r${Math.floor(i/cols)+1}c${i%cols+1}  ${f}`));
