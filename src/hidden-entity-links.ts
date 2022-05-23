import API from './module/api.js';
import CONSTANTS from './module/constants.js';
import { HiddenEntityLinkFlags } from './module/hidden-entity-link-models.js';
import { dialogWarning, error, log, resetNavbar } from './module/lib/lib.js';
import { registerSettings } from './module/settings.js';

/* ------------------------------------ */
/* Initialize module					*/
/* ------------------------------------ */
Hooks.once('init', function () {
  log(' init ' + CONSTANTS.MODULE_NAME);
  // Register custom module settings
  registerSettings();
  // Register custom sheets (if any)
  initHooks();
});
/* ------------------------------------ */
/* Setup module							*/
/* ------------------------------------ */
Hooks.once('setup', function () {
  setupHooks();
});
/* ------------------------------------ */
/* When ready							*/
/* ------------------------------------ */
Hooks.once('ready', function () {
  if (!game.modules.get('lib-wrapper')?.active && game.user?.isGM) {
    let word = 'install and activate';
    if (game.modules.get('lib-wrapper')) word = 'activate';
    throw error(`Requires the 'libWrapper' module. Please ${word} it.`);
  }
  if (!game.modules.get('socketlib')?.active && game.user?.isGM) {
    let word = 'install and activate';
    if (game.modules.get('socketlib')) word = 'activate';
    throw error(`Requires the 'socketlib' module. Please ${word} it.`);
  }
  if (game.modules.get('disguise-unreachable-links')?.active && game.user?.isGM) {
    dialogWarning(
      `With 'disguise-unreachable-links' module enabled and active. There is a Redundancy of features you can disable 'Disguise Unreachable Links' module if you want.`,
    );
  }
  if (game.modules.get('hidden-tables')?.active && game.user?.isGM) {
    dialogWarning(
      `With 'hidden-tables' module enabled and active. There is a Redundancy of features you can disable 'Hidden Tables' module if you want.`,
    );
  }
  if (game.modules.get('hiddensoundtracks')?.active && game.user?.isGM) {
    dialogWarning(
      `With 'hiddensoundtracks' module enabled and active. There is a Redundancy of features you can disable 'Hidden Soundtracks' module if you want.`,
    );
  }

  if (game.modules.get('navbar-tweaks')?.active && game.user?.isGM) {
    dialogWarning(
      `With 'navbar-tweaks' module enabled and active. There is a Redundancy of features you can disable 'Navbar Tweaks' module if you want.`,
    );
  }

  if (game.modules.get('navigation-name')?.active && game.user?.isGM) {
    dialogWarning(
      `With 'navigation-name' module enabled and active. There is a Redundancy of features you can disable 'Navigation Name' module if you want.`,
    );
  }

  // Do anything once the module is ready
  readyHooks();
});

/* ------------------------------------ */
/* Other Hooks							*/
/* ------------------------------------ */

export interface HiddenEntityLinkModuleData {
  api: typeof API;
  socket: any;
}

/**
 * Initialization helper, to set API.
 * @param api to set to game module.
 */
export function setApi(api: typeof API): void {
  const data = game.modules.get(CONSTANTS.MODULE_NAME) as unknown as HiddenEntityLinkModuleData;
  data.api = api;
}

/**
 * Returns the set API.
 * @returns Api from games module.
 */
export function getApi(): typeof API {
  const data = game.modules.get(CONSTANTS.MODULE_NAME) as unknown as HiddenEntityLinkModuleData;
  return data.api;
}

/**
 * Initialization helper, to set Socket.
 * @param socket to set to game module.
 */
export function setSocket(socket: any): void {
  const data = game.modules.get(CONSTANTS.MODULE_NAME) as unknown as HiddenEntityLinkModuleData;
  data.socket = socket;
}

/*
 * Returns the set socket.
 * @returns Socket from games module.
 */
export function getSocket() {
  const data = game.modules.get(CONSTANTS.MODULE_NAME) as unknown as HiddenEntityLinkModuleData;
  return data.socket;
}

Hooks.once('libChangelogsReady', function () {
  //@ts-ignore
  libChangelogs.registerConflict(
    CONSTANTS.MODULE_NAME,
    'disguise-unreachable-links',
    `Redundancy of features you can disable 'Disguise Unreachable Links' module if you want`,
    'major',
  );

  //@ts-ignore
  libChangelogs.registerConflict(
    CONSTANTS.MODULE_NAME,
    'hidden-tables',
    `Redundancy of features you can disable 'Hidden Tables' module if you want`,
    'major',
  );
  //@ts-ignore
  libChangelogs.registerConflict(
    CONSTANTS.MODULE_NAME,
    'hiddensoundtracks',
    `Redundancy of features you can disable 'Hidden Soundtracks' module if you want`,
    'major',
  );
  //@ts-ignore
  libChangelogs.registerConflict(
    CONSTANTS.MODULE_NAME,
    'navbar-tweaks',
    `Redundancy of features you can disable 'Navbar Tweaks' module if you want`,
    'major',
  );
  //@ts-ignore
  libChangelogs.registerConflict(
    CONSTANTS.MODULE_NAME,
    'navigation-name',
    `Redundancy of features you can disable 'Navbar Tweaks' module if you want`,
    'major',
  );

  //@ts-ignore
  libChangelogs.register(
    CONSTANTS.MODULE_NAME,
    `
    `,
    'minor',
  );
});

// ==================
// API SUPPORT
// ==================

export class HiddenEntityLinks {
  // static API = 'hiddenEntityLinks';

  // socket = undefined;

  // /**
  //  * For each folder
  // */
  // async function directoryRenderedHiddenFolderEntityLinks(obj, html, data) {
  //   if (!game.user?.isGM){
  //     return;
  //   }
  //   let collectionFolder = obj.folders;
  //   let listFolder = html.find('li.directory-item.folder')
  //   for (let liFolder of listFolder) {
  //     liFolder = $(liFolder);
  //     let folder = collectionFolder.find((f) => {
  //       return f.id == liFolder.attr('data-folder-id');
  //     });
  //     if(folder){
  //       let isHidden = folder.getFlag(mod, HiddenEntityLinkFlags.HIDDEN);
  //       if (isHidden && liFolder.find('.hidden-entity-links').length <= 0) {
  //         let div = $(
  //           `<div class=CONSTANTS.MODULE_NAME style="position:absolute;padding-left:20px;">
  //             <i class="fas fa-lightbulb" style="color:darkRed; text-shadow: 0 0 8px darkRed;"/>
  //           </div>`,
  //         );
  //         liFolder.find('h3').before(div);
  //       }
  //     }
  //   }
  // }

  updateFolderHiddenEntityLinks = async function (entityData, html, data) {
    const listFolder = html.parent().parent().find('li.directory-item.folder');
    for (let liFolder of listFolder) {
      liFolder = $(liFolder);
      const folder = game.folders?.find((folderObject) => {
        return folderObject.id == liFolder.attr('data-folder-id');
      });
      if (folder) {
        // let list =
        //   liFolder.find('li.directory-item.document')?.length > 0
        //     ? liFolder.find('li.directory-item.document')
        //     : liFolder.find('li.directory-item.entity');
        API.hiddenEntityLinks.updateHiddenEntityLinks(entityData, liFolder, undefined);
      }
    }
  };

