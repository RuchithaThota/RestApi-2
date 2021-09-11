import React, { useEffect, useState } from "react";
 

 const App=()=>{

    const[posts,setPosts]=useState([]);
    const[search,setSearch]=useState('');
    const[loading,setLoading]=useState(false);
    
    useEffect(()=>{
        setLoading(true);
        const url="https://jsonplaceholder.typicode.com/posts";
        const getApi=async ()=>{
            const response=await fetch(url);
            const data=await response.json();
            console.log(data)
          
            data.map((d)=>{
                d["category"]="All";
                if((d.id)%5==0){
                    d["category"]=d.category+'five';
                }
                if((d.id)%2==0){
                    d["category"]=d.category+'two';
                }
            })
            console.log(data);
            setPosts(data);
            setLoading(false);
        }
        getApi();
    
    },[])
    if(loading){
        return <h2 style={{textAlign:'center'}}>Is Loading....</h2>
    }
    const filteredPosts=posts.filter((post)=>{
    if(search=='All' || search=='Five' || search=='Two') {  
    return  post.category.toLowerCase().includes(search.toLowerCase());}
    else{
      return post.title.toLowerCase().includes(search.toLowerCase());
    }
    
    })
    const removeData=(id)=>{
     const newArray= posts.filter((post)=>{
          return post.id!==id;
      })
      setPosts(newArray);
    }
   
    return <React.Fragment>
      <div className="app">
      <div className="filter-box">
      <input type="text" placeholder="search title..."onChange={(e)=>{
         setSearch(e.target.value);
      }}/>
       <select className="filter" onChange={(e)=>{
          setSearch(e.target.value)
      }}>
      <option value="All">All</option>
      <option value="Five">Five</option>
      <option value="Two">Two</option>
     </select>
     </div>
     {filteredPosts.map((post)=>{
         return <div key={post.id} className="posts">
         <div className="post">
         <h5>{post.id}</h5>
        <h4>{post.title}</h4>
         <p>{post.body}</p>
         </div>
         <div className="button">
         <button onClick={()=>removeData(post.id)}>X</button>
         </div>
         </div>
     })}
     
     </div>
    </React.Fragment>

 }
export default App;
