import DummyComponentBTransitionController from "./DummyComponentBTransitionController";
import abstractTransitionComponent from "../../../../src/lib/mixin/AbstractTransitionComponent";

export default {
  name: 'DummyComponentB',
  extends: abstractTransitionComponent,
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new DummyComponentBTransitionController(this);
      this.isReady();
    }
  },
};
