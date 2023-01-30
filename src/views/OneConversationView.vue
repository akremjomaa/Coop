<script setup>

import { useSessionStore } from '@/stores/session';
import { onMounted} from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import { useConversationsStore } from '../stores/conversations';

import Message from '@/components/Message.vue';

const session = useSessionStore();
const conversation = useConversationsStore();

const route = useRoute()

onMounted(() => {
    console.log('one conversation')
    getConversations()
    getMessages()
})

function getConversations() {
    api.get(`channels/${route.params.id}?token=${session.data.token}`).then(response => {
        console.log(response)
        conversation.state.channel = response
    })
}
function getMessages() {
    api.get(`channels/${route.params.id}/posts?token=${session.data.token}`).then(response => {
        console.log(response)
        conversation.state.messages = response
    })
}
function postMessage() {
    api.post(`channels/${route.params.id}/posts?token=${session.data.token}`, {
        body: conversation.state.post
    }).then(response => {
        console.log(response)
        if (response.message) {
            alert(response.message)
            window.location.reload()
            conversation.state.post.message = ""
        } else {
            console.log(response)
        }
    }).catch(error => console.log(error))

}
// function deleteMessage(id) {
//     api.delete(`channels/${route.params.id}/posts/${id}?token=${session.data.token}`).then(response => {
//         conversation.state.messages = response
//         window.location.reload()
//     })

// }


</script>
<template>
    <main>
        <h1 class="title has-text-link">One conversation</h1>
        <div>
            <h2 class="title has-text-dark">{{ conversation.state.channel.topic }}</h2>
            <h2 class="title has-text-dark">{{ conversation.state.channel.label }}</h2>
        </div>
        <div>
            <template v-for="message in conversation.state.messages" :key="message.id">
                <Message :message="message" :conversation="conversation"></Message>
            </template>
            

            <div class=" column is-7 control columns">
                <form @submit.prevent="postMessage">
                                <input class="input is-focused column is-four-fifths"
                                    v-model="conversation.state.post.message" type="text"
                                    >
                                <button class="button is-info column is-1">Send</button>
                            </form>

                            </div>
            


        </div>



    </main>
</template>