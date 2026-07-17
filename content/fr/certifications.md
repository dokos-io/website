---
toc: true
title: Certifications de Dokos et ses modules
---

## Certification du système d'encaissement Dokos

Les fonctionnalités d'encaissement sont en cours de certification.

Plus d'informations ici : [Blog - Dokos et la certification des logiciels d'encaissement](/blog/2025/dokos-se-certifie-lne)

### Empreintes des versions certifiées

- **v5** (Attention : en cours de certification) &middot; `c45c3d2e431fb57811b08ca7c58922212b641a9b015c1742a37310874804e91e`

### Pour vérifier l'intégrité de l'installation

```
cd dokos-bench/
curl https://gitlab.com/dokos/certification_caisse/-/raw/develop/certification_caisse/compute_hash.py?ref_type=heads | python3
# Noter le hash global affiché

# Consulter le hash fichier par fichier
cat hashes.txt
```

### Pour vérifier une archive

Utilisez l'[outil de vérification d'archives fiscales](https://dokos.gitlab.io/certification_caisse/).
