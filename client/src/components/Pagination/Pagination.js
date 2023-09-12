import {useState} from 'react';
import classes from "./Pagination.module.css";
function Pagination ({data}){
    const [currentPage, setCurrentPage] = useState();
    const [itemsPerPage, setTtemsPerPage] = useState(1);

    const pages = [];
    for(var i =1; i <= Math.ceil(data?.length / itemsPerPage); i++){
        pages.push(i);
    }
    return
}

export default Pagination;