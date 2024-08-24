import CONSTANTS from "./constants.js";
import API from "./api.js";
import { setSocket } from "../module.js";
import Logger from "./lib/Logger.js";

export let hiddenEntityLinkSocket;

export function registerSocket() {
    Logger.debug("Registered finalBlowSocket");
    if (hiddenEntityLinkSocket) {
        return hiddenEntityLinkSocket;
    }
    //@ts-ignore
    hiddenEntityLinkSocket = socketlib.registerModule(CONSTANTS.MODULE_NAME);

    hiddenEntityLinkSocket.register("renderSpecificSidebar", (...args) => API.renderSpecificSidebarArr(...args));

    setSocket(hiddenEntityLinkSocket);
    return hiddenEntityLinkSocket;
}
