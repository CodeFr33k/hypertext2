import { observe } from 'mobx';
import Reader from './Reader';

it('read line', (done) => {
    const reader = new Reader();
    const disposer = observe(reader.lines, (delta: any) => {
        expect(delta.added).toContain('a');
        done();
    });
    reader.read('a');
    reader.read('\n');
    disposer();
});

it('clear readline', () => {
    const reader = new Reader();
    reader.read('a');
    reader.read('\n');
    expect(reader.readline).toHaveLength(0);
});
