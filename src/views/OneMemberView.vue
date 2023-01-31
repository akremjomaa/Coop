<script setup>
import { onMounted, reactive } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useConversationsStore } from "../stores/conversations";
import { useSessionStore } from "@/stores/session";

const conversation = useConversationsStore();
const session = useSessionStore();

const route = useRoute();
const state = reactive({
  member: {},
})
onMounted(() => {
  console.log("one member");
  getMember();
  conversation.getMemberMessages(route.params.id);

});
function getMember() {

  api.get(`members?token=${session.data.token}`).then(response => {
    state.member = response.find(o => o.id === route.params.id)
    console.log(state.member);

  })
}
</script>

<template>
  <main>
    <div>
      <h2 class="title">
        <img :src="`https://gravatar.com/avatar/${route.params.id}??s=200&d=robohash&r=x`" alt="" />{{
          state.member.fullname
        }}
      </h2>
      <h2 class="subtitle">
        <b>Email :</b>{{ state.member.email }}
      </h2>
      <h2 class="subtitle">
        <b>inscrit depuis :</b> {{ state.member.created_at }}
      </h2>
    </div>
    <br />
    <div>
      <h1>Messages:</h1>
      <br />
      <div v-if="conversation.state.memberMessages.length === 0" :data-id="conversation.state.channel.id">
        There is no messages Created by <strong>{{ state.member.fullname }}</strong> !!
      </div>
      <div v-else>
        <template v-for="message in conversation.state.memberMessages" :key="message.id">
          <div class="box column is-9 is-offset-2-desktop is-flex is-desktop" :data-id="conversation.state.channel.id">
            <div class="column is-10 is-desktop">
              <h2 class="subtitle"><router-link :to="`/oneMember/${message.member_id}`"><img
                    :src="`https://gravatar.com/avatar/${message.member_id}?s=200&d=robohash&r=x`" alt=""></router-link>
              </h2>
              <h1 class="subtitle has-text-info"><router-link :to="`/oneConversationView/${message.channel_id}`"
                  v-html="message.message">

                </router-link></h1>

              <h2 class="subtitle">Created at {{ message.created_at }}</h2>
            </div>

          </div>
        </template>
      </div>
    </div>
  </main>
</template>
