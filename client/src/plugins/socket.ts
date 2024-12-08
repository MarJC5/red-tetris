import { reactive } from 'vue'
import { io, Socket } from 'socket.io-client'
import type { App } from 'vue';

interface State {
  connected: boolean;
}

export const state = reactive<State>({
  connected: false,
})

const URL = import.meta.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000'

export const socket: Socket = io(URL)

socket.on('connect', () => {
  state.connected = true
})

socket.on('disconnect', () => {
  state.connected = false
})

export interface SocketIOPluginOptions {}

export default {
  install: (app: App, options?: SocketIOPluginOptions) => {
    app.config.globalProperties.$socket = socket
    app.provide('socket', socket)
  }
}

// Type augmentation for Vue
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $socket: Socket
  }
}