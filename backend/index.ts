import { ApolloServer, gql } from 'apollo-server';
import { PrismaClient, Note } from '@prisma/client';

const prisma = new PrismaClient();

const typeDefs = gql`
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
interface NoteArgs {
  id: number;
}

interface AddNoteArgs {
  title: string;
  content: string;
}

interface UpdateNoteArgs extends NoteArgs {
  title?: string;
  content?: string;
}

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
    notes: async (): Promise<Note[]> => {
      return prisma.note.findMany();
    },
    /*
    query {
      note(id:2) {
        id
        title
        content
      }
    }
    */
    note: async (_parent: unknown, args: NoteArgs): Promise<Note | null> => {
      return prisma.note.findUnique({
        where: { id: args.id },
      });
    },
    /*
    query {
      searchNotes(searchString: "your search string") {
        id
        title
        content
      }
    }
    */
    searchNotes: async (_parent: unknown, args: { searchString: string }): Promise<Note[]> => {
      return prisma.note.findMany({
        where: {
          OR: [
            { title: { contains: args.searchString, mode: 'insensitive' } },
            { content: { contains: args.searchString, mode: 'insensitive' } },
          ],
        },
      });
    },
  },
  Mutation: {
    addNote: async (_parent: unknown, args: AddNoteArgs): Promise<Note> => {
      return prisma.note.create({
        data: {
          title: args.title,
          content: args.content,
        },
      });
    },
    /*
    mutation {
      updateNote(id: 1, data: { title: "New Title", content: "New Content" }) {
        id
        title
        content
      }
    }
    */
    updateNote: async (_parent: unknown, args: UpdateNoteArgs): Promise<Note> => {
      return prisma.note.update({
        where: { id: args.id },
        data: {
          title: args.title,
          content: args.content,
        },
      });
    },
    /*
    mutation {
      deleteNote(id: 1) {
        id
      }
    }
    */
    deleteNote: async (_parent: unknown, args: NoteArgs): Promise<Note> => {
      return prisma.note.delete({
        where: { id: args.id },
      });
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server at ${url}`);
});
