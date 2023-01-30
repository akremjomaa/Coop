<script setup>
import {useSessionStore} from '@/stores/session';
import { onMounted } from '@vue/runtime-core';
import { useRoute } from 'vue-router';

const session = useSessionStore();
const conversationsList = ref([]);
const showModal =ref(false);
const route = useRoute()

onMounted(()=>{
    console.log('list of conversations')
    getConversations()
   
})

function getConversations(){
    api.get(`channels?token=${session.data.token}`).then(response => {
        console.log(response)
        conversationsList.value = response
    })
}
function deleteConversation(id){
  api.delete(`channels/${id}?token=${session.data.token}`).then(response => {
    conversationsList.value = response
        window.location.reload()
    })

}
// function openModal(){
//     showModal.value = true
//     console.log(showModal.value)
//     console.log("go")
// }
// function createConversation(){
//     api.post(``)
// }
</script>
<template>
     <main>
    <h1 class="title has-text-link">List of conversations</h1>
   <div> <router-link to="/createConversationView" class="button is-info">Create a new conversation</router-link></div>
    <div>
    
    
    <template v-for = " conversation in conversationsList" :key= "conversation.id">
      <div class="box column is-9 is-offset-2-desktop is-flex is-desktop " :data-id= "conversation.id">
    <div class="column is-10  is-desktop" ><router-link :to = "`/oneConversationView/${conversation.id}`">
        <h2 class="subtitle">{{conversation.topic}}</h2>
        <h6 class="subtitle">{{conversation.label}}</h6>
      </router-link>
    </div>
    <button @click="deleteConversation(conversation.id)" type ='button' class="button is-link is-outlined">🗑️</button>

  </div>

    </template>

  </div>
  </main>
</template>