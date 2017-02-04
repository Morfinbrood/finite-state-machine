class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
     constructor(config) {
        if (config==null){
            throw new Error ("no starting config");
        }
        this.states=config.states;
        this.activeState=config.initial;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
     getState() {
        return this.activeState;
    }

    /**
     * Goes to specified state.
     * @param state
     */

     changeState(state) {
        var keyAttr="notFounded";
        //находим заданные ключи словаря и если они есть вносим в переменную, чтобы дальше с ним работать.
        for (var key in this.states) {
            if (key===state){
                keyAttr=key;
            };
        };

        if (keyAttr==="notFounded") {
            throw new Error ("this state not founded in FSM scheme");
        };

       // this.this.activeStateKey=

       this.activeState=keyAttr;
   }


    /**
     * Changes state according to event transition rules.
     * @param event
     */
     trigger(event) {
        console.log("AvtiveState is ",this.activeState )

        var x=this.activeState ;


     //   console.log("AvtiveState transitions is ",this.currentTransitions);
     var keyAttr="notFounded";
     for (var key in this.states.activeState.key) {
        console.log("key= ", key);
        if (key===event){
            keyAttr=key;
        };
    };

    if (keyAttr==="notFounded") {
        throw new Error ("this event trigger not founded in FSM scheme");
    };

    this.changeState(keyAttr);

}

    /**
     * Resets FSM state to initial.
     */
     reset() {}

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
     getStates(event) {}

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
     undo() {}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
     redo() {}

    /**
     * Clears transition history
     */
     clearHistory() {}
 }

 module.exports = FSM;

 /** @Created by Uladzimir Halushka **/
