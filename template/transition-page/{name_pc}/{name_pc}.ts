import { AbstractPageTransitionComponent } from 'vue-transition-component';
import {{name_pc}}TransitionController from './{{name_pc}}TransitionController';

@Component
export default class {{name_pc}} extends AbstractPageTransitionComponent {
  public handleAllComponentsReady(): void {
    this.transitionController = new {{name_pc}}TransitionController(this);
    this.isReady();
  }
}
