#!/usr/bin/env node

import amqp from 'amqplib/callback_api';
import { sendMail } from './MailerService';
import dotenv from 'dotenv';

dotenv.config();

amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0) {
        throw new Error(`Connection error: ${error0.message}`);
    }

    connection.createChannel((error1, channel) => {
        if (error1) {
            throw new Error(`Channel creation error: ${error1.message}`);
        }

        const verifyAccountQueue = 'verify-account';
        const waterStationApprovalQueue = 'water-station-approval';

        channel.assertQueue(verifyAccountQueue, {
            durable: true
        });

        channel.assertQueue(waterStationApprovalQueue, {
            durable: true
        });

        channel.consume(verifyAccountQueue, (msg) => {
            if (msg !== null) {
                console.log(` [x] Received message in ${verifyAccountQueue}: ${msg.content.toString()}`);
                processEmail(msg, verifyAccountQueue);
            }
        }, { noAck: false });

        channel.consume(waterStationApprovalQueue, (msg) => {
            if (msg !== null) {
                console.log(` [x] Received message in ${waterStationApprovalQueue}: ${msg.content.toString()}`);
                processEmail(msg, waterStationApprovalQueue);
            }
        }, { noAck: false });

        const processEmail = async (msg: amqp.Message, queueName: string) => {
            try {
                console.log(msg.content.toString());
                const messageContent = JSON.parse(msg.content.toString());

                const from = process.env.MAIL_USERNAME as string;
                const to = messageContent.email;
                let subject = '';
                let content = '';

                if (queueName === verifyAccountQueue) {
                    subject = 'Fill Up: Account Verification';
                    content = `
                        Hello ${messageContent.name},<br/><br/>
                        Thank you for joining Fill Up! To activate your account and start exploring, please click the verification link below:<br/>
                        [Link for verification: user id ${messageContent.id}]<br/><br/>
                        Best Regards,<br/>
                        Fill Up Team`;
                } else if (queueName === waterStationApprovalQueue) {
                    subject = 'Fill Up: Water Station Approval';
                    content = `
                        Hello ${messageContent.name},<br/><br/>
                        We are writing to inform you about the approval status of your water station application.<br/><br/>
                        Your water station ${messageContent.waterStationName} has been approved.<br/>
                        You can now start serving water to the community.<br/><br/>
                        Best Regards,<br/>
                        Fill Up Team`;
                }

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
