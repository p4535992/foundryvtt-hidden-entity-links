import CONSTANTS from "./constants.js";
import { dialogWarning, resetNavbar, warn } from "./lib/lib.js";

export const registerSettings = function () {
  game.settings.registerMenu(CONSTANTS.MODULE_NAME, "resetAllSettings", {
    name: `${CONSTANTS.MODULE_NAME}.setting.reset.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.reset.hint`,
    icon: "fas fa-coins",
    type: ResetSettingsDialog,
    restricted: true,
  });
  // =====================================================================
  game.settings.register(CONSTANTS.MODULE_NAME, "hide-actors", {
    name: `${CONSTANTS.MODULE_NAME}.setting.hide-actors.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.hide-actors.hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_NAME, "level-permission-actors", {
    name: `${CONSTANTS.MODULE_NAME}.setting.level-permission-actors.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.level-permission-actors.hint`,
    scope: "world",
    config: true,
    default: 0,
    type: Number,
    choices: {
      0: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.empty`),
      1: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.none`),
      2: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.limited`),
      3: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.observer`),
      4: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.owner`),
      5: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.onlylimited`),
      6: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.onlyobserver`),
    },
  });
  game.settings.register(CONSTANTS.MODULE_NAME, "hide-items", {
    name: `${CONSTANTS.MODULE_NAME}.setting.hide-items.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.hide-items.hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_NAME, "level-permission-items", {
    name: `${CONSTANTS.MODULE_NAME}.setting.level-permission-items.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.level-permission-items.hint`,
    scope: "world",
    config: true,
    default: 0,
    type: Number,
    choices: {
      0: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.empty`),
      1: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.none`),
      2: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.limited`),
      3: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.observer`),
      4: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.owner`),
      5: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.onlylimited`),
      6: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.onlyobserver`),
    },
  });
  game.settings.register(CONSTANTS.MODULE_NAME, "hide-journals", {
    name: `${CONSTANTS.MODULE_NAME}.setting.hide-journals.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.hide-journals.hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_NAME, "level-permission-journals", {
    name: `${CONSTANTS.MODULE_NAME}.setting.level-permission-journals.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.level-permission-journals.hint`,
    scope: "world",
    config: true,
    default: 0,
    type: Number,
    choices: {
      0: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.empty`),
      1: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.none`),
      2: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.limited`),
      3: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.observer`),
      4: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.owner`),
      5: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.onlylimited`),
      6: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.onlyobserver`),
    },
  });
  game.settings.register(CONSTANTS.MODULE_NAME, "hide-rolltables", {
    name: `${CONSTANTS.MODULE_NAME}.setting.hide-rolltables.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.hide-rolltables.hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_NAME, "level-permission-rolltables", {
    name: `${CONSTANTS.MODULE_NAME}.setting.level-permission-rolltables.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.level-permission-rolltables.hint`,
    scope: "world",
    config: true,
    default: 0,
    type: Number,
    choices: {
      0: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.empty`),
      1: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.none`),
      2: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.limited`),
      3: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.observer`),
      4: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.owner`),
      5: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.onlylimited`),
      6: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.onlyobserver`),
    },
  });
  game.settings.register(CONSTANTS.MODULE_NAME, "hide-cards", {
    name: `${CONSTANTS.MODULE_NAME}.setting.hide-cards.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.hide-cards.hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_NAME, "level-permission-cards", {
    name: `${CONSTANTS.MODULE_NAME}.setting.level-permission-cards.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.level-permission-cards.hint`,
    scope: "world",
    config: true,
    default: 0,
    type: Number,
    choices: {
      0: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.empty`),
      1: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.none`),
      2: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.limited`),
      3: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.observer`),
      4: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.owner`),
      5: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.onlylimited`),
      6: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.onlyobserver`),
    },
  });
  game.settings.register(CONSTANTS.MODULE_NAME, "hide-scenes", {
    name: `${CONSTANTS.MODULE_NAME}.setting.hide-scenes.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.hide-scenes.hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_NAME, "hide-scenes-nav", {
    name: `${CONSTANTS.MODULE_NAME}.setting.hide-scenes-nav.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.hide-scenes-nav.hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });
  // game.settings.register(CONSTANTS.MODULE_NAME, 'level-permission-scenes', {
  //   name: `${CONSTANTS.MODULE_NAME}.setting.level-permission-scenes.name`,
  //   hint: `${CONSTANTS.MODULE_NAME}.setting.level-permission-scenes.hint`,
  //   scope: 'world',
  //   config: true,
  //   default: 0,
  //   type: Number,
  //   choices: {
  //  0: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.empty`),
  //  1: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.none`),
  //  2: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.limited`),
  //  3: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.observer`),
  //  4: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.owner`),
  //  5: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.onlylimited`),
  //  6: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.onlyobserver`),
  //   },
  // });
  game.settings.register(CONSTANTS.MODULE_NAME, "level-permission-scenes-nav", {
    name: `${CONSTANTS.MODULE_NAME}.setting.level-permission-scenes-nav.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.level-permission-scenes-nav.hint`,
    scope: "world",
    config: true,
    default: 0,
    type: Number,
    choices: {
      0: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.empty`),
      1: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.none`),
      2: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.limited`),
      3: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.observer`),
      4: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.owner`),
      5: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.onlylimited`),
      6: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.onlyobserver`),
    },
  });
  game.settings.register(CONSTANTS.MODULE_NAME, "level-permission-scenes-nav-name", {
    name: `${CONSTANTS.MODULE_NAME}.setting.level-permission-scenes-nav-name.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.level-permission-scenes-nav-name.hint`,
    scope: "world",
    config: true,
    default: 0,
    type: Number,
    choices: {
      0: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.empty`),
      1: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.none`),
      2: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.limited`),
      3: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.observer`),
      4: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.owner`),
      5: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.onlylimited`),
      6: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.onlyobserver`),
    },
  });
  game.settings.register(CONSTANTS.MODULE_NAME, "no-background-only-symbol", {
    name: `${CONSTANTS.MODULE_NAME}.setting.no-background-only-symbol.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.no-background-only-symbol.hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_NAME, "disguise-unreachable-links", {
    name: `${CONSTANTS.MODULE_NAME}.setting.disguise-unreachable-links.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.disguise-unreachable-links.hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_NAME, "level-permission-disguise-unreachable-links", {
    name: `${CONSTANTS.MODULE_NAME}.setting.level-permission-disguise-unreachable-links.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.level-permission-disguise-unreachable-links.hint`,
    scope: "world",
    config: true,
    default: 0,
    type: Number,
    choices: {
      0: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.empty`),
      1: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.none`),
      2: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.limited`),
      3: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.observer`),
      4: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.owner`),
    },
  });
  game.settings.register(CONSTANTS.MODULE_NAME, "add-css-unhideshow", {
    name: `${CONSTANTS.MODULE_NAME}.setting.add-css-unhideshow.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.add-css-unhideshow.hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_NAME, "disable-voices", {
    name: `${CONSTANTS.MODULE_NAME}.setting.disable-voices.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.disable-voices.hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_NAME, "hide-soundtracks", {
    name: `${CONSTANTS.MODULE_NAME}.setting.hide-soundtracks.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.hide-soundtracks.hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });
  // ========================================================================
  game.settings.register(CONSTANTS.MODULE_NAME, "hidechat", {
    name: `${CONSTANTS.MODULE_NAME}.setting.hidechat.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.hidechat.hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_NAME, "hidecombat", {
    name: `${CONSTANTS.MODULE_NAME}.setting.hidecombat.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.hidecombat.hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_NAME, "hidescenes", {
    name: `${CONSTANTS.MODULE_NAME}.setting.hidescenes.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.hidescenes.hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_NAME, "hideactors", {
    name: `${CONSTANTS.MODULE_NAME}.setting.hideactors.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.hideactors.hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_NAME, "hideitems", {
    name: `${CONSTANTS.MODULE_NAME}.setting.hideitems.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.hideitems.hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_NAME, "hidejournal", {
    name: `${CONSTANTS.MODULE_NAME}.setting.hidejournal.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.hidejournal.hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_NAME, "hidetables", {
    name: `${CONSTANTS.MODULE_NAME}.setting.hidetables.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.hidetables.hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_NAME, "hidecards", {
    name: `${CONSTANTS.MODULE_NAME}.setting.hidecards.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.hidecards.hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_NAME, "hideplaylists", {
    name: `${CONSTANTS.MODULE_NAME}.setting.hideplaylists.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.hideplaylists.hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_NAME, "hidecompendium", {
    name: `${CONSTANTS.MODULE_NAME}.setting.hidecompendium.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.hidecompendium.hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_NAME, "hidesettings", {
    name: `${CONSTANTS.MODULE_NAME}.setting.hidesettings.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.hidesettings.hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
    onChange: (_) => {
      window.location.reload();
    },
  });
  // ========================================================================
  game.settings.register(CONSTANTS.MODULE_NAME, "debug", {
    name: `${CONSTANTS.MODULE_NAME}.setting.debug.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.debug.hint`,
    scope: "client",
    config: true,
    default: false,
    type: Boolean,
  });
};

class ResetSettingsDialog extends FormApplication {
  constructor(...args) {
    //@ts-ignore
    super(...args);
    //@ts-ignore
    return new Dialog({
      title: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.dialogs.resetsettings.title`),
      content:
        '<p style="margin-bottom:1rem;">' +
        game.i18n.localize(`${CONSTANTS.MODULE_NAME}.dialogs.resetsettings.content`) +
        "</p>",
      buttons: {
        confirm: {
          icon: '<i class="fas fa-check"></i>',
          label: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.dialogs.resetsettings.confirm`),
          callback: async () => {
            const worldSettings = game.settings.storage
              ?.get("world")
              ?.filter((setting) => setting.key.startsWith(`${CONSTANTS.MODULE_NAME}.`));
            for (let setting of worldSettings) {
              log(`Reset setting '${setting.key}'`);
              await setting.delete();
            }
            //window.location.reload();
          },
        },
        cancel: {
          icon: '<i class="fas fa-times"></i>',
          label: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.dialogs.resetsettings.cancel`),
        },
      },
      default: "cancel",
    });
  }

  async _updateObject(event, formData = undefined) {
    // do nothing
  }
}
