<template>
    <div class="app-component">
        <div v-if="reader.lines.length == 0">
            <label
                for="file-upload"
                class="file-upload-button"
            >
                    Open .caml file
            </label>
            <input
                id="file-upload"
                type="file"
                @change="readFile"
            />
        </div>
        <div v-else>
            <Lines :reader="reader" />
        </div>
    </div>
</template>
<script lang="ts">
import { Observer } from 'mobx-vue';
import {
    Component,
    Vue,
} from 'vue-property-decorator';
import Reader from '@/Reader';
import Lines from '@/Lines.vue';

const reader = new FileReader();

@Observer
@Component({
    components: {
        Lines,
    }
})
export default class extends Vue {
    private reader: Reader = new Reader()
    public readFile(e: any): void {
        const file = e.target.files[0];
        reader.onload = (e: any) => {
            const text: any = e.target.result;
            this.readText(text);
        };
        reader.readAsText(file);
    }
    private readText(text: string) {
        for(let i = 0; i < text.length; i++) {
            const char = text.substr(i, 1);
            console.log({char});
            this.reader.read(char);
        }
        console.log(this.reader.lines);
    }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

body {
  font-family: 'Roboto', sans-serif;
}

input[type=file] {
    display: none;
}

.file-upload-button {
    background: silver;
    padding: 8px 10px;
}

</style>
