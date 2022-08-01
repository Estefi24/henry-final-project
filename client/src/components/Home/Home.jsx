import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions";
import NavBar from "../NavBar/NavBar";
import Filters from "../Filters/Filters";
import Footer from "../Footer/Footer";
import Cards from "../Cards/Cards";
import styles from './Home.module.css';
import Paginado from "../Paginado/Paginado";


export default function Home() {
    let products = useSelector(state => state.products)

    return (
        <div className={styles.homeGrid}>
            <div className={styles.filtersContainer}>
                <Filters />
            </div>
            <div>                
                <div className={styles.cardsContainer}>
                    {products.length === 0 ? 'Cargando...' : <Cards />}
                </div>
                <Paginado />
            </div>
            <div className={styles.footerContainer}>
                <Footer />
            </div>
        </div>
    )
}