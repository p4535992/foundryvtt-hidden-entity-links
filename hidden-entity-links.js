export const HIDDEN_ENTITY_LINKS_MODULE_NAME = 'hidden-entity-links';

// ==================
// SETTINGS SUPPORT
// ==================

class Settings {
  static registerSettings() {
    game.settings.register(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-actors', {
      name: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.hide-actors.name`,
      hint: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.hide-actors.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    });
    game.settings.register(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'level-permission-actors', {
      name: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission-actors.name`,
      hint: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission-actors.hint`,
      scope: 'world',
      config: true,
      default: 0,
      type: Number,
      choices: {
        0: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.empty`),
        1: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.none`),
        2: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.limited`),
        3: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.observer`),
        4: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.owner`),
        5: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.onlylimited`),
        6: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.onlyobserver`),
      },
    });
    game.settings.register(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-items', {
      name: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.hide-items.name`,
      hint: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.hide-items.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    });
    game.settings.register(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'level-permission-items', {
      name: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission-items.name`,
      hint: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission-items.hint`,
      scope: 'world',
      config: true,
      default: 0,
      type: Number,
      choices: {
        0: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.empty`),
        1: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.none`),
        2: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.limited`),
        3: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.observer`),
        4: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.owner`),
        5: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.onlylimited`),
        6: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.onlyobserver`),
      },
    });
    game.settings.register(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-journals', {
      name: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.hide-journals.name`,
      hint: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.hide-journals.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    });
    game.settings.register(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'level-permission-journals', {
      name: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission-journals.name`,
      hint: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission-journals.hint`,
      scope: 'world',
      config: true,
      default: 0,
      type: Number,
      choices: {
        0: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.empty`),
        1: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.none`),
        2: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.limited`),
        3: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.observer`),
        4: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.owner`),
        5: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.onlylimited`),
        6: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.onlyobserver`),
      },
    });
    game.settings.register(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-rolltables', {
      name: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.hide-rolltables.name`,
      hint: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.hide-rolltables.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    });
    game.settings.register(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'level-permission-rolltables', {
      name: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission-rolltables.name`,
      hint: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission-rolltables.hint`,
      scope: 'world',
      config: true,
      default: 0,
      type: Number,
      choices: {
        0: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.empty`),
        1: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.none`),
        2: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.limited`),
        3: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.observer`),
        4: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.owner`),
        5: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.onlylimited`),
        6: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.onlyobserver`),
      },
    });
    game.settings.register(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-scenes', {
      name: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.hide-scenes.name`,
      hint: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.hide-scenes.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    });
    game.settings.register(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-scenes-nav', {
      name: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.hide-scenes-nav.name`,
      hint: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.hide-scenes-nav.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    });
    // game.settings.register(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'level-permission-scenes', {
    //   name: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission-scenes.name`,
    //   hint: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission-scenes.hint`,
    //   scope: 'world',
    //   config: true,
    //   default: 0,
    //   type: Number,
    //   choices: {
    //     0: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.empty`),
    //     1: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.none`),
    //     2: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.limited`),
    //     3: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.observer`),
    //     4: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.owner`),
    //   },
    // });
    game.settings.register(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'no-background-only-symbol', {
      name: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.no-background-only-symbol.name`,
      hint: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.no-background-only-symbol.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    });
    game.settings.register(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'disguise-unreachable-links', {
      name: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.disguise-unreachable-links.name`,
      hint: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.disguise-unreachable-links.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    });
    game.settings.register(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'level-permission-disguise-unreachable-links', {
      name: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission-disguise-unreachable-links.name`,
      hint: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission-disguise-unreachable-links.hint`,
      scope: 'world',
      config: true,
      default: 0,
      type: Number,
      choices: {
        0: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.empty`),
        1: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.none`),
        2: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.limited`),
        3: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.observer`),
        4: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.level-permission.owner`),
      },
    });
    game.settings.register(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'add-css-unhideshow', {
      name: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.add-css-unhideshow.name`,
      hint: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.add-css-unhideshow.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    });
    game.settings.register(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'disable-voices', {
      name: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.disable-voices.name`,
      hint: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.disable-voices.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    });
    game.settings.register(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-soundtracks', {
      name: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.hide-soundtracks.name`,
      hint: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.hide-soundtracks.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    });
  }
}

// ==================
// API SUPPORT
// ==================

class HiddenEntityLinks {
  static API = 'hiddenEntityLinks';

  socket = undefined;

  // /**
  //  * For each folder
  // */
  // async function directoryRenderedHiddenFolderEntityLinks(obj, html, data) {
  //   if (!game.user.isGM){
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
  //       let isHidden = folder.getFlag(mod, 'hidden');
  //       if (isHidden && liFolder.find('.hidden-entity-links').length <= 0) {
  //         let div = $(
  //           `<div class="hidden-entity-links" style="position:absolute;padding-left:20px;">
  //             <i class="fas fa-lightbulb" style="color:darkRed; text-shadow: 0 0 8px darkRed;"/>
  //           </div>`,
  //         );
  //         liFolder.find('h3').before(div);
  //       }
  //     }
  //   }
  // }

  updateFolderHiddenEntityLinks = async function (entityData, html, data) {
    let listFolder = html.parent().parent().find('li.directory-item.folder');
    for (let liFolder of listFolder) {
      liFolder = $(liFolder);
      let folder = game.folders.find((f) => {
        return folderObject.id == liFolder.attr('data-folder-id');
      });
      if (folder) {
        // let list =
        //   liFolder.find('li.directory-item.document')?.length > 0
        //     ? liFolder.find('li.directory-item.document')
        //     : liFolder.find('li.directory-item.entity');
        game[HiddenEntityLinks.API].updateHiddenEntityLinks(entityData, liFolder, undefined);
      }
    }
  };

