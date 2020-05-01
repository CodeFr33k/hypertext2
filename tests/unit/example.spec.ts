import store from '@/store';

class KeyValue {
    key?: string;
    value?: string;
    constructor(key: string | undefined, value: string | undefined) {
        this.key = key;
        this.value = value;
    }
}

class AnnotationGroup {
    name: string;
    annotations: any[] = []
    constructor(name: string) {
        this.name = name;
    }
}

class Record {
    annotations: any[] = []
}

function parse(text: string) {
    const lines = text.split('\n');
    const result = lines.reduce((result: any, line) => {
       if(!result.record && line){
            result.record = new Record();
            result.records.push(result.record);
        }
        if(line.startsWith('(`')) {
            result.isReadingData = true;
            return result;
        }
        if(line.startsWith(')')) {
            result.isReadingData = false;
            return result;
        }
        if(result.isReadingData) {
            const match = /(?<key>\w+) = (?<value>\w+)/.exec(line);         
            if(match) {
                const keyValue = new KeyValue(
                    match.groups?.key, 
                    match.groups?.value
                );
                result.record.annotations.push(keyValue);
            }
        }
        if(!line && !result.isReadingData) {
            result.record = undefined;
            result.isReadingDate = false;
        }
        return result;
    }, {
        records: [],
        record: undefined,
        isReadingData: false,
    });
    return result.records;
}


it('parse record', () => {
    const text = `
        abc

        def

        ghi
    `;
    const records = parse(text); 
    expect(records.length).toBe(3)
})

it('parse data', () => {
    const text = `
        abc
(\`
            a = b
)
    `;
    const records = parse(text); 
    expect(records[0]?.annotations[0]?.key).toBe('a');
    expect(records[0]?.annotations[0]?.value).toBe('b');
})

