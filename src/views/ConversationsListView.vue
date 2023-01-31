<script setup>
import { useSessionStore } from '@/stores/session';
import { onMounted } from '@vue/runtime-core';
import Conversation from '@/components/Conversation.vue';
const session = useSessionStore();
const conversationsList = ref([]);

onMounted(() => {
  if (session.isValid()) {
    console.log("we can work now ")
  }
  console.log('list of conversations')
  getConversations()

})

function getConversations() {
  api.get(`channels?token=${session.data.token}`).then(response => {
    console.log(response)
    conversationsList.value = response
  })
}


</script>
<template>
  <main>
    <h1 class="title has-text-link">List of conversations</h1>
    <div> <router-link to="/createConversation" class="button is-info">Create a new conversation</router-link></div>
    <div>


      <template v-for=" conversation in conversationsList" :key="conversation.id">
        <Conversation :conversation="conversation"></Conversation>


      </template>

    </div>
  </main>
</template>