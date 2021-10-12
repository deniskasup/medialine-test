<template>
    <div class="good">
        <h4 class="good__title">{{ names.N }}</h4>
        <div class="good__balance">Остаток {{ good.P }}</div>
        <div class="good__price" :class="exchangeRateStatus">{{ priceInRubles(good.C) }} ₽</div>
        <div class="good__controls">
            <div v-if="quantity === 0" @click="quantity++" class="good__choose">Выбрать</div>
            <div v-else class="good__quantity">
                <div @click="quantity--" class="good__quantity--minus">-</div>
                <input class="good__quantity--num" type="text" v-model.number="quantity">
                <div @click="quantity++" class="good__quantity--plus">+</div>
            </div>
        </div>
    </div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
    name: "GoodsItem",
    props: {
        names: {
            type: Object,
            default: () => {
            }
        },
        good: {
            type: Object,
            default: () => {
            }
        },
        quantityProp: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            quantity: this.quantityProp,
        }
    },
    watch: {
        // чтобы не смогли ввести отрицательное значение и не больше остатка
        quantity(val) {
            if (val < 0) {
                this.quantity = 0
            } else if (val > this.good.P) {
                this.quantity = this.good.P
            } else {
                this.addToCart()
            }
        }
    },
    computed: {
        ...mapGetters({
            exchangeRateStatus: 'exchangeRateStatus',
            priceInRubles: 'priceInRoubles'
        })
    },
    methods: {

        addToCart() {
            this.$store.commit('cart/setGood', {
                good: this.good,
                quantity: this.quantity
            })
        },

    }
}
</script>

<style lang="sass" scoped>
.good
    background-color: aliceblue
    border-radius: 12px
    padding: 20px
    height: 100%
    display: flex
    flex-direction: column

    &__title
        margin: 0 0 20px

    &__balance
        margin-bottom: 15px

    &__price
        margin-bottom: 15px
        font-weight: 500
        display: flex
        align-items: center

        &.down
            &::after
                margin-left: 15px
                margin-bottom: 7px
                content: ''
                color: green
                border-bottom: 2px solid
                border-left: 2px solid
                width: 7px
                height: 7px
                transform: rotate(-45deg)

        &.up
            &::after
                margin-left: 15px
                margin-bottom: 0
                content: ''
                color: red
                border-bottom: 2px solid
                border-left: 2px solid
                width: 7px
                height: 7px
                transform: rotate(135deg)

    &__choose
        border: 1px solid
        display: flex
        align-items: center
        justify-content: center
        border-radius: 100px
        padding: 12px 24px
        cursor: pointer
        user-select: none

    &__controls
        margin-top: auto

    &__quantity
        padding: 12px 24px
        display: flex
        align-items: center
        justify-content: center
        background: #FFFFFF
        box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.05)
        border-radius: 100px
        user-select: none
        position: relative

        &--num
            text-align: center
            font-size: 17px
            width: 32px
            margin: 0 8px

        &--plus, &--minus
            user-select: none
            border-radius: 50%
            display: flex
            align-items: center
            justify-content: center
            width: 22px
            height: 22px
            cursor: pointer
            border: 1px solid

</style>