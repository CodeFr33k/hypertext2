import { observable } from 'mobx';
import parseRecords from './parseRecords';

it('parse record', () => {
    const lines: string[] = [
        'abc',
        '',
    ];
    const records = parseRecords(lines);
    expect(records).toHaveLength(1);
})

it('add lines to record', () => {
    const lines: string[] = [
        'abc',
        '',
    ];
    const records = parseRecords(lines);
    expect(records[0].lines).toHaveLength(2);
});
