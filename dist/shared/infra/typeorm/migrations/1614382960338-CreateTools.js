"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateTools1614382960338 {
  constructor() {
    this.toolsTable = new _typeorm.Table({
      name: 'tools',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'title',
        type: 'varchar'
      }, {
        name: 'link',
        type: 'varchar'
      }, {
        name: 'description',
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
    return queryRunner.createTable(this.toolsTable);
  }

  async down(queryRunner) {
    return queryRunner.dropTable(this.toolsTable);
  }

}

exports.default = CreateTools1614382960338;