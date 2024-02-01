# Notes App

![chrome_HXUayeTEKe](https://github.com/nuuxcode/graphql-project/assets/24565896/41ff1486-a3f4-411e-8a16-100cb68e39a6)

## Demo and API URLs
- Demo URL: [https://main.dapvd5xktde9j.amplifyapp.com/](https://main.dapvd5xktde9j.amplifyapp.com/) (Hosted on AWS Amplify)
- Main GraphQL API:  [http://nuuxcode-graphql-project.eu-north-1.elasticbeanstalk.com/](http://nuuxcode-graphql-project.eu-north-1.elasticbeanstalk.com/) (Hosted on AWS Elastic Beanstalk)
- Backup GraphQL API: [http://142.93.105.168/graphql](http://142.93.105.168/graphql) (Hosted on Digital Ocean)
- PostgreSQL on AWS RDS
- Test Main Api : [ Api from AWS Elastic Beanstalk ](https://studio.apollographql.com/sandbox?endpoint=https%3A%2F%2Fbikehub.me%2Fgraphql2)
- Test Backup Api : [Api from Digital Ocean ](https://studio.apollographql.com/sandbox?endpoint=https%3A%2F%2Fbikehub.me%2Fgraphql)

![chrome_PrPUlKK30N](https://github.com/nuuxcode/graphql-project/assets/24565896/b215eedc-8821-4014-a742-3def26fa3b2e)

# Tech Stack

This project is built using the following technologies:

- [Prisma](https://www.prisma.io/): Next-generation Node.js and TypeScript ORM. Prisma helps you build efficient, reliable and scalable applications.
- [GraphQL](https://graphql.org/): A query language for APIs and a runtime for executing those queries with your existing data.
- [ReactJS](https://reactjs.org/): A JavaScript library for building user interfaces.
- [PostgreSQL](https://www.postgresql.org/): A powerful, open source object-relational database system.

These technologies provide a robust and scalable platform for our GraphQL Notes API.

![image](https://github.com/nuuxcode/graphql-project/assets/24565896/6d10643b-03ce-4f0b-a922-a0b594ac0fa3)

# AWS Services

This project is hosted and managed using the following AWS services:

- [AWS Amplify](https://aws.amazon.com/amplify/): Used for hosting the demo of the application. AWS Amplify makes it easy to create, configure, and implement scalable mobile and web apps powered by AWS.
- [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/): Used for deploying and managing the GraphQL API. AWS Elastic Beanstalk is an easy-to-use service for deploying and scaling web applications and services.
- [AWS RDS](https://aws.amazon.com/rds/): Used for hosting the PostgreSQL database. Amazon RDS makes it easy to set up, operate, and scale a relational database in the cloud.

These AWS services provide a robust and scalable platform for our GraphQL Notes API.

# GraphQL Notes API

This API allows you to perform CRUD operations on notes using GraphQL. Below are some example queries and mutations you can use.

## Queries

### Show All Notes

To fetch all notes, use the following query:

```graphql
query {
  notes {
    id
    title
    content
  }
}
```

### Show Note by ID

To fetch a note by its ID, use the following query (replace 2 with your desired ID):

```graphql
query {
  note(id:2) {
    id
    title
    content
  }
}
```

### Search Notes by String

To search notes by a string, use the following query (replace "your search string" with your desired search string):

```graphql
query {
  searchNotes(searchString: "your search string") {
    id
    title
    content
  }
}
```

## Mutations

### Update Note

To update a note, use the following mutation (replace 1 with your desired ID and "New Title" and "New Content" with your desired title and content):

```graphql
mutation {
  updateNote(id: 1, data: { title: "New Title", content: "New Content" }) {
    id
    title
    content
  }
}
```

### Delete Note

To delete a note, use the following mutation (replace 1 with your desired ID):

```graphql
mutation {
  deleteNote(id: 1) {
    id
  }
}
```
