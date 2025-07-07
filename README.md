# foton
Projeto educacional interativo gamificado, que combina desafios visuais e conceitos de física óptica com um sistema de desbloqueio por senhas, simuladores interativos e feedback visual em uma interface sci-fi.


Sobre o Projeto
Cada camada representa um cristal adormecido de conhecimento. Para reativá-los, o usuário deve:

Interagir com simuladores (espelho plano e ângulo entre espelhos);

Acertar a posição correta ou responder à questão proposta;

Inserir a senha correta para desbloquear a camada correspondente;

Observar a camada visual ser ativada em tempo real.

📜 Lista de Senhas
As senhas devem ser inseridas na ordem correta após o sucesso em cada etapa:

Parte	Senha
1	sol
2	arvore
3	magia
4	estrela
5	lua
6	terra
7	agua
8	fogo
9	vento
10	chuva
11	neve
12	arcoiris

📁 Estrutura dos Arquivos
index.html: estrutura principal da interface;

estilo.css: visual estilizado com estética sci-fi e responsiva;

camada.js: lógica dos simuladores, progressão do usuário, verificação de senhas e controle visual.

🕹️ Funcionalidades
🔓 Sistema de desbloqueio progressivo com 12 camadas/senhas;

🪞 Simulador de Espelho Plano:

Usuário deve alinhar imagem e espelho simetricamente;

Ao acertar, desbloqueia o primeiro campo de senha.

📐 Simulador de Ângulo entre Espelhos (Etapa 10):

Calcula número de imagens formadas baseado no ângulo α;

Feedback visual imediato.

📊 Barra de progresso dinâmica;

✨ Efeitos visuais com transições suaves e iluminação para camadas;

🎉 Mensagem de conclusão com incentivo para registrar a conquista.

🔧 Como Usar
Abra index.html em um navegador moderno;

Ajuste o controle deslizante no Simulador de Espelho até receber o feedback "✅ Parabéns!";

A partir disso, insira as senhas corretamente conforme os desafios forem sendo resolvidos;

Avance pelas 12 camadas até completar o desafio final;

Ao final, uma mensagem o parabeniza e oferece um link para registrar a conquista.

🧪 Tecnologias Utilizadas
HTML5

CSS3 (com Google Fonts)

JavaScript Vanilla (Canvas API)

Design responsivo e interativo

💡 Sugestões de Melhorias Futuras
Adicionar som e efeitos ao desbloquear cada camada;

Armazenar progresso local (localStorage);

Tornar as senhas configuráveis por arquivo externo (JSON);

Compatibilizar para dispositivos móveis com controles maiores;

Adicionar narração por voz ou orientações animadas.

