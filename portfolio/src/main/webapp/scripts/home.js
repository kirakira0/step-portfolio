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

let eerieModeOn = false; 

const root = document.documentElement;

const secretText = document.querySelector("#secret-text"); 
const mePic = document.querySelector("#me-pic"); 
const tomiePic = document.querySelector("#tomie-pic"); 
const mainHeading = document.querySelector("#main-heading"); 

//fade in main text
const mainText = document.querySelector(".main-text");
window.addEventListener('load', e => {
    mainText.classList.add("fade-text-in"); 
    extraContent.style.display = "none"; 
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

const SECRET_MESSAGES = ["Keep clicking to see ...", "...something...", "fun."]; 
let messageIndex = 0; 

/**
 * Animates the mouse as it interacts with section headers. 
 */
const sections = document.querySelectorAll(".sections li");
sections.forEach(section => {
    section.addEventListener("mouseover", e => {
        circleAroundMouse.classList.add("grow-cursor");
        if (eerieModeOn) { section.classList.remove("eerie-text"); } 
        section.classList.add("color-text");  
    }); 
    section.addEventListener("mouseleave", e => {
        circleAroundMouse.classList.remove("grow-cursor");
        if (eerieModeOn) { section.classList.add("eerie-text"); } 
        section.classList.remove("color-text"); 
    }); 
    section.addEventListener("click", e => {
        if (section.id === "secret-text") {
            mainText.textContent = SECRET_MESSAGES[messageIndex]; 
            if (messageIndex < SECRET_MESSAGES.length) {
                messageIndex += 1; 
            } else {
                if (!eerieModeOn) { activateEerieMode(); }
                else {deactivateEerieMode(); }
            }
        } else {
            if (eerieModeOn) {
                //reverse the text 
                let revTextArray = section.dataset.message.split(""); 
                revTextArray = revTextArray.reverse(); 
                let revTextString = revTextArray.join(""); 
                mainText.textContent = revTextString;
            }
            else {
                mainText.textContent = section.dataset.message;
            } 
        }
    })
});

/**
 * Change cursor and text when cursor is over "Recommend" text 
 */
const recommend = document.querySelector("#recommend");
recommend.addEventListener("mouseover", e => {
    circleAroundMouse.classList.add("grow-cursor");
    recommend.style.color = "white";   
});
recommend.addEventListener("mouseleave", e => {
    circleAroundMouse.classList.remove("grow-cursor");
    recommend.style.color = "red";  
});


/**
 * Changes the theme of the page 
 */
const extraContent = document.querySelector("#extra-content");

function activateEerieMode() {
    eerieModeOn = true; 
    mePic.classList.add("fade-image-out"); 
    document.body.style.backgroundColor = "black"; 
    root.style.setProperty('--target-color', "red");
    root.style.setProperty('--circle-cursor-color', "red"); 
    root.style.setProperty('--highlighted-text-color', "white"); 
    mainHeading.classList.add("eerie-text"); 
    sections.forEach(section => {
        section.classList.add("eerie-text"); 
    });
    mainHeading.textContent = "Something Fun"; 
    mainText.textContent = mainText.dataset.reversed; 
    mainText.classList.add("eerie-text"); 
    //the following lines display extra, eerie-mode-exclusive features 
    extraContent.style.display = "block"; 
    //transition the extra content in
    extraContent.style.opacity = 0;
    setTimeout(() => {
        extraContent.style.opacity = 1;
    }, this.animationDelay + 20); 
    secretText.textContent = "Back"; 
}

function deactivateEerieMode() {
    eerieModeOn = false; 
    mePic.classList.remove("fade-image-out"); 
    document.body.style.backgroundColor = "white"; 
    root.style.setProperty('--target-color', "black");
    root.style.setProperty('--circle-cursor-color', "black"); 
    root.style.setProperty('--highlighted-text-color', "white"); 
    mainHeading.classList.add("eerie-text"); 
    sections.forEach(section => {
         section.classList.remove("eerie-text"); 
    });
    mainHeading.textContent = "Kira Toal's Profile"; 
    mainText.textContent = "Wasn't that fun?"; 
    mainText.classList.remove("eerie-text"); 
    secretText.textContent = "???"; 
    //the following lines disable extra,  eerie-mode-exclusive features 
    extraContent.style.display = "none"; 
}

/**
 * Recommends a movie based on dropdown input 
 */

function recommendMovie() {
    const SPN = ["Hereditary", "It Follows", "The Exorcist", "Ju-On: The Grudge", "Ringu"]
    const NONSPN = ["Midsommar", "The Shining", "Hush", "The Strangers", "Orphan"]
    const dropdown = document.querySelector("#subgenres"); 
    let userSelectedValue; 
    const result = document.querySelector("#result");
    userSelectedValue = dropdown.options[dropdown.selectedIndex].value;  
    if (userSelectedValue === "spn") {
        result.textContent = SPN[Math.floor(Math.random() * SPN.length)]; 

    } else { 
        result.textContent = NONSPN[Math.floor(Math.random() * NONSPN.length)]; 
    }
}
