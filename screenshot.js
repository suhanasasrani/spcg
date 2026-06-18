const puppeteer = require('puppeteer');
const fs = require('fs');

async function takeScreenshots() {
  const browser = await puppeteer.launch({ headless: 'new' });
  
  const sites = [
    { url: 'https://eha-rose.vercel.app/', name: 'eha', count: 3 },
    { url: 'https://www.blueberryfin.com/', name: 'blueberry', count: 3 }
  ];

  for (const site of sites) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    
    try {
      console.log(`Navigating to ${site.url}...`);
      await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 30000 });
      
      for (let i = 1; i <= site.count; i++) {
        const filePath = `./public/images/${site.name}-screenshot-${i}.png`;
        await page.screenshot({ path: filePath });
        console.log(`Saved ${filePath}`);
        
        // Scroll down for the next screenshot
        await page.evaluate(() => {
          window.scrollBy(0, window.innerHeight * 0.8);
        });
        await new Promise(resolve => setTimeout(resolve, 1000)); // wait for scroll animation/lazy load
      }
    } catch (err) {
      console.error(`Failed to screenshot ${site.url}:`, err);
    }
    await page.close();
  }

  await browser.close();
}

takeScreenshots();
