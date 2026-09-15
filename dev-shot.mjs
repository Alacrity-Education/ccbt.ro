import { chromium } from 'playwright'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 4 })
await page.goto('http://localhost:3000/cards-test', { waitUntil: 'networkidle', timeout: 300000 })
await page.waitForTimeout(1500)
await page.screenshot({ path: process.argv[2], clip: { x: 1030, y: 70, width: 250, height: 180 } })
await browser.close()
