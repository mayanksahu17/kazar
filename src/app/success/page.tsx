import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SuccessPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-blue-600">Payment Successful</CardTitle>
          <CardDescription>Thank you for your purchase!</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Your payment has been processed successfully. You now have access to:</p>
          <ul className="list-disc list-inside mt-4">
            <li>Post Opportunities</li>
            <li>Search Students</li>
            <li>Access Dashboard</li>
          </ul>
        </CardContent>
        <CardFooter>
          <Link href="/" className="w-full">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Return to Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

