export class InfiniteScroll extends HTMLElement {
  _stateService = null;

  _itemContainer = null;
  _itemTemplate = null;
  _loadingTemplate = null;

  _data = [];
  _last = false;
  _loading = false;

  _subscriptions = [];

  constructor() {
    super();
    console.log('InfiniteScroll constructor');
    this._stateService = window.ioc.get('searchStore');
    setTimeout(() => this.init());
  }

  init() {
    console.log('InfiniteScroll init');
    this._itemContainer = this.querySelector('.item-container');
    this._itemTemplate = this.querySelector('.item-template');
    this._loadingTemplate = this.querySelector('.loading-template');

    // subscribe to state changes
    this._subscriptions.push(
      this._stateService.data$.subscribe(data => {
        this._data = data;
        this.render();
      }),
      this._stateService.last$.subscribe(last => {
        this._last = last;
      }),
      this._stateService.loading$.subscribe(loading => {
        this._loading = loading;
        this.render();
        setTimeout(() => this.checkScroll(), 100);
      })
    );

    // add listener to scroll
    window.addEventListener('scroll', this.checkScroll.bind(this));
  }

  // not throttled
  checkScroll() {
    const endOfPage =
      (window.innerHeight + window.scrollY) * 1.1 >= document.body.offsetHeight;
    console.log('InfiniteScroll scrollListener', endOfPage);
    if (endOfPage && !this._loading && !this._last) {
      this.loadData();
    }
  }

  loadData() {
    console.log('InfiniteScroll loadData');
    this._stateService.loadNextData();
  }

  render() {
    console.log('InfiniteScroll render');

    // render items
    this._itemContainer.innerHTML = '';

    for (let item of this._data) {
      let itemElement = this._itemTemplate.content.cloneNode(true);
      itemElement.querySelector('.item-name').innerText = item.name;
      itemElement.querySelector('.item-link').href = `/certificates/${item.id}`;
      itemElement.querySelector('.item-description').innerText =
        item.description;
      itemElement.querySelector('.item-price').innerText = `${item.price} $`;
      let tagsContainer = itemElement.querySelector('.item-tags-container');
      tagsContainer.innerHTML = '';
      for (let tag of item.tags) {
        let tagElement = document.createElement('span');
        tagElement.innerText = '#' + tag.name;
        tagsContainer.append(tagElement);
      }
      this._itemContainer.append(itemElement);
    }

    // render loading
    if (this._loading) {
      if (!this.querySelector('.loading')) {
        let loadingElement = window.document.createElement('div');
        loadingElement.classList.add('loading');
        loadingElement.append(this._loadingTemplate.content.cloneNode(true));
        this.append(loadingElement);
      }
      // do not render loading if already rendered
    } else {
      let loadingElement = this.querySelector('.loading');
      if (loadingElement) {
        loadingElement.remove();
      }
    }
  }
}
