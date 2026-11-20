const $ = (id) => document.getElementById(id);
const translations = {
  "pt-BR": {subtitle:"Seu assistente inteligente",language:"Idioma",hint:"O app tentará identificar o idioma automaticamente.",title:"Olá! Eu sou o Willyam Chat.",welcome:"Como posso ajudar você hoje?",placeholder:"Digite sua mensagem...",send:"Enviar ➤",disclaimer:"Versão inicial de demonstração. A inteligência artificial ainda precisa ser conectada.",reply:"Recebi sua mensagem! A interface está funcionando, mas a inteligência artificial ainda não foi conectada."},
  "pt-PT": {subtitle:"O teu assistente inteligente",language:"Idioma",hint:"A aplicação tentará identificar o idioma automaticamente.",title:"Olá! Sou o Willyam Chat.",welcome:"Como te posso ajudar hoje?",placeholder:"Escreve a tua mensagem...",send:"Enviar ➤",disclaimer:"Versão inicial de demonstração. A inteligência artificial ainda precisa de ser ligada.",reply:"Recebi a tua mensagem! A interface está a funcionar, mas a inteligência artificial ainda não foi ligada."},
  en: {subtitle:"Your smart assistant",language:"Language",hint:"The app will try to detect your language automatically.",title:"Hello! I'm Willyam Chat.",welcome:"How can I help you today?",placeholder:"Type your message...",send:"Send ➤",disclaimer:"Initial demo version. The AI still needs to be connected.",reply:"I received your message! The interface is working, but the AI has not been connected yet."},
  es: {subtitle:"Tu asistente inteligente",language:"Idioma",hint:"La aplicación intentará detectar tu idioma automáticamente.",title:"¡Hola! Soy Willyam Chat.",welcome:"¿Cómo puedo ayudarte hoy?",placeholder:"Escribe tu mensaje...",send:"Enviar ➤",disclaimer:"Versión inicial de demostración. La inteligencia artificial todavía debe conectarse.",reply:"¡He recibido tu mensaje! La interfaz funciona, pero la inteligencia artificial todavía no está conectada."}
};
function detectLanguage(){
  const lang=(navigator.language||"pt-BR").toLowerCase();
  if(lang.startsWith("pt-pt")) return "pt-PT";
  if(lang.startsWith("pt")) return "pt-BR";
  if(lang.startsWith("es")) return "es";
  if(lang.startsWith("en")) return "en";
  return "pt-BR";
}
const languageSelect=$("language");
const savedLanguage=localStorage.getItem("willyam-language")||"auto";
languageSelect.value=savedLanguage;
function applyLanguage(){
  const chosen=languageSelect.value;
  const lang=chosen==="auto"?detectLanguage():chosen;
  const t=translations[lang]||translations["pt-BR"];
  document.documentElement.lang=lang;
  $("subtitle").textContent=t.subtitle;
  $("languageLabel").textContent=t.language;
  $("languageHint").textContent=t.hint;
  $("welcomeTitle").textContent=t.title;
  $("welcomeText").textContent=t.welcome;
  $("messageInput").placeholder=t.placeholder;
  $("messageInput").setAttribute("aria-label",t.placeholder);
  $("sendBtn").textContent=t.send;
  $("disclaimer").textContent=t.disclaimer;
  localStorage.setItem("willyam-language",chosen);
  window.currentWillyamReply=t.reply;
}
languageSelect.addEventListener("change",applyLanguage);
applyLanguage();

const savedTheme=localStorage.getItem("willyam-theme");
if(savedTheme==="dark") document.body.classList.add("dark");
$("themeBtn").addEventListener("click",()=>{
  document.body.classList.toggle("dark");
  localStorage.setItem("willyam-theme",document.body.classList.contains("dark")?"dark":"light");
});
$("chatForm").addEventListener("submit",async (event)=>{
  event.preventDefault();
  const input=$("messageInput");
  const value=input.value.trim();
  if(!value) return;
  $("welcome").hidden=true;
  addMessage(value,"user");
  input.value="";
  try{
    const apiBase=(localStorage.getItem("willyam-api-url")||"").replace(/\\/$/,"");
    const endpoint=apiBase ? apiBase : "/api/chat";
    const response=await fetch(endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:value,language:document.documentElement.lang})});
    if(!response.ok) throw new Error("AI endpoint unavailable");
    const data=await response.json();
    addMessage(data.reply||data.message||"Não recebi uma resposta do servidor.","assistant");
  }catch{
    addMessage(window.currentWillyamReply + " Para conectar a IA, o servidor precisa ser publicado e configurado.", "assistant");
  }
});
function addMessage(text,kind){
  const bubble=document.createElement("div");
  bubble.className="bubble "+kind;
  bubble.textContent=text;
  $("messages").appendChild(bubble);
  bubble.scrollIntoView({behavior:"smooth",block:"end"});
}