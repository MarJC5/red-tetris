import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { Socket, io } from 'socket.io-client'

export const useGameStore = defineStore('game', () => {
  const board = ref<number[][]>([])
  const currentPiece = ref(null)
  const nextPiece = ref(null)
  const players = ref<string[]>([])
  const isLeader = ref<boolean>(false)
  const gameStarted = ref<boolean>(false)
  const score = ref<number>(0)
  const x = ref<number>(0)
  const y = ref<number>(0)
  const speed = ref<number>(0)
  const gameOver = ref<boolean>(false)
  const userSocket = ref<Socket | null>(null);
  
  const setSocket = () => {
    try {
      userSocket.value = io('http://localhost:3000')
  
      userSocket.value.on('connect', () => {
        console.log('Connected to server')
      })
  
      userSocket.value.on('disconnect', () => {
        console.log('Disconnected from server')
      })
      return true;
    } catch (error) {
      console.error('Socket initialization failed:', error)
      return false;
    }
  }
  
  const deleteSocket = () => {
    if (userSocket.value != null) {
      userSocket.value.disconnect()
      userSocket.value = null;
      return false;
    }
    return true;
  }

  const getSocket = () => {
      return userSocket.value;
  }

  const currentPlayerBoard = computed(() => {
    // Merge current piece with board
    return board.value
  })

  const joinGame = (roomId: string, playerName: string) => {
    // Join game logic
  }

  const startGame = () => {
    // Start game logic
  }

  const movePiece = (direction: 'left' | 'right' | 'down') => {
    // Move piece logic
  }

  const rotatePiece = () => {
    // Rotate piece logic
  }

  return {
    board,
    currentPiece,
    nextPiece,
    players,
    isLeader,
    gameStarted,
    score,
    x,
    y,
    speed,
    gameOver,
    currentPlayerBoard,
    joinGame,
    startGame,
    movePiece,
    rotatePiece,
    userSocket,
    setSocket,
    getSocket,
    deleteSocket
  }
})