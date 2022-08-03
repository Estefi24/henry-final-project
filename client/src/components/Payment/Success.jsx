import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiInstance from "../../services/apiAxios";
import { getStatusOrder } from "../../services/shopingCart";
import { useLocalStorage } from "../../services/useStorage";
import styles from "./Success.module.css";

export default function Success() {
  const [cart, setCart] = useLocalStorage("cart");
  const [dataStatusOrder, setDataStatusOrder] = useState("");
  const urlSearchParams = new URLSearchParams(window.location.search);
  let payment_id = urlSearchParams.get("payment_id");
  let external_reference = urlSearchParams.get("external_reference");

  async function updateStatusOrder() {
    const { data } = await apiInstance.post("/payment/order", {
      payment_id,
      external_reference
    });
    return data;
  }
  let send = false;
  useEffect(() => {
      setCart([]);
      if (!send) {
        updateStatusOrder();
        send = true;
      }
  }, []);

 
  return (
    <div>
      <p>Su pago se realizó con éxito, muchas gracias!</p>
      <Link to="/inicio" className={styles.btn}>
        ◀ Volver
      </Link>
    </div>
  
  );
}
