import API from "./api.js";
import CONSTANTS from "./constants.js";
import {
  HiddenEntityLinkFlags,
  HiddenEntityLinkPermissions,
  HiddenEntityLinkState,
} from "./hidden-entity-link-models.js";
import { warn } from "./lib/lib.js";

export class HiddenEntityLinks {
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
  //             <i class="fa fa-fw" style="color:darkRed; text-shadow: 0 0 8px darkRed;"/>
  //           </div>`,
  //         );
  //         liFolder.find('h3').before(div);
  //       }
  //     }
  //   }
  // }

  updateFolderHiddenEntityLinks = async function (entityData, html, data, entities) {
    const listFolder = html.find("li.directory-item.folder");
    for (let liFolder of listFolder) {
      liFolder = $(liFolder);
      const folder = game.folders?.find((folderObject) => {
        return folderObject.id === liFolder.attr("data-folder-id");
      });
      if (folder) {
        const lifCreateEntry = liFolder.find(`.create-entry`);
        const isHiddenByFlag = folder.getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
        if (isHiddenByFlag) {
          const div = $(
            `<a class="create-button hidden-entity-links-only-folder">
                <i class="fa fa-fw"/>
              </a>`
          );
          lifCreateEntry.after(div);
        }

        // let list =
        //   liFolder.find('li.directory-item.document')?.length > 0
        //     ? liFolder.find('li.directory-item.document')
        //     : liFolder.find('li.directory-item.entity');
        // API.hiddenEntityLinks.updateHiddenEntityLinks(entityData, liFolder, undefined);
      }
    }
  };

