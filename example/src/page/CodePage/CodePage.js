import hljs from 'highlight.js';
import abstractPageTransitionComponent from '../../../../src/lib/mixin/AbstractPageTransitionComponent';
import CodepageTransitionController from './CodepageTransitionController';
import DummyComponentA from '../../component/DummyComponentA';
import DummyComponentB from '../../component/DummyComponentB';
import DummyComponentC from '../../component/DummyComponentC';

export default {
  name: 'CodePage',
  extends: abstractPageTransitionComponent,
  components: {
    DummyComponentA,
    DummyComponentB,
    DummyComponentC,
  },
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new CodepageTransitionController(this);
      this.$el.querySelectorAll('pre').forEach(code => hljs.highlightBlock(code));
      this.isReady();
    },
  },
};
