import { expect } from 'chai';
import { getMountedComponent } from './util/App';
import {} from 'mocha';
import { AbstractPageTransitionComponent }  from '../src/lib/mixin/AbstractPageTransitionComponent';
import PageComponentA from './util/PageComponentA/PageComponentA';

describe('AbstractPageTransitionComponent', () => {
  describe('hijackTransitionIn', () => {
    it('should hijack the transition in until it\'s done', () => {
      const component = <AbstractPageTransitionComponent>getMountedComponent(PageComponentA);
      return component.hijackTransitionIn().then(release => setTimeout(release, 1))
        .then(() => expect(component.transitionInHijack).to.not.be.undefined)
    });
  });
});
