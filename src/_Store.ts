import {
    computed,
    observable,
    observe,
} from 'mobx';
import Reader from '@/Reader';
import RecordsFactory from '@/RecordsFactory';
import Record from '@/Record';

export default class {
    reader: Reader;
    records: any;
    disposer: any;
    @observable reducers: any = [];

    constructor() {
        this.reader = new Reader();
        this.records = RecordsFactory.create();
        this.disposer = observe(this.reader.lines, (delta: any) => {
            this.records.load(delta.object);
        });
    }
    close() {
        this.disposer();
    }
    @computed get lines() {
        let lines: string[] = [];
        for(let record of this.records) {
            const someFail = this.reducers.some((reducer: any) => {
                return !reducer(record);
            });
            if(someFail) {
                continue;
            }
            lines = lines.concat(record.lines);
        } 
        return lines;

    }
    readText(text: string) {
        for(let i = 0; i < text.length; i++) {
            const char = text.substr(i, 1);
            this.reader.read(char);
        }
        this.reader.end();
    }
    addReducer(reducer: any) {
        this.reducers.push(reducer);
    }
}
