export declare class WorkFlowService {
    private repository;
    createWorkFlow(data: any): Promise<void>;
    getAllWorkFlow(): Promise<void>;
    getWorkFlowById(id: string): Promise<(import("mongoose").Document<unknown, {}, {
        workflow_name: string;
        description?: string | null;
        version: number;
        status: import("../types/workflow.types.js").WorkflowStatus;
        nodes: import("mongoose").Types.DocumentArray<{
            id: string;
            type?: import("../types/workflow.types.js").NodeType | null;
            config: any;
        }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
            id: string;
            type?: import("../types/workflow.types.js").NodeType | null;
            config: any;
        }, {}, {}> & {
            id: string;
            type?: import("../types/workflow.types.js").NodeType | null;
            config: any;
        }>;
        edges: import("mongoose").Types.DocumentArray<{
            source: string;
            target: string;
            condition?: string | null;
        }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
            source: string;
            target: string;
            condition?: string | null;
        }, {}, {}> & {
            source: string;
            target: string;
            condition?: string | null;
        }>;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        workflow_name: string;
        description?: string | null;
        version: number;
        status: import("../types/workflow.types.js").WorkflowStatus;
        nodes: import("mongoose").Types.DocumentArray<{
            id: string;
            type?: import("../types/workflow.types.js").NodeType | null;
            config: any;
        }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
            id: string;
            type?: import("../types/workflow.types.js").NodeType | null;
            config: any;
        }, {}, {}> & {
            id: string;
            type?: import("../types/workflow.types.js").NodeType | null;
            config: any;
        }>;
        edges: import("mongoose").Types.DocumentArray<{
            source: string;
            target: string;
            condition?: string | null;
        }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
            source: string;
            target: string;
            condition?: string | null;
        }, {}, {}> & {
            source: string;
            target: string;
            condition?: string | null;
        }>;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>) | null>;
    FindIdAndUpdateWorkFlow(id: string, data: any): Promise<(import("mongoose").Document<unknown, {}, {
        workflow_name: string;
        description?: string | null;
        version: number;
        status: import("../types/workflow.types.js").WorkflowStatus;
        nodes: import("mongoose").Types.DocumentArray<{
            id: string;
            type?: import("../types/workflow.types.js").NodeType | null;
            config: any;
        }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
            id: string;
            type?: import("../types/workflow.types.js").NodeType | null;
            config: any;
        }, {}, {}> & {
            id: string;
            type?: import("../types/workflow.types.js").NodeType | null;
            config: any;
        }>;
        edges: import("mongoose").Types.DocumentArray<{
            source: string;
            target: string;
            condition?: string | null;
        }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
            source: string;
            target: string;
            condition?: string | null;
        }, {}, {}> & {
            source: string;
            target: string;
            condition?: string | null;
        }>;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        workflow_name: string;
        description?: string | null;
        version: number;
        status: import("../types/workflow.types.js").WorkflowStatus;
        nodes: import("mongoose").Types.DocumentArray<{
            id: string;
            type?: import("../types/workflow.types.js").NodeType | null;
            config: any;
        }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
            id: string;
            type?: import("../types/workflow.types.js").NodeType | null;
            config: any;
        }, {}, {}> & {
            id: string;
            type?: import("../types/workflow.types.js").NodeType | null;
            config: any;
        }>;
        edges: import("mongoose").Types.DocumentArray<{
            source: string;
            target: string;
            condition?: string | null;
        }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
            source: string;
            target: string;
            condition?: string | null;
        }, {}, {}> & {
            source: string;
            target: string;
            condition?: string | null;
        }>;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>) | null>;
    FindIdAndDeleteWorkFlow(id: string): Promise<void>;
}
//# sourceMappingURL=workflow.service.d.ts.map