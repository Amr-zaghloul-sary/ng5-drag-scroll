import { Directive, ElementRef, Inject, HostBinding, Input, EventEmitter, Component, Renderer2, ViewChild, ContentChildren, Output, HostListener, NgModule } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DragScrollItemDirective {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.display = 'inline-block';
        this._dragDisabled = false;
        this._elementRef = elementRef;
    }
    /**
     * @return {?}
     */
    get dragDisabled() { return this._dragDisabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set dragDisabled(value) { this._dragDisabled = value; }
}
DragScrollItemDirective.decorators = [
    { type: Directive, args: [{
                selector: '[drag-scroll-item]'
            },] }
];
/** @nocollapse */
DragScrollItemDirective.ctorParameters = () => [
    { type: ElementRef, decorators: [{ type: Inject, args: [ElementRef,] }] }
];
DragScrollItemDirective.propDecorators = {
    display: [{ type: HostBinding, args: ['style.display',] }],
    dragDisabled: [{ type: Input, args: ['drag-disabled',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DragScrollComponent {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} _document
     */
    constructor(_elementRef, _renderer, _document) {
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
        this.dsInitialized = new EventEmitter();
        this.indexChanged = new EventEmitter();
        this.reachesLeftBound = new EventEmitter();
        this.reachesRightBound = new EventEmitter();
        this.snapAnimationFinished = new EventEmitter();
        this.dragStart = new EventEmitter();
        this.dragEnd = new EventEmitter();
        this.scrollbarWidth = `${this.getScrollbarWidth()}px`;
    }
    /**
     * Is the user currently dragging the element
     * @return {?}
     */
    get isDragging() {
        return this._isDragging;
    }
    /**
     * @return {?}
     */
    get currIndex() { return this._index; }
    /**
     * @param {?} value
     * @return {?}
     */
    set currIndex(value) {
        if (value !== this._index) {
            this._index = value;
            this.indexChanged.emit(value);
        }
    }
    /**
     * Whether the scrollbar is hidden
     * @return {?}
     */
    get scrollbarHidden() { return this._scrollbarHidden; }
    /**
     * @param {?} value
     * @return {?}
     */
    set scrollbarHidden(value) { this._scrollbarHidden = value; }
    /**
     * Whether horizontally and vertically draging and scrolling is be disabled
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) { this._disabled = value; }
    /**
     * Whether horizontally dragging and scrolling is be disabled
     * @return {?}
     */
    get xDisabled() { return this._xDisabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set xDisabled(value) { this._xDisabled = value; }
    /**
     * Whether vertically dragging and scrolling events is disabled
     * @return {?}
     */
    get yDisabled() { return this._yDisabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set yDisabled(value) { this._yDisabled = value; }
    /**
     * Whether scrolling horizontally with mouse wheel is enabled
     * @return {?}
     */
    get xWheelEnabled() { return this._xWheelEnabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set xWheelEnabled(value) { this._xWheelEnabled = value; }
    /**
     * @return {?}
     */
    get dragDisabled() { return this._dragDisabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set dragDisabled(value) { this._dragDisabled = value; }
    /**
     * @return {?}
     */
    get snapDisabled() { return this._snapDisabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set snapDisabled(value) { this._snapDisabled = value; }
    /**
     * @return {?}
     */
    get snapOffset() { return this._snapOffset; }
    /**
     * @param {?} value
     * @return {?}
     */
    set snapOffset(value) { this._snapOffset = value; }
    /**
     * @return {?}
     */
    get snapDuration() { return this._snapDuration; }
    /**
     * @param {?} value
     * @return {?}
     */
    set snapDuration(value) { this._snapDuration = value; }
    /**
     * @return {?}
     */
    ngOnChanges() {
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
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
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
        (e) => {
            e.preventDefault();
        }));
        this.checkNavStatus();
        this.dsInitialized.emit();
        this.adjustMarginToLastChild();
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        // avoid extra checks
        if (this._children.length !== this.prevChildrenLength) {
            this.markElDimension();
            this.checkScrollbar();
            this.prevChildrenLength = this._children.length;
            this.checkNavStatus();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseMoveHandler(event) {
        this.onMouseMove(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseMove(event) {
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
                const clientX = ((/** @type {?} */ (event))).clientX;
                this._contentRef.nativeElement.scrollLeft =
                    this._contentRef.nativeElement.scrollLeft - clientX + this.downX;
                this.downX = clientX;
            }
            // Drag Y
            if (!this.yDisabled && !this.dragDisabled) {
                /** @type {?} */
                const clientY = ((/** @type {?} */ (event))).clientY;
                this._contentRef.nativeElement.scrollTop =
                    this._contentRef.nativeElement.scrollTop - clientY + this.downY;
                this.downY = clientY;
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseDownHandler(event) {
        /** @type {?} */
        const dragScrollItem = this.locateDragScrollItem((/** @type {?} */ (event.target)));
        if (dragScrollItem && dragScrollItem.dragDisabled) {
            return;
        }
        /** @type {?} */
        const isTouchEvent = event.type === 'touchstart';
        this._startGlobalListening(isTouchEvent);
        this.isPressed = true;
        /** @type {?} */
        const mouseEvent = (/** @type {?} */ (event));
        this.downX = mouseEvent.clientX;
        this.downY = mouseEvent.clientY;
        clearTimeout((/** @type {?} */ (this.scrollToTimer)));
    }
    /**
     * @return {?}
     */
    onScrollHandler() {
        this.checkNavStatus();
        if (!this.isPressed && !this.isAnimating && !this.snapDisabled) {
            this.isScrolling = true;
            clearTimeout((/** @type {?} */ (this.scrollTimer)));
            this.scrollTimer = setTimeout((/**
             * @return {?}
             */
            () => {
                this.isScrolling = false;
                this.locateCurrentIndex(true);
            }), 500);
        }
        else {
            this.locateCurrentIndex();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseUpHandler(event) {
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
    }
    /*
       * Nav button
       */
    /**
     * @return {?}
     */
    moveLeft() {
        if ((this.currIndex !== 0 || this.snapDisabled)) {
            this.currIndex--;
            clearTimeout((/** @type {?} */ (this.scrollToTimer)));
            this.scrollTo(this._contentRef.nativeElement, this.toChildrenLocation(), this.snapDuration);
        }
    }
    /**
     * @return {?}
     */
    moveRight() {
        /** @type {?} */
        const container = this.wrapper || this.parentNode;
        /** @type {?} */
        const containerWidth = container ? container.clientWidth : 0;
        if (!this.isScrollReachesRightEnd() && this.currIndex < this.maximumIndex(containerWidth, this._children.toArray())) {
            this.currIndex++;
            clearTimeout((/** @type {?} */ (this.scrollToTimer)));
            this.scrollTo(this._contentRef.nativeElement, this.toChildrenLocation(), this.snapDuration);
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    moveTo(index) {
        /** @type {?} */
        const container = this.wrapper || this.parentNode;
        /** @type {?} */
        const containerWidth = container ? container.clientWidth : 0;
        if (index >= 0 &&
            index !== this.currIndex &&
            this.currIndex <= this.maximumIndex(containerWidth, this._children.toArray())) {
            this.currIndex = Math.min(index, this.maximumIndex(containerWidth, this._children.toArray()));
            clearTimeout((/** @type {?} */ (this.scrollToTimer)));
            this.scrollTo(this._contentRef.nativeElement, this.toChildrenLocation(), this.snapDuration);
        }
    }
    /**
     * @return {?}
     */
    checkNavStatus() {
        setTimeout((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const onlyOneItem = Boolean(this._children.length <= 1);
            /** @type {?} */
            const containerIsLargerThanContent = Boolean(this._contentRef.nativeElement.scrollWidth <=
                this._contentRef.nativeElement.clientWidth);
            if (onlyOneItem || containerIsLargerThanContent) {
                // only one element
                this.reachesLeftBound.emit(true);
                this.reachesRightBound.emit(true);
            }
            else if (this.isScrollReachesRightEnd()) {
                // reached right end
                this.reachesLeftBound.emit(false);
                this.reachesRightBound.emit(true);
            }
            else if (this._contentRef.nativeElement.scrollLeft === 0 &&
                this._contentRef.nativeElement.scrollWidth > this._contentRef.nativeElement.clientWidth) {
                // reached left end
                this.reachesLeftBound.emit(true);
                this.reachesRightBound.emit(false);
            }
            else {
                // in the middle
                this.reachesLeftBound.emit(false);
                this.reachesRightBound.emit(false);
            }
        }), 0);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onWheel(event) {
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
    }
    /**
     * @return {?}
     */
    onWindowResize() {
        this.refreshWrapperDimensions();
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    _setIsDragging(value) {
        if (this._isDragging === value) {
            return;
        }
        this._isDragging = value;
        value ? this.dragStart.emit() : this.dragEnd.emit();
    }
    /**
     * @private
     * @param {?} isTouchEvent
     * @return {?}
     */
    _startGlobalListening(isTouchEvent) {
        if (!this._onMouseMoveListener) {
            /** @type {?} */
            const eventName = isTouchEvent ? 'touchmove' : 'mousemove';
            this._onMouseMoveListener = this._renderer.listen('document', eventName, this.onMouseMoveHandler.bind(this));
        }
        if (!this._onMouseUpListener) {
            /** @type {?} */
            const eventName = isTouchEvent ? 'touchend' : 'mouseup';
            this._onMouseUpListener = this._renderer.listen('document', eventName, this.onMouseUpHandler.bind(this));
        }
    }
    /**
     * @private
     * @return {?}
     */
    _stopGlobalListening() {
        if (this._onMouseMoveListener) {
            this._onMouseMoveListener = this._onMouseMoveListener();
        }
        if (this._onMouseUpListener) {
            this._onMouseUpListener = this._onMouseUpListener();
        }
    }
    /**
     * @private
     * @param {?} axis
     * @return {?}
     */
    disableScroll(axis) {
        this._renderer.setStyle(this._contentRef.nativeElement, `overflow-${axis}`, 'hidden');
    }
    /**
     * @private
     * @param {?} axis
     * @return {?}
     */
    enableScroll(axis) {
        this._renderer.setStyle(this._contentRef.nativeElement, `overflow-${axis}`, 'auto');
    }
    /**
     * @private
     * @return {?}
     */
    hideScrollbar() {
        if (this._contentRef.nativeElement.style.display !== 'none' && !this.wrapper) {
            this.parentNode = this._contentRef.nativeElement.parentNode;
            // create container element
            this.wrapper = this._renderer.createElement('div');
            this._renderer.setAttribute(this.wrapper, 'class', 'drag-scroll-wrapper');
            this._renderer.addClass(this.wrapper, 'drag-scroll-container');
            this.refreshWrapperDimensions();
            this._renderer.setStyle(this.wrapper, 'overflow', 'hidden');
            this._renderer.setStyle(this._contentRef.nativeElement, 'width', `calc(100% + ${this.scrollbarWidth})`);
            this._renderer.setStyle(this._contentRef.nativeElement, 'height', `calc(100% + ${this.scrollbarWidth})`);
            // Append container element to component element.
            this._renderer.appendChild(this._elementRef.nativeElement, this.wrapper);
            // Append content element to container element.
            this._renderer.appendChild(this.wrapper, this._contentRef.nativeElement);
            this.adjustMarginToLastChild();
        }
    }
    /**
     * @private
     * @return {?}
     */
    showScrollbar() {
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
    }
    /**
     * @private
     * @return {?}
     */
    checkScrollbar() {
        if (this._contentRef.nativeElement.scrollWidth <= this._contentRef.nativeElement.clientWidth) {
            this._renderer.setStyle(this._contentRef.nativeElement, 'height', '100%');
        }
        else {
            this._renderer.setStyle(this._contentRef.nativeElement, 'height', `calc(100% + ${this.scrollbarWidth})`);
        }
        if (this._contentRef.nativeElement.scrollHeight <= this._contentRef.nativeElement.clientHeight) {
            this._renderer.setStyle(this._contentRef.nativeElement, 'width', '100%');
        }
        else {
            this._renderer.setStyle(this._contentRef.nativeElement, 'width', `calc(100% + ${this.scrollbarWidth})`);
        }
    }
    /**
     * @private
     * @return {?}
     */
    setScrollBar() {
        if (this.scrollbarHidden) {
            this.hideScrollbar();
        }
        else {
            this.showScrollbar();
        }
    }
    /**
     * @private
     * @return {?}
     */
    getScrollbarWidth() {
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
        const outer = this._renderer.createElement('div');
        this._renderer.setStyle(outer, 'visibility', 'hidden');
        this._renderer.setStyle(outer, 'width', '100px');
        this._renderer.setStyle(outer, 'msOverflowStyle', 'scrollbar'); // needed for WinJS apps
        // document.body.appendChild(outer);
        this._renderer.appendChild(this._document.body, outer);
        // this._renderer.appendChild(this._renderer.selectRootElement('body'), outer);
        /** @type {?} */
        const widthNoScroll = outer.offsetWidth;
        // force scrollbars
        this._renderer.setStyle(outer, 'overflow', 'scroll');
        // add innerdiv
        /** @type {?} */
        const inner = this._renderer.createElement('div');
        this._renderer.setStyle(inner, 'width', '100%');
        this._renderer.appendChild(outer, inner);
        /** @type {?} */
        const widthWithScroll = inner.offsetWidth;
        // remove divs
        this._renderer.removeChild(this._document.body, outer);
        /**
         * Scrollbar width will be 0 on Mac OS with the
         * default "Only show scrollbars when scrolling" setting (Yosemite and up).
         * setting default width to 20;
         */
        return widthNoScroll - widthWithScroll || 20;
    }
    /**
     * @private
     * @return {?}
     */
    refreshWrapperDimensions() {
        if (this.wrapper) {
            this._renderer.setStyle(this.wrapper, 'width', '100%');
            this._renderer.setStyle(this.wrapper, 'height', this._elementRef.nativeElement.style.height
                || this._elementRef.nativeElement.offsetHeight + 'px');
        }
    }
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
    scrollTo(element, to, duration) {
        /** @type {?} */
        const self = this;
        self.isAnimating = true;
        /** @type {?} */
        const start = element.scrollLeft;
        /** @type {?} */
        const change = to - start - this.snapOffset;
        /** @type {?} */
        const increment = 20;
        /** @type {?} */
        let currentTime = 0;
        // t = current time
        // b = start value
        // c = change in value
        // d = duration
        /** @type {?} */
        const easeInOutQuad = (/**
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
        const animateScroll = (/**
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
                () => {
                    self.isAnimating = false;
                    self.snapAnimationFinished.emit(self.currIndex);
                }), increment);
            }
        });
        animateScroll();
    }
    /**
     * @private
     * @param {?=} snap
     * @return {?}
     */
    locateCurrentIndex(snap) {
        this.currentChildWidth((/**
         * @param {?} currentChildWidth
         * @param {?} nextChildrenWidth
         * @param {?} childrenWidth
         * @param {?} idx
         * @param {?} stop
         * @return {?}
         */
        (currentChildWidth, nextChildrenWidth, childrenWidth, idx, stop) => {
            if ((this._contentRef.nativeElement.scrollLeft >= childrenWidth &&
                this._contentRef.nativeElement.scrollLeft <= nextChildrenWidth)) {
                if (nextChildrenWidth - this._contentRef.nativeElement.scrollLeft > currentChildWidth / 2 && !this.isScrollReachesRightEnd()) {
                    // roll back scrolling
                    if (!this.isAnimating) {
                        this.currIndex = idx;
                    }
                    if (snap) {
                        this.scrollTo(this._contentRef.nativeElement, childrenWidth, this.snapDuration);
                    }
                }
                else if (this._contentRef.nativeElement.scrollLeft !== 0) {
                    // forward scrolling
                    if (!this.isAnimating) {
                        this.currIndex = idx + 1;
                    }
                    if (snap) {
                        this.scrollTo(this._contentRef.nativeElement, childrenWidth + currentChildWidth, this.snapDuration);
                    }
                }
                stop();
            }
            else if ((idx + 1) === (this._children.length - 1)) {
                // reaches last index
                if (!this.isAnimating) {
                    this.currIndex = idx + 1;
                }
                stop();
            }
        }));
    }
    /**
     * @private
     * @param {?} cb
     * @return {?}
     */
    currentChildWidth(cb) {
        /** @type {?} */
        let childrenWidth = 0;
        /** @type {?} */
        let shouldBreak = false;
        /** @type {?} */
        const breakFunc = (/**
         * @return {?}
         */
        function () {
            shouldBreak = true;
        });
        /** @type {?} */
        const childrenArr = this._children.toArray();
        for (let i = 0; i < childrenArr.length; i++) {
            if (i === childrenArr.length - 1) {
                break;
            }
            if (shouldBreak) {
                break;
            }
            /** @type {?} */
            const nextChildrenWidth = childrenWidth + childrenArr[i + 1]._elementRef.nativeElement.clientWidth;
            /** @type {?} */
            const currentClildWidth = childrenArr[i]._elementRef.nativeElement.clientWidth;
            cb(currentClildWidth, nextChildrenWidth, childrenWidth, i, breakFunc);
            childrenWidth += currentClildWidth;
        }
    }
    /**
     * @private
     * @return {?}
     */
    toChildrenLocation() {
        /** @type {?} */
        let to = 0;
        /** @type {?} */
        const childrenArr = this._children.toArray();
        for (let i = 0; i < this.currIndex; i++) {
            to += childrenArr[i]._elementRef.nativeElement.clientWidth;
        }
        return to;
    }
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    locateDragScrollItem(element) {
        /** @type {?} */
        let item = null;
        /** @type {?} */
        const childrenArr = this._children.toArray();
        for (let i = 0; i < childrenArr.length; i++) {
            if (element === childrenArr[i]._elementRef.nativeElement) {
                item = childrenArr[i];
            }
        }
        return item;
    }
    /**
     * @private
     * @return {?}
     */
    markElDimension() {
        if (this.wrapper) {
            this.elWidth = this.wrapper.style.width;
            this.elHeight = this.wrapper.style.height;
        }
        else {
            this.elWidth = this._elementRef.nativeElement.style.width || (this._elementRef.nativeElement.offsetWidth + 'px');
            this.elHeight = this._elementRef.nativeElement.style.height || (this._elementRef.nativeElement.offsetHeight + 'px');
        }
        /** @type {?} */
        const container = this.wrapper || this.parentNode;
        /** @type {?} */
        const containerWidth = container ? container.clientWidth : 0;
        if (this._children.length > 1) {
            this.indexBound = this.maximumIndex(containerWidth, this._children.toArray());
        }
    }
    /**
     * @private
     * @param {?} containerWidth
     * @param {?} childrenElements
     * @return {?}
     */
    maximumIndex(containerWidth, childrenElements) {
        /** @type {?} */
        let count = 0;
        /** @type {?} */
        let childrenWidth = 0;
        for (let i = 0; i <= childrenElements.length; i++) {
            // last N element
            /** @type {?} */
            const dragScrollItemDirective = childrenElements[childrenElements.length - 1 - i];
            if (!dragScrollItemDirective) {
                break;
            }
            else {
                /** @type {?} */
                const nativeElement = dragScrollItemDirective._elementRef.nativeElement;
                /** @type {?} */
                let itemWidth = nativeElement.clientWidth;
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
    }
    /**
     * @private
     * @return {?}
     */
    isScrollReachesRightEnd() {
        /** @type {?} */
        const scrollLeftPos = this._contentRef.nativeElement.scrollLeft + this._contentRef.nativeElement.offsetWidth;
        return scrollLeftPos >= this._contentRef.nativeElement.scrollWidth;
    }
    /**
     * adds a margin right style to the last child element which will resolve the issue
     * of last item gets cutoff.
     * @private
     * @return {?}
     */
    adjustMarginToLastChild() {
        if (this._children && this._children.length > 0 && this.hideScrollbar) {
            /** @type {?} */
            const childrenArr = this._children.toArray();
            /** @type {?} */
            const lastItem = childrenArr[childrenArr.length - 1]._elementRef.nativeElement;
            if (this.wrapper && childrenArr.length > 1) {
                this._renderer.setStyle(lastItem, 'margin-right', this.scrollbarWidth);
            }
            else {
                this._renderer.setStyle(lastItem, 'margin-right', 0);
            }
        }
    }
}
DragScrollComponent.decorators = [
    { type: Component, args: [{
                selector: 'drag-scroll',
                template: `
    <div class="drag-scroll-content" #contentRef>
      <ng-content></ng-content>
    </div>
  `,
                styles: [`
    :host {
      overflow: hidden;
      display: block;
    }
    .drag-scroll-content {
      height: 100%;
      overflow: hidden ;
      @media screen and (max-width: 768px) { overflow: auto !important;}
      white-space: nowrap;
    }
    `]
            }] }
];
/** @nocollapse */
DragScrollComponent.ctorParameters = () => [
    { type: ElementRef, decorators: [{ type: Inject, args: [ElementRef,] }] },
    { type: Renderer2, decorators: [{ type: Inject, args: [Renderer2,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
DragScrollComponent.propDecorators = {
    _contentRef: [{ type: ViewChild, args: ['contentRef', { static: true },] }],
    _children: [{ type: ContentChildren, args: [DragScrollItemDirective,] }],
    _pointerEvents: [{ type: HostBinding, args: ['style.pointer-events',] }],
    dsInitialized: [{ type: Output }],
    indexChanged: [{ type: Output }],
    reachesLeftBound: [{ type: Output }],
    reachesRightBound: [{ type: Output }],
    snapAnimationFinished: [{ type: Output }],
    dragStart: [{ type: Output }],
    dragEnd: [{ type: Output }],
    scrollbarHidden: [{ type: Input, args: ['scrollbar-hidden',] }],
    disabled: [{ type: Input, args: ['drag-scroll-disabled',] }],
    xDisabled: [{ type: Input, args: ['drag-scroll-x-disabled',] }],
    yDisabled: [{ type: Input, args: ['drag-scroll-y-disabled',] }],
    xWheelEnabled: [{ type: Input, args: ['scroll-x-wheel-enabled',] }],
    dragDisabled: [{ type: Input, args: ['drag-disabled',] }],
    snapDisabled: [{ type: Input, args: ['snap-disabled',] }],
    snapOffset: [{ type: Input, args: ['snap-offset',] }],
    snapDuration: [{ type: Input, args: ['snap-duration',] }],
    onWheel: [{ type: HostListener, args: ['wheel', ['$event'],] }],
    onWindowResize: [{ type: HostListener, args: ['window:resize',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DragScrollModule {
}
DragScrollModule.decorators = [
    { type: NgModule, args: [{
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

export { DragScrollComponent, DragScrollItemDirective, DragScrollModule };
//# sourceMappingURL=ngx-drag-scroll.js.map
