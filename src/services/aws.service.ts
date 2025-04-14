import {
  ec2Client,
  iamClient,
  cloudWatchClient,
  sesClient,
  snsClient,
  EC2_CONFIG,
  CLOUDWATCH_CONFIG,
  SES_CONFIG,
  SNS_CONFIG,
} from '../config/aws/config';

import {
  DescribeInstancesCommand,
  StartInstancesCommand,
  StopInstancesCommand,
} from '@aws-sdk/client-ec2';

import {
  PutMetricDataCommand,
  GetMetricDataCommand,
} from '@aws-sdk/client-cloudwatch';

import {
  SendEmailCommand,
} from '@aws-sdk/client-ses';

import {
  PublishCommand,
} from '@aws-sdk/client-sns';

export class AWSService {
  // EC2 Operations
  static async describeInstances() {
    try {
      const command = new DescribeInstancesCommand({});
      return await ec2Client.send(command);
    } catch (error) {
      console.error('Error describing EC2 instances:', error);
      throw error;
    }
  }

  static async startInstance(instanceId: string) {
    try {
      const command = new StartInstancesCommand({
        InstanceIds: [instanceId],
      });
      return await ec2Client.send(command);
    } catch (error) {
      console.error('Error starting EC2 instance:', error);
      throw error;
    }
  }

  static async stopInstance(instanceId: string) {
    try {
      const command = new StopInstancesCommand({
        InstanceIds: [instanceId],
      });
      return await ec2Client.send(command);
    } catch (error) {
      console.error('Error stopping EC2 instance:', error);
      throw error;
    }
  }

  // CloudWatch Operations
  static async logMetric(metricName: string, value: number) {
    try {
      const command = new PutMetricDataCommand({
        Namespace: CLOUDWATCH_CONFIG.metricNamespace,
        MetricData: [
          {
            MetricName: metricName,
            Value: value,
            Timestamp: new Date(),
            Unit: 'Count',
          },
        ],
      });
      return await cloudWatchClient.send(command);
    } catch (error) {
      console.error('Error logging metric:', error);
      throw error;
    }
  }

  // SES Operations
  static async sendEmail(to: string, subject: string, body: string) {
    try {
      const command = new SendEmailCommand({
        Destination: {
          ToAddresses: [to],
        },
        Message: {
          Body: {
            Text: { Data: body },
          },
          Subject: { Data: subject },
        },
        Source: SES_CONFIG.fromEmail,
      });
      return await sesClient.send(command);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  // SNS Operations
  static async publishNotification(message: string) {
    try {
      const command = new PublishCommand({
        TopicArn: SNS_CONFIG.topicArn,
        Message: message,
      });
      return await snsClient.send(command);
    } catch (error) {
      console.error('Error publishing notification:', error);
      throw error;
    }
  }
} 