import { GiftCertificate } from '../models';
import { Page } from '../models/pagination';
import { delay, Observable } from 'rxjs';

export class GiftCertificateService {
  _data = [];

  constructor() {}

  getById(id) {
    return new Observable(observer => {
      let giftCertificate = this._data.find(
        giftCertificate => giftCertificate.id === id
      );
      if (!giftCertificate) {
        observer.error('Gift Certificate not found');
      }
      observer.next(giftCertificate);
      observer.complete();
    });
  }

  getAll(pageRequest, searchRequest) {
    return new Observable(observer => {
      if (!pageRequest) {
        observer.error('Page request is required');
      }

      let giftCertificates = this._data;

      if (searchRequest) {
        giftCertificates = giftCertificates.filter(giftCertificate => {
          return (
            giftCertificate.name
              .toLowerCase()
              .includes(searchRequest.part.toLowerCase()) ||
            giftCertificate.description
              .toLowerCase()
              .includes(searchRequest.part.toLowerCase())
          );
        });
      }

      giftCertificates = giftCertificates.sort((a, b) => {
        return a - b;
      });
      let totalElements = giftCertificates.length;
      let totalPages = Math.ceil(totalElements / pageRequest.size);
      let number = pageRequest.page;
      if (number > totalPages) {
        number = totalPages - 1;
      }

      let page = Page.fromObject({
        content: giftCertificates.slice(
          pageRequest.size * number,
          pageRequest.size * (number + 1)
        ),
        metadata: {
          size: pageRequest.size,
          totalPages: totalPages,
          totalElements: totalElements,
          number: number,
        },
      });

      observer.next(page);
      observer.complete();
    }).pipe(delay(300));
  }

  init() {
    if (localStorage.getItem('giftCertificates') === null) {
      this._data = this.createData();
      localStorage.setItem('giftCertificates', JSON.stringify(this._data));
      console.log('Gift Certificates created');
    } else {
      this._data = this.loadData();
      console.log('Gift Certificates loaded');
    }
  }

  loadData() {
    return JSON.parse(localStorage.getItem('giftCertificates')).map(
      giftCertificate => GiftCertificate.fromObject(giftCertificate)
    );
  }

