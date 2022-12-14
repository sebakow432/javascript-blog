'use strict';
/*global clearMessages*/
function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

const optArticleSelector = '.post', optTitleSelector = '.post-title', optTitleListSelector = '.titles', optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks() {
  console.log('Wywołanie funkcji generateTitleLinks');

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  clearMessages(titleList);
  console.log('remove contents of titleList');

  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector);

  let html = '';

  for (let article of articles) {
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
  }

  /* [DONE] insert link into titleList */
  titleList.insertAdjacentHTML('beforeend', html);
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}



generateTitleLinks();

//const optArticleSelector = '.post', optTitleSelector = '.post-title', optTitleListSelector = '.titles', optArticleTagsSelector = '.post-tags .list';

function generateTags(){
  console.log('Function generateTags');
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* [DONE] START LOOP: for every article: */
  for(let article of articles){
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagsWrapper);

    /* [DONE] make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const dataTagsAtribute = article.getAttribute('data-tags');
    console.log(dataTagsAtribute);

    /* split tags into array */
    const articleTagsArray = dataTagsAtribute.split(' ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
    /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      /* add generated code to html variable */
      html = html + linkHTML;
    }
    console.log(html);
    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.insertAdjacentHTML('beforeend', html);
  }
  /* END LOOP: for every article: */
}

generateTags();


function tagClickHandler(event){
  console.log('tagClickHandler function');
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(clickedElement);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const tagHref = clickedElement.getAttribute('href');
  console.log(tagHref);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tagExtract = tagHref.replace('#tag-', '');
  console.log(tagExtract);

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('activeTags ' + activeTags);

  /* START LOOP: for each active tag link */
  for(let activeTag of activeTags){
    /* remove class active */
    activeTag.classList.remove('active');
    console.log(activeTag);
  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const equalTags = document.querySelectorAll('a[href="' + tagHref + '"]');
  console.log('equalTags ' + equalTags);

  /* START LOOP: for each found tag link */
  for(let equalTag of equalTags){
    /* add class active */
    equalTag.classList.add('active');
    console.log(equalTag);
  }
  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument
   */
  //generateTitleLinks('[data-tags~="' + activeTags + '"]');
}

function addClickListenersToTags(){
  console.log('addClickListenersToTags function');
  /* find all links to tags */
  const links = document.querySelectorAll('.post-tags a');
  /* START LOOP: for each link */
  for (let link of links) {

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  }
  /* END LOOP: for each link */
}

addClickListenersToTags();
tagClickHandler();
