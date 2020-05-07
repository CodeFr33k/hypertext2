import { observe } from 'mobx';
import Record from '@/Record';
import Store from '@/_Store';

it('load records when reader changes', (done) => {
    const store = new Store();
    store.records = {
        load: jest.fn(),
    }; 
    store.reader.read('abc');
    store.reader.read('\n');
    const disposer = observe(store.reader.lines, (delta: any) => {
        expect(store.records.load).toHaveBeenCalled();
        disposer();
        done();
    });
    store.reader.end();
});

it('compute lines from records', () => {
    const store = new Store();
    const record = new Record();
    record.lines.push('abc');
    store.records.push(record);
    expect(store.lines).toContain('abc');
});

it('keep records that match all reducers', () => {
    const store = new Store();
    const record = new Record();
    record.lines.push('abc');
    store.records.push(record);
    store.addReducer(function(record: any) {
        return record.lines[0] === 'abc';
    });
    expect(store.lines).toHaveLength(1);
});

it('remove records that don\'t match reducers', () => {
    const store = new Store();
    const record = new Record();
    record.lines.push('abc');
    store.records.push(record);
    store.addReducer(function(record: any) {
        return record.lines[0] === 'def';
    });
    expect(store.lines).toHaveLength(0);
});

