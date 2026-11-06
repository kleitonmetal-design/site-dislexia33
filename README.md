# Dislexia 33

Site público para adultos com dislexia e TDAH.

Endereço final: https://dislexia33.guardiantechit.com.br

## Objetivo

- Explicar dislexia e TDAH em frases curtas.
- Reunir direitos, leis e notícias.
- Oferecer treinamentos e mentoria.

## Como rodar localmente

1. Clone o repositório.
2. Dentro da pasta, rode: `python3 -m http.server 8000`
3. Abra http://localhost:8000 no navegador.

O site é estático (HTML, CSS e JavaScript). Não precisa de build.

## Próximos passos

Itens registrados para depois. Nada disso está feito ainda.

- Domínio próprio `dislexia33.com.br`, com redirecionamento para o subdomínio.
- Versão em inglês.
- Login de membros.
- Pagamento (Kiwify, Hotmart ou Stripe).
- Automação de notícias com n8n.
- Área de vídeos.
- Newsletter.

## Segurança

- Como reportar um problema: veja o arquivo `.well-known/security.txt`.
- O site não coleta dados de saúde.
- Nenhum segredo fica no repositório. Se um segredo vazar, troque na hora.

O que a CI verifica a cada pull request e a cada push na `main`:

1. Script externo sem `integrity` (SRI).
2. Uso de `innerHTML` nos arquivos JavaScript.
3. Chaves e segredos no código (chaves do Supabase, tokens do GitHub e chaves privadas).
4. Links `http://` sem o `s`.

## Histórico

- 2026-11-05: visual v2, link do Instagram e foto de perfil.
- 2026-11-05: menu à esquerda no computador e gaveta no celular; página Ferramentas para dislexia e bloco novo na Home.
