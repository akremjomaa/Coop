<script setup>
import {useSessionStore} from '@/stores/session';
import router from '../router';

const session = useSessionStore();

onMounted( () => {

  if(session.isValid()){
    console.log("we can work now ")
  }
  
})
  
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
  </main>
</template>
