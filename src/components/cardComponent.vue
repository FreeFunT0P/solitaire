<template>
  <div
    :class="[
      'cardSize',
      focusComponent?.[0][0] === cardName ? 'focused' : '',
    ]"
  >
    <img
      v-if="cardArr[3]"
      :src="require(`@/assets/cards/face/${cardName}`)"
      alt=""
      @click="focusCard()"
    />
    <img
      v-else
      src="@/assets/cards/shirt.png"
      alt=""
    >
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import eventBus from '@/helpers/event-bus'

export default {
  name: 'cardComponent',
  props: {
    cardArr: Array,
    deckName: String,
    idx: Number,
  },
  computed: {
    ...mapGetters([
      'focusComponent',
    ]),
    cardName() {
      return this.cardArr[0]
    },
    // openCard() {
    //   console.log( this.cardArr[3] )
    //   return this.cardArr[3]
    // },
  },
  methods: {
    focusCard(){
      if (this.focusComponent !== null) {
        if(this.focusComponent?.[0]?.[0] === this.cardName){
          this.$store.commit('CHANGE_FOCUS', null)
        } else {
          this.$store.commit('MOVE_CARD', this.deckName)
        }
      } else{
        this.$store.commit('CHANGE_FOCUS', [this.cardArr, this.deckName, this.idx])
      }
    }
  },
  watch: {
    cardArr: {
      handler() {
        console.log( this.cardArr[3] )
      },
      deep: true
    },
  },
  created() {
    eventBus.$on('reset-move', () => { this.$forceUpdate() })
  },
}
</script>

<style>
.cardSize{
  height: 141px;
  width: 100px;
  border: 5px solid transparent;
}
.focused{
  border: 5px solid black;
}
</style>