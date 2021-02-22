export default class StateManager
{
	constructor(states) {
  	let i = 0;
  	for (let state of states) {
      const real_i = i;
      const state_name  = this.generateValidPropName(state, false);
      const prop_name   = this.generateValidPropName(state);
      const getter_name = `isIn${prop_name}State`;
      const switch_name = `switchTo${prop_name}State`;

      Object.defineProperty(this, state_name, {
        get: () => real_i,
        ...this.commonProperties(),
        ...this.nonWritable()
      });

      Object.defineProperty(this, getter_name, {
      	get() {
      		return this[state_name] === this.currentState;
        },
        ...this.commonProperties(),
        ...this.nonWritable()
      });

      Object.defineProperty(this, switch_name, {
        value() {
          this.fireEvent(`before${prop_name}StateChange`);
          this.currentState = this[state_name];
          this.fireEvent(`after${prop_name}StateChange`);
        },
        ...this.commonProperties(),
      });

      i++;
    }
  }

  fireEvent(event) {
    if (!!this[event]) {
      this[event]();
    }
  }

  generateValidPropName(state_name, uc_first = true) {
    let result = state_name;
    while (true) {
    	let index = result.indexOf('_');
    	if (index === -1) break;
      let start = result.slice(0, index);
      let end   = result.slice(index + 1, result.length);
      end = this.ucFirst(end);
      result = start + end;
    }
    if (uc_first)
      result = this.ucFirst(result);
    return result;
  }

  ucFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  commonProperties() {
    return {
      configurable: false,
      enumerable: true,
    };
  }

  nonWritable() {
    return {
      set() {
        throw new StateManagerError(`Trying to write a value into non-writable property`);
      },
    };
  }


  currentState = 0;
}

class StateManagerError extends Error {
  name = 'StateManagerError';
}
