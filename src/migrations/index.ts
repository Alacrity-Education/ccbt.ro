import * as migration_20260716_163931_baseline from './20260716_163931_baseline';
import * as migration_20260805_144335 from './20260805_144335';

export const migrations = [
  {
    up: migration_20260716_163931_baseline.up,
    down: migration_20260716_163931_baseline.down,
    name: '20260716_163931_baseline',
  },
  {
    up: migration_20260805_144335.up,
    down: migration_20260805_144335.down,
    name: '20260805_144335'
  },
];
