import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { User } from '../register/user.model';
import { tap, catchError } from 'rxjs/operators'
import { AlertifyService } from 'src/app/services/alertify.service';
import { Post } from '../home/post.model';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Like } from '../home/like.model';
import { Comment } from '../home/comment.model';
import { ActivatedRoute } from '@angular/router';
// import { Http, Response } from '@angular/common/http';




@Injectable()
export class UserService {
 
  user: any;
  postAddForm: FormGroup;
  post:Post;
  numberoflike: Post;
  postid:Like;
  userid:Like;
  id:Like;
  today: number = Date.now();
  userService: typeof UserService;
  button:"fav-btn{{i}}";
  updateForm: boolean;
  isLiked:any;
  isComment:any;
  allLikes:any;
  comments:Comment;


  constructor(private http: HttpClient,private formBuilder:FormBuilder,
    private alertifyService: AlertifyService,private router:ActivatedRoute) { 
 
       }
  path = "http://localhost:9000/user"
  path2 = "http://localhost:9000/post"
  path3 = "http://localhost:9000/likes"
  path4 = "http://localhost:9000/comments"
  
  public loggedIn = false;
  public userIn = false;
  public sonuc = false;
  location: Location;

  getUsers(): Observable<any> {
    let uerso = new User();
    return this.http.get<User>(this.path).pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
     }
      getUser(id): Observable<any> {
      return this.http.get<User>(this.path+"/"+id).pipe(
          tap(data => 
          catchError(this.handleError)),
        );
       }

 
   getPost(): Observable<Post[]> {
     return this.http.get<Post[]>(this.path2).pipe(
       tap(data => console.log((data)),
       catchError(this.handleError)),
     );
    //  console.log(JSON.stringify(data))),
 }
 getLike():Observable<any> {
   return this.http.get<Like>(this.path3).pipe(
     tap(data =>
       catchError(this.handleError)),
     );
 }
 getComment():Observable<Comment[]>{
   return this.http.get<Comment[]>(this.path4).pipe(
     tap(data =>  
      catchError(this.handleError))
     );
 }
 updateUser(user:User):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type':'application/json' })
    };
    console.log("update user"+ user.firstName)
    this.updateForm=true;
    return this.http.put(`${this.path}/${user.id}`, user, httpOptions).pipe(
     tap(data => console.log(`updated user = ${JSON.stringify(data)}`)),
     catchError(error => of(new User()))
     
    );
   
    
   }
   updateUserForm(user:User): Observable<User> {
    const url = `{$this.userURL}/${user.id}`;
    console.log(url);
    // return this.http.get<User>(this.path+"/"+id).pipe(
      // return this.http.get<User>(this.path+"/"+id).pipe
    return this.http.put<User>(url,user).pipe(
      tap(selectedUser => console.log(`selected user = {$JSON.stringify(selectedUser)}`)),
      catchError(error => of( new User()))
     );
  }
  //  getUser(id): Observable<any> {
  //   return this.http.get<User>(this.path+"/"+id).pipe(
  //       tap(data => console.log(JSON.stringify(data))),
  //       catchError(this.handleError)
  //     );
  //    }
   updateLike(post:Post):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type':'application/json' })
    };
    return this.http.put(`${this.path2}/${post.id}`, post, httpOptions).pipe(
     tap(data => console.log(`updated user = ${JSON.stringify(data.toString)}`)),
     catchError(error => of(new Post()))
    );
    // console.log('jshjshj'+this.user.firstName);
    // this.updateForm=true;
   }
  //  updateWhoLiked(user:User):Observable<any>{
  //   const httpOptions = {
  //     headers: new HttpHeaders({ 'Content-Type':'application/json' })
  //   };
  //   return this.http.put(`${this.path}/${this.user.id}`, this.user, httpOptions).pipe(
  //    tap(data => console.log(`updated user = ${JSON.stringify(data.toString)}`)),
  //    catchError(error => of(new User()))
  //   );
  //   // console.log('jshjshj'+this.user.firstName);
  //   // this.updateForm=true;
  //  }
