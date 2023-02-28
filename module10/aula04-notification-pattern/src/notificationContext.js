export default class NotificationContext {
    constructor() {
        this.notications = []
    }

    hasNotifications() {
        return this.notications.length > 0
    }

    addNotification(notication) {
        this.notications.push(notication)
    }
}