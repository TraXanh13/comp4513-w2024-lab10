/* In this module, create three classes: Play, Act, and Scene. */
class Play {
    constructor(play){
        this.title = play.title;
        this.personas = play.persona;
        this.acts = [];
        
        play.acts.forEach(act => {
            this.acts.push(new Act(act))
        });
    }

    populateActFilter() {
        const actList = document.querySelector("#actList");
        actList.replaceChildren();
        
        this.acts.forEach(act => {
            let option = document.createElement("option");
            option.textContent = act.name;
            option.value = act.name;
            actList.appendChild(option);
        });

        this.acts[0].populateSceneFilter();
    }

    populatePersonaFilter() {
        const playerList = document.querySelector("#playerList");
        let playerListPlaceholder = playerList.firstElementChild;

        playerList.replaceChildren();
        playerList.appendChild(playerListPlaceholder);

        this.personas.forEach(persona => {
            let option = document.createElement("option");
            option.textContent = persona.player;
            option.value = persona.player;
            playerList.appendChild(option);
        });
    }

    displayPlay(act = "ACT I", scene = "SCENE I") {
        const currAct = this.acts.find((a) => {
            if(a.name === act)
                return true;
        })

        const playHere = document.querySelector("#playHere");
        playHere.replaceChildren();
        
        let playTitle = document.createElement("h2");
        playTitle.textContent = this.title;
        
        let actHere = document.createElement("article");
        actHere.setAttribute("id", "actHere");
        
        let h3 = document.createElement("h3");
        h3.textContent = currAct.name;
        
        playHere.appendChild(playTitle);
        playHere.appendChild(actHere);
        actHere.appendChild(h3);
        actHere.appendChild(currAct.getSceneMarkup(scene));
    }
}
    
    class Act {
        constructor(act){
            this.name = act.name;
            this.scenes = [];
            
            act.scenes.forEach(scene => {
                this.scenes.push(new Scene(scene));
        })
    }
    
    populateSceneFilter(){
        const sceneList = document.querySelector("#sceneList");
        sceneList.replaceChildren();
        
        this.scenes.forEach(scene => {
            let option = document.createElement("option");
            option.textContent = scene.name;
            option.value = scene.name;
            sceneList.appendChild(option);
        });
    }

    getSceneMarkup(scene) {
        const currScene = this.scenes.find((s) => {
            if(s.name === scene)
                return true;
        });

        let sceneHere = document.createElement("div");
        sceneHere.setAttribute("id", "sceneHere");

        let h4 = document.createElement("h4");
        h4.textContent = currScene.name;

        let title = document.createElement("p");
        title.setAttribute("class", "title");
        title.textContent = currScene.title;

        let direction = document.createElement("p");
        direction.setAttribute("class", "direction");
        direction.textContent = currScene.stageDirection;

        sceneHere.appendChild(h4);
        sceneHere.appendChild(title);
        sceneHere.appendChild(direction);
        
        sceneHere.appendChild(currScene.getLinesMarkup());

        return sceneHere;
    }
}

class Scene {
    constructor(scene){
        this.name = scene.name;
        this.title = scene.title;
        this.stageDirection = scene.stageDirection;
        this.speeches = scene.speeches;
    }

    getLinesMarkup(){
        const linesMarkup = document.createElement("div")
        linesMarkup.setAttribute("id", "lines");
        
        this.speeches.forEach((speech) => {
            let createdSpeech = document.createElement("div");
            createdSpeech.setAttribute("class", "speech");
            
            let speaker = document.createElement("span");
            speaker.textContent = speech.speaker;
            
            createdSpeech.appendChild(speaker);

            speech.lines.forEach(l => {
                let p = document.createElement("p");
                p.textContent = l;
                createdSpeech.appendChild(p);
            })
            linesMarkup.appendChild(createdSpeech)
        })
        return linesMarkup;
    }
}

export default Play;