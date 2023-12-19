const graphql = require('graphql');
const _ = require('lodash')
const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList} =  graphql;

//dummy data
var books = [
    {name:'Name of the Wind',genre: 'Fantasy', id:'1',authorid:'1'},
    {name:'The Final empire',genre: 'Fantasy', id:'2',authorid:'2'},
    {name:'The long Earth',genre: 'Sci-Fi', id:'3',authorid:'3'},
    {name:'The Hero of ages',genre: 'Fantasy', id:'4',authorid:'2'},
    {name:'The Color of Magic',genre: 'Fantasy', id:'5',authorid:'3'},
    {name:'The Light Fantastic',genre: 'Sci-Fi', id:'6', authorid:'3'}
]

var authors = [
    {name:'Patrick',age:44,id:'1'},
    {name:'Brandon',age:23,id:'2'},
    {name:'nandu',age:24,id:'3'}

]

const BookType = new GraphQLObjectType({
    name:'Book',
    fields: () =>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){
                console.log (_.filter(authors,{'id':parent.authorid}));
                // return _.filter(authors,{'id':parent.authorid});
                return _.find(authors,{'id':parent.authorid});

            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields:()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return _.filter(books,{authorid:parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args:{id:{type: GraphQLID}},
            resolve(parent, args){
                // gets data from db
                return _.find(books,{id:args.id});

            }
        },
        author: {
            type: AuthorType,
            args: {id:{type:GraphQLID}},
            resolve(parent,args){
                return _.find(authors,{id:args.id})
            }
        },
        books : {
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return books;
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                return authors;
            }
        }
    }
})

module.exports =  new graphql.GraphQLSchema({
    query: RootQuery
})