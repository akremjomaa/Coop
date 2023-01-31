<script setup>
import { onMounted, reactive } from "@vue/runtime-core"
import { useSessionStore } from '@/stores/session';
const bus = inject('bus');

const session = useSessionStore();
const props = defineProps(['message'])


const state = reactive({
    message: '',
    visible: false
})
bus.on(`set-message`, (params) => {
    if (params.id == props.message.id) {
        state.message = params.message;
        state.visible = true;
    }
});

onMounted(() => {
    console.log('ok')

})

function updateMessage() {
    api.patch(`channels/${props.message.channel_id}/posts/${props.message.id}?token=${session.data.token}`, {
        body: state
    }).then(response => {
        console.log(response)
        state.visible = false;
        bus.emit(`update-message-${props.message.id}`, state.message);

    }).catch(error => console.log(error))

}


</script>
<template>

    <div v-if="state.visible" class=" column is-12 control columns">
        <form @submit.prevent="updateMessage">
            <input class="input is-focused column is-four-fifths" v-model="state.message" id="{{props.id}}" type="text">
            <button class="button is-info">Send</button>
        </form>
    </div>


</template>