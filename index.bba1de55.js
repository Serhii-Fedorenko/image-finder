const e=document.getElementById("gallery");document.querySelector(".search-form").addEventListener("submit",(function(t){t.preventDefault(),e.innerHTML="";const a=t.target;console.dir(a.elements.query.value),(r=a.elements.query.value,n=1,fetch(`https://pixabay.com/api/?key=35272793-b80026b1270d14e27c5199e53&q=${r}&per_page=40&page=${n}&image_type=photo&orientation=horizontal`).then((e=>e.json())).catch((e=>{throw new Error(e.statusText)}))).then((({hits:t})=>function(t){const a=t.map((e=>`<a class='gallery_item' href='${e.largeImageURL}' data-source='${e.largeImageURL}'><img src='${e.webformatURL}' alt='${e.tags}'/></a>`)).join("");return e.insertAdjacentHTML("beforeend",a)}(t))),a.reset();var r,n}));
//# sourceMappingURL=index.bba1de55.js.map
