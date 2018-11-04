(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n    display: block;\n    font-size: 18px;\n}\n\n*, *::before, *::after {\n    box-sizing: border-box;\n}\n\n.container {\n    position: relative;\n}\n\nform {\n    margin-top: 15px;\n}\n\ninput {\n    margin-bottom: 15px;\n}\n\n.btn-center {\n    margin-left: 50%;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%);\n}\n\n.field {\n    margin-bottom: 15px;\n}\n\ninput.ng-touched.ng-invalid {\n    border: 1px solid rgb(231, 70, 96);\n}\n\n.add__line {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.add__line input {\n    margin-bottom: 0;\n    margin-right: 5px;\n}"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <form (ngSubmit)=\"submitPhrases()\" #f=\"ngForm\">\n    <input type=\"text\" [(ngModel)]=\"tuplesPhrases\" name=\"tuplesPhrases\" class=\"form-control\" />\n    <button class=\"btn btn-primary btn-center\" [disabled]=\"!f.valid\">Submit</button>\n  </form>\n  <hr>\n  <button class=\"btn btn-success btn-center\" (click)=\"saveFile()\">Save Data</button>\n  <hr>\n</div>\n<ng-template [ngIf]=\"toggleInputs\">\n  <div class=\"add-line container\">\n    <form #addLine=\"ngForm\" (ngSubmit)=\"addNewLine(addLine)\" class=\"form-group add__line\">\n      <input type=\"text\" ngModel #line=\"ngModel\" name=\"line\" class=\"form-control\" required />\n\n      <button class=\"btn btn-default\" type=\"submit\" [disabled]=\"!f.valid\">\n        <i class=\"fa fa-plus\"></i>\n      </button>\n    </form>\n  </div>\n  <hr>\n  <div *ngFor=\"let line of lines; let i = index\">\n    <app-phrase [line]=\"line\" [entities]=\"entities\" [lineIndex]=\"i\" (updateLines)=\"updateLines($event)\">\n    </app-phrase>\n\n  </div>\n</ng-template>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_store_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/store.service */ "./src/app/services/store.service.ts");
/* harmony import */ var ngx_filesaver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-filesaver */ "./node_modules/ngx-filesaver/fesm5/ngx-filesaver.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Import the core angular services.



var AppComponent = /** @class */ (function () {
    function AppComponent(store, fileSaver) {
        this.store = store;
        this.fileSaver = fileSaver;
        this.toggleInputs = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.entities = this.store.getEntities();
        this.store.getIndex().forEach(function (event) {
            _this.removeSelection(+event);
        });
    };
    AppComponent.prototype.addNewLine = function (f) {
        var newPhrase = f.value.line;
        console.log(f);
        var line = [
            newPhrase,
            {
                entities: []
            }
        ];
        this.lines.unshift(line);
    };
    AppComponent.prototype.removeSelection = function (index) {
        for (var i = 0; i < this.lines.length; i++) {
            if (i === index) {
                this.lines[i]['hostRectangle'] = true;
            }
            else {
                this.lines[i]['hostRectangle'] = false;
            }
        }
    };
    // ---
    // PUBLIC METHODS.
    // ---
    AppComponent.prototype.updateLines = function (event) {
        var index = event.index, line = event.line;
        this.lines[index] = line;
    };
    AppComponent.prototype.saveFile = function () {
        var tuples = this.store.arrays2Tuples(this.lines);
        var data = new Blob([tuples], { type: "text/plain;charset=utf-8" });
        this.fileSaver.save(data, 'data-angular.txt');
    };
    AppComponent.prototype.submitPhrases = function () {
        this.toggleInputs = true;
        this.lines = this.store.tuple2Arrays(this.tuplesPhrases);
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-root",
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")],
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html")
        }),
        __metadata("design:paramtypes", [_services_store_service__WEBPACK_IMPORTED_MODULE_1__["StoreService"],
            ngx_filesaver__WEBPACK_IMPORTED_MODULE_2__["FileSaverService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _directives_text_selection_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./directives/text-selection.directive */ "./src/app/directives/text-selection.directive.ts");
/* harmony import */ var ng_contenteditable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng-contenteditable */ "./node_modules/ng-contenteditable/ng-contenteditable.umd.js");
/* harmony import */ var ng_contenteditable__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ng_contenteditable__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _components_phrase_phrase_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/phrase/phrase.component */ "./src/app/components/phrase/phrase.component.ts");
/* harmony import */ var _services_store_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services/store.service */ "./src/app/services/store.service.ts");
/* harmony import */ var _services_file_op_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./services/file-op.service */ "./src/app/services/file-op.service.ts");
/* harmony import */ var _pipes_loop_over_objects_pipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pipes/loop-over-objects.pipe */ "./src/app/pipes/loop-over-objects.pipe.ts");
/* harmony import */ var ngx_filesaver__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-filesaver */ "./node_modules/ngx-filesaver/fesm5/ngx-filesaver.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
                _directives_text_selection_directive__WEBPACK_IMPORTED_MODULE_3__["TextSelectDirective"],
                _components_phrase_phrase_component__WEBPACK_IMPORTED_MODULE_6__["PhraseComponent"],
                _pipes_loop_over_objects_pipe__WEBPACK_IMPORTED_MODULE_9__["LoopOverObjectsPipe"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                ng_contenteditable__WEBPACK_IMPORTED_MODULE_4__["ContenteditableModule"],
                ngx_filesaver__WEBPACK_IMPORTED_MODULE_10__["FileSaverModule"]
            ],
            providers: [
                _services_store_service__WEBPACK_IMPORTED_MODULE_7__["StoreService"],
                _services_file_op_service__WEBPACK_IMPORTED_MODULE_8__["FileOpService"],
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/components/phrase/phrase.component.css":
/*!********************************************************!*\
  !*** ./src/app/components/phrase/phrase.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".entities {\n    margin-bottom: 15px;\n    margin-top: 15px;\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n    justify-content: center;\n    align-items: center;\n}\n\n.entities .entity {\n    margin: 5px;\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    align-items: center;\n    padding: 2px 5px;\n    font-size: 14px;\n    border-radius: 5px;\n    cursor: pointer;\n}\n\n.field {\n    margin-bottom: 15px;\n}\n\n.icon {\n    padding: 2px 5px;\n    cursor: pointer;\n}\n\n.icon .fa.fa-trash {\n    color: rgb(231, 70, 69);\n    font-size: 26px;\n}"

/***/ }),

