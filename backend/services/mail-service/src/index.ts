#!/usr/bin/env node

import amqp, { Connection, Channel, Message } from 'amqplib/callback_api';

const queue: string = process.argv.slice(2)[0];

if (!queue) {
    console.error('Queue name must be provided as an argument');
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

        channel.prefetch(1);

        console.log(` [*] Waiting for messages in ${queue}. To exit press CTRL+C`);

        channel.consume(queue, function (msg: Message | null) {
            if (msg !== null) {
                const secs: number = 10;
                const messageContent: string = msg.content.toString();

                console.log(` [x] Received ${messageContent}`);

                setTimeout(() => {
                    console.log(' [x] Done');
                    channel.ack(msg);
                }, secs * 1000);
            }
        }, {
            noAck: false
        });
    });
});