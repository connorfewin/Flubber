import React, { useState, useEffect, useMemo } from "react";
import { API, graphqlOperation } from "aws-amplify";
//MRT Imports
//import MaterialReactTable from 'material-react-table'; //default import deprecated
import { MaterialReactTable } from "material-react-table";
import { fetchOrdersAPI } from "../api";
import { onCreateOrder } from "../graphql/subscriptions";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  //store pagination state in your own state
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5, //customize the default page size
  });
  
  // set orders from the db
  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await fetchOrdersAPI();
      setOrders(orders);
    };
    fetchOrders();
  }, []);

  // Order subscription
  useEffect(() => {
    const subscription = API.graphql(graphqlOperation(onCreateOrder)).subscribe(
      {
        next: (eventData) => {
          const updatedOrder = eventData.value.data.onCreateOrder;
          setOrders((prevOrders) => {
            const orderIndex = prevOrders.findIndex(
              (order) => order.id === updatedOrder.id
            );
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
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "createdAt",
        header: "Date",
        size: 100,
      },
      {
        accessorKey: "symbol",
        header: "Symbol",
        size: 100,
      },
      {
        accessorKey: "type",
        header: "Type",
        size: 100,
      },
      {
        accessorKey: "numShares",
        header: "Shares",
        size: 10,
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 150,
      },
    ],
    []
  );

  return (
    <div>
      <h2>Order History</h2>
      <MaterialReactTable
        columns={columns}
        data={orders}
        onPaginationChange={setPagination}
        state={{ pagination }}
      />
    </div>
  );
};

export default OrderHistory;
