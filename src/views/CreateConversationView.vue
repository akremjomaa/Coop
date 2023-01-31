<script setup>
import { useSessionStore } from '@/stores/session';
import { useRouter } from 'vue-router';
const router = useRouter()

const session = useSessionStore();
let conversation = reactive({
    topic: '',
    label: '',
})
function createConversation() {
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
</template>
