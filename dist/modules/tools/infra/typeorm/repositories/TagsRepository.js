"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Tag = _interopRequireDefault(require("../entities/Tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TagsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Tag.default);
  }

  async findByName(name) {
    const findedTag = await this.ormRepository.findOne({
      where: {
        name
      }
    });
    return findedTag;
  }

  async findByNames(nameTags) {
    const findedTags = await this.ormRepository.find({
      where: {
        name: (0, _typeorm.In)(nameTags)
      }
    });
    return findedTags;
  }

  create(tagName) {
    const createdTag = this.ormRepository.create({
      name: tagName
    });
    return createdTag;
  }

  async save(tags) {
    const savedTags = await this.ormRepository.save(tags);
    return savedTags;
  }

}

var _default = TagsRepository;
exports.default = _default;