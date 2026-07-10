---
title: "Proposal"
date: 2024-01-01
weight: 2
chapter: false
pre: " <b> 2. </b> "
---

# SYSTEM ARCHITECTURE PROPOSAL
## PROJECT: AI-INTEGRATED E-COMMERCE PLATFORM ON AWS SERVERLESS

---

### 1. INTRODUCTION & PROBLEM STATEMENT

#### 1.1. Cloud-Native and Event-Driven Evolution
Currently, the e-commerce sector is actively shifting from traditional monolithic structures to modern Cloud-native and Event-Driven paradigms. This transition provides the necessary elasticity to manage massive traffic spikes during promotional events, significantly reducing downtime. By totally decoupling the Frontend from the Backend, the architecture facilitates asynchronous processing, maximizing fault tolerance and scalability.

#### 1.2. Challenges with Traditional Systems
- **Connection Bottlenecks:** A sudden influx of users can exhaust connections at both the web server and database layers, resulting in service unavailability.
- **Resource Inefficiency:** Paying for high-capacity servers to stay idle during off-peak hours generates substantial operational waste.
- **Duplicate Payment Vulnerabilities:** A lack of robust idempotency controls can cause customers to be charged multiple times if the network lags.
- **Security Risks:** Monolithic servers without edge defense layers are highly susceptible to DDoS and data leakage attacks.
- **Tight Coupling Issues:** If a secondary service (like email notifications) fails, it stalls the entire checkout process, negatively affecting user experience.

---

### 2. PROJECT GOALS

This project seeks to engineer a modern, AI-integrated E-Commerce ecosystem that directly resolves the aforementioned challenges:
- **Autoscaling:** Automatically adjust computational resources in real-time corresponding to live traffic.
- **Pay-as-you-go Efficiency:** Eliminate fixed infrastructure costs by only paying for the exact compute power used.
- **Core Workflow Stability:**
  - Lightning-fast delivery of product imagery using S3 and a CDN.
  - Highly secure user identity management and authorization via Amazon Cognito.
  - Decoupled and asynchronous order fulfillment driven by message queues.
  - Bulletproof payment integration via Stripe, leveraging idempotent requests.
  - Interactive shopping experiences empowered by an AI Chatbot (Amazon Lex) and seamless notifications.

---

### 3. PROPOSED ARCHITECTURE

#### 3.1. Why AWS Serverless?
- **Isolating Failures:** Every Lambda function serves a distinct purpose. An error in the notification function won't bring down the checkout flow.
- **Superior Developer Experience:** Developers focus entirely on business code rather than infrastructure provisioning. Managing infrastructure becomes highly efficient via AWS CDK.
- **Built-in Reliability:** Core services like API Gateway and DynamoDB inherently feature Multi-AZ redundancy and High Availability.

#### 3.2. Architecture Diagram
![AWS Serverless Architecture](/images/2-Proposal/architecture.png)
> **Note:** AWS WAF is positioned at the edge to secure API Gateway and CloudFront instances.

#### 3.3. Key Data Flows
1. **Frontend Access:** Users hit the Route 53 domain -> WAF validates requests -> AWS Amplify serves the application via CDN.
2. **Identity Verification:** Cognito authenticates users and issues JWTs. API Gateway blocks unauthorized access using the Cognito Authorizer.
3. **Product Retrieval:** The client invokes APIs via API Gateway -> Lambda fetches metadata from DynamoDB and generates secure S3 URLs for images.
4. **Asynchronous Order Creation:** A Lambda function queues the order into an SQS Queue. Consumer functions process the order, routing unresolvable errors to a Dead-Letter Queue (DLQ).
5. **Secure Payments:** A Checkout Lambda fetches a Stripe Payment Intent with an Idempotency-Key. The backend listens for signed Stripe Webhooks and fires an event to EventBridge.
6. **Event-Driven Workflows:** EventBridge picks up successful payment events to update database states and dispatches messages to the SQS Notification Queue to trigger emails.
7. **AI Chatbot Interface:** API Gateway routes chat messages to a Lambda function integrating with Amazon Lex, providing users with intelligent responses.

#### 3.4. Security Measures
- **Cognito Authorizer:** Rejects malicious or unauthenticated API traffic.
- **Encryption:** AES encryption (KMS) secures data at rest across DynamoDB and S3.
- **Hardened Permissions:** AWS Secrets Manager protects all sensitive API keys; IAM enforces the Principle of Least Privilege across all compute layers.

---

### 4. TEAM ROLES AND RESPONSIBILITIES

