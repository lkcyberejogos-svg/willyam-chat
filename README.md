# WILLYAM CHAT — Projeto v3 (preparação para IA e Android)

## Incluído
- Interface móvel com temas claro/escuro.
- Idiomas: automático, pt-BR, pt-PT, inglês e espanhol.
- Manifesto e service worker para PWA.
- Ícone SVG inicial.
- Backend de exemplo em `worker/index.js` usando a OpenAI Responses API.
- A chave da API fica no servidor, nunca no JavaScript do aplicativo.

## Importante
Este ZIP ainda NÃO é um APK/AAB e a IA ainda NÃO está conectada. O backend é um modelo pronto para configurar, mas precisa ser publicado num serviço de servidor e receber uma chave secreta. Não coloque a chave em `app.js`, no HTML, em mensagens ou em arquivos públicos.

## Segurança e conta
A criação de uma conta de API, eventual cobrança e publicação na Google Play devem ser feitas por um responsável adulto, com consentimento e supervisão. Não envie senhas, chaves ou dados de pagamento neste chat.

## Etapas para transformar em aplicativo Android
1. Publicar o site PWA num endereço HTTPS.
2. Publicar o backend e configurar nele `OPENAI_API_KEY` como segredo e `ALLOWED_ORIGIN` com o endereço HTTPS do site.
3. No app, configurar o endereço público do backend (a versão de produção pode receber isso em configuração segura).
4. Testar em vários aparelhos e corrigir privacidade, segurança, acessibilidade e falhas.
5. Quando a PWA estiver publicada em HTTPS, usar PWABuilder para gerar um pacote Android (APK para teste e AAB para Google Play).
6. Um responsável adulto cuida da conta de desenvolvedor, assinatura, política de privacidade e envio à loja.

## Observação sobre recursos
Esta etapa conecta somente conversa de texto quando o servidor estiver publicado e configurado. Voz, geração/análise de imagens, pesquisa na web, anexos, histórico em nuvem e contas ainda precisam ser desenvolvidos e testados separadamente.

## Referências oficiais
- OpenAI API: https://developers.openai.com/api/reference/overview
- PWABuilder Android: https://github.com/pwa-builder/PWABuilder/blob/main/docs/builder/android.md
