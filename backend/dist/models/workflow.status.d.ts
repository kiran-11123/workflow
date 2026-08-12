import mongoose from "mongoose";
declare const workflow_status: mongoose.Model<{
    email: string;
    workflow_name: string;
    idempotent_key: string;
    status: string;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    email: string;
    workflow_name: string;
    idempotent_key: string;
    status: string;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    email: string;
    workflow_name: string;
    idempotent_key: string;
    status: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    email: string;
    workflow_name: string;
    idempotent_key: string;
    status: string;
}, mongoose.Document<unknown, {}, {
    email: string;
    workflow_name: string;
    idempotent_key: string;
    status: string;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    email: string;
    workflow_name: string;
    idempotent_key: string;
    status: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    email: string;
    workflow_name: string;
    idempotent_key: string;
    status: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    email: string;
    workflow_name: string;
    idempotent_key: string;
    status: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default workflow_status;
//# sourceMappingURL=workflow.status.d.ts.map