  updateHiddenEntityLinks = async function (entityData, html, data) {
    const list =
      html.find('li.directory-item.document')?.length > 0
        ? html.find('li.directory-item.document')
        : html.find('li.directory-item.entity');
    for (let li of list) {
      li = $(li);
      if (entityData.id == li.attr('data-document-id') || entityData.id == li.attr('data-entity-id')) {
        //let isHidden = data.flags[CONSTANTS.MODULE_NAME]?.hidden; // why is undefined ??
        const state = this._checkState(entityData);
        if (state == this._state.HIDE) {
          if (!game.user?.isGM) {
            // do nothing
          } else {
            // let div = $(
            //   `<div class=CONSTANTS.MODULE_NAME style="position:absolute;padding-left:45px;">
            //     <i class="fas fa-lightbulb" style="color:darkRed; text-shadow: 0 0 8px darkRed;"/>
            //   </div>`,
            // );
            // li.find('.entity-name').before(div);
            if (entityData instanceof Scene || game.settings.get(CONSTANTS.MODULE_NAME, 'no-background-only-symbol')) {
              if (li.find('.hidden-entity-links-scene').length <= 0) {
                const div = $(
                  `<div class="hidden-entity-links-scene">
                    <i class="fas fa-lightbulb"/>
                  </div>`,
                );
                //li.find('.entity-name').after(div);
                li.append(div);
              }
            } else {
              if (!li.hasClass(CONSTANTS.MODULE_NAME)) {
                li.addClass(CONSTANTS.MODULE_NAME);
              }
            }
            // if (
            //   entityData instanceof Scene ||
            //   game.settings.get(CONSTANTS.MODULE_NAME, 'no-background-only-symbol')
            // ) {
            li.find('.hidden-entity-links-scene-show').remove();
            li.find('.hidden-entity-links-scene-unhideshow').remove();
            // } else {
            li.removeClass('hidden-entity-links-show');
            li.removeClass('hidden-entity-links-unhideshow');
            // }
          }
        } else if (state == this._state.SHOW) {
          if (!game.user?.isGM) {
            // do nothing
          } else {
            if (entityData instanceof Scene || game.settings.get(CONSTANTS.MODULE_NAME, 'no-background-only-symbol')) {
              if (li.find('.hidden-entity-links-scene-show').length <= 0) {
                const div = $(
                  `<div class="hidden-entity-links-scene-show">
                    <i class="fas fa-lightbulb"/>
                  </div>`,
                );
                //li.find('.entity-name').after(div);
                li.append(div);
              }
            } else {
              if (!li.hasClass('hidden-entity-links-show')) {
                li.addClass('hidden-entity-links-show');
              }
            }
            // if (
            //   entityData instanceof Scene ||
            //   game.settings.get(CONSTANTS.MODULE_NAME, 'no-background-only-symbol')
            // ) {
            li.find('.hidden-entity-links-scene').remove();
            li.find('.hidden-entity-links-scene-unhideshow').remove();
            // } else {
            li.removeClass(CONSTANTS.MODULE_NAME);
            li.removeClass('hidden-entity-links-unhideshow');
            // }
          }
        } else {
          if (!game.user?.isGM) {
            // do nothing
          } else {
            // li.find('.hidden-entity-links').remove();
            // if (
            //   entityData instanceof Scene ||
            //   game.settings.get(CONSTANTS.MODULE_NAME, 'no-background-only-symbol')
            // ) {
            li.find('.hidden-entity-links-scene').remove();
            li.find('.hidden-entity-links-scene-show').remove();
            // } else {
            li.removeClass(CONSTANTS.MODULE_NAME);
            li.removeClass('hidden-entity-links-show');
            // }
            if (game.settings.get(CONSTANTS.MODULE_NAME, 'add-css-unhideshow')) {
              if (
                entityData instanceof Scene ||
                game.settings.get(CONSTANTS.MODULE_NAME, 'no-background-only-symbol')
              ) {
                if (li.find('.hidden-entity-links-scene-unhideshow').length <= 0) {
                  const div = $(
                    `<div class="hidden-entity-links-scene-unhideshow">
                      <i class="fas fa-lightbulb"/>
                    </div>`,
                  );
                  //li.find('.entity-name').after(div);
                  li.append(div);
                }
              } else {
                if (!li.hasClass('hidden-entity-links-unhideshow')) {
                  li.addClass('hidden-entity-links-unhideshow');
                }
              }
            }
          }
        }
        // ui.sidebar.render(true);
        break;
      }
    }
  };

  /**
   * For each entity/document
   */
  directoryRenderedHiddenEntityLinks = async function (obj, html, data, entities) {
    // const contextOptions = obj._getEntryContextOptions();
    // let collection = obj.constructor.collection;
    const collection = entities.directory?.documents;
    if (!collection || collection.length == 0) {
      return;
    }

    const list =
      html.find('li.directory-item.document')?.length > 0
        ? html.find('li.directory-item.document')
        : html.find('li.directory-item.entity');
    for (let li of list) {
      li = $(li);
      const document = collection.find((d) => {
        return d.id == li.attr('data-document-id') || d.id == li.attr('data-entity-id');
      });
      // let document = collection.get(li.attr("data-document-id"))
      if (document) {
        try {
          // let isHidden = data._id == document.id && data.flags[CONSTANTS.MODULE_NAME]?.hidden
          //   ? data.flags[CONSTANTS.MODULE_NAME]?.hidden
          //   : document.getFlag(mod, HiddenEntityLinkFlags.HIDDEN);
          // let isHidden = document.getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
          const state = this._checkState(document);
          if (state == this._state.HIDE) {
            if (!game.user?.isGM) {
              //setProperty(document, 'visible', false);
              // TODO why i must do this ?????
              // li.hide();
            } else {
              // let div = $(
              //   `<div class=CONSTANTS.MODULE_NAME style="position:absolute;padding-left:45px;">
              //     <i class="fas fa-lightbulb" style="color:darkRed; text-shadow: 0 0 8px darkRed;"/>
              //   </div>`,
              // );
              // li.find('.entity-name').before(div);
              if (
                obj instanceof SceneDirectory ||
                game.settings.get(CONSTANTS.MODULE_NAME, 'no-background-only-symbol')
              ) {
                if (li.find('.hidden-entity-links-scene').length <= 0) {
                  const div = $(
                    `<div class="hidden-entity-links-scene">
                      <i class="fas fa-lightbulb"/>
                    </div>`,
                  );
                  //li.find('.entity-name').after(div);
                  li.append(div);
                }
              } else {
                if (!li.hasClass(CONSTANTS.MODULE_NAME)) {
                  li.addClass(CONSTANTS.MODULE_NAME);
                }
              }
            }
          } else if (state == this._state.SHOW) {
            if (!game.user?.isGM) {
              //setProperty(document, 'visible', false);
              // TODO why i must do this ?????
              // li.hide();
            } else {
              // let div = $(
              //   `<div class=CONSTANTS.MODULE_NAME style="position:absolute;padding-left:45px;">
              //     <i class="fas fa-lightbulb" style="color:darkRed; text-shadow: 0 0 8px darkRed;"/>
              //   </div>`,
              // );
              // li.find('.entity-name').before(div);
              if (
                obj instanceof SceneDirectory ||
                game.settings.get(CONSTANTS.MODULE_NAME, 'no-background-only-symbol')
              ) {
                if (li.find('.hidden-entity-links-scene-show').length <= 0) {
                  const div = $(
                    `<div class="hidden-entity-links-scene-show">
                      <i class="fas fa-lightbulb"/>
                    </div>`,
                  );
                  //li.find('.entity-name').after(div);
                  li.append(div);
                }
              } else {
                if (!li.hasClass('hidden-entity-links-show')) {
                  li.addClass('hidden-entity-links-show');
                }
              }
            }
          } else {
            if (!game.user?.isGM) {
              //setProperty(document, 'visible', true);
              // TODO why i must do this ?????
              // li.show();
            } else {
              if (game.settings.get(CONSTANTS.MODULE_NAME, 'add-css-unhideshow')) {
                if (
                  obj instanceof SceneDirectory ||
                  game.settings.get(CONSTANTS.MODULE_NAME, 'no-background-only-symbol')
                ) {
                  if (li.find('.hidden-entity-links-scene-unhideshow').length <= 0) {
                    const div = $(
                      `<div class="hidden-entity-links-scene-unhideshow">
                        <i class="fas fa-lightbulb"/>
                      </div>`,
                    );
                    //li.find('.entity-name').after(div);
                    li.append(div);
                  }
                } else {
                  if (!li.hasClass('hidden-entity-links-unhideshow')) {
                    li.addClass('hidden-entity-links-unhideshow');
                  }
                }
              }
            }
          }
        } catch (e) {
          // This is just a patch for a bug during the beta of the beta
          // we can probably remove in the future
          // if (hasProperty(document.data, `flags.${CONSTANTS.MODULE_NAME}`)) {
          //   await document.unsetFlag(CONSTANTS.MODULE_NAME, 'true');
          //   await document.unsetFlag(CONSTANTS.MODULE_NAME, 'false');
          // }
          // throw e;
        }
      }
    }
  };

  _EntityMap = {
    JournalEntry: 'journal',
    Actor: 'actors',
    RollTable: 'tables',
    Scene: 'scenes',
    Item: 'items',
    Card: 'cards',
  };

  _permissions = {
    EMPTY: 0,
    NONE: 1,
    LIMITED: 2,
    OBSERVER: 3,
    OWNER: 4,
    ONLY_LIMITED: 5,
    ONLY_OBSERVER: 6,
  };

  _state = {
    HIDE: 0,
    UNHIDE: 1,
    SHOW: 2,
  };

  /**
   * For any link in the text which points to a document which is not visible to the current player
   * it will be replaced by the non-link text (so the player will be NOT aware that a link exists)
   * @param {ActorSheet} [sheet] Sheet for renderJournalSheet and renderActorSheet hooks
   * @param {jQuery}     [html]  HTML  for renderJournalSheet and renderActorSheet hooks
   * @param {Object}     [data]  Data for renderJournalSheet and renderActorSheet hooks
   */
  hideRenderedHiddenEntityLinks = function (sheet, html, data) {
    if (!game.settings.get(CONSTANTS.MODULE_NAME, 'disguise-unreachable-links')) {
      return;
    }
    // Only check for link visibility if NOT a gm
    if (game.user?.isGM) {
      return;
    }
    // Original link:
    //     <a class="entity-link" draggable="true" [ data-entity="JournalEntry" | data-pack="packname" ] data-id=".....">
    //     <i class="fas fa-th-list">::before</i>
    //     plain text
    //     </a>
    // If the "data-id" isn't observable by the current user, then replace with just "plain text"
    html
      .find('a.entity-link')
      .filter((index, a) => {
        // This filter function needs to return true if the link is to be replaced by normal text
        const dataentity = a.getAttribute('data-entity'); // RollTable, JournalEntry, Actor
        if (!dataentity) {
          // Compendium packs are only limited at the PACK level, not an individual document level
          return game.packs.get(a.getAttribute('data-pack'))?.private;
        }
        const entity = this._EntityMap[dataentity];
        if (!entity) {
          console.warn(`checkRenderLinks#EntityMap does not have '${entity}'`);
          return false;
        }
        if (
          game.settings.get(CONSTANTS.MODULE_NAME, 'level-permission-disguise-unreachable-links') ==
          this._permissions.EMPTY
        ) {
          const item = game[entity].get(a.getAttribute('data-id'));
          return !item || !item.testUserPermission(game.user, 'LIMITED');
        } else {
          const reference = game[entity].get(a.getAttribute('data-id'));
          if (reference) {
            // const perm = this._checkPermission(reference, game.user,'level-permission-disguise-unreachable-links');
            // return perm;
            const perm = game.settings.get(CONSTANTS.MODULE_NAME, 'level-permission-disguise-unreachable-links');
            if (perm == this._permissions.EMPTY) {
              return !reference.testUserPermission(game.user, 'LIMITED');
            } else if (perm == this._permissions.NONE) {
              return !reference.testUserPermission(game.user, 'NONE');
            } else if (perm == this._permissions.LIMITED) {
              return !reference.testUserPermission(game.user, 'LIMITED');
            } else if (perm == this._permissions.OBSERVER) {
              return !reference.testUserPermission(game.user, 'OBSERVER');
            } else if (perm == this._permissions.OWNER) {
              return !reference.testUserPermission(game.user, 'OWNER');
            }
          } else {
            return true;
          }
        }
      })
      .replaceWith((index, a) => {
        const pos = a.indexOf('</i> ');
        return pos < 0 ? a : a.slice(pos + 5);
      });
  };

