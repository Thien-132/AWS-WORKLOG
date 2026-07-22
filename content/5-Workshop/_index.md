---
title: "Workshop"
date: 2026-01-01
weight: 5
chapter: false
pre: " <b> 5. </b> "
---

# AWS CDK WORKSHOP: Building an Event-Driven Serverless System

Welcome to the comprehensive AWS hands-on lab! In this workshop project, I will guide you step-by-step through designing and deploying a robust, highly scalable **Event-Driven Serverless Architecture**. Utilizing the **AWS Cloud Development Kit (CDK)** with TypeScript, we will define our cloud infrastructure as code (IaC), ensuring our system is both flexible and highly secure.

Below is the detailed workshop roadmap. Each section has been structured and analyzed to help you master the core concepts of modern Serverless development:

### Workshop Roadmap

#### [1. Workshop Overview](5.1-Overview/)
Provides the big picture of our event-driven architecture and explains why AWS CDK surpasses traditional infrastructure management methods. It introduces the interconnected AWS services we will utilize, including Lambda, API Gateway, DynamoDB, SQS, and EventBridge.

#### [2. Prerequisites & Setup](5.2-Prerequisites/)
Step-by-step instructions on setting up your local development environment, including Node.js, the AWS CLI, and bootstrapping AWS CDK. This foundational step ensures all necessary tools and IAM permissions are correctly configured.

#### [3. Module 1: Storage & Database](5.3-Module1-Storage/)
Focuses on establishing the data storage layer using Amazon DynamoDB. We implement a Single-Table Design pattern to maximize query performance and cost-efficiency, laying a solid foundation for backend processing.

#### [4. Module 2: Compute & API Gateway](5.4-Module2-Compute/)
Dives into the serverless compute logic with AWS Lambda and sets up the communication entry point via Amazon API Gateway. You will learn how to seamlessly route RESTful HTTP requests to your Lambda functions for real-time processing.

#### [5. Module 3: Security & Permissions](5.5-Module3-Security/)
Analyzes and implements essential security layers. This module integrates Amazon Cognito for secure user authentication and configures granular IAM roles adhering strictly to the Principle of Least Privilege.

#### [6. Module 4: Serverless Backend & Event-Driven Patterns](5.6-Module4-Serverless/)
The heart of the application. We write asynchronous processing logic using AWS SDK v3, routing custom events with Amazon EventBridge, and decoupling workloads via Amazon SQS. It also covers critical architectural patterns like Idempotency and Dead-Letter Queue (DLQ) error handling.

#### [7. Deployment & Testing](5.7-Deployment-Testing/)
Brings your infrastructure code to life by deploying it to the AWS cloud using automated CDK commands. We then conduct end-to-end testing of the API endpoints using cURL to verify that the system behaves precisely as designed.

#### [8. Cleanup & Advanced Topics](5.8-Cleanup-Advanced/)
Guides you through safely tearing down your cloud resources to prevent unexpected billing charges. Furthermore, it introduces advanced practices, such as writing infrastructure unit tests using the Jest testing framework for long-term stability.

#### [9. Live Demo & Video Demonstration (Demo)](5.9-Demo/)
Directly experience the live production web application at [https://soniccart.dev/](https://soniccart.dev/) and watch the recorded video walkthrough on Google Drive.