/***/ "./src/app/components/phrase/phrase.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/phrase/phrase.component.ts ***!
  \*******************************************************/
/*! exports provided: PhraseComponent, DynamicComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PhraseComponent", function() { return PhraseComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicComponent", function() { return DynamicComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _services_store_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/store.service */ "./src/app/services/store.service.ts");
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PhraseComponent = /** @class */ (function () {
    function PhraseComponent(compiler, store) {
        this.compiler = compiler;
        this.store = store;
        this.updateLines = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.entityIndex = -1;
        this.selection = false;
        this.selectionIndecies = {
            start: null,
            end: null
        };
    }
    PhraseComponent.prototype.ngOnInit = function () {
        this.getEntitesFromPhrase();
    };
    PhraseComponent.prototype.triggerChange = function (event) {
        var newText = event.target.innerText;
        this.updateParentLines(newText);
    };
    PhraseComponent.prototype.removeEntity = function () {
        this.line[1]['entities'].splice(+this.entityIndex, 1);
        this.store.sendIndex(-1);
        this.updateParentLines();
    };
    PhraseComponent.prototype.updateParentLines = function (text) {
        var textParam = null;
        if (text && (text !== '')) {
            textParam = text;
        }
        this.getEntitesFromPhrase(textParam);
        this.updateLines.emit({ line: this.line, index: this.lineIndex });
    };
    PhraseComponent.prototype.selectPhrase = function (entityIndex) {
        this.entityIndex = entityIndex;
        this.selection = false;
        this.store.sendIndex(this.lineIndex);
    };
    PhraseComponent.prototype.renderRectangles = function (event) {
        this.selection = true;
        console.group("Text Select Event");
        console.log("Text:", event.text);
        console.log("Selection State", event.selectionState);
        console.groupEnd();
        this.store.sendIndex(this.lineIndex);
        if (event.text) {
            this.line['selectedText'] = event.text;
            this.selectionIndecies = __assign({}, event.selectionState);
        }
        console.log(this.line['selectedText']);
        // If a new selection has been created, the viewport and host rectangles will
        // exist. Or, if a selection is being removed, the rectangles will be null.
        if (event.hostRectangle) {
            this.line['hostRectangle'] = true;
        }
        else {
            this.store.sendIndex(this.lineIndex);
        }
    };
    PhraseComponent.prototype.changeEntity = function (entityName) {
        if (!this.selection) {
            // Clicked in entity word
            this.updateExistedEntityWord(entityName);
        }
        else {
            /**
             * Selection
             *
             */
            var entityObj = this.getEntityObject(entityName, this.selectionIndecies.start, this.selectionIndecies.end);
            var newEntityItem = [
                entityObj.start,
                entityObj.end,
                entityObj.type
            ];
            var entities = this.line[1]['entities'];
            /*** Case of empty Phrase  */
            if (entities && (entities.length === 0)) {
                this.line[1]['entities'].push(newEntityItem);
                this.store.sendIndex(-1);
                this.updateParentLines();
                return;
            }
            var checkIndexIfExisted = this.checkIfExtendExistedEntity(newEntityItem, entities);
            if (checkIndexIfExisted !== -1) {
                this.line[1]['entities'][checkIndexIfExisted] = newEntityItem;
                this.store.sendIndex(-1);
                this.updateParentLines();
                return;
            }
            var entitiesLen = this.line[1]['entities'].length;
            var firstEntityStartPos = this.line[1]['entities'][0][0];
            var lastEntityEndPos = this.line[1]['entities'][entitiesLen - 1][1];
            /**
             *
             * Case Of Start Of Phrase
             *
             */
            if (firstEntityStartPos > newEntityItem[0]) {
                this.line[1]['entities'].splice(0, 0, newEntityItem);
                this.store.sendIndex(-1);
                this.updateParentLines();
                return;
            }
            /**
             *
             * Case Of end Of Phrase
             */
            if (lastEntityEndPos < newEntityItem[1]) {
                this.line[1]['entities'].splice(entitiesLen + 1, 0, newEntityItem);
                this.store.sendIndex(-1);
                this.updateParentLines();
                return;
            }
            for (var i = 0; i < entities.length - 1; i++) {
                var fStart = entities[i][0];
                var sEnd = entities[i + 1][1];
                var iStart = newEntityItem[0];
                if (fStart < iStart && sEnd > iStart) {
                    this.line[1]['entities'].splice(i + 1, 0, newEntityItem);
                    this.store.sendIndex(-1);
                    this.updateParentLines();
                    return;
                }
            }
        }
    };
    PhraseComponent.prototype.checkIfExtendExistedEntity = function (entity, entities) {
        var iStart = entity[0];
        for (var i = 0; i < entities.length; i++) {
            var fStart = entities[i][0];
            if (fStart === iStart) {
                return i;
            }
        }
        return -1;
    };
    PhraseComponent.prototype.getEntityObject = function (entityName, startIndex, endIndex) {
        console.group('Selected Text');
        console.log('index', startIndex);
        console.log('endIndex', endIndex);
        console.groupEnd();
        return {
            start: startIndex,
            end: endIndex,
            type: entityName
        };
    };
    PhraseComponent.prototype.updateExistedEntityWord = function (entityName) {
        var entityIndex = this.entityIndex;
        var entities = this.line[1]['entities'];
        if (entities && entities.length) {
            this.line[1]['entities'][entityIndex][2] = entityName;
        }
        this.store.sendIndex(-1);
        this.updateParentLines();
    };
    PhraseComponent.prototype.addEntityBySelection = function (entityName) {
        // arr.splice(7, 0, "Mohamed"); // Insert in specific location
        /**
         *
         * Finite State Machine Of Selection of text
         *                    -----> Start Of Phrase ===> unshif inside entities array ==> %Done
         *    @@@ Selection   -----> Middle Of Phrase >>>> insertInMiddelLogic ==> %Done
         *                    -----> End Of Phrase ===> push inside entities array ==> %Done
         *
         *    # insertInMiddelLogic %Done
         *        ----> get entities array of selected phrase
         *        ----> for loop over elements and check two elements together
         *        ----> check (end of first element) with (start of second element)
         *        ----> get the (start of the new entity) and check them with previous step
         *        ----> if (el1.end < new.start && el2.start > new.start) ==> should be inserted instead of el2
         *
         *
         *    Select an exist entity phrase  ----> updateExistedEntityWord ==> %Done
         *    Select an exist entity phrase from (start ,middle, end)  ----> unknow????
         *    Select an exist entity phrase with new phrase  >>>> updateEntityLogic() ==> %Done
         *    Select an exist entity phrase with another entity phrase  ----> Error Like Dialogflow or another behaviour
         *
         *    # updateEntityLogic %Done
         *        -----> Get entities array of selected phrase
         *        -----> loop over them & if start of one of them === to the new.start
         *        -----> Update end of this entity
         *
         */
    };
    PhraseComponent.prototype.ngOnDestroy = function () {
        this.componentRef.destroy();
        this.componentRef = null;
    };
    PhraseComponent.prototype.compileTemplate = function () {
        console.log('[Parent Cmp] Inside Compile!');
        var metadata = {
            selector: "runtime-component-sample",
            template: this.line[4]
        };
        var factory = this.createComponentFactorySync(this.compiler, metadata);
        if (this.componentRef) {
            this.componentRef.destroy();
            this.componentRef = null;
            console.log('[CmpRef] Nullish!');
        }
        this.componentRef = this.container.createComponent(factory);
        var instance = this.componentRef.instance;
        /**
         *
         * Inputs, Outputs of created component
         */
        instance.line = this.line;
        instance.selectPhrase.subscribe(this.selectPhrase.bind(this));
    };
    PhraseComponent.prototype.createComponentFactorySync = function (compiler, metadata, componentClass) {
        var cmpClass;
        var decoratedCmp;
        if (componentClass) {
            cmpClass = componentClass;
            decoratedCmp = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])(metadata)(cmpClass);
        }
        else {
            var RuntimeComponent = /** @class */ (function () {
                function RuntimeComponent() {
                    this.selectPhrase = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
                }
                RuntimeComponent.prototype.showEntities = function (lineIndex, entityIndex) {
                    this.selectPhrase.emit(entityIndex);
                };
                RuntimeComponent.prototype.ngOnDestroy = function () {
                    console.log('[Dynmaic Component] Destroyed!');
                };
                __decorate([
                    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
                    __metadata("design:type", Object)
                ], RuntimeComponent.prototype, "line", void 0);
                __decorate([
                    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
                    __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
                ], RuntimeComponent.prototype, "selectPhrase", void 0);
                RuntimeComponent = __decorate([
                    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])(metadata)
                ], RuntimeComponent);
                return RuntimeComponent;
            }());
            ;
            decoratedCmp = RuntimeComponent;
        }
        var RuntimeComponentModule = /** @class */ (function () {
            function RuntimeComponentModule() {
            }
            RuntimeComponentModule = __decorate([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({ imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]], declarations: [decoratedCmp] })
            ], RuntimeComponentModule);
            return RuntimeComponentModule;
        }());
        var module = compiler.compileModuleAndAllComponentsSync(RuntimeComponentModule);
        return module.componentFactories.find(function (f) { return f.componentType === decoratedCmp; });
    };
    PhraseComponent.prototype.getEntitesFromPhrase = function (text) {
        var phrase;
        if (text) {
            phrase = text;
            this.line[0] = phrase;
        }
        else {
            phrase = this.line[0];
        }
        var entities = this.line[1]['entities']; // Array
        this.line[2] = phrase;
        var originalPhrase = this.line[2]; // original phrase
        this.line[3] = []; // output content
        this.line[4] = '';
        var actualEnd = -1;
        if (entities && entities.length) {
            for (var j = 0; j < entities.length; j++) {
                var entity = entities[j];
                /**
                 * 0 => Start
                 * 1 => End
                 * 2 => Entity Name
                 */
                var start = entity[0];
                if (start !== 0 && actualEnd === -1) {
                    var tokensBetweenEntities = originalPhrase.substring(0, start);
                    phrase = phrase.substring(tokensBetweenEntities.length);
                    this.line[3].push(tokensBetweenEntities);
                }
                var end = entity[1];
                var entityName = entity[2];
                var token = originalPhrase.substring(start, end);
                if (actualEnd < start && actualEnd !== -1) {
                    var tokensBetweenEntities = originalPhrase.substring(actualEnd, start);
                    phrase = phrase.substring(tokensBetweenEntities.length);
                    this.line[3].push(tokensBetweenEntities);
                }
                phrase = phrase.substring(token.length);
                actualEnd = end;
                var tokenWithEntity = "<span [ngStyle]=\"{ \n          'background-color' : '" + this.entities[entityName] + "', \n          'cursor': 'pointer' \n        }\" (click)=\"showEntities(" + this.lineIndex + ", " + j + ")\">" + token + "</span>";
                this.line[3].push(tokenWithEntity);
            }
        }
        this.line[3].push(phrase);
        var tempString = this.line[3].reduce(function (acc, elm, idx) {
            if (elm === " ") {
                return acc += '&nbsp;';
            }
            return acc += elm;
        }, '');
        this.line[4] = tempString;
        this.compileTemplate();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], PhraseComponent.prototype, "line", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], PhraseComponent.prototype, "lineIndex", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], PhraseComponent.prototype, "entities", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], PhraseComponent.prototype, "updateLines", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('container', { read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"] }),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"])
    ], PhraseComponent.prototype, "container", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('containSelect'),
        __metadata("design:type", Object)
    ], PhraseComponent.prototype, "containSelect", void 0);
    PhraseComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-phrase',
            template: "\n    <div class=\"container field\" (textSelect)=\"renderRectangles($event)\" #containSelect>\n    <form #testForm=\"ngForm\">\n      <div type=\"text\" class=\"form-control\" contenteditable=\"true\" (blur)=\"triggerChange($event)\" name=\"phrase\">\n        <ng-template #container></ng-template>\n      </div>\n    </form>\n\n\n    <ng-template [ngIf]=\"line?.hostRectangle\">\n      <div class=\"card bg-light entities\">\n        <div class=\"entity\" *ngFor=\"let key of entities | objectLoop\" [style.background]=\"entities[key]\" (click)=\"changeEntity(key)\">\n          {{ key }}\n        </div>\n        <div class=\"icon\" (click)=\"removeEntity()\">\n          <i class=\"fa fa-trash\"></i>\n        </div>\n      </div>\n    </ng-template>\n\n    </div>\n  ",
            styles: [__webpack_require__(/*! ./phrase.component.css */ "./src/app/components/phrase/phrase.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["Compiler"],
            _services_store_service__WEBPACK_IMPORTED_MODULE_2__["StoreService"]])
    ], PhraseComponent);
    return PhraseComponent;
}());

