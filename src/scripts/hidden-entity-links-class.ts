import API from "./api";
import CONSTANTS from "./constants";
import {
	HiddenEntityLinkTypeMap,
	HiddenEntityLinkFlags,
	HiddenEntityLinkPermissions,
	HiddenEntityLinkState,
} from "./hidden-entity-link-models";
import { warn } from "./lib/lib";

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
		const listFolder = html.parent().parent().find("li.directory-item.folder");
		for (let liFolder of listFolder) {
			liFolder = $(liFolder);
			const folder = game.folders?.find((folderObject) => {
				return folderObject.id === liFolder.attr("data-folder-id");
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
						//     <i class="fas fa-lightbulb" style="color:darkRed; text-shadow: 0 0 8px darkRed;"/>
						//   </div>`,
						// );
						// li.find('.entity-name').before(div);
						if (
							entityData instanceof Scene ||
							game.settings.get(CONSTANTS.MODULE_NAME, "no-background-only-symbol")
						) {
							if (li.find(".hidden-entity-links-scene").length <= 0) {
								const div = $(
									`<div class="hidden-entity-links-scene">
                    <i class="fas fa-lightbulb"/>
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
						if (
							entityData instanceof Scene ||
							game.settings.get(CONSTANTS.MODULE_NAME, "no-background-only-symbol")
						) {
							if (li.find(".hidden-entity-links-scene-show").length <= 0) {
								const div = $(
									`<div class="hidden-entity-links-scene-show">
                    <i class="fas fa-lightbulb"/>
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
                      <i class="fas fa-lightbulb"/>
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
					// let isHidden = data._id == document.id && data.flags[CONSTANTS.MODULE_NAME]?.hidden
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
							//     <i class="fas fa-lightbulb" style="color:darkRed; text-shadow: 0 0 8px darkRed;"/>
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
                      <i class="fas fa-lightbulb"/>
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
							//     <i class="fas fa-lightbulb" style="color:darkRed; text-shadow: 0 0 8px darkRed;"/>
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
                      <i class="fas fa-lightbulb"/>
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
                        <i class="fas fa-lightbulb"/>
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

	// _EntityMap = {
	//   JournalEntry: 'journal',
	//   Actor: 'actors',
	//   RollTable: 'tables',
	//   Scene: 'scenes',
	//   Item: 'items',
	//   Card: 'cards',
	// };

	// _permissions = {
	//   EMPTY: 0,
	//   NONE: 1,
	//   LIMITED: 2,
	//   OBSERVER: 3,
	//   OWNER: 4,
	//   ONLY_LIMITED: 5,
	//   ONLY_OBSERVER: 6,
	// };

	// _state = {
	//   HIDE: 0,
	//   UNHIDE: 1,
	//   SHOW: 2,
	// };

	/**
	 * For any link in the text which points to a document which is not visible to the current player
	 * it will be replaced by the non-link text (so the player will be NOT aware that a link exists)
	 * @param {ActorSheet} [sheet] Sheet for renderJournalSheet and renderActorSheet hooks
	 * @param {jQuery}     [html]  HTML  for renderJournalSheet and renderActorSheet hooks
	 * @param {Object}     [data]  Data for renderJournalSheet and renderActorSheet hooks
	 */
	hideRenderedHiddenEntityLinks = function (sheet, html, data): void {
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

		html.find("a.content-link")
			.filter((index, a) => {
				// This filter function needs to return true if the link is to be replaced by normal text

				// Firstly, check packs at the compendium level
				const pack = a.getAttribute("data-pack");
				if (pack) {
					return game.packs.get(pack)?.private;
				}
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
			})
			.replaceWith((index, a) => {
				const pos = a.indexOf("</i>");
				return pos < 0 ? a : a.slice(pos + 4);
			});
		return;
	};

	hideEntityLink = async function (entityID, entities) {
		const entity = entities.find((e) => {
			return e && e.id === entityID;
		});
		if (entity) {
			const hasFlagHide = hasProperty(
				entity,
				`flags.${CONSTANTS.MODULE_NAME}.${HiddenEntityLinkFlags.HIDDEN}`
			);
			if (hasFlagHide) {
				await entity.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, true);
			}
		}
	};

	unhideEntityLink = async function (entityID, entities) {
		const entity = entities.find((e) => {
			return e && e.id === entityID;
		});
		if (entity) {
			const hasFlagHide = hasProperty(
				entity,
				`flags.${CONSTANTS.MODULE_NAME}.${HiddenEntityLinkFlags.HIDDEN}`
			);
			if (hasFlagHide) {
				await entity.unsetFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
			}
		}
	};

	showEntityLink = async function (entityID, entities) {
		const entity = entities.find((e) => {
			return e && e.id === entityID;
		});
		if (entity) {
			const hasFlagHide = hasProperty(
				entity,
				`flags.${CONSTANTS.MODULE_NAME}.${HiddenEntityLinkFlags.HIDDEN}`
			);
			if (hasFlagHide) {
				await entity.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, false);
			}
		}
	};

	_checkPermission = function (entity, user: User, setting: string): boolean {
		/*
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
    if (set == HiddenEntityLinkPermissions.EMPTY) {
      result = false;
    } else if (set == HiddenEntityLinkPermissions.NONE) {
      result = !entity.testUserPermission(user, 'LIMITED');
    } else if (set == HiddenEntityLinkPermissions.LIMITED) {
      result = !entity.testUserPermission(user, 'OBSERVER');
    } else if (set == HiddenEntityLinkPermissions.OBSERVER) {
      result = !entity.testUserPermission(user, 'OWNER');
    } else if (set == HiddenEntityLinkPermissions.OWNER) {
      result = true;
    } else if (set == HiddenEntityLinkPermissions.ONLY_LIMITED) {
      result =
        !entity.testUserPermission(user, 'NONE', { exact: true }) &&
        entity.testUserPermission(user, 'LIMITED', { exact: true }) &&
        !entity.testUserPermission(user, 'OBSERVER', { exact: true }) &&
        !entity.testUserPermission(user, 'OWNER', { exact: true });
    } else if (set == HiddenEntityLinkPermissions.ONLY_OBSERVER) {
      result =
        !entity.testUserPermission(user, 'NONE', { exact: true }) &&
        !entity.testUserPermission(user, 'LIMITED', { exact: true }) &&
        entity.testUserPermission(user, 'OBSERVER', { exact: true }) &&
        !entity.testUserPermission(user, 'OWNER', { exact: true });
    }

    return result;
    */
		return API._checkPermission(entity, user, setting);
	};

	_checkState = function (entity): number {
		/*
    const hasFlagHide =
      hasProperty(entity, `flags.${CONSTANTS.MODULE_NAME}.${HiddenEntityLinkFlags.HIDDEN}`) &&
      entity.getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN) != null &&
      entity.getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN) != undefined;
    if (hasFlagHide) {
      if (entity.getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN)) {
        return HiddenEntityLinkState.HIDE;
      } else {
        return HiddenEntityLinkState.SHOW;
      }
    } else {
      return HiddenEntityLinkState.UNHIDE;
    }
    */
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
		if ((<RollTable>(<unknown>this)).getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN_TABLE)) {
			try {
				args[0].rollMode = "gmroll";
			} catch {
				args.push({ rollMode: "gmroll" });
			}
		}
		return wrapped(...args);
	}
}
