import { EC2Client } from '@aws-sdk/client-ec2';
import { IAMClient } from '@aws-sdk/client-iam';
import { CloudWatchClient } from '@aws-sdk/client-cloudwatch';
import { SESClient } from '@aws-sdk/client-ses';
import { SNSClient } from '@aws-sdk/client-sns';

// AWS Region
const REGION = process.env.AWS_REGION || 'us-east-1';

// AWS Credentials - These should be set in environment variables
const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
};

// Initialize AWS Clients
export const ec2Client = new EC2Client({ region: REGION, credentials });
export const iamClient = new IAMClient({ region: REGION, credentials });
export const cloudWatchClient = new CloudWatchClient({ region: REGION, credentials });
export const sesClient = new SESClient({ region: REGION, credentials });
export const snsClient = new SNSClient({ region: REGION, credentials });

// EC2 Configuration
export const EC2_CONFIG = {
  instanceType: 't2.micro', // or whatever instance type you prefer
  imageId: 'ami-0c55b159cbfafe1f0', // Amazon Linux 2 AMI ID (update as needed)
  keyName: 'your-key-pair-name', // You'll need to create this in AWS Console
};

// CloudWatch Configuration
export const CLOUDWATCH_CONFIG = {
  logGroupName: '/corporate-portal/logs',
  metricNamespace: 'CorporatePortal',
};

// SES Configuration
export const SES_CONFIG = {
  fromEmail: 'your-verified-email@domain.com', // Need to verify this email in SES
};

// SNS Configuration
export const SNS_CONFIG = {
  topicArn: '', // You'll need to create an SNS topic and put its ARN here
}; 