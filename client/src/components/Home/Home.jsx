import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions";
import NavBar from "../NavBar/navBar";
import Filters from "../Filters/Filters";
import Cards from "../Cards/Cards";
import styles from './Home.module.css'

export default function Home(){
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getProducts())
    }, [dispatch])

    return (
        <div className={styles.homeGrid}>
            <NavBar/>
            <Filters />
            <Cards />
        </div>
    )
}