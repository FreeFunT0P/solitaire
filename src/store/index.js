import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    focusComponent: null,
    initGameDeck: [
      ['2Clubs.png', 2, 'C2', false], ['2Diamonds.png', 2, 'D1', false], ['2Hearts.png', 2, 'H1', false], ['2Spades.png', 2, 'S2', false],
      ['3Clubs.png', 3, 'C2', false], ['3Diamonds.png', 3, 'D1', false], ['3Hearts.png', 3, 'H1', false], ['3Spades.png', 3, 'S2', false],
      ['4Clubs.png', 4, 'C2', false], ['4Diamonds.png', 4, 'D1', false], ['4Hearts.png', 4, 'H1', false], ['4Spades.png', 4, 'S2', false],
      ['5Clubs.png', 5, 'C2', false], ['5Diamonds.png', 5, 'D1', false], ['5Hearts.png', 5, 'H1', false], ['5Spades.png', 5, 'S2', false],
      ['6Clubs.png', 6, 'C2', false], ['6Diamonds.png', 6, 'D1', false], ['6Hearts.png', 6, 'H1', false], ['6Spades.png', 6, 'S2', false],
      ['7Clubs.png', 7, 'C2', false], ['7Diamonds.png', 7, 'D1', false], ['7Hearts.png', 7, 'H1', false], ['7Spades.png', 7, 'S2', false],
      ['8Clubs.png', 8, 'C2', false], ['8Diamonds.png', 8, 'D1', false], ['8Hearts.png', 8, 'H1', false], ['8Spades.png', 8, 'S2', false],
      ['9Clubs.png', 9, 'C2', false], ['9Diamonds.png', 9, 'D1', false], ['9Hearts.png', 9, 'H1', false], ['9Spades.png', 9, 'S2', false],
      ['10Clubs.png', 10, 'C2', false], ['10Diamonds.png', 10, 'D1', false], ['10Hearts.png', 10, 'H1', false], ['10Spades.png', 10, 'S2', false],
      ['JackClubs.png', 11, 'C2', false], ['JackDiamonds.png', 11, 'D1', false], ['JackHearts.png', 11, 'H1', false], ['JackSpades.png', 11, 'S2', false],
      ['QueenClubs.png', 12, 'C2', false], ['QueenDiamonds.png', 12, 'D1', false], ['QueenHearts.png', 12, 'H1', false], ['QueenSpades.png', 12, 'S2', false],
      ['KingClubs.png', 13, 'C2', false], ['KingDiamonds.png', 13, 'D1', false], ['KingHearts.png', 13, 'H1', false], ['KingSpades.png', 13, 'S2', false],
      ['AceClubs.png', 14, 'C2', false], ['AceDiamonds.png', 14, 'D1', false], ['AceHearts.png', 14, 'H1', false], ['AceSpades.png', 14, 'S2', false]
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
        state.history.unshift('listAllCardFromMainDeckToListedDeck')
        for(let c = state.listedDeck.length; c > 0; c--){
          state.mainDeck.unshift(state.listedDeck.shift())
        }
      } else {
        state.listedDeck.unshift(state.mainDeck.shift())
        state.history.unshift({to:'mainDeck', from:'listedDeck', cont: 1})
      }
    },
    MOVE_CARD(state, to){
      try {
        if(to === 'resultDeck1' || to === 'resultDeck2' || to === 'resultDeck3' || to === 'resultDeck4'){
          if(state[to].length === 0 && state[state.focusComponent?.[1]]?.[0]?.[1] === 14){
            state[to].unshift(state[state.focusComponent?.[1]].shift())
            state.history.unshift({to:state.focusComponent?.[1], from:to, cont: 1})
          } else if(
            state?.[state.focusComponent?.[1]]?.[0]?.[2] === state[to]?.[0]?.[2]
            &&
            state?.[to]?.[0]?.[1]-1 === state[state.focusComponent?.[1]]?.[0]?.[1]
          ){
            state[to].unshift(state[state.focusComponent?.[1]].shift())
            state.history.unshift({to:state.focusComponent?.[1], from:to, cont: 1})
          }
        }
        if(to === 'shuffleDeck1' || to === 'shuffleDeck2' || to === 'shuffleDeck3'
          || to === 'shuffleDeck4' || to === 'shuffleDeck5' || to === 'shuffleDeck6'
          || to === 'shuffleDeck7'){
          if(
            state[to]?.[0]?.[1]-1 === state[state.focusComponent?.[1]][state.focusComponent?.[2]][1]
            &&
            state[state.focusComponent?.[1]]?.[state.focusComponent?.[2]]?.[2][1] !== state[to]?.[0]?.[2][1]
          ){
            if(state.focusComponent?.[1] === 'listedDeck'){
              state[state.focusComponent?.[1]][3] = true
            }
            let num = state.focusComponent?.[2]+1
            state[to] = [...state[state.focusComponent?.[1]].splice(0, num), ...state[to]]
            state.history.unshift({to:state.focusComponent?.[1], from:to, cont: num})
            if(state.focusComponent?.[1] === 'listedDeck'){
              state[to][0][3] = true
              console.log(state[to])
            }
          }
          if(state[to].length === 0){
            if(state.focusComponent[1] === 'listedDeck'){
              state.listedDeck[0][3] = true
            }
            let num = state.focusComponent?.[2]+1
            state[to] = [...state[state.focusComponent?.[1]].splice(0, num), ...state[to]]
            state.history.unshift({to:state.focusComponent?.[1], from:to, cont: num})
          }
        }
        if(state[state.focusComponent[1]].length > 0){
          state[state.focusComponent?.[1]][0][3] = true
        }
        state.focusComponent = null
      } catch (e){
        console.log(e)
      }
    },
    UNDO_MOVE(state){
      if(state.history.length !== 0){
        let move = state.history.shift()
        if(typeof move === 'string'){
          state.listedDeck = [...state.mainDeck.reverse()]
          state.mainDeck = []
          state.focusComponent = null
        } else {
          if(state[move.to][0]){
            state[move.to][0][3] = false
          }
          state[move.to] = [...state[move.from].splice(0, move.cont), ...state[move.to]]
          state.focusComponent =  null
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
            state[element].unshift(state.mainDeck.shift())
          }
          state[element][0][3] = true
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