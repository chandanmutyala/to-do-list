/*global QUnit*/

sap.ui.define([
	"to-do-list/controller/todolist.controller"
], function (Controller) {
	"use strict";

	QUnit.module("todolist Controller");

	QUnit.test("I should test the todolist controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
