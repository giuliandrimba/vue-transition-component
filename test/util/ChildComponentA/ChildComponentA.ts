import { Component } from 'vue-property-decorator';
import { AbstractTransitionComponent } from '../../../src/lib/mixin/AbstractTransitionComponent';
import ChildComponentATransitionController from './ChildComponentATransitionController';
import ChildComponentB from '../ChildComponentB/ChildComponentB';

@Component({
  components: {
    ChildComponentB: new ChildComponentB(),
  },
  template: `<div><div ref="ChildComponentB" /></div>`,
})
export default class ChildComponentA extends AbstractTransitionComponent {
  handleAllComponentsReady() {
    this.transitionController = new ChildComponentATransitionController(this);
    this.isReady();
  }
}
