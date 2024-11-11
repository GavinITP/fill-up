import { ReportServiceClient } from "../protos/report"
import * as grpc from '@grpc/grpc-js';

const client = new ReportServiceClient(`${process.env.REPORT_SERVICE_URL}`, grpc.credentials.createInsecure());
console.log(`Report Service URL: ${process.env.REPORT_SERVICE_URL}`);

function fieldToTimestamp (result:any) {
    if (result.completed_at) {
        result.completedAt = result.completed_at.toISOString();
    }
    if (result.created_at) {
        result.createdAt = result.created_at.toISOString();
    }
    return result;
}

exports.getReports = (req:any, res:any) => {
    client.getReports({}, (error, response) => {
        if (!error) {
            res.json(response);
        } else {
            res.json({ error: error.details });
        }
    });
}

exports.getReport = (req:any, res:any) => {
    client.getReport({ id: req.params.id }, (error, response) => {
        if (!error) {
            res.json(response);
        } else {
            res.json({ error: error.details });
        }
    });
}

exports.createReport = (req:any, res:any) => {
    client.createReport(fieldToTimestamp(req.body), (error, response) => {
        if (!error) {
            res.json(response);
        } else {
            res.json({ error: error.details });
        }
    });
}

exports.updateReport = (req:any, res:any) => {
    client.updateReport({ id: req.params.id, ...fieldToTimestamp(req.body) }, (error, response) => {
        if (!error) {
            res.json(response);
        } else {
            res.json({ error: error.details });
        }
    });
}

exports.deleteReport = (req:any, res:any) => {
    client.deleteReport({ id: req.params.id }, (error, response) => {
        if (!error) {
            res.json(response);
        } else {
            res.json({ error: error.details });
        }
    });
}

exports.markReport = (req:any, res:any) => {
    client.markReport({ id: req.params.id, completed: req.body.completed }, (error, response) => {
        if (!error) {
            res.json(response);
        } else {
            res.json({ error: error.details });
        }
    });
}

exports.updateAdminNote = (req:any, res:any) => {
    client.updateAdminNote({ id: req.params.id, adminNote: req.body.adminNote }, (error, response) => {
        if (!error) {
            res.json(response);
        } else {
            res.json({ error: error.details });
        }
    });
}