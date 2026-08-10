import mongoose from "mongoose";
import { WorkflowStatus, NodeType } from "../types/workflow.types.js";
export declare const NodeSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    _id: false;
}, {
    id: string;
    type: NodeType;
    config: any;
}, mongoose.Document<unknown, {}, {
    id: string;
    type: NodeType;
    config: any;
}, {}, Omit<mongoose.DefaultSchemaOptions, "_id"> & {
    _id: false;
}> & {
    id: string;
    type: NodeType;
    config: any;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, unknown, {
    id: string;
    type: NodeType;
    config: any;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const EdgeSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    _id: false;
}, {
    source: string;
    target: string;
    condition?: string | null;
}, mongoose.Document<unknown, {}, {
    source: string;
    target: string;
    condition?: string | null;
}, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "_id"> & {
    _id: false;
}> & Omit<{
    source: string;
    target: string;
    condition?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    source: string;
    target: string;
    condition?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
declare const workflow_model: mongoose.Model<{
    workflow_name: string;
    description?: string | null;
    version: number;
    status: WorkflowStatus;
    nodes: mongoose.Types.DocumentArray<{
        id: string;
        type: NodeType;
        config: any;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        id: string;
        type: NodeType;
        config: any;
    }, {}, {}> & {
        id: string;
        type: NodeType;
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
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    workflow_name: string;
    description?: string | null;
    version: number;
    status: WorkflowStatus;
    nodes: mongoose.Types.DocumentArray<{
        id: string;
        type: NodeType;
        config: any;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        id: string;
        type: NodeType;
        config: any;
    }, {}, {}> & {
        id: string;
        type: NodeType;
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
    status: WorkflowStatus;
    nodes: mongoose.Types.DocumentArray<{
        id: string;
        type: NodeType;
        config: any;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        id: string;
        type: NodeType;
        config: any;
    }, {}, {}> & {
        id: string;
        type: NodeType;
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
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    workflow_name: string;
    description?: string | null;
    version: number;
    status: WorkflowStatus;
    nodes: mongoose.Types.DocumentArray<{
        id: string;
        type: NodeType;
        config: any;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        id: string;
        type: NodeType;
        config: any;
    }, {}, {}> & {
        id: string;
        type: NodeType;
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
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    workflow_name: string;
    description?: string | null;
    version: number;
    status: WorkflowStatus;
    nodes: mongoose.Types.DocumentArray<{
        id: string;
        type: NodeType;
        config: any;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        id: string;
        type: NodeType;
        config: any;
    }, {}, {}> & {
        id: string;
        type: NodeType;
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
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    workflow_name: string;
    description?: string | null;
    version: number;
    status: WorkflowStatus;
    nodes: mongoose.Types.DocumentArray<{
        id: string;
        type: NodeType;
        config: any;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        id: string;
        type: NodeType;
        config: any;
    }, {}, {}> & {
        id: string;
        type: NodeType;
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
}>, unknown, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    workflow_name: string;
    description?: string | null;
    version: number;
    status: WorkflowStatus;
    nodes: mongoose.Types.DocumentArray<{
        id: string;
        type: NodeType;
        config: any;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        id: string;
        type: NodeType;
        config: any;
    }, {}, {}> & {
        id: string;
        type: NodeType;
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
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    workflow_name: string;
    description?: string | null;
    version: number;
    status: WorkflowStatus;
    nodes: mongoose.Types.DocumentArray<{
        id: string;
        type: NodeType;
        config: any;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        id: string;
        type: NodeType;
        config: any;
    }, {}, {}> & {
        id: string;
        type: NodeType;
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
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default workflow_model;
//# sourceMappingURL=workflow.model.d.ts.map