  hideEntityLink = async function (entityID, entities) {
    const entity = entities.find((e) => {
      return e && e.id == entityID;
    });
    if (entity) {
      const hasFlagHide = hasProperty(entity.data, `flags.${CONSTANTS.MODULE_NAME}.${HiddenEntityLinkFlags.HIDDEN}`);
      if (hasFlagHide) {
        await entity.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, true);
      }
    }
  };

  unhideEntityLink = async function (entityID, entities) {
    const entity = entities.find((e) => {
      return e && e.id == entityID;
    });
    if (entity) {
      const hasFlagHide = hasProperty(entity.data, `flags.${CONSTANTS.MODULE_NAME}.${HiddenEntityLinkFlags.HIDDEN}`);
      if (hasFlagHide) {
        await entity.unsetFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
      }
    }
  };

  showEntityLink = async function (entityID, entities) {
    const entity = entities.find((e) => {
      return e && e.id == entityID;
    });
    if (entity) {
      const hasFlagHide = hasProperty(entity.data, `flags.${CONSTANTS.MODULE_NAME}.${HiddenEntityLinkFlags.HIDDEN}`);
      if (hasFlagHide) {
        await entity.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, false);
      }
    }
  };

  _checkPermission = function (entity, user, setting) {
    let result = true;
    let set;
    if (setting == 'level-permission-actors') {
      set = game.settings.get(CONSTANTS.MODULE_NAME, 'level-permission-actors');
    } else if (setting == 'level-permission-items') {
      set = game.settings.get(CONSTANTS.MODULE_NAME, 'level-permission-items');
    } else if (setting == 'level-permission-journals') {
      set = game.settings.get(CONSTANTS.MODULE_NAME, 'level-permission-journals');
    } else if (setting == 'level-permission-rolltables') {
      set = game.settings.get(CONSTANTS.MODULE_NAME, 'level-permission-rolltables');
    } else if (setting == 'level-permission-cards') {
      set = game.settings.get(CONSTANTS.MODULE_NAME, 'level-permission-cards');
      // } else if (setting == 'level-permission-scenes') {
      //   set = game.settings.get(CONSTANTS.MODULE_NAME, 'level-permission-scenes');
    } else if (setting == 'level-permission-scenes-nav') {
      set = game.settings.get(CONSTANTS.MODULE_NAME, 'level-permission-scenes-nav');
    } else if (setting == 'level-permission-scenes-nav-name') {
      set = game.settings.get(CONSTANTS.MODULE_NAME, 'level-permission-scenes-nav-name');
    } else if (setting == 'level-permission-disguise-unreachable-links') {
      set = game.settings.get(CONSTANTS.MODULE_NAME, 'level-permission-disguise-unreachable-links');
    } else {
      throw new Error(`NO module setting found for key '${setting}'`);
    }
    if (set == this._permissions.EMPTY) {
      result = false;
    } else if (set == this._permissions.NONE) {
      result = !entity.testUserPermission(user, 'LIMITED');
    } else if (set == this._permissions.LIMITED) {
      result = !entity.testUserPermission(user, 'OBSERVER');
    } else if (set == this._permissions.OBSERVER) {
      result = !entity.testUserPermission(user, 'OWNER');
    } else if (set == this._permissions.OWNER) {
      result = true;
    } else if (set == this._permissions.ONLY_LIMITED) {
      result =
        !entity.testUserPermission(user, 'NONE', { exact: true }) &&
        entity.testUserPermission(user, 'LIMITED', { exact: true }) &&
        !entity.testUserPermission(user, 'OBSERVER', { exact: true }) &&
        !entity.testUserPermission(user, 'OWNER', { exact: true });
    } else if (set == this._permissions.ONLY_OBSERVER) {
      result =
        !entity.testUserPermission(user, 'NONE', { exact: true }) &&
        !entity.testUserPermission(user, 'LIMITED', { exact: true }) &&
        entity.testUserPermission(user, 'OBSERVER', { exact: true }) &&
        !entity.testUserPermission(user, 'OWNER', { exact: true });
    }

    return result;
  };

  _checkState = function (entity) {
    const hasFlagHide =
      hasProperty(entity.data, `flags.${CONSTANTS.MODULE_NAME}.${HiddenEntityLinkFlags.HIDDEN}`) &&
      entity.getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN) != null &&
      entity.getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN) != undefined;
    if (hasFlagHide) {
      if (entity.getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN)) {
        return this._state.HIDE;
      } else {
        return this._state.SHOW;
      }
    } else {
      return this._state.UNHIDE;
    }
  };

  // userUpdated(user) {
  //   for (let user_div of $('.hidden-entity-links-user')) {
  //     let id = $(user_div).attr('data-user-id');
  //     if (id == user.id) {
  //       $(user_div).css('background-color', user.data.color);
  //     }
  //   }
  // }

  hiddenTable(wrapped, ...args) {
    if ((<RollTable><unknown>this).getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN_TABLE)) {
      try {
        args[0].rollMode = 'gmroll';
      } catch {
        args.push({ rollMode: 'gmroll' });
      }
    }
    return wrapped(...args);
  }
}


export const initHooks = () => {
  API.hiddenEntityLinks = new HiddenEntityLinks();
  setApi(API);
  //@ts-ignore
  libWrapper.register(CONSTANTS.MODULE_NAME, 'RollTable.prototype.draw', API.hiddenEntityLinks.hiddenTable, 'WRAPPER');
};

