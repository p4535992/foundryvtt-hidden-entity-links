import { HiddenEntityLinks } from "./hidden-entity-links-class.js";

import CONSTANTS from "./constants.js";
import {
    HiddenEntityLinkFlags,
    HiddenEntityLinkPermissions,
    HiddenEntityLinkState,
} from "./hidden-entity-link-models.js";
import Logger from "./lib/Logger.js";
const API = {
    hiddenEntityLinks: {},

    _checkPermission(entity, user, setting) {
        let result = true;
        let set;
        if (setting === "level-permission-actors") {
            set = game.settings.get(CONSTANTS.MODULE_NAME, "level-permission-actors");
        } else if (setting === "level-permission-items") {
            set = game.settings.get(CONSTANTS.MODULE_NAME, "level-permission-items");
        } else if (setting === "level-permission-journals") {
            set = game.settings.get(CONSTANTS.MODULE_NAME, "level-permission-journals");
        } else if (setting === "level-permission-rolltables") {
            set = game.settings.get(CONSTANTS.MODULE_NAME, "level-permission-rolltables");
        } else if (setting === "level-permission-cards") {
            set = game.settings.get(CONSTANTS.MODULE_NAME, "level-permission-cards");
            // } else if (setting === 'level-permission-scenes') {
            //   set = game.settings.get(CONSTANTS.MODULE_NAME, 'level-permission-scenes');
        } else if (setting === "level-permission-scenes-nav") {
            set = game.settings.get(CONSTANTS.MODULE_NAME, "level-permission-scenes-nav");
        } else if (setting === "level-permission-scenes-nav-name") {
            set = game.settings.get(CONSTANTS.MODULE_NAME, "level-permission-scenes-nav-name");
        } else if (setting === "level-permission-disguise-unreachable-links") {
            set = game.settings.get(CONSTANTS.MODULE_NAME, "level-permission-disguise-unreachable-links");
        } else {
            throw new Logger.error(`NO module setting found for key '${setting}'`);
        }
        /*
		if (set === HiddenEntityLinkPermissions.EMPTY) {
			result = false;
		} else if (set === HiddenEntityLinkPermissions.NONE) {
			result = !entity.testUserPermission(user, "LIMITED");
		} else if (set === HiddenEntityLinkPermissions.LIMITED) {
			result = !entity.testUserPermission(user, "OBSERVER");
		} else if (set === HiddenEntityLinkPermissions.OBSERVER) {
			result = !entity.testUserPermission(user, "OWNER");
		} else if (set === HiddenEntityLinkPermissions.OWNER) {
			result = true;
		} else if (set === HiddenEntityLinkPermissions.ONLY_LIMITED) {
			result =
				!entity.testUserPermission(user, "NONE", { exact: true }) &&
				entity.testUserPermission(user, "LIMITED", { exact: true }) &&
				!entity.testUserPermission(user, "OBSERVER", { exact: true }) &&
				!entity.testUserPermission(user, "OWNER", { exact: true });
		} else if (set === HiddenEntityLinkPermissions.ONLY_OBSERVER) {
			result =
				!entity.testUserPermission(user, "NONE", { exact: true }) &&
				!entity.testUserPermission(user, "LIMITED", { exact: true }) &&
				entity.testUserPermission(user, "OBSERVER", { exact: true }) &&
				!entity.testUserPermission(user, "OWNER", { exact: true });
		}
        */
        if (set === HiddenEntityLinkPermissions.EMPTY) {
            result = false;
        } else if (set === HiddenEntityLinkPermissions.NONE) {
            //@ts-ignore
            result = !entity.testUserPermission(user, CONST.DOCUMENT_OWNERSHIP_LEVELS.LIMITED);
        } else if (set === HiddenEntityLinkPermissions.LIMITED) {
            //@ts-ignore
            result = !entity.testUserPermission(user, CONST.DOCUMENT_OWNERSHIP_LEVELS.OBSERVER);
        } else if (set === HiddenEntityLinkPermissions.OBSERVER) {
            //@ts-ignore
            result = !entity.testUserPermission(user, CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER);
        } else if (set === HiddenEntityLinkPermissions.OWNER) {
            result = true;
        } else if (set === HiddenEntityLinkPermissions.ONLY_LIMITED) {
            result =
                //@ts-ignore
                !entity.testUserPermission(user, CONST.DOCUMENT_OWNERSHIP_LEVELS.NONE, { exact: true }) &&
                //@ts-ignore
                entity.testUserPermission(user, CONST.DOCUMENT_OWNERSHIP_LEVELS.LIMITED, { exact: true }) &&
                //@ts-ignore
                !entity.testUserPermission(user, CONST.DOCUMENT_OWNERSHIP_LEVELS.OBSERVER, { exact: true }) &&
                //@ts-ignore
                !entity.testUserPermission(user, CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER, { exact: true });
        } else if (set === HiddenEntityLinkPermissions.ONLY_OBSERVER) {
            result =
                //@ts-ignore
                !entity.testUserPermission(user, CONST.DOCUMENT_OWNERSHIP_LEVELS.NONE, { exact: true }) &&
                //@ts-ignore
                !entity.testUserPermission(user, CONST.DOCUMENT_OWNERSHIP_LEVELS.LIMITED, { exact: true }) &&
                //@ts-ignore
                entity.testUserPermission(user, CONST.DOCUMENT_OWNERSHIP_LEVELS.OBSERVER, { exact: true }) &&
                //@ts-ignore
                !entity.testUserPermission(user, CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER, { exact: true });
        }
        return result;
    },

    _checkState(entity) {
        const hasFlagHide =
            foundry.utils.hasProperty(entity, `flags.${CONSTANTS.MODULE_NAME}.${HiddenEntityLinkFlags.HIDDEN}`) &&
            entity.getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN) !== null &&
            entity.getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN) !== undefined;
        if (hasFlagHide) {
            if (entity.getFlag(CONSTANTS.MODULE_NAME, HiddenEntityLinkFlags.HIDDEN)) {
                return HiddenEntityLinkState.HIDE;
            } else {
                return HiddenEntityLinkState.SHOW;
            }
        } else {
            return HiddenEntityLinkState.UNHIDE;
        }
    },

    isHidden(documentUuid, userId, evenForGm) {
        if (!documentUuid) {
            Logger.error(`No documentId is passed '${documentUuid}'`, true);
            return false;
        }
        if (!userId) {
            Logger.error(`No userId is passed '${userId}'`, true);
            return false;
        }
        const myUser = game.users?.get(userId);
        if (!myUser) {
            Logger.error(`No user founded by id '${userId}'`, true);
            return false;
        }
        if (myUser?.isGM && !evenForGm) {
            return false;
        }
        // const myDocument = fromUuid(documentUuid);
        //@ts-ignore
        const myDocument = fromUuidSync(documentUuid);
        if (!myDocument) {
            Logger.error(`No document founded by id '${documentUuid}'`, true);
            return false;
        }
        // Before check permission we check the flags
        const isHiddenByFlag = this._checkState(myDocument);
        if (isHiddenByFlag === HiddenEntityLinkState.HIDE) {
            return true;
        }
        if (isHiddenByFlag === HiddenEntityLinkState.SHOW) {
            return false;
        }

        let keySetting = "";
        if (myDocument instanceof Actor) {
            keySetting = "level-permission-actors";
        } else if (myDocument instanceof Item) {
            keySetting = "level-permission-items";
        } else if (myDocument instanceof Journal) {
            keySetting = "level-permission-journals";
        } else if (myDocument instanceof RollTable) {
            keySetting = "level-permission-rolltables";
        } else if (myDocument instanceof Card) {
            keySetting = "level-permission-cards";
        } else if (myDocument instanceof Scene) {
            keySetting = "level-permission-scenes-nav";
        } else {
            Logger.error(
                `The entity '${myDocument}' is not a recognized instance it must be Actor, Item, Journal, RollTable, Card, Scene`,
                true,
            );
            return false;
        }
        return this._checkPermission(myDocument, myUser, keySetting);
    },

    async renderSpecificSidebarArr(...inAttributes) {
        if (!Array.isArray(inAttributes)) {
            throw Logger.error("renderSpecificSidebarArr | inAttributes must be of type array");
        }
        const [documentName] = inAttributes; // e.g. { action: "createFolder" }

        if (Scene.documentName === documentName) {
            game.scenes?.render(true);
        } else if (Actor.documentName === documentName) {
            game.actors?.render(true);
        } else if (Item.documentName === documentName) {
            game.items?.render(true);
        } else if (Journal.documentName === documentName) {
            game.journal?.render(true);
        } else if (Macro.documentName === documentName) {
            game.macros?.render(true);
        } else if (RollTable.documentName === documentName) {
            game.tables?.render(true);
        } else if (Card.documentName === documentName) {
            game.cards?.render(true);
        } else if (Playlist.documentName === documentName) {
            game.playlists?.render(true);
            // } else if (CompendiumCollection.documentName === documentName) {
        } else {
            Logger.warn(`Document name is not passed '${documentName}'`, true);
        }
    },
};
export default API;
