#!/usr/bin/env node

import amqp from 'amqplib/callback_api';
import { sendMail } from './MailerService';
import dotenv from 'dotenv';

dotenv.config();

amqp.connect(`amqp://${
    process.env.RABBITMQ_USERNAME
    }:${process.env.RABBITMQ_PASSWORD
    }@${process.env.RABBITMQ_HOST
    }:${process.env.RABBITMQ_PORT
}`, (error0, connection) => {
    if (error0) {
        throw new Error(`Connection error: ${error0.message}`);
    }

    connection.createChannel((error1, channel) => {
        if (error1) {
            throw new Error(`Channel creation error: ${error1.message}`);
        }

        const waterStationApprovalQueue = 'water-station-approval';

        channel.assertQueue(waterStationApprovalQueue, {
            durable: true
        });

        channel.consume(waterStationApprovalQueue, (msg) => {
            if (msg !== null) {
                console.log(` [x] Received message in ${waterStationApprovalQueue}: ${msg.content.toString()}`);
                processEmail(msg);
            }
        }, { noAck: false });

        const processEmail = async (msg: amqp.Message) => {
            try {
                console.log(msg.content.toString());
                const messageContent = JSON.parse(msg.content.toString());

                const from = process.env.MAIL_USERNAME as string;
                const to = messageContent.email;
                const subject = 'Fill Up: Water Station Approval';
                const content = `
                        Hello ${messageContent.name},<br/><br/>
                        We are writing to inform you about the approval status of your water station application.<br/><br/>
                        Your water station ${messageContent.waterStationName} has been ${messageContent.waterStationStatus}.<br/><br/>
                        Best Regards,<br/>
                        Fill Up Team`;

                await sendMail(from, to, subject, content);
                console.log(` [x] Email sent to ${to}`);
                channel.ack(msg);

            } catch (error) {
                console.error('Error processing message or sending email:', error);
                channel.reject(msg, false);
            }
        };
    });
});
