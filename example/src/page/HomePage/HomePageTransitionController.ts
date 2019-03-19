import { TimelineMax, Expo } from 'gsap';
import AbstractVueTransitionController from "../../../../src/lib/util/AbstractVueTransitionController";
import { AbstractTransitionComponent } from '../../../../src/lib/mixin/AbstractTransitionComponent';

export default class HomePageTransitionController extends AbstractVueTransitionController {

  /**
   * @protected
   * @param {TimelineMax} timeline
   * @param {AbstractTransitionComponent} parent
   * @param {string} id
   */
  protected setupTransitionInTimeline(
    timeline: TimelineMax,
    parent:AbstractTransitionComponent,
    id:string): void {
    timeline.fromTo(
      parent.$el,
      0.5,
      {
        autoAlpha: 0,
        scale: 0,
      },
      {
        autoAlpha: 1,
        scale: 1,
        ease: Expo.easeOut,
      },
    );
  }

  /**
   * @protected
   * @param {TimelineMax} timeline
   * @param {AbstractTransitionComponent} parent
   * @param {string} id
   */
  protected setupTransitionOutTimeline(
    timeline: TimelineMax,
    parent:AbstractTransitionComponent,
    id:string): void {
    timeline.to(
      parent.$el,
      0.5,
      {
        scale: 2,
        autoAlpha: 0,
        ease: Expo.easeIn,
      },
    );
  }

  /**
   * @protected
   * @param {TimelineMax} timeline
   * @param {AbstractTransitionComponent} parent
   * @param {string} id
   */
  protected setupLoopingAnimationTimeline(
    timeline:TimelineMax,
    parent:AbstractTransitionComponent,
    id:string): void {}
}
