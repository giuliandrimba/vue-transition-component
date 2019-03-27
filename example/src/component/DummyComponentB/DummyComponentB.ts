import { Component } from 'vue-property-decorator';
import DummyComponentBTransitionController from './DummyComponentBTransitionController';
import { AbstractTransitionComponent } from '../../../../src/lib/mixin/AbstractTransitionComponent';

@Component
export default class DummyComponentB extends AbstractTransitionComponent {
  handleAllComponentsReady() {
    this.transitionController = new DummyComponentBTransitionController(this);
    this.isReady();
  }
}
