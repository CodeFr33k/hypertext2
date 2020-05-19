import Record from './Record';
import * as util from '@/util';

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
        if(result.isReadingData) {
            const match = util.matchKeyValue(line);
            const tag = util.matchTag(line);
            if(match) {
                result.record.annotations.push({
                    key: match.key,
                    value: match.value,
                });
                if(match.key === 'img') {
                    const uris = util.matchUris(match.value);
                    if(uris.length > 0) {
                        // NOTE: only supports one image uri currently
                        // per key-value
                        result.record.images.push(uris[0]);
                    }
                }
            } else if(tag) {
                result.record.annotations.push(tag);
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
    return result.records.reverse();
}

