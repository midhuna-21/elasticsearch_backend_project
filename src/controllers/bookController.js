import { books } from "../model/bookModel.js";
import client from '../utils/funtions/elasticsearch.js'

const createBook = async(req,res)=>{
   try{
      const {title,author,description,isbn,publishedYear} = req.body
      console.log(req.file,'req.file')
      if (!req.file) {
         return res
         .status(404)
         .json({ message: "Please provide book image" });
      }
      const image = req.file.filename
      console.log(image,'image') 
      const saveBook = await new books({
         title,
         author,
         description,
         isbn,
         publishedYear,
         image
      }).save()


      console.log(saveBook,'savebook')
      const indexResponse = await client.index({
         index: 'books', 
         body: {
           title: saveBook.title,
           author: saveBook.author,
           description: saveBook.description,
           isbn: saveBook.isbn,
           publishedYear: saveBook.publishedYear,
           image: saveBook.image,
         },
       });
   
       console.log('Book indexed in Elasticsearch:', indexResponse);

       return res.status(201).json({
         message: "Book created successfully",
         data: saveBook,
       });
   }catch(error){
      console.error("Error in while creating book", error);
      return res.status(500).json({ message: "Internal server error" });
   }
}

const fetchBooks=async(req,res)=>{
   try{
      const {page = 1,search=""} = req.query;
      console.log(search,'page')
      const limit = 8
      const from = (page - 1) * limit;
      const response = await client.search({
         index:'books',
         body:{
            from,
            size:limit,
            query: search
            ? {
               bool:{
                  should:[
                     {match:{title:search}},
                     {match:{author:search}},
                     {match:{isbn:search}},
                  ]
               }
            }:{
               match_all:{}
            }
         }
      })
      const books = response.hits.hits
      const totalResults = response.hits.total.value;
      console.log(totalResults,'totlresult')
      const totalPages = Math.ceil(totalResults / limit);
      console.log(totalPages,'totalpages')
      return res.status(200).json({books,totalPages,page})
   }catch(error){
      console.error("Error in while fetching books", error);
      return res.status(500).json({ message: "Internal server error" });
   }
}
 


export {
   createBook,
   fetchBooks
};