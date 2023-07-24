export class Order {
  constructor(property, direction) {
    this.property = property;
    this.direction = direction;
  }

  static fromObject(object) {
    return new Order(object.property, object.direction);
  }
}

export class PageRequest {
  constructor(page, size, sort) {
    this.page = page;
    this.size = size;
    this.sort = sort;
  }

  static fromObject(object) {
    let sort = [];
    if (object.sort) {
      sort = object.sort.map(order => Order.fromObject(order));
    }
    return new PageRequest(object.page, object.size, sort);
  }
}
