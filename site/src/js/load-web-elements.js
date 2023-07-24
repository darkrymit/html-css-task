import { InfiniteScroll } from './components';
// simply load all web elements
export function loadWebElements() {
  customElements.define('app-infinite-scroll', InfiniteScroll);
}
