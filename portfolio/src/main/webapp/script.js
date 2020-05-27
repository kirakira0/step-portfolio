// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

//fade in main text
const mainText = document.querySelector(".main-text");
window.addEventListener('load', e=> {
    mainText.classList.add("fade-text-in"); 
})

//get mouse
const mouseCursor = document.querySelector(".cursor");
window.addEventListener('mousemove', e=> {
    mouseCursor.style.top = e.pageY + "px"; 
    mouseCursor.style.left = e.pageX + "px"; 
})

//get links
const sections = document.querySelectorAll(".sections li");
sections.forEach(section => {
    section.addEventListener("mouseover", e=> {
        mouseCursor.classList.add("NEWFUNC"); 
        section.classList.add("hovered-text"); 
    }); 
    section.addEventListener("mouseleave", e=> {
        mouseCursor.classList.remove("NEWFUNC");
        section.classList.remove("hovered-text"); 
    }); 
    section.addEventListener("click", e=> {
        mainText.textContent = section.dataset.message; 
        //console.log(mainText.textContent); 
        //console.log(section.dataset.message); 
    })
});


// const icon = document.querySelector("#icon"); 
// icon.addEventListener('mouseover', e=> {
//     onButtonHover(); 
// })

/**
 * ADD COMMENT
 */
function onButtonHover() {
    console.log(icon.dataset.message);
}

/**
 * Adds a random greeting to the page.
 */

function addRandomGreeting() {
  const greetings =
      ['Hello world!', '¡Hola Mundo!', '你好，世界！', 'Bonjour le monde!'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}
