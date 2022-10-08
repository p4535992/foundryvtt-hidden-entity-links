import CONSTANTS from "./constants";
import API from "./api";
import { debug } from "./lib/lib";
import { setSocket } from "../hidden-entity-links";

export let hiddenEntityLinkSocket;

export function registerSocket() {
	debug("Registered finalBlowSocket");
	if (hiddenEntityLinkSocket) {
		return hiddenEntityLinkSocket;
	}
	//@ts-ignore
	hiddenEntityLinkSocket = socketlib.registerModule(CONSTANTS.MODULE_NAME);

	hiddenEntityLinkSocket.register("renderSpecificSidebar", (...args) => API.renderSpecificSidebarArr(...args));

	setSocket(hiddenEntityLinkSocket);
	return hiddenEntityLinkSocket;
}
