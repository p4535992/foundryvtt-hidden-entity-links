import API from "./scripts/api.js";
import CONSTANTS from "./scripts/constants.js";
import {
  HiddenEntityLinkFlags,
  HiddenEntityLinkPermissions,
  HiddenEntityLinkState,
} from "./scripts/hidden-entity-link-models.js";
import { HiddenEntityLinks } from "./scripts/hidden-entity-links-class.js";
import { dialogWarning, error, log, resetNavbar } from "./scripts/lib/lib.js";
import { registerSettings } from "./scripts/settings.js";
import { debug } from "./scripts/lib/lib.js";
import { hiddenEntityLinkSocket, registerSocket } from "./scripts/socket.js";

/* ------------------------------------ */
/* Initialize module					*/
/* ------------------------------------ */
Hooks.once("init", function () {
  // debug(" init " + CONSTANTS.MODULE_NAME);
  // Register custom module settings
  registerSettings();
  // Register custom sheets (if any)
  initHooks();
});
/* ------------------------------------ */
/* Setup module							*/
/* ------------------------------------ */
Hooks.once("setup", function () {
  setupHooks();
});
/* ------------------------------------ */
/* When ready							*/
/* ------------------------------------ */
Hooks.once("ready", function () {
  if (!game.modules.get("lib-wrapper")?.active && game.user?.isGM) {
    let word = "install and activate";
    if (game.modules.get("lib-wrapper")) word = "activate";
    throw error(`Requires the 'libWrapper' module. Please ${word} it.`);
  }
  if (!game.modules.get("socketlib")?.active && game.user?.isGM) {
    let word = "install and activate";
    if (game.modules.get("socketlib")) word = "activate";
    throw error(`Requires the 'socketlib' module. Please ${word} it.`);
  }
  if (game.modules.get("disguise-unreachable-links")?.active && game.user?.isGM) {
    dialogWarning(
      `With 'disguise-unreachable-links' module enabled and active. There is a Redundancy of features you can disable 'Disguise Unreachable Links' module if you want.`
    );
  }
  if (game.modules.get("hidden-tables")?.active && game.user?.isGM) {
    dialogWarning(
      `With 'hidden-tables' module enabled and active. There is a Redundancy of features you can disable 'Hidden Tables' module if you want.`
    );
  }
  if (game.modules.get("hiddensoundtracks")?.active && game.user?.isGM) {
    dialogWarning(
      `With 'hiddensoundtracks' module enabled and active. There is a Redundancy of features you can disable 'Hidden Soundtracks' module if you want.`
    );
  }

  if (game.modules.get("navbar-tweaks")?.active && game.user?.isGM) {
    dialogWarning(
      `With 'navbar-tweaks' module enabled and active. There is a Redundancy of features you can disable 'Navbar Tweaks' module if you want.`
    );
  }

  if (game.modules.get("navigation-name")?.active && game.user?.isGM) {
    dialogWarning(
      `With 'navigation-name' module enabled and active. There is a Redundancy of features you can disable 'Navigation Name' module if you want.`
    );
  }
  if (game.modules.get("hide-sidebars")?.active && game.user?.isGM) {
    dialogWarning(
      `With 'hide-sidebars' module enabled and active. There is a Redundancy of features you can disable 'Hide Sidebar Tabs' module if you want.`
    );
  }
  // if (game.modules.get('compendium-permissions')?.active && game.user?.isGM) {
  //   dialogWarning(
  //     `With 'compendium-permissions' module enabled and active. There is a Redundancy of features you can disable 'Compendium Permissions' module if you want.`,
  //   );
  // }
  // Do anything once the module is ready
  readyHooks();
});

/* ------------------------------------ */
/* Other Hooks							*/
/* ------------------------------------ */

/**
 * Initialization helper, to set API.
 * @param api to set to game module.
 */
export function setApi(api) {
  const data = game.modules.get(CONSTANTS.MODULE_NAME);
  data.api = api;
}

/**
 * Returns the set API.
 * @returns Api from games module.
 */
export function getApi() {
  const data = game.modules.get(CONSTANTS.MODULE_NAME);
  return data.api;
}

/**
 * Initialization helper, to set Socket.
 * @param socket to set to game module.
 */
export function setSocket(socket) {
  const data = game.modules.get(CONSTANTS.MODULE_NAME);
  data.socket = socket;
}

/*
 * Returns the set socket.
 * @returns Socket from games module.
 */
export function getSocket() {
  const data = game.modules.get(CONSTANTS.MODULE_NAME);
  return data.socket;
}

// ==================
// IMPLEMENTATION
// ==================

export const initHooks = () => {
  Hooks.once("socketlib.ready", registerSocket);
  // TODO not enter on socketlib.ready
  registerSocket();
  // Caso particolare si setta su inti e non su setup
  API.hiddenEntityLinks = new HiddenEntityLinks();
  setApi(API);

  libWrapper.register(CONSTANTS.MODULE_NAME, "RollTable.prototype.draw", API.hiddenEntityLinks.hiddenTable, "WRAPPER");
};

