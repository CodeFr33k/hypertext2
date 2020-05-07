import * as util from './util';

it('eval javascript', () => {
    const fn = util.evalFn(`
       function(x) {
           return x === 1;
       }
   `);
    expect(fn(1)).toBeTruthy();

});
