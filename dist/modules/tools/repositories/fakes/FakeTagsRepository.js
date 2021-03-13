"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuidv = require("uuidv4");

var _Tag = _interopRequireDefault(require("../../infra/typeorm/entities/Tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeTagsRepository {
  constructor() {
    this.tags = [];
  }

  async findByName(name) {
    const findedTag = this.tags.find(tag => tag.name === name);
    return findedTag;
  }

  async findByNames(nameTags) {
    const findedTags = [];
    nameTags.forEach(tagNameToBeFind => {
      const findedTag = this.tags.find(tag => tag.name === tagNameToBeFind);
      if (findedTag) findedTags.push(findedTag);
    });
    return findedTags;
  }

  create(tagName) {
    const newTag = new _Tag.default();
    Object.assign(newTag, {
      id: (0, _uuidv.uuid)()
    }, {
      name: tagName
    });
    this.tags.push(newTag);
    return newTag;
  }

  async save(tags) {
    const savedTags = tags.map(tag => {
      this.tags.push(tag);
      return tag;
    });
    return savedTags;
  }

}

var _default = FakeTagsRepository;
exports.default = _default;