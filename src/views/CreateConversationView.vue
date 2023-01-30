<script setup>
import {useSessionStore} from '@/stores/session';
import router from '../router';

const session = useSessionStore();
let conversation = reactive({
    topic: '',
    label: '',
})
function createConversation(){
    api.post(`channels?token=${session.data.token}`, {
        body: conversation
    }).then(response => {
        console.log(response)
        if (response.message) {
            alert(response.message)
        } else {
            console.log(response)
            if (confirm("La conversation est ajoutée  avec succés")) {
                router.push('/conversationsList');
            }
        } {

        }
    }).catch(error => console.log(error))
}
</script>
<template>
    
    <main class="form">
    
        <h1 class="title">Create a conversation</h1>
        <form class="box" @submit.prevent="createConversation">
          
            <div class="field">
                <label class="label">Topic</label>
                <div class="control has-icons-left has-icons-right">
                    <input class="input" v-model="conversation.topic" required="required" type="text"
                        placeholder="Topic">

                </div>
            </div>

            <div class="field">
                <label class="label">Label</label>
                <div class="control has-icons-left has-icons-right">
                    <input class="input " v-model="conversation.label" required="required" type="text"
                        placeholder="Label">
                </div>
            </div>

            <div class="field is-grouped">
                <div class="control">
                    <button class="button is-link" type="submit">Create this conversation </button>
                </div>
            </div>
        </form>
      
    </main>
 
<!-- <div class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Modal title</p>
        <button class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
     
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success">Save changes</button>
        <button class="button">Cancel</button>
      </footer>
    </div>
  </div> -->
  </template>