export const setupHooks = () => {
  // Settings.registerSettings();

  Hooks.on("renderRollTableConfig", (config, html, css) => {
    const isHidden = config.object.getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN_TABLE);
    const lastBox = html.find(".results");
    const checkboxHTML = `
    <div class="form-group">
        <label>${game.i18n.format("hidden-entity-links.label.tableTextHiddenTable")}</label>
        <input type="checkbox" name="flags.${CONSTANTS.MODULE_NAME}.${HiddenEntityLinkFlags.HIDDEN_TABLE}" ${
      isHidden ? "checked" : ""
    }>
    </div>
    `;
    lastBox.before(checkboxHTML);
  });

  Hooks.on("renderJournalDirectory", (obj, html, data) => {
    if (game.settings.get(CONSTANTS.MODULE_NAME, "hide-journals")) {
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
  Hooks.on("renderSceneDirectory", (obj, html, data) => {
    if (game.settings.get(CONSTANTS.MODULE_NAME, "hide-scenes")) {
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
  Hooks.on("renderActorDirectory", (obj, html, data) => {
    if (game.settings.get(CONSTANTS.MODULE_NAME, "hide-actors")) {
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
  Hooks.on("renderItemDirectory", (obj, html, data) => {
    if (game.settings.get(CONSTANTS.MODULE_NAME, "hide-items")) {
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
  // Hooks.on("renderMacroDirectory", directoryRenderedHiddenEntityLinks);
  Hooks.on("renderRollTableDirectory", (obj, html, data) => {
    if (game.settings.get(CONSTANTS.MODULE_NAME, "hide-rolltables")) {
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

  Hooks.on("renderCardsDirectory", (obj, html, data) => {
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

  if (game.settings.get(CONSTANTS.MODULE_NAME, "hide-journals")) {
    libWrapper.register(
      CONSTANTS.MODULE_NAME,
      "JournalEntry.prototype.visible",
      function (wrapped, ...args) {
        if (game.user?.isGM) {
          return true;
        }
        if (!game.user?.isGM && API._checkState(this) === HiddenEntityLinkState.HIDE) {
          return false;
        }
        if (!game.user?.isGM && API._checkState(this) === HiddenEntityLinkState.SHOW) {
          return true;
        }
        if (API.hiddenEntityLinks._checkPermission(this, game.user, "level-permission-journals")) {
          return false;
        }
        return true;
      },
      "OVERRIDE"
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

    /* RIMOSSO FVTT110
		//  /**
		//  * Guess the default view mode for the sheet based on the player's permissions to the Entry
		//  * @return {string}
		//  * @private
		//  */
    //   _inferDefaultMode() {
    // 	const hasImage = !!this.object.data.img;
    // 	const hasText = this.object.data.content;

    // 	// If the user only has limited permission, show an image or nothing
    // 	if ( this.object.limited ) return hasImage ? "image" : null;

    // 	// Otherwise prefer text if it exists
    // 	return hasText || !hasImage ? "text" : "image";
    //   }
    /*
		
		libWrapper.register(
			CONSTANTS.MODULE_NAME,
			"JournalSheet.prototype._inferDefaultMode",
			function (wrapped, ...args) {
				if (game.user?.isGM) {
					return wrapped(...args);
				}
				if (this.object.getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN)) {
					if (this.object.limited && this.object.data.content) {
						return "text";
					}
					if (this.object.limited && this.object.data.img) {
						// Removed limited we use a flag now
						return "image";
					}
				}
				return wrapped(...args);
			},
			"MIXED"
		);
		*/

    Hooks.on("getJournalDirectoryEntryContext", (html, options) => {
      if (game.settings.get(CONSTANTS.MODULE_NAME, "disable-voices")) {
        return options;
      }
      options.push(
        //return [
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.hide-entity`),
          icon: '<i class="far fa-lightbulb"></i>',
          condition: (li) => {
            const journal = game.journal?.get(li.data("documentId"));
            if (
              game.user?.isGM &&
              (API._checkState(journal) === HiddenEntityLinkState.UNHIDE ||
                API._checkState(journal) === HiddenEntityLinkState.SHOW)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const journal = game.journal?.get(li.data("documentId"));
            await journal.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, true);

            hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Journal.documentName);
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.unhide-entity`),
          icon: '<i class="fas fa-low-vision"></i>',
          condition: (li) => {
            const journal = game.journal?.get(li.data("documentId"));
            if (
              game.user?.isGM &&
              (API._checkState(journal) === HiddenEntityLinkState.HIDE ||
                API._checkState(journal) === HiddenEntityLinkState.SHOW)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const journal = game.journal?.get(li.data("documentId"));
            await journal.unsetFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);

            hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Journal.documentName);
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.show-entity`),
          icon: '<i class="fas fa-lightbulb"></i>',
          condition: (li) => {
            const journal = game.journal?.get(li.data("documentId"));
            if (
              game.user?.isGM &&
              (API._checkState(journal) === HiddenEntityLinkState.HIDE ||
                API._checkState(journal) === HiddenEntityLinkState.UNHIDE)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const journal = game.journal?.get(li.data("documentId"));
            await journal.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, false);

            hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Journal.documentName);
          },
        }
      ); //].concat(options);
      // },
      // 'MIXED',
    });

    Hooks.on("getJournalDirectoryFolderContext", (html, options) => {
      if (game.settings.get(CONSTANTS.MODULE_NAME, "disable-voices")) {
        return options;
      }
      options.push(
        //return [
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.hide-folder-only`),
          icon: '<i class="fas fa-folder-minus"></i>',
          condition: (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            const isHiddenByFlag = folderObject.getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
            if (game.user?.isGM && !isHiddenByFlag) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            await folderObject.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, true);

            hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Journal.documentName);
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.unhide-folder-only`),
          icon: '<i class="fas fa-folder-plus"></i>',
          condition: (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            const isHiddenByFlag = folderObject.getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
            if (game.user?.isGM && isHiddenByFlag) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            await folderObject.unsetFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);

            hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Journal.documentName);
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.hide-folder`),
          icon: '<i class="far fa-lightbulb"></i>',
          condition: (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.journal
              ?.filter((journal) => journal.folder?.id === folderObject.id)
              .map(async (journal) => {
                await journal.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, true);
                // TODO why i need this ?
                await hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Journal.documentName);
              });
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.unhide-folder`),
          icon: '<i class="fas fa-low-vision"></i>',
          condition: (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.journal
              ?.filter((journal) => journal.folder?.id === folderObject.id)
              .map(async (journal) => {
                await journal.unsetFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
                // TODO why i need this ?
                await hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Journal.documentName);
              });
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.show-folder`),
          icon: '<i class="fas fa-lightbulb"></i>',
          condition: (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.journal
              ?.filter((journal) => journal.folder?.id === folderObject.id)
              .map(async (journal) => {
                await journal.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, false);
                // TODO why i need this ?
                await hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Journal.documentName);
              });
          },
        }
      ); //].concat(options);
      // },
      // 'MIXED',
    });
  }

  // =======================
  // Items
  // =======================

  if (game.settings.get(CONSTANTS.MODULE_NAME, "hide-items")) {
    libWrapper.register(
      CONSTANTS.MODULE_NAME,
      "Item.prototype.visible",
      function (wrapped, ...args) {
        if (game.user?.isGM) {
          return true;
        }
        if (!game.user?.isGM && API._checkState(this) === HiddenEntityLinkState.HIDE) {
          return false;
        }
        if (!game.user?.isGM && API._checkState(this) === HiddenEntityLinkState.SHOW) {
          return true;
        }
        if (API.hiddenEntityLinks._checkPermission(this, game.user, "level-permission-items")) {
          return false;
        }
        return true;
      },
      "OVERRIDE"
    );

    Hooks.on("getItemDirectoryEntryContext", (html, options) => {
      if (game.settings.get(CONSTANTS.MODULE_NAME, "disable-voices")) {
        return options;
      }
      options.push(
        //return [
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.hide-entity`),
          icon: '<i class="far fa-lightbulb"></i>',
          condition: (li) => {
            const item = game.items?.get(li.data("documentId"));
            if (
              game.user?.isGM &&
              (API._checkState(item) === HiddenEntityLinkState.UNHIDE ||
                API._checkState(item) === HiddenEntityLinkState.SHOW)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const item = game.items?.get(li.data("documentId"));
            await item.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, true);

            hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Item.documentName);
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.unhide-entity`),
          icon: '<i class="fas fa-low-vision"></i>',
          condition: (li) => {
            const item = game.items?.get(li.data("documentId"));
            if (
              game.user?.isGM &&
              (API._checkState(item) === HiddenEntityLinkState.HIDE ||
                API._checkState(item) === HiddenEntityLinkState.SHOW)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const item = game.items?.get(li.data("documentId"));
            await item.unsetFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);

            hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Item.documentName);
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.show-entity`),
          icon: '<i class="fas fa-lightbulb"></i>',
          condition: (li) => {
            const item = game.items?.get(li.data("documentId"));
            if (
              game.user?.isGM &&
              (API._checkState(item) === HiddenEntityLinkState.HIDE ||
                API._checkState(item) === HiddenEntityLinkState.UNHIDE)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const item = game.items?.get(li.data("documentId"));

            hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Item.documentName);
          },
        }
      ); //].concat(options);
      // },
      // 'MIXED',
    });

    Hooks.on("getItemDirectoryFolderContext", (html, options) => {
      if (game.settings.get(CONSTANTS.MODULE_NAME, "disable-voices")) {
        return options;
      }
      options.push(
        // return [
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.hide-folder-only`),
          icon: '<i class="fas fa-folder-minus"></i>',
          condition: (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            const isHiddenByFlag = folderObject.getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
            if (game.user?.isGM && !isHiddenByFlag) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            await folderObject.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, true);

            hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Item.documentName);
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.unhide-folder-only`),
          icon: '<i class="fas fa-folder-plus"></i>',
          condition: (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            const isHiddenByFlag = folderObject.getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
            if (game.user?.isGM && isHiddenByFlag) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            await folderObject.unsetFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);

            hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Item.documentName);
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.hide-folder`),
          icon: '<i class="far fa-lightbulb"></i>',
          condition: (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.items
              ?.filter((item) => item.folder?.id === folderObject.id)
              .map(async (item) => {
                await item.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, true);
                // TODO why i need this ?
                await hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Item.documentName);
              });
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.unhide-folder`),
          icon: '<i class="fas fa-low-vision"></i>',
          condition: (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.items
              ?.filter((item) => item.folder?.id === folderObject.id)
              .map(async (item) => {
                await item.unsetFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
                // TODO why i need this ?
                await hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Item.documentName);
              });
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.show-folder`),
          icon: '<i class="fas fa-lightbulb"></i>',
          condition: (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.items
              ?.filter((item) => item.folder?.id === folderObject.id)
              .map(async (item) => {
                await item.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, false);
                // TODO why i need this ?
                await hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Item.documentName);
              });
          },
        }
      ); //].concat(options);
      // },
      // 'MIXED',
    });
  }

  // =======================
  // Actors
  // =======================

  if (game.settings.get(CONSTANTS.MODULE_NAME, "hide-actors")) {
    libWrapper.register(
      CONSTANTS.MODULE_NAME,
      "Actor.prototype.visible",
      function (wrapped, ...args) {
        if (game.user?.isGM) {
          return true;
        }
        if (!game.user?.isGM && API._checkState(this) === HiddenEntityLinkState.HIDE) {
          return false;
        }
        if (!game.user?.isGM && API._checkState(this) === HiddenEntityLinkState.SHOW) {
          return true;
        }
        if (API.hiddenEntityLinks._checkPermission(this, game.user, "level-permission-actors")) {
          return false;
        }
        return true;
      },
      "OVERRIDE"
    );

    Hooks.on("getActorDirectoryEntryContext", (html, options) => {
      if (game.settings.get(CONSTANTS.MODULE_NAME, "disable-voices")) {
        return options;
      }
      options.push(
        //return [
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.hide-entity`),
          icon: '<i class="far fa-lightbulb"></i>',
          condition: (li) => {
            const actor = game.actors?.get(li.data("documentId"));
            if (
              game.user?.isGM &&
              (API._checkState(actor) === HiddenEntityLinkState.UNHIDE ||
                API._checkState(actor) === HiddenEntityLinkState.SHOW)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const actor = game.actors?.get(li.data("documentId"));
            await actor.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, true);

            hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Actor.documentName);
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.unhide-entity`),
          icon: '<i class="fas fa-low-vision"></i>',
          condition: (li) => {
            const actor = game.actors?.get(li.data("documentId"));
            if (
              game.user?.isGM &&
              (API._checkState(actor) === HiddenEntityLinkState.HIDE ||
                API._checkState(actor) === HiddenEntityLinkState.SHOW)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const actor = game.actors?.get(li.data("documentId"));
            await actor.unsetFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);

            hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Actor.documentName);
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.show-entity`),
          icon: '<i class="fas fa-lightbulb"></i>',
          condition: (li) => {
            const actor = game.actors?.get(li.data("documentId"));
            if (
              game.user?.isGM &&
              (API._checkState(actor) === HiddenEntityLinkState.HIDE ||
                API._checkState(actor) === HiddenEntityLinkState.UNHIDE)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const actor = game.actors?.get(li.data("documentId"));
            await actor.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, false);

            hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Actor.documentName);
          },
        }
      ); // ].concat(options);
      // },
      // 'MIXED',
    });

    Hooks.on("getActorDirectoryFolderContext", (html, options) => {
      if (game.settings.get(CONSTANTS.MODULE_NAME, "disable-voices")) {
        return options;
      }
      options.push(
        //return [
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.hide-folder-only`),
          icon: '<i class="fas fa-folder-minus"></i>',
          condition: (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            const isHiddenByFlag = folderObject.getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
            if (game.user?.isGM && !isHiddenByFlag) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            await folderObject.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, true);

            hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Actor.documentName);
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.unhide-folder-only`),
          icon: '<i class="fas fa-folder-plus"></i>',
          condition: (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            const isHiddenByFlag = folderObject.getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
            if (game.user?.isGM && isHiddenByFlag) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            await folderObject.unsetFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);

            hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Actor.documentName);
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.hide-folder`),
          icon: '<i class="far fa-lightbulb"></i>',
          condition: (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.actors
              ?.filter((actor) => actor.folder?.id === folderObject.id)
              .map(async (actor) => {
                await actor.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, true);
                // TODO why i need this ?
                await hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Actor.documentName);
              });
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.unhide-folder`),
          icon: '<i class="fas fa-low-vision"></i>',
          condition: (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.actors
              ?.filter((actor) => actor.folder?.id === folderObject.id)
              .map(async (actor) => {
                await actor.unsetFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
                // TODO why i need this ?
                await hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Actor.documentName);
              });
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.show-folder`),
          icon: '<i class="fas fa-lightbulb"></i>',
          condition: (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.actors
              ?.filter((actor) => actor.folder?.id === folderObject.id)
              .map(async (actor) => {
                await actor.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, false);
                // TODO why i need this ?
                await hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Actor.documentName);
              });
          },
        }
      ); // ].concat(options);
      // },
      // 'MIXED',
    });
  }

  // =======================
  // Rolltable
  // =======================

  if (game.settings.get(CONSTANTS.MODULE_NAME, "hide-rolltables")) {
    libWrapper.register(
      CONSTANTS.MODULE_NAME,
      "RollTable.prototype.visible",
      function (wrapped, ...args) {
        if (game.user?.isGM) {
          return true;
        }
        if (!game.user?.isGM && API._checkState(this) === HiddenEntityLinkState.HIDE) {
          return false;
        }
        if (!game.user?.isGM && API._checkState(this) === HiddenEntityLinkState.SHOW) {
          return true;
        }
        if (API.hiddenEntityLinks._checkPermission(this, game.user, "level-permission-rolltables")) {
          return false;
        }
        return true;
      },
      "OVERRIDE"
    );

    libWrapper.register(
      CONSTANTS.MODULE_NAME,
      "RollTableConfig.defaultOptions",
      function (wrapped, ...args) {
        return foundry.utils.mergeObject(wrapped(...args), {
          viewPermission: CONST.DOCUMENT_PERMISSION_LEVELS.LIMITED,
        });
      },
      "WRAPPER"
    );

    Hooks.on("getRollTableDirectoryEntryContext", (html, options) => {
      if (game.settings.get(CONSTANTS.MODULE_NAME, "disable-voices")) {
        return options;
      }
      options.push(
        //return [
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.hide-entity`),
          icon: '<i class="far fa-lightbulb"></i>',
          condition: (li) => {
            const rolltable = game.tables?.get(li.data("documentId"));
            if (
              game.user?.isGM &&
              (API._checkState(rolltable) === HiddenEntityLinkState.UNHIDE ||
                API._checkState(rolltable) === HiddenEntityLinkState.SHOW)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const rolltable = game.tables?.get(li.data("documentId"));
            await rolltable.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, true);

            hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", RollTable.documentName);
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.unhide-entity`),
          icon: '<i class="fas fa-low-vision"></i>',
          condition: (li) => {
            const rolltable = game.tables?.get(li.data("documentId"));
            if (
              game.user?.isGM &&
              (API._checkState(rolltable) === HiddenEntityLinkState.HIDE ||
                API._checkState(rolltable) === HiddenEntityLinkState.SHOW)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const rolltable = game.tables?.get(li.data("documentId"));
            await rolltable.unsetFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);

            hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", RollTable.documentName);
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.show-entity`),
          icon: '<i class="fas fa-lightbulb"></i>',
          condition: (li) => {
            const rolltable = game.tables?.get(li.data("documentId"));
            if (
              game.user?.isGM &&
              (API._checkState(rolltable) === HiddenEntityLinkState.HIDE ||
                API._checkState(rolltable) === HiddenEntityLinkState.UNHIDE)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const rolltable = game.tables?.get(li.data("documentId"));
            await rolltable.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, false);

            hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", RollTable.documentName);
          },
        }
      ); //].concat(options);
      // },
      // 'MIXED',
    });

    Hooks.on("getRollTableDirectoryFolderContext", (html, options) => {
      if (game.settings.get(CONSTANTS.MODULE_NAME, "disable-voices")) {
        return options;
      }
      options.push(
        //return [
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.hide-folder-only`),
          icon: '<i class="fas fa-folder-minus"></i>',
          condition: (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            const isHiddenByFlag = folderObject.getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
            if (game.user?.isGM && !isHiddenByFlag) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            await folderObject.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, true);

            hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", RollTable.documentName);
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.unhide-folder-only`),
          icon: '<i class="fas fa-folder-plus"></i>',
          condition: (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            const isHiddenByFlag = folderObject.getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
            if (game.user?.isGM && isHiddenByFlag) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            await folderObject.unsetFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);

            hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", RollTable.documentName);
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.hide-folder`),
          icon: '<i class="far fa-lightbulb"></i>',
          condition: (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.tables
              ?.filter((rolltable) => rolltable.folder?.id === folderObject.id)
              .map(async (rolltable) => {
                await rolltable.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, true);
                // TODO why i nedd this ??
                await hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", RollTable.documentName);
              });
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.unhide-folder`),
          icon: '<i class="fas fa-low-vision"></i>',
          condition: (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.tables
              ?.filter((rolltable) => rolltable.folder?.id === folderObject.id)
              .map(async (rolltable) => {
                await rolltable.unsetFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
                +(
                  // TODO why i need this ?
                  (await hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", RollTable.documentName))
                );
              });
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.show-folder`),
          icon: '<i class="fas fa-lightbulb"></i>',
          condition: (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.tables
              ?.filter((rolltable) => rolltable.folder?.id === folderObject.id)
              .map(async (rolltable) => {
                await rolltable.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, false);
                // TODO why i need this ?
                await hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", RollTable.documentName);
              });
          },
        }
      ); //].concat(options);
      // },
      // 'MIXED',
    });
  }

  // =======================
  // Scene
  // =======================

  if (game.settings.get(CONSTANTS.MODULE_NAME, "hide-scenes")) {
    libWrapper.register(
      CONSTANTS.MODULE_NAME,
      "Scene.prototype.visible",
      function (wrapped, ...args) {
        if (game.user?.isGM) {
          return true;
        }
        if (!game.user?.isGM && API._checkState(this) === HiddenEntityLinkState.HIDE) {
          return false;
        }
        if (!game.user?.isGM && API._checkState(this) === HiddenEntityLinkState.SHOW) {
          return true;
        }
        // if (API.hiddenEntityLinks._checkPermission(this, game.user, 'level-permission-scenes')) {
        //   return false;
        // }
        return true;
      },
      "OVERRIDE"
    );

    Hooks.on("getSceneDirectoryEntryContext", (html, options) => {
      if (game.settings.get(CONSTANTS.MODULE_NAME, "disable-voices")) {
        return options;
      }
      options.push(
        //return [
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.hide-entity`),
          icon: '<i class="far fa-lightbulb"></i>',
          condition: (li) => {
            const scene = game.scenes?.get(li.data("documentId"));
            if (
              game.user?.isGM &&
              (API._checkState(scene) === HiddenEntityLinkState.UNHIDE ||
                API._checkState(scene) === HiddenEntityLinkState.SHOW)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const scene = game.scenes?.get(li.data("documentId"));
            await scene.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, true);

            hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Scene.documentName);
            if (game.settings.get(CONSTANTS.MODULE_NAME, "hide-scenes-nav")) {
              const updates = [
                {
                  _id: scene.id,
                  navigation: false,
                  // permission: {
                  //   default: 0,
                  // },
                  ownership: {
                    default: 0,
                  },
                },
              ];
              return await Scene.updateDocuments(updates);
            } else {
              return;
            }
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.unhide-entity`),
          icon: '<i class="fas fa-low-vision"></i>',
          condition: (li) => {
            const scene = game.scenes?.get(li.data("documentId"));
            if (
              game.user?.isGM &&
              (API._checkState(scene) === HiddenEntityLinkState.HIDE ||
                API._checkState(scene) === HiddenEntityLinkState.SHOW)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const scene = game.scenes?.get(li.data("documentId"));
            await scene.unsetFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);

            hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Scene.documentName);
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.show-entity`),
          icon: '<i class="fas fa-lightbulb"></i>',
          condition: (li) => {
            const scene = game.scenes?.get(li.data("documentId"));
            if (
              game.user?.isGM &&
              (API._checkState(scene) === HiddenEntityLinkState.HIDE ||
                API._checkState(scene) === HiddenEntityLinkState.UNHIDE)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const scene = game.scenes?.get(li.data("documentId"));
            await scene.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, false);

            hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Scene.documentName);
            if (game.settings.get(CONSTANTS.MODULE_NAME, "hide-scenes-nav")) {
              const updates = [
                {
                  _id: scene.id,
                  navigation: true,
                },
              ];
              return Scene.updateDocuments(updates);
            } else {
              return;
            }
          },
        }
      ); //].concat(options);
      // },
      // 'MIXED',
    });

    Hooks.on("getSceneDirectoryFolderContext", (html, options) => {
      if (game.settings.get(CONSTANTS.MODULE_NAME, "disable-voices")) {
        return options;
      }
      options.push(
        //return [
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.hide-folder-only`),
          icon: '<i class="fas fa-folder-minus"></i>',
          condition: (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            const isHiddenByFlag = folderObject.getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
            if (game.user?.isGM && !isHiddenByFlag) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            await folderObject.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, true);

            hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Scene.documentName);
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.unhide-folder-only`),
          icon: '<i class="fas fa-folder-plus"></i>',
          condition: (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            const isHiddenByFlag = folderObject.getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
            if (game.user?.isGM && isHiddenByFlag) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            await folderObject.unsetFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);

            hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Scene.documentName);
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.hide-folder`),
          icon: '<i class="far fa-lightbulb"></i>',
          condition: (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.scenes
              ?.filter((scene) => scene.folder?.id === folderObject.id)
              .map(async (scene) => {
                await scene.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, true);
                // TODO why i need this ?
                await hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Scene.documentName);
              });

            if (game.settings.get(CONSTANTS.MODULE_NAME, "hide-scenes-nav")) {
              const updates = game.scenes
                ?.filter((scene) => scene.folder?.id === folderObject.id)
                .map((scene) => ({
                  _id: scene.id,
                  navigation:
                    !scene.getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN) && scene.navigation
                      ? false
                      : scene.navigation,
                  ownership: {
                    default:
                      !scene.getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN) && scene.navigation
                        ? 0
                        : scene.data.ownership.default,
                  },
                }));
              return Scene.updateDocuments(updates);
            } else {
              return;
            }
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.unhide-folder`),
          icon: '<i class="fas fa-low-vision"></i>',
          condition: (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.scenes
              ?.filter((scene) => scene.folder?.id === folderObject.id)
              .map(async (scene) => {
                await scene.unsetFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
                // TODO why i need this ?
                await hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Scene.documentName);
              });
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.show-folder`),
          icon: '<i class="fas fa-lightbulb"></i>',
          condition: (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.scenes
              ?.filter((scene) => scene.folder?.id === folderObject.id)
              .map(async (scene) => {
                await scene.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, false);
                // TODO why i need this ?
                await hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Scene.documentName);
              });

            if (game.settings.get(CONSTANTS.MODULE_NAME, "hide-scenes-nav")) {
              const updates = game.scenes
                ?.filter((scene) => scene.folder?.id === folderObject.id)
                .map((scene) => ({
                  _id: scene.id,
                  navigation:
                    scene.getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN) && !scene.navigation
                      ? true
                      : scene.navigation,
                }));
              return Scene.updateDocuments(updates);
            } else {
              return;
            }
          },
        }
      ); //].concat(options);
      // },
      // 'MIXED',
    });
  }

  // ===========
  // CARDS
  // ===========

  if (game.settings.get(CONSTANTS.MODULE_NAME, "hide-cards")) {
    libWrapper.register(
      CONSTANTS.MODULE_NAME,
      "Card.prototype.visible",
      function (wrapped, ...args) {
        if (game.user?.isGM) {
          return true;
        }
        if (!game.user?.isGM && API._checkState(this) === HiddenEntityLinkState.HIDE) {
          return false;
        }
        if (!game.user?.isGM && API._checkState(this) === HiddenEntityLinkState.SHOW) {
          return true;
        }
        if (API.hiddenEntityLinks._checkPermission(this, game.user, "level-permission-cards")) {
          return false;
        }
        return true;
      },
      "OVERRIDE"
    );

    Hooks.on("getCardsDirectoryEntryContext", (html, options) => {
      if (game.settings.get(CONSTANTS.MODULE_NAME, "disable-voices")) {
        return options;
      }
      options.push(
        //return [
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.hide-entity`),
          icon: '<i class="far fa-lightbulb"></i>',
          condition: (li) => {
            const card = game.cards?.get(li.data("documentId"));
            if (
              game.user?.isGM &&
              (API._checkState(card) === HiddenEntityLinkState.UNHIDE ||
                API._checkState(card) === HiddenEntityLinkState.SHOW)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const card = game.cards?.get(li.data("documentId"));
            await card.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, true);

            hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Card.documentName);
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.unhide-entity`),
          icon: '<i class="fas fa-low-vision"></i>',
          condition: (li) => {
            const card = game.cards?.get(li.data("documentId"));
            if (
              game.user?.isGM &&
              (API._checkState(card) === HiddenEntityLinkState.HIDE ||
                API._checkState(card) === HiddenEntityLinkState.SHOW)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const card = game.cards?.get(li.data("documentId"));
            await card.unsetFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);

            hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Card.documentName);
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.show-entity`),
          icon: '<i class="fas fa-lightbulb"></i>',
          condition: (li) => {
            const card = game.cards?.get(li.data("documentId"));
            if (
              game.user?.isGM &&
              (API._checkState(card) === HiddenEntityLinkState.HIDE ||
                API._checkState(card) === HiddenEntityLinkState.UNHIDE)
            ) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (li) => {
            const card = game.cards?.get(li.data("documentId"));
            await card.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, false);

            hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Card.documentName);
          },
        }
      );
    });

    Hooks.on("getCardsDirectoryFolderContext", (html, options) => {
      if (game.settings.get(CONSTANTS.MODULE_NAME, "disable-voices")) {
        return options;
      }
      options.push(
        // return [
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.hide-folder-only`),
          icon: '<i class="fas fa-folder-minus"></i>',
          condition: (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            const isHiddenByFlag = folderObject.getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
            if (game.user?.isGM && !isHiddenByFlag) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            await folderObject.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, true);

            hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Card.documentName);
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.unhide-folder-only`),
          icon: '<i class="fas fa-folder-plus"></i>',
          condition: (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            const isHiddenByFlag = folderObject.getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
            if (game.user?.isGM && isHiddenByFlag) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            await folderObject.unsetFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);

            hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Card.documentName);
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.hide-folder`),
          icon: '<i class="far fa-lightbulb"></i>',
          condition: (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.cards
              ?.filter((card) => card.folder?.id === folderObject.id)
              .map(async (card) => {
                await card.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, true);
                // TODO why i need this ?
                await hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Card.documentName);
              });
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.unhide-folder`),
          icon: '<i class="fas fa-low-vision"></i>',
          condition: (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.cards
              ?.filter((card) => card.folder?.id === folderObject.id)
              .map(async (card) => {
                await card.unsetFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN);
                // TODO why i need this ?
                await hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Card.documentName);
              });
          },
        },
        {
          name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.label.show-folder`),
          icon: '<i class="fas fa-lightbulb"></i>',
          condition: (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            if (game.user?.isGM) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data("folderId");
            const folderObject = game.folders?.get(folderId) || game.folders?.getName(folderId);
            const updates = game.cards
              ?.filter((card) => card.folder?.id === folderObject.id)
              .map(async (card) => {
                await card.setFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN, false);
                // TODO why i need this ?
                await hiddenEntityLinkSocket.executeForEveryone("renderSpecificSidebar", Card.documentName);
              });
          },
        }
      );
    });
  }
};

