import { reactive } from 'vue'
import { defineStore } from 'pinia'


export const useConversationsStore = defineStore('conversations', () => {
  const state = reactive({
    channel: {},
    messages: [],
    memberMessages: [],

  })
  async function getMemberMessages(id) {
    state.memberMessages = state.messages.filter(o => o.member_id === id).slice(0, 10);
  }

  return { state, getMemberMessages }

}, {
  persist: true,
})





