import mongoose from "mongoose";
export declare class WorkFlowRespository {
    create(data: any): Promise<void>;
    findAll(): Promise<void>;
    findById(id: string): Promise<(mongoose.Document<unknown, {}, {
        workflow_name: string;
        description?: string | null;
        version: number;
        status: import("../types/workflow.types.js").WorkflowStatus;
        nodes: mongoose.Types.DocumentArray<{
            id: string;
            type?: import("../types/workflow.types.js").NodeType | null;
            config: any;
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            id: string;
            type?: import("../types/workflow.types.js").NodeType | null;
            config: any;
        }, {}, {}> & {
            id: string;
            type?: import("../types/workflow.types.js").NodeType | null;
            config: any;
        }>;
        edges: mongoose.Types.DocumentArray<{
            source: string;
            target: string;
            condition?: string | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            source: string;
            target: string;
            condition?: string | null;
        }, {}, {}> & {
            source: string;
            target: string;
            condition?: string | null;
        }>;
    } & mongoose.DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        workflow_name: string;
        description?: string | null;
        version: number;
        status: import("../types/workflow.types.js").WorkflowStatus;
        nodes: mongoose.Types.DocumentArray<{
            id: string;
            type?: import("../types/workflow.types.js").NodeType | null;
            config: any;
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            id: string;
            type?: import("../types/workflow.types.js").NodeType | null;
            config: any;
        }, {}, {}> & {
            id: string;
            type?: import("../types/workflow.types.js").NodeType | null;
            config: any;
        }>;
        edges: mongoose.Types.DocumentArray<{
            source: string;
            target: string;
            condition?: string | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            source: string;
            target: string;
            condition?: string | null;
        }, {}, {}> & {
            source: string;
            target: string;
            condition?: string | null;
        }>;
    } & mongoose.DefaultTimestampProps & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>) | null>;
    update(id: string, data: any): Promise<(mongoose.Document<unknown, {}, {
        workflow_name: string;
        description?: string | null;
        version: number;
        status: import("../types/workflow.types.js").WorkflowStatus;
        nodes: mongoose.Types.DocumentArray<{
            id: string;
            type?: import("../types/workflow.types.js").NodeType | null;
            config: any;
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            id: string;
            type?: import("../types/workflow.types.js").NodeType | null;
            config: any;
        }, {}, {}> & {
            id: string;
            type?: import("../types/workflow.types.js").NodeType | null;
            config: any;
        }>;
        edges: mongoose.Types.DocumentArray<{
            source: string;
            target: string;
            condition?: string | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            source: string;
            target: string;
            condition?: string | null;
        }, {}, {}> & {
            source: string;
            target: string;
            condition?: string | null;
        }>;
    } & mongoose.DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        workflow_name: string;
        description?: string | null;
        version: number;
        status: import("../types/workflow.types.js").WorkflowStatus;
        nodes: mongoose.Types.DocumentArray<{
            id: string;
            type?: import("../types/workflow.types.js").NodeType | null;
            config: any;
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            id: string;
            type?: import("../types/workflow.types.js").NodeType | null;
            config: any;
        }, {}, {}> & {
            id: string;
            type?: import("../types/workflow.types.js").NodeType | null;
            config: any;
        }>;
        edges: mongoose.Types.DocumentArray<{
            source: string;
            target: string;
            condition?: string | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            source: string;
            target: string;
            condition?: string | null;
        }, {}, {}> & {
            source: string;
            target: string;
            condition?: string | null;
        }>;
    } & mongoose.DefaultTimestampProps & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>) | null>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=workflow.repository.d.ts.map