  updateHiddenEntityLinks = async function (entityData, html, data) {
    let list =
      html.find('li.directory-item.document')?.length > 0
        ? html.find('li.directory-item.document')
        : html.find('li.directory-item.entity');
    for (let li of list) {
      li = $(li);
      if (entityData.id == li.attr('data-document-id') || entityData.id == li.attr('data-entity-id')) {
        //let isHidden = data.flags['hidden-entity-links']?.hidden; // why is undefined ??
        let state = this._checkState(entityData);
        if (state == this._state.HIDE) {
          if (!game.user.isGM) {
            //
          } else {
            // let div = $(
            //   `<div class="hidden-entity-links" style="position:absolute;padding-left:45px;">
            //     <i class="fas fa-lightbulb" style="color:darkRed; text-shadow: 0 0 8px darkRed;"/>
            //   </div>`,
            // );
            // li.find('.entity-name').before(div);
            if (
              entityData instanceof Scene ||
              game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'no-background-only-symbol')
            ) {
              if (li.find('.hidden-entity-links-scene').length <= 0) {
                let div = $(
                  `<div class="hidden-entity-links-scene">
                    <i class="fas fa-lightbulb"/>
                  </div>`,
                );
                //li.find('.entity-name').after(div);
                li.append(div);
              }
            } else {
              if (!li.hasClass('hidden-entity-links')) {
                li.addClass('hidden-entity-links');
              }
            }
            // if (
            //   entityData instanceof Scene ||
            //   game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'no-background-only-symbol')
            // ) {
            li.find('.hidden-entity-links-scene-show').remove();
            li.find('.hidden-entity-links-scene-unhideshow').remove();
            // } else {
            li.removeClass('hidden-entity-links-show');
            li.removeClass('hidden-entity-links-unhideshow');
            // }
          }
        } else if (state == this._state.SHOW) {
          if (!game.user.isGM) {
            //
          } else {
            if (
              entityData instanceof Scene ||
              game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'no-background-only-symbol')
            ) {
              if (li.find('.hidden-entity-links-scene-show').length <= 0) {
                let div = $(
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
            //   game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'no-background-only-symbol')
            // ) {
            li.find('.hidden-entity-links-scene').remove();
            li.find('.hidden-entity-links-scene-unhideshow').remove();
            // } else {
            li.removeClass('hidden-entity-links');
            li.removeClass('hidden-entity-links-unhideshow');
            // }
          }
        } else {
          if (!game.user.isGM) {
            //
          } else {
            // li.find('.hidden-entity-links').remove();
            // if (
            //   entityData instanceof Scene ||
            //   game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'no-background-only-symbol')
            // ) {
            li.find('.hidden-entity-links-scene').remove();
            li.find('.hidden-entity-links-scene-show').remove();
            // } else {
            li.removeClass('hidden-entity-links');
            li.removeClass('hidden-entity-links-show');
            // }
            if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'add-css-unhideshow')) {
              if (
                entityData instanceof Scene ||
                game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'no-background-only-symbol')
              ) {
                if (li.find('.hidden-entity-links-scene-unhideshow').length <= 0) {
                  let div = $(
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
    let collection = entities.directory?.documents;
    if (!collection || collection.length == 0) {
      return;
    }

    let list =
      html.find('li.directory-item.document')?.length > 0
        ? html.find('li.directory-item.document')
        : html.find('li.directory-item.entity');
    for (let li of list) {
      li = $(li);
      let document = collection.find((d) => {
        return d.id == li.attr('data-document-id') || d.id == li.attr('data-entity-id');
      });
      // let document = collection.get(li.attr("data-document-id"))
      if (document) {
        try {
          // let isHidden = data._id == document.id && data.flags["hidden-entity-links"]?.hidden
          //   ? data.flags["hidden-entity-links"]?.hidden
          //   : document.getFlag(mod, 'hidden');
          // let isHidden = document.getFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden');
          let state = this._checkState(document);
          if (state == this._state.HIDE) {
            if (!game.user.isGM) {
              //setProperty(document, 'visible', false);
              // TODO why i must do this ?????
              // li.hide();
            } else {
              // let div = $(
              //   `<div class="hidden-entity-links" style="position:absolute;padding-left:45px;">
              //     <i class="fas fa-lightbulb" style="color:darkRed; text-shadow: 0 0 8px darkRed;"/>
              //   </div>`,
              // );
              // li.find('.entity-name').before(div);
              if (
                obj instanceof SceneDirectory ||
                game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'no-background-only-symbol')
              ) {
                if (li.find('.hidden-entity-links-scene').length <= 0) {
                  let div = $(
                    `<div class="hidden-entity-links-scene">
                      <i class="fas fa-lightbulb"/>
                    </div>`,
                  );
                  //li.find('.entity-name').after(div);
                  li.append(div);
                }
              } else {
                if (!li.hasClass('hidden-entity-links')) {
                  li.addClass('hidden-entity-links');
                }
              }
            }
          } else if (state == this._state.SHOW) {
            if (!game.user.isGM) {
              //setProperty(document, 'visible', false);
              // TODO why i must do this ?????
              // li.hide();
            } else {
              // let div = $(
              //   `<div class="hidden-entity-links" style="position:absolute;padding-left:45px;">
              //     <i class="fas fa-lightbulb" style="color:darkRed; text-shadow: 0 0 8px darkRed;"/>
              //   </div>`,
              // );
              // li.find('.entity-name').before(div);
              if (
                obj instanceof SceneDirectory ||
                game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'no-background-only-symbol')
              ) {
                if (li.find('.hidden-entity-links-scene-show').length <= 0) {
                  let div = $(
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
            if (!game.user.isGM) {
              //setProperty(document, 'visible', true);
              // TODO why i must do this ?????
              // li.show();
            } else {
              if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'add-css-unhideshow')) {
                if (
                  obj instanceof SceneDirectory ||
                  game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'no-background-only-symbol')
                ) {
                  if (li.find('.hidden-entity-links-scene-unhideshow').length <= 0) {
                    let div = $(
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
          // if (hasProperty(document.data, `flags.${HIDDEN_ENTITY_LINKS_MODULE_NAME}`)) {
          //   await document.unsetFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'true');
          //   await document.unsetFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'false');
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
    if (!game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'disguise-unreachable-links')) {
      return;
    }
    // Only check for link visibility if NOT a gm
    if (game.user.isGM) {
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
          game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'level-permission-disguise-unreachable-links') ==
          this._permissions.EMPTY
        ) {
          const item = game[entity].get(a.getAttribute('data-id'));
          return !item || !item.testUserPermission(game.user, 'LIMITED');
        } else {
          const reference = game[entity].get(a.getAttribute('data-id'));
          if (reference) {
            // const perm = this._checkPermission(reference, game.user,'level-permission-disguise-unreachable-links');
            // return perm;
            const perm = game.settings.get(
              HIDDEN_ENTITY_LINKS_MODULE_NAME,
              'level-permission-disguise-unreachable-links',
            );
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
    let entity = entities.find((e) => {
      return e && e.id == entityID;
    });
    if (entity) {
      const hasFlagHide = hasProperty(entity.data, `flags.${HIDDEN_ENTITY_LINKS_MODULE_NAME}.hidden`);
      if (hasFlagHide) {
        await entity.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', true);
      }
    }
  };

  unhideEntityLink = async function (entityID, entities) {
    let entity = entities.find((e) => {
      return e && e.id == entityID;
    });
    if (entity) {
      const hasFlagHide = hasProperty(entity.data, `flags.${HIDDEN_ENTITY_LINKS_MODULE_NAME}.hidden`);
      if (hasFlagHide) {
        await entity.unsetFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden');
      }
    }
  };

  showEntityLink = async function (entityID, entities) {
    let entity = entities.find((e) => {
      return e && e.id == entityID;
    });
    if (entity) {
      const hasFlagHide = hasProperty(entity.data, `flags.${HIDDEN_ENTITY_LINKS_MODULE_NAME}.hidden`);
      if (hasFlagHide) {
        await entity.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', false);
      }
    }
  };

  _checkPermission = function (entity, user, setting) {
    let result = true;
    let set;
    if (setting == 'level-permission-actors') {
      set = game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'level-permission-actors');
    } else if (setting == 'level-permission-items') {
      set = game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'level-permission-items');
    } else if (setting == 'level-permission-journals') {
      set = game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'level-permission-journals');
    } else if (setting == 'level-permission-rolltables') {
      set = game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'level-permission-rolltables');
      // } else if (setting == 'level-permission-scenes') {
      //   set = game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'level-permission-scenes');
    } else if (setting == 'level-permission-disguise-unreachable-links') {
      set = game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'level-permission-disguise-unreachable-links');
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
      hasProperty(entity.data, `flags.${HIDDEN_ENTITY_LINKS_MODULE_NAME}.hidden`) &&
      entity.getFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden') != null &&
      entity.getFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden') != undefined;
    if (hasFlagHide) {
      if (entity.getFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden')) {
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
    if (this.getFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hiddenTable')) {
      try {
        args[0].rollMode = 'gmroll';
      } catch {
        args.push({ rollMode: 'gmroll' });
      }
    }
    return wrapped(...args);
  }
}

// ==================
// SOCKET SUPPORT (We don' needed for now)
// ==================
/*
export let hiddenEntityLinksSocket;

Hooks.once('socketlib.ready', () => {
  hiddenEntityLinksSocket = socketlib.registerModule(HIDDEN_ENTITY_LINKS_MODULE_NAME);
  hiddenEntityLinksSocket.register(
    'updateHiddenEntityLinks',
    HiddenEntityLinksSocketFunctions.updateHiddenEntityLinks,
  );
  hiddenEntityLinksSocket.register(
    'directoryRenderedHiddenEntityLinks',
    HiddenEntityLinksSocketFunctions.directoryRenderedHiddenEntityLinks,
  );
  hiddenEntityLinksSocket.register(
    'hideRenderedHiddenEntityLinks',
    HiddenEntityLinksSocketFunctions.hideRenderedHiddenEntityLinks,
  );
});

class HiddenEntityLinksSocketFunctions {
  static updateHiddenEntityLinks(entityData, html, data) {
    game.hiddenEntityLinks.updateHiddenEntityLinks(entityData, html, data);
  }

  static directoryRenderedHiddenEntityLinks(obj, html, data, entities) {
    game.hiddenEntityLinks.directoryRenderedHiddenEntityLinks(obj, html, data, entities);
  }

  static hideRenderedHiddenEntityLinks(sheet, html, data) {
    game.hiddenEntityLinks.hideRenderedHiddenEntityLinks(sheet, html, data);
  }
}
*/

Hooks.once('libChangelogsReady', function () {
  //@ts-ignore
  libChangelogs.register(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'Add feature for hide the soundtrack', 'minor');
});

Hooks.once('ready', async function () {
  if (!game.modules.get('lib-wrapper')?.active && game.user.isGM) {
    ui.notifications.error(
      `The '${HIDDEN_ENTITY_LINKS_MODULE_NAME}' module requires to install and activate the 'libWrapper' module.`,
    );
    return;
  }

  if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-soundtracks') && !game.user.isGM) {
    document.documentElement.style.setProperty('--hidden-entity-links-Display', 'none');
    document.documentElement.style.setProperty('--hidden-entity-links-Hidden', 'hidden');
    document.documentElement.style.setProperty('--hidden-entity-links-Flex', 'none');
  }

  // if (!game.modules.get('socketlib')?.active && game.user.isGM) {
  //   ui.notifications.error(
  //     `The '${HIDDEN_ENTITY_LINKS_MODULE_NAME}' module requires to install and activate the 'socketlib' module.`,
  //   );
  //   return;
  // }

  // game[HiddenEntityLinks.API].socket = hiddenEntityLinksSocket;

  Hooks.on('updateJournalEntry', (entityData, data) => {
    if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-journals')) {
      if (data.flags && data.flags['hidden-entity-links']) {
        let html = $('#journal.sidebar-tab');
        // hiddenEntityLinksSocket.executeForEveryone('updateHiddenEntityLinks', entityData, html, data);
        game[HiddenEntityLinks.API].updateHiddenEntityLinks(entityData, html, data);
      }
    }
  });
  Hooks.on('updateScene', (entityData, data) => {
    if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-scenes')) {
      if (data.flags && data.flags['hidden-entity-links']) {
        let html = $('#scenes.sidebar-tab');
        // hiddenEntityLinksSocket.executeForEveryone('updateHiddenEntityLinks', entityData, html, data);
        game[HiddenEntityLinks.API].updateHiddenEntityLinks(entityData, html, data);
      }
    }
  });
  Hooks.on('updateActor', (entityData, data) => {
    if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-actors')) {
      if (data.flags && data.flags['hidden-entity-links']) {
        let html = $('#actors.sidebar-tab');
        // hiddenEntityLinksSocket.executeForEveryone('updateHiddenEntityLinks', entityData, html, data);
        game[HiddenEntityLinks.API].updateHiddenEntityLinks(entityData, html, data);
      }
    }
  });
  Hooks.on('updateItem', (entityData, data) => {
    if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-items')) {
      if (data.flags && data.flags['hidden-entity-links']) {
        let html = $('#items.sidebar-tab');
        // hiddenEntityLinksSocket.executeForEveryone('updateHiddenEntityLinks', entityData, html, data);
        game[HiddenEntityLinks.API].updateHiddenEntityLinks(entityData, html, data);
      }
    }
  });
  // Hooks.on('updateMacro', directoryRenderedHiddenEntityLinks);
  Hooks.on('updateRollTable', (entityData, data) => {
    if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-rolltables')) {
      if (data.flags && data.flags['hidden-entity-links']) {
        let html = $('#tables.sidebar-tab');
        // hiddenEntityLinksSocket.executeForEveryone('updateHiddenEntityLinks', entityData, html, data);
        game[HiddenEntityLinks.API].updateHiddenEntityLinks(entityData, html, data);
      }
    }
  });

  // TODO FOR FOUNDRY 9
  // Hooks.on('updateCards', (entityData, data) => {
  //   if (data.flags && data.flags['hidden-entity-links']) {
  //     let html = $('#cards.sidebar-tab');
  //     // hiddenEntityLinksSocket.executeForEveryone('updateHiddenEntityLinks', entityData, html, data);
  //     game[HiddenEntityLinks.API].updateHiddenEntityLinks(entityData, html, data);
  //   }
  // });

  // Hooks.on('updateFolder', (entityData, data) => {
  //   let html = $('.sidebar-tab');
  //   if (!game.user.isGM){
  //     return;
  //   }
  //   let listFolder = html.find('li.directory-item.folder')
  //   for (let liFolder of listFolder) {
  //     liFolder = $(liFolder);
  //     if(entityData.id == liFolder.attr('data-folder-id')){
  //       let isHidden = data.flags["hidden-entity-links"].hidden;
  //       if (isHidden && liFolder.find('.hidden-entity-links').length <= 0) {
  //         let div = $(
  //           `<div class="hidden-entity-links" style="position:absolute;padding-left:45px;">
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
    // if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-journals')) {
    //   if (data.flags && data.flags['hidden-entity-links']) {
    game[HiddenEntityLinks.API].hideRenderedHiddenEntityLinks(sheet, html, data);
    //   }
    // }
  });
  // Hooks.on('renderSceneSheet', (sheet, html, data) => {});
  Hooks.on('renderActorSheet', (sheet, html, data) => {
    // if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-actors')) {
    //   if (data.flags && data.flags['hidden-entity-links']) {
    game[HiddenEntityLinks.API].hideRenderedHiddenEntityLinks(sheet, html, data);
    //   }
    // }
  });
  Hooks.on('renderItemSheet', (sheet, html, data) => {
    // if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-items')) {
    //   if (data.flags && data.flags['hidden-entity-links']) {
    game[HiddenEntityLinks.API].hideRenderedHiddenEntityLinks(sheet, html, data);
    //   }
    // }
  });
  // Hooks.on('renderMacroSheet', (sheet, html, data) => {});
  // Hooks.on('renderRolltableSheet', (sheet, html, data) => {});
});

Hooks.once('init', async function () {
  // Do anything once the module is ready
  if (!game.modules.get('lib-wrapper')?.active && game.user.isGM) {
    ui.notifications.error(
      `The '${HIDDEN_ENTITY_LINKS_MODULE_NAME}' module requires to install and activate the 'libWrapper' module.`,
    );
    return;
  }

  // if (!game.modules.get('socketlib')?.active && game.user.isGM) {
  //   ui.notifications.error(
  //     `The '${HIDDEN_ENTITY_LINKS_MODULE_NAME}' module requires to install and activate the 'socketlib' module.`,
  //   );
  //   return;
  // }
  game[HiddenEntityLinks.API] = new HiddenEntityLinks();

  libWrapper.register(
    HIDDEN_ENTITY_LINKS_MODULE_NAME,
    'RollTable.prototype.draw',
    game[HiddenEntityLinks.API].hiddenTable,
    'WRAPPER',
  );
});

Hooks.once('setup', async function () {
  Settings.registerSettings();

  // Do anything once the module is ready
  if (!game.modules.get('lib-wrapper')?.active && game.user.isGM) {
    ui.notifications.error(
      `The '${HIDDEN_ENTITY_LINKS_MODULE_NAME}' module requires to install and activate the 'libWrapper' module.`,
    );
    return;
  }

  // if (!game.modules.get('socketlib')?.active && game.user.isGM) {
  //   ui.notifications.error(
  //     `The '${HIDDEN_ENTITY_LINKS_MODULE_NAME}' module requires to install and activate the 'socketlib' module.`,
  //   );
  //   return;
  // }

  Hooks.on('renderRollTableConfig', (config, html, css) => {
    const isHidden = config.object.getFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hiddenTable');
    let lastBox = html.find('.results');
    let checkboxHTML = `
    <div class="form-group">
        <label>${game.i18n.format('hidden-entity-links.label.tableTextHiddenTable')}</label>
        <input type="checkbox" name="flags.${HIDDEN_ENTITY_LINKS_MODULE_NAME}.hiddenTable" ${isHidden ? 'checked' : ''}>
    </div>
    `;
    lastBox.before(checkboxHTML);
  });

  Hooks.on('renderJournalDirectory', (obj, html, data) => {
    if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-journals')) {
      const entities = game.journal;
      // if (hiddenEntityLinksSocket) {
      //   hiddenEntityLinksSocket.executeForEveryone('directoryRenderedHiddenEntityLinks', obj, html, data, entities);
      //   hiddenEntityLinksSocket.executeForEveryone('hideRenderedHiddenEntityLinks', obj, html, data);
      // } else {
      game[HiddenEntityLinks.API].directoryRenderedHiddenEntityLinks(obj, html, data, entities);
      // game[HiddenEntityLinks.API].hideRenderedHiddenEntityLinks(obj, html, data);
      // }
    }
  });
  Hooks.on('renderSceneDirectory', (obj, html, data) => {
    if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-scenes')) {
      const entities = game.scenes;
      // if (hiddenEntityLinksSocket) {
      //   hiddenEntityLinksSocket.executeForEveryone('directoryRenderedHiddenEntityLinks', obj, html, data, entities);
      //   hiddenEntityLinksSocket.executeForEveryone('hideRenderedHiddenEntityLinks', obj, html, data);
      // } else {
      game[HiddenEntityLinks.API].directoryRenderedHiddenEntityLinks(obj, html, data, entities);
      // game[HiddenEntityLinks.API].hideRenderedHiddenEntityLinks(obj, html, data);
      // }
    }
  });
  Hooks.on('renderActorDirectory', (obj, html, data) => {
    if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-actors')) {
      const entities = game.actors;
      // if (hiddenEntityLinksSocket) {
      //   hiddenEntityLinksSocket.executeForEveryone('directoryRenderedHiddenEntityLinks', obj, html, data, entities);
      //   hiddenEntityLinksSocket.executeForEveryone('hideRenderedHiddenEntityLinks', obj, html, data);
      // } else {
      game[HiddenEntityLinks.API].directoryRenderedHiddenEntityLinks(obj, html, data, entities);
      // game[HiddenEntityLinks.API].hideRenderedHiddenEntityLinks(obj, html, data);
      // }
    }
  });
  Hooks.on('renderItemDirectory', (obj, html, data) => {
    if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-items')) {
      const entities = game.items;
      // if (hiddenEntityLinksSocket) {
      //   hiddenEntityLinksSocket.executeForEveryone('directoryRenderedHiddenEntityLinks', obj, html, data, entities);
      //   hiddenEntityLinksSocket.executeForEveryone('hideRenderedHiddenEntityLinks', obj, html, data);
      // } else {
      game[HiddenEntityLinks.API].directoryRenderedHiddenEntityLinks(obj, html, data, entities);
      // game[HiddenEntityLinks.API].hideRenderedHiddenEntityLinks(obj, html, data);
      // }
    }
  });
  // Hooks.on('renderMacroDirectory', directoryRenderedHiddenEntityLinks);
  Hooks.on('renderRollTableDirectory', (obj, html, data) => {
    if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-rolltables')) {
      const entities = game.tables;
      // if (hiddenEntityLinksSocket) {
      //   hiddenEntityLinksSocket.executeForEveryone('directoryRenderedHiddenEntityLinks', obj, html, data, entities);
      //   hiddenEntityLinksSocket.executeForEveryone('hideRenderedHiddenEntityLinks', obj, html, data);
      // } else {
      game[HiddenEntityLinks.API].directoryRenderedHiddenEntityLinks(obj, html, data, entities);
      // game[HiddenEntityLinks.API].hideRenderedHiddenEntityLinks(obj, html, data);
      // }
    }
  });

