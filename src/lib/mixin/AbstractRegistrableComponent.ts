import { Component, Vue } from 'vue-property-decorator';
import isEqual from 'lodash/isEqual';
import filter from 'lodash/filter';

const IS_READY = 'isReady';

@Component
export class AbstractRegistrableComponent extends Vue {
  isRegistrable: boolean;
  componentId: boolean | string;
  registeredComponents: Array<AbstractRegistrableComponent>;
  newRegisteredComponents: Array<AbstractRegistrableComponent>;
  allComponentsReady: Promise<AbstractRegistrableComponent[]>;
  asyncComponentsReady: Promise<AbstractRegistrableComponent[]>;
  allComponentsReadyResolveMethod: Function;

  // Mutable data
  registrableComponents: Array<AbstractRegistrableComponent> = [];

  beforeCreate() {
    this.isRegistrable = true;
    // Root components do not contain a $vnode, so use the name as a fallback
    if (this.$vnode !== undefined && this.$vnode.data.ref !== undefined) {
      this.componentId = this.$vnode.data.ref;
    } else {
      this.componentId = this.$options.name;
    }
    this.registeredComponents = [];
    this.newRegisteredComponents = [];
    this.allComponentsReady = new Promise(resolve => {
      this.allComponentsReadyResolveMethod = resolve;
    });
  }

  destroyed() {
    this.isRegistrable = null;

    if (this.registeredComponents !== undefined) {
      this.registeredComponents.length = 0;
      this.registeredComponents = null;
    }

    if (this.newRegisteredComponents !== undefined) {
      this.newRegisteredComponents.length = 0;
      this.newRegisteredComponents = null;
    }
  }

  isReady() {
    // If you want to you can listen to the isReady event
    this.$emit(IS_READY, this);
    // Notify the parent about being ready
    if (this.parentComponent !== undefined && this.parentComponent.componentReady !== undefined) {
      this.parentComponent.componentReady(this);
    }
  }
  handleAllComponentsReady() {}
  updateRegistrableComponents(callback: Function) {
    // Store the components before change
    const beforeChange = this.registrableComponents.map((child: any) => child._uid);
    // Reset the array
    this.registeredComponents = [];
    // Create a new promise for notify'ing about the change
    this.asyncComponentsReady = new Promise(resolve => {
      this.allComponentsReadyResolveMethod = resolve;
    });
    // Promised is used for doing async code in the component
    new Promise(resolve => callback(resolve)).then(() => {
      // NOTE: Removed the $nextTick here because sometimes components do not have child components and therefore they
      // trigger the isReady method right away, breaking the flow!
      // Update the list of registrable components
      this.registrableComponents = filter(
        this.$children as Array<AbstractRegistrableComponent>,
        child => child.isRegistrable,
      );
      // Find the new components after the change
      const afterChange = this.registrableComponents.map((child: any) => child._uid);
      // Store the id's of the new components
      this.newRegisteredComponents = afterChange.filter(
        child => beforeChange.indexOf(child) === -1,
      );
      // Restore the components that were not modified
      this.registeredComponents = afterChange.filter(child => beforeChange.indexOf(child) > -1);
      // There might be no change so trigger the resolve method right away!
      if (
        isEqual(beforeChange, afterChange) ||
        (this.newRegisteredComponents.length === 0 && afterChange.length < beforeChange.length)
      ) {
        this.allComponentsReadyResolveMethod(this.newRegisteredComponents);
      }
    });

    // Return the promise
    return this.asyncComponentsReady;
  }
  componentReady(component: any) {
    // Store the component id, so we can check if all are loaded
    this.registeredComponents.push(component._uid);
    // Check if we reached the total amount of transition components
    if (
      this.registrableComponents.length === this.registeredComponents.length &&
      this.allComponentsReadyResolveMethod !== undefined
    ) {
      this.allComponentsReadyResolveMethod(
        filter(
          this.$children,
          (child: any) => this.newRegisteredComponents.indexOf(child._uid) > -1,
        ),
      );
      this.newRegisteredComponents = [];
      this.allComponentsReadyResolveMethod = null;
    }
  }
  checkComponentsReady() {
    if (this.registrableComponents.length === 0) {
      this.allComponentsReadyResolveMethod();
    }
  }

  mounted() {
    // Update the array of registrable components
    this.registrableComponents = filter(
      this.$children as Array<AbstractRegistrableComponent>,
      child => child.isRegistrable,
    );
    // On init everything is new
    this.newRegisteredComponents = this.registrableComponents.map((child: any) => child._uid);
    // Wait for all components to be ready
    this.allComponentsReady
      .then(() => this.handleAllComponentsReady())
      // Add a timeout to allow error throwing in the promise chain!
      .catch(result => {
        /* istanbul ignore next */
        setTimeout(() => {
          throw result;
        });
      });
    // We wait for the next tick otherwise the $children might not be set when you use a v-for loop
    this.$nextTick(() => this.checkComponentsReady());
  }

  get parentComponent(): AbstractRegistrableComponent {
    return this.$parent as AbstractRegistrableComponent;
  }
}

export default new AbstractRegistrableComponent();