var DynamicComponent = /** @class */ (function () {
    function DynamicComponent() {
    }
    return DynamicComponent;
}());



/***/ }),

/***/ "./src/app/directives/text-selection.directive.ts":
/*!********************************************************!*\
  !*** ./src/app/directives/text-selection.directive.ts ***!
  \********************************************************/
/*! exports provided: TextSelectDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextSelectDirective", function() { return TextSelectDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Import the core angular services.




var TextSelectDirective = /** @class */ (function () {
    // I initialize the text-select directive.
    function TextSelectDirective(elementRef, zone) {
        var _this = this;
        // I handle mousedown events inside the current element.
        this.handleMousedown = function () {
            document.addEventListener("mouseup", _this.handleMouseup, false);
        };
        // I handle mouseup events anywhere in the document.
        this.handleMouseup = function () {
            document.removeEventListener("mouseup", _this.handleMouseup, false);
            _this.processSelection();
        };
        // I handle selectionchange events anywhere in the document.
        this.handleSelectionchange = function () {
            // We are using the mousedown / mouseup events to manage selections that are
            // initiated from within the host element. But, we also have to account for
            // cases in which a selection outside the host will cause a local, existing
            // selection (if any) to be removed. As such, we'll only respond to the generic
            // "selectionchange" event when there is a current selection that is in danger
            // of being removed.
            if (_this.hasSelection) {
                _this.processSelection();
            }
        };
        this.elementRef = elementRef;
        this.zone = zone;
        this.hasSelection = false;
        this.textSelectEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I get called once when the directive is being unmounted.
    TextSelectDirective.prototype.ngOnDestroy = function () {
        // Unbind all handlers, even ones that may not be bounds at this moment.
        this.elementRef.nativeElement.removeEventListener("mousedown", this.handleMousedown, false);
        document.removeEventListener("mouseup", this.handleMouseup, false);
        document.removeEventListener("selectionchange", this.handleSelectionchange, false);
    };
    // I get called once after the inputs have been bound for the first time.
    TextSelectDirective.prototype.ngOnInit = function () {
        var _this = this;
        // Since not all interactions will lead to an event that is meaningful to the
        // calling context, we want to setup the DOM bindings outside of the Angular
        // Zone. This way, we don't trigger any change-detection digests until we know
        // that we have a computed event to emit.
        this.zone.runOutsideAngular(function () {
            // While there are several ways to create a selection on the page, this
            // directive is only going to be concerned with selections that were
            // initiated by MOUSE-based selections within the current element.
            _this.elementRef.nativeElement.addEventListener("mousedown", _this.handleMousedown, false);
            // While the mouse-even takes care of starting new selections within the
            // current element, we need to listen for the selectionchange event in
            // order to pick-up on selections being removed from the current element.
            document.addEventListener("selectionchange", _this.handleSelectionchange, false);
        });
    };
    // ---
    // PRIVATE METHODS.
    // ---
    // I get the deepest Element node in the DOM tree that contains the entire range.
    TextSelectDirective.prototype.getRangeContainer = function (range) {
        var container = range.commonAncestorContainer;
        // If the selected node is a Text node, climb up to an element node - in Internet
        // Explorer, the .contains() method only works with Element nodes.
        while (container.nodeType !== Node.ELEMENT_NODE) {
            container = container.parentNode;
        }
        return (container);
    };
    // I determine if the given range is fully contained within the host element.
    TextSelectDirective.prototype.isRangeFullyContained = function (range) {
        var hostElement = this.elementRef.nativeElement;
        var selectionContainer = range.commonAncestorContainer;
        // If the selected node is a Text node, climb up to an element node - in Internet
        // Explorer, the .contains() method only works with Element nodes.
        while (selectionContainer.nodeType !== Node.ELEMENT_NODE) {
            selectionContainer = selectionContainer.parentNode;
        }
        return (hostElement.contains(selectionContainer));
    };
    // I inspect the document's current selection and check to see if it should be
    // emitted as a TextSelectEvent within the current element.
    TextSelectDirective.prototype.processSelection = function () {
        var _this = this;
        var selection = document.getSelection();
        // If there is a new selection and an existing selection, let's clear out the
        // existing selection first.
        if (this.hasSelection) {
            // Since emitting event may cause the calling context to change state, we
            // want to run the .emit() inside of the Angular Zone. This way, it can
            // trigger change detection and update the views.
            this.zone.runGuarded(function () {
                _this.hasSelection = false;
                _this.textSelectEvent.emit({
                    text: "",
                    viewportRectangle: null,
                    hostRectangle: null,
                    selectionState: null
                });
            });
        }
        // If the new selection is empty (for example, the user just clicked somewhere
        // in the document), then there's no new selection event to emit.
        if (!selection.rangeCount || !selection.toString()) {
            return;
        }
        var range = selection.getRangeAt(0);
        var rangeContainer = this.getRangeContainer(range);
        // We only want to emit events for selections that are fully contained within the
        // host element. If the selection bleeds out-of or in-to the host, then we'll
        // just ignore it since we don't control the outer portions.
        if (this.elementRef.nativeElement.contains(rangeContainer)) {
            var preSelectionRange = range.cloneRange();
            var start = null;
            preSelectionRange.selectNodeContents(rangeContainer);
            preSelectionRange.setEnd(range.startContainer, range.startOffset);
            start = preSelectionRange.toString().length;
            var selectionState = {
                start: start,
                end: start + range.toString().length
            };
            var viewportRectangle = range.getBoundingClientRect();
            var localRectangle = this.viewportToHost(viewportRectangle, rangeContainer);
            // Since emitting event may cause the calling context to change state, we
            // want to run the .emit() inside of the Angular Zone. This way, it can
            // trigger change detection and update the views.
            this.zone.runGuarded(function () {
                _this.hasSelection = true;
                _this.textSelectEvent.emit({
                    text: selection.toString(),
                    viewportRectangle: {
                        left: viewportRectangle.left,
                        top: viewportRectangle.top,
                        width: viewportRectangle.width,
                        height: viewportRectangle.height
                    },
                    hostRectangle: {
                        left: localRectangle.left,
                        top: localRectangle.top,
                        width: localRectangle.width,
                        height: localRectangle.height
                    },
                    selectionState: selectionState
                });
            });
        }
    };
    // I convert the given viewport-relative rectangle to a host-relative rectangle.
    // --
    // NOTE: This algorithm doesn't care if the host element has a position - it simply
    // walks up the DOM tree looking for offsets.
    TextSelectDirective.prototype.viewportToHost = function (viewportRectangle, rangeContainer) {
        var host = this.elementRef.nativeElement;
        var hostRectangle = host.getBoundingClientRect();
        // Both the selection rectangle and the host rectangle are calculated relative to
        // the browser viewport. As such, the local position of the selection within the
        // host element should just be the delta of the two rectangles.
        var localLeft = (viewportRectangle.left - hostRectangle.left);
        var localTop = (viewportRectangle.top - hostRectangle.top);
        var node = rangeContainer;
        // Now that we have the local position, we have to account for any scrolling
        // being performed within the host element. Let's walk from the range container
        // up to the host element and add any relevant scroll offsets to the calculated
        // local position.
        do {
            localLeft += node.scrollLeft;
            localTop += node.scrollTop;
        } while ((node !== host) && (node = node.parentNode));
        return ({
            left: localLeft,
            top: localTop,
            width: viewportRectangle.width,
            height: viewportRectangle.height
        });
    };
    TextSelectDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: "[textSelect]",
            outputs: ["textSelectEvent: textSelect"]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]])
    ], TextSelectDirective);
    return TextSelectDirective;
}());



