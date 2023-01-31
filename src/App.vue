<script setup>
import NavBar from '@/components/NavBar.vue';
import { provide, reactive } from 'vue'
import { useRouter } from 'vue-router'
import mitt from 'mitt'
import { useSessionStore } from '@/stores/session';
import { useMembersStore } from '@/stores/members'


const state = reactive({
  appReady: false,
  sessionValid: false
})
const bus = mitt();
provide('bus', bus)
const router = useRouter()
provide('router', router)
const session = useSessionStore();
const members = useMembersStore();

onMounted(() => {
  start();
});

function start() {
  if (session.isValid()) {
    members.getMembers().then(() => {
      state.sessionValid = true;
      state.appReady = true;
    })
  } else {
    state.sessionValid = false;
    state.appReady = true;
  }
}

</script>

<template>
  <template v-if="state.sessionValid">
    <NavBar />
  </template>
  <section class="section">
    <template v-if="state.appReady">

      <RouterView />
    </template>
  </section>
</template>

<style scoped>

</style>
