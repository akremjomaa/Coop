<script setup>
import { useMembersStore } from "@/stores/members";
import { onMounted} from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useConversationsStore } from "../stores/conversations";
import { useSessionStore } from "@/stores/session";

const members = useMembersStore();
const conversation = useConversationsStore();
const session = useSessionStore();

const route = useRoute();

onMounted(() => {
  console.log("one member");
  members.getMembers();
  members.getMemberName(route.params.id);
  console.log(members.state.members)
  conversation.getMemberMessages(route.params.id);
  console.log(conversation.state.memberMessages);

  // console.log(AppMembers.state.members)
  // console.log(AppMembers.state.member.fullname)
  // getMembers();
  // console.log(member);
});

//  async function getMembers() {

//   await api.get('members',session.data.token).then(response => {
//     console.log(response);

//     member.value = response.find(o =>o.id === route.params.id)
//     console.log(member.value)

//   })

//    }
 function deleteMessage(channel_id,id){
    api.delete(`channels/${channel_id}/posts/${id}?token=${session.data.token}`).then(response => {
      conversation.state.memberMessages = response
        // window.location.reload()
    })

}
</script>

<template>
  <main>
    <div>
      <h2 class="title">
        <img
          :src="`https://gravatar.com/avatar/${route.params.id}??s=200&d=robohash&r=x`"
          alt=""
        />{{ members.state.member.fullname }}
      </h2>
      <h2 class="subtitle">
        <b>Email :</b>{{ members.state.member.email }}
      </h2>
      <h2 class="subtitle">
        <b>inscrit depuis :</b> {{ members.state.member.created_at }}
      </h2>
    </div>
    <br />
    <div>
      <h1>Messages:</h1>
      <br />
      <div
        v-if="conversation.state.memberMessages.length === 0"
        
        :data-id="conversation.state.channel.id"
      >
        There is no messages Created by <strong>{{ members.state.member.fullname }}</strong> !!
      </div>
      <div v-else>
        <template
          v-for="message in conversation.state.memberMessages"
          :key="message.id"
        >
          <div
            class="box column is-9 is-offset-2-desktop is-flex is-desktop"
            :data-id="conversation.state.channel.id"
          >
            <div class="column is-10 is-desktop">
              <h2 class="subtitle"><router-link :to="`/oneMember/${ message.member_id }`"><img
                :src="`https://gravatar.com/avatar/${message.member_id}?s=200&d=robohash&r=x`"
                alt=""></router-link></h2>
              <h1 class="subtitle has-text-info"><router-link :to="`/oneConversationView/${ message.channel_id }`">{{ message.message }}</router-link></h1>

              <h2 class="subtitle">Created at {{ message.created_at }}</h2>
            </div>
            <button
              @click="deleteMessage(message.channel_id,message.id)"
              type="button"
              class="button is-link is-outlined"
            >
              🗑️
            </button>
          </div>
        </template>
      </div>
    </div>
  </main>
</template>
