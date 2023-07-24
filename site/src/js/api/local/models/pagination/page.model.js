export class PageMetadata {
  constructor(size, totalPages, totalElements, number) {
    this.size = size;
    this.totalPages = totalPages;
    this.totalElements = totalElements;
    this.number = number;
  }

  static fromObject(object) {
    return new PageMetadata(
      object.size,
      object.totalPages,
      object.totalElements,
      object.number
    );
  }

  isLast() {
    return this.number === this.totalPages - 1;
  }

  isFirst() {
    return this.number === 0;
  }
}

export class Page {
  constructor(content, metadata) {
    this.content = content;
    this.metadata = metadata;
  }

  static fromObject(object) {
    return new Page(object.content, PageMetadata.fromObject(object.metadata));
  }

  getSize() {
    return this.metadata.size;
  }

  getTotalPages() {
    return this.metadata.totalPages;
  }

  getTotalElements() {
    return this.metadata.totalElements;
  }

  getNumber() {
    return this.metadata.number;
  }

  isLast() {
    return this.metadata.isLast();
  }

  isFirst() {
    return this.metadata.isFirst();
  }
}
