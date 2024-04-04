const API_KEY = 'a42ce5007b084cf9ba8724e990b09adc';
let newsList = [];
let url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`);
const menus = document.querySelectorAll('.menus button');

menus.forEach(menu => {
   menu.addEventListener('click', event => {
      getNewsCategory(event);
   });
});

const getNews = async () => {
   const response = await fetch(url);
   const data = await response.json();
   newsList = data.articles;
   render();
};

const getLatestNews = async () => {
   url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`);
   getNews();
};

const getNewsCategory = async event => {
   const category = event.target.textContent.toLowerCase();
   console.log(category);
   url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`);
   getNews();
};

const getNewsByKeyword = async () => {
   const keyword = document.getElementById('search-input').value;
   url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`);
   getNews();
};

const render = () => {
   const newsHTML = newsList
      .map(item => {
         return `<div class="row news">
               <div class="col-lg-4">
                  <img
                     class="news-img-size"
                     src=${item.urlToImage}
                     alt=""
                  />
               </div>
               <div class="col-lg-8">
                  <h2>${item.title}</h2>
                  <p>${item.description}</p>
                  <div>${item.source.name} * ${item.publishedAt}</div>
               </div>
            </div>`;
      })
      .join('');

   document.getElementById('news-board').innerHTML = newsHTML;
};

getLatestNews();
// 1. 버튼들에 클릭 이벤트 주기
// 2. 카테고리 별 뉴스 가져오기
// 3. 그 뉴스를 보여주기
//
