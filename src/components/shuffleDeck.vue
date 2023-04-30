<template>
  <div class="cardSize">
    <template v-if="$store.getters[deckName].length">
      <img
        v-for="idx in $store.getters[deckName].length-1"
        :key="idx"
        :style="{
          top: `${(idx * top)}px`,
          left: `${(idx * left)}px`,
          zIndex: `${($store.getters[deckName].length)}` - 1 - idx
        }"
        class="card shirts cardSizeForShirt"
        src="@/assets/cards/shirt.png"
        alt=""
      />
      <img
        :src="require(`@/assets/cards/face/${calculateLink}`)"
        alt=""
        :class="[
        'card front',
        focusComponent === this.deckName ? 'focused' : '',
        focusComponent !== this.deckName ? 'noFocused' : ''
      ]"
        @click="focus()"
      />
    </template>
    <template v-else>
      <img src="@/assets/cards/emptySlot.png" alt="" class="card noFocused" />
    </template>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'shuffleDeck',
  props: {
    deckName: String
  },
  data() {
    return {
      top: -20,
      left: 5,
    }
  },
  methods: {
    focus(){
      this.$store.commit('CHANGE_FOCUS', this.deckName)
    }
  },
  computed: {
    ...mapGetters([
      'focusComponent',
    ]),

    calculateLink: function () {
      return this.$store.getters[this.deckName]?.[this.$store.getters[this.deckName].length-1]?.[0]
    },
  },
}
</script>

<style>
.card {
  display: block;
}
.front {
  position: absolute;
  z-index: 20;
}
.cardSize{
  height: 141px;
  width: 100px;
  margin: 20px;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  background-size: contain;
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

/*.shirts:nth-of-type(1){*/
/*  !*bottom: 124px;*!*/
/*  z-index: 6;*/
/*}*/
/*.shirts:nth-of-type(2){*/
/*  !*bottom: 144px;*!*/
/*  z-index: 5;*/
/*}*/
/*.shirts:nth-of-type(3){*/
/*  !*bottom: 164px;*!*/
/*  z-index: 4;*/
/*}*/
/*.shirts:nth-of-type(4){*/
/*  !*bottom: 184px;*!*/
/*  z-index: 3;*/
/*}*/
/*.shirts:nth-of-type(5){*/
/*  !*bottom: 204px;*!*/
/*  z-index: 2;*/
/*}*/
/*.shirts:nth-of-type(6){*/
/*  !*bottom: 224px;*!*/
/*  z-index: 1;*/
/*}*/
</style>

