import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NodemailerService {
    private trasporter : any;

    constructor(){
        this.trasporter= nodemailer.createTransport({
            host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true pour SSL/TLS
      auth: {
        user: 'maxwell.nitzsche@ethereal.email',
        pass: 'zZu3sjyc9DRXq5EnqE',
      },
        });
    }
    async sendMail(to: string, subject: string, text: string, html?: string,): Promise<void> {
        try {
          const info = await this.trasporter.sendMail({
            from: '"nestjs auth " <maddison53@ethereal.email>',
            to,
            subject,
            text,
            html,
          });
          console.log('Message sent: %s', info.messageId);
        } catch (error) {
          console.error('Error sending email:', error);
          throw error;
        }
      }
            


}
