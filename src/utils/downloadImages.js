// Download images from any URL

const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const generatePathName = require('./generatePathName')

const url = 'https://4forms.ru/collection/sale' 
const dir = './images/'

const parse = async () => {
    const browser = await puppeteer.launch({ headless: true }); // If you want to see open browser you can set headless = false
    const page = await browser.newPage();
    await page.goto(url, { timeout: 60000 });

    await page.evaluate(() => {
        return new Promise((resolve, reject) => {
            let currentHeight = 0
            let scrollHeight = 100

            const timer = setInterval(() => {
                let maxHeight = document.body.scrollHeight
                window.scrollBy(0, scrollHeight)
                currentHeight += scrollHeight

                if (currentHeight >= maxHeight) {
                    clearInterval(timer)
                    resolve(maxHeight)
                }
            }, 100)
        })
    })

    const imageSources = await page.$$eval('img', imgs => imgs.map(img => img.src));

    await browser.close();
    return imageSources;
};

function downloadImages() {
    parse()
    .then((res) => {
        res.forEach(async (img, index) => {
            const sfgFile = path.extname(img)

            if (img && !sfgFile.includes('svg')) {
                if (!fs.existsSync(dir)) fs.mkdirSync(dir)
                const fileName = generatePathName(img, index, dir)

                const response = await fetch(img)
                const buffer = await response.buffer()

                fs.appendFile(fileName, buffer, err => err ? console.log(err) : console.log('Saved!'))
            }
        });
    })
    .catch(err => console.error('Error: ', err))
} 

module.exports = downloadImages;