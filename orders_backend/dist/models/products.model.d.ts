import mongoose from "mongoose";
import { Document } from "mongoose";
export declare enum ProductStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    OUT_OF_STOCK = "OUT_OF_STOCK",
    DISCONTINUED = "DISCONTINUED"
}
export interface IProduct extends Document {
    name: string;
    description?: string;
    price: number;
    currency: string;
    status: ProductStatus;
    createdAt: Date;
    updatedAt: Date;
}
export declare const product_model: mongoose.Model<IProduct, {}, {}, {}, Document<unknown, {}, IProduct, {}, mongoose.DefaultSchemaOptions> & IProduct & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IProduct>;
//# sourceMappingURL=products.model.d.ts.map