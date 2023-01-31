<script setup>
import { useSessionStore } from '@/stores/session';
import { useRouter } from 'vue-router';
const session = useSessionStore();
const router = useRouter()

let member = reactive({
    email: '',
    password: ''
})
function validationFormulaire() {
    api.post('members/signin', {
        body: member
    }).then(response => {
        console.log(response)
        if (response.message) {
            alert(response.message)
        } else {
            session.setSession(response.member, response.token);
            router.push('/conversationsList');
        }
    }).catch(error => console.log(error))

}
</script>

<template>

    <main class="form">
        <h1 class="title">Coop</h1>
        <h2 class="subtitle"> Se connecter</h2>
        <form class="box" @submit.prevent="validationFormulaire">

            <div class="field">
                <label class="label">E-mail</label>
                <div class="control has-icons-left has-icons-right">
                    <input class="input" v-model="member.email" required="required" type="email" placeholder="E-mail">

                </div>
            </div>

            <div class="field">
                <label class="label">Mot de Passe</label>
                <div class="control has-icons-left has-icons-right">
                    <input class="input " v-model="member.password" required="required" type="password"
                        placeholder="Mot de Passe">
                </div>
            </div>

            <div class="field is-grouped">
                <div class="control">
                    <button class="button is-link" type="submit">Se connecter </button>
                </div>
            </div>
        </form>
        <div>
            <p>Vous n'avez pas un compte?</p><router-link to="/createAccount" class="button">Créer un
                compte</router-link>
        </div>
    </main>

</template>
