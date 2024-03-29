(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-drag-scroll', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = global || self, factory(global['ngx-drag-scroll'] = {}, global.ng.core, global.ng.common));
}(this, function (exports, core, common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DragScrollItemDirective = /** @class */ (function () {
        function DragScrollItemDirective(elementRef) {
            this.display = 'inline-block';
            this._dragDisabled = false;
            this._elementRef = elementRef;
        }
        Object.defineProperty(DragScrollItemDirective.prototype, "dragDisabled", {
            get: /**
             * @return {?}
             */
            function () { return this._dragDisabled; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._dragDisabled = value; },
            enumerable: true,
            configurable: true
        });
        DragScrollItemDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[drag-scroll-item]'
                    },] }
        ];
        /** @nocollapse */
        DragScrollItemDirective.ctorParameters = function () { return [
            { type: core.ElementRef, decorators: [{ type: core.Inject, args: [core.ElementRef,] }] }
        ]; };
        DragScrollItemDirective.propDecorators = {
            display: [{ type: core.HostBinding, args: ['style.display',] }],
            dragDisabled: [{ type: core.Input, args: ['drag-disabled',] }]
        };
        return DragScrollItemDirective;
    }());
    if (false) {
        /** @type {?} */
        DragScrollItemDirective.prototype.display;
        /** @type {?} */
        DragScrollItemDirective.prototype._dragDisabled;
        /** @type {?} */
        DragScrollItemDirective.prototype._elementRef;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DragScrollComponent = /** @class */ (function () {
        function DragScrollComponent(_elementRef, _renderer, _document) {
            this._elementRef = _elementRef;
            this._renderer = _renderer;
            this._document = _document;
            this._index = 0;
            this._scrollbarHidden = false;
            this._disabled = false;
            this._xDisabled = false;
            this._xWheelEnabled = false;
            this._yDisabled = false;
            this._dragDisabled = false;
            this._snapDisabled = false;
            this._snapOffset = 0;
            this._snapDuration = 500;
            this._isDragging = false;
            /**
             * Is the user currently pressing the element
             */
            this.isPressed = false;
            /**
             * Is the user currently scrolling the element
             */
            this.isScrolling = false;
            this.scrollTimer = -1;
            this.scrollToTimer = -1;
            /**
             * The x coordinates on the element
             */
            this.downX = 0;
            /**
             * The y coordinates on the element
             */
            this.downY = 0;
            this.displayType = 'block';
            this.elWidth = null;
            this.elHeight = null;
            this._pointerEvents = 'auto';
            this.scrollbarWidth = null;
            this.isAnimating = false;
            this.prevChildrenLength = 0;
            this.indexBound = 0;
            this.dsInitialized = new core.EventEmitter();
            this.indexChanged = new core.EventEmitter();
            this.reachesLeftBound = new core.EventEmitter();
            this.reachesRightBound = new core.EventEmitter();
            this.snapAnimationFinished = new core.EventEmitter();
            this.dragStart = new core.EventEmitter();
            this.dragEnd = new core.EventEmitter();
            this.scrollbarWidth = this.getScrollbarWidth() + "px";
        }
        Object.defineProperty(DragScrollComponent.prototype, "isDragging", {
            /**
             * Is the user currently dragging the element
             */
            get: /**
             * Is the user currently dragging the element
             * @return {?}
             */
            function () {
                return this._isDragging;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DragScrollComponent.prototype, "currIndex", {
            get: /**
             * @return {?}
             */
            function () { return this._index; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (value !== this._index) {
                    this._index = value;
                    this.indexChanged.emit(value);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DragScrollComponent.prototype, "scrollbarHidden", {
            /**
             * Whether the scrollbar is hidden
             */
            get: /**
             * Whether the scrollbar is hidden
             * @return {?}
             */
            function () { return this._scrollbarHidden; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._scrollbarHidden = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DragScrollComponent.prototype, "disabled", {
            /**
             * Whether horizontally and vertically draging and scrolling is be disabled
             */
            get: /**
             * Whether horizontally and vertically draging and scrolling is be disabled
             * @return {?}
             */
            function () { return this._disabled; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._disabled = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DragScrollComponent.prototype, "xDisabled", {
            /**
             * Whether horizontally dragging and scrolling is be disabled
             */
            get: /**
             * Whether horizontally dragging and scrolling is be disabled
             * @return {?}
             */
            function () { return this._xDisabled; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._xDisabled = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DragScrollComponent.prototype, "yDisabled", {
            /**
             * Whether vertically dragging and scrolling events is disabled
             */
            get: /**
             * Whether vertically dragging and scrolling events is disabled
             * @return {?}
             */
            function () { return this._yDisabled; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._yDisabled = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DragScrollComponent.prototype, "xWheelEnabled", {
            /**
             * Whether scrolling horizontally with mouse wheel is enabled
             */
            get: /**
             * Whether scrolling horizontally with mouse wheel is enabled
             * @return {?}
             */
            function () { return this._xWheelEnabled; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._xWheelEnabled = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DragScrollComponent.prototype, "dragDisabled", {
            get: /**
             * @return {?}
             */
            function () { return this._dragDisabled; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._dragDisabled = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DragScrollComponent.prototype, "snapDisabled", {
            get: /**
             * @return {?}
             */
            function () { return this._snapDisabled; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._snapDisabled = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DragScrollComponent.prototype, "snapOffset", {
            get: /**
             * @return {?}
             */
            function () { return this._snapOffset; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._snapOffset = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DragScrollComponent.prototype, "snapDuration", {
            get: /**
             * @return {?}
             */
            function () { return this._snapDuration; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._snapDuration = value; },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        DragScrollComponent.prototype.ngOnChanges = /**
         * @return {?}
         */
        function () {
            this.setScrollBar();
            if (this.xDisabled || this.disabled) {
                this.disableScroll('x');
            }
            else {
                this.enableScroll('x');
            }
            if (this.yDisabled || this.disabled) {
                this.disableScroll('y');
            }
            else {
                this.enableScroll('y');
            }
        };
        /**
         * @return {?}
         */
        DragScrollComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            // auto assign computed css
            this._renderer.setAttribute(this._contentRef.nativeElement, 'drag-scroll', 'true');
            this.displayType = typeof window !== 'undefined' ? window.getComputedStyle(this._elementRef.nativeElement).display : 'block';
            this._renderer.setStyle(this._contentRef.nativeElement, 'display', this.displayType);
            this._renderer.setStyle(this._contentRef.nativeElement, 'whiteSpace', 'noWrap');
            // store ele width height for later user
            this.markElDimension();
            this._renderer.setStyle(this._contentRef.nativeElement, 'width', this.elWidth);
            this._renderer.setStyle(this._contentRef.nativeElement, 'height', this.elHeight);
            if (this.wrapper) {
                this.checkScrollbar();
            }
            this._onMouseDownListener = this._renderer.listen(this._contentRef.nativeElement, 'mousedown', this.onMouseDownHandler.bind(this));
            this._onScrollListener = this._renderer.listen(this._contentRef.nativeElement, 'scroll', this.onScrollHandler.bind(this));
            // prevent Firefox from dragging images
            this._onDragStartListener = this._renderer.listen('document', 'dragstart', (/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                e.preventDefault();
            }));
            this.checkNavStatus();
            this.dsInitialized.emit();
            this.adjustMarginToLastChild();
        };
        /**
         * @return {?}
         */
        DragScrollComponent.prototype.ngAfterViewChecked = /**
         * @return {?}
         */
        function () {
            // avoid extra checks
            if (this._children.length !== this.prevChildrenLength) {
                this.markElDimension();
                this.checkScrollbar();
                this.prevChildrenLength = this._children.length;
                this.checkNavStatus();
            }
        };
        /**
         * @return {?}
         */
        DragScrollComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this._renderer.setAttribute(this._contentRef.nativeElement, 'drag-scroll', 'false');
            if (this._onMouseDownListener) {
                this._onMouseDownListener = this._onMouseDownListener();
            }
            if (this._onScrollListener) {
                this._onScrollListener = this._onScrollListener();
            }
            if (this._onDragStartListener) {
                this._onDragStartListener = this._onDragStartListener();
            }
        };
        /**
         * @param {?} event
         * @return {?}
         */
        DragScrollComponent.prototype.onMouseMoveHandler = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            this.onMouseMove(event);
        };
        /**
         * @param {?} event
         * @return {?}
         */
        DragScrollComponent.prototype.onMouseMove = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (this.isPressed && !this.disabled) {
                // Workaround for prevent scroll stuck if browser lost focus
                // MouseEvent.buttons not support by Safari
                // tslint:disable-next-line:deprecation
                if (!event.buttons && !event.which) {
                    return this.onMouseUpHandler(event);
                }
                this._pointerEvents = 'none';
                this._setIsDragging(true);
                // Drag X
                if (!this.xDisabled && !this.dragDisabled) {
                    /** @type {?} */
                    var clientX = ((/** @type {?} */ (event))).clientX;
                    this._contentRef.nativeElement.scrollLeft =
                        this._contentRef.nativeElement.scrollLeft - clientX + this.downX;
                    this.downX = clientX;
                }
                // Drag Y
                if (!this.yDisabled && !this.dragDisabled) {
                    /** @type {?} */
                    var clientY = ((/** @type {?} */ (event))).clientY;
                    this._contentRef.nativeElement.scrollTop =
                        this._contentRef.nativeElement.scrollTop - clientY + this.downY;
                    this.downY = clientY;
                }
            }
        };
        /**
         * @param {?} event
         * @return {?}
         */
        DragScrollComponent.prototype.onMouseDownHandler = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var dragScrollItem = this.locateDragScrollItem((/** @type {?} */ (event.target)));
            if (dragScrollItem && dragScrollItem.dragDisabled) {
                return;
            }
            /** @type {?} */
            var isTouchEvent = event.type === 'touchstart';
            this._startGlobalListening(isTouchEvent);
            this.isPressed = true;
            /** @type {?} */
            var mouseEvent = (/** @type {?} */ (event));
            this.downX = mouseEvent.clientX;
            this.downY = mouseEvent.clientY;
            clearTimeout((/** @type {?} */ (this.scrollToTimer)));
        };
        /**
         * @return {?}
         */
        DragScrollComponent.prototype.onScrollHandler = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.checkNavStatus();
            if (!this.isPressed && !this.isAnimating && !this.snapDisabled) {
                this.isScrolling = true;
                clearTimeout((/** @type {?} */ (this.scrollTimer)));
                this.scrollTimer = setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.isScrolling = false;
                    _this.locateCurrentIndex(true);
                }), 500);
            }
            else {
                this.locateCurrentIndex();
            }
        };
        /**
         * @param {?} event
         * @return {?}
         */
        DragScrollComponent.prototype.onMouseUpHandler = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (this.isPressed) {
                this.isPressed = false;
                this._pointerEvents = 'auto';
                this._setIsDragging(false);
                if (!this.snapDisabled) {
                    this.locateCurrentIndex(true);
                }
                else {
                    this.locateCurrentIndex();
                }
                this._stopGlobalListening();
            }
        };
        /*
         * Nav button
         */
        /*
           * Nav button
           */
        /**
         * @return {?}
         */
        DragScrollComponent.prototype.moveLeft = /*
           * Nav button
           */
        /**
         * @return {?}
         */
        function () {
            if ((this.currIndex !== 0 || this.snapDisabled)) {
                this.currIndex--;
                clearTimeout((/** @type {?} */ (this.scrollToTimer)));
                this.scrollTo(this._contentRef.nativeElement, this.toChildrenLocation(), this.snapDuration);
            }
        };
        /**
         * @return {?}
         */
        DragScrollComponent.prototype.moveRight = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var container = this.wrapper || this.parentNode;
            /** @type {?} */
            var containerWidth = container ? container.clientWidth : 0;
            if (!this.isScrollReachesRightEnd() && this.currIndex < this.maximumIndex(containerWidth, this._children.toArray())) {
                this.currIndex++;
                clearTimeout((/** @type {?} */ (this.scrollToTimer)));
                this.scrollTo(this._contentRef.nativeElement, this.toChildrenLocation(), this.snapDuration);
            }
        };
        /**
         * @param {?} index
         * @return {?}
         */
        DragScrollComponent.prototype.moveTo = /**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            /** @type {?} */
            var container = this.wrapper || this.parentNode;
            /** @type {?} */
            var containerWidth = container ? container.clientWidth : 0;
            if (index >= 0 &&
                index !== this.currIndex &&
                this.currIndex <= this.maximumIndex(containerWidth, this._children.toArray())) {
                this.currIndex = Math.min(index, this.maximumIndex(containerWidth, this._children.toArray()));
                clearTimeout((/** @type {?} */ (this.scrollToTimer)));
                this.scrollTo(this._contentRef.nativeElement, this.toChildrenLocation(), this.snapDuration);
            }
        };
        /**
         * @return {?}
         */
        DragScrollComponent.prototype.checkNavStatus = /**
         * @return {?}
         */
        function () {
            var _this = this;
            setTimeout((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var onlyOneItem = Boolean(_this._children.length <= 1);
                /** @type {?} */
                var containerIsLargerThanContent = Boolean(_this._contentRef.nativeElement.scrollWidth <=
                    _this._contentRef.nativeElement.clientWidth);
                if (onlyOneItem || containerIsLargerThanContent) {
                    // only one element
                    _this.reachesLeftBound.emit(true);
                    _this.reachesRightBound.emit(true);
                }
                else if (_this.isScrollReachesRightEnd()) {
                    // reached right end
                    _this.reachesLeftBound.emit(false);
                    _this.reachesRightBound.emit(true);
                }
                else if (_this._contentRef.nativeElement.scrollLeft === 0 &&
                    _this._contentRef.nativeElement.scrollWidth > _this._contentRef.nativeElement.clientWidth) {
                    // reached left end
                    _this.reachesLeftBound.emit(true);
                    _this.reachesRightBound.emit(false);
                }
                else {
                    // in the middle
                    _this.reachesLeftBound.emit(false);
                    _this.reachesRightBound.emit(false);
                }
            }), 0);
        };
        /**
         * @param {?} event
         * @return {?}
         */
        DragScrollComponent.prototype.onWheel = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (this._xWheelEnabled) {
                event.preventDefault();
                if (this._snapDisabled) {
                    this._contentRef.nativeElement.scrollBy(event.deltaY, 0);
                }
                else {
                    if (event.deltaY < 0) {
                        this.moveLeft();
                    }
                    else if (event.deltaY > 0) {
                        this.moveRight();
                    }
                }
            }
        };
        /**
         * @return {?}
         */
        DragScrollComponent.prototype.onWindowResize = /**
         * @return {?}
         */
        function () {
            this.refreshWrapperDimensions();
            this.checkNavStatus();
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        DragScrollComponent.prototype._setIsDragging = /**
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._isDragging === value) {
                return;
            }
            this._isDragging = value;
            value ? this.dragStart.emit() : this.dragEnd.emit();
        };
        /**
         * @private
         * @param {?} isTouchEvent
         * @return {?}
         */
        DragScrollComponent.prototype._startGlobalListening = /**
         * @private
         * @param {?} isTouchEvent
         * @return {?}
         */
        function (isTouchEvent) {
            if (!this._onMouseMoveListener) {
                /** @type {?} */
                var eventName = isTouchEvent ? 'touchmove' : 'mousemove';
                this._onMouseMoveListener = this._renderer.listen('document', eventName, this.onMouseMoveHandler.bind(this));
            }
            if (!this._onMouseUpListener) {
                /** @type {?} */
                var eventName = isTouchEvent ? 'touchend' : 'mouseup';
                this._onMouseUpListener = this._renderer.listen('document', eventName, this.onMouseUpHandler.bind(this));
            }
        };
        /**
         * @private
         * @return {?}
         */
        DragScrollComponent.prototype._stopGlobalListening = /**
         * @private
         * @return {?}
         */
        function () {
            if (this._onMouseMoveListener) {
                this._onMouseMoveListener = this._onMouseMoveListener();
            }
            if (this._onMouseUpListener) {
                this._onMouseUpListener = this._onMouseUpListener();
            }
        };
        /**
         * @private
         * @param {?} axis
         * @return {?}
         */
        DragScrollComponent.prototype.disableScroll = /**
         * @private
         * @param {?} axis
         * @return {?}
         */
        function (axis) {
            this._renderer.setStyle(this._contentRef.nativeElement, "overflow-" + axis, 'hidden');
        };
        /**
         * @private
         * @param {?} axis
         * @return {?}
         */
        DragScrollComponent.prototype.enableScroll = /**
         * @private
         * @param {?} axis
         * @return {?}
         */
        function (axis) {
            this._renderer.setStyle(this._contentRef.nativeElement, "overflow-" + axis, 'auto');
        };
        /**
         * @private
         * @return {?}
         */
        DragScrollComponent.prototype.hideScrollbar = /**
         * @private
         * @return {?}
         */
        function () {
            if (this._contentRef.nativeElement.style.display !== 'none' && !this.wrapper) {
                this.parentNode = this._contentRef.nativeElement.parentNode;
                // create container element
                this.wrapper = this._renderer.createElement('div');
                this._renderer.setAttribute(this.wrapper, 'class', 'drag-scroll-wrapper');
                this._renderer.addClass(this.wrapper, 'drag-scroll-container');
                this.refreshWrapperDimensions();
                this._renderer.setStyle(this.wrapper, 'overflow', 'hidden');
                this._renderer.setStyle(this._contentRef.nativeElement, 'width', "calc(100% + " + this.scrollbarWidth + ")");
                this._renderer.setStyle(this._contentRef.nativeElement, 'height', "calc(100% + " + this.scrollbarWidth + ")");
                // Append container element to component element.
                this._renderer.appendChild(this._elementRef.nativeElement, this.wrapper);
                // Append content element to container element.
                this._renderer.appendChild(this.wrapper, this._contentRef.nativeElement);
                this.adjustMarginToLastChild();
            }
        };
        /**
         * @private
         * @return {?}
         */
        DragScrollComponent.prototype.showScrollbar = /**
         * @private
         * @return {?}
         */
        function () {
            if (this.wrapper) {
                this._renderer.setStyle(this._contentRef.nativeElement, 'width', '100%');
                this._renderer.setStyle(this._contentRef.nativeElement, 'height', this.wrapper.style.height);
                if (this.parentNode !== null) {
                    this.parentNode.removeChild(this.wrapper);
                    this.parentNode.appendChild(this._contentRef.nativeElement);
                }
                this.wrapper = null;
                this.adjustMarginToLastChild();
            }
        };
        /**
         * @private
         * @return {?}
         */
        DragScrollComponent.prototype.checkScrollbar = /**
         * @private
         * @return {?}
         */
        function () {
            if (this._contentRef.nativeElement.scrollWidth <= this._contentRef.nativeElement.clientWidth) {
                this._renderer.setStyle(this._contentRef.nativeElement, 'height', '100%');
            }
            else {
                this._renderer.setStyle(this._contentRef.nativeElement, 'height', "calc(100% + " + this.scrollbarWidth + ")");
            }
            if (this._contentRef.nativeElement.scrollHeight <= this._contentRef.nativeElement.clientHeight) {
                this._renderer.setStyle(this._contentRef.nativeElement, 'width', '100%');
            }
            else {
                this._renderer.setStyle(this._contentRef.nativeElement, 'width', "calc(100% + " + this.scrollbarWidth + ")");
            }
        };
        /**
         * @private
         * @return {?}
         */
        DragScrollComponent.prototype.setScrollBar = /**
         * @private
         * @return {?}
         */
        function () {
            if (this.scrollbarHidden) {
                this.hideScrollbar();
            }
            else {
                this.showScrollbar();
            }
        };
        /**
         * @private
         * @return {?}
         */
        DragScrollComponent.prototype.getScrollbarWidth = /**
         * @private
         * @return {?}
         */
        function () {
            /**
             * Browser Scrollbar Widths (2016)
             * OSX (Chrome, Safari, Firefox) - 15px
             * Windows XP (IE7, Chrome, Firefox) - 17px
             * Windows 7 (IE10, IE11, Chrome, Firefox) - 17px
             * Windows 8.1 (IE11, Chrome, Firefox) - 17px
             * Windows 10 (IE11, Chrome, Firefox) - 17px
             * Windows 10 (Edge 12/13) - 12px
             * @type {?}
             */
            var outer = this._renderer.createElement('div');
            this._renderer.setStyle(outer, 'visibility', 'hidden');
            this._renderer.setStyle(outer, 'width', '100px');
            this._renderer.setStyle(outer, 'msOverflowStyle', 'scrollbar'); // needed for WinJS apps
            // document.body.appendChild(outer);
            this._renderer.appendChild(this._document.body, outer);
            // this._renderer.appendChild(this._renderer.selectRootElement('body'), outer);
            /** @type {?} */
            var widthNoScroll = outer.offsetWidth;
            // force scrollbars
            this._renderer.setStyle(outer, 'overflow', 'scroll');
            // add innerdiv
            /** @type {?} */
            var inner = this._renderer.createElement('div');
            this._renderer.setStyle(inner, 'width', '100%');
            this._renderer.appendChild(outer, inner);
            /** @type {?} */
            var widthWithScroll = inner.offsetWidth;
            // remove divs
            this._renderer.removeChild(this._document.body, outer);
            /**
             * Scrollbar width will be 0 on Mac OS with the
             * default "Only show scrollbars when scrolling" setting (Yosemite and up).
             * setting default width to 20;
             */
            return widthNoScroll - widthWithScroll || 20;
        };
        /**
         * @private
         * @return {?}
         */
        DragScrollComponent.prototype.refreshWrapperDimensions = /**
         * @private
         * @return {?}
         */
        function () {
            if (this.wrapper) {
                this._renderer.setStyle(this.wrapper, 'width', '100%');
                this._renderer.setStyle(this.wrapper, 'height', this._elementRef.nativeElement.style.height
                    || this._elementRef.nativeElement.offsetHeight + 'px');
            }
        };
        /*
        * The below solution is heavily inspired from
        * https://gist.github.com/andjosh/6764939
        */
        /*
          * The below solution is heavily inspired from
          * https://gist.github.com/andjosh/6764939
          */
        /**
         * @private
         * @param {?} element
         * @param {?} to
         * @param {?} duration
         * @return {?}
         */
        DragScrollComponent.prototype.scrollTo = /*
          * The below solution is heavily inspired from
          * https://gist.github.com/andjosh/6764939
          */
        /**
         * @private
         * @param {?} element
         * @param {?} to
         * @param {?} duration
         * @return {?}
         */
        function (element, to, duration) {
            /** @type {?} */
            var self = this;
            self.isAnimating = true;
            /** @type {?} */
            var start = element.scrollLeft;
            /** @type {?} */
            var change = to - start - this.snapOffset;
            /** @type {?} */
            var increment = 20;
            /** @type {?} */
            var currentTime = 0;
            // t = current time
            // b = start value
            // c = change in value
            // d = duration
            /** @type {?} */
            var easeInOutQuad = (/**
             * @param {?} t
             * @param {?} b
             * @param {?} c
             * @param {?} d
             * @return {?}
             */
            function (t, b, c, d) {
                t /= d / 2;
                if (t < 1) {
                    return c / 2 * t * t + b;
                }
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            });
            /** @type {?} */
            var animateScroll = (/**
             * @return {?}
             */
            function () {
                currentTime += increment;
                element.scrollLeft = easeInOutQuad(currentTime, start, change, duration);
                if (currentTime < duration) {
                    self.scrollToTimer = setTimeout(animateScroll, increment);
                }
                else {
                    // run one more frame to make sure the animation is fully finished
                    setTimeout((/**
                     * @return {?}
                     */
                    function () {
                        self.isAnimating = false;
                        self.snapAnimationFinished.emit(self.currIndex);
                    }), increment);
                }
            });
            animateScroll();
        };
        /**
         * @private
         * @param {?=} snap
         * @return {?}
         */
        DragScrollComponent.prototype.locateCurrentIndex = /**
         * @private
         * @param {?=} snap
         * @return {?}
         */
        function (snap) {
            var _this = this;
            this.currentChildWidth((/**
             * @param {?} currentChildWidth
             * @param {?} nextChildrenWidth
             * @param {?} childrenWidth
             * @param {?} idx
             * @param {?} stop
             * @return {?}
             */
            function (currentChildWidth, nextChildrenWidth, childrenWidth, idx, stop) {
                if ((_this._contentRef.nativeElement.scrollLeft >= childrenWidth &&
                    _this._contentRef.nativeElement.scrollLeft <= nextChildrenWidth)) {
                    if (nextChildrenWidth - _this._contentRef.nativeElement.scrollLeft > currentChildWidth / 2 && !_this.isScrollReachesRightEnd()) {
                        // roll back scrolling
                        if (!_this.isAnimating) {
                            _this.currIndex = idx;
                        }
                        if (snap) {
                            _this.scrollTo(_this._contentRef.nativeElement, childrenWidth, _this.snapDuration);
                        }
                    }
                    else if (_this._contentRef.nativeElement.scrollLeft !== 0) {
                        // forward scrolling
                        if (!_this.isAnimating) {
                            _this.currIndex = idx + 1;
                        }
                        if (snap) {
                            _this.scrollTo(_this._contentRef.nativeElement, childrenWidth + currentChildWidth, _this.snapDuration);
                        }
                    }
                    stop();
                }
                else if ((idx + 1) === (_this._children.length - 1)) {
                    // reaches last index
                    if (!_this.isAnimating) {
                        _this.currIndex = idx + 1;
                    }
                    stop();
                }
            }));
        };
        /**
         * @private
         * @param {?} cb
         * @return {?}
         */
        DragScrollComponent.prototype.currentChildWidth = /**
         * @private
         * @param {?} cb
         * @return {?}
         */
        function (cb) {
            /** @type {?} */
            var childrenWidth = 0;
            /** @type {?} */
            var shouldBreak = false;
            /** @type {?} */
            var breakFunc = (/**
             * @return {?}
             */
            function () {
                shouldBreak = true;
            });
            /** @type {?} */
            var childrenArr = this._children.toArray();
            for (var i = 0; i < childrenArr.length; i++) {
                if (i === childrenArr.length - 1) {
                    break;
                }
                if (shouldBreak) {
                    break;
                }
                /** @type {?} */
                var nextChildrenWidth = childrenWidth + childrenArr[i + 1]._elementRef.nativeElement.clientWidth;
                /** @type {?} */
                var currentClildWidth = childrenArr[i]._elementRef.nativeElement.clientWidth;
                cb(currentClildWidth, nextChildrenWidth, childrenWidth, i, breakFunc);
                childrenWidth += currentClildWidth;
            }
        };
        /**
         * @private
         * @return {?}
         */
        DragScrollComponent.prototype.toChildrenLocation = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var to = 0;
            /** @type {?} */
            var childrenArr = this._children.toArray();
            for (var i = 0; i < this.currIndex; i++) {
                to += childrenArr[i]._elementRef.nativeElement.clientWidth;
            }
            return to;
        };
        /**
         * @private
         * @param {?} element
         * @return {?}
         */
        DragScrollComponent.prototype.locateDragScrollItem = /**
         * @private
         * @param {?} element
         * @return {?}
         */
        function (element) {
            /** @type {?} */
            var item = null;
            /** @type {?} */
            var childrenArr = this._children.toArray();
            for (var i = 0; i < childrenArr.length; i++) {
                if (element === childrenArr[i]._elementRef.nativeElement) {
                    item = childrenArr[i];
                }
            }
            return item;
        };
        /**
         * @private
         * @return {?}
         */
        DragScrollComponent.prototype.markElDimension = /**
         * @private
         * @return {?}
         */
        function () {
            if (this.wrapper) {
                this.elWidth = this.wrapper.style.width;
                this.elHeight = this.wrapper.style.height;
            }
            else {
                this.elWidth = this._elementRef.nativeElement.style.width || (this._elementRef.nativeElement.offsetWidth + 'px');
                this.elHeight = this._elementRef.nativeElement.style.height || (this._elementRef.nativeElement.offsetHeight + 'px');
            }
            /** @type {?} */
            var container = this.wrapper || this.parentNode;
            /** @type {?} */
            var containerWidth = container ? container.clientWidth : 0;
            if (this._children.length > 1) {
                this.indexBound = this.maximumIndex(containerWidth, this._children.toArray());
            }
        };
        /**
         * @private
         * @param {?} containerWidth
         * @param {?} childrenElements
         * @return {?}
         */
        DragScrollComponent.prototype.maximumIndex = /**
         * @private
         * @param {?} containerWidth
         * @param {?} childrenElements
         * @return {?}
         */
        function (containerWidth, childrenElements) {
            /** @type {?} */
            var count = 0;
            /** @type {?} */
            var childrenWidth = 0;
            for (var i = 0; i <= childrenElements.length; i++) {
                // last N element
                /** @type {?} */
                var dragScrollItemDirective = childrenElements[childrenElements.length - 1 - i];
                if (!dragScrollItemDirective) {
                    break;
                }
                else {
                    /** @type {?} */
                    var nativeElement = dragScrollItemDirective._elementRef.nativeElement;
                    /** @type {?} */
                    var itemWidth = nativeElement.clientWidth;
                    if (itemWidth === 0 && nativeElement.firstElementChild) {
                        itemWidth = dragScrollItemDirective._elementRef.nativeElement.firstElementChild.clientWidth;
                    }
                    childrenWidth += itemWidth;
                    if (childrenWidth < containerWidth) {
                        count++;
                    }
                    else {
                        break;
                    }
                }
            }
            return childrenElements.length - count;
        };
        /**
         * @private
         * @return {?}
         */
        DragScrollComponent.prototype.isScrollReachesRightEnd = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var scrollLeftPos = this._contentRef.nativeElement.scrollLeft + this._contentRef.nativeElement.offsetWidth;
            return scrollLeftPos >= this._contentRef.nativeElement.scrollWidth;
        };
        /**
         * adds a margin right style to the last child element which will resolve the issue
         * of last item gets cutoff.
         */
        /**
         * adds a margin right style to the last child element which will resolve the issue
         * of last item gets cutoff.
         * @private
         * @return {?}
         */
        DragScrollComponent.prototype.adjustMarginToLastChild = /**
         * adds a margin right style to the last child element which will resolve the issue
         * of last item gets cutoff.
         * @private
         * @return {?}
         */
        function () {
            if (this._children && this._children.length > 0 && this.hideScrollbar) {
                /** @type {?} */
                var childrenArr = this._children.toArray();
                /** @type {?} */
                var lastItem = childrenArr[childrenArr.length - 1]._elementRef.nativeElement;
                if (this.wrapper && childrenArr.length > 1) {
                    this._renderer.setStyle(lastItem, 'margin-right', this.scrollbarWidth);
                }
                else {
                    this._renderer.setStyle(lastItem, 'margin-right', 0);
                }
            }
        };
        DragScrollComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'drag-scroll',
                        template: "\n    <div class=\"drag-scroll-content\" #contentRef>\n      <ng-content></ng-content>\n    </div>\n  ",
                        styles: ["\n    :host {\n      overflow: hidden;\n      display: block;\n    }\n    .drag-scroll-content {\n      height: 100%;\n      overflow: auto;\n      white-space: nowrap;\n    }\n    "]
                    }] }
        ];
        /** @nocollapse */
        DragScrollComponent.ctorParameters = function () { return [
            { type: core.ElementRef, decorators: [{ type: core.Inject, args: [core.ElementRef,] }] },
            { type: core.Renderer2, decorators: [{ type: core.Inject, args: [core.Renderer2,] }] },
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] }
        ]; };
        DragScrollComponent.propDecorators = {
            _contentRef: [{ type: core.ViewChild, args: ['contentRef', { static: true },] }],
            _children: [{ type: core.ContentChildren, args: [DragScrollItemDirective,] }],
            _pointerEvents: [{ type: core.HostBinding, args: ['style.pointer-events',] }],
            dsInitialized: [{ type: core.Output }],
            indexChanged: [{ type: core.Output }],
            reachesLeftBound: [{ type: core.Output }],
            reachesRightBound: [{ type: core.Output }],
            snapAnimationFinished: [{ type: core.Output }],
            dragStart: [{ type: core.Output }],
            dragEnd: [{ type: core.Output }],
            scrollbarHidden: [{ type: core.Input, args: ['scrollbar-hidden',] }],
            disabled: [{ type: core.Input, args: ['drag-scroll-disabled',] }],
            xDisabled: [{ type: core.Input, args: ['drag-scroll-x-disabled',] }],
            yDisabled: [{ type: core.Input, args: ['drag-scroll-y-disabled',] }],
            xWheelEnabled: [{ type: core.Input, args: ['scroll-x-wheel-enabled',] }],
            dragDisabled: [{ type: core.Input, args: ['drag-disabled',] }],
            snapDisabled: [{ type: core.Input, args: ['snap-disabled',] }],
            snapOffset: [{ type: core.Input, args: ['snap-offset',] }],
            snapDuration: [{ type: core.Input, args: ['snap-duration',] }],
            onWheel: [{ type: core.HostListener, args: ['wheel', ['$event'],] }],
            onWindowResize: [{ type: core.HostListener, args: ['window:resize',] }]
        };
        return DragScrollComponent;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        DragScrollComponent.prototype._index;
        /**
         * @type {?}
         * @private
         */
        DragScrollComponent.prototype._scrollbarHidden;
        /**
         * @type {?}
         * @private
         */
        DragScrollComponent.prototype._disabled;
        /**
         * @type {?}
         * @private
         */
        DragScrollComponent.prototype._xDisabled;
        /**
         * @type {?}
         * @private
         */
        DragScrollComponent.prototype._xWheelEnabled;
        /**
         * @type {?}
         * @private
         */
        DragScrollComponent.prototype._yDisabled;
        /**
         * @type {?}
         * @private
         */
        DragScrollComponent.prototype._dragDisabled;
        /**
         * @type {?}
         * @private
         */
        DragScrollComponent.prototype._snapDisabled;
        /**
         * @type {?}
         * @private
         */
        DragScrollComponent.prototype._snapOffset;
        /**
         * @type {?}
         * @private
         */
        DragScrollComponent.prototype._snapDuration;
        /**
         * @type {?}
         * @private
         */
        DragScrollComponent.prototype._isDragging;
        /**
         * @type {?}
         * @private
         */
        DragScrollComponent.prototype._onMouseMoveListener;
        /**
         * @type {?}
         * @private
         */
        DragScrollComponent.prototype._onMouseUpListener;
        /**
         * @type {?}
         * @private
         */
        DragScrollComponent.prototype._onMouseDownListener;
        /**
         * @type {?}
         * @private
         */
        DragScrollComponent.prototype._onScrollListener;
        /**
         * @type {?}
         * @private
         */
        DragScrollComponent.prototype._onDragStartListener;
        /**
         * Is the user currently pressing the element
         * @type {?}
         */
        DragScrollComponent.prototype.isPressed;
        /**
         * Is the user currently scrolling the element
         * @type {?}
         */
        DragScrollComponent.prototype.isScrolling;
        /** @type {?} */
        DragScrollComponent.prototype.scrollTimer;
        /** @type {?} */
        DragScrollComponent.prototype.scrollToTimer;
        /**
         * The x coordinates on the element
         * @type {?}
         */
        DragScrollComponent.prototype.downX;
        /**
         * The y coordinates on the element
         * @type {?}
         */
        DragScrollComponent.prototype.downY;
        /** @type {?} */
        DragScrollComponent.prototype.displayType;
        /** @type {?} */
        DragScrollComponent.prototype.elWidth;
        /** @type {?} */
        DragScrollComponent.prototype.elHeight;
        /**
         * The parentNode of carousel Element
         * @type {?}
         */
        DragScrollComponent.prototype.parentNode;
        /**
         * The carousel Element
         * @type {?}
         */
        DragScrollComponent.prototype._contentRef;
        /** @type {?} */
        DragScrollComponent.prototype._children;
        /** @type {?} */
        DragScrollComponent.prototype._pointerEvents;
        /** @type {?} */
        DragScrollComponent.prototype.wrapper;
        /** @type {?} */
        DragScrollComponent.prototype.scrollbarWidth;
        /** @type {?} */
        DragScrollComponent.prototype.isAnimating;
        /** @type {?} */
        DragScrollComponent.prototype.prevChildrenLength;
        /** @type {?} */
        DragScrollComponent.prototype.indexBound;
        /** @type {?} */
        DragScrollComponent.prototype.dsInitialized;
        /** @type {?} */
        DragScrollComponent.prototype.indexChanged;
        /** @type {?} */
        DragScrollComponent.prototype.reachesLeftBound;
        /** @type {?} */
        DragScrollComponent.prototype.reachesRightBound;
        /** @type {?} */
        DragScrollComponent.prototype.snapAnimationFinished;
        /** @type {?} */
        DragScrollComponent.prototype.dragStart;
        /** @type {?} */
        DragScrollComponent.prototype.dragEnd;
        /**
         * @type {?}
         * @private
         */
        DragScrollComponent.prototype._elementRef;
        /**
         * @type {?}
         * @private
         */
        DragScrollComponent.prototype._renderer;
        /**
         * @type {?}
         * @private
         */
        DragScrollComponent.prototype._document;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DragScrollModule = /** @class */ (function () {
        function DragScrollModule() {
        }
        DragScrollModule.decorators = [
            { type: core.NgModule, args: [{
                        exports: [
                            DragScrollComponent,
                            DragScrollItemDirective
                        ],
                        declarations: [
                            DragScrollComponent,
                            DragScrollItemDirective
                        ]
                    },] }
        ];
        return DragScrollModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function DragScrollElement() { }
    if (false) {
        /** @type {?} */
        DragScrollElement.prototype.parentNode;
        /** @type {?} */
        DragScrollElement.prototype.cloneNode;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function DragScrollOption() { }
    if (false) {
        /** @type {?} */
        DragScrollOption.prototype.disabled;
        /** @type {?} */
        DragScrollOption.prototype.snapDisabled;
        /** @type {?} */
        DragScrollOption.prototype.scrollbarHidden;
        /** @type {?} */
        DragScrollOption.prototype.yDisabled;
        /** @type {?} */
        DragScrollOption.prototype.xDisabled;
        /** @type {?} */
        DragScrollOption.prototype.nav;
    }

    exports.DragScrollComponent = DragScrollComponent;
    exports.DragScrollItemDirective = DragScrollItemDirective;
    exports.DragScrollModule = DragScrollModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ngx-drag-scroll.umd.js.map
