<template>
    <div class="js-button-component">
        <label
            for="js-upload"
            class="js-upload-button"
        >Js</label>
        <input
            id="js-upload"
            type="file"
            @change="readJavascriptFile"
            accept=".js"
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
    public async readJavascriptFile(e: any) {
        for(let file of e.target.files) {
            const text: string = await util.readTextFromFile(file);
            store.loadJavascript(text);
        };
        e.target.value = '';
    }
}
</script>

<style lang="sass" scoped>

.js-upload-button
    background: orange
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
