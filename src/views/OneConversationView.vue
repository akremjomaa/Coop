<script setup>

import { useSessionStore } from '@/stores/session';
import { onMounted, reactive } from '@vue/runtime-core';
import { useRoute } from 'vue-router';

import Message from '@/components/Message.vue';

const session = useSessionStore();

const route = useRoute()
let state = reactive({
    channel: {},
    messages: [],
    postMessage: {},
    visible: false


})
onMounted(() => {
    console.log('one conversation')
    getConversation()
    getMessages()
})

function getConversation() {
    api.get(`channels/${route.params.id}?token=${session.data.token}`).then(response => {
        state.channel = response
        console.log(state.channel)

    })
}
function updateConversation() {
    api.patch(`channels/${state.channel.id}?token=${session.data.token}`, {
        body: state.channel
    }).then(response => {
        console.log(response)
        state.visible = false;
        state.channel = response;

    }).catch(error => console.log(error))

}

function modeUpdateConversation() {
    state.visible = true;
}
function getMessages() {
    api.get(`channels/${route.params.id}/posts?token=${session.data.token}`).then(response => {

        state.messages = response
        console.log(state.messages)

    })
}
function postMessage() {
    api.post(`channels/${route.params.id}/posts?token=${session.data.token}`, {
        body: state.postMessage
    }).then(response => {
        if (response.message) {
            alert(response.message)
            state.postMessage.message = ""
            state.messages = state.messages.concat(response)
        } else {
            console.log(response)
        }
    }).catch(error => console.log(error))

}

</script>
<template>
    <main>
        <div class="column is-6 desktop is-flex is-desktop">
            <h1 class="title has-text-link column is-4  is-desktop">One conversation</h1>
            <button @click="modeUpdateConversation" type='button' class="button is-link is-outlined is-2">✍🏽</button>
        </div>
        <div v-if="state.visible" class=" column is-12 control columns">
            <form @submit.prevent="updateConversation">
                <div class="field">
                    <label class="label">Topic</label>
                    <input class="input is-focused column is-four-fifths" v-model="state.channel.topic"
                        id="{{state.channel.id}}" type="text">
                </div>
                <div class="field">
                    <label class="label">Label</label>
                    <input class="input is-focused column is-four-fifths" v-model="state.channel.label"
                        id="{{state.channel.id}}" type="text">
                </div>

                <button class="button is-info">Send</button>
            </form>
        </div>
        <div v-else>
            <h2 class="title has-text-dark">{{ state.channel.topic }}</h2>
            <h2 class="title has-text-dark">{{ state.channel.label }}</h2>
        </div>
        <div>
            <template v-for="message in state.messages" :key="message.id">
                <Message :message="message" :conversation="state.channel"></Message>
            </template>


            <div class=" column is-7 control columns">
                <form @submit.prevent="postMessage">
                    <label class="label">Add new message</label>
                    <input class="input is-focused column is-four-fifths" v-model="state.postMessage.message"
                        type="text">
                    <button class="button is-info">Send</button>
                </form>

            </div>



        </div>



    </main>
</template>