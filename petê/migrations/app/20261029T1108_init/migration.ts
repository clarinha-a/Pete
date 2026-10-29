#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/7c614e4d42a1ce93d6bf08454e18004a10b38f5dc925bfa2724aa4ae602ccb19/contract';
import endContract from '../../snapshots/7c614e4d42a1ce93d6bf08454e18004a10b38f5dc925bfa2724aa4ae602ccb19/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'Cliente',
        columns: [
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('nome', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('senha', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Pet',
        columns: [
          col('clienteId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('idade', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('nome', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('raca', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Cliente',
        constraint: 'Cliente_email_key',
        columns: ['email'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Pet',
        index: 'Pet_clienteId_idx_7ae16308',
        columns: ['clienteId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Pet',
        foreignKey: {
          name: 'Pet_clienteId_fkey',
          columns: ['clienteId'],
          references: { schema: 'public', table: 'Cliente', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
