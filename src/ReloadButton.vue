<template>
    <div class="reload-button-component">
        <button
            class="reload-button"
            @click="reload"
        >Reload</button>
    </div>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue';
import {
    Component,
    Vue,
} from 'vue-property-decorator';
import store from '@/store';

@Observer
@Component({
    components: {
    }
})
export default class extends Vue {
    public reload(): void {
        // HACK: recompute all derived lines by inserting
        // noop reducer into observable recuders array.
        // TODO: move functionality into file manager component
        // when developed.
        store.addReducer((records: any) => {
            return records;
        });
    }
}
</script>

<style lang="sass" scoped>

.reload-button
    background: purple 
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
