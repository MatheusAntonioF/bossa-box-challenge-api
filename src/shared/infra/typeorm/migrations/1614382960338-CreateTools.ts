import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTools1614382960338 implements MigrationInterface {
  private toolsTable = new Table({
    name: 'tools',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      },
      {
        name: 'title',
        type: 'varchar',
      },
      {
        name: 'link',
        type: 'varchar',
      },
      {
        name: 'description',
        type: 'varchar',
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

  private toolTagsForeignKey = new TableForeignKey({
    name: 'ToolTags',
    columnNames: ['tag_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'tags',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.toolsTable);

    return queryRunner.createForeignKey('tools', this.toolTagsForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.toolsTable);

    return queryRunner.dropForeignKey('tools', this.toolTagsForeignKey);
  }
}
