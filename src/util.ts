export function evalFn(text: string) {
    const fn = new Function('"use strict";return (' + text + ')')(); 
    return fn;
}
