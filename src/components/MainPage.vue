<template>
  <div class="main">
    <div class="undoButton" v-on:click="undoMove">
      <p style="margin: 0">Отменить ход</p>
    </div>
    <div class="restartButton" v-on:click="restart">
      <p style="margin: 0">Раздать заново</p>
    </div>
    <div class="resultDecksWrapper">
      <result-deck deck-name='resultDeck1' />
      <result-deck deck-name='resultDeck2' />
      <result-deck deck-name='resultDeck3' />
      <result-deck deck-name='resultDeck4' />
    </div>
    <div class="listedDecksWrapper">
      <main-deck />
      <listed-deck />
    </div>
    <div class="ShuffleDeckWrapper">
      <shuffle-deck deck-name='shuffleDeck1' />
      <shuffle-deck deck-name='shuffleDeck2' />
      <shuffle-deck deck-name='shuffleDeck3' />
      <shuffle-deck deck-name='shuffleDeck4' />
      <shuffle-deck deck-name='shuffleDeck5' />
      <shuffle-deck deck-name='shuffleDeck6' />
      <shuffle-deck deck-name='shuffleDeck7' />
    </div>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'
import MainDeck from '@/components/MainDeck'
import ListedDeck from '@/components/ListedDeck'
import resultDeck from '@/components/resultDeck'
import shuffleDeck from '@/components/shuffleDeck'

export default {
  name: 'MainPage',
  components: {
    ListedDeck,
    MainDeck,
    resultDeck,
    shuffleDeck,
  },
  data () {
    return {
      showModal: false,
    }
  },
  computed: {
    ...mapGetters([
      'initGameDeck',
    ]),
  },
  methods: {
    undoMove(){
      this.$store.commit('UNDO_MOVE')
    },
    init(){
      this.$store.commit('INIT_GAME', this.initGameDeck)
    },
    restart(){
      this.$store.commit('CLEAR_GAME_ARR')
      this.$store.commit('INIT_GAME', this.initGameDeck)
    }
  },
  created() {
    this.init();
  },
  mounted() {
    const self = this.undoMove.bind(this.$el)
    document.addEventListener('keydown', function(event) {
      if (event.code === 'KeyZ' && (event.ctrlKey || event.metaKey)){
        self()
      }
    });
  }
}



</script>

<style>
.main{
  height: 100vh;
  width: 100vw;
  background-color: green;
  margin: 0;
  padding: 0;
}
.resultDecksWrapper{
  text-align: center;
}
.ShuffleDeckWrapper{
  text-align: center;
  margin-top: 40px;
}
.undoButton{
  margin: 20px 0 0 100px;
  display: inline-block;
  width: 150px;
  height: 20px;
  background-color: darkgreen;
  text-align: center;
}
.undoButton:hover{
  cursor: pointer;
  background-color: #004008;
}
.restartButton{
   margin: 20px 0 0 20px;
   display: inline-block;
   width: 150px;
   height: 20px;
   background-color: darkgreen;
   text-align: center;
 }
.restartButton:hover{
  cursor: pointer;
  background-color: #004008;
}

</style>
