// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               v5.28.1
// source: protos/report.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import {
  type CallOptions,
  ChannelCredentials,
  Client,
  type ClientOptions,
  type ClientUnaryCall,
  type handleUnaryCall,
  makeGenericClientConstructor,
  Metadata,
  type ServiceError,
  type UntypedServiceImplementation,
} from "@grpc/grpc-js";

export const protobufPackage = "report";

export interface Empty {
}

export interface Report {
  id?: string | undefined;
  name: string;
  description: string;
  createdAt?: string | undefined;
  completed?: boolean | undefined;
  completedAt?: string | undefined;
}

export interface ReportId {
  id: string;
}

export interface ReportList {
  reports: Report[];
}

export interface ReportCompletion {
  id: string;
  completed: boolean;
}

function createBaseEmpty(): Empty {
  return {};
}

export const Empty: MessageFns<Empty> = {
  encode(_: Empty, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Empty {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmpty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): Empty {
    return {};
  },

  toJSON(_: Empty): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<Empty>, I>>(base?: I): Empty {
    return Empty.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Empty>, I>>(_: I): Empty {
    const message = createBaseEmpty();
    return message;
  },
};

function createBaseReport(): Report {
  return {
    id: undefined,
    name: "",
    description: "",
    createdAt: undefined,
    completed: undefined,
    completedAt: undefined,
  };
}

export const Report: MessageFns<Report> = {
  encode(message: Report, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== undefined) {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.createdAt !== undefined) {
      writer.uint32(34).string(message.createdAt);
    }
    if (message.completed !== undefined) {
      writer.uint32(40).bool(message.completed);
    }
    if (message.completedAt !== undefined) {
      writer.uint32(50).string(message.completedAt);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Report {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReport();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.description = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.createdAt = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.completed = reader.bool();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.completedAt = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Report {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : undefined,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      createdAt: isSet(object.createdAt) ? globalThis.String(object.createdAt) : undefined,
      completed: isSet(object.completed) ? globalThis.Boolean(object.completed) : undefined,
      completedAt: isSet(object.completedAt) ? globalThis.String(object.completedAt) : undefined,
    };
  },

  toJSON(message: Report): unknown {
    const obj: any = {};
    if (message.id !== undefined) {
      obj.id = message.id;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.createdAt !== undefined) {
      obj.createdAt = message.createdAt;
    }
    if (message.completed !== undefined) {
      obj.completed = message.completed;
    }
    if (message.completedAt !== undefined) {
      obj.completedAt = message.completedAt;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Report>, I>>(base?: I): Report {
    return Report.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Report>, I>>(object: I): Report {
    const message = createBaseReport();
    message.id = object.id ?? undefined;
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.completed = object.completed ?? undefined;
    message.completedAt = object.completedAt ?? undefined;
    return message;
  },
};

function createBaseReportId(): ReportId {
  return { id: "" };
}

export const ReportId: MessageFns<ReportId> = {
  encode(message: ReportId, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): ReportId {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReportId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ReportId {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: ReportId): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ReportId>, I>>(base?: I): ReportId {
    return ReportId.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ReportId>, I>>(object: I): ReportId {
    const message = createBaseReportId();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseReportList(): ReportList {
  return { reports: [] };
}

export const ReportList: MessageFns<ReportList> = {
  encode(message: ReportList, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    for (const v of message.reports) {
      Report.encode(v!, writer.uint32(10).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): ReportList {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReportList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.reports.push(Report.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ReportList {
    return {
      reports: globalThis.Array.isArray(object?.reports) ? object.reports.map((e: any) => Report.fromJSON(e)) : [],
    };
  },

  toJSON(message: ReportList): unknown {
    const obj: any = {};
    if (message.reports?.length) {
      obj.reports = message.reports.map((e) => Report.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ReportList>, I>>(base?: I): ReportList {
    return ReportList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ReportList>, I>>(object: I): ReportList {
    const message = createBaseReportList();
    message.reports = object.reports?.map((e) => Report.fromPartial(e)) || [];
    return message;
  },
};

function createBaseReportCompletion(): ReportCompletion {
  return { id: "", completed: false };
}

export const ReportCompletion: MessageFns<ReportCompletion> = {
  encode(message: ReportCompletion, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.completed !== false) {
      writer.uint32(16).bool(message.completed);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): ReportCompletion {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReportCompletion();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.completed = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ReportCompletion {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      completed: isSet(object.completed) ? globalThis.Boolean(object.completed) : false,
    };
  },

  toJSON(message: ReportCompletion): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.completed !== false) {
      obj.completed = message.completed;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ReportCompletion>, I>>(base?: I): ReportCompletion {
    return ReportCompletion.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ReportCompletion>, I>>(object: I): ReportCompletion {
    const message = createBaseReportCompletion();
    message.id = object.id ?? "";
    message.completed = object.completed ?? false;
    return message;
  },
};

export type ReportServiceService = typeof ReportServiceService;
export const ReportServiceService = {
  getReports: {
    path: "/report.ReportService/GetReports",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Empty.decode(value),
    responseSerialize: (value: ReportList) => Buffer.from(ReportList.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ReportList.decode(value),
  },
  getReport: {
    path: "/report.ReportService/GetReport",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ReportId) => Buffer.from(ReportId.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ReportId.decode(value),
    responseSerialize: (value: Report) => Buffer.from(Report.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Report.decode(value),
  },
  createReport: {
    path: "/report.ReportService/CreateReport",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Report) => Buffer.from(Report.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Report.decode(value),
    responseSerialize: (value: Report) => Buffer.from(Report.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Report.decode(value),
  },
  updateReport: {
    path: "/report.ReportService/UpdateReport",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Report) => Buffer.from(Report.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Report.decode(value),
    responseSerialize: (value: Report) => Buffer.from(Report.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Report.decode(value),
  },
  deleteReport: {
    path: "/report.ReportService/DeleteReport",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ReportId) => Buffer.from(ReportId.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ReportId.decode(value),
    responseSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Empty.decode(value),
  },
  markReport: {
    path: "/report.ReportService/MarkReport",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ReportCompletion) => Buffer.from(ReportCompletion.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ReportCompletion.decode(value),
    responseSerialize: (value: Report) => Buffer.from(Report.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Report.decode(value),
  },
} as const;

export interface ReportServiceServer extends UntypedServiceImplementation {
  getReports: handleUnaryCall<Empty, ReportList>;
  getReport: handleUnaryCall<ReportId, Report>;
  createReport: handleUnaryCall<Report, Report>;
  updateReport: handleUnaryCall<Report, Report>;
  deleteReport: handleUnaryCall<ReportId, Empty>;
  markReport: handleUnaryCall<ReportCompletion, Report>;
}

export interface ReportServiceClient extends Client {
  getReports(request: Empty, callback: (error: ServiceError | null, response: ReportList) => void): ClientUnaryCall;
  getReports(
    request: Empty,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ReportList) => void,
  ): ClientUnaryCall;
  getReports(
    request: Empty,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ReportList) => void,
  ): ClientUnaryCall;
  getReport(request: ReportId, callback: (error: ServiceError | null, response: Report) => void): ClientUnaryCall;
  getReport(
    request: ReportId,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Report) => void,
  ): ClientUnaryCall;
  getReport(
    request: ReportId,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Report) => void,
  ): ClientUnaryCall;
  createReport(request: Report, callback: (error: ServiceError | null, response: Report) => void): ClientUnaryCall;
  createReport(
    request: Report,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Report) => void,
  ): ClientUnaryCall;
  createReport(
    request: Report,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Report) => void,
  ): ClientUnaryCall;
  updateReport(request: Report, callback: (error: ServiceError | null, response: Report) => void): ClientUnaryCall;
  updateReport(
    request: Report,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Report) => void,
  ): ClientUnaryCall;
  updateReport(
    request: Report,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Report) => void,
  ): ClientUnaryCall;
  deleteReport(request: ReportId, callback: (error: ServiceError | null, response: Empty) => void): ClientUnaryCall;
  deleteReport(
    request: ReportId,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
  deleteReport(
    request: ReportId,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
  markReport(
    request: ReportCompletion,
    callback: (error: ServiceError | null, response: Report) => void,
  ): ClientUnaryCall;
  markReport(
    request: ReportCompletion,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Report) => void,
  ): ClientUnaryCall;
  markReport(
    request: ReportCompletion,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Report) => void,
  ): ClientUnaryCall;
}

export const ReportServiceClient = makeGenericClientConstructor(
  ReportServiceService,
  "report.ReportService",
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): ReportServiceClient;
  service: typeof ReportServiceService;
  serviceName: string;
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
  fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}