export const setupHooks = () => {
  // Settings.registerSettings();

  Hooks.on('renderRollTableConfig', (config, html, css) => {
    const isHidden = config.object.getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN_TABLE);
    const lastBox = html.find('.results');
    const checkboxHTML = `
    <div class="form-group">
        <label>${game.i18n.format('hidden-entity-links.label.tableTextHiddenTable')}</label>
        <input type="checkbox" name="flags.${CONSTANTS.MODULE_NAME}.${HiddenEntityLinkFlags.HIDDEN_TABLE}" ${isHidden ? 'checked' : ''}>
    </div>
    `;
    lastBox.before(checkboxHTML);
  });

  Hooks.on('renderJournalDirectory', (obj, html, data) => {
    if (game.settings.get(CONSTANTS.MODULE_NAME, 'hide-journals')) {
      const entities = game.journal;
      // if (hiddenEntityLinksSocket) {
      //   hiddenEntityLinksSocket.executeForEveryone('directoryRenderedHiddenEntityLinks', obj, html, data, entities);
      //   hiddenEntityLinksSocket.executeForEveryone('hideRenderedHiddenEntityLinks', obj, html, data);
      // } else {
      API.hiddenEntityLinks.directoryRenderedHiddenEntityLinks(obj, html, data, entities);
      // API.hiddenEntityLinks.hideRenderedHiddenEntityLinks(obj, html, data);
      // }
    }
  });
  Hooks.on('renderSceneDirectory', (obj, html, data) => {
    if (game.settings.get(CONSTANTS.MODULE_NAME, 'hide-scenes')) {
      const entities = game.scenes;
      // if (hiddenEntityLinksSocket) {
      //   hiddenEntityLinksSocket.executeForEveryone('directoryRenderedHiddenEntityLinks', obj, html, data, entities);
      //   hiddenEntityLinksSocket.executeForEveryone('hideRenderedHiddenEntityLinks', obj, html, data);
      // } else {
      API.hiddenEntityLinks.directoryRenderedHiddenEntityLinks(obj, html, data, entities);
      // API.hiddenEntityLinks.hideRenderedHiddenEntityLinks(obj, html, data);
      // }
    }
  });
  Hooks.on('renderActorDirectory', (obj, html, data) => {
    if (game.settings.get(CONSTANTS.MODULE_NAME, 'hide-actors')) {
      const entities = game.actors;
      // if (hiddenEntityLinksSocket) {
      //   hiddenEntityLinksSocket.executeForEveryone('directoryRenderedHiddenEntityLinks', obj, html, data, entities);
      //   hiddenEntityLinksSocket.executeForEveryone('hideRenderedHiddenEntityLinks', obj, html, data);
      // } else {
      API.hiddenEntityLinks.directoryRenderedHiddenEntityLinks(obj, html, data, entities);
      // API.hiddenEntityLinks.hideRenderedHiddenEntityLinks(obj, html, data);
      // }
    }
  });
  Hooks.on('renderItemDirectory', (obj, html, data) => {
    if (game.settings.get(CONSTANTS.MODULE_NAME, 'hide-items')) {
      const entities = game.items;
      // if (hiddenEntityLinksSocket) {
      //   hiddenEntityLinksSocket.executeForEveryone('directoryRenderedHiddenEntityLinks', obj, html, data, entities);
      //   hiddenEntityLinksSocket.executeForEveryone('hideRenderedHiddenEntityLinks', obj, html, data);
      // } else {
      API.hiddenEntityLinks.directoryRenderedHiddenEntityLinks(obj, html, data, entities);
      // API.hiddenEntityLinks.hideRenderedHiddenEntityLinks(obj, html, data);
      // }
    }
  });
  // Hooks.on('renderMacroDirectory', directoryRenderedHiddenEntityLinks);
  Hooks.on('renderRollTableDirectory', (obj, html, data) => {
    if (game.settings.get(CONSTANTS.MODULE_NAME, 'hide-rolltables')) {
      const entities = game.tables;
      // if (hiddenEntityLinksSocket) {
      //   hiddenEntityLinksSocket.executeForEveryone('directoryRenderedHiddenEntityLinks', obj, html, data, entities);
      //   hiddenEntityLinksSocket.executeForEveryone('hideRenderedHiddenEntityLinks', obj, html, data);
      // } else {
      API.hiddenEntityLinks.directoryRenderedHiddenEntityLinks(obj, html, data, entities);
      // API.hiddenEntityLinks.hideRenderedHiddenEntityLinks(obj, html, data);
      // }
    }
  });

  Hooks.on('renderCardsDirectory', (obj, html, data) => {
    const entities = game.cards;
    // if (hiddenEntityLinksSocket) {
    //   hiddenEntityLinksSocket.executeForEveryone('directoryRenderedHiddenEntityLinks', obj, html, data, entities);
    //   hiddenEntityLinksSocket.executeForEveryone('hideRenderedHiddenEntityLinks', obj, html, data);
    // } else {
    API.hiddenEntityLinks.directoryRenderedHiddenEntityLinks(obj, html, data, entities);
    //API.hiddenEntityLinks.hideRenderedHiddenEntityLinks(obj, html, data);
    // }
  });

  // =======================
  // Journal
  // =======================

  if (game.settings.get(CONSTANTS.MODULE_NAME, 'hide-journals')) {
    //@ts-ignore
    libWrapper.register(
      CONSTANTS.MODULE_NAME,
      'JournalEntry.prototype.visible',
      function (wrapped, ...args) {
        if (game.user?.isGM) {
          return true;
        }
        if (!game.user?.isGM && API.hiddenEntityLinks._checkState(this) == API.hiddenEntityLinks._state.HIDE) {
          return false;
        }
        if (!game.user?.isGM && API.hiddenEntityLinks._checkState(this) == API.hiddenEntityLinks._state.SHOW) {
          return true;
        }
        if (API.hiddenEntityLinks._checkPermission(this, game.user, 'level-permission-journals')) {
          return false;
        }
        return true;
      },
      'OVERRIDE',
    );

    // libWrapper.register(
    //   mod,
    //   'JournalSheet.prototype._onShowPlayers',
    //   function (wrapped, ...args) {
    //     // event.preventDefault();
    //     // await this.submit();
    //     if (game.user?.isGM) {
    //       return wrapped(...args);
    //     }
    //     if (this.object.getFlag(mod, HiddenEntityLinkFlags.HIDDEN)) {
    //       return;
    //     }
    //     // return this.object.show(this._sheetMode, true);
    //     return wrapped(...args);
    //   },
    //   'MIXED',
    // );

    //@ts-ignore
    libWrapper.register(
      CONSTANTS.MODULE_NAME,
      'JournalSheet.prototype._inferDefaultMode',
      function (wrapped, ...args) {
        if (game.user?.isGM) {
          return wrapped(...args);
        }
        if (this.object.getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN)) {
          if (this.object.limited && this.object.data.content) {
            return 'text';
          }
          if (this.object.limited && this.object.data.img) {
            // Removed limited we use a flag now
            return 'image';
          }
        }
        return wrapped(...args);
      },
      'MIXED',
    );

    // libWrapper.register(
    //   CONSTANTS.MODULE_NAME,
    //   'JournalDirectory.prototype._getEntryContextOptions',
    //   function (wrapped, ...args) {
    //     const options = SidebarDirectory.prototype._getEntryContextOptions.call(this);
    Hooks.on('getJournalDirectoryEntryContext', (html, options) => {
      if (game.settings.get(CONSTANTS.MODULE_NAME, 'disable-voices')) {
        return options;
      }
      options.push(
        //return [
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.hide-entity`),
          icon: '<i class="far fa-lightbulb"></i>',
          condition: (li) => {
            const journal = game.journal?.get(li.data('entityId'))
              ? <StoredDocument<JournalEntry>>game.journal?.get(li.data('entityId'))
              : <StoredDocument<JournalEntry>>game.journal?.get(li.data('documentId'));
            if (
              game.user?.isGM &&
              (API.hiddenEntityLinks._checkState(journal) == API.hiddenEntityLinks._state.UNHIDE ||
                API.hiddenEntityLinks._checkState(journal) == API.hiddenEntityLinks._state.SHOW)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const journal = game.journal?.get(li.data('entityId'))
              ? <StoredDocument<JournalEntry>>game.journal?.get(li.data('entityId'))
              : <StoredDocument<JournalEntry>>game.journal?.get(li.data('documentId'));
            await journal.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, true);
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.unhide-entity`),
          icon: '<i class="fas fa-low-vision"></i>',
          condition: (li) => {
            const journal = game.journal?.get(li.data('entityId'))
              ? <StoredDocument<JournalEntry>>game.journal?.get(li.data('entityId'))
              : <StoredDocument<JournalEntry>>game.journal?.get(li.data('documentId'));
            if (
              game.user?.isGM &&
              (API.hiddenEntityLinks._checkState(journal) == API.hiddenEntityLinks._state.HIDE ||
                API.hiddenEntityLinks._checkState(journal) == API.hiddenEntityLinks._state.SHOW)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const journal = game.journal?.get(li.data('entityId'))
              ? <StoredDocument<JournalEntry>>game.journal?.get(li.data('entityId'))
              : <StoredDocument<JournalEntry>>game.journal?.get(li.data('documentId'));
            await journal.unsetFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.show-entity`),
          icon: '<i class="fas fa-lightbulb"></i>',
          condition: (li) => {
            const journal = game.journal?.get(li.data('entityId'))
              ? <StoredDocument<JournalEntry>>game.journal?.get(li.data('entityId'))
              : <StoredDocument<JournalEntry>>game.journal?.get(li.data('documentId'));
            if (
              game.user?.isGM &&
              (API.hiddenEntityLinks._checkState(journal) == API.hiddenEntityLinks._state.HIDE ||
                API.hiddenEntityLinks._checkState(journal) == API.hiddenEntityLinks._state.UNHIDE)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const journal = game.journal?.get(li.data('entityId'))
              ? <StoredDocument<JournalEntry>>game.journal?.get(li.data('entityId'))
              : <StoredDocument<JournalEntry>>game.journal?.get(li.data('documentId'));
            await journal.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, false);
          },
        },
      ); //].concat(options);
      // },
      // 'MIXED',
    });

    // libWrapper.register(
    //   CONSTANTS.MODULE_NAME,
    //   'JournalDirectory.prototype._getFolderContextOptions',
    //   function (wrapped, ...args) {
    //     const options = SidebarDirectory.prototype._getFolderContextOptions.call(this);
    Hooks.on('getJournalDirectoryFolderContext', (html, options) => {
      if (game.settings.get(CONSTANTS.MODULE_NAME, 'disable-voices')) {
        return options;
      }
      options.push(
        //return [
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.hide-folder`),
          icon: '<i class="far fa-lightbulb"></i>',
          condition: (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = <StoredDocument<Folder>>game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.journal?.filter((journal) => journal.data.folder === folderObject.id)
              .map(async (journal) => {
                await journal.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, true);
              });
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.unhide-entity`),
          icon: '<i class="fas fa-low-vision"></i>',
          condition: (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = <StoredDocument<Folder>>game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.journal?.filter((journal) => journal.data.folder === folderObject.id)
              .map(async (journal) => {
                await journal.unsetFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
              });
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.show-folder`),
          icon: '<i class="fas fa-lightbulb"></i>',
          condition: (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = <StoredDocument<Folder>>game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.journal?.filter((journal) => journal.data.folder === folderObject.id)
              .map(async (journal) => {
                await journal.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, false);
              });
          },
        },
      ); //].concat(options);
      // },
      // 'MIXED',
    });
  }

  // =======================
  // Items
  // =======================

  if (game.settings.get(CONSTANTS.MODULE_NAME, 'hide-items')) {
    //@ts-ignore
    libWrapper.register(
      CONSTANTS.MODULE_NAME,
      'Item.prototype.visible',
      function (wrapped, ...args) {
        if (game.user?.isGM) {
          return true;
        }
        if (!game.user?.isGM && API.hiddenEntityLinks._checkState(this) == API.hiddenEntityLinks._state.HIDE) {
          return false;
        }
        if (!game.user?.isGM && API.hiddenEntityLinks._checkState(this) == API.hiddenEntityLinks._state.SHOW) {
          return true;
        }
        if (API.hiddenEntityLinks._checkPermission(this, game.user, 'level-permission-items')) {
          return false;
        }
        return true;
      },
      'OVERRIDE',
    );

    // libWrapper.register(
    //   CONSTANTS.MODULE_NAME,
    //   'ItemDirectory.prototype._getEntryContextOptions',
    //   function (wrapped, ...args) {
    //     const options = SidebarDirectory.prototype._getEntryContextOptions.call(this);
    Hooks.on('getItemDirectoryEntryContext', (html, options) => {
      if (game.settings.get(CONSTANTS.MODULE_NAME, 'disable-voices')) {
        return options;
      }
      options.push(
        //return [
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.hide-entity`),
          icon: '<i class="far fa-lightbulb"></i>',
          condition: (li) => {
            const item = game.items?.get(li.data('entityId'))
              ? <StoredDocument<Item>>game.items?.get(li.data('entityId'))
              : <StoredDocument<Item>>game.items?.get(li.data('documentId'));
            if (
              game.user?.isGM &&
              (API.hiddenEntityLinks._checkState(item) == API.hiddenEntityLinks._state.UNHIDE ||
                API.hiddenEntityLinks._checkState(item) == API.hiddenEntityLinks._state.SHOW)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const item = game.items?.get(li.data('entityId'))
              ? <StoredDocument<Item>>game.items?.get(li.data('entityId'))
              : <StoredDocument<Item>>game.items?.get(li.data('documentId'));
            await item.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, true);
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.unhide-entity`),
          icon: '<i class="fas fa-low-vision"></i>',
          condition: (li) => {
            const item = game.items?.get(li.data('entityId'))
              ? <StoredDocument<Item>>game.items?.get(li.data('entityId'))
              : <StoredDocument<Item>>game.items?.get(li.data('documentId'));
            if (
              game.user?.isGM &&
              (API.hiddenEntityLinks._checkState(item) == API.hiddenEntityLinks._state.HIDE ||
                API.hiddenEntityLinks._checkState(item) == API.hiddenEntityLinks._state.SHOW)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const item = game.items?.get(li.data('entityId'))
              ? <StoredDocument<Item>>game.items?.get(li.data('entityId'))
              : <StoredDocument<Item>>game.items?.get(li.data('documentId'));
            await item.unsetFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.show-entity`),
          icon: '<i class="fas fa-lightbulb"></i>',
          condition: (li) => {
            const item = game.items?.get(li.data('entityId'))
              ? <StoredDocument<Item>>game.items?.get(li.data('entityId'))
              : <StoredDocument<Item>>game.items?.get(li.data('documentId'));
            if (
              game.user?.isGM &&
              (API.hiddenEntityLinks._checkState(item) == API.hiddenEntityLinks._state.HIDE ||
                API.hiddenEntityLinks._checkState(item) == API.hiddenEntityLinks._state.UNHIDE)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const item = game.items?.get(li.data('entityId'))
              ? <StoredDocument<Item>>game.items?.get(li.data('entityId'))
              : <StoredDocument<Item>>game.items?.get(li.data('documentId'));
            await item.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, false);
          },
        },
      ); //].concat(options);
      // },
      // 'MIXED',
    });

    // libWrapper.register(
    //   CONSTANTS.MODULE_NAME,
    //   'ItemDirectory.prototype._getFolderContextOptions',
    //   function (wrapped, ...args) {
    //     const options = SidebarDirectory.prototype._getFolderContextOptions.call(this);
    Hooks.on('getItemDirectoryFolderContext', (html, options) => {
      if (game.settings.get(CONSTANTS.MODULE_NAME, 'disable-voices')) {
        return options;
      }
      options.push(
        // return [
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.hide-folder`),
          icon: '<i class="far fa-lightbulb"></i>',
          condition: (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = <StoredDocument<Folder>>game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.items?.filter((item) => item.data.folder === folderObject.id)
              .map(async (item) => {
                await item.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, true);
              });
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.unhide-entity`),
          icon: '<i class="fas fa-low-vision"></i>',
          condition: (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = <StoredDocument<Folder>>game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.items?.filter((item) => item.data.folder === folderObject.id)
              .map(async (item) => {
                await item.unsetFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
              });
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.show-folder`),
          icon: '<i class="fas fa-lightbulb"></i>',
          condition: (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = <StoredDocument<Folder>>game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.items?.filter((item) => item.data.folder === folderObject.id)
              .map(async (item) => {
                await item.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, false);
              });
          },
        },
      ); //].concat(options);
      // },
      // 'MIXED',
    });
  }

  // =======================
  // Actors
  // =======================

  if (game.settings.get(CONSTANTS.MODULE_NAME, 'hide-actors')) {
    //@ts-ignore
    libWrapper.register(
      CONSTANTS.MODULE_NAME,
      'Actor.prototype.visible',
      function (wrapped, ...args) {
        if (game.user?.isGM) {
          return true;
        }
        if (!game.user?.isGM && API.hiddenEntityLinks._checkState(this) == API.hiddenEntityLinks._state.HIDE) {
          return false;
        }
        if (!game.user?.isGM && API.hiddenEntityLinks._checkState(this) == API.hiddenEntityLinks._state.SHOW) {
          return true;
        }
        if (API.hiddenEntityLinks._checkPermission(this, game.user, 'level-permission-actors')) {
          return false;
        }
        return true;
      },
      'OVERRIDE',
    );

    // libWrapper.register(
    //   CONSTANTS.MODULE_NAME,
    //   'ActorDirectory.prototype._getEntryContextOptions',
    //   function (wrapped, ...args) {
    //     const options = SidebarDirectory.prototype._getEntryContextOptions.call(this);
    Hooks.on('getActorDirectoryEntryContext', (html, options) => {
      if (game.settings.get(CONSTANTS.MODULE_NAME, 'disable-voices')) {
        return options;
      }
      options.push(
        //return [
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.hide-entity`),
          icon: '<i class="far fa-lightbulb"></i>',
          condition: (li) => {
            const actor = game.actors?.get(li.data('entityId'))
              ? <StoredDocument<Actor>>game.actors?.get(li.data('entityId'))
              : <StoredDocument<Actor>>game.actors?.get(li.data('documentId'));
            if (
              game.user?.isGM &&
              (API.hiddenEntityLinks._checkState(actor) == API.hiddenEntityLinks._state.UNHIDE ||
                API.hiddenEntityLinks._checkState(actor) == API.hiddenEntityLinks._state.SHOW)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const actor = game.actors?.get(li.data('entityId'))
              ? <StoredDocument<Actor>>game.actors?.get(li.data('entityId'))
              : <StoredDocument<Actor>>game.actors?.get(li.data('documentId'));
            await actor.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, true);
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.unhide-entity`),
          icon: '<i class="fas fa-low-vision"></i>',
          condition: (li) => {
            const actor = game.actors?.get(li.data('entityId'))
              ? <StoredDocument<Actor>>game.actors?.get(li.data('entityId'))
              : <StoredDocument<Actor>>game.actors?.get(li.data('documentId'));
            if (
              game.user?.isGM &&
              (API.hiddenEntityLinks._checkState(actor) == API.hiddenEntityLinks._state.HIDE ||
                API.hiddenEntityLinks._checkState(actor) == API.hiddenEntityLinks._state.SHOW)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const actor = game.actors?.get(li.data('entityId'))
              ? <StoredDocument<Actor>>game.actors?.get(li.data('entityId'))
              : <StoredDocument<Actor>>game.actors?.get(li.data('documentId'));
            await actor.unsetFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.show-entity`),
          icon: '<i class="fas fa-lightbulb"></i>',
          condition: (li) => {
            const actor = game.actors?.get(li.data('entityId'))
              ? <StoredDocument<Actor>>game.actors?.get(li.data('entityId'))
              : <StoredDocument<Actor>>game.actors?.get(li.data('documentId'));
            if (
              game.user?.isGM &&
              (API.hiddenEntityLinks._checkState(actor) == API.hiddenEntityLinks._state.HIDE ||
                API.hiddenEntityLinks._checkState(actor) == API.hiddenEntityLinks._state.UNHIDE)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const actor = game.actors?.get(li.data('entityId'))
              ? <StoredDocument<Actor>>game.actors?.get(li.data('entityId'))
              : <StoredDocument<Actor>>game.actors?.get(li.data('documentId'));
            await actor.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, false);
          },
        },
      ); // ].concat(options);
      // },
      // 'MIXED',
    });

    // libWrapper.register(
    //   CONSTANTS.MODULE_NAME,
    //   'ActorDirectory.prototype._getFolderContextOptions',
    //   function (wrapped, ...args) {
    //     const options = SidebarDirectory.prototype._getFolderContextOptions.call(this);
    Hooks.on('getActorDirectoryFolderContext', (html, options) => {
      if (game.settings.get(CONSTANTS.MODULE_NAME, 'disable-voices')) {
        return options;
      }
      options.push(
        //return [
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.hide-folder`),
          icon: '<i class="far fa-lightbulb"></i>',
          condition: (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = <StoredDocument<Folder>>game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.actors?.filter((actor) => actor.data.folder === folderObject.id)
              .map(async (actor) => {
                await actor.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, true);
              });
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.unhide-entity`),
          icon: '<i class="fas fa-low-vision"></i>',
          condition: (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = <StoredDocument<Folder>>game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.actors?.filter((actor) => actor.data.folder === folderObject.id)
              .map(async (actor) => {
                await actor.unsetFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
              });
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.show-folder`),
          icon: '<i class="fas fa-lightbulb"></i>',
          condition: (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = <StoredDocument<Folder>>game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.actors?.filter((actor) => actor.data.folder === folderObject.id)
              .map(async (actor) => {
                await actor.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, false);
              });
          },
        },
      ); // ].concat(options);
      // },
      // 'MIXED',
    });
  }

  // =======================
  // Rolltable
  // =======================

  if (game.settings.get(CONSTANTS.MODULE_NAME, 'hide-rolltables')) {
    //@ts-ignore
    libWrapper.register(
      CONSTANTS.MODULE_NAME,
      'RollTable.prototype.visible',
      function (wrapped, ...args) {
        if (game.user?.isGM) {
          return true;
        }
        if (!game.user?.isGM && API.hiddenEntityLinks._checkState(this) == API.hiddenEntityLinks._state.HIDE) {
          return false;
        }
        if (!game.user?.isGM && API.hiddenEntityLinks._checkState(this) == API.hiddenEntityLinks._state.SHOW) {
          return true;
        }
        if (API.hiddenEntityLinks._checkPermission(this, game.user, 'level-permission-rolltables')) {
          return false;
        }
        return true;
      },
      'OVERRIDE',
    );

    //@ts-ignore
    libWrapper.register(
      CONSTANTS.MODULE_NAME,
      'RollTableConfig.defaultOptions',
      function (wrapped, ...args) {
        return foundry.utils.mergeObject(wrapped(...args), {
          viewPermission: CONST.ENTITY_PERMISSIONS.LIMITED,
        });
      },
      'WRAPPER',
    );

    // libWrapper.register(
    //   CONSTANTS.MODULE_NAME,
    //   'RollTableDirectory.prototype._getEntryContextOptions',
    //   function (wrapped, ...args) {
    //     const options = SidebarDirectory.prototype._getEntryContextOptions.call(this);
    Hooks.on('getRollTableDirectoryEntryContext', (html, options) => {
      if (game.settings.get(CONSTANTS.MODULE_NAME, 'disable-voices')) {
        return options;
      }
      options.push(
        //return [
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.hide-entity`),
          icon: '<i class="far fa-lightbulb"></i>',
          condition: (li) => {
            const rolltable = game.tables?.get(li.data('entityId'))
              ? <StoredDocument<RollTable>>game.tables?.get(li.data('entityId'))
              : <StoredDocument<RollTable>>game.tables?.get(li.data('documentId'));
            if (
              game.user?.isGM &&
              (API.hiddenEntityLinks._checkState(rolltable) == API.hiddenEntityLinks._state.UNHIDE ||
                API.hiddenEntityLinks._checkState(rolltable) == API.hiddenEntityLinks._state.SHOW)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const rolltable = game.tables?.get(li.data('entityId'))
              ? <StoredDocument<RollTable>>game.tables?.get(li.data('entityId'))
              : <StoredDocument<RollTable>>game.tables?.get(li.data('documentId'));
            await rolltable.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, true);
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.unhide-entity`),
          icon: '<i class="fas fa-low-vision"></i>',
          condition: (li) => {
            const rolltable = game.tables?.get(li.data('entityId'))
              ? <StoredDocument<RollTable>>game.tables?.get(li.data('entityId'))
              : <StoredDocument<RollTable>>game.tables?.get(li.data('documentId'));
            if (
              game.user?.isGM &&
              (API.hiddenEntityLinks._checkState(rolltable) == API.hiddenEntityLinks._state.HIDE ||
                API.hiddenEntityLinks._checkState(rolltable) == API.hiddenEntityLinks._state.SHOW)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const rolltable = game.tables?.get(li.data('entityId'))
              ? <StoredDocument<RollTable>>game.tables?.get(li.data('entityId'))
              : <StoredDocument<RollTable>>game.tables?.get(li.data('documentId'));
            await rolltable.unsetFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.show-entity`),
          icon: '<i class="fas fa-lightbulb"></i>',
          condition: (li) => {
            const rolltable = game.tables?.get(li.data('entityId'))
              ? <StoredDocument<RollTable>>game.tables?.get(li.data('entityId'))
              : <StoredDocument<RollTable>>game.tables?.get(li.data('documentId'));
            if (
              game.user?.isGM &&
              (API.hiddenEntityLinks._checkState(rolltable) == API.hiddenEntityLinks._state.HIDE ||
                API.hiddenEntityLinks._checkState(rolltable) == API.hiddenEntityLinks._state.UNHIDE)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const rolltable = game.tables?.get(li.data('entityId'))
              ? <StoredDocument<RollTable>>game.tables?.get(li.data('entityId'))
              : <StoredDocument<RollTable>>game.tables?.get(li.data('documentId'));
            await rolltable.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, false);
          },
        },
      ); //].concat(options);
      // },
      // 'MIXED',
    });

    // libWrapper.register(
    //   CONSTANTS.MODULE_NAME,
    //   'RollTableDirectory.prototype._getFolderContextOptions',
    //   function (wrapped, ...args) {
    //     const options = SidebarDirectory.prototype._getFolderContextOptions.call(this);
    Hooks.on('getRollTableDirectoryFolderContext', (html, options) => {
      if (game.settings.get(CONSTANTS.MODULE_NAME, 'disable-voices')) {
        return options;
      }
      options.push(
        //return [
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.hide-folder`),
          icon: '<i class="far fa-lightbulb"></i>',
          condition: (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = <StoredDocument<Folder>>game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.tables?.filter((rolltable) => rolltable.data.folder === folderObject.id)
              .map(async (rolltable) => {
                await rolltable.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, true);
              });
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.unhide-entity`),
          icon: '<i class="fas fa-low-vision"></i>',
          condition: (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = <StoredDocument<Folder>>game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.tables?.filter((rolltable) => rolltable.data.folder === folderObject.id)
              .map(async (rolltable) => {
                await rolltable.unsetFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
              });
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.show-folder`),
          icon: '<i class="fas fa-lightbulb"></i>',
          condition: (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = <StoredDocument<Folder>>game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.tables?.filter((rolltable) => rolltable.data.folder === folderObject.id)
              .map(async (rolltable) => {
                await rolltable.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, false);
              });
          },
        },
      ); //].concat(options);
      // },
      // 'MIXED',
    });
  }

  // =======================
  // Scene
  // =======================

  if (game.settings.get(CONSTANTS.MODULE_NAME, 'hide-scenes')) {
    //@ts-ignore
    libWrapper.register(
      CONSTANTS.MODULE_NAME,
      'Scene.prototype.visible',
      function (wrapped, ...args) {
        if (game.user?.isGM) {
          return true;
        }
        if (!game.user?.isGM && API.hiddenEntityLinks._checkState(this) == API.hiddenEntityLinks._state.HIDE) {
          return false;
        }
        if (!game.user?.isGM && API.hiddenEntityLinks._checkState(this) == API.hiddenEntityLinks._state.SHOW) {
          return true;
        }
        // if (API.hiddenEntityLinks._checkPermission(this, game.user, 'level-permission-scenes')) {
        //   return false;
        // }
        return true;
      },
      'OVERRIDE',
    );

    // libWrapper.register(
    //   CONSTANTS.MODULE_NAME,
    //   'SceneDirectory.prototype._getEntryContextOptions',
    //   function (wrapped, ...args) {
    //     const options = SidebarDirectory.prototype._getEntryContextOptions.call(this);
    Hooks.on('getSceneDirectoryEntryContext', (html, options) => {
      if (game.settings.get(CONSTANTS.MODULE_NAME, 'disable-voices')) {
        return options;
      }
      options.push(
        //return [
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.hide-entity`),
          icon: '<i class="far fa-lightbulb"></i>',
          condition: (li) => {
            const scene = game.scenes?.get(li.data('entityId'))
              ? <StoredDocument<Scene>>game.scenes?.get(li.data('entityId'))
              : <StoredDocument<Scene>>game.scenes?.get(li.data('documentId'));
            if (
              game.user?.isGM &&
              (API.hiddenEntityLinks._checkState(scene) == API.hiddenEntityLinks._state.UNHIDE ||
                API.hiddenEntityLinks._checkState(scene) == API.hiddenEntityLinks._state.SHOW)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const scene = game.scenes?.get(li.data('entityId'))
              ? <StoredDocument<Scene>>game.scenes?.get(li.data('entityId'))
              : <StoredDocument<Scene>>game.scenes?.get(li.data('documentId'));
            await scene.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, true);
            if (game.settings.get(CONSTANTS.MODULE_NAME, 'hide-scenes-nav')) {
              const updates = [
                {
                  _id: scene.id,
                  navigation: false,
                  permission: {
                    default: <0 | 1 | 2 | 3 | undefined>0,
                  }
                },
              ];
              return Scene.updateDocuments(updates);
            }
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.unhide-entity`),
          icon: '<i class="fas fa-low-vision"></i>',
          condition: (li) => {
            const scene = game.scenes?.get(li.data('entityId'))
              ? <StoredDocument<Scene>>game.scenes?.get(li.data('entityId'))
              : <StoredDocument<Scene>>game.scenes?.get(li.data('documentId'));
            if (
              game.user?.isGM &&
              (API.hiddenEntityLinks._checkState(scene) == API.hiddenEntityLinks._state.HIDE ||
                API.hiddenEntityLinks._checkState(scene) == API.hiddenEntityLinks._state.SHOW)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const scene = game.scenes?.get(li.data('entityId'))
              ? <StoredDocument<Scene>>game.scenes?.get(li.data('entityId'))
              : <StoredDocument<Scene>>game.scenes?.get(li.data('documentId'));
            await scene.unsetFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.show-entity`),
          icon: '<i class="fas fa-lightbulb"></i>',
          condition: (li) => {
            const scene = game.scenes?.get(li.data('entityId'))
              ? <StoredDocument<Scene>>game.scenes?.get(li.data('entityId'))
              : <StoredDocument<Scene>>game.scenes?.get(li.data('documentId'));
            if (
              game.user?.isGM &&
              (API.hiddenEntityLinks._checkState(scene) == API.hiddenEntityLinks._state.HIDE ||
                API.hiddenEntityLinks._checkState(scene) == API.hiddenEntityLinks._state.UNHIDE)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const scene = game.scenes?.get(li.data('entityId'))
              ? <StoredDocument<Scene>>game.scenes?.get(li.data('entityId'))
              : <StoredDocument<Scene>>game.scenes?.get(li.data('documentId'));
            await scene.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, false);
            if (game.settings.get(CONSTANTS.MODULE_NAME, 'hide-scenes-nav')) {
              const updates = [
                {
                  _id: scene.id,
                  navigation: true,
                },
              ];
              return Scene.updateDocuments(updates);
            }
          },
        },
      ); //].concat(options);
      // },
      // 'MIXED',
    });

    // libWrapper.register(
    //   CONSTANTS.MODULE_NAME,
    //   'SceneDirectory.prototype._getFolderContextOptions',
    //   function (wrapped, ...args) {
    //     const options = SidebarDirectory.prototype._getFolderContextOptions.call(this);
    Hooks.on('getSceneDirectoryFolderContext', (html, options) => {
      if (game.settings.get(CONSTANTS.MODULE_NAME, 'disable-voices')) {
        return options;
      }
      options.push(
        //return [
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.hide-folder`),
          icon: '<i class="far fa-lightbulb"></i>',
          condition: (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = <StoredDocument<Folder>>game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.scenes?.filter((scene) => scene.data.folder === folderObject.id)
              .map(async (scene) => {
                await scene.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, true);
              });

            if (game.settings.get(CONSTANTS.MODULE_NAME, 'hide-scenes-nav')) {
              const updates = game.scenes?.filter((scene) => scene.data.folder === folderObject.id)
                .map((scene) => ({
                  _id: scene.id,
                  navigation:
                    !scene.getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN) && scene.data.navigation ? false : scene.data.navigation,
                  permission: {
                    default:
                      !scene.getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN) && scene.data.navigation
                        ? 0
                        : scene.data.permission.default,
                  },
                }));
              return Scene.updateDocuments(updates);
            }
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.unhide-entity`),
          icon: '<i class="fas fa-low-vision"></i>',
          condition: (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = <StoredDocument<Folder>>game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.scenes?.filter((scene) => scene.data.folder === folderObject.id)
              .map(async (scene) => {
                await scene.unsetFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
              });
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.show-folder`),
          icon: '<i class="fas fa-lightbulb"></i>',
          condition: (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = <StoredDocument<Folder>>game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = <StoredDocument<Folder>>game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.scenes?.filter((scene) => scene.data.folder === folderObject.id)
              .map(async (scene) => {
                await scene.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, false);
              });

            if (game.settings.get(CONSTANTS.MODULE_NAME, 'hide-scenes-nav')) {
              const updates = game.scenes?.filter((scene) => scene.data.folder === folderObject.id)
                .map((scene) => ({
                  _id: scene.id,
                  navigation:
                    scene.getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN) && !scene.data.navigation ? true : scene.data.navigation,
                }));
              return Scene.updateDocuments(updates);
            }
          },
        },
      ); //].concat(options);
      // },
      // 'MIXED',
    });
  }

  // ===========
  // CARDS
  // ===========

  if (game.settings.get(CONSTANTS.MODULE_NAME, 'hide-cards')) {
    //@ts-ignore
    libWrapper.register(
      CONSTANTS.MODULE_NAME,
      'Card.prototype.visible',
      function (wrapped, ...args) {
        if (game.user?.isGM) {
          return true;
        }
        if (!game.user?.isGM && API.hiddenEntityLinks._checkState(this) == API.hiddenEntityLinks._state.HIDE) {
          return false;
        }
        if (!game.user?.isGM && API.hiddenEntityLinks._checkState(this) == API.hiddenEntityLinks._state.SHOW) {
          return true;
        }
        if (API.hiddenEntityLinks._checkPermission(this, game.user, 'level-permission-cards')) {
          return false;
        }
        return true;
      },
      'OVERRIDE',
    );

    Hooks.on('getCardsDirectoryEntryContext', (html, options) => {
      if (game.settings.get(CONSTANTS.MODULE_NAME, 'disable-voices')) {
        return options;
      }
      options.push(
        //return [
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.hide-entity`),
          icon: '<i class="far fa-lightbulb"></i>',
          condition: (li) => {
            const card = game.cards?.get(li.data('entityId'))
              ? <StoredDocument<Cards>>game.cards?.get(li.data('entityId'))
              : <StoredDocument<Cards>>game.cards?.get(li.data('documentId'));
            if (
              game.user?.isGM &&
              (API.hiddenEntityLinks._checkState(card) == API.hiddenEntityLinks._state.UNHIDE ||
                API.hiddenEntityLinks._checkState(card) == API.hiddenEntityLinks._state.SHOW)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const card = game.cards?.get(li.data('entityId'))
              ? <StoredDocument<Cards>>game.cards?.get(li.data('entityId'))
              : <StoredDocument<Cards>>game.cards?.get(li.data('documentId'));
            await card.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, true);
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.unhide-entity`),
          icon: '<i class="fas fa-low-vision"></i>',
          condition: (li) => {
            const card = game.cards?.get(li.data('entityId'))
              ? <StoredDocument<Cards>>game.cards?.get(li.data('entityId'))
              : <StoredDocument<Cards>>game.cards?.get(li.data('documentId'));
            if (
              game.user?.isGM &&
              (API.hiddenEntityLinks._checkState(card) == API.hiddenEntityLinks._state.HIDE ||
                API.hiddenEntityLinks._checkState(card) == API.hiddenEntityLinks._state.SHOW)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const card = game.cards?.get(li.data('entityId'))
              ? <StoredDocument<Cards>>game.cards?.get(li.data('entityId'))
              : <StoredDocument<Cards>>game.cards?.get(li.data('documentId'));
            await card.unsetFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.show-entity`),
          icon: '<i class="fas fa-lightbulb"></i>',
          condition: (li) => {
            const card = game.cards?.get(li.data('entityId'))
              ? <StoredDocument<Cards>>game.cards?.get(li.data('entityId'))
              : <StoredDocument<Cards>>game.cards?.get(li.data('documentId'));
            if (
              game.user?.isGM &&
              (API.hiddenEntityLinks._checkState(card) == API.hiddenEntityLinks._state.HIDE ||
                API.hiddenEntityLinks._checkState(card) == API.hiddenEntityLinks._state.UNHIDE)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const card = game.cards?.get(li.data('entityId'))
              ? <StoredDocument<Cards>>game.cards?.get(li.data('entityId'))
              : <StoredDocument<Cards>>game.cards?.get(li.data('documentId'));
            await card.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, false);
          },
        },
      );
    });

    Hooks.on('getCardsDirectoryFolderContext', (html, options) => {
      if (game.settings.get(CONSTANTS.MODULE_NAME, 'disable-voices')) {
        return options;
      }
      options.push(
        // return [
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.hide-folder`),
          icon: '<i class="far fa-lightbulb"></i>',
          condition: (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = <StoredDocument<Folder>>game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.cards?.filter((card) => card.data.folder === folderObject.id)
              .map(async (card) => {
                await card.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, true);
              });
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.unhide-entity`),
          icon: '<i class="fas fa-low-vision"></i>',
          condition: (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = <StoredDocument<Folder>>game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.cards?.filter((card) => card.data.folder === folderObject.id)
              .map(async (card) => {
                await card.unsetFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
              });
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.show-folder`),
          icon: '<i class="fas fa-lightbulb"></i>',
          condition: (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = <StoredDocument<Folder>>game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.cards?.filter((card) => card.data.folder === folderObject.id)
              .map(async (card) => {
                await card.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, false);
              });
          },
        },
      );
    });
  }
};

