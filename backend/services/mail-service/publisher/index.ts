#!/usr/bin/env node

import amqp, { Connection, Channel } from "amqplib/callback_api";

const queue: string = process.argv.slice(2)[0];
const msg: string = process.argv.slice(3).join(' ');

if (!queue || !msg) {
    console.error('Usage: <queue_name> <message>');
    process.exit(1);
}

amqp.connect('amqp://localhost', function (error0: any, connection: Connection) {
    if (error0) {
        throw error0;
    }

    connection.createChannel(function (error1: any, channel: Channel) {
        if (error1) {
            throw error1;
        }

        channel.assertQueue(queue, {
            durable: true
        });

        channel.sendToQueue(queue, Buffer.from(msg), {
            persistent: true
        });

        console.log(" [x] Sent '%s'", msg);
    });

    setTimeout(function () {
        connection.close();
        process.exit(0);
    }, 500);
});
