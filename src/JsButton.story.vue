<template>
    <JsButton></JsButton>
</template>

<script lang="ts">
import JsButton from './JsButton.vue';
import {
    Component,
    Vue,
} from 'vue-property-decorator';

@Component({
    components: { JsButton },
})
export default class extends Vue {
};
</script>

