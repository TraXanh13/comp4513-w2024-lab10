import Play from "./play-module.js";

document.addEventListener("DOMContentLoaded", function() {

	
	const url = 'https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php';
   let play;

   /*
      To get a specific play, add play name via query string, 
      e.g., url = url + '?name=hamlet';
      
      https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=hamlet
      https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=jcaesar
   */
	
   
   /* note: you may get a CORS error if you test this locally (i.e., directly from a
      local file). To work correctly, this needs to be tested on a local web server.  
      Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
      use built-in Live Preview.
    */

   async function getPlayList(url) {
      const res = await fetch(url);
      const data = await res.json();
      return data;
   }
   
   document.querySelector("#playList").addEventListener("change", async (e) => {
      if(e.target.value != 0) {
         play = new Play(await getPlayList(`${url}?name=${e.target.value}`));
         play.populateActFilter();
         play.populatePersonaFilter()
         play.displayPlay();
      }
   });
   
   document.querySelector("#actList").addEventListener("change", (e) => {
      let act = play.acts.find((act) => {
         if(act.name === e.target.value) 
            return true;
      })

      act.populateSceneFilter();
      play.displayPlay(e.target.value);
   });

   document.querySelector("#sceneList").addEventListener("change", (e) => {
      play.displayPlay(e.target.previousElementSibling.value, e.target.value)
   })

   function highlightSpeeches(speeches, highlight){
      speeches.forEach(speech => {
         let p = speech.querySelectorAll("p");
         p.forEach((p) => {
            let pCont = p.textContent;
            let pos = pCont.toLowerCase().search(highlight.toLowerCase())
            
            if(pos >= 0) {
               let firstHalf = pCont.substring(0, pos);
               let secondHalf = pCont.substring(pos+highlight.length, pCont.length);
               let b = document.createElement("b");
               b.textContent = pCont.substring(pos, pos+highlight.length)

               p.textContent = firstHalf;
               p.append(b);
               p.append(secondHalf);
            }
         })
      }); 
   }

   // TODO: have highlights removed when searching for something new
   // TODO: be able to filter by auther/player

   document.querySelector("#btnHighlight").addEventListener("click", () => {
      const player = document.querySelector("#playerList").value;
      const highlight = document.querySelector("#txtHighlight").value;
      const lines = document.querySelector("#lines");
      let speeches = Array.from(document.querySelectorAll(".speech"))

      if(player != 0) {
         speeches = speeches.filter((speech) => speech.querySelector("span").textContent === player)
         console.log(speeches);
      }

      if(highlight != ""){
         speeches = highlightSpeeches(speeches, highlight);
      }

      
      // console.log(lines)
      // console.log(speeches)

      // lines.replaceChildren(lines, speeches);
   })
});