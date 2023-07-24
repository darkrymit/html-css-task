import { GiftCertificateService } from './api/local/services';
import { SearchStore } from './components';

// Create a new instance of the IOC container (Inversion of Control) actually a Map object
export function loadIoc() {
  let map = new Map();

  let giftCertificateService = new GiftCertificateService();
  giftCertificateService.init();
  map.set('giftCertificateService', giftCertificateService);

  let searchStore = new SearchStore(giftCertificateService);
  map.set('searchStore', searchStore);

  return map;
}
