export default {

    namespaced: true,

    state: {
        selectedGoods: {},
    },

    mutations: {
        /**
         *
         * @param state
         * @param {Object} good
         * @param {Number} quantity
         */
        setGood(state, {good, quantity}) {
            if (quantity <= 0) {
                delete state.selectedGoods[good.T]
            } else {
                state.selectedGoods[good.T] = {
                    good,
                    quantity
                }
            }
        },
    },
    getters: {

        /**
         * Возвращает количество товара в корзине по его ID
         * @param state
         * @returns {function(*): (function(*): void)|number|*}
         */
        quantityById(state) {
            return (id) => {
                return state.selectedGoods[Object.keys(state.selectedGoods).find(i => +i === +id)]?.quantity
            }
        },


        totalPrice(state) {
            return Object.values(state.selectedGoods).reduce((acc, item) => {
                acc = acc + (item.good.C * item.quantity)
                return acc
            }, 0)
        }
    }
}