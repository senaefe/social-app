import { User } from '../register/user.model';

export class Post{
    id:any;
    userid: any;
    user: User;
    texts:any;
    image:string;
    video:string;
    numberoflikes: number;
    comments:any=[];
    postDate:Date;
   isLiked:any;
   
    button: any
    currentPost:any;
    // isLiked: boolean;
   
}