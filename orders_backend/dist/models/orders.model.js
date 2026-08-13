import mongoose, { Document, Schema } from 'mongoose';
export var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["CONFIRMED"] = "CONFIRMED";
    OrderStatus["PROCESSING"] = "PROCESSING";
    OrderStatus["SHIPPED"] = "SHIPPED";
    OrderStatus["DELIVERED"] = "DELIVERED";
    OrderStatus["CANCELLED"] = "CANCELLED";
    OrderStatus["FAILED"] = "FAILED";
})(OrderStatus || (OrderStatus = {}));
const OrderSchema = new Schema({
    userId: {
        type: String,
        required: true,
        index: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(OrderStatus),
        default: OrderStatus.PENDING,
        index: true
    },
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    currency: {
        type: String,
        default: 'INR',
        uppercase: true
    }
}, {
    timestamps: true,
    collection: 'orders'
});
export const orders_model = mongoose.model('Order', OrderSchema);
//# sourceMappingURL=orders.model.js.map