/***/ }),

/***/ "./src/app/pipes/loop-over-objects.pipe.ts":
/*!*************************************************!*\
  !*** ./src/app/pipes/loop-over-objects.pipe.ts ***!
  \*************************************************/
/*! exports provided: LoopOverObjectsPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoopOverObjectsPipe", function() { return LoopOverObjectsPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var LoopOverObjectsPipe = /** @class */ (function () {
    function LoopOverObjectsPipe() {
    }
    LoopOverObjectsPipe.prototype.transform = function (object) {
        return Object.keys(object);
    };
    LoopOverObjectsPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'objectLoop'
        })
    ], LoopOverObjectsPipe);
    return LoopOverObjectsPipe;
}());



/***/ }),

/***/ "./src/app/services/file-op.service.ts":
/*!*********************************************!*\
  !*** ./src/app/services/file-op.service.ts ***!
  \*********************************************/
/*! exports provided: FileOpService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileOpService", function() { return FileOpService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FileOpService = /** @class */ (function () {
    function FileOpService() {
    }
    FileOpService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], FileOpService);
    return FileOpService;
}());



/***/ }),

/***/ "./src/app/services/store.service.ts":
/*!*******************************************!*\
  !*** ./src/app/services/store.service.ts ***!
  \*******************************************/
