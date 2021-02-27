import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateToolTags1614441041683 implements MigrationInterface {
  private toolTagsTable = new Table({
    name: 'tool_tags',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      },
      {
        name: 'tool_id',
        type: 'uuid',
      },
      {
        name: 'tag_id',
        type: 'uuid',
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      },
    ],
  });

  private toolIdForeignKey = new TableForeignKey({
    name: 'ToolId',
    columnNames: ['tool_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'tools',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  private tagIdForeignKey = new TableForeignKey({
    name: 'TagIs',
    columnNames: ['tag_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'tags',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.toolTagsTable);

    return queryRunner.createForeignKeys('tool_tags', [
      this.toolIdForeignKey,
      this.tagIdForeignKey,
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys('tool_tags', [
      this.toolIdForeignKey,
      this.tagIdForeignKey,
    ]);

    return queryRunner.dropTable(this.toolTagsTable);
  }
}
