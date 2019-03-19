import {} from 'mocha';
import { expect } from 'chai';
import { getMountedComponent } from './util/App';
import ChildComponentB from './util/ChildComponentB/ChildComponentB';
import ChildComponentA from './util/ChildComponentA/ChildComponentA';
import { AbstractTransitionComponent } from '../lib/mixin/AbstractTransitionComponent';

describe('AbstractRegistrableComponent', () => {
  describe('checkComponentsReady', () => {
    it('should check if all components are ready', () => {
      const component = new ChildComponentB();
      expect(component.checkComponentsReady()).to.be.undefined;
    });
  });

  describe('isReady', () => {
    it('should trigger the isReady method because the component is ready', () => {
      const component = new ChildComponentA();
      console.log(component);
      const childComponent = <AbstractTransitionComponent>component.$refs.ChildComponentB;
      expect(childComponent.isReady()).to.be.undefined;
    });
  });

  describe('updateRegistrableComponents', () => {
    it('should trigger the updateRegistrableComponents method and wait for them to be done', () => {
      const component = new ChildComponentB();
      return component.allComponentsReady.then(() => {
        component.updateRegistrableComponents(resolve => setTimeout(resolve, 1))
          .then(components => expect(components).to.be.an('array').that.is.empty)
      })
    });
  });

  describe('$destroy', () => {
    it('should trigger the destroy method', () => {
      const component = new ChildComponentB();
      component.$destroy();
      expect(component['_isDestroyed']).to.be.true;
    });
  });
});
