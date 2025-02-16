import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/Card";

// toast.configure();

function Payments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetch("http://197.243.27.49/api/payment/all/")
      .then((res) => res.json())
      .then((data) => setPayments(data.payments))
      .catch((err) => toast.error("Failed to fetch payments"));
  }, []);

  const handleDelete = (id) => {
    setPayments(payments.filter((payment) => payment.id !== id));
    toast.success("Payment deleted successfully");
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardContent>
          <h2 className="text-2xl font-semibold mb-4">Payments</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Amount</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">
                      {payment.first_name} {payment.last_name}
                    </td>
                    <td className="py-3 px-6 text-left">{payment.email}</td>
                    <td className="py-3 px-6 text-left">${payment.amount}</td>
                    <td className="py-3 px-6 text-left">
                      <span
                        className={`px-3 py-1 rounded-full text-white ${
                          payment.status === "pending" ? "bg-yellow-500" : "bg-green-500"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center flex space-x-2">
                      <Button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={() => toast.info(`Reference: ${payment.reference}`)}
                      >
                        View Details
                      </Button>
                      <Button
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                        onClick={() => handleDelete(payment.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Payments;