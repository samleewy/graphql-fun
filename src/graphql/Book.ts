import { asNexusMethod, extendType, intArg, nonNull, objectType, scalarType, stringArg } from "nexus";
import { GraphQLDateTime } from "graphql-scalars";

// scalar
export const GQLDate = asNexusMethod(GraphQLDateTime, 'date');

// objects
export const Book = objectType({
    name: "Book",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("title");
        t.nonNull.string("author");
        t.nonNull.date("createdAt");
    },
});

// queries
export const BookQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.field("books", {
            type: "Book",
            resolve(source, args, context, info) {
                return context.prisma.book.findMany();
            }
        });
    }
});

// mutations
export const BookMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createBook", {
            type: "Book",
            args: {
                title: nonNull(stringArg()),
                author: nonNull(stringArg()),
            },
            resolve(parent, args, context) {
                const newBook = context.prisma.book.create({
                    data: {
                        title: args.title,
                        author: args.author,
                    }
                });
                return newBook;
            },
        });
        t.nonNull.field("deleteBook", {
            type: "Book",
            args: {
                id: nonNull(intArg())
            },
            resolve(parent, args, context) {
                const deleteBook = context.prisma.book.delete({
                    where: {
                        id: args.id,
                    }
                });
                return deleteBook;
            },
        });
    },
});