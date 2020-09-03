<template>
    <div class="app-component">
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
                accept=".caml"
                multiple
            />
        </div>
        <div v-else>
            <Lines :lines="store.lines" />
            <ReloadButton />
            <SaveButton />
        </div>
    </div>
</template>
<script lang="ts">
import {
    Observer,
} from 'mobx-vue';
import { observe } from 'mobx';
import {
    Component,
    Vue,
} from 'vue-property-decorator';
import Reader from 'caml-js/Reader';
import Lines from '@/Lines.vue';
import JsButton from '@/JsButton.vue';
import HtmlButton from '@/HtmlButton.vue';
import ReloadButton from '@/ReloadButton.vue';
import SaveButton from '@/SaveButton.vue';
import store from '@/store';
import * as util from 'caml-js/util';

@Observer
@Component({
    components: {
        JsButton,
        HtmlButton,
        Lines,
        ReloadButton,
        SaveButton,
    }
})
export default class extends Vue {
    store: any = store;
    disposer: any;
    public async readFile(e: any) {
        for(let file of e.target.files) {
            const text: string = await util.readTextFromFile(file);
            store.loadCaml(text);
        };
    }
    mounted() {
        this.disposer = observe(this.store.title, (delta: any) => {
            document.title = delta.object;
        });
        document.title = store.title;
    }
    destroyed() {
        this.disposer();
    }
}
</script>
<style lang="sass">
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

.html-button-component
    position: fixed
    bottom: 15px 
    left: 30%
    transform: translateY(-50%) 

.reload-button-component
    position: fixed
    bottom: 30px 
    left: 50%
    transform: translateX(-50%) 

.save-button-component
    position: fixed
    bottom: 30px 
    left: 70%
    transform: translateX(-50%) 

</style>
