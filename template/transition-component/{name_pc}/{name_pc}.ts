import { Component } from 'vue-property-decorator';
import { AbstractTransitionComponent } from 'vue-transition-component';
import {{name_pc}}TransitionController from './{{name_pc}}TransitionController';

@Component
export default class {{name_pc}} extends AbstractTransitionComponent {
  public handleAllComponentsReady(): void {
    this.transitionController = new {{name_pc}}TransitionController(this);
    this.isReady();
  }
}