export const readyHooks = () => {
  if (game.settings.get(CONSTANTS.MODULE_NAME, 'hide-soundtracks') && !game.user?.isGM) {
    document.documentElement.style.setProperty('--hidden-entity-links-Display', 'none');
    document.documentElement.style.setProperty('--hidden-entity-links-Hidden', HiddenEntityLinkFlags.HIDDEN);
    document.documentElement.style.setProperty('--hidden-entity-links-Flex', 'none');
  }

  if (game.settings.get(CONSTANTS.MODULE_NAME, 'hide-scenes') && !game.user?.isGM) {
    // Hook SceneNavigation methods and implement the main module functionality
    //@ts-ignore
    libWrapper.register(
      CONSTANTS.MODULE_NAME,
      'SceneNavigation.prototype.render',
      function (wrapper, ...args) {
        const result = wrapper.apply(this, args);
        if (!game.user?.isGM) {
          result.scenes.forEach((data) => {
            const scene = game.scenes?.get(data.data._id);
            // if (game.user?.isGM) {
            //   return;
            // }
            // if (!game.user?.isGM && API.hiddenEntityLinks._checkState(scene) == API.hiddenEntityLinks._state.HIDE) {
            //   this.element.empty();
            //   return;
            // }
            // if (!game.user?.isGM && API.hiddenEntityLinks._checkState(scene) == API.hiddenEntityLinks._state.SHOW) {
            //   return;
            // }
            // if (scene.data.navigation) {
              const neededRole = API.hiddenEntityLinks._checkPermission(scene, game.user, 'level-permission-scenes-nav');
              if (!neededRole) {
                this.element.empty();
                return;
              }
            // }
          });
        }
        return result;
      }
    );
    //@ts-ignore
    libWrapper.register(
      CONSTANTS.MODULE_NAME,
      'SceneNavigation.prototype.getData',
      function (wrapper, ...args) {
        const result = wrapper.apply(this, args);
        if (!game.user?.isGM) {
          /*
          result.scenes.forEach((data) => {
            const scene = <StoredDocument<Scene>>game.scenes?.get(data._id);
            // if (game.user?.isGM) {
            //   return;
            // }
            // if (!game.user?.isGM && API.hiddenEntityLinks._checkState(scene) == API.hiddenEntityLinks._state.HIDE) {
            //   this.element.empty();
            //   return;
            // }
            // if (!game.user?.isGM && API.hiddenEntityLinks._checkState(scene) == API.hiddenEntityLinks._state.SHOW) {
            //   return;
            // }
            if (scene.data.navigation) {
              const navNameRole = API.hiddenEntityLinks._checkPermission(
                scene,
                game.user,
                'level-permission-scenes-nav-name',
              );
              if (!navNameRole && scene?.name) {
                // Check if navigation is navigable for avoid the 'hide-scenes-nav' check
                data.name = scene?.name;
              }
            }
          });
          */
          // Modify Scene data
          const scenes = result.scenes.map(scene => {
            const data = scene.data.toObject(false);
            const users = <StoredDocument<User>[]>game.users?.filter(u => u.active && (u.viewedScene === scene.id));
            if (scene.data.navigation) {
              const navNameRole = API.hiddenEntityLinks._checkPermission(
                scene,
                game.user,
                'level-permission-scenes-nav-name',
              );
              if (!navNameRole) {
                // Check if navigation is navigable for avoid the 'hide-scenes-nav' check
                //data.name = scene?.name;
                let name = scene?.name; // game.user?.isGM ? data.name : data.navName
                if(name === ""){
                  name = data.name;
                }
                data.name = TextEditor.truncateText(name, {maxLength: 32});
              }
            }
            data.users = users.map(u => { return {letter: u.name, color: u.data.color} });
            data.visible = (game.user?.isGM || scene.isOwner || scene.active);
            data.css = [
              scene.isView ? "view" : null,
              scene.active ? "active" : null,
              data.permission.default === 0 ? "gm" : null
            ].filter(c => !!c).join(" ");
            return data;
          });

          // Return data for rendering
          return {
            collapsed: this._collapsed,
            scenes: scenes
          }
        }else {
          return result;
        }
      },
      'WRAPPER',
    );

    resetNavbar();
  }

  Hooks.on('updateJournalEntry', (entityData, data) => {
    if (game.settings.get(CONSTANTS.MODULE_NAME, 'hide-journals')) {
      if (data.flags && data.flags[CONSTANTS.MODULE_NAME]) {
        const html = $('#journal.sidebar-tab');
        // hiddenEntityLinksSocket.executeForEveryone('updateHiddenEntityLinks', entityData, html, data);
        API.hiddenEntityLinks.updateHiddenEntityLinks(entityData, html, data);
      }
    }
  });
  Hooks.on('updateScene', (entityData, data) => {
    if (game.settings.get(CONSTANTS.MODULE_NAME, 'hide-scenes')) {
      if (data.flags && data.flags[CONSTANTS.MODULE_NAME]) {
        const html = $('#scenes.sidebar-tab');
        // hiddenEntityLinksSocket.executeForEveryone('updateHiddenEntityLinks', entityData, html, data);
        API.hiddenEntityLinks.updateHiddenEntityLinks(entityData, html, data);
      }
    }
  });
  Hooks.on('updateActor', (entityData, data) => {
    if (game.settings.get(CONSTANTS.MODULE_NAME, 'hide-actors')) {
      if (data.flags && data.flags[CONSTANTS.MODULE_NAME]) {
        const html = $('#actors.sidebar-tab');
        // hiddenEntityLinksSocket.executeForEveryone('updateHiddenEntityLinks', entityData, html, data);
        API.hiddenEntityLinks.updateHiddenEntityLinks(entityData, html, data);
      }
    }
  });
  Hooks.on('updateItem', (entityData, data) => {
    if (game.settings.get(CONSTANTS.MODULE_NAME, 'hide-items')) {
      if (data.flags && data.flags[CONSTANTS.MODULE_NAME]) {
        const html = $('#items.sidebar-tab');
        // hiddenEntityLinksSocket.executeForEveryone('updateHiddenEntityLinks', entityData, html, data);
        API.hiddenEntityLinks.updateHiddenEntityLinks(entityData, html, data);
      }
    }
  });
  // Hooks.on('updateMacro', directoryRenderedHiddenEntityLinks);
  Hooks.on('updateRollTable', (entityData, data) => {
    if (game.settings.get(CONSTANTS.MODULE_NAME, 'hide-rolltables')) {
      if (data.flags && data.flags[CONSTANTS.MODULE_NAME]) {
        const html = $('#tables.sidebar-tab');
        // hiddenEntityLinksSocket.executeForEveryone('updateHiddenEntityLinks', entityData, html, data);
        API.hiddenEntityLinks.updateHiddenEntityLinks(entityData, html, data);
      }
    }
  });

  Hooks.on('updateCards', (entityData, data) => {
    if (data.flags && data.flags[CONSTANTS.MODULE_NAME]) {
      const html = $('#cards.sidebar-tab');
      // hiddenEntityLinksSocket.executeForEveryone('updateHiddenEntityLinks', entityData, html, data);
      API.hiddenEntityLinks.updateHiddenEntityLinks(entityData, html, data);
    }
  });

  // Hooks.on('updateFolder', (entityData, data) => {
  //   let html = $('.sidebar-tab');
  //   if (!game.user?.isGM){
  //     return;
  //   }
  //   let listFolder = html.find('li.directory-item.folder')
  //   for (let liFolder of listFolder) {
  //     liFolder = $(liFolder);
  //     if(entityData.id == liFolder.attr('data-folder-id')){
  //       let isHidden = data.flags[CONSTANTS.MODULE_NAME].hidden;
  //       if (isHidden && liFolder.find('.hidden-entity-links').length <= 0) {
  //         let div = $(
  //           `<div class=CONSTANTS.MODULE_NAME style="position:absolute;padding-left:45px;">
  //             <i class="fas fa-lightbulb" style="color:darkRed; text-shadow: 0 0 8px darkRed;"/>
  //           </div>`,
  //         );
  //         liFolder.find('h4').before(div);
  //       }else{
  //         liFolder.find('.hidden-entity-links').remove();
  //       }
  //     }
  //   }
  // });

  Hooks.on('renderJournalSheet', (sheet, html, data) => {
    // if (game.settings.get(CONSTANTS.MODULE_NAME, 'hide-journals')) {
    //   if (data.flags && data.flags[CONSTANTS.MODULE_NAME]) {
    API.hiddenEntityLinks.hideRenderedHiddenEntityLinks(sheet, html, data);
    //   }
    // }
  });
  // Hooks.on('renderSceneSheet', (sheet, html, data) => {});
  Hooks.on('renderActorSheet', (sheet, html, data) => {
    // if (game.settings.get(CONSTANTS.MODULE_NAME, 'hide-actors')) {
    //   if (data.flags && data.flags[CONSTANTS.MODULE_NAME]) {
    API.hiddenEntityLinks.hideRenderedHiddenEntityLinks(sheet, html, data);
    //   }
    // }
  });
  Hooks.on('renderItemSheet', (sheet, html, data) => {
    // if (game.settings.get(CONSTANTS.MODULE_NAME, 'hide-items')) {
    //   if (data.flags && data.flags[CONSTANTS.MODULE_NAME]) {
    API.hiddenEntityLinks.hideRenderedHiddenEntityLinks(sheet, html, data);
    //   }
    // }
  });
  // Hooks.on('renderMacroSheet', (sheet, html, data) => {});
  // Hooks.on('renderRolltableSheet', (sheet, html, data) => {});
};
