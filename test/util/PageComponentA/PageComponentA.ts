import { Component } from 'vue-property-decorator';
import { AbstractPageTransitionComponent } from '../../../src/lib/mixin/AbstractPageTransitionComponent';
import PageComponentATransitionController from './PageComponentATransitionController';

@Component
export default class PageComponentA extends AbstractPageTransitionComponent {
  template = `<div>PageAComponentA</div>`;
  handleAllComponentsReady() {
    this.transitionController = new PageComponentATransitionController(this);
    this.isReady();
  }
}