| Member | Role | Main Duties | Deliverables |
|---|---|---|---|
| **Member 1** | Frontend & Identity | Build Next.js interfaces, integrate Cognito Auth, design Checkout/Cart and Chatbot UI. | UI Source Code, completed Auth flow, Amplify deployment. |
| **Member 2** | API & Compute | Provision API Gateway, develop Product and Order Lambdas, and validate input schemas. | Lambda codes, API specifications, and Unit Tests. |
| **Member 3** | Data & Messaging | Model DynamoDB Single-Table schema, manage S3, configure SQS, DLQ, EventBridge, and Backups. | DB Schema, IaC scripts for Queues and Events. |
| **Member 4** | Payment & AI | Implement Stripe Sandbox/Webhook logic, train Amazon Lex chatbot, write Notification Lambdas. | Payment/Webhook logic, trained Lex bot, Notification code. |
| **Member 5** | DevSecOps & PM | Manage AWS CDK (IaC), IAM, WAF, GitHub Actions (CI/CD), CloudWatch, and lead the project. | IaC Repository, CI/CD Pipeline, CloudWatch metrics. |

---

### 5. COST ESTIMATION

Estimated lab-scale expenses for a 1-month period:
- **Amplify, Cognito, API Gateway, Lambda, SQS, EventBridge:** Generous Free Tiers keep costs virtually near $0.
- **DynamoDB, S3:** Minimal costs (under $1.00/month) for light data footprints.
- **Secrets Manager, WAF, Backup:** Modest fixed costs ranging from $1.50 to $2.50.
- **TOTAL ESTIMATE:** Roughly **$3.00 - $5.00 USD / month**, showcasing the extreme cost-efficiency of Serverless architectures.

---

### 6. RISK MITIGATION

| Risk Factor | Potential Impact | Mitigation Strategy |
|---|---|---|
| **Database Overload** | Dropped connections | Utilize Amazon DynamoDB (On-demand) to auto-scale without connection limits. |
| **Duplicate Payments & Webhook Fails** | Customer dissatisfaction | Employ Stripe Idempotency-Keys and verify Webhook signatures. Route persistent fails to DLQ. |
| **Exposed Credentials** | Security compromise | Strictly utilize AWS Secrets Manager and never commit `.env` files. Implement key rotation. |
| **Scope Creep / Delays** | Missed deadlines | Define a strict Minimum Viable Product (MVP). Hold daily 10-minute sync meetings. |

---

### 7. ACCEPTANCE CRITERIA

1. **Edge & Domain Configuration:**
<ul style="list-style-type: none;">
  <li><label><input type="checkbox"> The Route 53 domain is active with valid HTTPS encryption.</label></li>
  <li><label><input type="checkbox"> AWS WAF successfully mitigates traffic spikes and malicious patterns.</label></li>
  <li><label><input type="checkbox"> Frontend application automatically deploys via AWS Amplify.</label></li>
</ul>

2. **Identity & Authorization:**
<ul style="list-style-type: none;">
  <li><label><input type="checkbox"> Cognito seamlessly handles user sign-ups and sign-ins.</label></li>
  <li><label><input type="checkbox"> APIs correctly enforce 401 Unauthorized errors for missing or invalid JWTs.</label></li>
</ul>

3. **Catalog & Order Processing:**
<ul style="list-style-type: none;">
  <li><label><input type="checkbox"> Product catalog loads successfully from DynamoDB and S3.</label></li>
  <li><label><input type="checkbox"> Order creations are safely routed into SQS asynchronously.</label></li>
  <li><label><input type="checkbox"> Failed order processing tasks automatically route to the Dead-Letter Queue.</label></li>
</ul>

4. **Payments & Event Processing:**
<ul style="list-style-type: none;">
  <li><label><input type="checkbox"> Stripe Sandbox payments succeed utilizing idempotent requests.</label></li>
  <li><label><input type="checkbox"> Webhooks are securely validated and processed by the backend.</label></li>
  <li><label><input type="checkbox"> EventBridge reliably triggers email dispatch through the Notification Queue.</label></li>
</ul>

5. **AI Chatbot Functionality:**
<ul style="list-style-type: none;">
  <li><label><input type="checkbox"> Users can converse with the Amazon Lex bot natively on the web application.</label></li>
  <li><label><input type="checkbox"> The chatbot successfully extracts intents and answers product or order queries.</label></li>
</ul>

6. **System Observability:**
<ul style="list-style-type: none;">
  <li><label><input type="checkbox"> CloudWatch dashboards reflect real-time operational metrics.</label></li>
  <li><label><input type="checkbox"> AWS X-Ray generates end-to-end trace maps for critical request flows.</label></li>
  <li><label><input type="checkbox"> GuardDuty is active, and AWS Backup verifies database restorability.</label></li>
</ul>

7. **Source Control & CI/CD:**
<ul style="list-style-type: none;">
  <li><label><input type="checkbox"> Infrastructure is entirely provisioned programmatically via AWS CDK.</label></li>
  <li><label><input type="checkbox"> GitHub Actions executes linting, building, and deployment autonomously.</label></li>
</ul>