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

const secretText = document.querySelector("#secret-text"); 
const profilePicture = document.querySelector("#profile-picture"); 
const mainHeading = document.querySelector("#main-heading"); 

//fade in main text
const mainText = document.querySelector(".main-text");
window.addEventListener('load', e=> {
    mainText.classList.add("fade-text-in"); 
})

/**
 * Keeps track of mouse and updates our special, circle pointer to
 * follow cursor movement. 
 */
const mouseCursor = document.querySelector(".cursor");
window.addEventListener('mousemove', e=> {
    mouseCursor.style.top = e.pageY + "px"; 
    mouseCursor.style.left = e.pageX + "px"; 
})

/**
 * Animates the mouse as it interacts with section headers. 
 */
secretMessages = ["...", "....", "Would you like to see something fun?"]; 
var messageIndex = 0; 

const sections = document.querySelectorAll(".sections li");
sections.forEach(section => {
    section.addEventListener("mouseover", e=> {
        mouseCursor.classList.add("grow-cursor"); 
        section.classList.add("color-text"); 
    }); 
    section.addEventListener("mouseleave", e=> {
        mouseCursor.classList.remove("grow-cursor");
        section.classList.remove("color-text"); 
    }); 
    section.addEventListener("click", e=> {
        console.log(messageIndex); 
        if (section.id === "secret-text") {
            mainText.textContent = secretMessages[messageIndex]; 
            if (messageIndex < secretMessages.length) {
                messageIndex += 1; 
            }
            else {
                profilePicture.classList.add("fade-image-out"); 
                activateEerieMode(); 
            }
        }
        else {
            mainText.textContent = section.dataset.message; 
        }
    })
});

/**
 * Changes the theme of the page 
 */
function activateEerieMode() {
    console.log("eerie mode activated"); 
    profilePicture.classList.remove("fade-image-out"); 
    profilePicture.src = "images/Tomie.jpg";
    document.body.style.backgroundColor = "black"; 
    mainHeading.classList.add("eerie-text"); 
    sections.forEach(section => {
        section.classList.add("eerie-text"); 
    });
    mainHeading.textContent = "Something Fun"; 
}

/**
 * Adds a random greeting to the page.
 */
// function addRandomGreeting() {
//   const greetings =
//       ['Hello world!', '¡Hola Mundo!', '你好，世界！', 'Bonjour le monde!'];

//   // Pick a random greeting.
//   const greeting = greetings[Math.floor(Math.random() * greetings.length)];

//   // Add it to the page.
//   const greetingContainer = document.getElementById('greeting-container');
//   greetingContainer.innerText = greeting;
// }