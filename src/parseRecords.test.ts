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

it('parse img', () => {
     const lines: string[] = [
        'abc',
        '(`',
        'img = http://localhost/image.png',
        ')',
    ];
    const records = parseRecords(lines);
    expect(records[0].images).toHaveLength(1);
});

it('parse key value', () => {
     const lines: string[] = [
        'abc',
        '(`',
        'abc = 123',
        ')',
    ];
    const records = parseRecords(lines);
    expect(records[0].annotations).toContainEqual({
        key: 'abc',
        value: '123',        
    });
});

it('parse tag', () => {
     const lines: string[] = [
        'abc',
        '(`',
        '123',
        ')',
    ];
    const records = parseRecords(lines);
    expect(records[0].annotations).toContain('123');
});
