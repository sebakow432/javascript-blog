'use strict';
/*global clearMessages*/

function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!'); 

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active')

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active')
}

const optArticleSelector = '.post', optTitleSelector = '.post-title', optTitleListSelector = '.titles';

function generateTitleLinks(){
console.log('Wywołanie funkcji generateTitleLinks')

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    clearMessages(titleList);
    console.log('remove contents of titleList');

    /* [DONE] for each article */
    const articles = document.querySelectorAll(optArticleSelector);

    let html = '';

    for(let article of articles){
      console.log(article);

      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');
      console.log('Id artykułu - ' + articleId);

      /* [DONE] find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log('Zawartość .post-title - ' + articleTitle);

      /* [DONE] get the title from the title element */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);

      /* [DONE] create HTML of the link */
      html = html + linkHTML;
      console.log('Tak rozbudowuję się kod HTML: ' + html)
    }

    /* [DONE] insert link into titleList */
    titleList.insertAdjacentHTML('beforeend',html);

    const links = document.querySelectorAll('.titles a');
    console.log('link = ' + links);

    for(let link of links){
    link.addEventListener('click', titleClickHandler);
    }
}

generateTitleLinks();
