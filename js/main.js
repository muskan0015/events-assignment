import { singers} from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
    generateContentUsingTemplate();
    generateContentUsingCreateElement();
    generateContentUsingInnerHTML();

initializeDataList();
addEventListeners();
});
//using content Using Template 
function generateContentUsingTemplate (){
  let mainElement =document.querySelector('main');
  let fragment = document.createDocumentFragment('fragment');
  let template = document.createElement('template');

  singers.forEach(singer =>{
    template.innerHTML = `
    <details class ="one" data-uuid="${singer.uuid}">

    <summary> ${singer.name}</summary>
    <div>
    <p class ="bold">  Role:${singer.role}</p>
    <p> Age: ${singer.age}</p>
    <p> Genre: ${singer.genre}</p>
      </div>
      </details>
    `;
    let clone = template.content.cloneNode(true);
    fragment.appendChild(clone);
    
  });
  mainElement.appendChild(fragment);  

}
// using Content Using Create Element
function generateContentUsingCreateElement(){
  let mainElement = document.querySelector('main');
  let fragment =document.createDocumentFragment();

  singers.forEach(singer => {
    let details =document.createElement ('details');
    details.classList.add('one');
    details.setAttribute('data-uuid',singer.uuid);

    let summary = document.createElement('summary');
    summary.textContent =singer.name;
   details.appendChild(summary);

    let divlist=document.createElement('div');

    let p1= document.createElement('div');
     p1.innerHTML =`Role:${singer.role}`;
     divlist.appendChild(p1);
    
    let p2 =document.createElement('p');
   p2.textContent = `Age: ${singer.age}`;
    divlist.appendChild(p2);

    let p3 =document.createElement('p');
    p3.textContent =`Genre':${singer.genre}`;
    divlist.appendChild(p3);

    details.appendChild(divlist);

    fragment.appendChild(details);

  });
    mainElement.appendChild(fragment);
}
// Content Using InnerHTML
function generateContentUsingInnerHTML(){
  let mainElement =document.querySelector('main');

  let html = singers.map(singer => `
    <details class="one" data-uuid="${singer.uuid}">
      <summary> ${singer.name}</summary>
      <div>
      <p> Role:${ singer.role}</p>
      <p> Age: ${ singer.age}</p>
      <p> Genre: ${ singer.genre}</p>
      </div>
    </details>
  `) .join('');
  mainElement.innerHTML += html;
}

// initialize datalist with singer names
function initializeDataList(){
  let datalist =document.getElementById("names");
  singers.forEach(singer =>{
    let option= document.createElement("option");
    option.value =singer.name;
    datalist.appendChild(option);


  });
}
    
// here is adding of event listeners
function addEventListeners(){
  let input =document.getElementById("nameInput");
  input.addEventListener("input", handleInput);

  let detailsElements= document.querySelectorAll("details");
  detailsElements.forEach(detail =>{
    detail.addEventListener("toggle", handleToggle);

  });
  let main =document.querySelector("main");
  main.addEventListener("click", handleClick);
 
}
//for handle the input  event here
function handleInput(ev){
  let typedValue = ev.target.value.toLowerCase();
  let detailsElements =document.querySelectorAll("details");

  detailsElements.forEach(detail=>{
    let summaryText =detail.querySelector("summary").textContent.toLocaleLowerCase();
    if (summaryText.includes(typedValue)){
      detail.classList.remove("hidden");

    }else{
      detail.classList.add("hidden");
    }
  });
}


// this is for handle the toggle event
function handleToggle(ev){
  let toggledDetail =ev.target;
  let newState =toggledDetail.open ? "open" :"closed";
  let uuid =toggledDetail.getAttribute("data-uuid");

  document.querySelectorAll("details").forEach(detail=>{
    if (detail.getAttribute("data-uuid")===uuid)
    {
      if(newState==="open")
        {
        detail.setAttribute("open" ,"");

      } else{
        detail.removeAttribute("open");
      }
    }


  });


}
// Handle click event
function handleClick() {
  let header = document.querySelector("header");
  let h1 = header.querySelector("h1");

  let hue = Math.floor(Math.random() * 360);
  let lightBackground = `hsl(${hue}, 60%, 80%)`;
  let darkText = `hsl(${hue}, 60%, 20%)`;

  header.style.backgroundColor = lightBackground;
  h1.style.color = darkText;
}

// CSS class for hiding details
let style = document.createElement('style');
style.innerHTML = `
  .hidden { display: none; }
`;
document.head.appendChild(style);