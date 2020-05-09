<template>
    <div class="app-component">
        <div class="record-count">Records: {{store.currentRecords.length}}</div>
        <div v-if="store.lines.length == 0">
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
            <Lines :lines="store.lines" />
            <JsButton />
            <ReloadButton />
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
import JsButton from '@/JsButton.vue';
import ReloadButton from '@/ReloadButton.vue';
import store from '@/store';

@Observer
@Component({
    components: {
        JsButton,
        Lines,
        ReloadButton,
    }
})
export default class extends Vue {
    store: any = store;
    public readFile(e: any): void {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const text: any = e.target.result;
            store.readText(text);
        };
        const file = e.target.files[0];
        reader.readAsText(file);
    }
}
</script>
<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap')
@import '@/common.sass'

.record-count
    padding: 15px 15px 0

.file-upload-button
    background: silver
    padding: 8px 10px
    display: inline-block

.js-button-component
    position: fixed
    bottom: 15px 
    left: 50%
    transform: translateY(-50%) 

.reload-button-component
    position: fixed
    bottom: 15px 
    left: 70%
    transform: translateY(-50%) 

</style>
