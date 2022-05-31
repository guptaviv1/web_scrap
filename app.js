
const puppeteer = require('puppeteer');
const axios = require('axios');
const express = require('express');
const redis = require('redis');
const client = redis.createClient();
const app = express();
const port = 3000
client.on('connect', function() {
  console.log('Connected!'); // Connected!
});



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
                          company_name: item.querySelector('.company-name a') ? item.querySelector('.company-name a').innerText : 'NA',
                          location: item.querySelectorAll('.searctag .loc')[0] ? item.querySelectorAll('.searctag .loc')[0].innerText : 'NA',
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

// intaialize the all data to redis server
webScrap(5).then((data) => {
  client.setex("job_data", 1020, JSON.stringify(data));
}).catch((err)=>{
  console.log(err)
})

// pagination of data
function paginator(items, page, per_page) {

  var page = page || 1,
  per_page = per_page || 10,
  offset = (page - 1) * per_page,

  paginatedItems = items.slice(offset).slice(0, per_page),
  total_pages = Math.ceil(items.length / per_page);
  return {
  page: page,
  per_page: per_page,
  pre_page: page - 1 ? page - 1 : null,
  next_page: (total_pages > page) ? page + 1 : null,
  total: items.length,
  total_pages: total_pages,
  data: paginatedItems
  };
}

app.get('/nodejs', (req, res) => {
    client.get('job_data', async (err, data) => {
      if (data) {
        let page = req.query.page || 1;
        let page_per_item = req.query.pageItem || 10;
        let job_data = JSON.parse(data);
        if(req.query.location) {
          job_data = job_data.filter((data)=>{
            if(req.query) {
              return data.location.includes(req.query.location);
            }
          })
        }
        let paginated_item = paginator(job_data,page, page_per_item)
        return res.status(200).send({
          error: false,
          message: `job_data from the cache`,
          data: paginated_item
        })
      } else {
        webScrap(10).then((data) => {
          client.setex("job_data", 1020, JSON.stringify(data));
        }).catch((err)=>{
          console.log(err)
        })
      }
    }).catch((err)=> {
      console.log(err);
    })
});
  
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});