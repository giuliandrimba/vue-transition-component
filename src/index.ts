import abstractRegistrableComponent, {
  AbstractRegistrableComponent,
} from './lib/mixin/AbstractRegistrableComponent';
import abstractTransitionComponent, {
  AbstractTransitionComponent,
} from './lib/mixin/AbstractTransitionComponent';
import abstractPageTransitionComponent, {
  AbstractPageTransitionComponent,
} from './lib/mixin/AbstractPageTransitionComponent';
import { IRoute } from './lib/interface/IRoute';

export {
  TransitionEvent,
  TimelineType,
  TransitionDirection,
  IAbstractTransitionControllerOptions,
  ICreateTimelineOptions,
} from 'transition-controller';

export { default as FlowManager } from './lib/util/FlowManager';
export {
  default as AbstractTransitionController,
} from './lib/util/AbstractVueTransitionController';
export { default as FlowType } from './lib/enum/FlowType';
export { default as FlowEvent } from './lib/event/FlowEvent';
export {
  AbstractPageTransitionComponent,
  abstractPageTransitionComponent,
  AbstractRegistrableComponent,
  abstractRegistrableComponent,
  AbstractTransitionComponent,
  abstractTransitionComponent,
  IRoute,
};
