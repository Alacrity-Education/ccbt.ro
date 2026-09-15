import { chromium } from 'playwright'
const browser = await chromium.launch()
const rows = []
for (const w of [1024, 1100, 1280, 1440, 1600, 1920]) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1 })
  await page.goto('http://localhost:3000/cards-test', { waitUntil: 'networkidle', timeout: 300000 })
  await page.waitForTimeout(1200)
  const g = await page.evaluate(() => {
    const el = document.querySelector('[data-motif-lane] div[aria-hidden]')
    if (!el) return null
    const r = el.getBoundingClientRect()
    return { left: Math.round(r.left), top: Math.round(r.top + scrollY), w: Math.round(r.width) }
  })
  if (!g) { rows.push({ w, note: 'no rail' }); await page.close(); continue }
  const buf = await page.screenshot({ clip: { x: g.left, y: g.top, width: g.w, height: 300 } })
  const r = await page.evaluate(async (b64) => {
    const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode()
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height
    const x = c.getContext('2d'); x.drawImage(img, 0, 0)
    const d = x.getImageData(0,0,img.width,img.height).data
    const white = i => d[i]>245 && d[i+1]>245 && d[i+2]>245
    const inkPerRow = []
    for (let y = 0; y < img.height; y++) {
      let n = 0
      for (let px = 0; px < img.width; px++) if (!white((y*img.width+px)*4)) n++
      inkPerRow.push(n)
    }
    return { firstInkRow: inkPerRow.findIndex(n => n > 3), row0Ink: inkPerRow[0], width: img.width }
  }, buf.toString('base64'))
  rows.push({ w, railTop: g.top, railW: g.w, row0InkPx: r.row0Ink, firstInkRow: r.firstInkRow })
  await page.close()
}
console.table(rows)
await browser.close()
