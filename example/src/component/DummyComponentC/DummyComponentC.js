import DummyComponentCTransitionController from "./DummyComponentCTransitionController";
import abstractTransitionComponent from "../../../../src/lib/mixin/AbstractTransitionComponent";

export default {
  name: 'DummyComponentC',
  extends: abstractTransitionComponent,
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new DummyComponentCTransitionController(this);
      this.isReady();
    }
  },
};
