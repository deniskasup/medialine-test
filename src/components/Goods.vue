<template>
    <div class="goods">
        <div class="goods__tabs">
            <div v-for="(category, categoryId) in categories"
                 @click="currentCategory = categoryId"
                 :key="categoryId"
                 class="goods__tabs-item"
                 :class="{active: +currentCategory === +categoryId}"
            >
                {{ names[categoryId].G }}
            </div>
        </div>
        <div v-if="currentCategory" class="goods__slider">
            <swiper :slides-per-view="2" :space-between="40">
                <swiper-slide v-for="good in categories[currentCategory]" :key="good.T">
                    <GoodsItem :names="names[currentCategory].B[good.T]" :key="quantityById(good.T)" :quantityProp="quantityById(good.T)" :good="good"/>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>
<script>
import GoodsItem from "@/components/GoodsItem"

import {mapGetters, mapState} from "vuex"
import {Swiper, SwiperSlide} from 'swiper/vue'
import "swiper/swiper.min.css"

export default {
    name: 'Goods',
    components: {
        GoodsItem,
        Swiper,
        SwiperSlide
    },
    data() {
        return {
            currentCategory: 1
        }
    },
    computed: {
        ...mapState({
            names: (state) => state.names
        }),
        ...mapGetters({
            quantityById: 'cart/quantityById',
            categories: 'categories'
        })
    }
}
</script>
<style lang="sass" scoped>
.goods
    display: grid
    grid-template-columns: 100%
    grid-gap: 30px

    &__slider
        & .swiper
            &-slide
                height: auto

    &__tabs
        padding: 0 24px
        background-color: #dcdcdc
        border: 1px solid white
        border-radius: 17px 17px 0 0
        display: flex
        align-items: center
        width: 100%
        grid-gap: 48px

        &-item
            position: relative
            padding: 15px 0
            color: #8D8D8D
            font-weight: 600
            transition: color .3s
            cursor: pointer

            &.active
                color: black

                &::after
                    width: 100%
</style>