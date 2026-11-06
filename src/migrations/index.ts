import * as migration_20260929_163034_initial from './20260929_163034_initial';
import * as migration_20260929_214314_design_faehnli from './20260929_214314_design_faehnli';
import * as migration_20261106_103038_authentik_oidc from './20261106_103038_authentik_oidc';

export const migrations = [
  {
    up: migration_20260929_163034_initial.up,
    down: migration_20260929_163034_initial.down,
    name: '20260929_163034_initial',
  },
  {
    up: migration_20260929_214314_design_faehnli.up,
    down: migration_20260929_214314_design_faehnli.down,
    name: '20260929_214314_design_faehnli',
  },
  {
    up: migration_20261106_103038_authentik_oidc.up,
    down: migration_20261106_103038_authentik_oidc.down,
    name: '20261106_103038_authentik_oidc',
  },
];
