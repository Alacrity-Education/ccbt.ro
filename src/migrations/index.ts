import * as migration_20260716_163931_baseline from './20260716_163931_baseline';

export const migrations = [
  {
    up: migration_20260716_163931_baseline.up,
    down: migration_20260716_163931_baseline.down,
    name: '20260716_163931_baseline'
  },
];
