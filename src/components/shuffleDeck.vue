<template>
  <div class="cardSize">
    <template v-if="$store.getters[deckName].length">
      <card-component
        v-for="(item, idx) in $store.getters[deckName]"
        :key="item[0]"
        :style="{
          top: `${(idx * top)}px`,
          left: `${(idx * left)}px`,
          zIndex: `${($store.getters[deckName].length)}` - 1 - idx
        }"
        v-bind:cardArr="item"
        :deckName="deckName"
        :idx="idx"
        class="card shirts cardSizeForShirt front"
      />
    </template>
    <template v-else>
      <img src="@/assets/cards/emptySlot.png" alt="" class="crunch"
        @click="moveToEmpty()"
      />
    </template>
  </div>
</template>

<script>
import cardComponent from '@/components/cardComponent'

export default {
  name: 'shuffleDeck',
  components:{
    cardComponent,
  },
  props: {
    deckName: String
  },
  data() {
    return {
      top: -20,
      left: 5,
    }
  },
  methods:{
    moveToEmpty(){
      this.$store.commit('MOVE_CARD', this.deckName)
    },
  }
}
</script>

<style>
.crunch{
  position: relative;
  top: 0;
  left: 20px;
}
.card {
  display: block;
}
.front {
  position: absolute;
  z-index: 20;
}
.cardSize{
  position: relative;
}
.cardSizeForShirt{
  height: 141px;
  width: 100px;
  position: absolute;
  border: 5px solid transparent;
}
.focused{
  border: 5px solid black;
}
.noFocused{
  border: 5px solid transparent;
}
</style>

