import { Component } from 'vue-property-decorator';
import { AbstractPageTransitionComponent } from '../../../src/lib/mixin/AbstractPageTransitionComponent';
import PageComponentATransitionController from './PageComponentATransitionController';

@Component({
  template: `<div>PageAComponentA</div>`
})
export default class PageComponentA extends AbstractPageTransitionComponent {
  handleAllComponentsReady() {
    this.transitionController = new PageComponentATransitionController(this);
    this.isReady();
  }
}
