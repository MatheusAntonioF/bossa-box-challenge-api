"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateTags1614382591826 {
  constructor() {
    this.tagsTable = new _typeorm.Table({
      name: 'tags',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }]
    });
  }

  async up(queryRunner) {
    return queryRunner.createTable(this.tagsTable);
  }

  async down(queryRunner) {
    return queryRunner.dropTable(this.tagsTable);
  }

}

exports.default = CreateTags1614382591826;