<template>
    <tr>
        <td>{{ names[good.G].B[good.T].N }}</td>
        <td>
            <div class="quantity">
                <div @click="quantity--" class="quantity__minus">-</div>
                <input class="quantity__num" type="text" v-model.number="quantity">
                <div @click="quantity++" class="quantity__plus">+</div>
            </div>
        </td>
        <td>
            {{ priceInRubles(good.C) }} ₽/шт.
        </td>
        <td>
            <button @click.prevent="quantity = 0">Удалить</button>
        </td>
    </tr>
</template>

<script>
import {mapGetters, mapState} from "vuex";

export default {
    name: "CartItem",
    props: {
        good: {
            type: Object,
            default: () => {
            }
        },
        quantityProp: {
            type: Number,
        }
    },
    data() {
        return {
            quantity: this.quantityProp
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
        ...mapState({
            names: (state) => state.names,
        }),

        ...mapGetters({
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
td
    padding: 10px

    border: 1px solid

.quantity
    padding: 12px 24px
    display: flex
    align-items: center
    justify-content: center
    background: #FFFFFF
    box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.05)
    border-radius: 100px
    user-select: none
    position: relative

    &__num
        text-align: center
        font-size: 17px
        width: 32px
        margin: 0 8px

    &__plus, &__minus
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