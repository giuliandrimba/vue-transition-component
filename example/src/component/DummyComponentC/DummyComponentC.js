import DummyComponentCTransitionController from "./DummyComponentCTransitionController";
import { AbstractTransitionComponent } from "../../../../src/lib/mixin/AbstractTransitionComponent";

export default {
  name: 'DummyComponentC',
  extends: new AbstractTransitionComponent().$options,
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new DummyComponentCTransitionController(this);
      this.isReady();
    }
  },
};