  updateHiddenEntityLinks = async function (entityData, html, data) {
    const list =
      html.find("li.directory-item.document")?.length > 0
        ? html.find("li.directory-item.document")
        : html.find("li.directory-item.entity");
    for (let li of list) {
      li = $(li);
      if (entityData.id === li.attr("data-document-id") || entityData.id === li.attr("data-entity-id")) {
        //let isHidden = data.flags[CONSTANTS.MODULE_NAME]?.hidden; // why is undefined ??
        const state = API._checkState(entityData);
        if (state === HiddenEntityLinkState.HIDE) {
          if (!game.user?.isGM) {
            // do nothing
          } else {
            // let div = $(
            //   `<div class=CONSTANTS.MODULE_NAME style="position:absolute;padding-left:45px;">
            //     <i class="fa fa-fw" style="color:darkRed; text-shadow: 0 0 8px darkRed;"/>
            //   </div>`,
            // );
            // li.find('.entity-name').before(div);
            if (entityData instanceof Scene || game.settings.get(CONSTANTS.MODULE_NAME, "no-background-only-symbol")) {
              if (li.find(".hidden-entity-links-scene").length <= 0) {
                const div = $(
                  `<div class="hidden-entity-links-scene">
                    <i class="fa fa-fw"/>
                  </div>`
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
            li.find(".hidden-entity-links-scene-show").remove();
            li.find(".hidden-entity-links-scene-unhideshow").remove();
            // } else {
            li.removeClass("hidden-entity-links-show");
            li.removeClass("hidden-entity-links-unhideshow");
            // }
          }
        } else if (state === HiddenEntityLinkState.SHOW) {
          if (!game.user?.isGM) {
            // do nothing
          } else {
            if (entityData instanceof Scene || game.settings.get(CONSTANTS.MODULE_NAME, "no-background-only-symbol")) {
              if (li.find(".hidden-entity-links-scene-show").length <= 0) {
                const div = $(
                  `<div class="hidden-entity-links-scene-show">
                    <i class="fa fa-fw"/>
                  </div>`
                );
                //li.find('.entity-name').after(div);
                li.append(div);
              }
            } else {
              if (!li.hasClass("hidden-entity-links-show")) {
                li.addClass("hidden-entity-links-show");
              }
            }
            // if (
            //   entityData instanceof Scene ||
            //   game.settings.get(CONSTANTS.MODULE_NAME, 'no-background-only-symbol')
            // ) {
            li.find(".hidden-entity-links-scene").remove();
            li.find(".hidden-entity-links-scene-unhideshow").remove();
            // } else {
            li.removeClass(CONSTANTS.MODULE_NAME);
            li.removeClass("hidden-entity-links-unhideshow");
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
            li.find(".hidden-entity-links-scene").remove();
            li.find(".hidden-entity-links-scene-show").remove();
            // } else {
            li.removeClass(CONSTANTS.MODULE_NAME);
            li.removeClass("hidden-entity-links-show");
            // }
            if (game.settings.get(CONSTANTS.MODULE_NAME, "add-css-unhideshow")) {
              if (
                entityData instanceof Scene ||
                game.settings.get(CONSTANTS.MODULE_NAME, "no-background-only-symbol")
              ) {
                if (li.find(".hidden-entity-links-scene-unhideshow").length <= 0) {
                  const div = $(
                    `<div class="hidden-entity-links-scene-unhideshow">
                      <i class="fa fa-fw"/>
                    </div>`
                  );
                  //li.find('.entity-name').after(div);
                  li.append(div);
                }
              } else {
                if (!li.hasClass("hidden-entity-links-unhideshow")) {
                  li.addClass("hidden-entity-links-unhideshow");
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
    if (!collection || collection.length === 0) {
      return;
    }

    API.hiddenEntityLinks.updateFolderHiddenEntityLinks(obj, html, data, entities);

    const list =
      html.find("li.directory-item.document")?.length > 0
        ? html.find("li.directory-item.document")
        : html.find("li.directory-item.entity");
    for (let li of list) {
      li = $(li);
      const document = collection.find((d) => {
        return d.id === li.attr("data-document-id") || d.id === li.attr("data-entity-id");
      });
      // let document = collection.get(li.attr("data-document-id"))
      if (document) {
        try {
          // let isHidden = data.id == document.id && data.flags[CONSTANTS.MODULE_NAME]?.hidden
          //   ? data.flags[CONSTANTS.MODULE_NAME]?.hidden
          //   : document.getFlag(mod, HiddenEntityLinkFlags.HIDDEN);
          // let isHidden = document.getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
          const state = API._checkState(document);
          if (state === HiddenEntityLinkState.HIDE) {
            if (!game.user?.isGM) {
              //setProperty(document, 'visible', false);
              // TODO why i must do this ?????
              // li.hide();
            } else {
              // let div = $(
              //   `<div class=CONSTANTS.MODULE_NAME style="position:absolute;padding-left:45px;">
              //     <i class="fa fa-fw" style="color:darkRed; text-shadow: 0 0 8px darkRed;"/>
              //   </div>`,
              // );
              // li.find('.entity-name').before(div);
              if (
                obj instanceof SceneDirectory ||
                game.settings.get(CONSTANTS.MODULE_NAME, "no-background-only-symbol")
              ) {
                if (li.find(".hidden-entity-links-scene").length <= 0) {
                  const div = $(
                    `<div class="hidden-entity-links-scene">
                      <i class="fa fa-fw"/>
                    </div>`
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
          } else if (state === HiddenEntityLinkState.SHOW) {
            if (!game.user?.isGM) {
              //setProperty(document, 'visible', false);
              // TODO why i must do this ?????
              // li.hide();
            } else {
              // let div = $(
              //   `<div class=CONSTANTS.MODULE_NAME style="position:absolute;padding-left:45px;">
              //     <i class="fa fa-fw" style="color:darkRed; text-shadow: 0 0 8px darkRed;"/>
              //   </div>`,
              // );
              // li.find('.entity-name').before(div);
              if (
                obj instanceof SceneDirectory ||
                game.settings.get(CONSTANTS.MODULE_NAME, "no-background-only-symbol")
              ) {
                if (li.find(".hidden-entity-links-scene-show").length <= 0) {
                  const div = $(
                    `<div class="hidden-entity-links-scene-show">
                      <i class="fa fa-fw"/>
                    </div>`
                  );
                  //li.find('.entity-name').after(div);
                  li.append(div);
                }
              } else {
                if (!li.hasClass("hidden-entity-links-show")) {
                  li.addClass("hidden-entity-links-show");
                }
              }
            }
          } else {
            if (!game.user?.isGM) {
              //setProperty(document, 'visible', true);
              // TODO why i must do this ?????
              // li.show();
            } else {
              if (game.settings.get(CONSTANTS.MODULE_NAME, "add-css-unhideshow")) {
                if (
                  obj instanceof SceneDirectory ||
                  game.settings.get(CONSTANTS.MODULE_NAME, "no-background-only-symbol")
                ) {
                  if (li.find(".hidden-entity-links-scene-unhideshow").length <= 0) {
                    const div = $(
                      `<div class="hidden-entity-links-scene-unhideshow">
                        <i class="fa fa-fw"/>
                      </div>`
                    );
                    //li.find('.entity-name').after(div);
                    li.append(div);
                  }
                } else {
                  if (!li.hasClass("hidden-entity-links-unhideshow")) {
                    li.addClass("hidden-entity-links-unhideshow");
                  }
                }
              }
            }
          }
        } catch (e) {
          // This is just a patch for a bug during the beta of the beta
          // we can probably remove in the future
        }
      }
    }
  };

  /**
   * For any link in the text which points to a document which is not visible to the current player
   * it will be replaced by the non-link text (so the player will be NOT aware that a link exists)
   * @param {ActorSheet} [sheet] Sheet for renderJournalSheet and renderActorSheet hooks
   * @param {jQuery}     [html]  HTML  for renderJournalSheet and renderActorSheet hooks
   * @param {Object}     [data]  Data for renderJournalSheet and renderActorSheet hooks
   */
  hideRenderedHiddenEntityLinks = function (sheet, html, data) {
    if (!game.settings.get(CONSTANTS.MODULE_NAME, "disguise-unreachable-links")) {
      return;
    }
    // Only check for link visibility if NOT a gm
    if (game.user?.isGM) {
      return;
    }
    // Original link:
    //     <a class="content-link" draggable="true" [ data-type="JournalEntry" | data-pack="packname" ] [ data-id="{id}" ] data-uuid="JournalEntry.{id}>">
    //     <i class="fas fa-th-list">::before</i>
    //     plain text
    //     </a>
    // If the "data-id" isn't observable by the current user, then replace with just "plain text"

    // OLD FOUNDRYVTT 9
    /*
		html.find("a.entity-link")
			.filter((index, a) => {
				// This filter function needs to return true if the link is to be replaced by normal text
				const dataentity = a.getAttribute("data-entity"); // RollTable, JournalEntry, Actor
				if (!dataentity) {
					// Compendium packs are only limited at the PACK level, not an individual document level
					return game.packs.get(a.getAttribute("data-pack"))?.private;
				}
				const entity = HiddenEntityLinkTypeMap[dataentity];
				if (!entity) {
					warn(`checkRenderLinks#EntityMap does not have '${entity}'`);
					return false;
				}
				if (
					game.settings.get(CONSTANTS.MODULE_NAME, "level-permission-disguise-unreachable-links") ===
					HiddenEntityLinkPermissions.EMPTY
				) {
					const item = game[entity].get(a.getAttribute("data-id"));
					return !item || !item.testUserPermission(game.user, "LIMITED");
				} else {
					const reference = game[entity].get(a.getAttribute("data-id"));
					if (reference) {
						// const perm = this._checkPermission(reference, game.user,'level-permission-disguise-unreachable-links');
						// return perm;
						const perm = game.settings.get(
							CONSTANTS.MODULE_NAME,
							"level-permission-disguise-unreachable-links"
						);
						if (perm === HiddenEntityLinkPermissions.EMPTY) {
							return !reference.testUserPermission(game.user, "LIMITED");
						} else if (perm === HiddenEntityLinkPermissions.NONE) {
							return !reference.testUserPermission(game.user, "NONE");
						} else if (perm === HiddenEntityLinkPermissions.LIMITED) {
							return !reference.testUserPermission(game.user, "LIMITED");
						} else if (perm === HiddenEntityLinkPermissions.OBSERVER) {
							return !reference.testUserPermission(game.user, "OBSERVER");
						} else if (perm === HiddenEntityLinkPermissions.OWNER) {
							return !reference.testUserPermission(game.user, "OWNER");
						} else {
							return false;
						}
					} else {
						return true;
					}
				}
			})
			.replaceWith((index, a) => {
				const pos = a.indexOf("</i> ");
				return pos < 0 ? a : a.slice(pos + 5);
			});
        */
    html
      .find("a.content-link")
      .filter((index, a) => {
        // This filter function needs to return true if the link is to be replaced by normal text

        // Firstly, check packs at the compendium level
        const pack = a.getAttribute("data-pack");
        if (pack) {
          return game.packs.get(pack)?.private;
        }
        /*
				const datatype = a.getAttribute("data-type"); // RollTable, JournalEntry, Actor
				if (!datatype) return false;

				const gametype = HiddenEntityLinkTypeMap[datatype];
				if (!gametype) {
					warn(`checkRenderLinks#TypeMap does not have '${datatype}'`);
					return false;
				}
				let id = a.getAttribute("data-id");
				if (!id) {
					id = a.getAttribute("data-uuid").split(".").pop();
				}
				const item = game[gametype].get(id);
				if (
					game.settings.get(CONSTANTS.MODULE_NAME, "level-permission-disguise-unreachable-links") ===
					HiddenEntityLinkPermissions.EMPTY
				) {
					return !item || !item.testUserPermission(game.user, "LIMITED");
				} else {
					if (item) {
						const perm = game.settings.get(
							CONSTANTS.MODULE_NAME,
							"level-permission-disguise-unreachable-links"
						);
						if (perm === HiddenEntityLinkPermissions.EMPTY) {
							return !item.testUserPermission(game.user, "LIMITED");
						} else if (perm === HiddenEntityLinkPermissions.NONE) {
							return !item.testUserPermission(game.user, "NONE");
						} else if (perm === HiddenEntityLinkPermissions.LIMITED) {
							return !item.testUserPermission(game.user, "LIMITED");
						} else if (perm === HiddenEntityLinkPermissions.OBSERVER) {
							return !item.testUserPermission(game.user, "OBSERVER");
						} else if (perm === HiddenEntityLinkPermissions.OWNER) {
							return !item.testUserPermission(game.user, "OWNER");
						} else {
							return false;
						}
					} else {
						return true;
					}
				}
                */
        // Now we can use the uuid to check for general access to the relevant document
        let uuid = a.getAttribute("data-uuid");
        if (!uuid) {
          return false;
        }
        //@ts-ignore
        let doc = fromUuidSync(uuid);
        if (!doc) {
          return false;
        }
        if (
          game.settings.get(CONSTANTS.MODULE_NAME, "level-permission-disguise-unreachable-links") ===
          HiddenEntityLinkPermissions.EMPTY
        ) {
          //@ts-ignore
          return !doc || !doc.testUserPermission(game.user, CONST.DOCUMENT_OWNERSHIP_LEVELS.LIMITED);
        } else {
          if (doc) {
            const perm = game.settings.get(CONSTANTS.MODULE_NAME, "level-permission-disguise-unreachable-links");
            if (perm === HiddenEntityLinkPermissions.EMPTY) {
              //@ts-ignore
              return !doc.testUserPermission(game.user, CONST.DOCUMENT_OWNERSHIP_LEVELS.LIMITED);
            } else if (perm === HiddenEntityLinkPermissions.NONE) {
              //@ts-ignore
              return !doc.testUserPermission(game.user, CONST.DOCUMENT_OWNERSHIP_LEVELS.NONE);
            } else if (perm === HiddenEntityLinkPermissions.LIMITED) {
              //@ts-ignore
              return !doc.testUserPermission(game.user, CONST.DOCUMENT_OWNERSHIP_LEVELS.LIMITED);
            } else if (perm === HiddenEntityLinkPermissions.OBSERVER) {
              //@ts-ignore
              return !doc.testUserPermission(game.user, CONST.DOCUMENT_OWNERSHIP_LEVELS.OBSERVER);
            } else if (perm === HiddenEntityLinkPermissions.OWNER) {
              //@ts-ignore
              return !doc.testUserPermission(game.user, CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER);
            } else {
              return false;
            }
          } else {
            return true;
          }
        }
      })
      .replaceWith((index, a) => {
        const pos = a.indexOf("</i>");
        return pos < 0 ? a : a.slice(pos + 4);
      });
    return;
  };

  // hideEntityLink = async function (entityID, entities) {
  // 	const entity = entities.find((e) => {
  // 		return e && e.id === entityID;
  // 	});
  // 	if (entity) {
  // 		const hasFlagHide = hasProperty(
  // 			entity,
  // 			`flags.${CONSTANTS.MODULE_NAME}.${HiddenEntityLinkFlags.HIDDEN}`
  // 		);
  // 		if (hasFlagHide) {
  // 			await entity.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, true);
  // 		}
  // 	}
  // };

  // unhideEntityLink = async function (entityID, entities) {
  // 	const entity = entities.find((e) => {
  // 		return e && e.id === entityID;
  // 	});
  // 	if (entity) {
  // 		const hasFlagHide = hasProperty(
  // 			entity,
  // 			`flags.${CONSTANTS.MODULE_NAME}.${HiddenEntityLinkFlags.HIDDEN}`
  // 		);
  // 		if (hasFlagHide) {
  // 			await entity.unsetFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
  // 		}
  // 	}
  // };

  // showEntityLink = async function (entityID, entities) {
  // 	const entity = entities.find((e) => {
  // 		return e && e.id === entityID;
  // 	});
  // 	if (entity) {
  // 		const hasFlagHide = hasProperty(
  // 			entity,
  // 			`flags.${CONSTANTS.MODULE_NAME}.${HiddenEntityLinkFlags.HIDDEN}`
  // 		);
  // 		if (hasFlagHide) {
  // 			await entity.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, false);
  // 		}
  // 	}
  // };

  _checkPermission = function (entity, user, setting) {
    return API._checkPermission(entity, user, setting);
  };

  _checkState = function (entity) {
    return API._checkState(entity);
  };

  // userUpdated(user) {
  //   for (let user_div of $('.hidden-entity-links-user')) {
  //     let id = $(user_div).attr('data-user-id');
  //     if (id == user.id) {
  //       $(user_div).css('background-color', user.color);
  //     }
  //   }
  // }

  hiddenTable(wrapped, ...args) {
    if (this.getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN_TABLE)) {
      try {
        args[0].rollMode = "gmroll";
      } catch {
        args.push({ rollMode: "gmroll" });
      }
    }
    return wrapped(...args);
  }
}
