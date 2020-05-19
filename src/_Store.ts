import {
    computed,
    observable,
    observe,
} from 'mobx';
import Reader from '@/Reader';
import RecordsFactory from '@/RecordsFactory';
import Record from '@/Record';
import * as util from '@/util';

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
    @computed get currentRecords() {
        let records: any[] = [...this.records];
        for(let reducer of this.reducers) {
            records = reducer(records);
        }
        return records; 
    }
    @computed get lines() {
        let lines: string[] = [];
        let records: any[] = this.records.map((record: any) => {
            record.userData = []; 
            return record;
        });
        for(let reducer of this.reducers) {
            records = reducer(records);
        }
        for(let record of records) {
            const htmlLines = record.lines.map((line: string) => {
                const uris = util.matchUris(line);
                return uris.reduce((line, uri) => {
                    return line.replace(
                        uri,
                        '<a ' +
                        'target="blank" ' +
                        'rel="noopener noreferrer" ' +
                        `href=${uri}>${uri}</a>`
                    );
                }, line);
            });
            for(let img of record.images) {
                htmlLines.unshift(
                    '<img ' +
                    'width="400px" ' +
                    `src=${img} />`
                );
            }
            lines = lines.concat(htmlLines);
            if(record.userData.length == 0) {
                continue;
            }
            lines[lines.length - 1] = '@userData (`';
            for(let data of record.userData) {
                lines.push(data.toString());   
            }
            lines.push(')');
            lines.push('');
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
