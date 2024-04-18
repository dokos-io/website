__Dokos__ est un logiciel né avec le cloud.  

Son architecture 100% web permet de l'utiliser aussi bien dans un cloud public que dans un cloud privé.

Vous pouvez donc l'installer sur vos propres serveurs, au sein du réseau interne de votre entreprise ou bien sur n'importe quel cloud public (AWS, Google Cloud, Microsoft Azure, OVH, ...)

Son architecture technique repose sur les technologies suivantes:
<div class="ml-auto text-left">
  <div class="mt-4 mx-auto" style="max-width: 150px">
    <i class="inline-block mr-8 uil uil-check text-dokosBlue-default" ></i>
    <a href="https://en.wikipedia.org/wiki/Linux" target="_blank" rel="noopener">Linux</a>
  </div>
  <div class="mx-auto" style="max-width: 150px">
    <i class="inline-block mr-8 uil uil-check text-dokosBlue-default" ></i>
    <a href="https://mariadb.org/" target="_blank" rel="noopener">Mariadb</a>
  </div>
  <div class="mx-auto" style="max-width: 150px">
    <i class="inline-block mr-8 uil uil-check text-dokosBlue-default" ></i>
    <a href="https://www.python.org/" target="_blank" rel="noopener">Python</a>
  </div>
  <div class="mx-auto" style="max-width: 150px">
    <i class="inline-block mr-8 uil uil-check text-dokosBlue-default" ></i>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noopener">Javascript</a>
  </div>
</div>

<hr class="border-dokosBlue-default border w-32 my-8 mx-auto">

# Architecture

<img class="mx-auto mt-5 mb-5" src="/images/docli_architecture.svg">

Le cadriciel __Dodock__ sur lequel est installé Dokos, permet également l'installation d'autres applications.  
Vous pouvez ainsi développer vos propres personnalisations, les héberger sur votre serveur et les faire évoluer en parallèle de Dokos, sans modifier son code source.  
Cela permet de controller les coûts de maintenance, tout en laissant une grande flexibilité pour optimiser votre plateforme logicielle.  

Avec son archtitecture __multi-tenant__ par défaut, __Dokos__ vous permet d'héberger plusieurs sites avec bases de données indépendantes utilisant les mêmes applications.  