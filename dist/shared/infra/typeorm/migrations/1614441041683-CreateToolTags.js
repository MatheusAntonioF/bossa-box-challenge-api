"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateToolTags1614441041683 {
  constructor() {
    this.toolTagsTable = new _typeorm.Table({
      name: 'tool_tags',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'tool_id',
        type: 'uuid'
      }, {
        name: 'tag_id',
        type: 'uuid'
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
    this.toolIdForeignKey = new _typeorm.TableForeignKey({
      name: 'ToolId',
      columnNames: ['tool_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'tools',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    this.tagIdForeignKey = new _typeorm.TableForeignKey({
      name: 'TagIs',
      columnNames: ['tag_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'tags',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  }

  async up(queryRunner) {
    await queryRunner.createTable(this.toolTagsTable);
    return queryRunner.createForeignKeys('tool_tags', [this.toolIdForeignKey, this.tagIdForeignKey]);
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKeys('tool_tags', [this.toolIdForeignKey, this.tagIdForeignKey]);
    return queryRunner.dropTable(this.toolTagsTable);
  }

}

exports.default = CreateToolTags1614441041683;