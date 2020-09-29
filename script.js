var container = document.querySelector('.row');

var apikey = 'c1f3fcdc97a04b02afb07b97bcd1627d';
var source = 'in';

var pages = document.querySelectorAll('.page');
var title = document.querySelector('.title');


if(container.textContent == ''){
  title.textContent = 'Breaking Now';
  GoToPage('TheRealNews');
}

pages.forEach((link) =>{
  link.addEventListener('click', function(){
    title.textContent = '';
    console.log(link.textContent);
    GoToPage(link.textContent);
  });
});

function GoToPage(source){
  var src = source.toLowerCase();
  var xhr = new XMLHttpRequest();
  if(source == 'Hot' || source =='TheRealNews'){
    title.textContent = 'Breaking Now';
    xhr.open('GET', `http://newsapi.org/v2/top-headlines?country=in&apiKey=${apikey}`, true);
  }
  else{
xhr.open('GET', `http://newsapi.org/v2/top-headlines?country=in&category=${src}&apiKey=${apikey}`, true);
title.textContent = `${source} News`;
//xhr.getResponseHeader('Content-type', 'application/json');
}

xhr.onload = function (){
  if(this.status == 200){
    var json = JSON.parse(this.responseText);
    var articles = json.articles;
    var newshtml = '';
   
    articles.forEach((article,index) =>{
       var imgUrl = '';
       var desc='';
       var content = '';
      console.log(article);
       if(article.urlToImage==null){
        imgUrl = 'noimage.jpg';
      }
      else{
        imgUrl = article.urlToImage;
      }

       if(article.description==null){
        desc = 'No Description';
      }
      else{
        desc = article.description;
      }

      if(article.content==null){
        content='No Content';
      }
      else{
        content = article.content;
      }
      var news = ` 
      <div class="card m-3" style="width: 18rem;">
  <img src="${imgUrl}" class="card-img-top" alt="">
  <div class="card-body">
    <h5 class="card-title">${article.title}</h5>
    <p class="card-text">${desc}</p>
    <p class='card-text'>Published at ${article.publishedAt} </p>
    <a href="${article.url}" class="btn btn-primary">Read More</a>
    <a class="btn btn-info" data-toggle="modal" data-target="#myModal${index}">Show Content</a>
  </div>
</div>

<div id="myModal${index}" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">${article.title}</h4>
      </div>
      <div class="modal-body">
        <p>${content}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>`;

    newshtml += news;
    });

  container.innerHTML = newshtml; 
  }
  else{
    console.log('Error!');
  }
}

xhr.send();

}
var search = document.querySelector('.search');
var submitbtn = document.querySelector('.btn');
submitbtn.addEventListener('click', function(e){
  title.textContent = '';
    var apikey = 'c1f3fcdc97a04b02afb07b97bcd1627d';
    console.log('Hi');
	container.innerHTML ='';
	e.preventDefault();
	var source = search.value;
  if(source==''){
    location.href = 'home.html';
  }
  else{
	var xhr = new XMLHttpRequest();
xhr.open('GET', `http://newsapi.org/v2/top-headlines?q=${source}&apiKey=${apikey}`, true);
//xhr.getResponseHeader('Content-type', 'application/json');

xhr.onload = function (){
  console.log(source);
  if(this.status == 200){
    var json = JSON.parse(this.responseText);
    var articles = json.articles;
    if(articles.length == 0){
      title.textContent = 'No Results!';
    }
    else{
      title.textContent = `Showing results for '${source}'`;
    var newshtml = '';
    var imgUrl = '';
    var desc='';
    var content ='';
    articles.forEach((article,index) =>{
      console.log(article);
       if(article.urlToImage==null){
        imgUrl = 'noimage.jpg';
      }
      else{
        imgUrl = article.urlToImage;
      }

       if(article.description==null){
        desc = 'No Description';
      }
      else{
        desc = article.description;
      }
       if(article.content==null){
        content='No Content';
      }
      else{
        content = article.content;
      }
      var news = ` <div class="card m-3" style="width: 18rem;">
  <img src="${imgUrl}" class="card-img-top" alt="">
  <div class="card-body">
    <h5 class="card-title">${article.title}</h5>
    <p class="card-text">${desc}</p>
    <p class='card-text'>Published at ${article.publishedAt} </p>
    <a href="${article.url}" class="btn btn-primary">Read More</a>
    <a class="btn btn-info" data-toggle="modal" data-target="#myModal${index}">Show Content</a>
  </div>
</div>

<div id="myModal${index}" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">${article.title}</h4>
      </div>
      <div class="modal-body">
        <p>${content}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>`;

    newshtml += news;
    });

  container.innerHTML = newshtml;
  }
}

  else{
    console.log('Error!');
  }
}

xhr.send();
}
});




