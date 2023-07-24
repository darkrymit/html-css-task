import { BehaviorSubject, distinctUntilChanged, filter, map } from 'rxjs';
import { PageRequest } from '../api/local/models/pagination';

export const initialState = {
  search: '',
  data: [],
  page: null,
  loading: false,
  fetchSize: 10,
};

export class SearchStore {
  state = initialState;

  _state$ = new BehaviorSubject(this.state);
  state$ = this._state$.asObservable();

  search$ = this.state$.pipe(
    map(state => state.search),
    distinctUntilChanged()
  );
  data$ = this.state$.pipe(
    map(state => state.data),
    distinctUntilChanged()
  );
  last$ = this.state$.pipe(
    filter(state => state.page),
    map(state => state.page.isLast()),
    distinctUntilChanged()
  );
  loading$ = this.state$.pipe(
    map(state => state.loading),
    distinctUntilChanged()
  );

  constructor(apiService) {
    this._apiService = apiService;
  }

  setState(state) {
    this.state = state;
    this._state$.next(this.state);
  }

  loadDataForSearch(search) {
    this.setState({
      ...this.state,
      search,
      data: [],
      page: null,
    });
    this.loadNextData();
  }

  loadNextData() {
    if (this.state.loading || this.state.page?.isLast()) {
      return;
    }

    this.setState({
      ...this.state,
      loading: true,
    });

    let pageRequest = PageRequest.fromObject({
      page: this.state.page ? this.state.page.getNumber() + 1 : 0,
      size: this.state.fetchSize,
      sort: [{ property: 'creationDate', direction: 'DESC' }],
    });

    let searchRequest = undefined;

    if (this.state.search) {
      searchRequest = {
        part: this.state.search,
      };
    }

    this._apiService.getAll(pageRequest, searchRequest).subscribe(page => {
      this.setState({
        ...this.state,
        data: [...this.state.data, ...page.content],
        page,
        loading: false,
      });
    });
  }
}
