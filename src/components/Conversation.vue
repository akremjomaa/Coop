<script setup>
import { onMounted, reactive } from "@vue/runtime-core"
import { useSessionStore } from "../stores/session";
import { useConversationsStore } from "../stores/conversations";

const props = defineProps(['conversation'])

const session = useSessionStore();
const conversation = useConversationsStore();

const state = reactive({
    conversation: '',
    messages: []
})
onMounted(() => {
    state.conversation = props.conversation;
    conversation.state.messages = []
    getMessages();
})


function deleteConversation() {
    api.delete(`channels/${props.conversation.id}?token=${session.data.token}`).then(response => {
        state.conversation = response;
        window.location.reload()
    })

}

// stocker les messages de chaque conversation dans un store "conversation" pour les récupérer après en affichant les messages de chaque utilisateur
function getMessages() {
    api.get(`channels/${props.conversation.id}/posts?token=${session.data.token}`).then(response => {

        conversation.state.messages = conversation.state.messages.concat(response)

    })
}

</script>

<template>
    <div class="box column is-9 is-offset-2-desktop is-flex is-desktop " :data-id="state.conversation.id">
        <div class="column is-10  is-desktop"><router-link :to="`/oneConversationView/${state.conversation.id}`">
                <h2 class="subtitle">{{ state.conversation.topic }}</h2>
                <h6 class="subtitle">{{ state.conversation.label }}</h6>
            </router-link>
        </div>
        <button @click="deleteConversation" type='button' class="button is-link is-outlined">🗑️</button>

    </div>

</template>