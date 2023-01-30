<script setup>
import { ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';
// import {useUserStore} from '@/stores/user';

const router = useRouter()
let member = reactive({
    fullname: '',
    email: '',
    password: ''
})
const checkPassword = ref('');
console.log(checkPassword.value)
function validationFormulaire() {
    if(member.password !== checkPassword.value){
                alert("les mots de passe ne sont pas compatibles ! vérifiez de nouveau !")
            }
    else{
    api.post('members', {
        body: member
    }).then(response => {
        console.log(checkPassword.value)
    
        console.log(response)
        if (response.message) {
            alert(response.message)
        } else {
            console.log(response)
            if (confirm("votre compte à été créé avec succés")) {
               
            }
        } {

        }
    }).catch(error => console.log(error))

}}
</script>

<template>
    <main class="form">
        <h1 class="title">Coop</h1>
        <h2 class="subtitle"> Créer un compte</h2>
        <form class="box" @submit.prevent="validationFormulaire">
            <div class="field">
                <label class="label">Nom</label>
                <div class="control">
                    <input required="required" class="input " v-model="member.fullname" type="text"
                        placeholder="Nom complet ou Pseudo">
                </div>
            </div>

            <div class="field">
                <label class="label">E-mail</label>
                <div class="control has-icons-left has-icons-right">
                    <input class="input" v-model="member.email" required="required" type="email"
                        placeholder="E-mail">

                </div>
            </div>

            <div class="field">
                <label class="label">Mot de Passe</label>
                <div class="control has-icons-left has-icons-right">
                    <input class="input" v-model="member.password" required="required" type="password"
                        placeholder="Mot de Passe">
                </div>
            </div>
            <div class="field">
                <label class="label">Confirmer mot de passe</label>
                <div class="control has-icons-left has-icons-right">
                    <input class="input" v-model="checkPassword" required="required" type="password"
                        placeholder="Répeter mot de passe">
                </div>
            </div>
            <div class="field is-grouped">
                <div class="control">
                    <button class="button is-link" type="submit">Créer un compte </button>
                </div>
            </div>
        </form>
        <div><p>Vous avez deja un compte ?</p><router-link to="/connect">Connexion</router-link></div> 

    </main>
</template>
