import CONSTANTS from './constants.js';
import { dialogWarning, resetNavbar, warn } from './lib/lib.js';

export const registerSettings = function () {
  game.settings.registerMenu(CONSTANTS.MODULE_NAME, 'resetAllSettings', {
    name: `${CONSTANTS.MODULE_NAME}.setting.reset.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.reset.hint`,
    icon: 'fas fa-coins',
    type: ResetSettingsDialog,
    restricted: true,
  });
  // =====================================================================
  game.settings.register(CONSTANTS.MODULE_NAME, 'hide-actors', {
    name: `${CONSTANTS.MODULE_NAME}.setting.hide-actors.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.hide-actors.hint`,
    scope: 'world',
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_NAME, 'level-permission-actors', {
    name: `${CONSTANTS.MODULE_NAME}.setting.level-permission-actors.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.level-permission-actors.hint`,
    scope: 'world',
    config: true,
    default: 0,
    type: Number,
    choices: <any>{
      0: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.empty`),
      1: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.none`),
      2: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.limited`),
      3: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.observer`),
      4: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.owner`),
      5: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.onlylimited`),
      6: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.onlyobserver`),
    },
  });
  game.settings.register(CONSTANTS.MODULE_NAME, 'hide-items', {
    name: `${CONSTANTS.MODULE_NAME}.setting.hide-items.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.hide-items.hint`,
    scope: 'world',
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_NAME, 'level-permission-items', {
    name: `${CONSTANTS.MODULE_NAME}.setting.level-permission-items.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.level-permission-items.hint`,
    scope: 'world',
    config: true,
    default: 0,
    type: Number,
    choices: <any>{
      0: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.empty`),
      1: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.none`),
      2: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.limited`),
      3: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.observer`),
      4: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.owner`),
      5: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.onlylimited`),
      6: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.onlyobserver`),
    },
  });
  game.settings.register(CONSTANTS.MODULE_NAME, 'hide-journals', {
    name: `${CONSTANTS.MODULE_NAME}.setting.hide-journals.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.hide-journals.hint`,
    scope: 'world',
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_NAME, 'level-permission-journals', {
    name: `${CONSTANTS.MODULE_NAME}.setting.level-permission-journals.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.level-permission-journals.hint`,
    scope: 'world',
    config: true,
    default: 0,
    type: Number,
    choices: <any>{
      0: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.empty`),
      1: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.none`),
      2: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.limited`),
      3: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.observer`),
      4: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.owner`),
      5: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.onlylimited`),
      6: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.onlyobserver`),
    },
  });
  game.settings.register(CONSTANTS.MODULE_NAME, 'hide-rolltables', {
    name: `${CONSTANTS.MODULE_NAME}.setting.hide-rolltables.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.hide-rolltables.hint`,
    scope: 'world',
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_NAME, 'level-permission-rolltables', {
    name: `${CONSTANTS.MODULE_NAME}.setting.level-permission-rolltables.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.level-permission-rolltables.hint`,
    scope: 'world',
    config: true,
    default: 0,
    type: Number,
    choices: <any>{
      0: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.empty`),
      1: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.none`),
      2: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.limited`),
      3: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.observer`),
      4: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.owner`),
      5: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.onlylimited`),
      6: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.onlyobserver`),
    },
  });
  game.settings.register(CONSTANTS.MODULE_NAME, 'hide-cards', {
    name: `${CONSTANTS.MODULE_NAME}.setting.hide-cards.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.hide-cards.hint`,
    scope: 'world',
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_NAME, 'level-permission-cards', {
    name: `${CONSTANTS.MODULE_NAME}.setting.level-permission-cards.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.level-permission-cards.hint`,
    scope: 'world',
    config: true,
    default: 0,
    type: Number,
    choices: <any>{
      0: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.empty`),
      1: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.none`),
      2: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.limited`),
      3: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.observer`),
      4: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.owner`),
      5: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.onlylimited`),
      6: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.onlyobserver`),
    },
  });
  game.settings.register(CONSTANTS.MODULE_NAME, 'hide-scenes', {
    name: `${CONSTANTS.MODULE_NAME}.setting.hide-scenes.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.hide-scenes.hint`,
    scope: 'world',
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_NAME, 'hide-scenes-nav', {
    name: `${CONSTANTS.MODULE_NAME}.setting.hide-scenes-nav.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.hide-scenes-nav.hint`,
    scope: 'world',
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
  game.settings.register(CONSTANTS.MODULE_NAME, 'level-permission-scenes-nav', {
    name: `${CONSTANTS.MODULE_NAME}.setting.level-permission-scenes-nav.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.level-permission-scenes-nav.hint`,
    scope: 'world',
    config: true,
    default: 0,
    type: Number,
    choices: <any>{
      0: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.empty`),
      1: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.none`),
      2: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.limited`),
      3: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.observer`),
      4: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.owner`),
      5: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.onlylimited`),
      6: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.onlyobserver`),
    },
  });
  game.settings.register(CONSTANTS.MODULE_NAME, 'level-permission-scenes-nav-name', {
    name: `${CONSTANTS.MODULE_NAME}.setting.level-permission-scenes-nav-name.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.level-permission-scenes-nav-name.hint`,
    scope: 'world',
    config: true,
    default: 0,
    type: Number,
    choices: <any>{
      0: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.empty`),
      1: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.none`),
      2: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.limited`),
      3: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.observer`),
      4: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.owner`),
      5: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.onlylimited`),
      6: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.onlyobserver`),
    },
  });
  game.settings.register(CONSTANTS.MODULE_NAME, 'no-background-only-symbol', {
    name: `${CONSTANTS.MODULE_NAME}.setting.no-background-only-symbol.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.no-background-only-symbol.hint`,
    scope: 'world',
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_NAME, 'disguise-unreachable-links', {
    name: `${CONSTANTS.MODULE_NAME}.setting.disguise-unreachable-links.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.disguise-unreachable-links.hint`,
    scope: 'world',
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_NAME, 'level-permission-disguise-unreachable-links', {
    name: `${CONSTANTS.MODULE_NAME}.setting.level-permission-disguise-unreachable-links.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.level-permission-disguise-unreachable-links.hint`,
    scope: 'world',
    config: true,
    default: 0,
    type: Number,
    choices: <any>{
      0: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.empty`),
      1: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.none`),
      2: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.limited`),
      3: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.observer`),
      4: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.owner`),
    },
  });
  game.settings.register(CONSTANTS.MODULE_NAME, 'add-css-unhideshow', {
    name: `${CONSTANTS.MODULE_NAME}.setting.add-css-unhideshow.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.add-css-unhideshow.hint`,
    scope: 'world',
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_NAME, 'disable-voices', {
    name: `${CONSTANTS.MODULE_NAME}.setting.disable-voices.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.disable-voices.hint`,
    scope: 'world',
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_NAME, 'hide-soundtracks', {
    name: `${CONSTANTS.MODULE_NAME}.setting.hide-soundtracks.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.hide-soundtracks.hint`,
    scope: 'world',
    config: true,
    type: Boolean,
    default: false,
  });
  // ========================================================================
  game.settings.register(CONSTANTS.MODULE_NAME, 'debug', {
    name: `${CONSTANTS.MODULE_NAME}.setting.debug.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.debug.hint`,
    scope: 'client',
    config: true,
    default: false,
    type: Boolean,
  });
  game.settings.register(CONSTANTS.MODULE_NAME, 'debugHooks', {
    scope: 'world',
    config: false,
    default: false,
    type: Boolean,
  });
  // game.settings.register(CONSTANTS.MODULE_NAME, 'systemFound', {
  //     scope: 'world',
  //     config: false,
  //     default: false,
  //     type: Boolean,
  // });
  // game.settings.register(CONSTANTS.MODULE_NAME, 'systemNotFoundWarningShown', {
  //     scope: 'world',
  //     config: false,
  //     default: false,
  //     type: Boolean,
  // });
  // game.settings.register(CONSTANTS.MODULE_NAME, 'preconfiguredSystem', {
  //     name: `${CONSTANTS.MODULE_NAME}.setting.preconfiguredSystem.name`,
  //     hint: `${CONSTANTS.MODULE_NAME}.setting.preconfiguredSystem.hint`,
  //     scope: 'world',
  //     config: false,
  //     default: false,
  //     type: Boolean,
  // });

  // const settings = defaultSettings();
  // for (const [name, data] of Object.entries(settings)) {
  //     game.settings.register(CONSTANTS.MODULE_NAME, name, data);
  // }
  for (const [name, data] of Object.entries(otherSettings)) {
    game.settings.register(CONSTANTS.MODULE_NAME, name, data);
  }
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
        '</p>',
      buttons: {
        confirm: {
          icon: '<i class="fas fa-check"></i>',
          label: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.dialogs.resetsettings.confirm`),
          callback: async () => {
            await applyDefaultSettings();
            window.location.reload();
          },
        },
        cancel: {
          icon: '<i class="fas fa-times"></i>',
          label: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.dialogs.resetsettings.cancel`),
        },
      },
      default: 'cancel',
    });
  }
  async _updateObject(event, formData) {
    // do nothing
  }
}
async function applyDefaultSettings() {
  // const settings = defaultSettings(true);
  // for (const [name, data] of Object.entries(settings)) {
  //     await game.settings.set(CONSTANTS.MODULE_NAME, name, data.default);
  // }
  const settings2 = otherSettings(true);
  for (const [name, data] of Object.entries(settings2)) {
    //@ts-ignore
    await game.settings.set(CONSTANTS.MODULE_NAME, name, data.default);
  }
}
function defaultSettings(apply = false) {
  return {};
}
function otherSettings(apply = false) {
  return {
    debug: {
      name: `${CONSTANTS.MODULE_NAME}.setting.debug.name`,
      hint: `${CONSTANTS.MODULE_NAME}.setting.debug.hint`,
      scope: 'client',
      config: true,
      default: false,
      type: Boolean,
    },
    debugHooks: {
      name: `${CONSTANTS.MODULE_NAME}.setting.debugHooks.name`,
      hint: `${CONSTANTS.MODULE_NAME}.setting.debugHooks.hint`,
      scope: 'world',
      config: false,
      default: false,
      type: Boolean,
    },
    // systemFound: {
    //     name: `${CONSTANTS.MODULE_NAME}.setting.systemFound.name`,
    //     hint: `${CONSTANTS.MODULE_NAME}.setting.systemFound.hint`,
    //     scope: 'world',
    //     config: false,
    //     default: false,
    //     type: Boolean,
    // },
    // systemNotFoundWarningShown: {
    //     name: `${CONSTANTS.MODULE_NAME}.setting.systemNotFoundWarningShown.name`,
    //     hint: `${CONSTANTS.MODULE_NAME}.setting.systemNotFoundWarningShown.hint`,
    //     scope: 'world',
    //     config: false,
    //     default: false,
    //     type: Boolean,
    // },
    // preconfiguredSystem: {
    //     name: `${CONSTANTS.MODULE_NAME}.setting.preconfiguredSystem.name`,
    //     hint: `${CONSTANTS.MODULE_NAME}.setting.preconfiguredSystem.hint`,
    //     scope: 'world',
    //     config: false,
    //     default: false,
    //     type: Boolean,
    // },
    // =======================================
    'hide-actors': {
      name: `${CONSTANTS.MODULE_NAME}.setting.hide-actors.name`,
      hint: `${CONSTANTS.MODULE_NAME}.setting.hide-actors.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    },
    'level-permission-actors': {
      name: `${CONSTANTS.MODULE_NAME}.setting.level-permission-actors.name`,
      hint: `${CONSTANTS.MODULE_NAME}.setting.level-permission-actors.hint`,
      scope: 'world',
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
    },
    'hide-items': {
      name: `${CONSTANTS.MODULE_NAME}.setting.hide-items.name`,
      hint: `${CONSTANTS.MODULE_NAME}.setting.hide-items.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    },
    'level-permission-items': {
      name: `${CONSTANTS.MODULE_NAME}.setting.level-permission-items.name`,
      hint: `${CONSTANTS.MODULE_NAME}.setting.level-permission-items.hint`,
      scope: 'world',
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
    },
    'hide-journals': {
      name: `${CONSTANTS.MODULE_NAME}.setting.hide-journals.name`,
      hint: `${CONSTANTS.MODULE_NAME}.setting.hide-journals.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    },
    'level-permission-journals': {
      name: `${CONSTANTS.MODULE_NAME}.setting.level-permission-journals.name`,
      hint: `${CONSTANTS.MODULE_NAME}.setting.level-permission-journals.hint`,
      scope: 'world',
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
    },
    'hide-rolltables': {
      name: `${CONSTANTS.MODULE_NAME}.setting.hide-rolltables.name`,
      hint: `${CONSTANTS.MODULE_NAME}.setting.hide-rolltables.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    },
    'level-permission-rolltables': {
      name: `${CONSTANTS.MODULE_NAME}.setting.level-permission-rolltables.name`,
      hint: `${CONSTANTS.MODULE_NAME}.setting.level-permission-rolltables.hint`,
      scope: 'world',
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
    },
    'hide-cards': {
      name: `${CONSTANTS.MODULE_NAME}.setting.hide-cards.name`,
      hint: `${CONSTANTS.MODULE_NAME}.setting.hide-cards.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    },
    'level-permission-cards': {
      name: `${CONSTANTS.MODULE_NAME}.setting.level-permission-cards.name`,
      hint: `${CONSTANTS.MODULE_NAME}.setting.level-permission-cards.hint`,
      scope: 'world',
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
    },
    'hide-scenes': {
      name: `${CONSTANTS.MODULE_NAME}.setting.hide-scenes.name`,
      hint: `${CONSTANTS.MODULE_NAME}.setting.hide-scenes.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    },
    'hide-scenes-nav': {
      name: `${CONSTANTS.MODULE_NAME}.setting.hide-scenes-nav.name`,
      hint: `${CONSTANTS.MODULE_NAME}.setting.hide-scenes-nav.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    },
    // 'level-permission-scenes': {
    //   name: `${CONSTANTS.MODULE_NAME}.setting.level-permission-scenes.name`,
    //   hint: `${CONSTANTS.MODULE_NAME}.setting.level-permission-scenes.hint`,
    //   scope: 'world',
    //   config: true,
    //   default: 0,
    //   type: Number,
    //   choices: {
    //     0: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.empty`),
    //     1: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.none`),
    //     2: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.limited`),
    //     3: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.observer`),
    //     4: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.setting.level-permission.owner`),
    //   },
    // },
    'level-permission-scenes-nav': {
      name: `${CONSTANTS.MODULE_NAME}.setting.level-permission-scenes-nav.name`,
      hint: `${CONSTANTS.MODULE_NAME}.setting.level-permission-scenes-nav.hint`,
      scope: 'world',
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
      onChange: (value) => resetNavbar(),
    },
    'level-permission-scenes-nav-name': {
      name: `${CONSTANTS.MODULE_NAME}.setting.level-permission-scenes-nav-name.name`,
      hint: `${CONSTANTS.MODULE_NAME}.setting.level-permission-scenes-nav-name.hint`,
      scope: 'world',
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
      onChange: (value) => resetNavbar(),
    },
    'no-background-only-symbol': {
      name: `${CONSTANTS.MODULE_NAME}.setting.no-background-only-symbol.name`,
      hint: `${CONSTANTS.MODULE_NAME}.setting.no-background-only-symbol.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    },
    'disguise-unreachable-links': {
      name: `${CONSTANTS.MODULE_NAME}.setting.disguise-unreachable-links.name`,
      hint: `${CONSTANTS.MODULE_NAME}.setting.disguise-unreachable-links.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    },
    'level-permission-disguise-unreachable-links': {
      name: `${CONSTANTS.MODULE_NAME}.setting.level-permission-disguise-unreachable-links.name`,
      hint: `${CONSTANTS.MODULE_NAME}.setting.level-permission-disguise-unreachable-links.hint`,
      scope: 'world',
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
    },
    'add-css-unhideshow': {
      name: `${CONSTANTS.MODULE_NAME}.setting.add-css-unhideshow.name`,
      hint: `${CONSTANTS.MODULE_NAME}.setting.add-css-unhideshow.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    },
    'disable-voices': {
      name: `${CONSTANTS.MODULE_NAME}.setting.disable-voices.name`,
      hint: `${CONSTANTS.MODULE_NAME}.setting.disable-voices.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    },
    'hide-soundtracks': {
      name: `${CONSTANTS.MODULE_NAME}.setting.hide-soundtracks.name`,
      hint: `${CONSTANTS.MODULE_NAME}.setting.hide-soundtracks.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    },
  };
}
