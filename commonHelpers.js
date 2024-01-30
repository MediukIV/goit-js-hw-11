import{S as g,i as m}from"./assets/vendor-46aac873.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();document.addEventListener("DOMContentLoaded",()=>{const u=document.querySelector(".searchForm"),a=document.querySelector(".searchInput"),i=document.querySelector(".loader"),l=document.querySelector(".gallery"),e="42055816-5ec499474650eadfc6b07a02f",r="https://pixabay.com/api/",n=new g(".gallery a");u.addEventListener("submit",d=>{d.preventDefault();const c=a.value.trim();if(c===""){m.error({title:"Error",message:"Please enter a search term."});return}i.classList.remove("hidden"),l.innerHTML="",fetch(`${r}?key=${e}&q=${c}&image_type=photo&orientation=horizontal&safesearch=true`).then(s=>{if(!s.ok)throw new Error(`HTTP error! Status: ${s.status}`);return s.json()}).then(s=>{if(s.hits.length===0)m.error({title:"",titleColor:"#FFFFFF",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FFFFFF",messageSize:"16px",backgroundColor:"#EF4040",iconColor:"#FFFFFF",position:"topRight"});else{const t=s.hits.map(o=>({webformatURL:o.webformatURL,largeImageURL:o.largeImageURL,tags:o.tags,likes:o.likes,views:o.views,comments:o.comments,downloads:o.downloads}));p(t)}}).catch(s=>{console.error("Error fetching data:",s),m.error({title:"Error",titleColor:"#FFFFFF",message:"An error occurred while fetching data. Please try again.",messageColor:"#FFFFFF",messageSize:"16px",backgroundColor:"#EF4040",iconColor:"#FFFFFF",position:"topRight"})}).finally(()=>{i.classList.add("hidden")})});function p(d){const c=d.map((s,t)=>`
        <div class="gallery-item">
          <a href="${s.largeImageURL}" data-lightbox="gallery" data-title="${s.tags}">
            <img src="${s.webformatURL}" alt="${s.tags}" class="image-thumbnail image-${t+1}">
          </a>
          <div class="image-details image-details-${t+1}">
            <p class="likes likes-${t+1}">Likes: <span class="result-likes">${s.likes}</span></p>
            <p class="views views-${t+1}">Views: <span class="result-views">${s.views}</span></p>
            <p class="comments comments-${t+1}">Comments: <span class="result-comments">${s.comments}</span></p>
            <p class="downloads downloads-${t+1}">Downloads: <span class="result-downloads">${s.downloads}</span></p>
          </div>
        </div>
      `).join("");l.innerHTML=c,n.refresh()}});
//# sourceMappingURL=commonHelpers.js.map
