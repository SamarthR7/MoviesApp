import react, { useEffect, useState } from "react";
import Moviecard from "./Moviecard";
let API_key= "&api_key=06d22fff8424dc98bec2a4cab006e978";
let base_url= "https://api.themoviedb.org/3";
let url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
let arr = ["Popular","Theatre","Kids","Drama","Comedy"];
function Main() {
    const [movieData,setData]=useState([]);
    const [url_set,setUrl]=useState(url);
    const [search,setSearch]=useState();

    useEffect(()=>{
         fetch(url_set).then(res=>res.json()).then(data=>{
            //console.log(data.results);
            setData(data.results);
         });
    },[url_set])
   const getData=(movieType)=>{
        if(movieType==="Popular")
        {
            url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
        }
        if(movieType==="Theatre")
        {
            url = base_url + "/discover/movie?sort_primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22" + API_key;
        }
        if(movieType==="Kids")
        {
            url = base_url + "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc" + API_key;
        }
        if(movieType==="Drama")
        {
            url = base_url + "/discover/movie?with_genres=18&primary_release_year=2014" + API_key;
        }
        if(movieType==="Comedy")
        {
            url = base_url + "/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc" + API_key;
        }
        setUrl(url);
    }
    const searchMovie=(evt)=>{
        if(evt.key==="Enter")
        {
            url = base_url+ "/search/movie?api_key=06d22fff8424dc98bec2a4cab006e978&query=" + search;
            setUrl(url);
            setSearch(" ");  
            //console.log("hello")
        }

    }
    return (
        <>
            <div className="header">
                <nav>
                    <ul>
                        {
                            arr.map((value)=>{
                                return(
                                    <li><a href="#" name={value} onClick={(e)=>{getData(e.target.name)}}>{value}</a></li>
                                )
                            })
                        }
                        
                    </ul>
                </nav>
                <form>
                    <div className="search-button">
                        <input type=" text" placeholder="Enter Movie Name" className="inputText" onChange={(e)=>{setSearch(e.target.value)}}
                         value = {search} onKeyPress={searchMovie}>
                        </input>
                        <button><i className="fa-thin fa-magnifying-glass fa-2xl"></i></button>

                    </div>
                </form>

            </div>
            <div className="container">
                {
                    (movieData.length===0)?<p className="notfound">Not Found</p>: movieData.map((res,pos)=>{
                        return(
                            <Moviecard info={res} key={pos}/>                        )
                    })
                }

            </div>
        </>
    );

}
export default Main;
