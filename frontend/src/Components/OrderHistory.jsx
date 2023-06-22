import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import {
  fetchOrdersAPI,
} from "../api";
import { onCreateOrder } from "../graphql/subscriptions";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  // set orders from the db
  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await fetchOrdersAPI();
      setOrders(orders);
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateOrder)
    ).subscribe({
      next: (eventData) => {
        const updatedOrder = eventData.value.data.onCreateOrder;
        setOrders((prevOrders) => {
          const orderIndex = prevOrders.findIndex((order) => order.id === updatedOrder.id);
          if (orderIndex !== -1) {
            // Update the existing order
            const updatedOrders = [...prevOrders];
            updatedOrders[orderIndex] = updatedOrder;
            return updatedOrders;
          } else {
            // Add the new order
            return [...prevOrders, updatedOrder];
          }
        });
      },
      error: (error) => {
        console.error("Subscription error:", error);
      },
    });
  
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  

  return (
    <div>
      <h2>Order History</h2>
      {orders.map((order) => (
        <p key={order.id}>{order.id}</p>
      ))}
    </div>
  );
};

export default OrderHistory;
