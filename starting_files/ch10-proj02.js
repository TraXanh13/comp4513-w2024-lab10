import Play from "./play-module.js";

document.addEventListener("DOMContentLoaded", function() {
   /*
      To get a specific play, add play name via query string, 
      e.g., url = url + '?name=hamlet';
      
      https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=hamlet
      https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=jcaesar

      note: you may get a CORS error if you test this locally (i.e., directly from a
      local file). To work correctly, this needs to be tested on a local web server.  
      Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
      use built-in Live Preview.
    */
	const url = 'https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php';
   
   // Play object
   var play;


   /*
      Checks the selected scene and returns the equivalent Scene object
   */
  function getCurrentScene() {
     const currSceneName = document.querySelector("#sceneList").value;
     return getCurrentAct().getScene(currSceneName);
   }

   /*
      Checks the selected act and returns the equivalent Act object
   */
   function getCurrentAct() {
      const currActName = document.querySelector("#actList").value;
      return play.getAct(currActName);
   }
   
   /*
      Creates the div container and immediate children within 
      the #playHere section
   */
   function makePlayContainer() {
      const playHere = document.querySelector("#playHere");
      playHere.replaceChildren();
      
      let h2 = document.createElement("h2");
      h2.textContent = play.title;
      
      let actHere = document.createElement("article");
      actHere.setAttribute("id", "actHere");

      playHere.appendChild(h2);
      playHere.appendChild(actHere);
   }
   
   /*
      Creates the div container and immediate children within 
      the #actHere section
   */
   function makeActContainer() {
      const actHere = document.querySelector("#actHere");

      actHere.replaceChildren();
      
      let h3 = document.createElement("h3");
      h3.textContent = getCurrentAct().name;
      
      let sceneHere = document.createElement("div");
      sceneHere.setAttribute("id", "sceneHere");
      
      actHere.appendChild(h3);
      actHere.appendChild(sceneHere);
   }
   
   /*
      Populates the scene information within the 
      #sceneHere container
   */
   function populateScene(filteredPerson = 0, highlight="") {
      const sceneHere = document.querySelector("#sceneHere");
      
      sceneHere.replaceChildren();

      let h4 = document.createElement("h4");
      h4.textContent = getCurrentScene().name;

      let pTitle = document.createElement("p");
      pTitle.setAttribute("class", "title");
      pTitle.textContent = getCurrentScene().title;
      
      let pDir = document.createElement("p");
      pDir.setAttribute("class", "direction");
      pDir.textContent = getCurrentScene().stageDirection;

      sceneHere.appendChild(h4);
      sceneHere.appendChild(pTitle);
      sceneHere.appendChild(pDir);

      getCurrentScene().speeches.forEach(speech => {
         if(filteredPerson == 0 || filteredPerson == speech.speaker)
            sceneHere.appendChild(createSpeech(speech, highlight));
      })
   }

   function createSpeech(speech, highlight) {
      let speechDiv = document.createElement("div");
      speechDiv.setAttribute("class", "speech");
      
      let span = document.createElement("span");
      span.textContent = speech.speaker;
      speechDiv.appendChild(span);
      
      speech.lines.forEach((l) => {
         let p = document.createElement("p");
         p.textContent = l;
         
         if(highlight) {
            let highlights = [...l.toLowerCase().matchAll(highlight.toLowerCase())]
            let pos = 0;
            
            for(let i = 0; i < highlights.length; i++){
               let line = document.createTextNode(l.substring(pos, highlights[i].index))
               let b = document.createElement("b");
               b.textContent = highlight;
   
               pos = highlights[i].index + highlight.length;
   
               p.appendChild(line);
               p.appendChild(b);
            }
            p.appendChild(document.createTextNode(l.substring(pos)));
         }
         speechDiv.appendChild(p);
      });
      
      let em = document.createElement("em");
      em.textContent = speech.stagedir;
      speechDiv.appendChild(em);

      
      return speechDiv;
   }

   async function getPlayList(url) {
      const res = await fetch(url);
      const data = await res.json();
      return data;
   }
   
   document.querySelector("#playList").addEventListener("change", async (e) => {
      if(e.target.value != 0) {
         play = new Play(await getPlayList(`${url}?name=${e.target.value}`));
         play.populateActFilter();
         play.populatePersonaFilter();

         makePlayContainer();
         makeActContainer();
         populateScene();
      }
   });
   
   document.querySelector("#actList").addEventListener("change", (e) => {
      getCurrentAct().populateSceneFilter();
      makeActContainer();
      populateScene();
   });
   
   document.querySelector("#sceneList").addEventListener("change", (e) => {
      populateScene();
   })

   // TODO: have highlights removed when searching for something new

   document.querySelector("#btnHighlight").addEventListener("click", () => {
      const player = document.querySelector("#playerList").value;
      const highlight = document.querySelector("#txtHighlight").value;
      populateScene(player, highlight)
   })
});