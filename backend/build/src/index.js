"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const typeDefs = (0, apollo_server_1.gql) `
  type Note {
    id: Int!
    title: String!
    content: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    notes: [Note!]!
    note(id: Int!): Note
    searchNotes(searchString: String!): [Note!]!
  }

  type Mutation {
    addNote(title: String!, content: String!): Note!
    updateNote(id: Int!, title: String, content: String): Note!
    deleteNote(id: Int!): Note!
  }
`;
const resolvers = {
    Query: {
        /*
        query {
          notes {
            id
            title
            content
          }
        }
        */
        notes: () => __awaiter(void 0, void 0, void 0, function* () {
            return prisma.note.findMany();
        }),
        /*
        query {
          note(id:2) {
            id
            title
            content
          }
        }
        */
        note: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            return prisma.note.findUnique({
                where: { id: args.id },
            });
        }),
        /*
        query {
          searchNotes(searchString: "your search string") {
            id
            title
            content
          }
        }
        */
        searchNotes: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            return prisma.note.findMany({
                where: {
                    OR: [
                        { title: { contains: args.searchString, mode: 'insensitive' } },
                        { content: { contains: args.searchString, mode: 'insensitive' } },
                    ],
                },
            });
        }),
    },
    Mutation: {
        addNote: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            return prisma.note.create({
                data: {
                    title: args.title,
                    content: args.content,
                },
            });
        }),
        /*
        mutation {
          updateNote(id: 1, data: { title: "New Title", content: "New Content" }) {
            id
            title
            content
          }
        }
        */
        updateNote: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            return prisma.note.update({
                where: { id: args.id },
                data: {
                    title: args.title,
                    content: args.content,
                },
            });
        }),
        /*
        mutation {
          deleteNote(id: 1) {
            id
          }
        }
        */
        deleteNote: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            return prisma.note.delete({
                where: { id: args.id },
            });
        }),
    },
};
const server = new apollo_server_1.ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log(`Server at ${url}`);
});
