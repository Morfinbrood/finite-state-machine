class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (config == null)
            throw new Error("no starting config");
        this.initalConfig = config.initial;
        this.states = config.states;
        this.activeState = config.initial;
        const stateObjs = this.states[this.activeState];
        this.activeTransitions = stateObjs.transitions;
        this.prevState = null;
        this.history = [null, this.activeState];
        this.dontWriteHistoryFlag = false;
        this.undoDeep = 0;
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
        const keyAttr = this.findedKey(state, this.states);
        if (keyAttr === "notFounded")
            throw new Error("this state not founded in FSM scheme");
        this.activeState = keyAttr;
        if (this.dontWriteHistoryFlag == true)
            this.dontWriteHistoryFlag = false;
        else {
            this.disableRedoUndoAfterChangedState();
            this.history.push(this.activeState);
        };
        const stateObjs = this.states[this.activeState];
        this.activeTransitions = stateObjs.transitions;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        const keyAttr = this.findedKey(event, this.activeTransitions);
        if (keyAttr === "notFounded")
            throw new Error("this event trigger not founded in FSM scheme");
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
    getStates(event) {
        let arrayStates = [];
        if (event == null) {
            for (let key in this.states)
                arrayStates.push(key);
            return arrayStates;
        }
        else {
            for (let key in this.states) {
                let stateObjs = this.states[key];
                stateObjs.transitions
                for (let key2 in stateObjs.transitions)
                    if (key2 === event)
                        arrayStates.push(key);
            };
            return arrayStates;
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        const historyLength = this.history.length;
        if (this.history[historyLength - this.undoDeep - 2] == null)
            return false;
        else {
            this.undoDeep++;
            this.dontWriteHistoryFlag = true;
            this.changeState(this.history[historyLength - this.undoDeep - 1]);
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        const historyLength = this.history.length;
        if (this.undoDeep > 0) {
            this.undoDeep--;
            this.dontWriteHistoryFlag = true;
            this.changeState(this.history[historyLength - this.undoDeep - 1]);
            return true;
        }
        else
            return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = [null, this.activeState];
    }

    findedKey(inputkey, inputObj) {
        let keyAttr = "notFounded";
        //находим заданные ключи словаря и если они есть вносим в переменную, чтобы дальше с ним работать.
        for (let key in inputObj)
            if (key === inputkey)
                keyAttr = key;
        return keyAttr;
    }

    disableRedoUndoAfterChangedState() {
        let historyNew = [];
        let historyLength = this.history.length;
        for (let i = 0; i <= historyLength - this.undoDeep - 1; i++)
            historyNew.push(this.history[i]);
        this.undoDeep = 0;
        this.history = historyNew;
    };
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
