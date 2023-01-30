import { inject, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { useSessionStore } from './session';


export const useConversationsStore = defineStore('conversations', () => {
  const session = useSessionStore();
  const state = reactive({
    channel: {},
    messages: [],
    memberMessages:[],
    post: {},
    put: {},
    
  })
  async function getMemberMessages(id){
    state.memberMessages = state.messages.filter(o =>o.member_id ===id).slice(0,10);
    console.log(state.memberMessages)
}

return { state,getMemberMessages}

}, {
  persist: true,
})
  

 
 

