import { Component } from 'vue-property-decorator';
import { AbstractTransitionComponent } from '../../../src/lib/mixin/AbstractTransitionComponent';
import ChildComponentBTransitionController from './ChildComponentBTransitionController';

@Component({
  template: `<div></div>`
})
export default class ChildComponentB extends AbstractTransitionComponent {
  handleAllComponentsReady() {
    this.transitionController = new ChildComponentBTransitionController(this);
    this.isReady();
  }
}
