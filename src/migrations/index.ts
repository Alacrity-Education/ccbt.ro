import * as migration_20260806_132502_initial from './20260806_132502_initial';

export const migrations = [
  {
    up: migration_20260806_132502_initial.up,
    down: migration_20260806_132502_initial.down,
    name: '20260806_132502_initial'
  },
];
