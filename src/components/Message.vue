<script setup>
import { onMounted, reactive } from "@vue/runtime-core"

import UpdateMessage from '@/components/UpdateMessageForm.vue';
import { useRoute } from "vue-router";
import { useSessionStore } from "../stores/session";
import { useConversationsStore } from "../stores/conversations";

const props = defineProps(['conversation', 'message'])

const bus = inject('bus');
// const session = useSessionStore();
// const conversation = useConversationsStore();

const route = useRoute()
const session = useSessionStore();
const conversation = useConversationsStore()


const state = reactive({
    modeEdition: false,
    message: ''
})
onMounted(() => {
    state.message = props.message.message;
    bus.on(`update-message-${props.message.id}`, (message) => {
        state.message = message;
        state.modeEdition=false;
    })


})

function updateThisMessage() {

    state.modeEdition = true
    bus.emit(`set-message`, {id:props.message.id, message:state.message});
}
function deleteMessage() {
    api.delete(`channels/${props.message.channel_id}/posts/${props.message.id}?token=${session.data.token}`).then(response => {
        conversation.state.messages = response
        window.location.reload()
    })

}

</script>

<template>

    <div class="box column is-9 is-offset-2-desktop is-flex is-desktop " :data-id="props.conversation.state.channel.id">
        <div class="column is-10  is-desktop">
            <h2 class="subtitle"><router-link :to="`/oneMember/${props.message.member_id}`"><img
                        :src="`https://gravatar.com/avatar/${props.message.member_id}?s=200&d=robohash&r=x`" alt="">{{
                            props.message.member_id
                        }}</router-link></h2>
                <UpdateMessage :message="props.message"></UpdateMessage>
                <!-- <div class=" column is-7 control columns">
                    <input class="input is-focused column is-four-fifths"
                    v-model="props.conversation.state.post.message" type="text"
                    placeholder="Add your message">
                    <button @click="postMessage" class="button is-info column is-1">Send</button>
                    
                </div> -->
                <template v-if="!state.modeEdition">
                    <h1 class="subtitle has-text-info">{{ state.message }}</h1>
                </template>

            <h2 class="subtitle">Created at {{ props.message.created_at }}</h2>
        </div>

        <button @click="deleteMessage" type='button' class="button is-link is-outlined">🗑️</button>
        <button @click="updateThisMessage" type='button' class="button is-link is-outlined">✍🏽</button>

        <!-- <UpdateMessage :id="props.message.id"></UpdateMessage> -->


    </div>
</template>