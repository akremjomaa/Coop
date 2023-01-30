<script setup>
import { onMounted, ref } from 'vue';
import {useSessionStore} from '@/stores/session';
import router from '../router';


const session = useSessionStore();

const membersList = ref(null);

onMounted(() => {
  console.log('welcome')
   getMembers();
  
})
 function getMembers() {
   
    api.get('members',session.data.token).then((memberList) => {
        membersList.value = memberList
    })

    } 
    function deleteMember(id){
      api.delete(`members/${id}?token=${session.data.token}`,id,session.data.token).then((memberList) => {
        membersList.value = memberList
        window.location.reload()

    })

    }
    async function deleteOtherMember(id){
      if (id === session.data.member.id){
        alert("You can't delete your own account !")
      }
      else{
       await deleteMember(id);
      }
    }
</script>

<template >
  <main>
    <h1 class="title has-text-link">List of membres</h1>
    <div>
    
    
    <template v-for = " member in membersList" :key= "member.id">
      <div class="box column is-9 is-offset-2-desktop is-flex is-desktop " :data-id= "member.id">
    <div class="column is-10  is-desktop" >
        <h2 class="subtitle">{{member.fullname}}</h2>
        <h6 class="subtitle is-link"><a href='mailto:{{member.email}}'>{{member.email}}</a></h6>
        
    </div>
    <div class="column is-1 is-desktop"><router-link :to = "`/oneMember/${member.id}`" class="button is-link is-outlined">👤</router-link></div>
    <button @click="deleteOtherMember(member.id)" type ='button' class="button is-link is-outlined">🗑️</button>
  </div>
    </template>
  
  </div>
  </main>
</template>
