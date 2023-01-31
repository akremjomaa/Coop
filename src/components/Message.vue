<script setup>
import { onMounted, reactive } from "@vue/runtime-core"
import UpdateMessage from '@/components/UpdateMessageForm.vue';
import { useSessionStore } from "../stores/session";
import { useConversationsStore } from "../stores/conversations";

const props = defineProps(['conversation', 'message'])

const bus = inject('bus');


const session = useSessionStore();
const conversation = useConversationsStore()


const state = reactive({
    modeEdition: false,
    message: '',
    isDeleted : false

})
onMounted(() => {
    state.message = props.message.message;
    bus.on(`update-message-${props.message.id}`, (message) => {
        state.message = message;
        state.modeEdition = false;
    })


})

function updateThisMessage() {

    state.modeEdition = true
    bus.emit(`set-message`, { id: props.message.id, message: state.message });
}
function deleteMessage() {
    api.delete(`channels/${props.message.channel_id}/posts/${props.message.id}?token=${session.data.token}`).then(response => {
        conversation.state.messages = response
        state.isDeleted = true
    })

}
</script>

<template>
  <template v-if="!state.isDeleted">

    <div class="box column is-9 is-offset-2-desktop is-flex is-desktop " :data-id="props.conversation.channel_id">
        <div class="column is-10  is-desktop">
            <h2 class="subtitle"><router-link :to="`/oneMember/${props.message.member_id}`"><img
                        :src="`https://gravatar.com/avatar/${props.message.member_id}?s=200&d=robohash&r=x`" alt="">{{
                            props.message.member_id
                        }}</router-link></h2>
            <UpdateMessage :message="props.message"></UpdateMessage>

            <template v-if="!state.modeEdition">
                <h1 class="subtitle has-text-info" v-html="state.message"></h1>
            </template>

            <h2 class="subtitle">Created at {{ props.message.created_at }}</h2>
        </div>
        <template v-if="props.message.member_id === session.data.member.id">
            <button @click="deleteMessage" type='button' class="button is-link is-outlined">🗑️</button>
            <button @click="updateThisMessage" type='button' class="button is-link is-outlined">✍🏽</button>
        </template>


    </div>
</template>
</template>