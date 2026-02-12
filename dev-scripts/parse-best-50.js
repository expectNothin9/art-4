/**
<div class="list-item">
  <a id="contentLink_1632767" href="/bars/asia/the-list/bar-leone.html" class="item-img-container ">
    <img data-src="//www.theworlds50best.com/bars/asia/filestore/jpg/Bar Leone-hero_A50BB25-profile.jpg" class=" ls-is-cached lazyloaded" alt="Bar Leone" src="//www.theworlds50best.com/bars/asia/filestore/jpg/Bar Leone-hero_A50BB25-profile.jpg">
  </a>
  <div class="list-item-contents">
    <div class="item-top">
      <p class="rank ">1</p>
      <div class="fav-btn-container" id="favourites_1632767" data-element-id="17" data-content-name="Bar Leone" data-react-type="multiple">
        <button class="btn">
          <div class="fav-btn-list icon" aria-label="Add to Lists">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.46 8.5C1.651 8.5 1 9.17 1 10s.652 1.5 1.46 1.5 1.459-.67 1.459-1.5-.652-1.5-1.46-1.5m0-6C1.651 2.5 1 3.17 1 4s.652 1.5 1.46 1.5S3.918 4.83 3.918 4s-.652-1.5-1.46-1.5m0 12C1.651 14.5 1 15.18 1 16s.662 1.5 1.46 1.5 1.459-.68 1.459-1.5-.652-1.5-1.46-1.5M5.377 17H19v-2H5.378zm0-6H19V9H5.378zm0-8v2H19V3z" fill="#000"></path>
            </svg>
          </div>
        </button>
        <button class="btn">
          <div class="fav-btn-favourites icon" aria-label="Add to Favourites">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="m10 18.5-1.264-1.134a99 99 0 0 1-3.64-3.422q-1.44-1.438-2.29-2.583-.85-1.144-1.187-2.104a5.9 5.9 0 0 1-.338-1.961q0-2.049 1.373-3.423Q4.028 2.5 6.076 2.5q1.134 0 2.158.48A5.2 5.2 0 0 1 10 4.33a5.2 5.2 0 0 1 1.766-1.351 5 5 0 0 1 2.158-.48q2.05 0 3.422 1.373 1.374 1.374 1.374 3.423 0 1.002-.338 1.961-.339.96-1.188 2.104-.85 1.145-2.29 2.583-1.437 1.44-3.64 3.422zm0-2.354a95 95 0 0 0 3.444-3.216q1.351-1.34 2.137-2.332.784-.992 1.09-1.766a4.2 4.2 0 0 0 .305-1.536q0-1.308-.872-2.18-.873-.872-2.18-.872-1.024 0-1.897.578-.87.577-1.199 1.47H9.172q-.327-.892-1.2-1.47a3.37 3.37 0 0 0-1.896-.578q-1.307 0-2.18.872-.87.872-.871 2.18 0 .762.305 1.536t1.09 1.766q.784.992 2.136 2.332A95 95 0 0 0 10 16.147" fill="#000"></path>
            </svg>
          </div>
        </button>
      </div>
    </div>
    <div class="item-bottom">
      <a id="contentLink_1632767" href="/bars/asia/the-list/bar-leone.html">
        <h2>Bar Leone</h2>
      </a>
      <p>Hong Kong</p>
    </div>
  </div>
</div>
 */

// according to the above HTML structure, parse the data and return an array of objects with the following properties:
// - rank: number
// - name: string
// - city: string
// - country: string

// chrome devtool script to parse the data
const data = document.querySelectorAll(".list-item");
const result = [];
for (const item of data) {
  const rank = item.querySelector(".item-top .rank").textContent;
  const name = item.querySelector(".item-bottom h2").textContent;
  const city = item.querySelector(".item-bottom p").textContent;
  result.push({ rank, name, city });
}
console.log(result);
