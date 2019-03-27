import DummyComponentATransitionController from "./DummyComponentATransitionController";
import abstractTransitionComponent from "../../../../src/lib/mixin/AbstractTransitionComponent";
import DummyComponentB from "../DummyComponentB";

export default {
  name: 'DummyComponentA',
  extends: abstractTransitionComponent.$options,
  components: {
    DummyComponentB,
  },
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new DummyComponentATransitionController(this);
      this.isReady();
    }
  },
};
