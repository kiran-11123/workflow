import mongoose, { Document, Schema } from 'mongoose';
const InventorySchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        unique: true,
        index: true
    },
    availableStock: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    reservedStock: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    reorderLevel: {
        type: Number,
        required: true,
        default: 10,
        min: 0
    }
}, {
    timestamps: true,
    collection: 'inventory'
});
export const inventory_model = mongoose.model('Inventory', InventorySchema);
//# sourceMappingURL=inventroy.model.js.map