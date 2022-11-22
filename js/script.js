'use strict';
/*global clearMessages*/
const opts = {
  tagSizes: {
    count: 5,
    classPrefix: 'tag-size-',
  },
};

const select = {
  all: {
    articles: '.post',
  },
};

const optTitleSelector = '.post-title', optTitleListSelector = '.titles', optArticleTagsSelector = '.post-tags .list',optTagsListSelector = '.tags', optCloudClassCount = 5, optCloudClassPrefix = 'tag-size-';

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

function generateTitleLinks(customSelector = ''){
  console.log('function generateTitleLinks');

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  clearMessages(titleList);

  /* [DONE] for each article */
  const articles = document.querySelectorAll(select.all.articles + customSelector);

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

function calculateTagsParams(tags){
  console.log('function calculateTagsParams');
  let tagMax = 0;
  let tagMin = 999999;
  for(const tag in tags){
    if(Math.max(tags[tag],tagMax) > tagMax){
      tagMax = Math.max(tags[tag],tagMax);
    }
    if(Math.min(tags[tag],tagMax) < tagMin){
      tagMin = Math.min(tags[tag],tagMin);
    }
  }
  const parms = {
    max: tagMax,
    min: tagMin,
  };
  return parms;
}

function calculateTagClass(count,params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix + classNumber;
}

generateTitleLinks();

function generateTags(){
  console.log('Function generateTags');
  let allTags = {};
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(select.all.articles);
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
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      }else{
        allTags[tag]++;
      }
    }
    /* END LOOP: for each tag */
    /* [DONE]insert HTML of all the links into the tags wrapper */
    tagsWrapper.insertAdjacentHTML('beforeend', html);
  }
  /* END LOOP: for every article: */
  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  let allTagsHTML = '';
  /* [NEW] STAR LOOP: for each tag in allTags: */
  for(let tag in allTags){
    allTagsHTML += '<li><a class="' + calculateTagClass(allTags[tag],tagsParams) + '"  href="#tag-'+ tag + '">' + tag + '</a></li>';
  }
  const tagList = document.querySelector(optTagsListSelector);
  tagList.innerHTML = allTagsHTML;
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

const optArticleAuthorSelector = '.post-author', optAuthorsListSelector = '.authors';

function generateAuthors(){
  console.log('Function generateAuthors');
  let allAuthors = {};
  const articles = document.querySelectorAll(select.all.articles);
  for(const article of articles){
    const authorsWrapper = article.querySelector(optArticleAuthorSelector);
    const authorHrefAtribute = article.getAttribute('data-author');
    const link = '<a href="#author-' + authorHrefAtribute + '">' + 'by ' + authorHrefAtribute + '</a>';
    authorsWrapper.insertAdjacentHTML('beforeend', link);
    if(!allAuthors.hasOwnProperty(authorHrefAtribute)){
      /* [NEW] add generated code to allTags array */
      allAuthors[authorHrefAtribute] = 1;
    }else{
      allAuthors[authorHrefAtribute]++;
    }
  }
  let allAuthorsHTML = '';
  console.log(allAuthors);
  for(let author in allAuthors){
    allAuthorsHTML += '<li><a href="#author-' + author + '">' + author + ' (' + allAuthors[author] + ')'+ '</a></li>';
  }
  const authorsList = document.querySelector(optAuthorsListSelector);
  authorsList.innerHTML = allAuthorsHTML;
}
generateAuthors();

function authorClickHandler(event){
  console.log('Function authorClickHandler');
  event.preventDefault();
  const authorHref = this.getAttribute('href');
  const authorExtract = authorHref.replace('#author-', '');
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

function addClickListenersToAuthor(){
  console.log('addClickListenersToTags function');
  const links = document.querySelectorAll('a[href^="#author-"');
  for (let link of links) {
    link.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthor();

