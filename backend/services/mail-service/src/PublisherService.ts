#!/usr/bin/env node

import amqp, { Connection, Channel } from "amqplib/callback_api";

export const sendMessageToQueue = (queueName: string, message: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (!queueName || !message) {
            return reject(new Error('Queue name and message are required.'));
        }

        amqp.connect(`amqp://${
            process.env.RABBITMQ_USERNAME
            }:${process.env.RABBITMQ_PASSWORD
            }@${process.env.RABBITMQ_HOST
            }:${process.env.RABBITMQ_PORT
        }`, (error0: any, connection: Connection) => {
            if (error0) {
                return reject(error0);
            }

            connection.createChannel((error1: any, channel: Channel) => {
                if (error1) {
                    connection.close();
                    return reject(error1);
                }

                channel.assertQueue(queueName, {
                    durable: true
                });

                channel.sendToQueue(queueName, Buffer.from(message), {
                    persistent: true
                });

                console.log(` [x] Sent message to queue: ${queueName} -> ${message}`);

                setTimeout(() => {
                    connection.close();
                    resolve();
                }, 500);
            });
        });
    });
};