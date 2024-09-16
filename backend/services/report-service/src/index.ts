import * as grpc from '@grpc/grpc-js';
import { ReportServiceService } from "./protos/report";
import pool from './db/postgresDB';

const server = new grpc.Server();
function fieldToTimestamp (result:any) {
    if (result.completed_at) {
        result.completedAt = result.completed_at.toISOString();
    }
    if (result.created_at) {
        result.createdAt = result.created_at.toISOString();
    }
    return result;
}

server.addService(ReportServiceService, {
    getReports: async (_:any, callback:any) => {
        try {
            const result = await pool.query('SELECT * FROM reports');
            const newResult = result.rows.map(fieldToTimestamp); 
            callback(null, { reports: newResult });
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                details: (error as Error).message,
            });
        }
    },
    getReport: async (call:any, callback:any) => {
        try {
            const result = await pool.query('SELECT * FROM reports WHERE id = $1', [call.request.id]);
            if (result.rows.length === 0) {
                callback({
                    code: grpc.status.NOT_FOUND,
                    details: 'Report not found',
                });
                return;
            }
            result.rows[0] = fieldToTimestamp(result.rows[0]);
            callback(null, result.rows[0] );
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                details: (error as Error).message,
            });
        }
    },
    createReport: async (call:any, callback:any) => {
        if (call.request.name === '' || call.request.description === '') {
            callback({
                code: grpc.status.INVALID_ARGUMENT,
                details: 'Invalid arguments',
            });
            return;
        }
        try {
            const result = await pool.query('INSERT INTO reports (name, description) VALUES ($1, $2) RETURNING *', [call.request.name, call.request.description]);
            if (result.rows.length === 0) {
                callback({
                    code: grpc.status.INTERNAL,
                    details: 'Failed to create report',
                });
                return;
            }
            callback(null, fieldToTimestamp(result.rows[0]));
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                details: (error as Error).message,
            });
        }
    },
    updateReport: async (call:any, callback:any) => {
        if (!call.request.id || call.request.name === '' || call.request.description === '') {
            callback({
                code: grpc.status.INVALID_ARGUMENT,
                details: 'Invalid arguments',
            });
            return;
        }
        try {
            const result = await pool.query('UPDATE reports SET name = $1, description = $2 WHERE id = $3 RETURNING *', [call.request.name, call.request.description, call.request.id]);
            if (result.rows.length === 0) {
                callback({
                    code: grpc.status.NOT_FOUND,
                    details: 'Report not found',
                });
                return;
            }
            callback(null, fieldToTimestamp(result.rows[0]));
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                details: (error as Error).message,
            });
        }
    },
    deleteReport: async (call:any, callback:any) => {
        if (!call.request.id) {
            callback({
                code: grpc.status.INVALID_ARGUMENT,
                details: 'Invalid arguments',
            });
            return;
        }
        try {
            const result = await pool.query('DELETE FROM reports WHERE id = $1 RETURNING *', [call.request.id]);
            if (result.rows.length === 0) {
                callback({
                    code: grpc.status.NOT_FOUND,
                    details: 'Report not found',
                });
                return;
            }
            callback(null, {});
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                details: (error as Error).message,
            });
        }
    },
    markReport: async (call:any, callback:any) => {
        if (!call.request.id || call.request.completed === undefined) {
            callback({
                code: grpc.status.INVALID_ARGUMENT,
                details: 'Invalid arguments',
            });
            return;
        }
        try {
            let result;
            if (call.request.completed == false) {
                result = await pool.query("UPDATE reports SET completed = false, completed_at = NOW() WHERE id = $1 RETURNING *", [call.request.id]);
            } else {
                result = await pool.query('UPDATE reports SET completed = true, completed_at = NOW() WHERE id = $1 RETURNING *', [call.request.id]);
            }
            if (result.rows.length === 0) {
                callback({
                    code: grpc.status.NOT_FOUND,
                    details: 'Report not found',
                });
                return;
            }
            callback(null, fieldToTimestamp(result.rows[0]));
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                details: (error as Error).message,
            });
        }
    },
});

server.bindAsync("127.0.0.1:50051", grpc.ServerCredentials.createInsecure(), () => {
    console.log('Server started at http://127.0.0.1:50051');
});