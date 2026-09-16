/** RFC4180 read and write. Post headlines contain commas and quotes; naive splits corrupt them. */
export function parse(text) {
  const rows = []; let row = [], field = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') q = false;
      else field += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (c !== '\r') field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows.filter(r => r.some(c => c !== ''));
}

export function toObjects(text) {
  const rows = parse(text);
  if (!rows.length) return { head: [], recs: [] };
  const head = rows.shift().map(s => s.trim());
  return { head, recs: rows.map(r => Object.fromEntries(head.map((h, i) => [h, (r[i] ?? '').trim()]))) };
}

const q = v => {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
};

export function fromObjects(head, recs) {
  return head.join(',') + '\n' + recs.map(r => head.map(h => q(r[h])).join(',')).join('\n') + '\n';
}
