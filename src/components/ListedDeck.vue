<template>
  <div class="cardSize ListedDeck">
    <img v-if="!$store.getters.listedDeck.length" src="@/assets/cards/emptySlot.png" alt="" class="noFocused">
    <img
        v-on:click="focusCard()"
        v-bind:class="{ focused: focusComponent?.[1] === 'listedDeck', noFocused: focusComponent?.[1] !== 'listedDeck' }"
        v-else :src="require(`@/assets/cards/face/${calculateLink}`)"
        alt=""
    >
  </div>
</template>


<script>

import {mapGetters} from 'vuex'


export default {
  name: 'ListedDeck',
  components: {
  },
  data() {
    return {
    }
  },
  methods: {
    focusCard(){
      this.$store.commit('CHANGE_FOCUS', [this.listedDeck[0], 'listedDeck', 0])
    }
  },
  computed: {
    ...mapGetters([
      'listedDeck',
      'srcFaceCard',
      'focusComponent',
    ]),
    calculateLink: function () {
      return this.listedDeck[0][0]
    }
  },
  watch: {
  }
}
</script>


<style>
.ListedDeck{}
.cardSize{
  display: inline-block;
  box-sizing: border-box;
  background-size: contain;
  width: 100px;
  height: 141px;
  margin: 20px;
}
.focused{
  border: 5px solid black;
}
.noFocused{
  border: 5px solid darkgreen;
}
</style>
