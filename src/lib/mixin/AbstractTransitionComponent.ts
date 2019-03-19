import { Component, Vue } from 'vue-property-decorator';
import { AbstractRegistrableComponent } from './AbstractRegistrableComponent';
import AbstractTransitionController from '../util/AbstractVueTransitionController';

@Component
export class AbstractTransitionComponent extends AbstractRegistrableComponent {
  transitionController: AbstractTransitionController;
  beforeCreate() {
    this.transitionController = null;
  }
  destroyed() {
    if (this.transitionController !== undefined) {
      this.transitionController.dispose();
      this.transitionController = null;
    }
  }
  transitionIn(forceTransition: boolean = false) {
    return this.allComponentsReady.then(() =>
      this.transitionController.transitionIn(forceTransition),
    );
  }
  transitionOut(forceTransition: boolean = false, id: string = '', reset: boolean = false) {
    return this.transitionController.transitionOut(forceTransition, id, reset);
  }
  startLoopingAnimation(id: string, reset: boolean) {
    this.transitionController.startLoopingAnimation(id, reset);
  }
  stopLoopingAnimation() {
    this.transitionController.stopLoopingAnimation();
  }
}

export default new AbstractTransitionComponent();
