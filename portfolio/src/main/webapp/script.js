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

let root = document.documentElement;

const secretText = document.querySelector("#secret-text"); 
const mePic = document.querySelector("#me-pic"); 
const tomiePic = document.querySelector("#tomie-pic"); 
const mainHeading = document.querySelector("#main-heading"); 

//fade in main text
const mainText = document.querySelector(".main-text");
window.addEventListener('load', e => {
    mainText.classList.add("fade-text-in"); 
})

/**
 * Keeps track of mouse and updates our special, circle pointer to
 * follow cursor movement. 
 */
const circleAroundMouse = document.querySelector(".cursor");
window.addEventListener('mousemove', e => {
    circleAroundMouse.style.top = e.pageY + "px"; 
    circleAroundMouse.style.left = e.pageX + "px"; 
})

const secretMessages = ["...", "....", "Would you like to see something fun?"]; 
let messageIndex = 0; 

/**
 * Animates the mouse as it interacts with section headers. 
 */

const sections = document.querySelectorAll(".sections li");
sections.forEach(section => {
    section.addEventListener("mouseover", e => {
        circleAroundMouse.classList.add("grow-cursor"); 
        section.classList.add("color-text"); 
    }); 
    section.addEventListener("mouseleave", e => {
        circleAroundMouse.classList.remove("grow-cursor");
        section.classList.remove("color-text"); 
    }); 
    section.addEventListener("click", e => {
        console.log(messageIndex); 
        if (section.id === "secret-text") {
            mainText.textContent = secretMessages[messageIndex]; 
            if (messageIndex < secretMessages.length) {
                messageIndex += 1; 
            } else {
                // profilePicture.classList.add("fade-image-out"); 
                activateEerieMode(); 
            }
        } else {
            mainText.textContent = section.dataset.message; 
        }
    })
});

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 39) {
        console.log("right key pressed");
        activateEerieMode(); 
    }
});

/**
 * Changes the theme of the page 
 */
function activateEerieMode() {
    console.log("eerie mode activated"); 
    mePic.classList.add("fade-image-out"); 
    document.body.style.backgroundColor = "black"; 
    root.style.setProperty('--target-color', "red");
    mainHeading.classList.add("eerie-text"); 
    sections.forEach(section => {
        section.classList.add("eerie-text"); 
    });
    mainHeading.textContent = "Something Fun"; 
    mainText.classList.add("eerie-text"); 
}

/**
 * Recommends a movie based on dropdown input 
 */
const dropdown = document.querySelector("#subgenres"); 
let userSelectedValue; 

spnMovies = ["Hereditary", "It Follows", "The Exorcist", "Ju-On: The Grudge", "Ringu"]
nonSpnMovies = ["Midsommar", "The Shining", "Hush", "The Strangers", "Orphan"]

function recommendMovie() {
    userSelectedValue = dropdown.options[dropdown.selectedIndex].value; 
    if (userSelectedValue === "spn") {
        console.log(spnMovies[Math.floor(Math.random() * spnMovies.length)]); 
    } else {
        console.log(nonSpnMovies[Math.floor(Math.random() * nonSpnMovies.length)]); 
    }
}