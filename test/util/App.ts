import Vue from 'vue/dist/vue.js';
import { Component } from 'vue-property-decorator';
import abstractRegistrableComponent, { AbstractRegistrableComponent } from '../../src/lib/mixin/AbstractRegistrableComponent';
import { AbstractTransitionComponent } from '../../src/lib/mixin/AbstractTransitionComponent';
import { AbstractPageTransitionComponent } from '../../src/lib/mixin/AbstractPageTransitionComponent';
import ChildComponentA from './ChildComponentA/ChildComponentA';
import ChildComponentB from './ChildComponentB/ChildComponentB';
import PageComponentA from './PageComponentA/PageComponentA';

// Disable development logging
Vue.config.productionTip = false;

/**
 * @description Return a test application with two dummy components
 * @returns {Vue}
 */
export const getApplication = () => {
  @Component({
    components: {
      ChildComponentA,
      ChildComponentB,
      PageComponentA,
    },
    template: `<div>
    <ChildComponentA ref="ChildComponentA"/>
    <ChildComponentB ref="ChildComponentB" />
    <PageComponentA ref="PageComponentA" />
  </div>`
  })
  class App extends AbstractRegistrableComponent {}
  return (new App()).$mount();
};

/**
 * @description mount a provided vue component and return the instance
 * @param component
 * @param propsData
 * @returns {AbstractPageTransitionComponent|AbstractTransitionComponent|AbstractRegistrableComponent}
 */
export const getMountedComponent = (
  component,
  propsData = {},
):
  | AbstractPageTransitionComponent
  | AbstractTransitionComponent
  | AbstractRegistrableComponent => {
  const constructor = (<any>Vue).extend(component);
  return <
    | AbstractPageTransitionComponent
    | AbstractTransitionComponent
    | AbstractRegistrableComponent>new constructor({ propsData }).$mount();
};

/**
 * @description get a child component based on it's componentId
 * @param {AbstractRegistrableComponent} app
 * @param {string} componentId
 * @returns {Promise<AbstractPageTransitionComponent|AbstractTransitionComponent|AbstractRegistrableComponent>}
 */
export const getChildComponent = (
  app: AbstractRegistrableComponent,
  componentId: string,
): Promise<
  AbstractPageTransitionComponent | AbstractTransitionComponent | AbstractRegistrableComponent
> => {
  return new Promise(resolve => {
    app.allComponentsReady
      .then(() => resolve(app.$refs[componentId]))
      .catch(reason => console.log(reason));
  });
};
