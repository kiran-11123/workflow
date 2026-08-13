import mongoose, { Document, Schema } from 'mongoose';

export interface IInventory extends Document {
    productId: mongoose.Types.ObjectId;
    availableStock: number;
    reservedStock: number;
    reorderLevel: number;
    createdAt: Date;
    updatedAt: Date;
}

const InventorySchema = new Schema<IInventory>(
    {
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
        }
    },
    {
        timestamps: true,
        collection: 'inventory'
    }
);

export const inventory_model = mongoose.model<IInventory>(
    'Inventory',
    InventorySchema
);