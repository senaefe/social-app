import { Component, OnInit } from '@angular/core';
import { IBaseComponent } from '../base/IBaseComponent';
import { AccountService } from '../services/account.service';
import { User } from '../register/user.model';
import { AlertifyService } from  '../services/alertify.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Post } from './post.model';
import { UserService } from '../services/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatIconModule} from '@angular/material';
import { Routes, RouterModule,Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { Like } from './like.model';
import { Comment } from './comment.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends IBaseComponent implements OnInit {
 
  [x: string]: any;
  accountService: any;
  path = "http://localhost:9000/user"
  path2 = "http://localhost:9000/post"
  path3 ="http://localhost:9000/likes"
  path4="http://localhost:9000/comments"
  post:Post;
  texts : Post;
  id:User;
 
 ziyaretedilenuser:any;
  numberoflikes : Post ;
  postAddForm:FormGroup;
  commentAddForm:FormGroup;
  value:any;
  user:User;
  postid:Like;
  userid:Like;
 allLikes:any;
  posts:Post[]=new Array();
  allusers:User[]=[];
  comments:Comment;
 comment:Comment[]=[];
  color:string="#C0C0C0";
  profileId:any;
 constructor(private userService: UserService, public accS: AccountService,private formBuilder : FormBuilder,private alertifyService : AlertifyService,private http: HttpClient,
  private route: ActivatedRoute,private router: Router) {
    super(accS);
 }

  ngOnInit() {
  this.user=JSON.parse(localStorage.getItem("isLogged"));
  this.getAllLikes();
 
   
   this.postAddForm = new FormGroup({
     id:new FormControl(),
     firstName:new FormControl(),
     texts:new FormControl(),
     image:new FormControl(),
     video:new FormControl(),
     numberoflikes:new FormControl(),
   });
   
   this.getPost();
   this.getComment();

   this.commentAddForm =new FormGroup({
     id:new FormControl(),
     postid:new FormControl(),
     userid:new FormControl(),
     comment:new FormControl(),
});

}

 getPost(): void {
  this.posts=[];
  this.userService.getPost().subscribe(data => {
  console.log(data);
    this.posts=data;
    }, err => {
      console.log('listeyi çekerken  hata oluştu')
     }, () => {
      var array=this.posts;
      array.sort((a, b) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime());
      this.posts=array;
      for(let i =0;i<this.posts.length;i++){
        // console.log(this.posts[i].userid)
        this.userService.getUser(this.posts[i].userid).subscribe(data=> {
          // console.log(data)
          this.posts[i].user = data;
        })
     }
     this.getCurrentUserLiked();
     } );
    //  console.log(this.posts)
  
    return this.sonuc;
  }
  getComment(): void {
    // this.comment = new Array();
    this.userService.getComment().subscribe(data => {
      
      this.comment =data;
    console.log(this.comment);
  }, err => {
    console.log('listeyi çekerken hata oluştu');
  }, () =>{
    var array=this.comment;
    array.sort((a,b) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime());
  
    for(let i=0;i<this.comment.length;i++){
      this.userService.getUser(this.comment[i].userid).subscribe(data =>{
        this.comment[i].user= data;
      })
    }

    for(let i=0;i<this.posts.length;i++){
      if(this.posts[i].comments === undefined) {
        this.posts[i].comments = [];
      }
      for(let j=0;j<this.comment.length;j++){
        if(this.posts[i].id ==this.comment[j].postid){
          this.posts[i].comments.push(this.comment[j]);
        }
      }
    }
      console.log(this.posts);
   })}

 getAllUsers(): void{
 this.userService.getUsers().subscribe(data => {
   this.allusers = data;
  }, err => {
    console.log('listeyi çekerken hata oluştu');
  }, () =>{
    for(let i=0;i<this.allusers.length;i++){
      if(this.allusers[i] === undefined) {
        this.allusers = [];
      }
      for(let j=0;j<this.allusers.length;j++){
        if(!(this.allusers[i] ==this.user[i])){
          this.allusers.push(this.user[i]);
        }
    }}
 })
  }
  // getLike(postid): void{
  //   this.posts=new Array();
  // this.userService.getLike(postid).subscribe(data => {
  //   console.log(data);
  //   this.posts=data;
  // }, err => {
  //   console.log('listeyi çekerken  hata oluştu')
  //  }, () => {
  //   var array=this.posts;
  //   // array.sort((a, b) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime());
  //   // this.posts=array;
  //   for(let i =0;i<this.posts.length;i++){
  //     console.log(this.posts[i].userid)
  //     this.userService.getUser(this.posts[i].userid).subscribe(data=> {
  //       console.log(data)
  //       this.posts[i].user = data;
  //     })

  //  }
  //  } );
  //  console.log(this.posts)

  // console.log(this.posts)
  // return this.sonuc;
  // }
 onSubmit(): void{
   console.log(this.postAddForm.touched);
   console.log(this.postAddForm.value);
   console.log(this.commentAddForm.touched);
   console.log(this.commentAddForm.value);
 }
createPostAddForm(){
  this.postAddForm = this.formBuilder.group({
  id:["",Validators.required],
  texts:["",Validators.required],
  image:["",Validators.required],
  video:["",Validators.required],
  numberoflikes:["",Validators.required],
 });
}
createCommentAddForm(){
  this.commentAddForm = this.formBuilder.group({
    id:["",Validators.required],
    comment:["",Validators.required],
    postid:["",Validators.required],
    userid:["",Validators.required],
});
}
addPost(){
  this.post = new Post;
 if(this.postAddForm.valid){
    this.post = Object.assign({},this.postAddForm.value)
    this.post.postDate=new Date();
    this.post.userid = this.user.id;
    console.log(this.post);
    console.log(this.post.texts);
    console.log(this.numberoflikes);
 }
 this.userService.addUserPost(this.post).subscribe(
   data => {
   this.alertifyService.success(this.user.userName + " post successfully shared.")
   console.log('data subscribe')
    }, err => {
     console.log('eklerken hata oluştu')
    }, () => {
      console.log('getpost method')
     // this.getPost();
    }
  )
//  this.getPost();
}
addComment(post:Post){
console.log(post);
  this.comments = new Comment;

  if(this.commentAddForm.valid){
    this.comments= Object.assign({},this.commentAddForm.value)
    this.comments.postDate=new Date();
    this.comments.userid = this.user.id;
    this.comments.postid = post.id;
    // this.comments.postid = this.post.id;
    
    console.log(this.comments);
 }
 this.userService.addUserComment(this.comments).subscribe(
   data => {
  this.alertifyService.success(this.user.userName + " comment is succesfully shared.")
  console.log('data subscribe')
}, err => {
  console.log('eklerken hata oluştu')
 }, () => {
   console.log('getcomment method')
   this.getComment();
 }
)
}

getAllLikes(){
   this.userService.getLike().subscribe(data=> {
this.allLikes = data;
console.log(this.allLikes);
  });
}

getCurrentUserLiked(){
  this.getAllLikes();
  console.log(this.user);
 for(let k=0;k<this.posts.length;k++){
  for(let i =0;i<this.allLikes.length;i++){
    
    if(this.posts[k].id === this.allLikes[i].postid && this.user.id ===this.allLikes[i].userid ){
  this.posts[k].isLiked=true;
}}}}

 likebutton(post:Post){
   let like = new Like();
   like.postid=post.id;
   like.userid=this.user.id;
  console.log(post);
   if(!post.isLiked){
  post.isLiked=true;
  post.numberoflikes=post.numberoflikes+ +1;
///like a post isteği atılacak
console.log(like);
this.userService.addUserLikes(like).subscribe(
 
  data => {
    // this.alertifyService.success(+ " şuan like paylaştınız.")
  console.log('likee')
   }, err => {
    console.log('eklerken hata oluştu')
   },
   ()=> {
     this.getAllLikes();
  
   }
 )
  console.log(this.user.userName + ' beğenmeyi geri çekti');
}else{
let likeid =0;
  post.isLiked=false;
  post.numberoflikes=post.numberoflikes+ -1;
  console.log(this.user.userName + ' postu beğendi');
  console.log(this.allLikes);
  console.log(post);
  console.log(this.user);
for(let i=0;i<this.allLikes.length;i++){
if(post.id == this.allLikes[i].postid && this.user.id === this.allLikes[i].userid){
  likeid=this.allLikes[i].id;
}
}
//like a delete atılacak,
console.log(like);
this.userService.deleteLike(likeid).subscribe(
  () => console.log('Like with id = ' + ' deleted'),
  (err) => console.log(err)
);

}

this.userService.updateLike(post).subscribe(

  () => console.log('Like with id = ' + ' updateeee'),
  (err) => console.log(err)
);

}
visitProfile(userid){
  this.router.navigate(['./profile/', userid]);
}
}











