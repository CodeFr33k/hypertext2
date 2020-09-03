<template>
    <div
        v-if="store.data.saveEnabled"
        class="save-button-component"
    >
        <button
            class="save-button"
            @click="save"
        >Save</button>
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
    store = store;
    public save(): void {
        const text = store.encodeAppData();
        const filename = store.title.get() + '.appdata';
        util.download(text, filename);
    }
}
</script>

<style lang="sass" scoped>

.save-button
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
    font-size: 16px
    cursor: pointer
    border: 0

</style>
