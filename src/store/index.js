import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    focusComponent: null,
    initGameDeck: [
      ['2Clubs.png', 2, 'C'], ['2Diamonds.png', 2, 'D'], ['2Hearts.png', 2, 'H'], ['2Spades.png', 2, 'S'],
      ['3Clubs.png', 3, 'C'], ['3Diamonds.png', 3, 'D'], ['3Hearts.png', 3, 'H'], ['3Spades.png', 3, 'S'],
      ['4Clubs.png', 4, 'C'], ['4Diamonds.png', 4, 'D'], ['4Hearts.png', 4, 'H'], ['4Spades.png', 4, 'S'],
      ['5Clubs.png', 5, 'C'], ['5Diamonds.png', 5, 'D'], ['5Hearts.png', 5, 'H'], ['5Spades.png', 5, 'S'],
      ['6Clubs.png', 6, 'C'], ['6Diamonds.png', 6, 'D'], ['6Hearts.png', 6, 'H'], ['6Spades.png', 6, 'S'],
      ['7Clubs.png', 7, 'C'], ['7Diamonds.png', 7, 'D'], ['7Hearts.png', 7, 'H'], ['7Spades.png', 7, 'S'],
      ['8Clubs.png', 8, 'C'], ['8Diamonds.png', 8, 'D'], ['8Hearts.png', 8, 'H'], ['8Spades.png', 8, 'S'],
      ['9Clubs.png', 9, 'C'], ['9Diamonds.png', 9, 'D'], ['9Hearts.png', 9, 'H'], ['9Spades.png', 9, 'S'],
      ['10Clubs.png', 10, 'C'], ['10Diamonds.png', 10, 'D'], ['10Hearts.png', 10, 'H'], ['10Spades.png', 10, 'S'],
      ['JackClubs.png', 11, 'C'], ['JackDiamonds.png', 11, 'D'], ['JackHearts.png', 11, 'H'], ['JackSpades.png', 11, 'S'],
      ['QueenClubs.png', 12, 'C'], ['QueenDiamonds.png', 12, 'D'], ['QueenHearts.png', 12, 'H'], ['QueenSpades.png', 12, 'S'],
      ['KingClubs.png', 13, 'C'], ['KingDiamonds.png', 13, 'D'], ['KingHearts.png', 13, 'H'], ['KingSpades.png', 13, 'S'],
      ['AceClubs.png', 14, 'C'], ['AceDiamonds.png', 14, 'D'], ['AceHearts.png', 14, 'H'], ['AceSpades.png', 14, 'S']
    ],
    mainDeck: [],
    listedDeck: [],
    resultDeck1:[],
    resultDeck2:[],
    resultDeck3:[],
    resultDeck4:[],
    shuffleDeck1:[],
    shuffleDeck2:[],
    shuffleDeck3:[],
    shuffleDeck4:[],
    shuffleDeck5:[],
    shuffleDeck6:[],
    shuffleDeck7:[],
    history:[],
  },
  getters: {
    initGameDeck: state => state.initGameDeck,
    mainDeck: state => state.mainDeck,
    listedDeck: state => state.listedDeck,
    srcFaceCard: state => state.srcFaceCard,
    resultDeck1: state => state.resultDeck1,
    resultDeck2: state => state.resultDeck2,
    resultDeck3: state => state.resultDeck3,
    resultDeck4: state => state.resultDeck4,
    focusComponent: state => state.focusComponent,
    shuffleDeck1: state => state.shuffleDeck1,
    shuffleDeck2: state => state.shuffleDeck2,
    shuffleDeck3: state => state.shuffleDeck3,
    shuffleDeck4: state => state.shuffleDeck4,
    shuffleDeck5: state => state.shuffleDeck5,
    shuffleDeck6: state => state.shuffleDeck6,
    shuffleDeck7: state => state.shuffleDeck7,
  },
  mutations: {
    CHANGE_FOCUS(state, focusedComponentArr) {
      state.focusComponent = focusedComponentArr
    },
    LIST_DECK(state) {
      if(state.mainDeck.length === 0){
        state.history.push('ListMainDeck')
        for(let c = state.listedDeck.length; c > 0; c--){
          state.mainDeck.push(state.listedDeck.pop())
        }
      } else {
        state.listedDeck.push(state.mainDeck.pop())
        state.history.push({to:'mainDeck', from:'listedDeck'})
      }
    },
    MOVE_CARD(state, to){
      if(state[to].length === 0 && state[state.focusComponent][state[state.focusComponent].length-1][1] === 14){
        state[to].push(state[state.focusComponent].pop())
        state.history.push({to:state.focusComponent, from:to})
      }
      try {
        if(state[state.focusComponent][state[state.focusComponent].length-1][2] === state[to]?.[state[to].length-1]?.[2]
          &&
          state[to]?.[state[to].length-1]?.[1]-1 === state[state.focusComponent][state[state.focusComponent].length-1][1]){
          state[to].push(state[state.focusComponent].pop())
          state.history.push({to:state.focusComponent, from:to})
        }
      } catch (err){
        if(err.message === 'Cannot read properties of undefined (reading \'2\')'){
          console.log('')
        }
      }
    },
    UNDO_MOVE(state){
      if(state.history.length !== 0){
        let move = state.history.pop()
        if(typeof move !== 'string'){
          state[move.to].push(state[move.from].pop())
        } else {
          for(let c = state.mainDeck.length; c > 0; c--){
            state.listedDeck.push(state.mainDeck.pop())
          }
        }
      }
    },
    INIT_GAME(state, arr){
      let j, x, temp;
      temp = JSON.parse( JSON.stringify(arr) )
      for(let i = temp.length - 1; i > 0; i--){
        j = Math.floor(Math.random()*(i + 1));
        x = temp[j];
        temp[j] = temp[i];
        temp[i] = x;
      }
      state.mainDeck = temp

      let shuffleDecks = ['shuffleDeck1', 'shuffleDeck2', 'shuffleDeck3', 'shuffleDeck4', 'shuffleDeck5', 'shuffleDeck6', 'shuffleDeck7']
      let counter = 1
      shuffleDecks.forEach(
        element => {
          for(let x = counter; x > 0; x--){
            state[element].push(state.mainDeck.pop())
          }
          counter++
        }
      )
    },
    CLEAR_GAME_ARR(state){
      state.mainDeck = []
      state.listedDeck = []
      state.resultDeck1 = []
      state.resultDeck2 = []
      state.resultDeck3 = []
      state.resultDeck4 = []
      state.shuffleDeck1 = []
      state.shuffleDeck2 = []
      state.shuffleDeck3 = []
      state.shuffleDeck4 = []
      state.shuffleDeck5 = []
      state.shuffleDeck6 = []
      state.shuffleDeck7 = []
      state.history = []
    }
  },
  actions: {
  },
  modules: {
  },
})