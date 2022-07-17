export enum HiddenEntityLinkFlags {
  HIDDEN = 'hidden',
  HIDDEN_TABLE = 'hiddenTable',
  HIDDEN_TITLE = 'hiddenTitle',
}

export const HiddenEntityLinkTypeMap = {
  JournalEntry: 'journal',
  Actor: 'actors',
  RollTable: 'tables',
  Scene: 'scenes',
  Card: 'cards',
  Playlist: 'playlists',
  Item: 'items',
};

export const HiddenEntityLinkPermissions = {
  EMPTY: 0,
  NONE: 1,
  LIMITED: 2,
  OBSERVER: 3,
  OWNER: 4,
  ONLY_LIMITED: 5,
  ONLY_OBSERVER: 6,
};

export const HiddenEntityLinkState = {
  HIDE: 0,
  UNHIDE: 1,
  SHOW: 2,
};
