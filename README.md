# Nest.js Blog API

## Description

A simple blog API built using the Nest.js framework. Hosted live at [Blog API](https://blog-api-v2-1zj3.onrender.com).

This API provides a range of features for managing a blog, including user authentication, post creation and management, categories and tags, comments and feedback, and more. Additionally, the API utilizes caching and compression for improved performance.

## Installation

To get started, install the necessary dependencies using npm:

```bash
$ npm install
```

## Running the App

You can run the application in different modes:

- **Development Mode**:

```bash
$ npm run start
```

- **Watch Mode (for development)**:

```bash
$ npm run start:dev
```

- **Production Mode**:

```bash
$ npm run start:prod
```

## Testing

You can run different types of tests:

- **Unit Tests**:

```bash
$ npm run test
```

- **End-to-End Tests**:

```bash
$ npm run test:e2e
```

- **Test Coverage**:

```bash
$ npm run test:cov
```

## Features

This Blog API built with Nest.js includes the following features:

- **User Authentication**: Implement user authentication and authorization for secure blog management.

- **Create and Manage Posts**: Easily create, edit, and delete blog posts.

- **Categories and Tags**: Organize blog posts with categories and tags for easy navigation.

- **Comments and Feedback**: Allow users to leave comments and feedback on blog posts.

- **Search and Filtering**: Implement search and filtering options for users to find specific content.

- **Multi-User Support**: Manage multiple users with roles and permissions.

## Caching and Compression

This API takes advantage of caching and compression for improved performance:

- **Caching**: Frequently accessed data is cached in memory to reduce response times and minimize database queries. This results in faster response times for common requests.

- **Compression**: Responses from the API are automatically compressed using the `compression` middleware, reducing the data size and improving data transmission speed.

## Environment Variables

Before running the API, ensure you have set up the following environment variables. You can start by creating a `.env` file based on the provided `env.sample` file. 

1. Duplicate the `env.sample` file and rename it to `.env`.

2. Open the `.env` file and replace the placeholders with your actual secret keys

## Documentation

For detailed documentation on how to use the Blog API and its endpoints, refer to the [API Documentation](https://blog-api-v2-1zj3.onrender.com/docs).

## Contributing

Contributions to the Nest.js Blog API are welcome! If you'd like to contribute:

1. Fork the project on GitHub.

2. Create a new branch for your changes.

3. Make your improvements or additions.

4. Thoroughly test your changes.

5. Create a pull request with a clear description of your changes.
