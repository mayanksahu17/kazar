"use client"

import { useState } from "react"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ContactQuery {
  id: number
  name: string
  email: string
  message: string
  status: "Open" | "Resolved"
}

interface TransactionRequest {
  id: string
  paymentPlatform: string
  amount: number
  customerName: string
  status: "Pending" | "Confirmed"
}

export default function Component() {
  const [activeTab, setActiveTab] = useState<"contact-queries" | "transaction-requests">("contact-queries")
  const [contactQueries, setContactQueries] = useState<ContactQuery[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      message: "I have a question about your product.",
      status: "Open",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      message: "I would like to provide feedback on your service.",
      status: "Open",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      message: "Can you help me with my order?",
      status: "Resolved",
    },
  ])

  const [transactionRequests, setTransactionRequests] = useState<TransactionRequest[]>([
    {
      id: "TR001",
      paymentPlatform: "PayPal",
      amount: 99.99,
      customerName: "Alice Wilson",
      status: "Pending",
    },
    {
      id: "TR002",
      paymentPlatform: "Stripe",
      amount: 49.99,
      customerName: "Michael Brown",
      status: "Pending",
    },
    {
      id: "TR003",
      paymentPlatform: "PayPal",
      amount: 199.99,
      customerName: "Sarah Davis",
      status: "Confirmed",
    },
  ])

  const handleResolveQuery = (queryId: number) => {
    setContactQueries(contactQueries.map((query) => (query.id === queryId ? { ...query, status: "Resolved" } : query)))
  }

  const handleConfirmTransaction = (transactionId: string) => {
    setTransactionRequests(
      transactionRequests.map((transaction) =>
        transaction.id === transactionId ? { ...transaction, status: "Confirmed" } : transaction,
      ),
    )
  }

  return (
    <div className="flex h-screen w-full flex-col bg-gray-900 text-orange-500">
      <header className="bg-orange-500 text-gray-900">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <nav>
            <ul className="flex items-center gap-4">
              <li>
                <button
                  className={`rounded-md px-4 py-2 transition-colors ${
                    activeTab === "contact-queries" ? "bg-gray-900 text-orange-500" : "hover:bg-gray-900/20"
                  }`}
                  onClick={() => setActiveTab("contact-queries")}
                >
                  Contact Queries
                </button>
              </li>
              <li>
                <button
                  className={`rounded-md px-4 py-2 transition-colors ${
                    activeTab === "transaction-requests" ? "bg-gray-900 text-orange-500" : "hover:bg-gray-900/20"
                  }`}
                  onClick={() => setActiveTab("transaction-requests")}
                >
                  Transaction Requests
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex-1 overflow-auto bg-gray-900 p-4 md:p-6">
        {activeTab === "contact-queries" && (
          <div className="container mx-auto">
            <h2 className="mb-4 text-2xl font-bold">Contact Queries</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contactQueries.map((query) => (
                  <TableRow key={query.id}>
                    <TableCell>{query.name}</TableCell>
                    <TableCell>{query.email}</TableCell>
                    <TableCell>{query.message}</TableCell>
                    <TableCell>
                      <Badge
                        variant={query.status === "Open" ? "secondary" : "default"}
                        className="bg-orange-500 text-gray-900"
                      >
                        {query.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {query.status === "Open" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleResolveQuery(query.id)}
                          className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-gray-900"
                        >
                          Resolve
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        {activeTab === "transaction-requests" && (
          <div className="container mx-auto">
            <h2 className="mb-4 text-2xl font-bold">Transaction Requests</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Payment Platform</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactionRequests.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>{transaction.paymentPlatform}</TableCell>
                    <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                    <TableCell>{transaction.customerName}</TableCell>
                    <TableCell>
                      <Badge
                        variant={transaction.status === "Pending" ? "secondary" : "default"}
                        className="bg-orange-500 text-gray-900"
                      >
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {transaction.status === "Pending" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleConfirmTransaction(transaction.id)}
                          className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-gray-900"
                        >
                          Confirm
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  )
}
