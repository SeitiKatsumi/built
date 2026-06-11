# BUILT Landing

Landing page onepage para BUILT Alliances, pronta para deploy via CapRover.

## Rodar localmente

```bash
python -m http.server 4173
```

Abra `http://127.0.0.1:4173`.

## Deploy CapRover

O repositório inclui:

- `Dockerfile` com Nginx Alpine
- `nginx.conf` para servir a SPA estática
- `captain-definition` apontando para o Dockerfile

No CapRover, conecte o app ao repositório e faça deploy pela branch desejada.
