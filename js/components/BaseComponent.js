class BaseComponent {
    constructor() {
        this.element = null;
        this.state = {};
        this.props = {};
    }

    // Create a new element
    createElement(tag, className, attributes = {}) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        
        // Add attributes
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
        
        return element;
    }

    // Set state and trigger re-render
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
    }

    // Set props and trigger re-render
    setProps(newProps) {
        this.props = { ...this.props, ...newProps };
        this.render();
    }

    // Render method to be implemented by child classes
    render() {
        throw new Error('Render method must be implemented');
    }

    // Mount component to DOM
    mount(container) {
        this.element = this.render();
        container.appendChild(this.element);
    }

    // Unmount component from DOM
    unmount() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
            this.element = null;
        }
    }

    // Add event listener
    addEventListener(event, callback) {
        if (this.element) {
            this.element.addEventListener(event, callback);
        }
    }

    // Remove event listener
    removeEventListener(event, callback) {
        if (this.element) {
            this.element.removeEventListener(event, callback);
        }
    }
} 