//--------------Y O R U M -----------------------











 //  (this.user);
   //this.post=JSON.parse(localStorage.getItem("isLogged"));
   //console.log(this.post);
//  dislikes(post:Post){
//   this.userService.deleteLike().subscribe(
//     data => {
//       console.log('delete edildi');
//     }, err => {
//       console.log('eklerken hata olustu')
//      }
//  );}
 
 



          // this.posts[i]= this.Like.postid;
          // this.post.id = this.Like.postid;
          // console.log(this.Like.id);
          
        // })
      //   if (this.post.id === this.like.postid && like.id === window.localStorage.setItem("user", "id")) {
      //     if(like.userid === JSON.parse(localStorage.getItem("isLogged"))) {
      //         console.log('user id eşit olan'+this.posts[i].texts)
      //           this.posts.push(this.posts[i]);
              
      //  return;

      //  }
       
   
 

//  this.userService.updateWhoLiked(this.user).subscribe(
//   data => {
//     console.log('update edildi');
//   }, err => {
//     console.log('eklerken hata oluştu')
//    }
// );


//   this.userService.updateLike(this.post).subscribe(
//     data => {
//       console.log('update edildi');
//     }, err => {
//       console.log('eklerken hata oluştu')
//      }
//  );
//  this.userService.updateWhoLiked(this.user).subscribe(
//   data => {
//     console.log('update edildi');
//   }, err => {
//     console.log('eklerken hata oluştu')
//    }
// );


 

  //adPost
  //ilgili postId'nin numberOfLikes değerini 1 arttır update et
  //tekrar postları çek
  /*this.userService.getPost().subscribe(data=> {
    if(this.color==="#FF0000"){
    console.log('color kırmızıydı');

    this.color="#C0C0C0"; 
    this.post.isLiked = false;
    post.numberoflikes=post.numberoflikes+ -1;
  console.log(this.user.userName + " beğenmeyi geri çekti");
  }
  else{
    this.post.isLiked = true;
    console.log('color griydi')
    this.color="#FF0000"; //red
    post.numberoflikes=post.numberoflikes+ +1;
    console.log(this.color.indexOf.length);
    console.log(this.user.userName +  " postu beğendi" );
  }
       
  console.log('begeni sayisi ='+post.numberoflikes)
  console.log('likecolor ='+this.color)
  console.log('sonpost ='+post.texts)


  })*/
// dislikebutton(){

//   this.numberOfLikes-1;

// }

  // while(this.numberOfDislikes){ 
  //    this.numberOfDislikes--
  //       if(this.numberOfDislikes){
  //         this.numberOfDislikes==0;
  //         break;   }
  //         return;
  // }















// ngOnInit() {
//   this.createUserAddForm();
// }

// }