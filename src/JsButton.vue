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
import * as util from '@/util';

@Observer
@Component({
    components: {
    }
})
export default class extends Vue {
    public readJavascriptFile(e: any): void {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const text: any = e.target.result;
            const reducer = util.evalFn(text);
            store.addReducer(reducer);
        };
        const file = e.target.files[0];
        reader.readAsText(file);
    }
}
</script>

<style lang="sass">

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
