import {
    computed,
    observable,
    observe,
} from 'mobx';
import Reader from 'caml-js/Reader';
import RecordsFactory from 'caml-js/RecordsFactory';
import Record from 'caml-js/Record';
import Manifest from 'caml-js/Manifest';
import * as Util from 'caml-js/util';
import * as Uri from 'caml-js/Uri';

export default class Store {
    reader: Reader;
    reader2: Reader;
    records: any;
    appData: any;
    disposer: any;
    disposer2: any;
    disposer3: any;
    handler: any;
    @observable title: any = observable.box('App');
    @observable reducers: any = [];
    @observable htmls: any = [];
    @observable data: any = observable({
        saveEnabled: false,                                 
    });

    constructor() {
        this.reader = new Reader();
        this.records = RecordsFactory.create();
        this.disposer = observe(this.reader.lines, (delta: any) => {
            this.records.load(delta.object);
        });
        this.reader2 = new Reader();
        this.appData = RecordsFactory.create();
        this.disposer2 = observe(this.reader2.lines, (delta: any) => {
            this.appData.load(delta.object);
        });
        this.disposer3 = observe(this.appData, (delta: any) => {
            for(const appData of this.appData) {
                const record = this.currentRecords.find((record: Record) => {
                    return record.id === appData.id;
                });
                if(record) {
                    record.click();
                }
            }
        });
        this.handler = {
            'js': this.loadJavascript.bind(this),
            'caml': this.loadCaml.bind(this),
            'html': this.loadHtml.bind(this),
            'appdata': this.loadAppData.bind(this),
        }
    }

    close() {
        this.disposer3();
        this.disposer2();
        this.disposer();
    }

    @computed get currentRecords() {
        let records: any[] = this.records.map((record: any) => {
            record.userData = []; 
            return record;
        });
        for(let reducer of this.reducers) {
            records = reducer(records);
        }
        return records; 
    }

    @computed get lines() {
        let lines: string[] = [];
        for(let record of this.currentRecords) {
            const htmlLines = record.lines.map((line: string) => {
                const uris = Util.matchUris(line);
                return uris.reduce((line, uri) => {
                    return line.replace(
                        uri,
                        '<a ' +
                        'target="blank" ' +
                        'rel="noopener noreferrer" ' +
                        `onclick="store.click(${record.id});" ` +
                        `href=${uri}>${uri}</a>`
                    );
                }, line);
            });
            for(let [index, html] of this.htmls.entries()) {
                htmlLines.unshift(
                    '<iframe ' +
                    `style="width: 100%" ` +
                    `:key="${index}" ` +
                    `src="${html}" ` +
                    '></iframe>'
                );
            }
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

    loadAppData(text: string) {
        for(let i = 0; i < text.length; i++) {
            const char = text.substr(i, 1);
            this.reader2.read(char);
        }
        this.reader2.end();
    }

    loadCaml(text: string) {
        for(let i = 0; i < text.length; i++) {
            const char = text.substr(i, 1);
            this.reader.read(char);
        }
        this.reader.end();
    }

    loadJavascript(text: string) {
        const reducer = Util.evalFn(text);
        this.addReducer(reducer);
    }
    loadHtml(text: string, file: string) {
        //const html = 'data:text/html;charset=utf-8,' + escape(text);
        this.htmls.push(file);
    }
    addReducer(reducer: any) {
        this.reducers.push(reducer);
    }
    async loadManifest(uri: string) {
        const match = uri.match(/[^\/]+$/);
        if(match) {
            this.title.set(match[0]);
        }
        const manifest = await Manifest.fetch(uri)
        const files = manifest.toFiles();
        for(let file of files) {
            const fileuri = uri.replace(/[^\/]+$/, file);
            this.loadFile(fileuri);
        }
    }
    async loadFile(file: any) {
        const ext: string | undefined = Util.parseExt(file);
        const text = await Uri.fetchText(file);
        if(ext) {
            this.handler[ext](text, file); 
        }
    }
    click(id: string) {
        this.appData.load([
            '(`',
            '   @click',
            `   @id = ${id}`,
            ')'
        ]);
    }

    encodeAppData() {
        let text = '';
        for(const record of this.appData) {
            for(const line of record.lines) {
                text += line + '\n';
            }
        }
        return text;
    }

}

