<template>
    <div class="cart">
        <h2>Корзина</h2>
        <table v-if="showTable">
            <thead>
            <tr>
                <th>Наименование</th>
                <th>Количество</th>
                <th>Цена</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <CartItem
                v-for="item in goods"
                :key="item"
                :quantityProp="item.quantity"
                :good="item.good"
            />
            </tbody>
            <tfoot>
            <tr>
                <td>Общая стоимость: {{ priceInRubles(totalPrice) }} ₽</td>
            </tr>
            </tfoot>
        </table>
    </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import CartItem from "@/components/CartItem";

export default {
    name: "Cart",
    components: {CartItem},
    computed: {
        showTable() {
            return !!Object.keys(this.goods).length
        },
        ...mapState({
            goods: (state) => state.cart.selectedGoods,
        }),
        ...mapGetters({
            priceInRubles: 'priceInRoubles',
            totalPrice: 'cart/totalPrice'
        })
    }
}
</script>

<style lang="sass" scoped>
table
    border: 1px solid
    width: 100%
    table-layout: fixed

    & th
        border-bottom: 1px solid

</style>