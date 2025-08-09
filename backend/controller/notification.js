const NotificationModel = require('../models/notification');




exports.getNotifications = async (req, res) => {
    try {
        let ownId = req.user._id;
        const notifications = await NotificationModel.find({ receiver: ownId }).sort({ createdAt: -1 }).populate('sender receiver');
        return res.status(200).json({
            message: 'Notifications fetched successfully',
            notifications: notifications
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error fetching notifications" });
    }
};


exports.updateRead = async (req, res) => {
    try {
        const { notificationId } = req.body;
        const notification = await NotificationModel.findByIdAndUpdate(notificationId, { isRead: true });
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        return res.status(200).json({
            message: 'Notification marked as read',
            notification: notification
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error updating notification" });
    }
};



exports.activeNotify = async (req, res) => {
    try {
        let ownId = req.user._id;
        const notifications = await NotificationModel.find({ receiver: ownId, isRead: false })
        return res.status(200).json({
            message: 'Active notifications fetched successfully',
            notifications: notifications.length
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error fetching active notifications" });
    }
};
