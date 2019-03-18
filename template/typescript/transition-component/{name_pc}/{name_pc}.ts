import { AbstractTransitionComponent } from 'vue-transition-component';
import {{name_pc}}TransitionController from './{{name_pc}}TransitionController';

@Component
export default class {{name_pc}} extends AbstractTransitionComponent {
  public handleAllComponentsReady(): void {
    this.transitionController: TransitionController = new {{name_pc}}TransitionController(this);
    this.isReady();
  }
}
