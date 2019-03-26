import DummyComponentBTransitionController from "./DummyComponentBTransitionController";
import { AbstractTransitionComponent } from "../../../../src/lib/mixin/AbstractTransitionComponent";

export default {
  name: 'DummyComponentB',
  extends: new AbstractTransitionComponent().$options,
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new DummyComponentBTransitionController(this);
      this.isReady();
    }
  },
};
