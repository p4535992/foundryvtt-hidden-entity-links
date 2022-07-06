export enum HiddenEntityLinkFlags {
  HIDDEN = 'hidden',
  HIDDEN_TABLE = 'hiddenTable',
  HIDDEN_TITLE = 'hiddenTitle'
}

export const HiddenEntityLinkEntityMap = {
  JournalEntry: 'journal',
  Actor: 'actors',
  RollTable: 'tables',
  Scene: 'scenes',
  Item: 'items',
  Card: 'cards',
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
