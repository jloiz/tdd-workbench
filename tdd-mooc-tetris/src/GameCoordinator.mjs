export class GameCoordinator {
    constructor() {
        this.subscribers = {}
    }

    subscribe(eventName, callback) {

        if (!this.subscribers[eventName]) {
            this.subscribers[eventName] = []
        }

        this.subscribers[eventName].push(callback)
    }

    publish(eventName, data) {
        const callbacks = this.subscribers[eventName] 
        callbacks.forEach(callback => callback(data))
    }

}