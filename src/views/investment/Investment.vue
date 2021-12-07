<template>
    <div>
        <pc-investment v-if="responsive == 'PC'|| responsive == 'pad' "></pc-investment>
        <mobile-investment v-if="responsive == 'mobile'"></mobile-investment>
    </div>
</template>
<script>
import Vue from 'vue';
import { mapGetters} from "vuex";
import PcInvestment from "./pc/Investment.vue";
import MobileInvestment from "./mobile/Investment.vue";
export default {
    data() {
        return {
        }
    },
    created() {
    },
    mounted() {

    },
    computed: {
        ...mapGetters(["responsive"]),
    },
    components: {
        PcInvestment,
        MobileInvestment,
    },
    watch: {

    },
    methods: {

    },
}
</script>
<style lang="scss" scoped>

</style>