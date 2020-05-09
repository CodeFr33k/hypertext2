import Record from './Record';

export default function  parseRecords(lines: string[]) {
    const result = lines.reduce((result: any, line: string) => {
       if(!result.record && line){
            result.record = new Record();
            result.records.push(result.record);
        }
        if(result.record) {
            result.record.lines.push(line);
        }
        if(line.startsWith('(`')) {
            result.isReadingData = true;
            return result;
        }
        if(line.startsWith(')')) {
            result.isReadingData = false;
            return result;
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
    return result.records.reverse();
}

