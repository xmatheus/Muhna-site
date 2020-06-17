[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/xmatheus/internal-Muhna)

## Projeto Digital do Museu de História Natural do Araguaia


## UFMT - Universidade Federal Do Mato Grosso

<p> <b>Orientador:</b> Ivairton Monteiro Santos </p>

<p><i>ivairton@ufmt.br</i></p>

<p> <b>Orientando:</b> Matheus Felipe T. Correia </p>

<p><i>matheuscorreia559@gmail.com</i></p>

<p style='text-align: justify;'> O Museu de História Natural do Araguaia (MuHNA) está localizado no Campus Universitário do Araguaia/UFMT, em Barra do Garças/MT. O seu acervo é constituído por coleções de zoologia, paleontologia e geologia, contendo também espécies da região. O MuHNA possui entrada gratuita e está aberto às terças, quintas e sextas feiras, das 08:30h às 11:30h e das 13:30 h às 17:00 h. No ano de 2018 recebeu a visita de mais de 3.600 pessoas de vários lugares do mundo, 3 países, 16 estados e 82 cidades.
O MuHNA possui diversas atrações: Diorama(um modo de exposição artística tridimensional); Cinema 3D; Sala dos sentidos: nela você irá utilizar seus sentidos para conhecer, tocar e sentir o que a ciência, em conjunto com a natureza, pode oferecer; 
Animais 3D: Dentro do museu a alguns totens que possuem modelos tridimensionais de animais, sendo possível ver sua estrutura óssea e hábitos; Aplicativo android: o MuHNA possui dois tablets à disposição do público, nesses tablets é possível jogar o jogo da memória que utiliza de figuras de animais típicos do acervo do museu, e também o quiz que possui diversas perguntas sobre os animais.</p>


## O que é isso aqui?

Esse site foi desenvolvido para facilitar o controle de uma [API](https://github.com/xmatheus/API-Muhna) que fornece dados para uma [aplicação](https://github.com/xmatheus/Muhna-reactNative) feita com react-native

## UI

<p align="center">
	<img alt="login page" width='90%' src="https://user-images.githubusercontent.com/34286800/84935495-c8508000-b0a6-11ea-8161-3d7340684f11.png">
  <img alt="dashboard"width='90%' src="https://user-images.githubusercontent.com/34286800/84935375-9b9c6880-b0a6-11ea-9994-02cea68427f2.png">
	
</p>

## É necessário ter instalado

páginas para o download
* [Nodejs >= 12.9.1](https://nodejs.org/pt-br/download/package-manager/)
* [Yarn >= 1.19.1](https://yarnpkg.com/pt-BR/docs/install#debian-stable)
* Git



## Instalação


```sh
$ sudo apt update
$ sudo apt install git
$ git clone https://github.com/xmatheus/internal-Muhna
$ cd internal-Muhna
$ yarn install
$ yarn build
$ yarn global add serve
$ serve -s build

```

É necessário criar um arquivo .env na raiz do projeto com a seguinte váriavel:

| váriavel | valor |
| ------ | ------ |
| REACT_APP_API_URL | {url da API} |


## Início rápido

 - Usei css puro e styled components
 - Foi usado como base os cursos stater da [Rocketseat](https://rocketseat.com.br/), e também alguns vídeos de Reactjs que estão no [Canal Rocketseat](https://www.youtube.com/channel/UCSfwM5u0Kce6Cce8_S72olg).
 
 ## Estruturação de pastas



![treeFiles](https://user-images.githubusercontent.com/34286800/68258005-a587c480-000b-11ea-9140-50e99dd5b4bf.png)

[Demonstrativo no heroku](https://sitemuhna.herokuapp.com/)

[Video de exemplo](https://youtu.be/JsfZ0m9w86k)



    



