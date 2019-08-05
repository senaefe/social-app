import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { IBaseComponent } from '../base/IBaseComponent';
import { AccountService } from '../services/account.service';
import { UserService } from 'src/app/services/user.service';
import { AlertifyService } from '../services/alertify.service';
import { catchError } from 'rxjs/operators';
import { Observable, throwError, ObservableInput } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
// import { HomeComponent} from '../home/HomeComponent';
import { User } from '../register/user.model';
import { Comment } from '../home/comment.model';
import { Like } from '../home/like.model';

import { Post } from '../home/post.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',

  styleUrls: ['./profile.component.css'],
  providers: [UserService]
})
export class ProfileComponent extends IBaseComponent implements OnInit {
  allusers: any;
  [x: string]: any;
  accountService: any;
  private location: Location;
  // @Input("user") user: User;
  
  updateForm = false;
  selectedFile: File = null;
  public url2: string;
  user:User;
  private sub: any;
  post: Post;
  posts: Post[] = new Array();
  userInformation: any[] = [];

  userIn:boolean;
  mypost:boolean;
  myPosts: any[] = [];
  postAddForm:FormGroup;
  commentAddForm:FormGroup;
  comments:Comment;
  comment:Comment[]=[];
  numberoflikes : Post ;
  path = "http://localhost:9000/user"
  path2 = "http://localhost:9000/post"
  path3 ="http://localhost:9000/likes"
  path4="http://localhost:9000/comments"
profileId:any;
  public ziyaretedilenuser;
  constructor(public accS: AccountService, private router: Router, private http: HttpClient, private userService: UserService,
    private formBuilder: FormBuilder, private route: ActivatedRoute ) {
    super(accS);
    // this.usero = this.userService.getUsers();
    // this.files = [];
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("isLogged"));
    console.log(this.user);
    this.route.params.subscribe(data =>{
this.profileId=data['id'];
    })
    if(this.profileId !== undefined){
      this.userService.getUser(this.profileId).subscribe(data =>{
        this.user = data;
      })
    }
   this.userInfo();
   this.postAddForm = new FormGroup({
    id:new FormControl(),
    firstName:new FormControl(),
    texts:new FormControl(),
    image:new FormControl(),
    video:new FormControl(),
    numberoflikes:new FormControl(),
  });

  this.profilpost();
 this.profileComment();
  this.commentAddForm =new FormGroup({
    id:new FormControl(),
    postid:new FormControl(),
    userid:new FormControl(),
    comment:new FormControl(),

});
let id= parseInt(this.route.snapshot.paramMap.get('id'));
this.ziyaretedilenuser=id;
    // console.log(this.user.url2);

    // this.route.params.subscribe(params => {
    //   this.userService.user.id = +params["id"];
    // });
  }
  userInfo(){
  
    this.userService.getUsers().subscribe(data =>{
        data.forEach(item =>{
    
      if(item.id !== this.user.id){ 
        console.log(item);
        this.userInformation.push(item);
        
    }
     })
    })
      // for(let i=0;i<this.usero.length;i++)
      // if(!(data[i].id ===window.localStorage.setItem("user", "id"))) {
      //   if(data[i].id === JSON.parse(localStorage.getItem("isLogged"))){
      //     this.userIn=false;}
      // }else{
      //   this.userIn = true; }
 
  }
  profilpost(){
    let mypost = new Post();
    this.userService.getPost().subscribe(data => {
      this.posts=data;
      this.posts.forEach(data => {
          
          if(data.userid == this.user.id) {
            this.myPosts.push(data);          
 }
      }); 
      
    }); 
  }