/*! exports provided: StoreService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StoreService", function() { return StoreService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var StoreService = /** @class */ (function () {
    function StoreService() {
        this.event$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.lineIndex = -1;
        this.entites = {
            'CORE': '#AE8CA3',
            'ACTION': '#9EE493',
            'SIDE_CORE': '#40798C',
            'AREAS': '#D17A22',
            'BUDGET': '#3498db',
            'CANCEL': '#c0392b',
            'EXCLUDE': '#76BED0',
            'EXTRAS': '#FFA69E',
            'FOOD_CATEGORY': '#6DAEDB',
            'FOOD_CUSINES': '#EFD0CA',
            'INCLUDE': '#FE938C',
            'POPULAR': '#192BC2',
            'RECAP': '#ED474A',
            'REQUEST': '#E0C879',
            'REQUEST_ADD': '#2ecc71',
            'REQUEST_REMOVE': '#e74c3c',
            'RESTAURANT': '#AEADF0',
            'SIZE': '#F0BCD4',
            'AFTER_CORE': '#6c5ce7'
        };
    }
    StoreService.prototype.sendIndex = function (index) {
        if (+index !== +this.lineIndex) {
            this.lineIndex = index;
            this.event$.next(index);
        }
    };
    StoreService.prototype.getIndex = function () {
        return this.event$.asObservable();
    };
    StoreService.prototype.tuple2Arrays = function (tuples) {
        tuples = tuples.replace(/\(/g, '[').replace(/\)/g, ']');
        return Function("return (" + tuples + ");")();
    };
    StoreService.prototype.arrays2Tuples = function (array) {
        var _this = this;
        var container = '[';
        var outerComma = ',';
        var _loop_1 = function (i) {
            var tuple = array[i];
            var innerTuple = "(" + this_1.qoutedString(tuple[0]) + ","; // Phrase
            var Entites = '';
            tuple[1]['entities'].forEach(function (el, index) {
                var innerComma = ',';
                var tempString = el.reduce(function (acc, elm, idx) {
                    return idx == 0 ? _this.qoutedString(elm) : acc + ', ' + _this.qoutedString(elm);
                }, '');
                if (index === (tuple[1]['entities'].length - 1)) {
                    innerComma = '';
                }
                Entites += "(" + tempString + ")" + innerComma;
            });
            Entites = "{ 'entities': [" + Entites + "] }";
            innerTuple += Entites + ")";
            if (i === array.length - 1) {
                outerComma = '';
            }
            container += "" + innerTuple + outerComma;
        };
        var this_1 = this;
        for (var i = 0; i < array.length; i++) {
            _loop_1(i);
        }
        container += ']';
        return container;
    };
    StoreService.prototype.getEntities = function () {
        return this.entites;
    };
    StoreService.prototype.qoutedString = function (term) {
        if (typeof term === 'string') {
            return "'" + term + "'";
        }
        return term;
    };
    StoreService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], StoreService);
    return StoreService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/guest/projects/ui-train/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map