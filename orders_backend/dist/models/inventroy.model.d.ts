import mongoose, { Document } from 'mongoose';
export interface IInventory extends Document {
    productId: mongoose.Types.ObjectId;
    availableStock: number;
    reservedStock: number;
    reorderLevel: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Inventory: mongoose.Model<IInventory, {}, {}, {}, Document<unknown, {}, IInventory, {}, mongoose.DefaultSchemaOptions> & IInventory & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IInventory>;
//# sourceMappingURL=inventroy.model.d.ts.map