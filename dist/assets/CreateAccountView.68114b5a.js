import{m as u,g as p,r as m,h as _,a as h,c as f,b as e,w as n,v as c,u as a,n as v,i as b,j as g,k as w,e as V}from"./index.4334a7d3.js";const q={class:"form"},x=e("h1",{class:"title"},"Coop",-1),C=e("h2",{class:"subtitle"}," Cr\xE9er un compte",-1),k=["onSubmit"],y={class:"field"},N=e("label",{class:"label"},"Nom",-1),M={class:"control"},P={class:"field"},U=e("label",{class:"label"},"E-mail",-1),B={class:"control has-icons-left has-icons-right"},E={class:"field"},R=e("label",{class:"label"},"Mot de Passe",-1),j={class:"control has-icons-left has-icons-right"},z={class:"field"},S=e("label",{class:"label"},"Confirmer mot de passe",-1),T={class:"control has-icons-left has-icons-right"},A=e("div",{class:"field is-grouped"},[e("div",{class:"control"},[e("button",{class:"button is-link",type:"submit"},"Cr\xE9er un compte ")])],-1),D=e("p",null,"Vous avez deja un compte ?",-1),H={__name:"CreateAccountView",setup(F){u();let s=p({fullname:"",email:"",password:""});const i=m("");console.log(i.value);function d(){s.password!==i.value?alert("les mots de passe ne sont pas compatibles ! v\xE9rifiez de nouveau !"):api.post("members",{body:s}).then(t=>{console.log(i.value),console.log(t),t.message?alert(t.message):(console.log(t),confirm("votre compte \xE0 \xE9t\xE9 cr\xE9\xE9 avec succ\xE9s"))}).catch(t=>console.log(t))}return(t,o)=>{const r=_("router-link");return h(),f("main",q,[x,C,e("form",{class:"box",onSubmit:b(d,["prevent"])},[e("div",y,[N,e("div",M,[n(e("input",{required:"required",class:"input","onUpdate:modelValue":o[0]||(o[0]=l=>a(s).fullname=l),type:"text",placeholder:"Nom complet ou Pseudo"},null,512),[[c,a(s).fullname]])])]),e("div",P,[U,e("div",B,[n(e("input",{class:"input","onUpdate:modelValue":o[1]||(o[1]=l=>a(s).email=l),required:"required",type:"email",placeholder:"E-mail"},null,512),[[c,a(s).email]])])]),e("div",E,[R,e("div",j,[n(e("input",{class:"input","onUpdate:modelValue":o[2]||(o[2]=l=>a(s).password=l),required:"required",type:"password",placeholder:"Mot de Passe"},null,512),[[c,a(s).password]])])]),e("div",z,[S,e("div",T,[n(e("input",{class:"input","onUpdate:modelValue":o[3]||(o[3]=l=>v(i)?i.value=l:null),required:"required",type:"password",placeholder:"R\xE9peter mot de passe"},null,512),[[c,a(i)]])])]),A],40,k),e("div",null,[D,g(r,{to:"/connect"},{default:w(()=>[V("Connexion")]),_:1})])])}}};export{H as default};