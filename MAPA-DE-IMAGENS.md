# Mapa de imagens — Blu Interiores

Cada espaço reservado no site está marcado como **"Imagem N"**. Quando o cliente enviar as fotos reais, é só substituir o arquivo `assets/placeholders/imagem-N.svg` pela foto correspondente (mantendo o mesmo nome de arquivo, ou atualizando o `src` no HTML).

## Recomendação de performance ao inserir as fotos reais
- Exporte em **WebP** (com fallback JPG se precisar de suporte a navegadores muito antigos).
- Comprima para no máximo ~200–300KB por imagem em telas grandes (ferramentas: Squoosh, TinyPNG).
- Use `srcset`/`sizes` para servir versões menores em mobile (ex: 640w, 1024w, 1600w).
- Mantenha a proporção retrato (4:5) nas imagens de `split-media` e `carousel-slide`, e paisagem larga (16:9 ou mais) nas de `hero-media`, para evitar cortes estranhos no `object-fit: cover`.
- Ao trocar cada `<img>`, adicione `loading="lazy" decoding="async"` (já configurado nos placeholders) — mantenha esses atributos.

## Home (index.html)
| Nº | Local | Sugestão de conteúdo |
|----|-------|----------------------|
| 1  | Hero (topo da página) | Cozinha ou ambiente com marcenaria + mármore, foto de destaque |
| 2  | Seção "Sobre" | Ambiente sofisticado, marcenaria + mármore |
| 3  | Seção "Móveis Sob Medida" | Um móvel/ambiente planejado (closet, cozinha) |
| 4  | Seção "Mármores" | Bancada ou peça em mármore |
| 5–10 | Carrossel "Inspirações" (6 fotos) | Mix de ambientes: cozinha, closet, sala, banheiro, dormitório |

## Móveis Sob Medida (moveis-sob-medida.html)
| Nº | Local |
|----|-------|
| 11 | Hero da página |
| 12 | Seção de texto (imagem lateral) |
| 13–17 | Galeria (5 fotos) — cozinhas, closets, salas, dormitórios |

## Mármores (marmores.html)
| Nº | Local |
|----|-------|
| 18 | Hero da página |
| 19 | Seção de texto (imagem lateral) |
| 20–24 | Galeria (5 fotos) — bancadas, banheiros, ilhas, cozinhas |

## Sobre (sobre.html)
| Nº | Local |
|----|-------|
| 25 | Hero da página |
| 26 | Primeira seção de texto |
| 27 | Segunda seção de texto |

## Contato (contato.html)
| Nº | Local |
|----|-------|
| 28 | Hero da página |

---
Total: **28 espaços de imagem** no site (fora a logo, que já está definitiva).
