import CONSTANTS from "../constants.js";

// =============================
// Module Generic function
// =============================

export async function getToken(documentUuid) {
    // const document = await fromUuid(documentUuid);
    //@ts-ignore
    const document = fromUuidSync(documentUuid);
    //@ts-ignore
    return document?.token ?? document;
}

export function getOwnedTokens(priorityToControlledIfGM) {
    const gm = game.user?.isGM;
    if (gm) {
        if (priorityToControlledIfGM) {
            const arr = canvas.tokens?.controlled;
            if (arr && arr.length > 0) {
                return arr;
            } else {
                return canvas.tokens?.placeables;
            }
        } else {
            return canvas.tokens?.placeables;
        }
    }
    if (priorityToControlledIfGM) {
        const arr = canvas.tokens?.controlled;
        if (arr && arr.length > 0) {
            return arr;
        }
    }
    let ownedTokens = canvas.tokens?.placeables.filter((token) => token.isOwner && (!token.document.hidden || gm));
    if (ownedTokens.length === 0 || !canvas.tokens?.controlled[0]) {
        ownedTokens = canvas.tokens?.placeables.filter(
            (token) => (token.observer || token.isOwner) && (!token.document.hidden || gm),
        );
    }
    return ownedTokens;
}

export function is_UUID(inId) {
    return typeof inId === "string" && (inId.match(/\./g) || []).length && !inId.endsWith(".");
}

export function getUuid(target) {
    // If it's an actor, get its TokenDocument
    // If it's a token, get its Document
    // If it's a TokenDocument, just use it
    // Otherwise fail
    const document = getDocument(target);
    return document?.uuid ?? false;
}

export function getDocument(target) {
    if (target instanceof foundry.abstract.Document) return target;
    return target?.document;
}

export function is_real_number(inNumber) {
    return !isNaN(inNumber) && typeof inNumber === "number" && isFinite(inNumber);
}

export function isGMConnected() {
    return !!Array.from(game.users).find((user) => user.isGM && user.active);
}

export function isGMConnectedAndSocketLibEnable() {
    return isGMConnected();
}

export function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isActiveGM(user) {
    return user.active && user.isGM;
}

export function getActiveGMs() {
    return game.users?.filter(isActiveGM);
}

export function isResponsibleGM() {
    if (!game.user?.isGM) return false;
    return !getActiveGMs()?.some((other) => other.id < game.user?.id);
}

// =============================
// Module specific function
// =============================

export const resetNavbar = function () {
    ui.nav.render(true);
};
