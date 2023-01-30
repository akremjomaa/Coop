import { inject, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { useSessionStore } from './session';


export const useMembersStore = defineStore('members', () => {
  const session = useSessionStore();
  const state = reactive({
    members:[],
    member:{}
  })
  async function getMembers(){
    const response=  await api.get(`members?token=${session.data.token}`);
        const d = await response;
        state.members = d;
        console.log(state.members)
  }

async function getMemberName(id){
 await getMembers()
 state.member=  state.members.find(o => o.id == id);
    console.log(state.member)

}
return { state, getMembers, getMemberName}

}, {
  persist: false,
})
  

 
 

