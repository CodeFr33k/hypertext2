export function evalFn(text: string) {
    const fn = new Function('"use strict";return (' + text + ')')(); 
    return fn;
}

// link = https://stackoverflow.com/a/22864603
const re = /(file|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/ig;

export function matchUris(text: string) {
    const uris = text.match(re);
    return uris || [];
}