addUser(user: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token'
      })
    }
    return this.http.post<User>(this.path, user, httpOptions).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
 
  addUserPost(post: Post):Observable<Post> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token'
      })
    }
    return this.http.post<Post>(this.path2,post, httpOptions).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    )
 }
 addUserComment(comment:Comment):Observable<Comment> {
   const httpOptions = {
     headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token'
     })
    }
    return this.http.post<Comment>(this.path4,comment,httpOptions).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    )
 }
 postList():Observable<Post[]>{
  return this.http.get<Post[]>(this.path2);
 }
 commentList():Observable<Comment[]>{
   return this.http.get<Comment[]>(this.path4);
 }

 addUserLikes(like:Like):Observable<Like> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token'
    })
  }
  return this.http.post<Like>(this.path3,like, httpOptions).pipe(
    tap(data => console.log(JSON.stringify(data))),
    catchError(this.handleError)
  )
}
saveLike(postid:Like){
  this.http.get(this.path3).subscribe(data => {
    this.isLiked.postid =data
    for(let i=0; i<this.allLikes.postid.length;i++){
     
    }
  })
   }
   deleteLike(id:any):Observable<void> {
     return this.http.delete<void>(`${this.path3}/${id}`)
     .pipe(catchError(this.handleError));

   }
  //  deleteLike(id:Like) {
  //   this.http.delete(this.path3).subscribe(data => {
  //     this.isLiked =data;
  //       ()=> console.log(`like with Id = ${this.allLikes.postid} deleted`);
  //     }, err => {
  //       console.log('delete sırasında hata olustu');
  //      }
  //   );
  // }
// addWhoLiked(userid):Observable<User>{
//   return this.http.get<User>(this.path+"/"+userid).pipe(
//     tap(data => console.log(JSON.stringify(data))),
//     catchError(this.handleError)
//   );
// }
  // const httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Token'
  //   })
  // }
  
  // return this.http.post<User>(this.path,User, httpOptions).pipe(
  //   tap(data => console.log(JSON.stringify(data))),
  //   catchError(this.handleError)
  // )

Post(): void{
  this.getPost().subscribe(data => {
    for(let i=0;i<this.post.userid;i++)
   //  if(this.post.texts.button.color === "#C0C0C0"){
   //   console.log('user id eşit olan'+data[i].userid)
   //  }
    if((data[i].userid === this.user.id)) {
      console.log('user id eşit olan'+data[i].userid)
    }
  });
}
Comment():void{
 this.getComment().subscribe(data => {
   for(let i=0;i<this.comments.userid;i++)
   if((data[i].userid == this.user.id)) {
     console.log('user id eşit olan ' + data[i].userid)
   }
 });
 }
 Like():void{
this.getLike().subscribe(data => {
  for(let i=0;i<this.allLikes.userid;i++)
  if((data[i].userid == this.user.id)) {
    console.log('user id eşit olan ' + data[i].userid)
  }
})
 }
// saveLike(currentPost:Post){
//    const httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': 'Token'
//     })
//   }
//   return this.http.post<Post>(this.path3,Post, httpOptions).pipe(
//     tap(data => console.log(JSON.stringify(data))),
//     catchError(this.handleError)
//   )
//    }
  
//    deleteLike(id:any): Observable<any> {
//       return this.http.delete<any>(`${this.path3}/${id}`).pipe(
//     catchError(this.handleError))
//  }

 isLoggedIn() {
    if(localStorage.getItem('login')!=null)
       return (localStorage.getItem('login')=='true');
       this.user=JSON.parse(localStorage.getItem("isLogged"));
       this.post=JSON.parse(localStorage.getItem("isLogged"));
       this.loggedIn = true;
       console.log(this.user);
       console.log(this.post);
 return false;
  }
  useruser(){
  
    this.getUsers().subscribe(data => {
      for(let i=0;i<this.user.id.length;i++)
      if((data[i].id === this.user.id)) {
        this.userIn = false;
      }else{
        this.userIn = true;
      }
    });
  }
  //   let allusers = new User();
  //   if(!(this.user.id == allusers.id)){
  //     this.userIn = true;
  //     return false;
  //   }
  // }
 handleError(err: HttpErrorResponse) {
    let errorMessage = ''
    if (err.error instanceof ErrorEvent) {
      errorMessage = 'Bir hata oluştu ' + err.error.message
    } else {
      errorMessage = 'Sistemsel bir hata'
    }
    return throwError(errorMessage);
  }
}
  // getUsers(): Observable<any> {
    //   return this.http.get<User>(this.path).pipe(
    //       tap(data => console.log(JSON.stringify(data))),
    //       catchError(this.handleError)
    //     );
    // }
    // likePost(): void{
  
//  this.getPost().subscribe(data => {
//    for(let i=0;i<this.post.userid;i++)
//   //  if(this.post.texts.button.color === "#C0C0C0"){
//   //   console.log('user id eşit olan'+data[i].userid)
//   //  }
//    if((data[i].userid == this.user.id)) {
//      console.log('user id eşit olan'+data[i].userid)
//    }
//  });
 
// }
