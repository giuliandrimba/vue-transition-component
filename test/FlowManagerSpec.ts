import * as Vue from 'vue';
import { expect } from 'chai';
import { Promise } from 'es6-promise';
import { FlowManager } from '../src/lib/util/FlowManager';
import IAbstractPageTransitionComponent from '../src/lib/interface/IAbstractPageTransitionComponent';
import AbstractPageTransitionComponent from '../src/lib/mixin/AbstractPageTransitionComponent'
import DummyTransitionController from './util/DummyTransitionController';
import FlowTypes from '../src/lib/enum/FlowTypes';

describe('FlowManager', () => {
	let flowManager: FlowManager;

	beforeEach(function () {
		flowManager = new FlowManager();
	});

	/**
	 * @description Wrapper method to create a vue transition page
	 * @returns {Promise}
	 */
	const createPage = (id: string, flowType: FlowTypes) => {
		return new Promise((resolve: (page: IAbstractPageTransitionComponent) => void) => {
			const transitionComponent = new Vue({
				name: id,
				el: document.createElement('div'),
				extends: AbstractPageTransitionComponent,
				beforeCreate() {
					const self = <any>this;
					self.componentId = id;
					self.flow = flowType;
				},
				methods: {
					handleAllComponentsReady() {
						// Force casting!
						const self = <any>this;
						self.transitionController = new DummyTransitionController(self);
						self.isReady();

						resolve(<IAbstractPageTransitionComponent>transitionComponent);
					},
				}
			});
		})
	}

	it('should return the transition out promise', () => {
		const transitionOutPromise = flowManager.transitionOut;
		expect(transitionOutPromise).to.equal(undefined);
	});

	it('start a NORMAL flow', (done) => {
		createPage('DummyPage', FlowTypes.NORMAL).then((page) => {
			flowManager.start(page, () => done());
		})
	});

	it('start a NORMAL flow with the same component id', (done) => {
		createPage('DummyPage', FlowTypes.NORMAL).then((page) => {
			flowManager.start(page, () => flowManager.start(page, () => done()));
		})
	});

	it('start a CROSS flow', (done) => {
		createPage('DummyPage', FlowTypes.CROSS).then((page) => {
			flowManager.start(page, () => done());
		})
	})

	it('should throw an error', (done) => {
		createPage('DummyPage', null).then((page) => {
			expect(() => flowManager.start(page, () => {})).to.throw(Error);
			done()
		})
	});

	it('should dispose the FlowManager and mark it as disposed', () => {
		flowManager.dispose();
		expect(flowManager.isDisposed()).to.equal(true);
	});
});