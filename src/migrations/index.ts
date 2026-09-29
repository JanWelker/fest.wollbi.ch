import * as migration_20260929_163034_initial from './20260929_163034_initial';

export const migrations = [
  {
    up: migration_20260929_163034_initial.up,
    down: migration_20260929_163034_initial.down,
    name: '20260929_163034_initial'
  },
];
