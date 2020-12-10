// ==UserScript==
// @name         Bot for yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @grant        none
// ==/UserScript==

function getRandom(min,max){
  return Math.floor(Math.random()*(max-min)+min);
}

let yaInput = document.getElementsByName("text")[0];
let yaButton = document.getElementsByClassName("button_js_inited")[0];
let linkIsFound=false;
let words = ["гобой","флейта","как звучит флейта","балалайка","фагот","скрипка","саксофон"];
let word = words[getRandom(0, words.length)];
let pageNum;

if(yaButton!=undefined){
  let i = 0;
    let timerId = setInterval(function(){
        yaInput.value=yaInput.value+word[i];
        i++;
        if (i == word.length){
          clearInterval(timerId);
          yaButton.click();
        }
    },500);
}else{
  let links = document.links;
  for(let i=0;i<links.length;i++){
      let link = links[i];
      if(link.href.includes("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai")) {
          console.log(i);
          console.log(link.href);
          link.target = "_self";
          linkIsFound = true;
          setTimeout(()=>{link.click();},50);
          console.log(linkIsFound);
          break;
      }
  }
}

setTimeout(()=>{
    pageNum = document.querySelector("span.pager__item").innerText;
    console.log(pageNum);
    if(!linkIsFound && pageNum<10){
        setTimeout(()=>{document.getElementsByClassName("pager__item_kind_next")[0].click();},3000);
    }
    else{
       location.href="https://yandex.ru/";
    }
},
1000);
