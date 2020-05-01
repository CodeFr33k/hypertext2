import { observable, action } from 'mobx';

class Reader {
    @observable lines: Array<string> = [];
    @observable readline: string = '';

    @action.bound read(char: string) {
        if(char === '\n') {
            this.lines.push(this.readline); 
            this.readline = this.readline.replace(this.readline, '');
            return;
        }
        this.readline += char;
    }
}

export default Reader;