  // TODO FOR FOUNDRY 9
  // Hooks.on('renderCardsDirectory', (obj, html, data) => {
  //   const entities = game.cards;
  //   // if (hiddenEntityLinksSocket) {
  //   //   hiddenEntityLinksSocket.executeForEveryone('directoryRenderedHiddenEntityLinks', obj, html, data, entities);
  //   //   hiddenEntityLinksSocket.executeForEveryone('hideRenderedHiddenEntityLinks', obj, html, data);
  //   // } else {
  //   game[HiddenEntityLinks.API].directoryRenderedHiddenEntityLinks(obj, html, data, entities);
  //   game[HiddenEntityLinks.API].hideRenderedHiddenEntityLinks(obj, html, data);
  //   // }
  // });

  // =======================
  // Journal
  // =======================

  if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-journals')) {
    libWrapper.register(
      HIDDEN_ENTITY_LINKS_MODULE_NAME,
      'JournalEntry.prototype.visible',
      function (wrapped, ...args) {
        if (game.user.isGM) {
          return true;
        }
        if (
          !game.user.isGM &&
          game[HiddenEntityLinks.API]._checkState(this) == game[HiddenEntityLinks.API]._state.HIDE
        ) {
          return false;
        }
        if (
          !game.user.isGM &&
          game[HiddenEntityLinks.API]._checkState(this) == game[HiddenEntityLinks.API]._state.SHOW
        ) {
          return true;
        }
        if (game[HiddenEntityLinks.API]._checkPermission(this, game.user, 'level-permission-journals')) {
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
    //     if (game.user.isGM) {
    //       return wrapped(...args);
    //     }
    //     if (this.object.getFlag(mod, 'hidden')) {
    //       return;
    //     }
    //     // return this.object.show(this._sheetMode, true);
    //     return wrapped(...args);
    //   },
    //   'MIXED',
    // );

    libWrapper.register(
      HIDDEN_ENTITY_LINKS_MODULE_NAME,
      'JournalSheet.prototype._inferDefaultMode',
      function (wrapped, ...args) {
        if (game.user.isGM) {
          return wrapped(...args);
        }
        if (this.object.getFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden')) {
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

    libWrapper.register(
      HIDDEN_ENTITY_LINKS_MODULE_NAME,
      'JournalDirectory.prototype._getEntryContextOptions',
      function (wrapped, ...args) {
        const options = SidebarDirectory.prototype._getEntryContextOptions.call(this);
        if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'disable-voices')) {
          return options;
        }
        return [
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.hide-entity`),
            icon: '<i class="far fa-lightbulb"></i>',
            condition: (li) => {
              const journal = game.journal.get(li.data('entityId'))
                ? game.journal.get(li.data('entityId'))
                : game.journal.get(li.data('documentId'));
              if (
                game.user.isGM &&
                (game[HiddenEntityLinks.API]._checkState(journal) == game[HiddenEntityLinks.API]._state.UNHIDE ||
                  game[HiddenEntityLinks.API]._checkState(journal) == game[HiddenEntityLinks.API]._state.SHOW)
              ) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (li) => {
              const journal = game.journal.get(li.data('entityId'))
                ? game.journal.get(li.data('entityId'))
                : game.journal.get(li.data('documentId'));
              await journal.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', true);
            },
          },
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.unhide-entity`),
            icon: '<i class="fas fa-low-vision"></i>',
            condition: (li) => {
              const journal = game.journal.get(li.data('entityId'))
                ? game.journal.get(li.data('entityId'))
                : game.journal.get(li.data('documentId'));
              if (
                game.user.isGM &&
                (game[HiddenEntityLinks.API]._checkState(journal) == game[HiddenEntityLinks.API]._state.HIDE ||
                  game[HiddenEntityLinks.API]._checkState(journal) == game[HiddenEntityLinks.API]._state.SHOW)
              ) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (li) => {
              const journal = game.journal.get(li.data('entityId'))
                ? game.journal.get(li.data('entityId'))
                : game.journal.get(li.data('documentId'));
              await journal.unsetFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden');
            },
          },
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.show-entity`),
            icon: '<i class="fas fa-lightbulb"></i>',
            condition: (li) => {
              const journal = game.journal.get(li.data('entityId'))
                ? game.journal.get(li.data('entityId'))
                : game.journal.get(li.data('documentId'));
              if (
                game.user.isGM &&
                (game[HiddenEntityLinks.API]._checkState(journal) == game[HiddenEntityLinks.API]._state.HIDE ||
                  game[HiddenEntityLinks.API]._checkState(journal) == game[HiddenEntityLinks.API]._state.UNHIDE)
              ) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (li) => {
              const journal = game.journal.get(li.data('entityId'))
                ? game.journal.get(li.data('entityId'))
                : game.journal.get(li.data('documentId'));
              await journal.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', false);
            },
          },
        ].concat(options);
      },
      'MIXED',
    );

    libWrapper.register(
      HIDDEN_ENTITY_LINKS_MODULE_NAME,
      'JournalDirectory.prototype._getFolderContextOptions',
      function (wrapped, ...args) {
        const options = SidebarDirectory.prototype._getFolderContextOptions.call(this);
        if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'disable-voices')) {
          return options;
        }
        return [
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.hide-folder`),
            icon: '<i class="far fa-lightbulb"></i>',
            condition: (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              if (game.user.isGM) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              const updates = game.journal
                .filter((journal) => journal.data.folder === folderObject.id)
                .map(async (journal) => {
                  await journal.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', true);
                });
            },
          },
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.unhide-entity`),
            icon: '<i class="fas fa-low-vision"></i>',
            condition: (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              if (game.user.isGM) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              const updates = game.journal
                .filter((journal) => journal.data.folder === folderObject.id)
                .map(async (journal) => {
                  await journal.unsetFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden');
                });
            },
          },
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.show-folder`),
            icon: '<i class="fas fa-lightbulb"></i>',
            condition: (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              if (game.user.isGM) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              const updates = game.journal
                .filter((journal) => journal.data.folder === folderObject.id)
                .map(async (journal) => {
                  await journal.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', false);
                });
            },
          },
        ].concat(options);
      },
      'MIXED',
    );
  }

  // =======================
  // Items
  // =======================

  if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-items')) {
    libWrapper.register(
      HIDDEN_ENTITY_LINKS_MODULE_NAME,
      'Item.prototype.visible',
      function (wrapped, ...args) {
        if (game.user.isGM) {
          return true;
        }
        if (
          !game.user.isGM &&
          game[HiddenEntityLinks.API]._checkState(this) == game[HiddenEntityLinks.API]._state.HIDE
        ) {
          return false;
        }
        if (
          !game.user.isGM &&
          game[HiddenEntityLinks.API]._checkState(this) == game[HiddenEntityLinks.API]._state.SHOW
        ) {
          return true;
        }
        if (game[HiddenEntityLinks.API]._checkPermission(this, game.user, 'level-permission-items')) {
          return false;
        }
        return true;
      },
      'OVERRIDE',
    );

    libWrapper.register(
      HIDDEN_ENTITY_LINKS_MODULE_NAME,
      'ItemDirectory.prototype._getEntryContextOptions',
      function (wrapped, ...args) {
        const options = SidebarDirectory.prototype._getEntryContextOptions.call(this);
        if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'disable-voices')) {
          return options;
        }
        return [
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.hide-entity`),
            icon: '<i class="far fa-lightbulb"></i>',
            condition: (li) => {
              const item = game.items.get(li.data('entityId'))
                ? game.items.get(li.data('entityId'))
                : game.items.get(li.data('documentId'));
              if (
                game.user.isGM &&
                (game[HiddenEntityLinks.API]._checkState(item) == game[HiddenEntityLinks.API]._state.UNHIDE ||
                  game[HiddenEntityLinks.API]._checkState(item) == game[HiddenEntityLinks.API]._state.SHOW)
              ) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (li) => {
              const item = game.items.get(li.data('entityId'))
                ? game.items.get(li.data('entityId'))
                : game.items.get(li.data('documentId'));
              await item.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', true);
            },
          },
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.unhide-entity`),
            icon: '<i class="fas fa-low-vision"></i>',
            condition: (li) => {
              const item = game.items.get(li.data('entityId'))
                ? game.items.get(li.data('entityId'))
                : game.items.get(li.data('documentId'));
              if (
                game.user.isGM &&
                (game[HiddenEntityLinks.API]._checkState(item) == game[HiddenEntityLinks.API]._state.HIDE ||
                  game[HiddenEntityLinks.API]._checkState(item) == game[HiddenEntityLinks.API]._state.SHOW)
              ) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (li) => {
              const item = game.items.get(li.data('entityId'))
                ? game.items.get(li.data('entityId'))
                : game.items.get(li.data('documentId'));
              await item.unsetFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden');
            },
          },
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.show-entity`),
            icon: '<i class="fas fa-lightbulb"></i>',
            condition: (li) => {
              const item = game.items.get(li.data('entityId'))
                ? game.items.get(li.data('entityId'))
                : game.items.get(li.data('documentId'));
              if (
                game.user.isGM &&
                (game[HiddenEntityLinks.API]._checkState(item) == game[HiddenEntityLinks.API]._state.HIDE ||
                  game[HiddenEntityLinks.API]._checkState(item) == game[HiddenEntityLinks.API]._state.UNHIDE)
              ) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (li) => {
              const item = game.items.get(li.data('entityId'))
                ? game.items.get(li.data('entityId'))
                : game.items.get(li.data('documentId'));
              await item.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', false);
            },
          },
        ].concat(options);
      },
      'MIXED',
    );

    libWrapper.register(
      HIDDEN_ENTITY_LINKS_MODULE_NAME,
      'ItemDirectory.prototype._getFolderContextOptions',
      function (wrapped, ...args) {
        const options = SidebarDirectory.prototype._getFolderContextOptions.call(this);
        if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'disable-voices')) {
          return options;
        }
        return [
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.hide-folder`),
            icon: '<i class="far fa-lightbulb"></i>',
            condition: (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              if (game.user.isGM) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              const updates = game.items
                .filter((item) => item.data.folder === folderObject.id)
                .map(async (item) => {
                  await item.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', true);
                });
            },
          },
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.unhide-entity`),
            icon: '<i class="fas fa-low-vision"></i>',
            condition: (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              if (game.user.isGM) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              const updates = game.items
                .filter((item) => item.data.folder === folderObject.id)
                .map(async (item) => {
                  await item.unsetFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden');
                });
            },
          },
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.show-folder`),
            icon: '<i class="fas fa-lightbulb"></i>',
            condition: (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              if (game.user.isGM) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              const updates = game.items
                .filter((item) => item.data.folder === folderObject.id)
                .map(async (item) => {
                  await item.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', false);
                });
            },
          },
        ].concat(options);
      },
      'MIXED',
    );
  }

  // =======================
  // Actors
  // =======================

  if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-actors')) {
    libWrapper.register(
      HIDDEN_ENTITY_LINKS_MODULE_NAME,
      'Actor.prototype.visible',
      function (wrapped, ...args) {
        if (game.user.isGM) {
          return true;
        }
        if (
          !game.user.isGM &&
          game[HiddenEntityLinks.API]._checkState(this) == game[HiddenEntityLinks.API]._state.HIDE
        ) {
          return false;
        }
        if (
          !game.user.isGM &&
          game[HiddenEntityLinks.API]._checkState(this) == game[HiddenEntityLinks.API]._state.SHOW
        ) {
          return true;
        }
        if (game[HiddenEntityLinks.API]._checkPermission(this, game.user, 'level-permission-actors')) {
          return false;
        }
        return true;
      },
      'OVERRIDE',
    );

    libWrapper.register(
      HIDDEN_ENTITY_LINKS_MODULE_NAME,
      'ActorDirectory.prototype._getEntryContextOptions',
      function (wrapped, ...args) {
        const options = SidebarDirectory.prototype._getEntryContextOptions.call(this);
        if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'disable-voices')) {
          return options;
        }
        return [
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.hide-entity`),
            icon: '<i class="far fa-lightbulb"></i>',
            condition: (li) => {
              const actor = game.actors.get(li.data('entityId'))
                ? game.actors.get(li.data('entityId'))
                : game.actors.get(li.data('documentId'));
              if (
                game.user.isGM &&
                (game[HiddenEntityLinks.API]._checkState(actor) == game[HiddenEntityLinks.API]._state.UNHIDE ||
                  game[HiddenEntityLinks.API]._checkState(actor) == game[HiddenEntityLinks.API]._state.SHOW)
              ) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (li) => {
              const actor = game.actors.get(li.data('entityId'))
                ? game.actors.get(li.data('entityId'))
                : game.actors.get(li.data('documentId'));
              await actor.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', true);
            },
          },
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.unhide-entity`),
            icon: '<i class="fas fa-low-vision"></i>',
            condition: (li) => {
              const actor = game.actors.get(li.data('entityId'))
                ? game.actors.get(li.data('entityId'))
                : game.actors.get(li.data('documentId'));
              if (
                game.user.isGM &&
                (game[HiddenEntityLinks.API]._checkState(actor) == game[HiddenEntityLinks.API]._state.HIDE ||
                  game[HiddenEntityLinks.API]._checkState(actor) == game[HiddenEntityLinks.API]._state.SHOW)
              ) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (li) => {
              const actor = game.actors.get(li.data('entityId'))
                ? game.actors.get(li.data('entityId'))
                : game.actors.get(li.data('documentId'));
              await actor.unsetFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden');
            },
          },
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.show-entity`),
            icon: '<i class="fas fa-lightbulb"></i>',
            condition: (li) => {
              const actor = game.actors.get(li.data('entityId'))
                ? game.actors.get(li.data('entityId'))
                : game.actors.get(li.data('documentId'));
              if (
                game.user.isGM &&
                (game[HiddenEntityLinks.API]._checkState(actor) == game[HiddenEntityLinks.API]._state.HIDE ||
                  game[HiddenEntityLinks.API]._checkState(actor) == game[HiddenEntityLinks.API]._state.UNHIDE)
              ) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (li) => {
              const actor = game.actors.get(li.data('entityId'))
                ? game.actors.get(li.data('entityId'))
                : game.actors.get(li.data('documentId'));
              await actor.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', false);
            },
          },
        ].concat(options);
      },
      'MIXED',
    );

    libWrapper.register(
      HIDDEN_ENTITY_LINKS_MODULE_NAME,
      'ActorDirectory.prototype._getFolderContextOptions',
      function (wrapped, ...args) {
        const options = SidebarDirectory.prototype._getFolderContextOptions.call(this);
        if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'disable-voices')) {
          return options;
        }
        return [
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.hide-folder`),
            icon: '<i class="far fa-lightbulb"></i>',
            condition: (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              if (game.user.isGM) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              const updates = game.actors
                .filter((actor) => actor.data.folder === folderObject.id)
                .map(async (actor) => {
                  await actor.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', true);
                });
            },
          },
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.unhide-entity`),
            icon: '<i class="fas fa-low-vision"></i>',
            condition: (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              if (game.user.isGM) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              const updates = game.actors
                .filter((actor) => actor.data.folder === folderObject.id)
                .map(async (actor) => {
                  await actor.unsetFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden');
                });
            },
          },
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.show-folder`),
            icon: '<i class="fas fa-lightbulb"></i>',
            condition: (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              if (game.user.isGM) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              const updates = game.actors
                .filter((actor) => actor.data.folder === folderObject.id)
                .map(async (actor) => {
                  await actor.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', false);
                });
            },
          },
        ].concat(options);
      },
      'MIXED',
    );
  }

  // =======================
  // Rolltable
  // =======================

  if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-rolltables')) {
    libWrapper.register(
      HIDDEN_ENTITY_LINKS_MODULE_NAME,
      'RollTable.prototype.visible',
      function (wrapped, ...args) {
        if (game.user.isGM) {
          return true;
        }
        if (
          !game.user.isGM &&
          game[HiddenEntityLinks.API]._checkState(this) == game[HiddenEntityLinks.API]._state.HIDE
        ) {
          return false;
        }
        if (
          !game.user.isGM &&
          game[HiddenEntityLinks.API]._checkState(this) == game[HiddenEntityLinks.API]._state.SHOW
        ) {
          return true;
        }
        if (game[HiddenEntityLinks.API]._checkPermission(this, game.user, 'level-permission-rolltables')) {
          return false;
        }
        return true;
      },
      'OVERRIDE',
    );

    libWrapper.register(
      HIDDEN_ENTITY_LINKS_MODULE_NAME,
      'RollTableConfig.defaultOptions',
      function (wrapped, ...args) {
        return foundry.utils.mergeObject(wrapped(...args), {
          viewPermission: CONST.ENTITY_PERMISSIONS.LIMITED,
        });
      },
      'WRAPPER',
    );

    libWrapper.register(
      HIDDEN_ENTITY_LINKS_MODULE_NAME,
      'RollTableDirectory.prototype._getEntryContextOptions',
      function (wrapped, ...args) {
        const options = SidebarDirectory.prototype._getEntryContextOptions.call(this);
        if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'disable-voices')) {
          return options;
        }
        return [
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.hide-entity`),
            icon: '<i class="far fa-lightbulb"></i>',
            condition: (li) => {
              const rolltable = game.tables.get(li.data('entityId'))
                ? game.tables.get(li.data('entityId'))
                : game.tables.get(li.data('documentId'));
              if (
                game.user.isGM &&
                (game[HiddenEntityLinks.API]._checkState(rolltable) == game[HiddenEntityLinks.API]._state.UNHIDE ||
                  game[HiddenEntityLinks.API]._checkState(rolltable) == game[HiddenEntityLinks.API]._state.SHOW)
              ) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (li) => {
              const rolltable = game.tables.get(li.data('entityId'))
                ? game.tables.get(li.data('entityId'))
                : game.tables.get(li.data('documentId'));
              await rolltable.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', true);
            },
          },
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.unhide-entity`),
            icon: '<i class="fas fa-low-vision"></i>',
            condition: (li) => {
              const rolltable = game.tables.get(li.data('entityId'))
                ? game.tables.get(li.data('entityId'))
                : game.tables.get(li.data('documentId'));
              if (
                game.user.isGM &&
                (game[HiddenEntityLinks.API]._checkState(rolltable) == game[HiddenEntityLinks.API]._state.HIDE ||
                  game[HiddenEntityLinks.API]._checkState(rolltable) == game[HiddenEntityLinks.API]._state.SHOW)
              ) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (li) => {
              const rolltable = game.tables.get(li.data('entityId'))
                ? game.tables.get(li.data('entityId'))
                : game.tables.get(li.data('documentId'));
              await rolltable.unsetFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden');
            },
          },
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.show-entity`),
            icon: '<i class="fas fa-lightbulb"></i>',
            condition: (li) => {
              const rolltable = game.tables.get(li.data('entityId'))
                ? game.tables.get(li.data('entityId'))
                : game.tables.get(li.data('documentId'));
              if (
                game.user.isGM &&
                (game[HiddenEntityLinks.API]._checkState(rolltable) == game[HiddenEntityLinks.API]._state.HIDE ||
                  game[HiddenEntityLinks.API]._checkState(rolltable) == game[HiddenEntityLinks.API]._state.UNHIDE)
              ) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (li) => {
              const rolltable = game.tables.get(li.data('entityId'))
                ? game.tables.get(li.data('entityId'))
                : game.tables.get(li.data('documentId'));
              await rolltable.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', false);
            },
          },
        ].concat(options);
      },
      'MIXED',
    );

    libWrapper.register(
      HIDDEN_ENTITY_LINKS_MODULE_NAME,
      'RollTableDirectory.prototype._getFolderContextOptions',
      function (wrapped, ...args) {
        const options = SidebarDirectory.prototype._getFolderContextOptions.call(this);
        if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'disable-voices')) {
          return options;
        }
        return [
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.hide-folder`),
            icon: '<i class="far fa-lightbulb"></i>',
            condition: (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              if (game.user.isGM) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              const updates = game.tables
                .filter((rolltable) => rolltable.data.folder === folderObject.id)
                .map(async (rolltable) => {
                  await rolltable.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', true);
                });
            },
          },
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.unhide-entity`),
            icon: '<i class="fas fa-low-vision"></i>',
            condition: (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              if (game.user.isGM) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              const updates = game.tables
                .filter((rolltable) => rolltable.data.folder === folderObject.id)
                .map(async (rolltable) => {
                  await rolltable.unsetFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden');
                });
            },
          },
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.show-folder`),
            icon: '<i class="fas fa-lightbulb"></i>',
            condition: (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              if (game.user.isGM) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              const updates = game.tables
                .filter((rolltable) => rolltable.data.folder === folderObject.id)
                .map(async (rolltable) => {
                  await rolltable.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', false);
                });
            },
          },
        ].concat(options);
      },
      'MIXED',
    );
  }

  // =======================
  // Scene
  // =======================

  if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-scenes')) {
    libWrapper.register(
      HIDDEN_ENTITY_LINKS_MODULE_NAME,
      'Scene.prototype.visible',
      function (wrapped, ...args) {
        if (game.user.isGM) {
          return true;
        }
        if (
          !game.user.isGM &&
          game[HiddenEntityLinks.API]._checkState(this) == game[HiddenEntityLinks.API]._state.HIDE
        ) {
          return false;
        }
        if (
          !game.user.isGM &&
          game[HiddenEntityLinks.API]._checkState(this) == game[HiddenEntityLinks.API]._state.SHOW
        ) {
          return true;
        }
        // if (game[HiddenEntityLinks.API]._checkPermission(this, game.user, 'level-permission-scenes')) {
        //   return false;
        // }
        return true;
      },
      'OVERRIDE',
    );

    libWrapper.register(
      HIDDEN_ENTITY_LINKS_MODULE_NAME,
      'SceneDirectory.prototype._getEntryContextOptions',
      function (wrapped, ...args) {
        const options = SidebarDirectory.prototype._getEntryContextOptions.call(this);
        if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'disable-voices')) {
          return options;
        }
        return [
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.hide-entity`),
            icon: '<i class="far fa-lightbulb"></i>',
            condition: (li) => {
              const scene = game.scenes.get(li.data('entityId'))
                ? game.scenes.get(li.data('entityId'))
                : game.scenes.get(li.data('documentId'));
              if (
                game.user.isGM &&
                (game[HiddenEntityLinks.API]._checkState(scene) == game[HiddenEntityLinks.API]._state.UNHIDE ||
                  game[HiddenEntityLinks.API]._checkState(scene) == game[HiddenEntityLinks.API]._state.SHOW)
              ) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (li) => {
              const scene = game.scenes.get(li.data('entityId'))
                ? game.scenes.get(li.data('entityId'))
                : game.scenes.get(li.data('documentId'));
              await scene.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', true);
              if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-scenes-nav')) {
                const updates = [
                  {
                    _id: scene.id,
                    navigation: false,
                    permission: {
                      default: 0,
                    },
                  },
                ];
                return Scene.update(updates);
              }
            },
          },
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.unhide-entity`),
            icon: '<i class="fas fa-low-vision"></i>',
            condition: (li) => {
              const scene = game.scenes.get(li.data('entityId'))
                ? game.scenes.get(li.data('entityId'))
                : game.scenes.get(li.data('documentId'));
              if (
                game.user.isGM &&
                (game[HiddenEntityLinks.API]._checkState(scene) == game[HiddenEntityLinks.API]._state.HIDE ||
                  game[HiddenEntityLinks.API]._checkState(scene) == game[HiddenEntityLinks.API]._state.SHOW)
              ) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (li) => {
              const scene = game.scenes.get(li.data('entityId'))
                ? game.scenes.get(li.data('entityId'))
                : game.scenes.get(li.data('documentId'));
              await scene.unsetFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden');
            },
          },
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.show-entity`),
            icon: '<i class="fas fa-lightbulb"></i>',
            condition: (li) => {
              const scene = game.scenes.get(li.data('entityId'))
                ? game.scenes.get(li.data('entityId'))
                : game.scenes.get(li.data('documentId'));
              if (
                game.user.isGM &&
                (game[HiddenEntityLinks.API]._checkState(scene) == game[HiddenEntityLinks.API]._state.HIDE ||
                  game[HiddenEntityLinks.API]._checkState(scene) == game[HiddenEntityLinks.API]._state.UNHIDE)
              ) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (li) => {
              const scene = game.scenes.get(li.data('entityId'))
                ? game.scenes.get(li.data('entityId'))
                : game.scenes.get(li.data('documentId'));
              await scene.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', false);
              if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-scenes-nav')) {
                const updates = [
                  {
                    _id: scene.id,
                    navigation: true,
                  },
                ];
                return Scene.update(updates);
              }
            },
          },
        ].concat(options);
      },
      'MIXED',
    );

    libWrapper.register(
      HIDDEN_ENTITY_LINKS_MODULE_NAME,
      'SceneDirectory.prototype._getFolderContextOptions',
      function (wrapped, ...args) {
        const options = SidebarDirectory.prototype._getFolderContextOptions.call(this);
        if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'disable-voices')) {
          return options;
        }
        return [
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.hide-folder`),
            icon: '<i class="far fa-lightbulb"></i>',
            condition: (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              if (game.user.isGM) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              const updates = game.scenes
                .filter((scene) => scene.data.folder === folderObject.id)
                .map(async (scene) => {
                  await scene.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', true);
                });

              if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-scenes-nav')) {
                const updates = game.scenes
                  .filter((scene) => scene.data.folder === folderObject.id)
                  .map((scene) => ({
                    _id: scene.id,
                    navigation:
                      !scene.getFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden') && scene.navigation
                        ? false
                        : scene.navigation,
                    permission: {
                      default:
                        !scene.getFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden') && scene.navigation
                          ? 0
                          : scene.permission.default,
                    },
                  }));
                return Scene.update(updates);
              }
            },
          },
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.unhide-entity`),
            icon: '<i class="fas fa-low-vision"></i>',
            condition: (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              if (game.user.isGM) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              const updates = game.scenes
                .filter((scene) => scene.data.folder === folderObject.id)
                .map(async (scene) => {
                  await scene.unsetFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden');
                });
            },
          },
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.show-folder`),
            icon: '<i class="fas fa-lightbulb"></i>',
            condition: (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              if (game.user.isGM) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              const updates = game.scenes
                .filter((scene) => scene.data.folder === folderObject.id)
                .map(async (scene) => {
                  await scene.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', false);
                });

              if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-scenes-nav')) {
                const updates = game.scenes
                  .filter((scene) => scene.data.folder === folderObject.id)
                  .map((scene) => ({
                    _id: scene.id,
                    navigation:
                      scene.getFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden') && !scene.navigation
                        ? true
                        : scene.navigation,
                  }));
                return Scene.update(updates);
              }
            },
          },
        ].concat(options);
      },
      'MIXED',
    );
  }
});
