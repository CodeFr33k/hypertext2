<template>
    <div class="html-button-component">
        <label
            for="html-upload"
            class="html-upload-button"
        >Html</label>
        <input
            id="html-upload"
            type="file"
            @change="readHtmlFile"
            accept=".html"
            multiple
        />
    </div>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue';
import {
    Component,
    Vue,
} from 'vue-property-decorator';
import store from '@/store';
import * as util from 'caml-js/util';

@Observer
@Component({
    components: {
    }
})
export default class extends Vue {
    public async readHtmlFile(e: any) {
        for(let file of e.target.files) {
            const text: string = await util.readTextFromFile(file);
            store.loadHtml(text);
        };
        e.target.value = '';
    }
}
</script>

<style lang="sass" scoped>

.html-upload-button
    background: green
    border-radius: 50%
    box-sizing: border-radius
    height: 60px
    width: 60px
    display: flex
    align-items: center
    justify-content: center
    color: white
    font-weight: 600
    font-size: 24px
    cursor: pointer

</style>
