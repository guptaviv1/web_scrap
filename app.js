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
            await page.goto("https://www.monsterindia.com/search/node-js-jobs", { waitUntil: 'networkidle2',timeout: 0});
            await page.waitForSelector('#srp-jobList');
            let currentPage = 1;
            let urls = [];
            while (currentPage <= pagesToScrape) {
                let newUrls = await page.evaluate(() => {
                    let results = [];
                    let items = document.querySelectorAll('#srp-jobList .job-apply-card');
                    items.forEach((item) => {
                        results.push({
                            job_title:  item.querySelector('.job-tittle h3 a') ? item.querySelector('.job-tittle h3 a').innerText : 'NA',
                            company_name: item.querySelector('.company-name a') ? item.querySelector('.job-tittle h3 a').innerText : 'NA',
                            location: item.querySelectorAll('.searctag .loc')[0] ? item.querySelector('.job-tittle h3 a').innerText : 'NA',
                            years_of_exp_req:  item.querySelectorAll('.searctag .loc')[1] ? item.querySelectorAll('.searctag .loc')[1].innerText : 'NA',
                            salary:  item.querySelectorAll('.searctag .loc')[2] ?item.querySelectorAll('.searctag .loc')[2].innerText : 'NA',
                            post_time: item.querySelector('.posted-update .posted')? item.querySelector('.posted-update .posted').innerText : 'NA'
                        });
                    });
                    return results;
                });
                urls = urls.concat(newUrls);
                if (currentPage < pagesToScrape) {
                    await Promise.all([
                        await page.click('button.btn-next'),
                        await page.waitForSelector('#srp-jobList')
                    ])
                }
                console.log("currentPage", currentPage);
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

