import {createStore} from 'vuex'
import Fetch from "@/utils/Fetch";
import cart from './modules/cart'

export default createStore({
    state: {
        names: [],
        goods: [],
        previousExchangeRate: 76,
        currentExchangeRate: 76,

    },

    mutations: {
        setGoods(state, goods) {
            state.goods = goods
        },
        setNames(state, names) {
            state.names = names
        },

        /**
         * Устанавливает прошлое и текущее значение круса в сторе
         * @param state
         * @param {Number} prev
         * @param {Number} current
         */
        setExchangeRates(state, [prev, current]) {
            state.previousExchangeRate = prev
            state.currentExchangeRate = current
        }

    },

    actions: {
        async loadData({commit}) {
            const response = await Fetch('./backend/data.json')
            if (response.Success) {
                commit('setGoods', response.Value?.Goods)
            } else {
                alert(response.Error)
            }
        },

        async loadNames({commit}) {
            const names = await Fetch('./backend/names.json')
            commit('setNames', names)
        }
    },

    getters: {
        categories(state) {
            return state.goods.reduce((acc, item) => {
                if (acc[item.G]) {
                    acc[item.G].push(item)
                } else {
                    acc[item.G] = [item]
                }
                return acc
            }, {})
        },

        /**
         * Возвращает статус изменения курса
         * @param state
         * @returns {string} up / down
         */
        exchangeRateStatus(state) {
            if (state.currentExchangeRate > state.previousExchangeRate) {
                return 'up'
            } else {
                return 'down'
            }
        },

        /**
         *
         * @param state
         * @returns {function(Number): string}
         */
        priceInRoubles(state) {
            return (usd) => {
                return (usd * state.currentExchangeRate).toFixed(2)
            }
        }

    },

    modules: {
        cart
    }

})
