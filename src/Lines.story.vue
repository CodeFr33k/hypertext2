<template>
    <Lines :reader="reader"></Lines>
</template>

<script lang="ts">
import Lines from './Lines.vue';
import {
    Component,
    Vue,
} from 'vue-property-decorator';

@Component({
    components: { Lines },
})
export default class extends Vue {
    reader = {
        lines: [
            'abc',
            'def',
            'ghi',
        ]
    };
};
</script>