export const readyHooks = () => {
  // Players List configurations
  libWrapper.register(
    CONSTANTS.MODULE_NAME,
    "UserConfig.prototype.getData",
    function (wrapped, ...args) {
      const controlled = game.users?.reduce((arr, u) => {
        if (u.character) {
          arr.push(u.character);
        }
        return arr;
      }, []);

      let newActors = [];

      const specificFolder = game.settings.get(CONSTANTS.MODULE_NAME, "specificFolderActorsOnPlayerList");
      let specificFolderObj = undefined;
      if (specificFolder != 0) {
        specificFolderObj =
          game.actors.directory.folders.find((f) => f.name === specificFolder || f.id === specificFolder) ??
          game.actors.directory.folders[Number(specificFolder)] ??
          undefined;
      }
      if (specificFolderObj) {
        const actors = specificFolderObj.contents?.filter((a) => {
          return a.testUserPermission(this.object, "OBSERVER") && !controlled?.includes(a.id);
        });
        // MOD 4535992
        newActors = actors?.filter((actor) => {
          return !API.isHidden(actor.uuid, game.user?.id, true);
        });
      } else {
        const actors = game.actors?.filter((a) => {
          return a.testUserPermission(this.object, "OBSERVER") && !controlled?.includes(a.id);
        });
        // MOD 4535992
        newActors = actors?.filter((actor) => {
          return !API.isHidden(actor.uuid, game.user?.id, true);
        });
        // END MOD 4535992
      }

      return {
        user: this.object,
        actors: newActors,
        options: this.options,
      };
    },
    "OVERRIDE"
  );

  // Hide-Sidebars feature
  if (!game.user?.isGM) {
    if (game.settings.get(CONSTANTS.MODULE_NAME, "hidechat") !== false) {
      $("[data-tab=chat]").hide();
    }
    if (game.settings.get(CONSTANTS.MODULE_NAME, "hidecombat") !== false) {
      $("[data-tab=combat]").hide();
    }
    if (game.settings.get(CONSTANTS.MODULE_NAME, "hidescenes") !== false) {
      $("[data-tab=scenes]").hide();
    }
    if (game.settings.get(CONSTANTS.MODULE_NAME, "hideactors") !== false) {
      $("[data-tab=items]").hide();
    }
    if (game.settings.get(CONSTANTS.MODULE_NAME, "hideitems") !== false) {
      $("[data-tab=items]").hide();
    }
    if (game.settings.get(CONSTANTS.MODULE_NAME, "hidejournal") !== false) {
      $("[data-tab=journal]").hide();
    }
    if (game.settings.get(CONSTANTS.MODULE_NAME, "hidetables") !== false) {
      $("[data-tab=tables]").hide();
    }
    if (game.settings.get(CONSTANTS.MODULE_NAME, "hidecards") !== false) {
      $("[data-tab=cards]").hide();
    }
    if (game.settings.get(CONSTANTS.MODULE_NAME, "hideplaylists") !== false) {
      $("[data-tab=playlists]").hide();
    }
    if (game.settings.get(CONSTANTS.MODULE_NAME, "hidecompendium") !== false) {
      $("[data-tab=compendium]").hide();
    }
    if (game.settings.get(CONSTANTS.MODULE_NAME, "hidesettings") !== false) {
      $("[data-tab=settings]").hide();
    }
  } else {
    if (game.settings.get(CONSTANTS.MODULE_NAME, "hidechat") !== false) {
      $("a[data-tab=chat]").addClass("hidden-entity-links");
    }
    if (game.settings.get(CONSTANTS.MODULE_NAME, "hidecombat") !== false) {
      $("a[data-tab=combat]").addClass("hidden-entity-links");
    }
    if (game.settings.get(CONSTANTS.MODULE_NAME, "hidescenes") !== false) {
      $("a[data-tab=scenes]").addClass("hidden-entity-links");
    }
    if (game.settings.get(CONSTANTS.MODULE_NAME, "hideactors") !== false) {
      $("a[data-tab=items]").addClass("hidden-entity-links");
    }
    if (game.settings.get(CONSTANTS.MODULE_NAME, "hideitems") !== false) {
      $("a[data-tab=items]").addClass("hidden-entity-links");
    }
    if (game.settings.get(CONSTANTS.MODULE_NAME, "hidejournal") !== false) {
      $("a[data-tab=journal]").addClass("hidden-entity-links");
    }
    if (game.settings.get(CONSTANTS.MODULE_NAME, "hidetables") !== false) {
      $("a[data-tab=tables]").addClass("hidden-entity-links");
    }
    if (game.settings.get(CONSTANTS.MODULE_NAME, "hidecards") !== false) {
      $("a[data-tab=cards]").addClass("hidden-entity-links");
    }
    if (game.settings.get(CONSTANTS.MODULE_NAME, "hideplaylists") !== false) {
      $("a[data-tab=playlists]").addClass("hidden-entity-links");
    }
    if (game.settings.get(CONSTANTS.MODULE_NAME, "hidecompendium") !== false) {
      $("a[data-tab=compendium]").addClass("hidden-entity-links");
    }
    if (game.settings.get(CONSTANTS.MODULE_NAME, "hidesettings") !== false) {
      $("a[data-tab=settings]").addClass("hidden-entity-links");
    }
  }

  if (game.settings.get(CONSTANTS.MODULE_NAME, "hide-soundtracks") && !game.user?.isGM) {
    document.documentElement.style.setProperty("--hidden-entity-links-Display", "none");
    document.documentElement.style.setProperty("--hidden-entity-links-Hidden", HiddenEntityLinkFlags.HIDDEN);
    document.documentElement.style.setProperty("--hidden-entity-links-Flex", "none");
  }

  if (game.settings.get(CONSTANTS.MODULE_NAME, "hide-scenes") && !game.user?.isGM) {
    // Hook SceneNavigation methods and implement the main module functionality

    libWrapper.register(CONSTANTS.MODULE_NAME, "SceneNavigation.prototype.render", function (wrapper, ...args) {
      const result = wrapper.apply(this, args);
      if (!game.user?.isGM) {
        result.scenes.forEach((data) => {
          const scene = game.scenes?.get(data.id);
          const set = game.settings.get(CONSTANTS.MODULE_NAME, "level-permission-scenes-nav");
          if (set === HiddenEntityLinkPermissions.EMPTY) {
            const isSceneHidden = API.isHidden(scene.uuid, game.user?.id, true);
            if (isSceneHidden) {
              this.element.empty();
              return;
            }
          } else {
            const neededRole = API.hiddenEntityLinks._checkPermission(scene, game.user, "level-permission-scenes-nav");
            if (!neededRole) {
              this.element.empty();
              return;
            }
          }
          // }
        });
      }
      return result;
    });

    libWrapper.register(
      CONSTANTS.MODULE_NAME,
      "SceneNavigation.prototype.getData",
      function (wrapper, ...args) {
        const result = wrapper.apply(this, args);
        if (!game.user?.isGM) {
          // Modify Scene data
          // TODO execute as GM
          // const scenes = result.scenes.map(scene => {
          //   const data = scene.data.toObject(false);
          const scenes = result.scenes.forEach((data) => {
            const scene = game.scenes?.get(data.id);
            if (!scene) {
              error(`It shouldn't happen check out the logs`);
            }
            const users = game.users?.filter((u) => u.active && u.viewedScene === scene.id);

            if (scene.navigation) {
              const set = game.settings.get(CONSTANTS.MODULE_NAME, "level-permission-scenes-nav-name");
              if (set === HiddenEntityLinkPermissions.EMPTY) {
                const isSceneHidden = API.isHidden(scene.uuid, game.user?.id, true);
                if (isSceneHidden) {
                  // Check if navigation is navigable for avoid the 'hide-scenes-nav' check
                  //data.name = scene?.name;
                  let name = scene?.name; // game.user?.isGM ? data.name : data.navName
                  if (name === "") {
                    name = data.name;
                  }
                  data.name = TextEditor.truncateText(name, { maxLength: 32 });
                }
              } else {
                const navNameRole = API.hiddenEntityLinks._checkPermission(
                  scene,
                  game.user,
                  "level-permission-scenes-nav-name"
                );
                if (!navNameRole) {
                  // Check if navigation is navigable for avoid the 'hide-scenes-nav' check
                  //data.name = scene?.name;
                  let name = scene?.name; // game.user?.isGM ? data.name : data.navName
                  if (name === "") {
                    name = data.name;
                  }
                  data.name = TextEditor.truncateText(name, { maxLength: 32 });
                }
              }
            }
            data.users = users.map((u) => {
              return { letter: u.name, color: u.color };
            });
            data.visible = game.user?.isGM || scene.isOwner || scene.active;
            data.css = [
              scene.isView ? "view" : null,
              scene.active ? "active" : null,
              // data.ownership.default === 0 ? "gm" : null,
            ]
              .filter((c) => !!c)
              .join(" ");
            return data;
          });

          // Return data for rendering
          return {
            collapsed: this._collapsed,
            scenes: scenes,
          };
        } else {
          return result;
        }
      },
      "WRAPPER"
    );

    resetNavbar();
  }

  Hooks.on("updateJournalEntry", (entityData, data) => {
    if (game.settings.get(CONSTANTS.MODULE_NAME, "hide-journals")) {
      if (data.flags && data.flags[CONSTANTS.MODULE_NAME]) {
        const html = $("#journal.sidebar-tab");
        // hiddenEntityLinksSocket.executeForEveryone('updateHiddenEntityLinks', entityData, html, data);
        API.hiddenEntityLinks.updateHiddenEntityLinks(entityData, html, data);
      }
    }
  });
  Hooks.on("updateScene", (entityData, data) => {
    if (game.settings.get(CONSTANTS.MODULE_NAME, "hide-scenes")) {
      if (data.flags && data.flags[CONSTANTS.MODULE_NAME]) {
        const html = $("#scenes.sidebar-tab");
        // hiddenEntityLinksSocket.executeForEveryone('updateHiddenEntityLinks', entityData, html, data);
        API.hiddenEntityLinks.updateHiddenEntityLinks(entityData, html, data);
      }
    }
  });
  Hooks.on("updateActor", (entityData, data) => {
    if (game.settings.get(CONSTANTS.MODULE_NAME, "hide-actors")) {
      if (data.flags && data.flags[CONSTANTS.MODULE_NAME]) {
        const html = $("#actors.sidebar-tab");
        // hiddenEntityLinksSocket.executeForEveryone('updateHiddenEntityLinks', entityData, html, data);
        API.hiddenEntityLinks.updateHiddenEntityLinks(entityData, html, data);
      }
    }
  });
  Hooks.on("updateItem", (entityData, data) => {
    if (game.settings.get(CONSTANTS.MODULE_NAME, "hide-items")) {
      if (data.flags && data.flags[CONSTANTS.MODULE_NAME]) {
        const html = $("#items.sidebar-tab");
        // hiddenEntityLinksSocket.executeForEveryone('updateHiddenEntityLinks', entityData, html, data);
        API.hiddenEntityLinks.updateHiddenEntityLinks(entityData, html, data);
      }
    }
  });
  // Hooks.on('updateMacro', directoryRenderedHiddenEntityLinks);
  Hooks.on("updateRollTable", (entityData, data) => {
    if (game.settings.get(CONSTANTS.MODULE_NAME, "hide-rolltables")) {
      if (data.flags && data.flags[CONSTANTS.MODULE_NAME]) {
        const html = $("#tables.sidebar-tab");
        // hiddenEntityLinksSocket.executeForEveryone('updateHiddenEntityLinks', entityData, html, data);
        API.hiddenEntityLinks.updateHiddenEntityLinks(entityData, html, data);
      }
    }
  });

  Hooks.on("updateCards", (entityData, data) => {
    if (data.flags && data.flags[CONSTANTS.MODULE_NAME]) {
      const html = $("#cards.sidebar-tab");
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
  //             <i class="fa fa-fw" style="color:darkRed; text-shadow: 0 0 8px darkRed;"/>
  //           </div>`,
  //         );
  //         liFolder.find('h4').before(div);
  //       }else{
  //         liFolder.find('.hidden-entity-links').remove();
  //       }
  //     }
  //   }
  // });

  Hooks.on("renderJournalSheet", (sheet, html, data) => {
    // if (game.settings.get(CONSTANTS.MODULE_NAME, 'hide-journals')) {
    //   if (data.flags && data.flags[CONSTANTS.MODULE_NAME]) {
    API.hiddenEntityLinks.hideRenderedHiddenEntityLinks(sheet, html, data);
    //   }
    // }
  });

  Hooks.on("renderJournalPageSheet", (sheet, html, data) => {
    API.hiddenEntityLinks.hideRenderedHiddenEntityLinks(sheet, html, data);
  });

  // Hooks.on("renderSceneSheet", (sheet, html, data) => {});
  Hooks.on("renderActorSheet", (sheet, html, data) => {
    // if (game.settings.get(CONSTANTS.MODULE_NAME, 'hide-actors')) {
    //   if (data.flags && data.flags[CONSTANTS.MODULE_NAME]) {
    API.hiddenEntityLinks.hideRenderedHiddenEntityLinks(sheet, html, data);
    //   }
    // }
  });
  Hooks.on("renderItemSheet", (sheet, html, data) => {
    // if (game.settings.get(CONSTANTS.MODULE_NAME, 'hide-items')) {
    //   if (data.flags && data.flags[CONSTANTS.MODULE_NAME]) {
    API.hiddenEntityLinks.hideRenderedHiddenEntityLinks(sheet, html, data);
    //   }
    // }
  });
  // Hooks.on("renderMacroSheet", (sheet, html, data) => {});
  // Hooks.on("renderRolltableSheet", (sheet, html, data) => {});
};
