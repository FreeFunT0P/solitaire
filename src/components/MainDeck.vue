<template>
  <div
   class="cardSize MainDeck"
   v-on:click="list()"
  >
    <img src="@/assets/cards/shirt.png" alt="" class="noFocused">
  </div>
</template>

<script>

export default {
  name: 'MainDeck',
  components: {
  },
  data() {
    return {
    }
  },
  methods: {
    list(){
      this.$store.commit('LIST_DECK')
      this.$store.commit('CHANGE_FOCUS', null)
    },
  },
}
</script>

<style>
.MainDeck{}
.cardSize{
  display: inline-block;
  box-sizing: border-box;
  background-size: contain;
  width: 100px;
  height: 141px;
}
img{
  width: 100%;
  height: 100%;
}
.noFocused{
  border: 5px solid darkgreen;
}
</style>

