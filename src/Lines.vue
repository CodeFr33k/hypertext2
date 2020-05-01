<template>
    <div>
        <div 
            v-for="line in reader.lines"
            class="line"
        >
            {{ line }}
        </div>             
    </div>
</template>
<script lang="ts">
import { Observer } from 'mobx-vue';
import {
    Component,
    Prop,
    Vue,
} from 'vue-property-decorator';

@Observer
@Component
export default class extends Vue {
    @Prop() readonly reader!: any
}
</script>
<style>

.line {
    border: 1px solid rgba(0,0,0,0.25);
    border-radius: 6px;
    margin-bottom: 15px;
    min-height: 26px;
    font-size: 20px;
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
