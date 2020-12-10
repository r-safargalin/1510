// ==UserScript==
// @name         Bot for yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @match        https://crushdrummers.ru/*
// @grant        none
// ==/UserScript==

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function getRandom(min,max){
  return Math.floor(Math.random()*(max-min)+min);
}

let sites = {
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":["Гобой","Флейта","Как звучит флейта","Балалайка","Фагот","Скрипка","Саксофон"],
    "crushdrummers.ru":["Барабанное шоу","Заказать барабанное шоу в москве","Барабанщики на свадьбу","Барабанщики на корпоратив"]
}
let site = Object.keys(sites)[getRandom(0,Object.keys(sites).length)];
let words = sites[site];
let word = words[getRandom(0,words.length)];
let yaInput = document.getElementsByName("text")[0];
let yaButton = document.getElementsByClassName("button_js_inited")[0];
let linkIsFound=false;
let pageNum;

if(yaButton!=undefined){
  let i = 0;
  document.cookie = "site="+site;
	console.log("1");

  let timerId = setInterval(function(){
        yaInput.value=yaInput.value+word[i];
        i++;
        if (i == word.length){
          clearInterval(timerId);
          yaButton.click();
				}
  },500);
}else if(location.hostname=="yandex.ru"){
  site = getCookie("site");
	console.log("2");
  let links = document.links;
  for(let i=0;i<links.length;i++){
      let link = links[i];
      if(link.href.includes(site)) {
          link.target = "_self";
          linkIsFound = true;
          setTimeout(()=>{link.click();},1000);
          break;
      }
  }
	setTimeout(()=>{
	  pageNum = document.querySelector("span.pager__item").innerText;
		if(!linkIsFound && pageNum<10){
      setTimeout(()=>{document.getElementsByClassName("pager__item_kind_next")[0].click();},3000);
		}else if (!linkIsFound){
      location.href = "https://www.yandex.ru/";
  	}
	},1000);
}else{
	console.log("3");
    if(getRandom(1,11) > 8 ) setTimeout(()=>{location.href = "https://www.yandex.ru/";},3000); // С вероятностью в 20% мы переходим на сайт google
    let links = document.links; //Собираем коллекцию всех ссылок сайта
    setInterval(()=>{
        let index = getRandom(0,links.length); // Индекс из массива links
        let link = links[index]; // Выбор ссылки по индексу из массива links
        if (link.href.includes(location.hostname)){ // Проверяем что ссылка ведёт нас на тот же сайт на котором мы находимся
            setTimeout(()=>{link.click();},5000);
        }
    },5000);
}
