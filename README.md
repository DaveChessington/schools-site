# Schools Site

The Study hall, schools subjects, and students administration site. This application features a front-end client integrated with a fully serverless backend architecture hosted on Amazon Web Services (AWS).

## Live Demo

The production environment is accessible here:
[Schools Site Live App]([https://schools-site.s3.us-east-1.amazonaws.com/school_site/index.html])

---

## Architecture Overview

This project leverages a highly scalable, serverless infrastructure to manage school data efficiently:

*   **Static Web Hosting**: Frontend resources are hosted via an Amazon S3 Bucket configured for static website deployment.
*   **API Management**: Amazon API Gateway handles HTTP routing and secure communication between the frontend client and backend logic.
*   **Compute Engine**: AWS Lambda functions process administrative logic for schools, subjects, and students.
*   **Storage Services**: Container storage handles decoupled data components alongside traditional cloud assets.
*   **Security & Permissions**: Granular AWS IAM Policies enforce the principle of least privilege across all integrated cloud resources.

---

## Repository Directory Structure

```text
├── js/                  # JavaScript client-side application logic and API integrations
├── index.html           # Main landing page / Study hall portal
├── schools.html         # School management page
├── students.html        # Student directory and registry management page
├── subjects.html        # Academic subjects curriculum management page
├── tech.mp4             # Technological overview asset / background media file
└── README.md            # Project documentation (this file)
```

---

## Tech Stack

*   **Frontend**: HTML5, JavaScript, CSS3, Bootstrap CDN
*   **Cloud Infrastructure**: AWS Lambda, Amazon API Gateway, Amazon S3, AWS IAM

---

