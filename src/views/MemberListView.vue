<script setup>
import { onMounted, ref } from 'vue';
import { useSessionStore } from '@/stores/session';
import Member from '@/components/Member.vue';


const session = useSessionStore();

const membersList = ref(null);

onMounted(() => {
  console.log('welcome')
  getMembers();

})
function getMembers() {

  api.get(`members?token=${session.data.token}`).then((response) => {
    console.log(response)
    membersList.value = response
  })

} 
</script>

<template >
  <main>
    <h1 class="title has-text-link">List of membres</h1>
    <div>


      <template v-for=" member in membersList" :key="member.id">
        <Member :member="member"></Member>


      </template>

    </div>
  </main>
</template>
