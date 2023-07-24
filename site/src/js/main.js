import { loadIoc } from './load-ioc';
import { loadWebElements } from './load-web-elements';
import { debounce } from 'lodash-es';

globalThis.ioc = loadIoc();
loadWebElements();

function onHeaderSearchChange(value) {
  // get search params from url
  let searchParams = new URLSearchParams(window.location.search);
  searchParams.set('search', value);

  // update url without reloading page
  let newRelativePathQuery =
    window.location.pathname + '?' + searchParams.toString();
  history.pushState(null, '', newRelativePathQuery);

  // load data for search
  globalThis.ioc.get('searchStore').loadDataForSearch(value);
}

function loadSearchFromUrl() {
  // get search params from url
  let searchParams = new URLSearchParams(window.location.search);
  let search = searchParams.get('search');

  // load data for search
  globalThis.ioc.get('searchStore').loadDataForSearch(search);
  console.log('loadSearchFromUrl', search);
}

function scrollToTopFunction() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

history.scrollRestoration = 'manual';

window.addEventListener('load', loadSearchFromUrl);
window.addEventListener('popstate', loadSearchFromUrl);

let topWrapper = document.querySelector('.app-c-scroll-to-top__wrapper');

window.addEventListener('scroll', () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topWrapper.classList.add('app-c-scroll-to-top__wrapper--visible');
  } else {
    topWrapper.classList.remove('app-c-scroll-to-top__wrapper--visible');
  }
});

function restoreScrollPosition() {
  console.log('restoreScrollPosition');
  let scrollPositions = sessionStorage.getItem('scrollPosition');
  if (!scrollPositions) {
    console.log('scrollPositions not found');
    return;
  }
  let scrollPositionObject = JSON.parse(scrollPositions);
  let scrollPosition = scrollPositionObject[window.location.href];
  if (scrollPosition == null) {
    console.log('scrollPosition not found');
    return;
  }

  setTimeout(() => {
    console.log('beginScrollToPosition', scrollPosition);
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth',
    });
  }, 500);
}

function rememberScrollPosition() {
  console.log('rememberScrollPosition');
  let scrollPosition =
    document.body.scrollTop || document.documentElement.scrollTop;
  console.log('scrollPosition', scrollPosition);
  let scrollPositions = sessionStorage.getItem('scrollPosition');
  if (!scrollPositions) {
    scrollPositions = {};
  } else {
    scrollPositions = JSON.parse(scrollPositions);
  }
  scrollPositions[window.location.href] = scrollPosition;
  sessionStorage.setItem('scrollPosition', JSON.stringify(scrollPositions));
}

window.addEventListener('load', restoreScrollPosition);
// since popstate fired after load of page we have new page state
window.addEventListener('popstate', restoreScrollPosition);

window.addEventListener('pushstate', rememberScrollPosition);
// using navigate event from navigation component instead of popstate event we have old page state
navigation.addEventListener('navigate', rememberScrollPosition);

globalThis.app = {
  functions: {
    onHeaderSearchChange: debounce(onHeaderSearchChange, 500),
    scrollToTopFunction,
  },
};
