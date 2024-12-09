import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Socket } from 'socket.io-client'

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
    rotatePiece
  }
})