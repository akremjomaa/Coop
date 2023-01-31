<script setup>
import { onMounted, reactive } from "@vue/runtime-core"

import { useSessionStore } from "../stores/session";

const props = defineProps(['member'])

const session = useSessionStore();
const state = reactive({
  member: '',
  isDeleted : false
})
onMounted(() => {
  state.member = props.member;
})

function deleteMember() {
  api.delete(`members/${props.member.id}?token=${session.data.token}`).then((response) => {
    state.member = response
    state.isDeleted = true

  })

}

async function deleteOtherMember() {
  if (props.member.id === session.data.member.id) {
    alert("You can't delete your own account !")
  }
  else {
    await deleteMember();
  }
}


</script>

<template>
  <template v-if="!state.isDeleted">
  <div class="box column is-9 is-offset-2-desktop is-flex is-desktop " :data-id="props.member.id">
    <div class="column is-10  is-desktop">
      <h2 class="subtitle">{{ props.member.fullname }}</h2>
      <h6 class="subtitle is-link"><a href='mailto:{{props.member.email}}'>{{ props.member.email }}</a></h6>

    </div>
    <div class="column is-1 is-desktop"><router-link :to="`/oneMember/${props.member.id}`"
        class="button is-link is-outlined">👤</router-link></div>
    <button @click="deleteOtherMember" type='button' class="button is-link is-outlined">🗑️</button>
  </div>
</template>
</template>