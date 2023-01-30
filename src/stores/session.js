import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

export const useSessionStore = defineStore('session', () => {
    const router = useRouter();
    const data = reactive({
        member: {},
        token: false
    });
    /** 
* @param {object} member
* @param {string} token
*/


    function setSession(member, token) {
        data.member = member;
        data.token = token
    }
    function clearSession() {
        localStorage.clear();
    }
   

    async function isValid() {
        console.log('test')
        if (!data.token) {
            connect();
            return false
        }
        else {
            const mid = data.member.id;
            const response = await api.get(`members/${mid}/signedin?token=${data.token}`)
            const d = await response;
            if (!d.token) {
                connect();
                return false;
            }
            return true
        }
    }
    function connect() {
        router.push('/connect')
    }
    return { data, setSession, clearSession, isValid,connect}
}, {
    persist: true,
})