<template>
  <div class="cardSize ListedDeck">
    <img v-if="!$store.getters.listedDeck.length" src="@/assets/cards/emptySlot.png" alt="" class="noFocused">
    <img
        v-on:click="focus()"
        v-bind:class="{ focused: focusComponent === 'listedDeck', noFocused: focusComponent !== 'listedDeck' }"
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
    focus(){
      this.$store.commit('CHANGE_FOCUS', 'listedDeck')
    }
  },
  computed: {
    ...mapGetters([
      'listedDeck',
      'srcFaceCard',
      'focusComponent',
    ]),
    calculateLink: function () {
      return this.listedDeck[this.listedDeck.length-1][0]
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