  createData() {
    return [
      GiftCertificate.fromObject({
        id: 600,
        name: 'polyp',
        description: 'mi sit amet',
        price: 30.56,
        duration: 20,
        createDate: '2022-02-01T03:25:08.000Z',
        lastUpdateDate: '2022-02-01T03:25:08.000Z',
        tags: [
          {
            id: 113,
            name: 'auspicious',
          },
          {
            id: 278,
            name: 'disgusted',
          },
          {
            id: 663,
            name: 'painful',
          },
        ],
      }),
      GiftCertificate.fromObject({
        id: 307,
        name: 'participation',
        description: 'dui nec nisi volutpat',
        price: 54.75,
        duration: 30,
        createDate: '2022-02-02T00:41:38.000Z',
        lastUpdateDate: '2022-02-02T00:41:38.000Z',
        tags: [
          {
            id: 196,
            name: 'brown',
          },
          {
            id: 359,
            name: 'essential',
          },
          {
            id: 716,
            name: 'pointless',
          },
        ],
      }),
      GiftCertificate.fromObject({
        id: 296,
        name: 'parchment',
        description: 'et',
        price: 43.1,
        duration: 12,
        createDate: '2022-02-02T12:51:52.000Z',
        lastUpdateDate: '2022-02-02T12:51:52.000Z',
        tags: [
          {
            id: 629,
            name: 'old',
          },
          {
            id: 762,
            name: 'purple',
          },
          {
            id: 770,
            name: 'quarrelsome',
          },
        ],
      }),
      GiftCertificate.fromObject({
        id: 458,
        name: 'pianist',
        description: 'nulla facilisi cras',
        price: 40.23,
        duration: 21,
        createDate: '2022-02-03T12:20:42.000Z',
        lastUpdateDate: '2022-02-03T12:20:42.000Z',
        tags: [
          {
            id: 29,
            name: 'accomplished',
          },
          {
            id: 319,
            name: 'eatable',
          },
        ],
      }),
      GiftCertificate.fromObject({
        id: 469,
        name: 'picturesque',
        description: 'sit',
        price: 38.05,
        duration: 9,
        createDate: '2022-02-03T17:28:27.000Z',
        lastUpdateDate: '2022-02-03T17:28:27.000Z',
        tags: [
          {
            id: 1,
            name: 'abaft',
          },
          {
            id: 513,
            name: 'medium',
          },
        ],
      }),
      GiftCertificate.fromObject({
        id: 799,
        name: 'publicist',
        description: 'vel augue',
        price: 85.11,
        duration: 24,
        createDate: '2022-02-04T01:46:58.000Z',
        lastUpdateDate: '2022-02-04T01:46:58.000Z',
        tags: [
          {
            id: 335,
            name: 'elite',
          },
          {
            id: 628,
            name: 'oily',
          },
          {
            id: 842,
            name: 'short',
          },
        ],
      }),
      GiftCertificate.fromObject({
        id: 139,
        name: 'orientation',
        description: 'in hac',
        price: 33.79,
        duration: 29,
        createDate: '2022-02-04T07:07:26.000Z',
        lastUpdateDate: '2022-02-04T07:07:26.000Z',
        tags: [
          {
            id: 905,
            name: 'spherical',
          },
        ],
      }),
      GiftCertificate.fromObject({
        id: 77,
        name: 'onesie',
        description: 'vel pede morbi porttitor',
        price: 14.42,
        duration: 29,
        createDate: '2022-02-04T16:39:57.000Z',
        lastUpdateDate: '2022-02-04T16:39:57.000Z',
        tags: [
          {
            id: 166,
            name: 'blue',
          },
          {
            id: 206,
            name: 'buttery',
          },
          {
            id: 774,
            name: 'questionable',
          },
        ],
      }),
      GiftCertificate.fromObject({
        id: 235,
        name: 'pager',
        description: 'tempor',
        price: 49.26,
        duration: 9,
        createDate: '2022-02-04T16:51:12.000Z',
        lastUpdateDate: '2022-02-04T16:51:12.000Z',
        tags: [
          {
            id: 62,
            name: 'ajar',
          },
          {
            id: 300,
            name: 'dramatic',
          },
          {
            id: 635,
            name: 'opposite',
          },
        ],
      }),
      GiftCertificate.fromObject({
        id: 75,
        name: 'omnivore',
        description: 'consectetuer adipiscing elit',
        price: 47.57,
        duration: 21,
        createDate: '2022-02-05T02:36:48.000Z',
        lastUpdateDate: '2022-02-05T02:36:48.000Z',
        tags: [
          {
            id: 477,
            name: 'luxuriant',
          },
          {
            id: 996,
            name: 'tame',
          },
        ],
      }),
      GiftCertificate.fromObject({
        id: 71,
        name: 'omelette',
        description: 'metus sapien ut',
        price: 33.11,
        duration: 12,
        createDate: '2022-07-21T17:07:08.000Z',
        lastUpdateDate: '2022-07-21T17:07:08.000Z',
        tags: [
          {
            id: 16,
            name: 'absent',
          },
        ],
      }),
      GiftCertificate.fromObject({
        id: 593,
        name: 'polluter',
        description: 'et ultrices',
        price: 84.31,
        duration: 20,
        createDate: '2022-07-21T23:13:53.000Z',
        lastUpdateDate: '2022-07-21T23:13:53.000Z',
        tags: [
          {
            id: 467,
            name: 'low',
          },
        ],
      }),
      GiftCertificate.fromObject({
        id: 463,
        name: 'pick',
        description: 'mi in porttitor pede',
        price: 20.69,
        duration: 3,
        createDate: '2022-07-22T00:44:51.000Z',
        lastUpdateDate: '2022-07-22T00:44:51.000Z',
        tags: [
          {
            id: 187,
            name: 'breakable',
          },
          {
            id: 935,
            name: 'starry',
          },
        ],
      }),
      GiftCertificate.fromObject({
        id: 864,
        name: 'sandra',
        description: 'in',
        price: 59.48,
        duration: 5,
        createDate: '2022-07-22T07:18:28.000Z',
        lastUpdateDate: '2022-07-22T07:18:28.000Z',
        tags: [
          {
            id: 270,
            name: 'direful',
          },
          {
            id: 912,
            name: 'splendid',
          },
        ],
      }),
      GiftCertificate.fromObject({
        id: 223,
        name: 'pacemaker',
        description: 'ut nulla',
        price: 46.72,
        duration: 9,
        createDate: '2022-07-23T00:39:50.000Z',
        lastUpdateDate: '2022-07-23T00:39:50.000Z',
        tags: [
          {
            id: 131,
            name: 'bare',
          },
          {
            id: 919,
            name: 'spurious',
          },
        ],
      }),
      GiftCertificate.fromObject({
        id: 906,
        name: 'scorpion',
        description: 'morbi vestibulum velit',
        price: 40.76,
        duration: 27,
        createDate: '2022-07-23T01:10:33.000Z',
        lastUpdateDate: '2022-07-23T01:10:33.000Z',
        tags: [
          {
            id: 607,
            name: 'nutritious',
          },
          {
            id: 855,
            name: 'simplistic',
          },
        ],
      }),
      GiftCertificate.fromObject({
        id: 849,
        name: 'saloon',
        description: 'eget nunc donec',
        price: 61.42,
        duration: 3,
        createDate: '2022-07-23T14:44:40.000Z',
        lastUpdateDate: '2022-07-23T14:44:40.000Z',
        tags: [
          {
            id: 953,
            name: 'strong',
          },
        ],
      }),
      GiftCertificate.fromObject({
        id: 212,
        name: 'overweight',
        description: 'in lacus',
        price: 54.33,
        duration: 9,
        createDate: '2022-07-23T17:20:01.000Z',
        lastUpdateDate: '2022-07-23T17:20:01.000Z',
        tags: [
          {
            id: 986,
            name: 'swift',
          },
        ],
      }),
      GiftCertificate.fromObject({
        id: 5,
        name: 'oat',
        description: 'odio in hac',
        price: 86.48,
        duration: 20,
        createDate: '2022-07-24T04:57:14.000Z',
        lastUpdateDate: '2022-07-24T04:57:14.000Z',
        tags: [
          {
            id: 8,
            name: 'ablaze',
          },
          {
            id: 334,
            name: 'elfin',
          },
          {
            id: 397,
            name: 'joint',
          },
        ],
      }),
      GiftCertificate.fromObject({
        id: 944,
        name: 'sectional',
        description: 'quam fringilla rhoncus',
        price: 30.33,
        duration: 14,
        createDate: '2022-07-24T09:40:47.000Z',
        lastUpdateDate: '2022-07-24T09:40:47.000Z',
        tags: [
          {
            id: 437,
            name: 'likable',
          },
          {
            id: 470,
            name: 'lucky',
          },
          {
            id: 841,
            name: 'shoddy',
          },
        ],
      }),
      GiftCertificate.fromObject({
        id: 553,
        name: 'plotter',
        description: 'purus sit amet',
        price: 88.23,
        duration: 26,
        createDate: '2022-07-24T10:26:12.000Z',
        lastUpdateDate: '2022-07-24T10:26:12.000Z',
        tags: [
          {
            id: 64,
            name: 'alarming',
          },
          {
            id: 227,
            name: 'decent',
          },
        ],
      }),
      GiftCertificate.fromObject({
        id: 651,
        name: 'power',
        description: 'ut odio cras mi',
        price: 87.66,
        duration: 28,
        createDate: '2022-07-24T16:33:49.000Z',
        lastUpdateDate: '2022-07-24T16:33:49.000Z',
        tags: [
          {
            id: 551,
            name: 'motionless',
          },
        ],
      }),
      GiftCertificate.fromObject({
        id: 868,
        name: 'sarah',
        description: 'integer ac',
        price: 5.43,
        duration: 1,
        createDate: '2022-07-24T21:50:11.000Z',
        lastUpdateDate: '2022-07-24T21:50:11.000Z',
        tags: [
          {
            id: 563,
            name: 'mysterious',
          },
        ],
      }),
      GiftCertificate.fromObject({
        id: 266,
        name: 'pansy',
        description: 'lacus',
        price: 63.24,
        duration: 3,
        createDate: '2022-07-25T21:21:12.000Z',
        lastUpdateDate: '2022-07-25T21:21:12.000Z',
        tags: [
          {
            id: 110,
            name: 'attached',
          },
          {
            id: 784,
            name: 'safe',
          },
          {
            id: 939,
            name: 'steel',
          },
        ],
      }),
      GiftCertificate.fromObject({
        id: 12,
        name: 'newwName',
        description: 'luctus nec molestie',
        price: 58.95,
        duration: 5,
        createDate: '2022-07-26T02:40:29.000Z',
        lastUpdateDate: '2023-03-30T20:29:19.501Z',
        tags: [
          {
            id: 623,
            name: 'odd',
          },
          {
            id: 802,
            name: 'scholarly',
          },
        ],
      }),
      GiftCertificate.fromObject({
        id: 933,
        name: 'season',
        description: 'sapien',
        price: 17.85,
        duration: 24,
        createDate: '2022-07-26T08:09:41.000Z',
        lastUpdateDate: '2022-07-26T08:09:41.000Z',
        tags: [
          {
            id: 368,
            name: 'everlasting',
          },
          {
            id: 621,
            name: 'occasional',
          },
        ],
      }),
      GiftCertificate.fromObject({
        id: 862,
        name: 'sandpaper',
        description: 'placerat',
        price: 36.88,
        duration: 26,
        createDate: '2022-07-26T12:37:13.000Z',
        lastUpdateDate: '2022-07-26T12:37:13.000Z',
        tags: [
          {
            id: 104,
            name: 'ashamed',
          },
          {
            id: 240,
            name: 'definitive',
          },
        ],
      }),
      GiftCertificate.fromObject({
        id: 547,
        name: 'pledge',
        description: 'vestibulum sit',
        price: 23.9,
        duration: 2,
        createDate: '2022-07-26T20:37:08.000Z',
        lastUpdateDate: '2022-07-26T20:37:08.000Z',
        tags: [
          {
            id: 552,
            name: 'mountainous',
          },
          {
            id: 1000,
            name: 'tart',
          },
        ],
      }),
      GiftCertificate.fromObject({
        id: 218,
        name: 'oxygen',
        description: 'vulputate',
        price: 23.26,
        duration: 16,
        createDate: '2022-07-26T21:46:53.000Z',
        lastUpdateDate: '2022-07-26T21:46:53.000Z',
        tags: [
          {
            id: 827,
            name: 'shabby',
          },
          {
            id: 967,
            name: 'succinct',
          },
        ],
      }),
      GiftCertificate.fromObject({
        id: 245,
        name: 'pajamas',
        description: 'risus',
        price: 31.51,
        duration: 10,
        createDate: '2022-07-27T16:13:40.000Z',
        lastUpdateDate: '2022-07-27T16:13:40.000Z',
        tags: [
          {
            id: 817,
            name: 'self-assured',
          },
        ],
      }),
    ];
  }
}