profileComment(): void {
  
  this.userService.getComment().subscribe(data => {
    this.comment = data;
    
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
  }
  );}
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
  updateUser() {
    console.log('jshjshj' + this.user.firstName);
    console.log("asdfg" + this.user.url2);
    this.updateForm = true;
  }
  save() {
    this.userService.updateUser(this.user).subscribe(() => this.goBack());
  }
  goBack(): void {
    // this.userService.location.back();
  }
  visitProfile(userid) {
    this.router.navigate(['./profile/', userid]);
    
  }
    //  let part = this.userService.user.id;
    //  this.router.navigate(['profile' ,'part', this.userService.user.id ]);
    //  this.route.navigate(["profilecomponent"]);
    // this.userService.getUsers().subscribe(data => {
    //   this.ziyaretEdilenUser.id = data;
      // this.queryParams2 = p.queryParams2;
    // });
   

  // onUpload(){
  //   const fd = new FormData;
  //   fd.append('image',this.selectedFile,this.selectedFile.name);
  // this.http.post(this.user.url2,fd ,{ reportProgress:true,
  //   observe:'events',

  // }).subscribe(event => {
  //   if( event.type === HttpEventType.UploadProgress){
  //    console.log('Upload Progress: ' + Math.round(event.loaded / event.total * 100) + '%')
  //   }else if (event.type === HttpEventType.Response){
  //     console.log(event);
  //   }
  // })
  // }
  getPost(): void {
    //  console.log(this.userService.getUsers())
    this.posts = new Array();
    this.userService.getPost().subscribe((data) => {
      console.log(data);
      this.posts = data;
     for (let i = 0; i < data.length; i++) {
        if ((data[i].userid === this.user.id)) {
          console.log('user id eşit olan' + data[i].texts)
          this.posts.push(data[i]);
        }
 }},    

 err => {
      console.log('listeyi çekerken  hata oluştu')
    }, () => {
      var array = this.posts;
      array.sort((a, b) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime());
      this.posts = array;
    });
   }
  onSubmit(): void {
    console.log(this.postAddForm.touched);
    console.log(this.postAddForm.value);
    console.log(this.postAddForm.touched);
    console.log(this.commentAddForm.touched);
    console.log(this.commentAddForm.value);
  }

    
userList(){
 return this.userService.useruser();
  }
  getAllUsers(): void{
    let allusers = new User();
   return this.userService.useruser();
  }
}
    // this.userService.getUsers().subscribe(data => {
    //   this.allusers = data;
    //  }, err => {
    //    console.log('listeyi çekerken hata oluştu');
    //  }, () =>{
    //    for(let i=0;i<this.allusers.length;i++){
    //      if(this.allusers[i] === undefined) {
    //        this.allusers = [];
    //      }
    //      for(let j=0;j<this.user.id.length;j++){
    //        if(!(this.allusers[i] ==this.user[j])){
    //          this.allusers.push(this.user[j]);
    //          return false;
    //        }
    //    }}
    // })
 



//   if(this.updateUserForm.valid){
//     this.user = Object.assign({},this.updateUserForm.value)
//  }
//  this.userService.addUser(this.user).subscribe(data => {
//   this.alertifyService.success(data.userName + " bilgileriniz değiştirildi")
// })



  // add(){
  //   if(this.ppAddForm.valid){
  //     this.Profile.pp = Object.assign({},this.ppAddForm.value)
  //  }}



  // url: string;
  // selectedFile:File;
  // public files: any[];
  // handleError: (err: any, caught: Observable<unknown>) => ObservableInput<unknown>;
  // onFileChanged(event: any) {
  //   this.files = event.target.files;
  // }
  // onUpload() {
  //   const formData = new FormData();
  //   for (const file of this.files) {
  //       formData.append(name, file, file.name);
  //   }
  //   this.http.post('url', formData).subscribe(data => console.log(JSON.stringify(data))),
  //   catchError(this.handleError);
  // }

//   onSelectFile(event) { // called each time file input changes
//     if (event.target.files && event.target.files[0]) {
//       var reader = new FileReader();

//       reader.readAsDataURL(event.target.files[0]); // read file as data url

//       reader.onload = (event) => { // called once readAsDataURL is completed

//       }
//     }
// }
