import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Socket } from 'socket.io-client'

export const useGameStore = defineStore('game', () => {
  const board = ref<number[][]>([])
  const currentPiece = ref(null)
  const players = ref<string[]>([])
  const isLeader = ref(false)
  const gameStarted = ref(false)
  
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
    players,
    isLeader,
    gameStarted,
    currentPlayerBoard,
    joinGame,
    startGame,
    movePiece,
    rotatePiece
  }
})