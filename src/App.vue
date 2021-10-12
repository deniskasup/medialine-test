<template>
    <div class="wrapper">
        <Goods/>
        <Cart/>
    </div>
</template>

<script>
import Goods from "@/components/Goods";
import {mapActions} from "vuex";
import Cart from "@/components/Cart";

export default {
    name: 'App',
    components: {Cart, Goods},
    data() {
        return {
            lastRate: 76
        }
    },
    async mounted() {
        await this.loadNames()
        await this.loadData()
        setInterval(this.updateExchangeRateAndData, 15000)
    },
    methods: {

        ...mapActions({
            loadNames: 'loadNames',
            loadData: 'loadData'
        }),

        getRandomInt(min, max) {
            min = Math.ceil(min)
            max = Math.floor(max)
            return Math.floor(Math.random() * (max - min + 1)) + min
        },

        updateExchangeRateAndData() {
            const randomRate = this.getRandomInt(20, 80)
            this.$store.commit('setExchangeRates',
                [this.lastRate, randomRate],
            )
            this.lastRate = randomRate
            this.loadData()
        }


    }
}
</script>

<style lang="sass">
html
    font-size: 14px

*
    box-sizing: border-box

.wrapper
    margin: 0 auto
    width: 100%
    max-width: 1200px
    display: flex
    padding: 0 20px
    flex-direction: column
</style>
