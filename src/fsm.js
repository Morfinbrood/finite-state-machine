class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
     constructor(config) {
        if (config==null){
            throw new Error ("no starting config");
        }
        this.initalConfig=config.initial;
        this.states=config.states;
        this.activeState=config.initial;
        var stateObjs=this.states[this.activeState];
        this.activeTransitions=stateObjs.transitions;
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
        var keyAttr=this.findedKey(state,this.states);
        if (keyAttr==="notFounded") {
            throw new Error ("this state not founded in FSM scheme");
        };
        this.activeState=keyAttr;
        var stateObjs=this.states[this.activeState];
        this.activeTransitions=stateObjs.transitions;
    }


    /**
     * Changes state according to event transition rules.
     * @param event
     */
     trigger(event) {
        var keyAttr=this.findedKey(event,this.activeTransitions);
        if (keyAttr==="notFounded") {
            throw new Error ("this event trigger not founded in FSM scheme");
        };
        this.changeState(this.activeTransitions[keyAttr]);
    }

    /**
     * Resets FSM state to initial.
     */
     reset() {
        this.changeState(this.initalConfig);
    }

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

     findedKey(inputkey,inputObj){
        var keyAttr="notFounded";
        //находим заданные ключи словаря и если они есть вносим в переменную, чтобы дальше с ним работать.
        for (var key in inputObj) {
            if (key===inputkey){
                keyAttr=key;
            };
        };
        return keyAttr;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
