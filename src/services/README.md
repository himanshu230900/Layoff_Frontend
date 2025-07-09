# Services

This folder contains service files for API calls, external integrations, and business logic.

## Structure
- API service files for different endpoints
- External service integrations (payment, analytics, etc.)
- Business logic that doesn't belong in components
- Use camelCase for service names

## Example
```
services/
├── api/
│   ├── authService.ts
│   ├── userService.ts
│   └── apiClient.ts
├── external/
│   ├── paymentService.ts
│   └── analyticsService.ts
└── utils/
    └── dataTransform.ts
``` 