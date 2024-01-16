

document.addEventListener("DOMContentLoaded", function() {

	
	const url = 'https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php';
   let playData;
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
   function populateActsFilter(acts) {
      const actList = document.querySelector("#actList");
      actList.replaceChildren();
      
      acts.forEach(act => {
         let option = document.createElement("option");
         option.textContent = act.name;
         option.value = act.name;
         actList.appendChild(option);
      });
      
      populateScenesFilter(acts[0].scenes)
   }

   function displayActData(act) {
      
   }

   function populateScenesFilter(scenes) {
      const sceneList = document.querySelector("#sceneList");
      sceneList.replaceChildren();
      
      scenes.forEach(scene => {
         let option = document.createElement("option");
         option.textContent = scene.name;
         option.value = scene.name;
         sceneList.appendChild(option);
      });
   }

   async function getPlayList(url) {
      const res = await fetch(url);
      const data = await res.json();
      return data;
   }

   document.querySelector("#actList").addEventListener("change", (e) => {
      playData.acts.forEach((act) => {
         if(e.target.value == act.name) {
            document.querySelector("h3").textContent = act.name;
            populateScenesFilter(act.scenes)
            
         }
      })
   });
   
   document.querySelector("#playList").addEventListener("change", async (e) => {
      if(e.target.value != 0) {
         playData = await getPlayList(`${url}?name=${e.target.value}`)
         document.querySelector("h2").textContent = playData.title;
         document.querySelector("h3").textContent = playData.acts[0].name;

         
         populateActsFilter(playData.acts)
      }
   });
});