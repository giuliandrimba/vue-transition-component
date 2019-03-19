import AbstractTransitionController from 'transition-controller';
import isString from 'lodash/isString';
import isElement from 'lodash/isElement';
import { AbstractTransitionComponent } from '../mixin/AbstractTransitionComponent';

export default abstract class AbstractVueTransitionController extends AbstractTransitionController<
  AbstractTransitionComponent
> {
  /**
   * This method finds a component based on a string, a html element or the instance.
   *
   * @protected
   * @param {string | HTMLElement | AbstractTransitionComponent} component The selector for the component
   * @returns {AbstractTransitionComponent} The instance of the component you requested
   */
  protected getComponent(
    component: string | HTMLElement | AbstractTransitionComponent,
  ): AbstractTransitionComponent {
    let instance: AbstractTransitionComponent;

    if (isElement(component)) {
      instance = <AbstractTransitionComponent>this.parentController.$children.find(
        child => child.$el === component,
      );
    } else if (isString(component)) {
      const instances = (<Array<AbstractTransitionComponent>>this.parentController.$children)
        .map(
          (child: AbstractTransitionComponent) => (child.componentId === component ? child : null),
        )
        .filter((child: AbstractTransitionComponent) => child !== null);

      if (instances.length > 1) {
        throw new Error(
          `Found multiple components matching [${component}], use a unique ref when requesting a component with an id`,
        );
      }

      instance = instances.pop();
    } else {
      instance = <AbstractTransitionComponent>component;
    }

    if (instance === undefined) {
      throw new Error(`The requested component [${component}] does not exist`);
    }

    return instance;
  }
}
