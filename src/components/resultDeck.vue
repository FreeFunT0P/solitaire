<template>
  <div class="cardSize resultDeck1"
    v-on:click="moveCard()"
  >
    <img v-if="!$store.getters[deckName].length" src="@/assets/cards/emptySlot.png" alt="">
    <img v-else :src="require(`@/assets/cards/face/${calculateLink}`)" alt="" >
  </div>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
  name: "resultDeck",
  props: {
    deckName: String
  },
  data() {
    return {
    }
  },
  methods: {
    moveCard(){
      if (this.focusComponent !== null) {
        this.$store.commit('MOVE_CARD', this.deckName)
      }
    }
  },
  computed: {
    ...mapGetters([
      'focusComponent',
    ]),
    calculateLink: function () {
      return this.$store.getters[this.deckName]?.[0]?.[0]
    },
  },
  watch: {
  }
}
</script>

<style>
.resultDeck1{}
.cardSize{
  display: inline-block;
  box-sizing: border-box;
  background-size: contain;
  width: 100px;
  height: 141px;
}
</style>