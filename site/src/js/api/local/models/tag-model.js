export class Tag {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static fromObject(object) {
    return new Tag(object.id, object.name);
  }
}
