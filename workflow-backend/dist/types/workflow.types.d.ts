export declare enum WorkflowStatus {
    DRAFT = "DRAFT",
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}
export declare enum NodeType {
    START = "START",
    DELAY = "DELAY",
    END = "END",
    EMAIL = "EMAIL",
    DATABASE = "DATABASE",
    HTTP = "HTTP"
}
export interface INode {
    id: string;
    type: NodeType;
    config: Record<string, any>;
}
export interface IEdge {
    source: string;
    target: string;
    condition?: string;
}
//# sourceMappingURL=workflow.types.d.ts.map