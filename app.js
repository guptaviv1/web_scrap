const express = require('express');
const puppeteer = require('puppeteer');
const axios = require('axios');
const redis = require('redis');
const app = express();
const port = 3000

function webScrap (pagesToScrape) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!pagesToScrape) {
                pagesToScrape = 1;
            }
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto("https://www.naukri.com/nodejs-jobs", { waitUntil: 'networkidle2',timeout: 0});
            await page.waitForSelector('.listContainer');
            let currentPage = 1;
            let urls = [];
            while (currentPage <= pagesToScrape) {
                let newUrls = await page.evaluate(() => {
                    let results = [];
                    let items = document.querySelectorAll('article.jobTuple.bgWhite.br4.mb-8');
                    items.forEach((item) => {
                        results.push({
                            job_title:  item.querySelector('a.title').innerText,
                            company_name: item.querySelector('a.subTitle').innerText,
                            location: item.querySelector('.location span').innerText,
                            years_of_exp_req: item.querySelector('.experience span').innerText,
                            salary: item.querySelector('.salary span').innerText,
                            post_time: item.querySelectorAll('.jobTupleFooter .type span')[1].innerText
                        });
                    });
                    return results;
                });
                urls = urls.concat(newUrls);
                if (currentPage < pagesToScrape) {
                    await Promise.all([
                        await page.click('.pagination .fright.fs14.btn-secondary.br2'),
                        await page.waitForSelector('article.jobTuple.bgWhite.br4.mb-8')
                    ])
                }
                currentPage++;
            }
            browser.close();
            return resolve(urls);
        } catch (e) {
            return reject(e);
        }
    })
}
webScrap(5).then(console.log).catch(console.error);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

