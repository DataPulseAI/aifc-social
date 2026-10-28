#!/usr/bin/env python3
"""Render an AIforCompanies cheat sheet page to PNG (2x) and PDF.

Usage:
  python3 cheatsheets/build.py cheatsheets/<sheet>/<sheet>.content.js

Reads:
  cheatsheets/sheet.tpl.html          the one template (layout, colours, blocks)
  cheatsheets/icons.json              every lucide icon, name -> inner SVG
  ../aiforcompanies/app/fonts/        Newsreader + Instrument Sans (self-hosted woff2)
  ../aiforcompanies/public/brand/     the lockup for the footer
  ../aiforcompanies/public/logos/     vendor marks (claude-mark, outlook, ...)
Set AIFC_SITE to point at the site repo if it is not a sibling folder.

Writes next to the content file:
  <name>-p1.html  <name>-p1.png (2160x2700)  <name>-p1.pdf
and prints the fit check: gridBottom must stay above footTop, scroll must equal 1350.
"""
import os, re, sys, json, base64, glob
from playwright.sync_api import sync_playwright

here = os.path.dirname(os.path.abspath(__file__))
site = os.environ.get('AIFC_SITE', os.path.join(here, '..', '..', 'aiforcompanies'))
content_path = os.path.abspath(sys.argv[1])
out_dir = os.path.dirname(content_path)
name = os.path.basename(content_path).replace('.content.js', '')
out = name if re.search(r'-p\d+$', name) else name + '-p1'

def b64(p): return base64.b64encode(open(p, 'rb').read()).decode()

t = open(os.path.join(here, 'sheet.tpl.html')).read()
c = open(content_path).read()
all_icons = json.load(open(os.path.join(here, 'icons.json')))
used = set(re.findall(r'["\']([a-z0-9-]+)["\']', t + c))
icons = {k: v for k, v in all_icons.items() if k in used}

logos = {os.path.basename(p)[:-4]: 'data:image/png;base64,' + b64(p)
         for p in glob.glob(os.path.join(site, 'public/logos/*.png'))}
logos['__brand'] = 'data:image/png;base64,' + b64(os.path.join(site, 'public/brand/aiforcompanies-lockup.png'))

t = (t.replace('__INST__', b64(os.path.join(site, 'app/fonts/instrument-sans-latin-wght.woff2')))
      .replace('__NEWS__', b64(os.path.join(site, 'app/fonts/newsreader-latin-wght.woff2')))
      .replace('__ICONS__', json.dumps(icons))
      .replace('__LOGOS__', json.dumps(logos))
      .replace('__CONTENT__', c))
html = os.path.join(out_dir, f'{out}.html')
open(html, 'w').write(t)

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width': 1080, 'height': 1350}, device_scale_factor=2)
    errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto('file://' + html)
    pg.wait_for_timeout(500)
    fit = pg.evaluate("(()=>{const g=document.querySelector('.grid');return {gridBottom:g.getBoundingClientRect().bottom,footTop:document.querySelector('.foot').getBoundingClientRect().top,scroll:document.querySelector('.page').scrollHeight}})()")
    print(fit, errs or 'no errors')
    pg.locator('#page').screenshot(path=os.path.join(out_dir, f'{out}.png'))
    pg.pdf(path=os.path.join(out_dir, f'{out}.pdf'), width='1080px', height='1350px', print_background=True)
    b.close()
