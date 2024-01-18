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

    /*
        Gets the current Act object based off of the string
        
        @param {string} actName: the current act being searched for
        @return {object} the Act object
    */
    getAct(actName = "ACT I") {
        return (this.acts.find(act => {
            if(actName == act.name)
            return true;
        }))
    }

    /*
        Populates all of the Act into the filter
    */
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
    
    /*
        Populates all of the Actors into the filter
    */
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
    
    /*
        Gets the current Scene object based off of the string
    
        @param {string} sceneName: the current act being searched for
        @return {object} the Scene object
    */
    getScene(sceneName = "SCENE I") {
        return (this.scenes.find(scene => {
            if(sceneName == scene.name)
                return true;
        }));
    }
    
    /*
        Populates all of the Scenes into the filter
    */
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