import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { useSessionStore } from './session';


export const useMembersStore = defineStore('members', () => {
  const session = useSessionStore();
  const state = reactive({
    members: []
  })
  async function getMembers() {
    const response = await api.get(`members?token=${session.data.token}`);
    const d = await response;
    state.members = d;
  }

  return { state, getMembers }

}, {
  persist: false,
})





