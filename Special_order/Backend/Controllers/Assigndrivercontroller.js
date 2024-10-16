const Notifications=require("../Models/AssigneddriverModel");

const assignDriver = async (req, res, next) => {
    const { orderId, driverId } = req.body;
    let order;
    try {
        order = await Notifications.findById(orderId);
        if (order) {
            order.assignedDriver = driverId;
            await order.save();

            // Logic to create a notification for the driver
            const notification = {
                driverId: driverId,
                orderId: orderId,
                message: `You have been assigned a new order: ${order.contactname}`,
            };
            // Save the notification (assumes a Notification model or similar logic)
            // await Notification.create(notification);

            res.status(200).json({ message: "Driver assigned successfully!", order });
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error assigning driver" });
    }
};

const getDriverNotifications = async (req, res, next) => {
    const driverId = req.params.driverId;
    let notifications;
    try {
        notifications = await Notifications.find({ driverId: driverId });
    } catch (err) {
        console.log(err);
    }
    if (!notifications) {
        return res.status(404).json({ message: "Notifications not found" });
    }
    return res.status(200).json({ notifications });
};

const acceptOrder = async (req, res, next) => {
    const { notificationId } = req.body;
    let notification;
    try {
        notification = await Notifications.findById(notificationId);
        if (notification) {
            // Logic to mark the order as accepted by the driver
            // await Order.findByIdAndUpdate(notification.orderId, { status: 'accepted' });
            notification.status = 'accepted';
            await notification.save();
            res.status(200).json({ message: "Order accepted!" });
        } else {
            res.status(404).json({ message: "Notification not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error accepting order" });
    }
};

// Deny order by driver
const denyOrder = async (req, res, next) => {
    const { notificationId } = req.body;
    let notification;
    try {
        notification = await Notification.findById(notificationId);
        if (notification) {
            // Logic to mark the order as denied by the driver
            // await Order.findByIdAndUpdate(notification.orderId, { status: 'denied' });
            notification.status = 'denied';
            await notification.save();
            res.status(200).json({ message: "Order denied!" });
        } else {
            res.status(404).json({ message: "Notification not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error denying order" });
    }
};

exports.assignDriver = assignDriver;
exports.getDriverNotifications = getDriverNotifications;
exports.acceptOrder = acceptOrder;
exports.denyOrder = denyOrder;