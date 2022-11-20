'use strict';
/*global clearMessages*/
function titleClickHandler(event) {
  console.log('Function titleClickHandler');
  event.preventDefault();
  const clickedElement = this;

  /* [DONE] remove class 'active' from all article links  */
  const activeLink = document.querySelector('.titles a.active');
  if(activeLink) activeLink.classList.remove('active');

  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticle = document.querySelector('.posts article.active');
  if(activeArticle) activeArticle.classList.remove('active');

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

const optArticleSelector = '.post', optTitleSelector = '.post-title', optTitleListSelector = '.titles', optArticleTagsSelector = '.post-tags .list', optTagsListSelector = '.tags';

function generateTitleLinks(customSelector = ''){
  console.log('function generateTitleLinks');

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  clearMessages(titleList);

  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';
  for (const article of articles) {

    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');

    /* [DONE] find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE] get the title from the title element */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* [DONE] create HTML of the link */
    html = html + linkHTML;
  }
  /* [DONE] insert link into titleList */
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}



generateTitleLinks();

function generateTags(){
  console.log('Function generateTags');
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};

  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */
  for(const article of articles){

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    /* [DONE] make html variable with empty string */
    let html = '';

    /* [DONE]get tags from data-tags attribute */
    const dataTagsAtribute = article.getAttribute('data-tags');

    /* [DONE]split tags into array */
    const articleTagsArray = dataTagsAtribute.split(' ');

    /* [DONE]START LOOP: for each tag */
    for(const tag of articleTagsArray){
    /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + ' ' + '</a></li>';

      /* [DONE]add generated code to html variable */
      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(allTags.indexOf(linkHTML) == -1){
        /* [NEW] add generated code to allTags array */
        allTags.push(linkHTML);
      }
    }
    /* END LOOP: for each tag */

    /* [DONE]insert HTML of all the links into the tags wrapper */
    tagsWrapper.insertAdjacentHTML('beforeend', html);
  }
  /* END LOOP: for every article: */
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] add html from allTags to tagList */
  tagList.innerHTML = allTags.join(' ');
}
generateTags();

function tagClickHandler(event){
  console.log('tagClickHandler function');
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const tagHref = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tagExtract = tagHref.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for(let activeTag of activeTags){
    /* remove class active */
    activeTag.classList.remove('active');
  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const equalTags = document.querySelectorAll('a[href="' + tagHref + '"]');

  /* START LOOP: for each found tag link */
  for(let equalTag of equalTags){
    /* add class active */
    equalTag.classList.add('active');
  }
  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument
   */
  generateTitleLinks('[data-tags~="' + tagExtract + '"]');
}

function addClickListenersToTags(){
  console.log('addClickListenersToTags function');
  /* find all links to tags */
  const links = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for (let link of links) {

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  }
  /* END LOOP: for each link */
}

addClickListenersToTags();

const optArticleAuthorSelector = '.post-author';

function generateAuthors(){
  console.log('Function generateAuthors');
  const articles = document.querySelectorAll(optArticleSelector);
  for(const article of articles){
    const authorsWraper = article.querySelector(optArticleAuthorSelector);
    const authorHrefAtribute = article.getAttribute('data-author');
    const link = '<a href="#' + authorHrefAtribute + '">' + 'by ' + authorHrefAtribute + '</a>';
    authorsWraper.innerHTML = link;
  }
}
generateAuthors();

function authorClickHandler(event){
  console.log('Function authorClickHandler');
  event.preventDefault();
  const authorHref = this.getAttribute('href');
  const authorExtract = authorHref.replace('#', '');
  const activeAuthors = document.querySelectorAll('a.active');
  for(let activeAuthor of activeAuthors){
    activeAuthor.classList.remove('active');
  }
  const equalAuthors = document.querySelectorAll('a[href="' + authorHref + '"]');
  console.log(equalAuthors);
  for(let equalAuthor of equalAuthors){
    equalAuthor.classList.add('active');
  }
  generateTitleLinks('[data-author^="' + authorExtract + '"]');
}

const optArticleAuthorSelectorHref = '.post-author a';

function addClickListenersToAuthor(){
  console.log('addClickListenersToTags function');
  const links = document.querySelectorAll(optArticleAuthorSelectorHref);
  for (let link of links) {
    link.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthor();

