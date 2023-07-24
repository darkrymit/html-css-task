import { Tag } from './tag-model';

export class GiftCertificate {
  constructor(
    id,
    name,
    description,
    price,
    duration,
    createdDate,
    lastModifiedDate,
    tags
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.duration = duration;
    this.createdDate = createdDate;
    this.lastModifiedDate = lastModifiedDate;
    this.tags = tags;
  }

  static fromObject(object) {
    let tags = [];
    if (object.tags) {
      tags = object.tags.map(tag => Tag.fromObject(tag));
    }

    return new GiftCertificate(
      object.id,
      object.name,
      object.description,
      object.price,
      object.duration,
      object.createdDate,
      object.lastModifiedDate,
      tags
    );
  }
}
