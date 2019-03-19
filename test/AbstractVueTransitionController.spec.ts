import { TransitionDirection } from 'transition-controller';
import {} from 'mocha';
import { expect } from 'chai';
import { getMountedComponent } from './util/App';
import ChildComponentA from './util/ChildComponentA/ChildComponentA';
import { AbstractTransitionComponent } from '../lib/mixin/AbstractTransitionComponent';

describe('AbstractVueTransitionControllerSpec', () => {
  describe('getSubTimelineByComponent', () => {
    it('should get the subtimeline by the component reference', () => {
      const component = new ChildComponentA();
      return component.allComponentsReady
        .then(() => component.transitionController.getTimeline('ChildComponentB'))
        .then(component => expect(component).to.not.be.undefined);
    });

    it('should get the subtimeline by the component instance', () => {
      const component = new ChildComponentA();
      return component.allComponentsReady
        .then(() =>
          component.transitionController.getTimeline(<AbstractTransitionComponent>component.$refs.ChildComponentB),
        )
        .then(component => expect(component).to.not.be.undefined);
    });

    it('should get the subtimeline by the element', () => {
      const component = new ChildComponentA();
      return component.allComponentsReady
        .then(() =>
          component.transitionController.getTimeline(
            (<AbstractTransitionComponent>component.$refs.ChildComponentB).$el,
          ),
        )
        .then(component => expect(component).to.not.be.undefined);
    });

    it('should get the subtimeline by the component reference, in the in direction', () => {
      const component = new ChildComponentA();
      return component.allComponentsReady
        .then(() =>
          component.transitionController.getTimeline('ChildComponentB', TransitionDirection.IN),
        )
        .then(component => expect(component).to.not.be.undefined);
    });

    it('should try to get the subtimeline but fail because it does not exist', () => {
      const component = new ChildComponentA();
      return component.allComponentsReady.then(() =>
        expect(() => component.transitionController.getTimeline('Foo')).to.throw(Error),
      );
    });
  });
});
