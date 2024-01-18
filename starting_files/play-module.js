/* In this module, create three classes: Play, Act, and Scene. */
class Play {
    constructor(play){
        this.title = play.title;
        this.personas = play.persona.sort((a, b) => {
            if(a.player < b.player)
                return -1;
            return 1;
        });
        this.acts = [];
        
        play.acts.forEach(act => {
            this.acts.push(new Act(act))
        });
    }

    getAct(actName = "ACT I") {
        return (this.acts.find(act => {
            if(actName == act.name)
               return true;
         }))
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
}
    
    class Act {
        constructor(act){
            this.name = act.name;
            this.scenes = [];
            
            act.scenes.forEach(scene => {
                this.scenes.push(new Scene(scene));
        })
    }

    getScene(sceneName = "SCENE I") {
        return (this.scenes.find(scene => {
            if(sceneName == scene.name)
               return true;
         }))
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
}

class Scene {
    constructor(scene){
        this.name = scene.name;
        this.title = scene.title;
        this.stageDirection = scene.stageDirection;
        this.speeches = scene.speeches;
    }
}

export default Play;